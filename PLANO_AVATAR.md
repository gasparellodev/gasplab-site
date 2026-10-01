# GaspLab — Plano do avatar do fundador

Versão 1.0 · 25/09/2026 · **Status: aguardando aprovação.** Nada foi gerado e nenhum crédito foi gasto.
Os custos em créditos abaixo foram consultados no simulador do Freepik nesta data. Saldo atual: **6.535 créditos** (plano Premium).

---

## 0. Resumo

- O avatar é o Vinícius ilustrado em tom sério, no estilo Blueprint. No site ele faz o papel de **guia** do cliente. Não é o protagonista nem o mascote da marca.
- Ele só aparece onde explica alguma coisa: no método (uma pose por etapa), na história em /sobre, no diagnóstico, na governança, na página 404 e na imagem OG. **O hero continua falando do problema do cliente.**
- São 9 agentes. Quem produz nunca é validado pelo mesmo modelo, e você aprova em 6 portões.
- O custo estimado é de cerca de 4.900 créditos (sem vídeo falado). Em tokens de LLM, fica em poucos dólares.

---

## 1. Análise: o que define se o resultado fica excelente

1. **Guia, não herói.** Pelo StoryBrand, o herói é o empresário e o Vinícius é o guia, que traz empatia e autoridade. Se o avatar entrar no hero, ele tira o protagonismo do cliente. Por isso ele aparece a partir da seção do Método.
2. **Fundador, não mascote.** Isso preserva o crescimento: se a GaspLab crescer, a marca continua sendo o sistema Blueprint e o avatar continua sendo "o fundador". O guia de estilo já permite criar avatares do time no mesmo traço mais tarde.
3. **Há conflito com a regra de motion atual.** Hoje o `CONTEXTO.md` diz que "motion só quando explica causa, relação, estado ou transformação". A saída proposta:
   - o avatar só se move quando o conteúdo muda de estado (etapa do método, envio do formulário);
   - fora isso, são 2 loops curtos, dentro de cards, que pausam fora da tela e são desligados por `prefers-reduced-motion`;
   - nada flutua ou pisca em loop pela página.
4. **Transparência.** Um site que vende IA com governança não pode usar um avatar gerado por IA sem avisar. Basta uma legenda curta.
5. **Verdade.** O avatar não "diz" nada que o Vinícius não diria. Não haverá voz clonada nem TTS no lugar dele: se existir vídeo falado, ele usa a voz real gravada.
6. **O maior risco técnico é a consistência do rosto.** Hoje há só 2 fotos, e uma delas é de espelho, com o celular perto do rosto. Por isso a sequência é: folha de personagem aprovada por você → personagem salvo na Biblioteca do Freepik → todas as poses usam essa referência.
7. **Performance.** As metas Lighthouse ≥ 90 e CLS < 0,1 continuam valendo. Imagens com dimensão fixa em AVIF/WebP. Vídeos com até 1,5 MB, sem áudio, `preload="none"` e poster.

---

## 2. Direção visual: 3 rotas para o style board

| Rota | Descrição | Prós | Contras |
|---|---|---|---|
| **A · Blueprint Editorial** (recomendada) | Ilustração editorial semirrealista, com traço limpo, cel shading sutil, paleta navy/azul e grid de blueprint ao fundo | É a mais coerente com a marca, séria e única, e continua legível pequena | Os loops de vídeo exigem mais cuidado para o traço não "ferver" |
| **B · Digital Twin 3D** | Render 3D estilizado-realista, sem cara de Pixar nem de brinquedo | Premium, com semelhança alta, e anima bem em vídeo | Pode ficar genérico, com cara de "avatar de IA" |
| **C · Vector Flowline** | Vetor plano geométrico que pode virar SVG | O mais leve e animável por código | Semelhança menor e risco de parecer ícone de banco de imagens |

**Critérios de escolha** (o agente de marca pontua e você decide no portão G2): seriedade, semelhança, legibilidade a 120 px, coerência com o Blueprint e custo de animar.

