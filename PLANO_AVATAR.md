# GaspLab — Plano do mascote "Vini" (avatar do fundador)

Versão 2.1 · 06/10/2026 · **Status: G0 aprovado ("segue com o recomendado"); E1 e E2 concluídas; aguardando G1 (Bíblia), G2 (nível visual) e a decisão de escopo abaixo.** Substitui a v1 (25/09). Decisão do Felipe em 06/10: **o avatar é o mascote da GaspLab**, animado, interativo e reutilizado em vários pontos de chamada.
Saldo Freepik em 06/10: 18.590 créditos no início; **800 gastos** (style board D 600 + par de validação 200).

### 0.1 Estado em 06/10 e decisão de escopo

- **E1 concluída.** Documentos em `brand/avatar/estrategia/` (01 pesquisa, 02 marca, 03 negócio/red team, 04 história, 05 copy, 06 interação, 07 QA visual, 09 fact-check) e a consolidação em **`brand/avatar/BIBLIA_VINI.md`** (referência única do mascote; prevalece sobre as seções 2 e 4 deste plano onde divergir).
- **E2 concluída.** Style board D (`brand/avatar/styleboard-d/`), QA de dois leitores e par de validação. Proposta para G2: nível **"D2+"** (rosto de `d25-02`, tênis de `d25-01`), ver §7.2.
- **Fact-check:** 5 bloqueadores de copy, todos dependentes do fundador (pendências 25–29 em `knowledge/99-pendencias.md`). Nenhuma frase bloqueada vai ao kit ou ao site antes da resposta.
- **Escopo (decisão pendente do Felipe).** O red team (`03-negocio.md`) recomenda **reduzir**: kit mínimo até 16/10 (S01, S04, S07; figurinhas F03, F06, F09; card de prévia; capa de proposta; ~3.300 créditos), portões G2+G3 e G4+G5 aprovados juntos, e site/redes/vídeo/3D só depois, condicionados a um A/B simples na planilha. Argumento: o gargalo é a hora do Felipe, não os créditos.
  **Recomendação do orquestrador: sequenciar, não cortar.** (1) Portões agrupados como o red team propõe. (2) Folha de personagem e biblioteca completa de estados geradas agora, porque custam hora de agente, não do Felipe, e a diferença de créditos entre 3 e 12 poses (~900) é pequena diante do saldo. (3) Kit mínimo de vendas entregue primeiro, em até 2 dias. (4) Site construído pelo agente frontend em paralelo, com aprovação só em G6, depois de 16/10 se o Felipe preferir. (5) **Teste 3D e merch adiados** (sem efeito em caixa; licença de merch não confirmada). Custo estimado deste caminho: ~5.500 créditos até G6, sem vídeo.

O que já existe: style board de 3 rotas em `brand/avatar/styleboard/` (29/09, documentado em `brand/avatar/PROMPTS.md`) e a foto HD `public/vinicius-gasparello-hd.jpg` (1920×2560). As três rotas têm boa semelhança, mas são **retratos de meio-corpo**: servem como prova de identidade, não como personagem.

---

## 0. Resumo executivo

1. **Mascote = o fundador estilizado, com nome próprio.** A semelhança continua (cabelo volumoso, barba, argolas, piercing no nariz, manga tatuada, camiseta preta), mas o traço é simplificado o bastante para funcionar em 48 px, ter 12 poses e animar. Sério, adulto, sem cara de desenho infantil.
2. **Prioridade é caixa.** Os primeiros ativos são os que entram na prospecção pelo WhatsApp e nas prévias, e só depois o site. Teto de **8.000 créditos** para o mascote neste mês, para não faltar crédito às fotos dos pratos das prévias (pendência 15 do `knowledge/99-pendencias.md`).
3. **Animação em duas camadas:** no site, um boneco 2.5D em camadas controlado por código (olhos seguem o cursor, pisca, respira, muda de pose conforme o estado da página). Para vídeo e redes, loops curtos. O 3D entra como **um teste** (1.400 créditos) só depois da folha de personagem, porque o turnaround que vamos gerar é exatamente a entrada multiview que o gerador 3D precisa.
4. **Nove agentes, regra de validação cruzada:** nada é aprovado pelo mesmo modelo que produziu. Os squads XSquads agora estão instalados em `squads/` e os chefes reais são usados.
5. **Sete portões de aprovação** do Felipe. Custo estimado: ~7.900 créditos sem 3D, ~9.300 com o teste 3D.

---

## 1. Decisões propostas (confirmar em G0)

