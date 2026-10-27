"""Transcreve um vídeo/áudio com marcação de tempo por palavra (faster-whisper).

Uso (ver SKILL.md — ctranslate2 4.8.x dá segfault nesta máquina; fixar 4.5.0):
  uv run --no-project --python <py3.12> --with faster-whisper --with ctranslate2==4.5.0 --with "setuptools<70" \
    python transcribe.py <audio16k.wav> <saida.json> [--model large-v3-turbo]

Gera JSON: {"language", "duration", "words": [{"w","s","e","p"}], "segments": [{"s","e","text"}]}
- condition_on_previous_text=False: evita que o Whisper "engula" takes repetidos
  (a decupagem precisa enxergar as repetições para escolher o melhor take).
- vad_filter=False: queremos todas as falas, inclusive falsos começos.
"""
import argparse
import json
import time
import wave

import numpy as np
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("out")
ap.add_argument("--model", default="large-v3-turbo")
ap.add_argument("--device", default="cpu")
ap.add_argument("--compute", default="int8")
ap.add_argument("--lang", default="pt")
ap.add_argument("--ranges", default=None, help='janelas "a-b,c-d" em segundos (retranscrição pontual)')
args = ap.parse_args()

t0 = time.time()
# Lê o WAV 16 kHz mono direto (evita o PyAV, que quebra em versões novas)
with wave.open(args.audio, "rb") as w:
    assert w.getframerate() == 16000 and w.getnchannels() == 1, "use WAV 16 kHz mono (ffmpeg -ac 1 -ar 16000)"
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0

model = WhisperModel(args.model, device=args.device, compute_type=args.compute)

# --ranges "58.9-70.7,232-241": retranscreve só essas janelas (o Whisper costuma "engolir" um take
# repetido dentro de um trecho longo; isolado, ele aparece). Tempos devolvidos no relógio do original.
windows = [tuple(map(float, r.split("-"))) for r in args.ranges.split(",")] if args.ranges else [(0.0, None)]
words, segs = [], []
for a, b in windows:
    off = int(a * 16000)
    chunk = audio[off:int(b * 16000)] if b else audio
    segments, info = model.transcribe(
        chunk,
        language=args.lang,
        word_timestamps=True,
        condition_on_previous_text=False,
        vad_filter=False,
        beam_size=5,
        initial_prompt=None if args.ranges else "Então, é... a GaspLab. Tipo, assim, né? Vou repetir: a GaspLab.",
    )
    for seg in segments:
        s0, e0 = seg.start + a, seg.end + a
        segs.append({"s": round(s0, 3), "e": round(e0, 3), "text": seg.text.strip()})
        for w in seg.words or []:
            words.append({"w": w.word.strip(), "s": round(w.start + a, 3), "e": round(w.end + a, 3), "p": round(w.probability, 3)})
        print(f"[{s0:7.2f} -> {e0:7.2f}] {seg.text.strip()}", flush=True)

with open(args.out, "w", encoding="utf-8") as f:
    json.dump({"language": args.lang, "duration": len(audio) / 16000, "words": words, "segments": segs}, f, ensure_ascii=False, indent=1)
print(f"OK {len(words)} palavras, {len(segs)} segmentos em {time.time() - t0:.0f}s -> {args.out}")