**Constantes em todas as rotas:**
- Figurino: camiseta preta lisa de gola careca, o uniforme do fundador.
- Enquadramento: meio-corpo na maioria das peças. Corpo inteiro só na folha de personagem.
- Expressões permitidas: atento, sorriso calmo, concentrado, aceno de aprovação.
- Proibido: joinha, piscadela, surpresa exagerada, balão de HQ, pose de super-herói, logos de empresas.

---

## 3. Onde o avatar aparece (MVP)

| # | Ponto de contato | Arquivo | Asset | Animação | Por quê |
|---|---|---|---|---|---|
| 1 | Home › Método | `components/visuals.tsx` (`ProcessLab`) | P02–P06 | crossfade de 300 ms quando a etapa muda | o movimento mostra mudança de estado (cumpre a regra) |
| 2 | Home › Governança | `components/sections/governance.tsx` | P09 | entrada única ao aparecer na tela | torna o human-in-the-loop visível |
| 3 | /sobre › Apresentação | `app/sobre/page.tsx` | P01 + V1 | loop de 5 s em card | aproximação; a foto real continua ao lado, como prova |
| 4 | /sobre › A história | `app/sobre/page.tsx` (timeline) | C1–C5 | revelação única por capítulo, sem sequestrar o scroll | storytelling do fundador |
| 5 | /diagnostico | `app/diagnostico/page.tsx`, `components/diagnostic-form.tsx` | P07 + V2; P08 no sucesso | loop + troca de estado | reduz a ansiedade antes do envio |
| 6 | 404 | `app/not-found.tsx` (novo) | P10 | estático | personalidade com leveza |
| 7 | Imagem OG | `app/opengraph-image.tsx` (*WIP não commitado*) | P01 recortado | estático | compartilhamento |

**Fase 2 (fora do MVP):** kit para LinkedIn e Instagram, proposta comercial, assinatura de e-mail, vídeo falado (V4) e capítulo "Avatar" no Brand Book.

---

## 4. Agentes e modelos

**Restrição real:** aqui existem 4 modelos de linguagem (Haiku 4.5, Sonnet 5, Opus 5.5 e Fable 5.1) e os modelos de imagem e vídeo do Freepik. Com 9 agentes, não dá para cada um usar um LLM diferente. Por isso a regra é outra: **nenhum trabalho é validado pelo mesmo modelo que o produziu**, e toda decisão estratégica passa por dois modelos distintos.

Os Xquads **não estão instalados nesta máquina** (em `~/.claude/commands` só existe o README). Até você decidir (pergunta 5), as lentes dos squads entram pelos prompts de cada agente.

| ID | Agente | Lente | Produz com | Validado por | Entrega |
|---|---|---|---|---|---|
| O | Orquestrador e diretor de arte | — | **Opus 5.5** (esta sessão) | Fable (red team) e você | prompts finais, execuções no Freepik, integração, revisão de diffs |
| A1 | Pesquisa | — | **Sonnet 5** (WebSearch) | Opus | brief de 1 página com links |
| A2 | Marca | Brand Squad (Neumeier, Aaker, Ries) | **Opus 5.5** | **Fable 5.1** | papel do avatar, personalidade, regras de uso, escolha da rota |
| A3 | Negócio + red team | Hormozi Squad | **Fable 5.1** | Opus | Value Equation, métrica, reuso, motivos para cortar escopo |
| A4 | Storytelling | Storytelling Squad (Campbell, StoryBrand, Klaff) | **Sonnet 5** | Opus + A9 | jornada do cliente, história em 5 capítulos, roteiro V4 |
| A5 | Copy e microcopy | Hormozi + Copy Squad (agente `copywriter`) | **Sonnet 5** | Opus + A9 | legendas, bloco do diagnóstico, 404, alt texts, aviso de IA |
| A6 | QA visual (pontuação independente) | — | **Sonnet 5** (visão) | Opus pontua em paralelo | nota de 1 a 5 por critério em cada imagem |
| A7 | Frontend | agente `frontend` | **Sonnet 5** | Opus (diff) + A8 | componentes e integração |
| A8 | QA mecânico | agente `qa-runner` | **Haiku 4.5** | scripts | Lighthouse, CLS, reduced-motion, peso dos assets, rotas |
| A9 | Checagem de fatos | agente `fact-checker` | **Opus 5.5** (override de modelo) | — | cada afirmação da história e da copy conferida com o Vault |