| ID | Decisão | Recomendação | Por quê |
|---|---|---|---|
| D-A1 | Natureza | **Mascote com semelhança do fundador + nome próprio** | É o que o Felipe pediu; o nome e a bíblia de personagem dão à marca um ativo próprio, separado da pessoa, sem fingir que não é o Vinícius |
| D-A2 | Nome | **"Vini"** (alternativas: "Gasp", "Vinícius") | Curto, já é o handle @vini_gasparello, soa humano em "Falar com o Vini". "Gasp" separa mais da pessoa, mas cria um segundo nome para a marca sustentar |
| D-A3 | Estilo | **Rota D — Mascote Blueprint**, em 3 níveis de estilização no próximo style board (ver §2.1) | As rotas A/B/C são retratos; o mascote precisa de corpo, poses e leitura em tamanho pequeno |
| D-A4 | Tecnologia de animação | **T1 (boneco 2.5D em código)** no site + loops de vídeo para redes; **T2 (3D)** como teste único | T1 é leve, fiel ao rosto e totalmente controlável pelo estado da página; 3D é o único caminho para animação de corpo inteiro reutilizável, mas tem risco de perder o rosto |
| D-A5 | Presença no hero | **Sim, como companheiro do CTA**, não como substituto da mensagem | O mascote é dispositivo de chamada; a frase-mãe continua sendo o protagonista do hero |
| D-A6 | Produtos de clientes (Bio + Catálogo, sites) | **Não aparece dentro do produto do cliente**, nem no selo "feito pela GaspLab" (o selo usa o símbolo da marca; abaixo de 48 px o Vini não entra); só no painel interno | Princípio já registrado: a estética é do restaurante, não da GaspLab. Objeção do agente de marca (06/10) aceita |
| D-A7 | Transparência | Legenda "Vini é a versão ilustrada de Vinícius Gasparello, criada com IA a partir de fotos reais" em /sobre e no Brand Book | Empresa que vende IA com governança avisa quando usa IA |
| D-A8 | Voz | 1ª pessoa quando o Vini "fala" (balões, WhatsApp, 404); "nós" no texto institucional | Mascote fala; marca descreve |

---

## 2. Sistema do personagem (bíblia)

### 2.1 Identidade visual e níveis de estilização

Kit de identificação (o que torna a silhueta reconhecível mesmo pequena): cabelo escuro ondulado com volume no topo · barba cheia curta · argolas prateadas nas duas orelhas · piercing no nariz (esquerdo) · manga tatuada preto-e-cinza no braço **direito** · camiseta preta de gola careca · calça jeans escura larga · tênis skate cinza/branco.

Próximo style board (Rota D), corpo inteiro, mesma pose, mesmo fundo, para escolher o nível:

| Nível | Proporção | Traço | Risco |
|---|---|---|---|
| D1 · Retrato animável | cabeça 1:7,5 (real) | vetor limpo, 2 tons de sombra, contorno Signal Azure fino (evolução da Rota C) | pouco "personagem"; some em 48 px |
| **D2 · Personagem estilizado** (recomendado) | cabeça ~1:6,5, olhos 10–15% maiores, mãos simplificadas | formas limpas, cabelo e barba em massas, tatuagem sugerida com 3–4 traços | ponto de equilíbrio entre seriedade e apelo |
| D3 · Mascote gráfico | cabeça ~1:5,5 | quase ícone, detalhes mínimos | pode parecer lúdico demais para B2B |

Teste de silhueta obrigatório: cada nível reduzido a 48 px e 24 px, em escala de cinza. Quem não se reconhece ali, não passa.

### 2.2 Personalidade e voz

- **É:** calmo, atento, direto, confiante sem alarde, levemente bem-humorado, "engenheiro que explica".
- **Não é:** vendedor afobado, infantil, sarcástico, hype de IA, super-herói.
- **Fala** em frases curtas, 1ª pessoa, sem emoji em texto institucional (emoji permitido só no WhatsApp, no máximo 1 por mensagem).
- Nunca promete resultado, prazo ou número que não esteja no Vault (`docs/CONTEXT_VAULT.md`).

### 2.3 Biblioteca de estados (poses) e expressões

| ID | Estado | Uso principal | Nota de pose |
|---|---|---|---|
| S01 | `idle` | hero, CTA flutuante, foto de perfil | em pé, 3/4, mão no bolso, meio-sorriso; **pose-base do rig** |
| S02 | `greet` | figurinha "Oi, da GaspLab" (só depois que o lead responde), entrada no site | aceno curto de mão aberta |
| S03 | `point` | CTAs ("Começar diagnóstico", "Ver prévia") | aponta com a palma aberta para o lado do botão; versões esquerda e direita |
| S04 | `explain` | método, carrosséis, propostas | mão aberta diante de um diagrama translúcido |
| S05 | `think` | formulário processando, "analisando seu cenário" | mão no queixo, olhar para cima-direita |
| S06 | `work` | "prévia em produção", bastidores | sentado com notebook, concentrado |
| S07 | `success` | prévia enviada, diagnóstico recebido, figurinha "Fechado" | aceno de cabeça + sorriso; nó de check ao lado |
| S08 | `review` | governança, human-in-the-loop | mão erguida em "revisar antes de seguir" |
| S09 | `concern` | erro de formulário, aviso | sobrancelha franzida leve, mão a meia altura |
| S10 | `lost` | 404 | mapa-blueprint aberto, sobrancelha erguida |
| S11 | `listen` | diagnóstico (coluna esquerda), "me conta seu gargalo" | inclinado à frente, caderno no joelho |
| S12 | `celebrate` | entrega concluída, figurinha | punho fechado discreto à altura do peito, sem pulo |

