"""Acha fala NÃO transcrita: palavras "esticadas" sobre silêncio/fala e buracos com energia de voz.

O Whisper costuma omitir um take repetido e esticar a palavra vizinha por cima dele.
Uso:
  uv run --no-project --with numpy python buracos.py <audio48k.wav> <transcript.json>
Imprime as janelas no formato de --ranges do transcribe.py ("a-b,c-d").
"""
import json
import sys
import wave

import numpy as np

audio, tr = sys.argv[1], sys.argv[2]
with wave.open(audio, "rb") as w:
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
hop = sr // 100
n = len(x) // hop
db = 20 * np.log10(np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
LOUD = np.percentile(db, 75)  # nível de fala clara deste arquivo


def loud_seconds(a, b):
    return float((db[int(a * 100):int(b * 100)] > LOUD).sum()) / 100


words = json.load(open(tr, encoding="utf-8"))["words"]
wins = []
for i, w in enumerate(words):
    # palavra esticada com muita energia dentro -> provavelmente esconde outra fala
    if w["e"] - w["s"] > 1.2 and loud_seconds(w["s"], w["e"]) > 0.6:
        wins.append((w["s"], w["e"]))
    if i + 1 < len(words):
        a, b = w["e"], words[i + 1]["s"]
        if b - a > 0.8 and loud_seconds(a, b) > 0.4:
            wins.append((a, b))
# expande 1,5 s para dar contexto e une janelas próximas
wins = sorted((max(0, a - 1.5), b + 1.5) for a, b in wins)
merged = []
for a, b in wins:
    if merged and a <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], b)
    else:
        merged.append([a, b])
print(f"nível 'fala clara' = {LOUD:.1f} dB | {len(merged)} janelas suspeitas")
print(",".join(f"{a:.1f}-{b:.1f}" for a, b in merged))