**Modelos de mídia (Freepik) e custo por uso:**

| Uso | Modelo | Créditos |
|---|---|---|
| Style board e rascunhos | Nano Banana 2 Lite | 60 / imagem |
| Folha de personagem e poses finais | **Seedream 5 Pro** (padrão recomendado para personagem com referência) | 100 / imagem 2k |
| Correções pontuais (mãos, tatuagem, expressão) | Nano Banana Pro | 75 / edição |
| Recorte de fundo | Remove Background | 3 / imagem |
| Loops de vídeo (frame inicial = frame final) | **Kling 2.5 1080p 5 s** (em 720p ele não aceita frame final) | 325 / clipe |
| Vídeo, plano B | MiniMax H3 Turbo 768p 6 s | 240 / clipe |
| Vídeo falado (opcional) | OmniHuman | ~2.160 / 12 s |
| **Descartado** | Seedance 2.5 | 2.200 (720p) a 3.950 (1080p) por clipe: fora do orçamento |
| Encode, poster e verificação do loop | ffmpeg local (instalado) | 0 |

---

## 5. Fases e portões de aprovação

```
G0 você aprova o plano + fotos ─► E1 Estratégia ─► G1 Avatar Brief ─► E2 Style board ─► G2 rota
 ─► E3 Folha de personagem ─► G3 "é você?" ─► E4 Poses ─► G4 conjunto ─► E5 Vídeos ─► G5
 ─► E6 Site ─► G6 preview na Vercel ─► E7 Brand Book / CONTEXTO
```

| Fase | Quem | O que acontece | Aceite |
|---|---|---|---|
| **E1 Estratégia** | A1 ∥ A2 → A3 (lê A1 + A2) → A4 → A5 → A9 | Estratégia só em texto; nenhum crédito gasto. O orquestrador consolida tudo no **Avatar Brief** (1 página) | **G1:** você aprova o brief |
| **E2 Style board** | O | 3 rotas × 2 variações, com as fotos como referência de personagem. Prancha comparativa | **G2:** você escolhe a rota |
| **E3 Folha de personagem** | O → A6 | Turnaround e expressões, recortados em quadros, salvos na Biblioteca do Freepik como personagem `vinicius-avatar` | **G3:** "é você?" + A6 e Opus ≥ 4/5 em semelhança |
| **E4 Poses** | O → A6 | 10 poses e 5 cenas usando o personagem da biblioteca, correções pontuais e recorte de fundo | **G4:** conjunto aprovado |
| **E5 Vídeos** | O → script ffmpeg | V1 e V2 no Kling com frame inicial igual ao final; encode MP4 e WebM; verificação do loop | **G5:** loops sem deriva de rosto |
| **E6 Site** | A7 → O (diff) → A8 + A9 | Componentes, copy e aviso de IA | **G6:** preview aprovado |
| **E7 Marca** | agente `brand-assets` (Sonnet) → O | Regras do avatar no `CONTEXTO.md` e capítulo no Brand Book v2 | revisão do orquestrador |

**Limite de gasto:** se uma fase passar de 110% do orçamento dela, eu paro e aviso antes de continuar. Tudo fica salvo na pasta **"GaspLab — Avatar"** no Freepik, com registro em `brand/avatar/PROMPTS.md` (modelo, prompt, referências, créditos e quem aprovou).

---

## 6. Prompts

### 6.1 Briefings dos agentes

Todo agente lê `docs/CONTEXTO.md` primeiro. Nenhum lê o handoff inteiro.