Expressões (overlays faciais para o rig): neutro · sorriso fechado · sorriso aberto · concentrado · preocupado leve · olhos fechados (piscar) · pupilas em 5 direções.

Props permitidos: painel blueprint translúcido, nós e linhas Signal Azure, notebook, tablet, caderno. **Proibidos:** balão de HQ desenhado na imagem (o balão é feito em código/Canva), logos de terceiros, texto dentro da imagem, joinha, piscadela, pose de herói.

---

## 3. Mapa de aplicações (ordem por impacto em caixa)

| Prioridade | Aplicação | Ativos | Depende de |
|---|---|---|---|
| **P0 · Vendas (WhatsApp)** | foto de perfil comercial (S01 recorte circular) · capa · pacote de **12 figurinhas** (S02, S03, S05, S07, S12 + variações com legenda curta, **só depois que o lead responde**: o compliance em `knowledge/40-riscos` proíbe mídia na 1ª mensagem fria) · card de **prévia pronta** (S07 + moldura para o print do site) · legendas neutras, sem "sou o Vini", porque quem envia é o Gabriel (o selo "feito pela GaspLab" usa o símbolo, ver D-A6) | E3–E4 |
| **P0 · Proposta / fechamento** | capa de proposta (S04) · página "quem cuida" (S01) · assinatura de e-mail (S01 48 px) | E4 |
| **P1 · Site** | hero com rig interativo (S01→S03 ao passar no CTA) · CTA flutuante "Falar com o Vini" · Método (S04/S05/S06 por etapa) · Diagnóstico (S11 → S05 → S07/S09) · Governança (S08) · 404 (S10) · imagem OG · loading/vazio | E4–E6 |
| **P2 · Redes** | template de post "o Vini explica" (S04 + título) · stickers de stories · bumper de Reels 3 s (loop V3) · status do WhatsApp (V1) | E4–E5 |
| **P3 · Produtos** | painel interno de prévias e tarefas (estados vazio/sucesso/erro: S06/S07/S09) · nunca dentro da página do restaurante (D-A6) | E4 |
| **P4 · Marca** | capítulo "Vini" no Brand Book v2 · regras em `docs/CONTEXTO.md` · wallpaper/Zoom · merch (camiseta, adesivo) · **3D** (teste) | E7 |
| **Futuro** | "Vini assistente": persona de um assistente de IA real no site/WhatsApp, com human-in-the-loop — seria a demonstração viva da tese da GaspLab. Fora deste plano; só registrado para o mascote já nascer compatível (pose `listen`, `think`, avatar circular) | — |

---

## 4. Animação e interatividade

### 4.1 Rotas de tecnologia

| Rota | Como | Prós | Contras | Custo |
|---|---|---|---|---|
| **T1 · Boneco 2.5D em código** (recomendada para o site) | pose-base S01 separada em camadas (corpo, cabeça, braço direito, olhos, pupilas, sobrancelhas, boca) + stills das outras poses com crossfade; animação com `motion` (Framer) ou CSS | leve (≈250–400 KB em AVIF/WebP, carregado sob demanda), fiel ao rosto, reage ao estado da página, sem runtime pesado | gestos de corpo limitados ao que foi gerado; separar camadas exige segmentação e retoque | ~1.500 créditos |
| **T2 · 3D rigado** (teste único) | turnaround → `models3d_generate` (Meshy 7.1, multiview) → `models3d_rig` (Meshy) → `models3d_animate` (catálogo: idle, aceno, andar…) → GLB | animações de corpo inteiro ilimitadas, renders para vídeo/redes, AR; reaproveita o turnaround | 1.160 + 120 + 120 por tentativa; rosto pode degradar; no site pesa (three.js/model-viewer) | 1.400 por teste |
| T3 · Rive/Lottie | animador humano no editor Rive a partir das nossas camadas | o padrão da indústria para mascotes interativos (máquina de estados) | não é gerável por aqui; precisa de pessoa ou contratação | 0 em créditos, horas humanas |
| T4 · SVG animado do Freepik | `images_generate_svg` + `images_animate_svg` com presets `eye-tracking`, `breath-effect` | rápido para um ícone/símbolo animado | vetor por IA perde o rosto; serve mais a ícones e selos do que ao mascote | 375 + cobrança por tokens |

Recomendação: **T1 agora**, T2 como um teste depois da folha de personagem (G3), T3 fica como caminho de evolução se o mascote vingar (as camadas que produzimos são exatamente a entrada que um animador Rive precisa).

### 4.2 Máquina de estados no site

