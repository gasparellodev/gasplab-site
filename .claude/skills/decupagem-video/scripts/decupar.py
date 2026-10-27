"""Decupagem: remove silêncios e takes descartados, preservando ritmo natural e respiros.

Uso:
  uv run --no-project --with numpy python decupar.py <audio48k.wav> <transcript.json> <edl.json>
        [--drop cortes.json] [--fps 59.94] [--keep-breaths 1]

Entradas
- audio48k.wav: áudio mono PCM 16-bit extraído do vídeo original.
- transcript.json: saída do transcribe.py (palavras com tempo).
- cortes.json (opcional): takes/trechos a descartar, em segundos do ORIGINAL:
    [{"start": 12.3, "end": 18.9, "motivo": "take repetido (fica o take seguinte)"}]

Lógica
1. Envelope de energia (RMS 20 ms, passo 10 ms) -> piso de ruído e limiares adaptativos.
2. Palavras viram "ilhas de fala" (pausas < MERGE_GAP ficam intactas: é o ritmo natural).
3. Bordas de cada ilha são refinadas pela energia (o Whisper erra ~100 ms nas bordas).
4. Em cada pausa longa, mantém-se um "rabo" depois da fala e um "pré" antes da próxima;
   se houver respiro audível antes de uma frase nova, ele é preservado (respiro no lugar certo).
5. Cortes alinhados à grade de quadros do vídeo final.
Saída: edl.json com os trechos mantidos (tempo do original) + relatório legível (.md).
"""
import argparse
import json
import re
import wave

import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("transcript")
ap.add_argument("out")
ap.add_argument("--drop", default=None)
ap.add_argument("--fps", type=float, default=60000 / 1001)
ap.add_argument("--keep-breaths", type=int, default=1)
ap.add_argument("--merge-gap", type=float, default=0.30, help="pausas menores que isso não são tocadas")
ap.add_argument("--tail", type=float, default=0.14, help="silêncio mantido após fala (meio de frase)")
ap.add_argument("--tail-end", type=float, default=0.24, help="silêncio mantido após fim de frase")
ap.add_argument("--pre", type=float, default=0.07, help="silêncio mantido antes da fala")
ap.add_argument("--max-breath", type=float, default=0.65)
args = ap.parse_args()

HOP = 0.010