**A1 · Pesquisa (Sonnet 5)**
> Entregue em até 1 página, com links:
> (1) 5 a 8 sites B2B ou de consultorias de tecnologia que usam avatar ilustrado ou 3D do fundador: o que passa seriedade e o que parece infantil;
> (2) práticas de divulgação de imagem gerada por IA no Brasil (CONAR, LGPD sobre imagem e biometria) e no mercado;
> (3) benchmarks de vídeo curto em loop em landing pages: peso, formato e efeito em LCP e CLS;
> (4) 3 riscos de percepção de um avatar de fundador para empresas médias.
> Não invente fontes e marque o que for opinião.

**A2 · Marca (Opus 5.5, lente Brand Squad)**
> Com base no CONTEXTO, no brief de pesquisa e nas seções 1 a 3 deste plano, defina:
> - o papel do avatar na arquitetura de marca (fundador × mascote);
> - 5 traços de personalidade no formato "é / não é";
> - regras de uso: onde entra, onde não entra, tamanho mínimo, fundos e expressões;
> - critérios para escolher entre as rotas A, B e C;
> - a voz das legendas (1ª pessoa só em /sobre e /diagnostico?).
>
> No máximo 2 páginas. Aponte qualquer conflito com o Brand Book v2.

**A3 · Negócio + red team (Fable 5.1, lente Hormozi Squad)**
> Leia o CONTEXTO, a pesquisa e o memo de marca e responda:
> (1) Pela Value Equation, como o avatar mexe na probabilidade percebida e no esforço percebido até o Diagnóstico?
> (2) Onde ele atrapalha a conversão?
> (3) Qual é a métrica de sucesso e como medi-la com os eventos de `lib/analytics.ts`?
> (4) Que reuso fora do site (LinkedIn, propostas) dá o maior retorno por crédito?
> (5) Red team: liste 5 motivos para não fazer ou para reduzir o escopo, e diga o que você cortaria.
>
> Seja direto; no máximo 2 páginas.

**A4 · Storytelling (Sonnet 5, lente Storytelling Squad)**
> Use somente fatos do CONTEXTO, do Vault e das respostas do fundador. Entregue:
> (1) a jornada do cliente no site em StoryBrand: herói, problema externo, interno e filosófico, guia, plano, CTA, fracasso evitado e sucesso;
> (2) a história do fundador em 5 capítulos alinhados à timeline 2017→2025, com 2 a 3 linhas cada, sem hype e sem número não verificado;
> (3) a descrição visual de cada cena, para os prompts C1 a C5;
> (4) um roteiro de 12 a 15 s para o vídeo falado opcional.

**A5 · Copy (Sonnet 5, lente Hormozi + Copy Squad)**
> Escreva a microcopy de cada ponto de contato da seção 3:
> - legenda de cada etapa do método (até 14 palavras);
> - bloco "Quem lê seu diagnóstico";
> - estado de sucesso do formulário;
> - página 404;
> - legenda de transparência sobre IA;
> - alt text de cada imagem.
>
> Clareza vem antes da criatividade. Nada que não esteja no CONTEXTO.

**A6 · QA visual (Sonnet 5)**
> Compare cada imagem com as fotos de referência e com a folha aprovada. Dê nota de 1 a 5 em:
> - semelhança facial;
> - cabelo e barba;
> - piercing e brincos;
> - tatuagem (lado e estilo);
> - roupa;
> - mãos e anatomia;
> - seriedade;
> - paleta;
> - ausência de texto e logo.
>
> A imagem é reprovada se qualquer item ficar abaixo de 4. Não conserte nada: só aponte.

### 6.2 Prompts de imagem

Os prompts de imagem ficam em inglês, que é onde os modelos respondem com mais precisão. Cada prompt junta um bloco de identidade, um de estilo e um de restrições.

**IDENTITY_LOCK** (entra em todos os prompts; referência de personagem = foto 2, com a foto 1 de apoio)
```
Vinícius Gasparello, a young adult man — match the facial likeness in the reference photos exactly.
Medium-length dark brown wavy hair with volume on top, swept back and slightly tousled, longer at the nape.
Short, full, well-groomed light-brown beard and mustache. Warm brown eyes, defined brows.
Tiny stud piercing on the left nostril, small silver hoop earrings on both ears. Slim athletic build.
Black-and-grey realism sleeve tattoo on the right arm. Wearing a plain fitted black crew-neck t-shirt.
```