| Estado | Gatilho | Comportamento |
|---|---|---|
| `idle` | padrão | respiração (escala 1→1,01, 4 s), piscar a cada 3–6 s, leve balanço de cabeça |
| `attention` | cursor na viewport (desktop) / scroll (mobile) | olhos e cabeça seguem o cursor em até ±8°; no celular, olhar acompanha o scroll |
| `greet` | primeira entrada do hero na tela, **uma vez por sessão** | aceno único de 1,2 s, sem loop |
| `point` | hover/focus no CTA primário | crossfade S01→S03 (300 ms) olhando para o botão |
| `listen` / `think` | foco em campo do diagnóstico / envio | S11; ao enviar, S05 por 600 ms |
| `success` / `concern` | resposta da API / erro de validação | S07 ou S09 |
| `lost` | /404 | S10 estático |
| reduzido | `prefers-reduced-motion` | só a pose estática do estado atual; nenhuma transição |

CTA flutuante: avatar circular 48 px (S01) no canto inferior direito, pulso **uma vez** ao aparecer; clique abre um card "Falar com o Vini" com WhatsApp e Diagnóstico. Não é chatbot: nada de prometer resposta automática.

### 4.3 Orçamento de desempenho

Lighthouse mobile ≥ 90, CLS < 0,1, LCP no máximo +200 ms sobre a linha de base. Rig carregado abaixo do primeiro paint (o hero mostra S01 estático como `next/image` com dimensões fixas; as camadas entram depois). Vídeos ≤ 1,5 MB, sem áudio, `preload="none"`, pausados fora da tela.

---

## 5. Agentes e modelos

Orquestrador agora é **Fable 5.1** (escolha do Felipe nesta sessão). Pela economia do `CLAUDE.md`, Fable fica só com decisão, síntese e validação final; produção vai para Sonnet; checagem mecânica para Haiku. **Regra:** ninguém valida o que produziu.

| ID | Agente | Definição usada | Produz com | Validado por | Entrega |
|---|---|---|---|---|---|
| O | Orquestrador / diretor de arte | esta sessão | **Fable 5.1** | Felipe | prompts finais, execuções no Freepik, integração, revisão de diffs |
| A1 | Pesquisa | `general-purpose` + WebSearch | **Sonnet 5** | Opus | 1 página: mascotes de fundador B2B que funcionam, regras de imagem/IA (CONAR, LGPD), benchmarks de rig web |
| A2 | Marca | `squads/brand-squad/agents/brand-chief.md` (+ Neumeier, Aaker, Donald Miller) | **Opus 5.5** | Fable | papel do mascote, nome, personalidade, regras de uso, critérios do nível D1–D3 |
| A3 | Negócio + red team | `squads/hormozi-squad/agents/hormozi-chief.md` (+ offers, leads) | **Opus 5.5** | Fable | onde o mascote mexe no funil do WhatsApp, métrica, o que cortar; 5 razões para reduzir escopo |
| A4 | Storytelling | agente `story-chief` | **Sonnet 5** | Opus + A9 | história do Vini em 5 capítulos, roteiro das figurinhas, roteiro do vídeo falado (opcional) |
| A5 | Copy | agente `copy-chief` (+ `copywriter` do site) | **Sonnet 5** | Opus + A9 | legendas das figurinhas, card de primeira mensagem, microcopy do site, 404, alt texts, aviso de IA |
| A6 | Interação / design | agente `design-chief` | **Sonnet 5** | Opus | especificação da máquina de estados, timing, acessibilidade, tamanhos mínimos |
| A7 | QA visual | `general-purpose` com visão | **Sonnet 5** | Opus pontua em paralelo | nota 1–5 por critério em cada imagem (ver §6.1) |
| A8 | Frontend | agente `frontend` | **Sonnet 5** | Fable (diff) + A10 | `lib/avatar.ts`, `components/avatar/*`, integração nas páginas |
| A9 | Checagem de fatos | agente `fact-checker` | **Opus 5.5** (override) | — | toda frase do Vini cruzada com o Vault |
| A10 | QA mecânico | agente `qa-runner` + scripts | **Haiku 4.5** | scripts | Lighthouse, CLS, reduced-motion, peso, rotas |

Modelos de mídia (Freepik, custos de 06/10/2026):

| Uso | Modelo | Créditos |
|---|---|---|
| Rascunhos e teste de silhueta | Nano Banana 2 Lite | 60 |
| Folha de personagem, poses, figurinhas | **Seedream 5 Pro** 2k com referências de personagem | 100 |
| Edições pontuais (olhos fechados, boca, mãos, tatuagem) | Nano Banana Pro | 75 |
| Recorte de fundo | Remove Background | 3 |
| Separação de camadas | `images_segment` (máscara) + `images_retouch` | a simular na E4 |
| Upscale fiel de rosto | Magnific `ultra-sublime` 4x, preset portraits | ~180 |
| Loops de vídeo | Kling 2.5 1080p 5 s (frame inicial = final) | 325 |
| 3D (teste) | Meshy 7.1 multiview + rig Meshy + 1 animação | 1.160 + 120 + 120 |
| SVG do selo animado (opcional) | Recraft vector + animate | 375 + tokens |
| Vídeo falado (opcional) | OmniHuman, 12 s com voz real | ~2.160 |
| Descartado | Seedance 2.5 (2.200–3.950 por clipe); GPT 2.5 com fundo transparente (600) | — |