# ---------- energia ----------
with wave.open(args.audio, "rb") as w:
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
dur = len(x) / sr
hop, win = int(sr * HOP), int(sr * 0.020)
n = max(1, (len(x) - win) // hop)
idx = np.arange(n)[:, None] * hop + np.arange(win)[None, :]
rms = np.sqrt(np.mean(x[idx] ** 2, axis=1) + 1e-12)
db = 20 * np.log10(rms)
floor = float(np.percentile(db, 8))
p95 = float(np.percentile(db, 95))
SPEECH = floor + max(10.0, 0.30 * (p95 - floor))
BREATH = floor + max(4.0, 0.12 * (p95 - floor))


def fi(t):
    return int(np.clip(round(t / HOP), 0, n - 1))


def energy_at(t):
    return db[fi(t)]


# ---------- palavras ----------
tr = json.load(open(args.transcript, encoding="utf-8"))
words = [w for w in tr["words"] if w["e"] > w["s"]]
drops = json.load(open(args.drop, encoding="utf-8")) if args.drop else []


def dropped(w):
    mid = (w["s"] + w["e"]) / 2
    return any(d["start"] <= mid <= d["end"] for d in drops)


kept_words, barrier_after = [], set()
for i, w in enumerate(words):
    if dropped(w):
        if kept_words:
            barrier_after.add(len(kept_words) - 1)  # não unir ilhas através de um trecho descartado
        continue
    kept_words.append(w)

# ---------- ilhas de fala ----------
islands = []
for i, w in enumerate(kept_words):
    if islands and (i - 1) not in barrier_after and w["s"] - islands[-1]["e"] < args.merge_gap:
        islands[-1]["e"] = max(islands[-1]["e"], w["e"])
        islands[-1]["words"].append(w)
    else:
        islands.append({"s": w["s"], "e": w["e"], "words": [w], "barrier_before": (i - 1) in barrier_after})


def drop_limit_before(t):
    """Maior fim de trecho descartado <= t (não refinar para dentro dele)."""
    lim = 0.0
    for d in drops:
        if d["end"] <= t + 1e-6:
            lim = max(lim, d["end"])
    return lim


def drop_limit_after(t):
    lim = dur
    for d in drops:
        if d["start"] >= t - 1e-6:
            lim = min(lim, d["start"])
    return lim


# refino das bordas pela energia
for k, isl in enumerate(islands):
    lo = max(drop_limit_before(isl["s"]), islands[k - 1]["e"] if k else 0.0)
    hi = min(drop_limit_after(isl["e"]), islands[k + 1]["s"] if k + 1 < len(islands) else dur)
    s = isl["s"]
    # ataque: recua enquanto ainda há energia de fala (até 200 ms)
    t = s
    while t - HOP > max(lo, s - 0.20) and energy_at(t - HOP) > SPEECH:
        t -= HOP
    # se o Whisper começou cedo demais (silêncio), avança até a fala (até 250 ms)
    if energy_at(s) < SPEECH:
        t2 = s
        while t2 < min(isl["e"], s + 0.25) and energy_at(t2) < SPEECH:
            t2 += HOP
        t = t2 if t2 < isl["e"] else s
    isl["s_true"] = t
    e = isl["e"]
    # final: se o Whisper estendeu para o silêncio, recua até a última energia de fala (até 400 ms)
    t = e
    if energy_at(e) < SPEECH:
        while t > max(isl["s_true"] + 0.05, e - 0.40) and energy_at(t) < SPEECH:
            t -= HOP
        t += HOP
    # decaimento: avança enquanto ainda há fala (até 300 ms)
    while t + HOP < min(hi, e + 0.30) and energy_at(t + HOP) > SPEECH:
        t += HOP
    isl["e_true"] = t
    isl["lo"], isl["hi"] = lo, hi

END_RE = re.compile(r"[.!?…]$")


def is_sentence_end(isl, gap):
    return bool(END_RE.search(isl["words"][-1]["w"])) or gap > 1.2


def breath_before(isl, earliest):
    """Respiro audível logo antes da fala: energia entre BREATH e SPEECH, contígua ao ataque."""
    t = isl["s_true"]
    start = t
    while start - HOP > earliest and BREATH < energy_at(start - HOP) <= SPEECH + 3:
        start -= HOP
    length = t - start
    return length if 0.12 <= length <= args.max_breath else 0.0


# ---------- trechos mantidos ----------
keep = []
for k, isl in enumerate(islands):
    prev = islands[k - 1] if k else None
    gap_prev = isl["s_true"] - prev["e_true"] if prev else isl["s_true"]
    sent_start = (prev is None) or is_sentence_end(prev, gap_prev) or isl["barrier_before"]
    pre = args.pre
    br = 0.0
    if args.keep_breaths and sent_start:
        br = breath_before(isl, (prev["e_true"] + 0.05) if prev else 0.0)
        if br:
            pre = br + 0.04
    start = max(isl["lo"], isl["s_true"] - pre)
    nxt = islands[k + 1] if k + 1 < len(islands) else None
    gap_next = (nxt["s_true"] - isl["e_true"]) if nxt else 9.0
    tail = args.tail_end if is_sentence_end(isl, gap_next) else args.tail
    end = min(isl["hi"], isl["e_true"] + tail)
    keep.append({"s": start, "e": end, "breath": round(br, 3), "text": " ".join(w["w"] for w in isl["words"])})

# une sobreposições (pausas curtas demais para valer o corte)
merged = []
for seg in keep:
    if merged and seg["s"] - merged[-1]["e"] < 0.06:
        merged[-1]["e"] = max(merged[-1]["e"], seg["e"])
        merged[-1]["text"] += " " + seg["text"]
        merged[-1]["breath"] = max(merged[-1]["breath"], seg["breath"])
    else:
        merged.append(dict(seg))

# alinhamento à grade de quadros
fps = args.fps
out = []
for seg in merged:
    a = round(seg["s"] * fps) / fps
    b = round(seg["e"] * fps) / fps
    if out and a < out[-1]["src_end"]:
        a = out[-1]["src_end"]
    if b - a >= 2 / fps:
        out.append({"src_start": round(a, 6), "src_end": round(b, 6), "breath": seg["breath"], "text": seg["text"]})

total = sum(s["src_end"] - s["src_start"] for s in out)
edl = {
    "source_duration": round(dur, 3),
    "fps": fps,
    "params": vars(args),
    "levels_db": {"floor": round(floor, 1), "speech": round(SPEECH, 1), "breath": round(BREATH, 1)},
    "segments": out,
    "drops": drops,
    "stats": {
        "segments": len(out),
        "final_duration": round(total, 2),
        "removed_seconds": round(dur - total, 2),
        "breaths_kept": sum(1 for s in out if s["breath"]),
    },
}
json.dump(edl, open(args.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def tc(t):
    return f"{int(t // 60):02d}:{t % 60:05.2f}"


md = [f"# Decupagem — {args.out}", "",
      f"- Original: {tc(dur)} | Final: {tc(total)} | Removido: {dur - total:.1f}s ({100 * (dur - total) / dur:.0f}%)",
      f"- Trechos: {len(out)} | Respiros preservados: {edl['stats']['breaths_kept']}",
      f"- Níveis (dB): piso {floor:.1f} | fala {SPEECH:.1f} | respiro {BREATH:.1f}", ""]
if drops:
    md += ["## Takes / trechos descartados", ""]
    md += [f"- {tc(d['start'])}–{tc(d['end'])}: {d.get('motivo', '')}" for d in drops]
    md.append("")
md += ["## Linha do tempo final", "", "| # | Final | Original | Respiro | Texto |", "|---|---|---|---|---|"]
acc = 0.0
for i, s in enumerate(out, 1):
    md.append(f"| {i} | {tc(acc)} | {tc(s['src_start'])}–{tc(s['src_end'])} | {'sim' if s['breath'] else ''} | {s['text']} |")
    acc += s["src_end"] - s["src_start"]
open(args.out.replace(".json", ".md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print(json.dumps(edl["stats"], ensure_ascii=False), json.dumps(edl["levels_db"]))