**STYLE_A · Blueprint Editorial**
```
Semi-realistic editorial illustration, like a premium technology-magazine portrait: confident clean ink
linework, subtle cel shading with two to three tonal steps, natural warm skin tones, realistic proportions.
Palette restricted to deep navy (#070A12, #0E1424, #0B1530), Gasp Blue (#4D7CFF) and Signal Azure (#6CC0FF)
as a cool rim light. Faint technical blueprint grid and thin construction lines in the background.
Calm, credible, intelligent mood.
```

**STYLE_B · Digital Twin 3D**
```
High-end stylized-realistic 3D character render, realistic proportions, only slight stylization
(not Pixar, not toy-like, not chibi). Matte skin with subtle subsurface scattering, soft key light,
cool Signal Azure (#6CC0FF) rim light, deep navy studio background (#070A12) with a faint blueprint grid.
Premium product-launch aesthetic, calm and credible.
```

**STYLE_C · Vector Flowline**
```
Clean flat vector illustration, simplified geometric shapes, two-tone shading, thin Signal Azure (#6CC0FF)
outline accents, minimal detail, realistic proportions, deep navy background (#070A12).
Designed to be converted to SVG and animated. Calm and credible.
```

**AVOID** (entra em todos os prompts)
```
Avoid: cartoon exaggeration, oversized eyes, anime, chibi, toy-like 3D, caricature, neon cyberpunk,
glowing particles, lens flares, any text, letters, numbers, logos or watermarks, green tones,
extra or fused fingers, distorted hands, tattoo on the left arm, removing the beard or piercings.
```

**E2 · Style board** (Nano Banana 2 Lite, 4:5; 2 variações por rota)
```
[IDENTITY_LOCK] Half-body portrait, three-quarter view facing the viewer, relaxed open posture,
calm confident half-smile, direct eye contact. [STYLE_A|B|C] [AVOID]
```

**E3 · Folha de personagem** (Seedream 5 Pro, 16:9, 2k; depois recorte em quadros e criação do personagem na biblioteca)
```
Character model sheet. [IDENTITY_LOCK]
Row 1: full-body turnaround — front, three-quarter, side profile, back — standing neutral; outfit: black
t-shirt, dark wide-leg denim, grey-and-white skate sneakers.
Row 2: four head close-ups — neutral attentive, warm confident smile, focused thinking, subtle approving nod.
Consistent proportions and lighting, plain deep navy background (#0B1530), generous spacing, no labels.
[STYLE_escolhido] [AVOID]
```

**E4 · Poses** (Seedream 5 Pro, 2k, personagem da biblioteca como referência)

Modelo de prompt:
```
[IDENTITY_LOCK] <CENA>. Framing: <ENQUADRAMENTO>. Plain solid deep navy background (#0B1530) for clean
cut-out, soft even light with Signal Azure rim. [STYLE] [AVOID]
```

| ID | Uso | Formato | CENA |
|---|---|---|---|
| P01 | Apresentação / OG / fonte do V1 | 4:5 + 1:1 | Standing, three-quarter turn toward the viewer, one hand relaxed in pocket, open posture, calm confident half-smile, direct eye contact. |
| P02 | Entender | 4:5 | Seated, leaning slightly forward, listening attentively, one hand lightly at the chin, open notebook on the knee. |
| P03 | Mapear | 4:5 | Standing beside a large translucent blueprint panel, sketching a process flow of connected rectangles with a stylus; lines glow faintly in Signal Azure. |
| P04 | Arquitetar | 4:5 | Explaining calmly with an open palm toward a floating layered architecture diagram: three stacked translucent planes linked by thin lines and small nodes. |
| P05 | Integrar | 4:5 | Using both hands to bring two floating line segments together so they connect precisely at a small glowing node; concentrated expression. |
| P06 | Evoluir | 4:5 | Holding a tablet, looking at a softly rising iterative loop line spiraling upward, subtle satisfied expression. |
| P07 | Diagnóstico: boas-vindas (fonte do V2) | 1:1 | Seated at a clean minimal desk with an open laptop, body turned toward the viewer, open-hand welcoming gesture, attentive friendly expression. |
| P08 | Diagnóstico: recebido | 4:5 | Same desk, reading the laptop screen, small approving nod, soft smile; a single check-mark node glows at the screen edge. |
| P09 | Governança | 4:5 | Beside a horizontal flow line that pauses at a checkpoint node, raising one hand calmly at shoulder height in a "review before continuing" gesture. |
| P10 | 404 | 4:5 | Holding an unfolded blueprint map with both hands, composed and slightly amused, one eyebrow raised. |