Avisos do histórico: o filtro de conteúdo do Freepik dá falso positivo em prompts genéricos de "homem sorrindo"; gerações falhas não são cobradas. Pós-produção (encode, poster, verificação de loop, geração dos tamanhos) é por **script ffmpeg/sharp, zero créditos**.

---

## 6. Fases e portões

```
G0 plano+fotos ─► E1 Estratégia (texto) ─► G1 Bíblia do Vini
 ─► E2 Style board Rota D ─► G2 nível de estilização
 ─► E3 Folha de personagem + biblioteca Freepik ─► G3 "é você?"
 ─► E4 Biblioteca de estados + camadas ─► G4 conjunto
 ─► E5 Kit de vendas (P0) ─► G5 → entra na prospecção imediatamente
 ─► E6 Site (P1) ─► G6 preview na Vercel
 ─► E7 Redes, marca, 3D ─► G7
```

| Fase | Quem | Entrega | Créditos | Aceite |
|---|---|---|---|---|
| **E1 Estratégia** | A1 ∥ A2 → A3 → A4 → A5/A6 → A9 | **Bíblia do Vini** (2 páginas): nome, personalidade, regras, biblioteca de estados revisada, mapa de aplicações priorizado, especificação de interação | 0 | G1 |
| **E2 Style board D** | O → A7 | 3 níveis × 2 variações, corpo inteiro, + prancha de silhueta 48/24 px gerada por script | ~600 | G2 |
| **E3 Folha de personagem** | O → A7 | turnaround (frente, 3/4, perfil, costas) + 7 expressões; upscale; personagem `vini-mascote` na Biblioteca do Freepik | ~700 | G3: Felipe + A7 e Opus ≥ 4/5 |
| **E4 Estados e camadas** | O → A7 | 12 poses (S01–S12) em fundo navy chapado + recorte; overlays faciais; camadas do rig de S01 (cabeça, corpo, braço) com retoque | ~3.400 | G4 |
| **E5 Kit de vendas** | A5 → O → scripts | perfil e capa do WhatsApp, 12 figurinhas (WebP 512×512 com margem), card de primeira mensagem, card de prévia pronta, selo, assinatura, capa de proposta | ~600 | G5 → uso imediato |
| **E6 Site** | A6 → A8 → O → A10 + A9 | rig, máquina de estados, CTA flutuante, integração nas páginas, OG, 404, aviso de IA | 0 | G6 |
| **E7 Extensões** | O / `brand-assets` | loops V1–V3 (Kling), templates de redes, capítulo no Brand Book, `CONTEXTO.md`; **teste 3D** se aprovado | ~1.300 (+1.400 3D) | G7 |

**Teto:** 8.000 créditos no mês (9.400 com o 3D). Se uma fase passar de 110% do seu orçamento, paro e aviso. Registro de cada geração (modelo, prompt, referências, créditos, aprovação) em `brand/avatar/PROMPTS.md`; pasta "GaspLab — Vini" no Freepik.

---

## 7. Prompts

### 7.1 Briefings dos agentes (E1)

Todo agente lê `docs/CONTEXTO.md`, as seções 1–4 deste plano e `knowledge/00-gasplab/negocio-atual.md`. Ninguém lê o handoff antigo.

**A1 · Pesquisa (Sonnet)**
> Em 1 página, com links: (1) 6 a 8 marcas B2B ou de serviços que usam mascote com a cara do fundador ou personagem humano estilizado, e o que faz cada um parecer sério ou infantil; (2) regras de divulgação de imagem gerada por IA no Brasil (CONAR, LGPD: imagem e dados biométricos) e cláusulas de licença do Freepik Premium para uso comercial; (3) como sites de referência fazem mascote interativo leve (Rive, Lottie, SVG em camadas) e o custo de desempenho de cada um; (4) formatos técnicos de figurinha do WhatsApp (WebP 512×512, limite de KB, margem). Marque o que é opinião. Não invente fontes.

**A2 · Marca (Opus, brand-chief)**
> Com o CONTEXTO, a pesquisa e as seções 1–3 deste plano, entregue a **Bíblia do Vini** em até 2 páginas: papel na arquitetura de marca (mascote do fundador vs. marca GaspLab, e como o símbolo da marca e o mascote convivem); decisão de nome com justificativa; 5 traços "é / não é"; regras de uso (onde entra, onde não entra, tamanho mínimo, fundos, expressões, convivência com logo); critérios objetivos para escolher o nível D1/D2/D3; o que precisa mudar no Brand Book v2. Aponte conflitos com o `CONTEXTO.md` (regra de motion, marcas de clientes).

