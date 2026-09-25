# GaspLab — Ativos de marca

Pasta de ativos de marca da GaspLab. Fonte de verdade das cores: `app/globals.css` (bloco `:root`). Substitui integralmente a v1 do brand book (paleta verde, tese "Tecnologia que move negócios"), descontinuada.

## Arquivos

```
brand/
├── GaspLab_Brand_Book_v2.docx   Brand book completo, editável (Word)
├── GaspLab_Brand_Book_v2.pdf    Brand book completo, para leitura/distribuição
├── README.md                    Este arquivo
├── logo/
│   ├── gasplab-symbol.svg           Símbolo isolado (viewBox 0 0 36 36)
│   ├── gasplab-horizontal.svg       Símbolo + wordmark, para fundo escuro (--background/--card)
│   ├── gasplab-horizontal-light.svg Símbolo + wordmark, para fundo claro (--paper, #EAF3FF)
│   ├── gasplab-mono-white.svg       Versão monocromática branca (fotografia/cor sólida)
│   └── gasplab-mono-black.svg       Versão monocromática preta (impressão/editorial)
├── scripts/
│   └── export-tokens.mjs        Gera brand/tokens/gasplab-tokens.json a partir de app/globals.css
└── tokens/
    └── gasplab-tokens.json      Design tokens (W3C Design Tokens format) — cor, tipografia, radius
```

`public/favicon.svg` (fora desta pasta, mas mantido em sincronia) usa a mesma geometria do símbolo, com fundo `#070A12` arredondado.

## Como regenerar os tokens

Sempre que `app/globals.css` mudar (`:root`), rode a partir da raiz do projeto:

```bash
node brand/scripts/export-tokens.mjs
```

O script lê o bloco `:root`, resolve `var()` recursivamente e regrava `brand/tokens/gasplab-tokens.json`. Não edite o JSON à mão — ele é sempre derivado do CSS.

## Como o Brand Book foi gerado

Sem acesso a LibreOffice/pandoc/Python neste ambiente. O `.docx` foi montado com a lib npm `docx` e o `.pdf` com `pdfkit` (ambas instaladas numa pasta temporária fora do projeto, nunca no `package.json` do site). As fontes Space Grotesk e IBM Plex Mono (pesos regular/medium/semibold/bold) foram baixadas do Google Fonts e:

- **embutidas no PDF** (`pdfkit.registerFont`) — abre com a tipografia correta em qualquer leitor;
- **não embutidas no `.docx`** — o documento referencia "Space Grotesk" / "IBM Plex Mono" pelo nome; se a máquina que abrir o arquivo não tiver essas fontes instaladas, o Word substitui por uma fonte padrão. Para embutir de verdade no Word, use Arquivo → Opções → Salvar → "Inserir fontes no arquivo" antes de distribuir.

Os logos usados dentro do brand book são PNGs renderizados dos próprios SVGs de `brand/logo/` (via `@resvg/resvg-js`, com as mesmas fontes), então texto e cor batem exatamente com os arquivos vetoriais.

Para reconstruir os documentos a partir do zero, seria necessário recriar os scripts `render-logos.mjs`, `build-docx.mjs` e `build-pdf.mjs` (não versionados no repositório — foram executados em pasta temporária) usando `brand/logo/*.svg` e `brand/tokens/gasplab-tokens.json` como entrada.