Nas cenas C1–C5 o fundo fica (sem recorte). Formato 16:9. O texto final das cenas é revisado pelo A4.

| ID | Capítulo | CENA |
|---|---|---|
| C1 | 2017 · Primeiros sistemas | Simple desk late at night, one monitor with abstract lines of code, desk lamp, focused. |
| C2 | 2021 · Produtos full stack | Two monitors with abstract interface wireframes, sticky notes, building with energy. |
| C3 | 2022 · Liderança técnica | At a whiteboard with an architecture sketch, explaining with a marker to a small team shown as soft faceless silhouettes. |
| C4 | 2024 · Grande audiência | In front of a large wall display with abstract traffic lines and nodes, calm under pressure. |
| C5 | 2025 · GaspLab | Quiet blueprint-style lab, five connected method nodes floating beside him, looking toward the viewer. |

Nenhuma cena mostra marca de empresa (Folha, Fiat etc.). O logo da GaspLab é aplicado por código, nunca pela IA.

### 6.3 Prompts de vídeo

**V1 · /sobre › Apresentação** (Kling 2.5, 1080p, 5 s, 1:1, frame inicial = frame final = P01 1:1)
```
The man remains in the same pose and position. He breathes naturally, blinks once, and a warm subtle smile
forms and relaxes. Very slight head tilt. Camera completely static, background static.
Realistic, calm, minimal motion. No talking, no hand movement, no zoom.
```

**V2 · /diagnostico › Boas-vindas** (Kling 2.5, 1080p, 5 s, 1:1, frame inicial = frame final = P07)
```
He looks up from the laptop to the viewer, gives a small welcoming nod with a calm smile, then returns to
the initial pose. Camera static, background static. Minimal, calm, realistic motion. No talking.
```

**V4 · Vídeo falado (opcional, fase 2)** (OmniHuman, P01 + áudio real de 12 a 15 s com roteiro do A4)
```
Calm, confident delivery, natural subtle head movement, serious professional tone, minimal hand gestures.
```

**Pós-produção por script (0 créditos):** o ffmpeg gera MP4 H.264 e WebM VP9 sem áudio (`-an`), com largura ≤ 720 px e até 1,5 MB, além de um poster JPG do primeiro frame. Um script compara o primeiro e o último frame para garantir que o loop não dá salto.

---

## 7. Orçamento de créditos

| Fase | Cálculo | Créditos |
|---|---|---|
| E2 Style board | 3 rotas × 2 × 60 | 360 |
| E3 Folha de personagem | até 3 tentativas × 100 | 300 |
| E4 Poses e cenas | 15 × ~1,6 tentativas × 100 | 2.400 |
| E4 Recorte de fundo | 11 × 3 | ~35 |
| E4 Correções | ~6 × 75 | 450 |
| E5 Vídeos | 2 loops × até 2 tentativas × 325 | 1.300 |
| **Total do MVP** | | **~4.850** (sobram ~1.690) |
| V4 vídeo falado (opcional) | 12 s de OmniHuman | ~2.160: **exige recarga** |

Tokens de LLM: estimativa de poucos dólares. O Fable roda uma vez, com contexto curto; o volume de produção fica no Sonnet e a checagem mecânica no Haiku.

---

## 8. Implementação técnica (E6)