**A3 · Negócio + red team (Opus, hormozi-chief)**
> Caixa zero, meta de R$ 15 mil em 15 dias via prospecção no WhatsApp (sites a R$ 597 e Bio + Catálogo). Responda: (1) em que ponto do funil (primeira mensagem, prévia, proposta, follow-up) o mascote aumenta resposta ou fechamento, e por quê; (2) onde ele atrapalha ou soa amador; (3) que ativos do §3 entregar primeiro e quais cortar agora; (4) métrica de sucesso em 15 dias e como medir sem analytics sofisticado; (5) red team: 5 motivos para reduzir o escopo e o que você faria com os mesmos 8.000 créditos se não fosse o mascote. Direto, até 2 páginas.

**A4 · Storytelling (Sonnet, story-chief)**
> Só com fatos do CONTEXTO e do Vault. Entregue: (1) quem é o Vini em 5 linhas (origem, o que ele faz quando aparece, o que nunca faz); (2) a história do fundador em 5 capítulos (2017→2025), 2–3 linhas cada, com descrição visual para as cenas C1–C5; (3) roteiro das 12 figurinhas (situação de uso no WhatsApp + legenda de até 4 palavras); (4) roteiro de 12–15 s para vídeo falado opcional, voz real.

**A5 · Copy (Sonnet, copy-chief)**
> Escreva, em 1ª pessoa quando o Vini fala: card de primeira mensagem do WhatsApp (até 25 palavras, sem promessa numérica); mensagem de prévia pronta; legendas das 12 figurinhas; microcopy do site por estado (hero, CTA flutuante, método por etapa, diagnóstico: listen/think/success/concern, 404); aviso de transparência; alt text de cada pose. Clareza antes de criatividade. Nada fora do CONTEXTO.

**A6 · Interação (Sonnet, design-chief)**
> Especifique a máquina de estados do §4.2 em detalhe: eventos, transições, durações, easing, limites de rotação, comportamento no mobile, `prefers-reduced-motion`, foco por teclado no CTA flutuante, contraste do balão, tamanhos mínimos (48 px avatar, 32 px selo). Entregue como tabela + lista de componentes para o frontend.

**A7 · QA visual (Sonnet)**
> Compare cada imagem com `public/vinicius-gasparello-hd.jpg` e com a folha aprovada. Nota 1–5 em: semelhança facial · cabelo e barba · argolas e piercing · tatuagem (braço direito, estilo) · figurino · mãos e anatomia · seriedade · paleta · ausência de texto/logo · coerência com o nível escolhido. Reprovado se qualquer item < 4. Não conserte; aponte.

### 7.2 Blocos fixos de imagem (inglês, onde os modelos respondem melhor)

**IDENTITY_LOCK** (referência de personagem: foto HD; depois, o personagem `vini-mascote` da biblioteca)
```
Vini, a stylized character based on the reference photos of a young adult man — keep the facial likeness
recognizable. Medium-length dark brown wavy hair with volume on top, swept back and tousled, longer at the nape.
Short full light-brown beard and mustache. Warm brown eyes, defined brows. Tiny stud on the left nostril,
small silver hoop earrings on both ears. Slim athletic build. Black-and-grey realism sleeve tattoo on the RIGHT
arm only. Plain fitted black crew-neck t-shirt, dark wide-leg denim, grey-and-white skate sneakers.
```

**STYLE_D** (substituir `{LEVEL}` pelo bloco do nível)
```
Clean stylized character illustration for a technology brand mascot: {LEVEL}. Smooth vector-like shapes,
two-tone cel shading, thin Signal Azure (#6CC0FF) accent outline on the silhouette, natural warm skin tone,
hair and beard drawn as clean masses with a few defining strands. Palette restricted to deep navy
(#070A12, #0E1424, #0B1530), Gasp Blue (#4D7CFF) and Signal Azure. Faint blueprint grid behind.
Calm, credible, adult, premium. Consistent construction suitable for animation and small sizes.
```
- `LEVEL_D1`: `realistic adult proportions (about 7.5 heads tall), minimal stylization`
- `LEVEL_D2`: `slightly stylized adult proportions (about 6.5 heads tall), eyes 10–15% larger, simplified hands, refined features`
- `LEVEL_D3`: `graphic mascot proportions (about 5.5 heads tall), bold simplified shapes, minimal interior detail`
- **`LEVEL_D2PLUS` (especificação corrigida após o QA de 06/10, proposta para G2):** `stylized adult proportions about 5.5 to 6 heads tall, eyes only 10–15% larger than realistic, thick defined dark eyebrows, slightly deep-set eyes, full short beard, simplified hands with five fingers, refined adult features`. No IDENTITY_LOCK, trocar o piercing por `a tiny flat silver stud (not a ring) on the left nostril` e os tênis por `plain generic grey-and-white skate sneakers with no brand logos, no side stripes and no swoosh`.

