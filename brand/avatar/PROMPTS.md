# GaspLab — Avatar do fundador

## Style board v1

Gerado em 29/09/2026 com a ferramenta integrada de geração de imagens, usando
`public/vinicius-gasparello-hd.jpg` como referência de identidade.

### Constantes

- Retrato de meio-corpo em proporção 4:5.
- Camiseta preta lisa, postura aberta, contato visual direto.
- Paleta navy da GaspLab com Gasp Blue e Signal Azure.
- Sem texto, letras, números, logos ou marcas d'água.
- Sem exagero cartunesco, anime, chibi, estética de brinquedo ou neon cyberpunk.
- A tatuagem visível permanece no braço direito do personagem.

### Rota A — Blueprint Editorial

Ilustração editorial semirrealista de revista premium de tecnologia, linework limpo,
cel shading sutil, pele natural, proporções realistas, grid técnico e linhas de
construção discretas no fundo.

- `styleboard/route-a-blueprint-editorial-01.png`: meio-sorriso fechado e composição mais dinâmica.
- `styleboard/route-a-blueprint-editorial-02.png`: sorriso aberto e composição mais frontal.

### Rota B — Digital Twin 3D

Personagem 3D estilizado-realista com proporções humanas, pele e cabelo naturais,
luz de produto premium, fundo navy e rim light azul discreto.

- `styleboard/route-b-digital-twin-01.png`: meio-sorriso fechado e ângulo três-quartos.
- `styleboard/route-b-digital-twin-02.png`: sorriso aberto e ombros mais frontais.

### Rota C — Vector Flowline

Retrato vetorial editorial com planos geométricos, sombreamento em dois tons,
contornos controlados e linhas de fluxo azuis, preparado para futura conversão em SVG.

- `styleboard/route-c-vector-flowline-01.png`: meio-sorriso fechado e composição limpa.
- `styleboard/route-c-vector-flowline-02.png`: sorriso aberto e fundo com flowlines mais expressivas.

## Observações de QA

- As seis imagens preservam bem rosto, cabelo, barba, piercing e figurino da referência.
- A Rota A tem a melhor combinação de identidade da marca, seriedade e legibilidade.
- A Rota B mantém maior realismo, mas se aproxima de fotografia e diferencia menos a marca.
- A Rota C é a mais leve e animável, com perda moderada de detalhe facial.
- Antes da folha de personagem final, confirmar a rota e a variação preferidas.

## Style board v2 — Rota D (mascote), 06/10/2026

Gerado pelo Freepik MCP, projeto "GaspLab — Vini", modelo **Seedream 5 Pro**, 2k, pedido em 4:5 (o modelo não aceita 4:5 e ajustou para **3:4**), 2 variações por nível, **600 créditos** no total (100 por imagem). Referências de imagem: `public/vinicius-gasparello-hd.jpg` e a foto de corpo inteiro do espelho (figurino). Arquivos em `styleboard-d/` (`d1-01`, `d1-02`, `d2-01`, `d2-02`, `d3-01`, `d3-02` + `prancha-silhueta.png`, gerada por `scripts-silhueta.mjs`).

Prompt = IDENTITY_LOCK + pose + STYLE_D com o bloco do nível + AVOID, exatamente como na seção 7 de `PLANO_AVATAR.md`. Diferenças entre os níveis:

- **D1:** `realistic adult proportions (about 7.5 heads tall), minimal stylization`
- **D2:** `slightly stylized adult proportions (about 6.5 heads tall), eyes 10–15% larger, simplified hands, refined features`
- **D3:** `graphic mascot proportions (about 5.5 heads tall), bold simplified shapes, minimal interior detail`

QA: `estrategia/07-qa-styleboard-d.md` (agente A7, Sonnet) + leitura do orquestrador. Decisão do nível: portão G2 (Felipe).

### Par de validação "D2+" (06/10/2026, 200 créditos)

Depois do QA (`estrategia/07-qa-styleboard-d.md`: recomendou D3-01 pela leitura em 48 px e D2-02 pela semelhança; apontou olhos grandes demais no D3, sobrancelha e barba fracas, argola no nariz em vez de pino e **swoosh da Nike / listra da Vans nos tênis**), geramos 2 imagens com a especificação corrigida, Seedream 5 Pro 3:4 2k, referências: foto HD + foto de corpo inteiro (image) + `d3-01` (style):

- proporção "about 5.5 to 6 heads tall", olhos "only 10–15% larger than realistic";
- "thick defined dark eyebrows, slightly deep-set eyes, full short beard", "tiny flat silver stud (not a ring) on the left nostril";
- "plain generic grey-and-white skate sneakers with no brand logos, no side stripes and no swoosh";
- braço tatuado virado para a câmera; `d25-01` = meio-sorriso, `d25-02` = sorriso aberto.

Resultado (`styleboard-d/d25-01.png`, `d25-02.png`, `prancha-validacao.png`): semelhança facial muito melhor nas duas (o D25-02 é a melhor referência de rosto até agora); pino no nariz correto; a proporção ficou perto do D2 (o modelo não empurrou a cabeça como pedido). **D25-02 voltou a trazer um swoosh da Nike no tênis direito; D25-01 saiu sem marca.** Lição: a regra dos tênis precisa ficar na frase da pose e no AVOID, e todo resultado passa por zoom nos pés antes de aprovar.

Decisão proposta para G2: base "D2+" = rosto/identidade do D25-02 + tênis do D25-01, referências de personagem na folha: foto HD + d25-02 + d25-01.
