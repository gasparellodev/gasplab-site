# Critérios editoriais da decupagem

O script corta silêncio; **o Claude decide o que sai por conteúdo**. Montar `cortes.json`:

```json
[{"start": 12.30, "end": 18.90, "motivo": "take 1 de 'O papel do Jarvis...' (fica o take 2)"}]
```

Tempos em segundos do ORIGINAL. Uma palavra é descartada se o meio dela cai dentro do intervalo.
Usar o início da primeira palavra descartada e o fim da última (com folga de ~0,02 s).

## O que descartar

1. **Takes repetidos**: mesma frase (ou quase) dita 2+ vezes → manter o ÚLTIMO take completo
   e fluente; descartar os anteriores inteiros. Se o último tiver erro e um anterior estiver
   limpo, manter o limpo (anotar no motivo).
2. **Falsos começos**: "A GaspLab… a GaspLab é" → sai o primeiro "A GaspLab…".
3. **Frases abandonadas** no meio, seguidas de recomeço.
4. **Meta-fala de gravação**: "vou de novo", "corta", "pera", "deixa eu ver", "gravando?",
   contagem "3, 2, 1", comentários com quem está atrás da câmera.
5. **Muletas isoladas longas** ("éééé…", "hum…") entre frases — só se isoladas por pausa;
   muleta colada na frase fica (cortar no meio da palavra soa artificial).

## O que NÃO fazer

- Não reordenar frases nem montar frase com pedaços de takes diferentes (vira "Frankenstein").
- Não cortar respiração que antecede frase (o `decupar.py` preserva de propósito).
- Não remover "né", "tipo", "então" que fazem parte do ritmo da fala.
- Na dúvida entre dois takes, manter o que tem melhor entonação de fechamento (ponto final
  descendente) — sinalizar no relatório para revisão humana.

## Como ler a transcrição

Gerar uma visão por frase com pausa anterior (ajuda a ver blocos de take):

```python
import json; t=json.load(open('transcript.json',encoding='utf-8'))
for s in t['segments']: print(f"{s['s']:7.2f}-{s['e']:7.2f} {s['text']}")
```

O Whisper às vezes "funde" um take repetido num segmento só ou omite a repetição — quando um
segmento tem duração muito maior que o texto (ex.: 18 s para 15 palavras), olhar as palavras
(`t['words']`) daquele intervalo e a energia do áudio: provavelmente há take descartado ali.
Com `condition_on_previous_text=False` as repetições costumam aparecer.
