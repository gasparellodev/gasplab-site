"""Renderiza o vídeo decupado a partir do edl.json.

Uso:
  uv run --no-project --with numpy python render.py <video_original> <edl.json> <audio48k.wav> <pasta_saida> [--nome X]
        [--no-master] [--no-reels] [--lufs -14]

Saídas
- <nome>_master_4K_HDR.mp4 : 2160x3840, HEVC 10-bit HLG (mesma cor do iPhone), 59,94 fps.
- <nome>_reels_1080.mp4    : 1080x1920, H.264 SDR (tonemap mobius), pronto p/ Reels/WhatsApp.

Como funciona
- Vídeo: fps CFR 59,94 (iPhone grava VFR) + select por quadro nos trechos do EDL -> 1 decodificação só.
- Áudio: montado aqui em numpy com fades de 8 ms em cada corte (sem estalos), mesma duração
  exata dos trechos (alinhados à grade de quadros pelo decupar.py), depois loudnorm em 2 passadas.
- Encode na GPU NVIDIA (NVENC). Sem GPU: troque por libx265/libx264 (--cpu).
"""
import argparse
import json
import os
import re
import subprocess
import wave

import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("edl")
ap.add_argument("audio")
ap.add_argument("outdir")
ap.add_argument("--nome", default="decupado")
ap.add_argument("--no-master", action="store_true")
ap.add_argument("--no-reels", action="store_true")
ap.add_argument("--lufs", type=float, default=-14.0)
ap.add_argument("--fade-ms", type=float, default=8.0)
ap.add_argument("--cpu", action="store_true", help="encode por CPU (sem NVENC)")
args = ap.parse_args()

os.makedirs(args.outdir, exist_ok=True)
edl = json.load(open(args.edl, encoding="utf-8"))
segs = edl["segments"]
fps = edl["fps"]
FPS_EXPR = "60000/1001" if abs(fps - 60000 / 1001) < 1e-6 else ("30000/1001" if abs(fps - 30000 / 1001) < 1e-6 else str(fps))

# ---------- áudio ----------
with wave.open(args.audio, "rb") as w:
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
nf = int(sr * args.fade_ms / 1000)
ramp = np.sin(np.linspace(0, np.pi / 2, nf)) ** 2
parts = []
for s in segs:
    # número de amostras derivado do número de quadros -> áudio e vídeo com a mesma duração exata
    frames = round((s["src_end"] - s["src_start"]) * fps)
    a = round(s["src_start"] * sr)
    n = round(frames / fps * sr)
    seg = x[a:a + n].copy()
    if len(seg) < n:
        seg = np.pad(seg, (0, n - len(seg)))
    if len(seg) > 2 * nf:
        seg[:nf] *= ramp
        seg[-nf:] *= ramp[::-1]
    parts.append(seg)
y = np.concatenate(parts)
cut_wav = os.path.join(args.outdir, f"{args.nome}_audio_cortado.wav")
with wave.open(cut_wav, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(sr)
    w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())

# loudnorm passada 1 (medição)
AF_BASE = "highpass=f=70"
meas = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", cut_wav, "-af", f"{AF_BASE},loudnorm=I={args.lufs}:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
    capture_output=True, text=True, encoding="utf-8", errors="replace",
).stderr
m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", meas, re.S).group(0))
AF = (f"{AF_BASE},loudnorm=I={args.lufs}:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
      f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,"
      f"aresample=48000")

# ---------- vídeo ----------
eps = 0.25 / fps
sel = "+".join(f"gte(t,{s['src_start'] - eps:.6f})*lt(t,{s['src_end'] - eps:.6f})" for s in segs)
outs = []
if not args.no_master:
    outs.append("[m]")
if not args.no_reels:
    outs.append("[p]")
fc = [f"[0:v]fps={FPS_EXPR},select='{sel}',setpts=N/({FPS_EXPR})/TB" + (f",split={len(outs)}" if len(outs) > 1 else "") + "".join(outs)]
if not args.no_master:
    fc.append("[m]format=p010le[vm]")
if not args.no_reels:
    fc.append("[p]scale=1080:1920:flags=lanczos,zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,"
              "tonemap=mobius:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p[vp]")
fc.append(f"[1:a]{AF},asplit={len(outs)}" + "".join(f"[a{i}]" for i in range(len(outs))))
fc_path = os.path.join(args.outdir, f"{args.nome}_filtro.txt")
open(fc_path, "w", encoding="utf-8").write(";\n".join(fc))

cmd = ["ffmpeg", "-hide_banner", "-v", "error", "-stats", "-y"]
if not args.cpu:
    cmd += ["-hwaccel", "cuda"]
cmd += ["-i", args.video, "-i", cut_wav, "-/filter_complex", fc_path]
ai = 0
results = []
if not args.no_master:
    out = os.path.join(args.outdir, f"{args.nome}_master_4K_HDR.mp4")
    venc = (["-c:v", "libx265", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p10le"] if args.cpu else
            ["-c:v", "hevc_nvenc", "-profile:v", "main10", "-preset", "p5", "-rc", "vbr", "-cq", "19", "-b:v", "0",
             "-maxrate", "80M", "-bufsize", "160M"])
    cmd += ["-map", "[vm]", "-map", f"[a{ai}]", *venc, "-tag:v", "hvc1",
            "-color_primaries", "bt2020", "-color_trc", "arib-std-b67", "-colorspace", "bt2020nc",
            "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", out]
    ai += 1
    results.append(out)
if not args.no_reels:
    out = os.path.join(args.outdir, f"{args.nome}_reels_1080.mp4")
    venc = (["-c:v", "libx264", "-preset", "slow", "-crf", "19"] if args.cpu else
            ["-c:v", "h264_nvenc", "-profile:v", "high", "-preset", "p6", "-rc", "vbr", "-cq", "21", "-b:v", "0",
             "-maxrate", "20M", "-bufsize", "40M"])
    cmd += ["-map", "[vp]", "-map", f"[a{ai}]", *venc, "-pix_fmt", "yuv420p",
            "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out]
    results.append(out)

print("Renderizando:", *results, sep="\n  ")
subprocess.run(cmd, check=True)
print("OK")