**AVOID**
```
Avoid: cartoon exaggeration, oversized head beyond the stated proportion, oversized eyes, anime, chibi, toy-like 3D,
caricature, cute or childlike look, neon cyberpunk, glowing particles, lens flare, any text, letters, numbers,
logos, brand marks, sneaker swoosh or side stripes, watermarks, speech bubbles, green tones, extra or fused fingers,
distorted hands, tattoo on the left arm, nose ring, removing beard, hoops or nose stud.
```
Regra de QA aprendida em 06/10: toda imagem passa por zoom nos pés e no nariz antes de ser aprovada (o modelo insere swoosh da Nike e listra da Vans mesmo com o AVOID). Seedream 5 Pro não aceita 4:5: usar **3:4**.

### 7.3 Prompts por fase

**E2 · Style board D** (Seedream 5 Pro, 4:5, 2k, 1 por nível × 2 variações: meio-sorriso / sorriso aberto)
```
[IDENTITY_LOCK] Full-body standing pose, three-quarter view facing the viewer, one hand relaxed in the pocket,
open posture, calm confident {half-smile | open smile}, direct eye contact. Plain solid deep navy background
(#0B1530). [STYLE_D with LEVEL_Dn] [AVOID]
```
Script: gera prancha comparativa + versões 48/24 px em cinza.

**E3 · Folha de personagem** (Seedream 5 Pro, 16:9, 2k; depois corte em quadros, upscale e `library_create` tipo character)
```
Character model sheet of Vini. [IDENTITY_LOCK]
Row 1: full-body turnaround — front, three-quarter, side profile, back — standing neutral, arms relaxed.
Row 2: seven head close-ups — neutral attentive, closed-mouth smile, open smile, focused thinking, slightly
concerned, eyes closed (blink), looking up-right. Same proportions and lighting in every frame, plain deep navy
background (#0B1530), generous spacing, no labels. [STYLE_D chosen level] [AVOID]
```

**E4 · Estados S01–S12** (Seedream 5 Pro, 2k, referência = personagem da biblioteca; fundo chapado para recorte)
```
[IDENTITY_LOCK] {POSE}. Framing: {full body | three-quarter}. Plain solid deep navy background (#0B1530),
soft even light with a Signal Azure rim light. [STYLE_D chosen level] [AVOID]
```

| ID | POSE |
|---|---|
| S01 | Standing, three-quarter turn toward the viewer, right hand relaxed in pocket, left arm relaxed, open posture, calm closed-mouth smile, direct eye contact. |
| S02 | Standing, friendly short wave with the right hand open at shoulder height, warm smile. |
| S03a / S03b | Standing, presenting with an open palm toward the {right | left} side of the frame, attentive expression, eyes toward the same side. |
| S04 | Standing beside a floating translucent blueprint panel, open hand explaining a diagram of three connected nodes. |
| S05 | Standing, one hand at the chin, eyes up and to the right, thinking. |
| S06 | Seated at a minimal desk with an open laptop, typing, concentrated, body slightly turned to the viewer. |
| S07 | Standing, subtle approving nod, soft smile, a single glowing check-mark node floating beside the shoulder. |
| S08 | Standing beside a horizontal flow line that pauses at a checkpoint node, right hand raised calmly at shoulder height in a "review before continuing" gesture. |
| S09 | Standing, slightly concerned brow, hand half raised at chest height, open palm, calm. |
| S10 | Holding an unfolded blueprint map with both hands, composed and slightly amused, one eyebrow raised. |
| S11 | Seated, leaning forward attentively, open notebook on the knee, listening. |
| S12 | Standing, discreet closed fist at chest height, satisfied closed-mouth smile, shoulders relaxed. |

**E4 · Camadas do rig** (a partir de S01): `images_segment` com prompts `"the head with hair and beard"`, `"the right arm"`, `"the torso and legs"` → máscaras → `images_retouch` para completar o que fica escondido atrás da cabeça e do braço (clean plate) → recortes PNG. Overlays faciais com Nano Banana Pro sobre o recorte da cabeça: `"same image, eyes closed"`, `"same image, pupils looking {left|right|up|down}"`, `"same image, slightly raised brows"`, `"same image, open smile"`.

**E5 · Figurinhas:** reaproveitam S02, S03, S05, S07, S09, S12 + 6 variações com props (xícara de café, notebook fechado, nó de check, ponto de interrogação em Signal Azure); exportadas por script em WebP 512×512 com 16 px de margem e < 100 KB.