- `lib/avatar.ts` é a fonte única de cada pose: `src`, `alt`, `width`, `height` (mesmo padrão de `lib/diagnostic.ts`).
- `components/avatar/avatar-pose.tsx` usa `next/image` com dimensões fixas e `sizes` (sem CLS). O Next serve AVIF e WebP a partir do PNG transparente.
- `components/avatar/avatar-loop.tsx` renderiza um `<video muted playsInline loop preload="none" poster>`:
  - um IntersectionObserver dá play e pause conforme o vídeo entra ou sai da tela;
  - com `prefers-reduced-motion`, fica só o poster.

  O vídeo mantém o fundo navy dentro de um `.panel`. Não há vídeo com alpha: o Safari tem suporte fraco.
- No `ProcessLab`, a pose acompanha a etapa ativa com crossfade de opacidade de 300 ms. Com reduced-motion, a troca é instantânea.
- A copy mora em `lib/content.ts`. Cores só por tokens (nada de hex em classe).
- Assets otimizados vão em `public/avatar/`. Os masters 2k ficam no Freepik e em `brand/avatar/masters/` (a decidir se entram no git, por causa do peso).
- O aviso de IA fica em /sobre, na legenda: "Ilustrações de Vinícius criadas com IA a partir de fotos reais."

## 9. Critérios de aceite

- Semelhança aprovada por você (G3) e nota ≥ 4 em todos os critérios dada por **dois modelos independentes** (Sonnet e Opus).
- Lighthouse mobile ≥ 90 nas páginas alteradas. CLS < 0,1. LCP piora no máximo 200 ms em relação à linha de base.
- Vídeos com até 1,5 MB, sem áudio, pausados fora da tela e estáticos com reduced-motion.
- O fact-checker não aponta nenhuma afirmação fora do Vault. O aviso de IA está presente.

## 10. Riscos

| Risco | Mitigação |
|---|---|
| Semelhança fraca com só 2 fotos | 6 a 10 fotos novas + folha de personagem aprovada antes das poses |
| Tatuagem ou piercing mudam entre poses | linha fixa no IDENTITY_LOCK + item no QA + correção no Nano Banana Pro |
| Mãos deformadas | poses com mãos simples + correção pontual |
| Rosto deriva no vídeo | clipes curtos com frame inicial = frame final; uma nova tentativa; se falhar de novo, fica só a imagem |
| Tom infantil | rotas A e B com critério explícito + red team do Fable |
| Avatar rouba o protagonismo do cliente | ele fica fora do hero |
| Estouro de créditos | teto por fase, parada em 110% e Seedance descartado |
| Uso comercial das gerações | conferir a licença do plano Premium do Freepik antes da publicação |

## 11. O que preciso de você (G0)

1. **Fotos (essencial para o nível excelente):** 6 a 10 fotos com boa luz, sem óculos escuros e sem nada na frente do rosto:
   - frontal neutra;
   - frontal sorrindo;
   - 3/4 esquerda;
   - 3/4 direita;
   - perfil;
   - meio-corpo;
   - corpo inteiro;
   - detalhe do braço tatuado.
2. **Traços:** a tatuagem é no braço **direito**? Tatuagem e piercing aparecem no avatar? (Recomendo que sim, pela autenticidade.)
3. **Vídeo falado (V4):** entra agora ou na fase 2? Se entrar, preciso de 12 a 15 s de áudio com a sua voz real e de uma recarga de créditos.
4. **Transparência:** você aprova a legenda "Ilustrações criadas com IA a partir de fotos reais"?
5. **Xquads:** instalo os squads do GitHub (`ohmyjahh/xquads-squads`) para os agentes usarem as definições reais, ou sigo com as lentes pelos prompts?
6. **História:**
   - qual foi a cena real que fez você criar a GaspLab? (Vira o capítulo C5 e o roteiro.)
   - é você quem lê pessoalmente cada diagnóstico? (Vira copy, então precisa ser verdade.)
7. **Voz das legendas:** 1ª pessoa ("eu") em /sobre e /diagnostico e "nós" no resto do site?
8. **Escopo:** o MVP da seção 3 está bom, ou você quer cortar ou adicionar algo?
