---
name: decupagem-video
description: Decupagem de vídeo falado (talking head, Reels, aula, depoimento) — remove silêncios, descarta takes repetidos/errados, mantém pausas naturais e respiros antes das frases, renderiza master 4K HDR + versão Reels 1080p e cria o projeto pronto no CapCut Desktop. Usar quando pedirem "decupar", "cortar silêncios", "tirar os respiros/pausas", "jump cut", "limpar o vídeo", "montar no CapCut" ou mandarem um .MOV/.MP4 de gravação de fala.
---

# Decupagem de vídeo (GaspLab)

Pipeline determinístico: **scripts fazem o mecânico, o Codex faz o editorial** (escolher takes).
Tudo roda local, sem MCP de terceiros. Scripts em `scripts/`, molde do CapCut em `assets/`.

## Ambiente desta máquina (já resolvido — não redescobrir)

- `ffmpeg/ffprobe` 9.x no PATH; GPU GTX 1650 → NVENC (`hevc_nvenc` 10-bit, `h264_nvenc`).
- Python via `uv`. O link de versão do uv está quebrado: usar o interpretador explícito
  `PY="C:/Users/Felipe Pessoa/AppData/Roaming/uv/python/cpython-3.12.14-windows-x86_64-none/python.exe"`
  e `uv run --no-project --python "$PY" ...`.
- **faster-whisper: fixar `ctranslate2==4.5.0` + `"setuptools<70"`** (4.8.x dá segfault aqui). O áudio
  é passado como numpy (o PyAV novo quebra o `decode_audio`).
- Exportar `PYTHONIOENCODING=utf-8` e `HF_HUB_DISABLE_SYMLINKS_WARNING=1`.
- CapCut Desktop 9.5 em `%LOCALAPPDATA%/CapCut`; projetos em `User Data/Projects/com.lveditor.draft/`.

## Fluxo

Trabalhar numa pasta `work/` ao lado do vídeo. `S=.Codex/skills/decupagem-video/scripts`.

1. **Inspecionar**: `ffprobe` (duração, rotação, HDR `arib-std-b67`, fps — iPhone grava VFR).
2. **Extrair áudio**: `ffmpeg -i V -vn -ac 1 -ar 48000 -c:a pcm_s16le audio48k.wav` e
   `ffmpeg -i audio48k.wav -ar 16000 audio16k.wav`.
3. **Transcrever** (em background, ~1–2× a duração na CPU):
   `uv run --no-project --python "$PY" --with faster-whisper --with ctranslate2==4.5.0 --with "setuptools<70" python $S/transcribe.py audio16k.wav transcript.json`
4. **Decupagem editorial (Codex)**: ler `transcript.json` (palavras com tempo) e montar `cortes.json`
   com os trechos a DESCARTAR — critérios em `references/criterios-decupagem.md`. Regra de ouro:
   em take repetido, fica o **último take completo**; nunca inventar/reordenar falas.
5. **Cortar silêncios + respiros**:
   `uv run --no-project --python "$PY" --with numpy python $S/decupar.py audio48k.wav transcript.json edl.json --drop cortes.json`
   Gera `edl.json` (trechos mantidos, alinhados a quadros) e `edl.md` (relatório legível).
   Ajustes finos: `--tail`, `--tail-end`, `--pre`, `--merge-gap`, `--keep-breaths 0`.
6. **Render** (GPU): `uv run --no-project --python "$PY" --with numpy python $S/render.py V edl.json audio48k.wav <saida> --nome X`
   → `X_master_4K_HDR.mp4` (HEVC 10-bit HLG) + `X_reels_1080.mp4` (H.264 SDR, tonemap mobius, -14 LUFS).
7. **CapCut**: fechar o CapCut e rodar `"$PY" $S/capcut_draft.py build edl.json V --nome "X"`.
   Cada trecho vira um clipe apontando para o ORIGINAL (bordas ajustáveis no CapCut).
   Abrir o CapCut e conferir que o projeto aparece na tela inicial.
8. **QA** antes de entregar: ouvir 3–4 junções (extrair trechos curtos do reels e checar
   estalo/corte de sílaba), conferir duração final = soma do EDL, cor do master = HLG.

## Quando o CapCut atualizar e o projeto não abrir

Rodar `"$PY" $S/capcut_draft.py extract "<draft com vídeo>" "<draft vazio>"` apontando para dois
projetos criados na versão nova (um com clipes de vídeo, um vazio). Isso regrava
`assets/capcut_template.json` com os moldes da versão instalada.

## Entrega

- Vídeos em `<pasta do vídeo>/entrega/`, relatório `edl.md` junto.
- Não deixar processos ffmpeg/servidores rodando ao terminar.