**E7 · Vídeos (Kling 2.5, 1080p, 5 s, frame inicial = final)**
- V1 status/sobre (S01): `The character keeps the same pose and position; breathes naturally, blinks once, a warm subtle smile forms and relaxes, very slight head tilt. Camera and background completely static. Minimal, calm, realistic motion. No talking, no hand movement, no zoom.`
- V2 diagnóstico (S11): `He looks up from the notebook to the viewer, gives a small welcoming nod with a calm smile, then returns to the initial pose. Camera and background static. Minimal calm motion. No talking.`
- V3 bumper de Reels (S02): `Short friendly wave of the right hand, then the hand returns to rest. Camera static, background static. Calm, minimal.`

**E7 · 3D (teste):** `models3d_generate` com `views` = {front, left, back, right} do turnaround, `model: meshy-7.1`, `textureQuality: standard` → `models3d_rig` `provider: meshy` → `models3d_animate` (idle). Aceite: rosto reconhecível em render frontal; senão, o 3D é descartado e fica registrado.

---

## 8. Implementação técnica (E6)

- `lib/avatar.ts`: fonte única das poses (`src`, `alt`, `width`, `height`, `state`) e dos overlays, no padrão de `lib/diagnostic.ts`.
- `components/avatar/vini.tsx`: componente do rig (`<Vini state="idle" size="hero" />`), camadas posicionadas em porcentagem sobre a pose-base; **CSS puro + controlador JS fino, sem dependência `motion`** (decisão do agente de interação em `brand/avatar/estrategia/06-interacao.md`: 0 kB contra 20–34 kB, mesmo padrão do `ArchitectureFlow`); hook `useViniState()` para as páginas disparar estados. O rig fica **só no hero da home**; demais pontos usam stills com crossfade. `usePrefersReducedMotion` sai de `visuals.tsx` para `lib/use-prefers-reduced-motion.ts`.
- `components/avatar/vini-float.tsx`: CTA flutuante com card (WhatsApp + Diagnóstico), eventos `track()` existentes (`whatsapp_click`, `diagnostic_start`).
- `components/avatar/vini-still.tsx`: `next/image` com dimensões fixas para 404, OG, método.
- Assets otimizados em `public/avatar/` (AVIF + WebP + PNG fallback, 1x/2x). Masters 2k ficam no Freepik e em `brand/avatar/masters/` (fora do git por peso: entrada no `.gitignore`).
- Copy em `lib/content.ts`; cores só por tokens; respeito ao `CONTEXTO.md` (motion com propósito: aqui o propósito é **estado da página**, documentado na regra).
- Commits por caminho explícito (outra sessão usa a pasta).

## 9. Critérios de aceite

- Semelhança aprovada pelo Felipe (G3) e nota ≥ 4 em todos os critérios por **dois modelos independentes** (Sonnet e Opus).
- Teste de silhueta: reconhecível em 48 px e 24 px.
- Kit de vendas usado na prospecção a partir de G5, com registro de taxa de resposta antes/depois (métrica definida por A3).
- Site: Lighthouse mobile ≥ 90, CLS < 0,1, LCP +200 ms no máximo; reduced-motion sem transições; teclado alcança o CTA flutuante.
- Fact-checker sem pendências; aviso de IA presente; nenhuma frase do Vini com promessa ou número fora do Vault.

## 10. Riscos

| Risco | Mitigação |
|---|---|
| Estilização apaga a semelhança (ou o contrário: fica foto) | style board em 3 níveis + teste de silhueta + G2 |
| Rosto deriva entre poses | personagem na Biblioteca do Freepik + IDENTITY_LOCK + QA de dois modelos |
| Camadas do rig com bordas sujas | segmentação + retoque só na pose-base; demais poses são stills |
| Mascote soa amador na prospecção B2B | red team do hormozi-chief antes de gerar; figurinhas com legenda sóbria |
| Créditos do mascote faltarem às prévias | teto de 8.000 e parada em 110% por fase |
| Site mais pesado | hero com still estático primeiro, rig sob demanda, vídeos só fora do hero |
| Uso comercial das gerações | A1 confirma a licença Premium antes de G5 |
| 3D decepciona | é um teste único, com critério de descarte definido |

## 11. O que preciso do Felipe (G0)

1. **Confirmar as decisões D-A1 a D-A8** (ou dizer o que muda). As duas mais importantes: nome ("Vini"?) e nível de estilização (posso gerar os 3 níveis para você escolher em G2).
2. **Fotos extras** (a HD frontal já resolve o rosto): 3/4 esquerda, 3/4 direita, perfil, corpo inteiro de pé, detalhe do braço tatuado. Sem isso, o turnaround sai com mais tentativas.
3. **Teste 3D (1.400 créditos):** sim ou não?
4. **Ordem de prioridade:** vendas (P0) antes do site (P1) está certo para o momento de caixa?
5. **Escopo P0:** quem usa as figurinhas e o card de primeira mensagem é o Gabriel? Quero garantir que o kit chega em formato pronto para o WhatsApp dele.
6. **História:** a cena real que fez você criar a GaspLab (vira o capítulo 5 e o roteiro).
