# 06 · Especificação de interação do Vini (A6 → A8)

Versão 1.0 · 06/10/2026 · Autor: A6 (Interação) · Destinatário: A8 (`frontend`) · Validam: A10 (`qa-runner`), A9 (`fact-checker`, só textos) e Fable (diff).
Base: `PLANO_AVATAR.md` §4 e §8, `docs/CONTEXTO.md` (Visual) e o código atual (`components/visuals.tsx`, `components/site-shell.tsx`, `components/diagnostic-form.tsx`, `app/globals.css`).
Escopo: só especificação. Nenhum arquivo de produção foi alterado. Todo valor numérico abaixo é **definitivo para implementar**; o que depende da arte final (E4) está marcado como `[E4]` e tem valor-padrão.

---

## 0. Decisões travadas

Formato do registro: `[AUTO-DECISION] pergunta → decisão (motivo)`.

| # | Decisão |
|---|---|
| D1 | `[AUTO-DECISION]` Biblioteca de animação → **CSS puro + um controlador JS pequeno, sem `motion`** (motivo: peso e coerência com o código atual; ver §0.1). |
| D2 | `[AUTO-DECISION]` Onde o rig (camadas) existe → **só no hero da home**. Demais lugares (coluna do `/diagnostico`, método, governança, 404) usam stills com crossfade (motivo: o rig é o item mais pesado, ~101 KB AVIF 2x, e só o hero tem espaço e atenção para o olhar seguir o cursor). |
| D3 | `[AUTO-DECISION]` `greet` (aceno) → **crossfade para o still S02**, não rotação do braço (motivo: a pose-base S01 tem a mão no bolso; girar o braço do bolso quebra a anatomia). |
| D4 | `[AUTO-DECISION]` No `/diagnostico` o estado inicial é `idle` (S01 still) e `listen` (S11) entra no primeiro foco de campo (motivo: o §4.2 do plano é mais específico que a nota de uso de S11 no §2.3). |
| D5 | `[AUTO-DECISION]` O float aparece só **depois que o hero sai da tela** nas páginas com Vini no hero (motivo: evita dois Vinis na mesma tela e dá ao pulso um momento natural). |
| D6 | `[AUTO-DECISION]` Card do float → **Radix Popover não modal** (shadcn `popover`) (motivo: Esc, retorno de foco, clique fora e colisão já resolvidos; a stack do projeto é shadcn/Radix). |
| D7 | `[AUTO-DECISION]` Fallback de imagem → **AVIF → WebP**; o PNG do plano fica só como master em `brand/avatar/masters/` (motivo: ~97% dos navegadores abrem WebP; PNG em `public/` seria peso morto). |
| D8 | `[AUTO-DECISION]` Nenhum evento de analytics novo. Só `whatsapp_click` e `diagnostic_start`, com `origem: "vini_float"` (motivo: pedido explícito; ver dúvida §12.2). |

### 0.1 `motion` x CSS puro (recomendação: CSS puro)

| Critério | CSS puro + controlador JS | Pacote `motion` |
|---|---|---|
| Peso no cliente | **0 kB de dependência.** Controlador do rig ≤ 6 kB gzip em chunk lazy | `<motion.*>` completo **34 kB**; `LazyMotion` + `m` **4,6 kB** + `domAnimation` **+15 kB** (≈ 19,6 kB); `animate` mini 2,3 kB, híbrido 17 kB (docs oficiais do Motion, consulta de 06/10/2026) |
| Respiração, crossfade, pulso | `@keyframes` e `transition` em `transform`/`opacity`, rodam no compositor, custo de JS zero | Equivalente, com custo de JS |
| Piscar aleatório e suavização do cursor | Precisa de JS de qualquer forma (CSS não sorteia intervalo nem faz lerp) | Também precisa de JS (`useMotionValue`/`useSpring` ou `setTimeout`) |
| `prefers-reduced-motion` | Regra global já existe em `app/globals.css` (duração 0,01 ms); só o JS precisa de guarda | Precisa de guarda em JS (`useReducedMotion`) além da regra CSS |
| Padrão do projeto | `ArchitectureFlow` já faz exatamente isto: `pointermove` + variáveis CSS (`--mx`, `--my`) + `transition` | Nenhum uso hoje no código lido |

Conclusão: o único ganho do `motion` seria orquestração declarativa, que este rig não precisa (3 loops CSS, 1 temporizador, 1 laço de suavização). O orçamento de LCP (+200 ms) e de TBT favorece não somar ~20 kB de JS.
**Gatilho para reconsiderar:** adotar `motion` somente se (a) o `package.json` já o tiver por outra feature, ou (b) a E4 entregar um braço de aceno animado por rotação com keyframes encadeados. Nesse caso usar `LazyMotion` + `m` + `domAnimation`, nunca `motion.*` completo. O frontend confere o `package.json` antes de começar.

---

## 1. Estrutura e convenções

### 1.1 Canvas e camadas

- Canvas único das poses e do rig: **4:5**, master 880×1100 px (2x), base 440×550 px (1x). Todas as poses são exportadas **no mesmo canvas, com a mesma linha de base dos pés** `[E4]`, para o crossfade não "pular".
- Tamanhos em CSS: `hero` 320 px (< 768), 380 px (≥ 768), 440 px (≥ 1024). `panel` 280 px (< 768), 320 px (≥ 768). Proporção sempre 4:5 (`aspect-ratio`), largura fixa por breakpoint, **CLS zero**.
- Ordem Z do rig (dentro do canvas): `body` 1 · `arm` 2 · grupo `head` 3 (dentro dele: `head` 0, `eyes` 1, `pupils` 2, `eyesClosed` 3, `brows` 4, `mouth` 5). Ajustar só se a arte pedir `[E4]`.
- Camadas faciais (`eyes`, `pupils`, `eyesClosed`, `brows`, `mouth`) são **filhas do grupo `head`**: posicionadas em % da caixa da cabeça e seguem a cabeça automaticamente.
- `box` (x, y, w, h em %) de cada camada é **gerado pelo script de exportação** a partir do bounding box da máscara e gravado em `lib/avatar.ts`. O frontend não calcula à mão.
- Cada camada animada usa **wrappers aninhados**, para animação CSS e transformação inline não brigarem pelo mesmo `transform`:
  - `body`: `[respiração] > img`
  - `arm`: `[respiração-seguinte] > img`
  - `head`: `[respiração] > [balanço] > [rastreio JS] > { img head + [paralaxe do rosto JS] > { eyes, [pupilas JS] > pupils, eyesClosed, brows, mouth } }`
- Variáveis CSS escritas pelo JS na raiz do rig (nunca estado React): `--vini-hr` (graus), `--vini-hx`, `--vini-hy` (% da própria cabeça), `--vini-fx`, `--vini-fy` (paralaxe do rosto, % da largura da cabeça), `--vini-px`, `--vini-py` (pupilas, % da largura da cabeça).
- Só `transform` e `opacity` são animados. `will-change: transform` apenas nos 3 wrappers que se movem, e removido quando pausado.
- Pivôs padrão (`transform-origin`, na própria caixa da camada) `[E4]`: `body` 50% 100% · `head` 50% 92% · `arm` 50% 6%.
- Atributos de teste na raiz (sempre, inclusive em produção, sem dados pessoais): `data-vini-state`, `data-vini-pose`, `data-vini-rig` (`off` | `loading` | `ready`), `data-vini-paused` (`true` | `false`). O hero da home leva também `data-vini-hero`.

### 1.2 Easings nomeados

| Nome | Valor | Uso |
|---|---|---|
| `ease-breath` | `cubic-bezier(0.37, 0, 0.63, 1)` | respiração, balanço |
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | entradas, retorno ao centro, pulso |
| `ease-std` | `cubic-bezier(0.4, 0, 0.2, 1)` | crossfade de saída, troca still↔rig |
| `linear` | `linear` | rampas do piscar |

### 1.3 Regras gerais

- O mascote inteiro (`Vini`, `ViniStill`) tem `pointer-events: none`, `user-select: none`, `draggable={false}`. Nunca intercepta clique nem cria armadilha de hover.
- **Nunca** transmitir informação só pela pose (WCAG 1.3.3). Sucesso e erro continuam no texto do formulário (`aria-live` e `role="alert"` já existentes).
- Máximo **um rig por página** (aviso no console em desenvolvimento se houver dois).
- Cores só por tokens (`bg-card`, `text-foreground`, `border-signal/60`, ...). Nenhum hex em classe. O anel do pulso usa `color-mix` sobre `var(--signal)`.

---

## 2. Máquina de estados

### 2.1 Tabela principal

Colunas: gatilho (evento DOM, rota ou estado de formulário) · transição · duração · easing · o que anima (camadas) · o que fica estático.

| Estado (pose) | Gatilho | Transição | Duração | Easing | Anima | Estático |
|---|---|---|---|---|---|---|
| `idle` (S01) | Padrão. Rig montado e nenhum outro estado ativo. No SSR e antes do rig, S01 still via `next/image` | Rig entra por **crossfade sobre o still S01** (o still sai depois, §7.3). As animações só começam após a troca | 120 ms | `ease-std` | `body` e `head` respiram, `arm` acompanha, `head` balança, piscar | `eyes`, `pupils` (centro), `brows`, `mouth` |
| `attention` (S01) | **Desktop** (`hover: hover` e `pointer: fine`): primeiro `pointermove` de `mouse`/`pen` com o rig visível. **Mobile/touch**: `scroll` com velocidade > 80 px/s. Convive com `idle` sem trocar de pose | Rastreio ativa com suavização (τ no §3.3). Sai após **4 s sem movimento** do cursor, `pointerleave` do documento, ou **500 ms sem scroll** (mobile) | Retorno ao centro: 700 ms (desktop), 400 ms (mobile) | `ease-out-soft` | Tudo do `idle` + `head` (rotação e translação), paralaxe do rosto, `pupils` | `body` (só respira), `arm` |
| `greet` (S02) | Hero com ≥ 50% visível por 600 ms contínuos, rig pronto, S02 carregada, **uma vez por sessão** (`sessionStorage`), sem reduced-motion, sem foco em campo de formulário | Crossfade S01→S02, mantém, crossfade S02→S01 e retorna a `idle` | 240 ms entra · 720 ms mantém · 240 ms sai = **1.200 ms** | entra `ease-out-soft`, sai `ease-std` | Apenas a opacidade do still S02 sobre o rig | O rig por baixo pausa (sem rastreio nem piscar) |
| `point` (S03a direita / S03b esquerda) | `pointerenter` (só `mouse`/`pen`, ≥ 120 ms) ou `focus` com `:focus-visible` em elemento com `data-vini-cta` (CTAs do hero). Lado: CTA à direita do centro do rig → `pointRight`; à esquerda → `pointLeft`; se a distância horizontal for < 8% da largura do rig, usa `pointLeft` | Crossfade para o still do lado. Saída: `pointerleave` (+150 ms de tolerância), `blur`, clique ou **8 s** | entra 300 ms · sai 250 ms | entra `ease-out-soft`, sai `ease-std` | Opacidade do still | Rig por baixo pausa |
| `listen` (S11) | `/diagnostico`: primeiro `focusin` em campo do formulário (`<form onFocus>`) | Crossfade S01→S11. Permanece até `think` ou `concern` | 400 ms | `ease-out-soft` | Opacidade | Tudo |
| `think` (S05) | Formulário entra em `sending` (submit) | Crossfade imediato. Fica **no mínimo 600 ms**; se a API responder antes, o resultado espera o resto do tempo | 200 ms entra · mín. 600 ms | `ease-out-soft` | Opacidade | Tudo |
| `success` (S07) | Formulário `state === "success"` (HTTP 2xx) | Crossfade S05→S07. **Terminal** até trocar de rota | 400 ms | `ease-out-soft` | Opacidade | Tudo |
| `concern` (S09) | (a) formulário `state === "error"` (qualquer 4xx/5xx, 429, 503, rede). (b) evento `invalid` (validação nativa) em campo, só o primeiro por tentativa | Crossfade para S09. Volta a `listen` no próximo `focusin` em campo (**só após 1.500 ms**) ou após **6 s**; novo submit vai a `think` | 250 ms entra · 300 ms volta | `ease-out-soft` entra, `ease-std` volta | Opacidade | Tudo |
| `lost` (S10) | Renderização de `app/not-found.tsx` | **Estático.** Sem transição, sem rig. Usa `ViniStill pose="lost"` | 0 | — | Nada | Tudo |
| `paused` (qualquer) | Rig fora da tela (`IntersectionObserver`), `document.hidden`, `pagehide`, ou reduced-motion ligado em tempo de execução | Congela no último frame, cancela temporizadores e laço, remove `will-change`. Retoma ao voltar | 0 | — | Nada | Tudo |
| `fallback` | Camada obrigatória (`body`, `head`, `arm`) falha ou não decodifica em **4 s**; `Save-Data`; conexão `2g`/`slow-2g`; reduced-motion | Fica no still S01; **nunca** meio-boneco. Os stills de estado continuam funcionando (no reduced-motion, troca instantânea) | 0 | — | Nada | Tudo |

### 2.2 Prioridade e pedidos

O estado visível é o pedido ativo de **maior prioridade**. Fontes (maior primeiro): `route` (4) > `form` (3) > `cta` (2) > `greet` (1) > base `idle`/`attention` (0).

- `request(source, state, { holdMs, ttlMs, side })` registra o pedido; `release(source)` remove.
- `holdMs`: tempo mínimo que **o estado atual** fica visível antes de ser substituído por um pedido posterior. Só o último pedido pendente é aplicado.
- `ttlMs`: o pedido se libera sozinho depois desse tempo.
- Mudança de rota libera todas as fontes, exceto `route`.
- `greet` é cancelado por qualquer pedido de `cta` ou `form` (crossfade direto S02→S03 em 200 ms).

### 2.3 Transições permitidas

```
idle <-> attention
idle|attention -> greet -> idle            (1x por sessão)
idle|attention -> point -> idle            (cta)
idle -> listen -> think -> success | concern
listen -> concern -> listen | think
lost     (terminal, estático)
success  (terminal na rota)
```

### 2.4 Mapeamento formulário → Vini (`components/diagnostic-form.tsx`)

| Condição no formulário | Pedido |
|---|---|
| `focusin` em qualquer campo, `state` ainda `idle` | `request("form", "listen")` |
| `state === "sending"` | `request("form", "think", { holdMs: 600 })` |
| `state === "success"` | `request("form", "success")` |
| `state === "error"` | `request("form", "concern", { ttlMs: 6000, holdMs: 1500 })` |
| `invalid` (captura) | `request("form", "concern", { ttlMs: 6000, holdMs: 1500 })` |

O Vini **nunca atrasa** a UI do formulário: o painel de sucesso e a mensagem de erro renderizam na hora, a pose acompanha.

---

## 3. Parâmetros numéricos

### 3.1 Respiração e balanço (loop CSS, só no rig)

| Parâmetro | Valor |
|---|---|
| Ciclo | **4.000 ms**, `infinite`, `ease-breath`, vai de 1 ao pico e volta a 1 |
| `body` | `scaleY` 1 → **1,010**, `scaleX` 1 → 1,004, origem 50% 100% |
| `head` (acompanha o peito) | `translateY` 0 → **-3%** da própria altura, mesma fase do corpo |
| `arm` (movimento secundário) | `translateY` 0 → -1,5% da própria altura, `rotate` 0 → 0,8° (origem 50% 6%), `animation-delay` **150 ms** |
| Balanço da cabeça | `rotate` de -0,6° a +0,6°, ciclo **7.000 ms** (de propósito não múltiplo de 4.000), `ease-breath`, origem 50% 92% |
| Teto de rotação composta da cabeça | rastreio ≤ 7° + balanço ≤ 0,6° = **7,6°, abaixo do teto de 8° do plano** |

### 3.2 Piscar (temporizador JS, `setTimeout` encadeado, não `setInterval`)

| Parâmetro | Valor |
|---|---|
| Intervalo | aleatório uniforme entre **3.000 e 6.000 ms** |
| Primeiro piscar após o rig aparecer | aleatório entre 1.500 e 3.000 ms |
| Duração do piscar | **150 ms**: fecha 50 ms, mantém 40 ms, abre 60 ms (`linear`; `opacity` do `eyesClosed` de 0 a 1 e de volta) |
| Piscar duplo | probabilidade **15%**, segundo piscar 220 ms depois de o primeiro abrir |
| Intervalo mínimo entre piscares | 2.500 ms |
| Suspenso quando | estado ≠ `idle`/`attention`, pausado, aba oculta, reduced-motion |
| Arte `[E4]` | `eyesClosed` cobre **opacamente** olho e pupila (pele da pálpebra + linha de cílios) |

### 3.3 Rastreio do cursor (desktop) e do scroll (mobile)

Modo escolhido por `matchMedia("(hover: hover) and (pointer: fine)")`, com listener de mudança. Eventos `pointerType === "touch"` são **ignorados** para o rastreio.

| Parâmetro | Desktop (cursor) | Mobile/touch (scroll) |
|---|---|---|
| Entrada | `pointermove` passivo em `window`, uma leitura por `requestAnimationFrame`, escreve só variáveis CSS | `scroll` passivo; velocidade `v` (px/s) por `requestAnimationFrame` |
| Normalização | `nx = clamp(dx / (0,5 · larguraViewport), -1, 1)`, `ny = clamp(dy / (0,5 · alturaViewport), -1, 1)`, com `dx`/`dy` relativos ao centro da cabeça | `sy = clamp(v / 1800, -1, 1)` (positivo = rolando para baixo) |
| Zona morta | Distância < 120 px do centro da cabeça: `nx` e `ny` multiplicados por (distância / 120) | `abs(v)` < 80 px/s: `sy = 0` |
| **Rotação da cabeça** | `rotate = nx · 7°`, teto **7° para cada lado** | **0°** (não gira) |
| Translação da cabeça | X `nx · 1,5%`, Y `ny · 1,0%` (da própria largura/altura) | Y `sy · 1,0%` (aceno sutil), X 0 |
| Paralaxe do rosto (`eyes`, `brows`, `mouth`, `eyesClosed`) | X `nx · 3,0%`, Y `ny · 1,8%` da largura da cabeça (**2x a cabeça**, cria ilusão de giro) | Y `sy · 1,0%`, X 0 |
| **Pupilas** | X `nx · 2,5%`, Y `ny · 1,5%` da largura da cabeça (tetos de 2,5% e 1,5% para cada lado) | Y `sy · 1,5%`, X 0 |
| Suavização (exponencial `1 - exp(-dt/τ)`, `dt` ≤ 50 ms) | pupilas τ **70 ms** · rosto τ 110 ms · cabeça τ **140 ms** (os olhos chegam antes) | pupilas τ 90 ms · cabeça τ 160 ms |
| Retorno ao centro | 4 s sem movimento ou `pointerleave` do documento; 700 ms, τ 250 ms | 500 ms sem scroll; 400 ms, τ 250 ms |
| Laço | `requestAnimationFrame` roda **só enquanto** a diferença entre atual e alvo for > 0,001 ou houver input; depois dorme | idem |

Arte alternativa: se a E4 entregar só as 5 direções discretas de pupila (esquerda, direita, cima, baixo, centro) em vez de uma camada móvel, escolher a direção por quadrante do vetor (`abs(nx)` > `abs(ny)` decide horizontal ou vertical; limiar 0,25) e trocar com crossfade de 60 ms; paralaxe e cabeça continuam contínuas.

### 3.4 Aceno único por sessão (`greet`)

| Parâmetro | Valor |
|---|---|
| Chave | `sessionStorage["gasplab:vini:greet"] = "1"`, gravada **no início** do aceno (interrupção não repete) |
| Duração total | **1.200 ms** (240 entra, 720 mantém, 240 sai), sem loop |
| Atraso após as condições | 600 ms de hero ≥ 50% visível, contínuos |
| Espera pelo rig e pelo S02 | máx. 6 s; passou disso ou o usuário saiu do hero: **não toca** e **não grava** a chave |
| Não toca quando | reduced-motion, foco em campo, `scrollY` > 40% da altura da viewport, pose `point` ativa, rota ≠ `/` |
| Falha de `sessionStorage` (modo privado, bloqueio) | `try/catch` e usa variável de módulo (vale até recarregar) |
| Instâncias | só o `<Vini size="hero" greet>` da home. O float e os stills **não** acenam |

### 3.5 Crossfades (resumo)

| Troca | Duração | Easing |
|---|---|---|
| S01 still → rig | 120 ms | `ease-std` |
| rig → S02 / S02 → rig | 240 ms / 240 ms | `ease-out-soft` / `ease-std` |
| rig → S03 / S03 → rig | **300 ms** / 250 ms | `ease-out-soft` / `ease-std` |
| S01 → S11 (`listen`) | 400 ms | `ease-out-soft` |
| qualquer → S05 (`think`) | 200 ms | `ease-out-soft` |
| S05 → S07 (`success`) | 400 ms | `ease-out-soft` |
| S05 → S09 / S11 → S09 (`concern`) | 250 ms | `ease-out-soft` |
| S09 → S11 | 300 ms | `ease-std` |
| float: aparecer / sumir | 300 ms / 200 ms | `ease-out-soft` / `ease-std` |

Técnica (sem queda de opacidade): o still que entra sobe de `opacity` 0 a 1 por cima; o que sai **fica em 1** até o novo chegar a 1 e então vai a 0 sem transição. Só opacidade, **nenhum transform** no crossfade (as poses compartilham a mesma linha de base).
**Nunca iniciar crossfade antes de `img.decode()` resolvido.** Se o still pedido não carregar em 1.500 ms, abortar (permanece a pose atual) e tentar de novo no próximo pedido.

### 3.6 Tempos de hover e foco no CTA do hero

| Parâmetro | Valor |
|---|---|
| Intenção de hover (entrar) | 120 ms |
| Tolerância ao sair | 150 ms |
| `focus` | só `:focus-visible`, imediato |
| Duração máxima de `point` | 8 s (liberação de segurança) |
| `pointerenter` de `touch` | ignorado (dispara no toque e deixaria a pose presa) |

---

## 4. `prefers-reduced-motion: reduce`

Detecção: o hook `usePrefersReducedMotion` que hoje é local de `components/visuals.tsx` (usa `useSyncExternalStore` com `matchMedia`) deve ser **extraído para `lib/use-prefers-reduced-motion.ts`** e importado por `visuals.tsx` e pelo Vini (mesmo comportamento, sem duplicar). Mudança em tempo de execução desmonta o rig e volta ao still.

| Desliga | Permanece |
|---|---|
| Rig inteiro (**os chunks e as camadas nem são baixados**) | Pose estática do estado atual (S01 no hero) |
| Respiração, balanço, piscar | Troca de pose por estado: `point`, `listen`, `think`, `success`, `concern`, `lost` (a pose carrega significado), **instantânea, 0 ms**, sem crossfade |
| Rastreio do cursor e do scroll (mobile) | Tempo mínimo de `think` (600 ms), `holdMs` e `ttlMs` (são lógica, não movimento) |
| `greet` (aceno): não toca e não grava a chave | Float: botão, card, foco, Esc, links, eventos |
| Pulso do float, fade e slide de entrada do float, animação de abrir o card | Mensagens de erro e sucesso do formulário |
| Qualquer `transform` animado | Posição e tamanho do float |

Notas: a regra global de `app/globals.css` (`transition-duration: 0.01ms !important` e `animation-duration: 0.01ms !important`) já neutraliza CSS, mas **não** laços JS; por isso o rig não monta. O QA não deve depender dessa regra como única proteção.

---

## 5. Acessibilidade

| Item | Especificação |
|---|---|
| Mascote decorativo | `Vini` e `ViniStill` (padrão `decorative`): raiz com `aria-hidden="true"`, `<img alt="">`, nenhum elemento focável dentro, `pointer-events: none`. Sem `aria-live`. A pose **não** anuncia nada |
| Exceção | Só o botão do **CTA flutuante** é exposto (é um controle). A imagem dentro dele é `alt=""`; o nome vem do botão |
| Nome acessível do botão | `aria-label="Falar com o Vini"` (texto de `lib/content.ts`, ver §8) |
| Estado do botão | `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls` (id do card) |
| Card | `role="dialog"`, `aria-modal="false"`, `aria-labelledby` (título "Falar com o Vini"). Não prende o foco (Radix `modal={false}`) |
| Foco ao abrir | Vai para o **primeiro link** do card (WhatsApp). Ordem de Tab: WhatsApp → Diagnóstico → Fechar. Ao sair com Tab, o card fecha |
| Foco ao fechar | Retorna ao botão do float |
| Fechar | **Esc** (com foco dentro do card ou no botão), botão "Fechar" (ícone, `aria-label="Fechar"`), clique ou toque fora, `focusout` para fora, troca de rota, novo clique no botão |
| Ordem no DOM | `ViniFloat` é o **último filho do `<body>`** (dentro do layout); o conteúdo do Popover (portal do Radix) fica logo depois. Ordem lógica: rodapé → botão → card |
| Alvos de toque | Botão do float **48×48 px** (≥ 44). Links do card: `min-height` 44 px, largura total. Botão Fechar: 44×44 px (ícone de 16 a 20 px com área ampliada). Espaço mínimo de 8 px entre alvos |
| Foco visível | Usa o `:focus-visible` global (anel 2 px `--signal`, offset 3 px). Não cortar com `overflow: hidden` no pai do botão. Contraste do anel sobre o card ≈ 9,3:1 |
| Contraste do card (`bg-card`) | `text-foreground` ≈ 16,4:1 · `text-muted-foreground` 8,69:1 (já verificado em `globals.css`) · botão primário `bg-action` com texto branco 5,05:1 · borda do botão do float `border-signal/60` sobre `bg-background` ≈ 4,1:1 (≥ 3:1 de componente de UI). Valores de referência calculados; o QA reconfere com ferramenta |
| Zoom e texto | Funciona a 200% e 400% de zoom: card com `max-width: min(320px, calc(100vw - 32px))` e rolagem interna se faltar altura |
| Movimento | Ver §4. O piscar do rig tem 150 ms e **não** é flash de tela |
| Teclado no hero | `point` também dispara por foco de teclado nos CTAs (`:focus-visible`), não só por mouse |
| Informação | Nada só pela pose: sucesso, erro e estado de envio continuam em texto (`aria-live`, `role="alert"`) |
| Transparência | O aviso de IA (D-A7 do plano) fica em `/sobre` e no Brand Book; fora deste arquivo |

---

## 6. CTA flutuante "Falar com o Vini"

### 6.1 Geometria e posição

| Item | Valor |
|---|---|
| Botão | **48×48 px**, `rounded-full`, imagem do avatar (`ViniStill size="avatar"`, recorte de busto de S01, 96×96 px no 2x) |
| Fundo e borda | `bg-deep`, `border border-signal/60`, sombra mínima (sem glow) |
| Posição | `position: fixed`; `right: max(16px, env(safe-area-inset-right))`; `bottom: max(16px, env(safe-area-inset-bottom))`. A partir de `lg` (1024 px): `right: 24px`, `bottom: 24px` |
| Camada Z | **30** (abaixo do header `z-40` e abaixo de sheets/diálogos do Radix `z-50`; o painel do `MobileNav`, ao abrir, cobre o float) |
| Rótulo visível | Só em dispositivos com hover: chip "Falar com o Vini" à esquerda do botão em `hover` e `:focus-visible` (150 ms). Texto igual ao `aria-label` |
| Rodapé | `Footer` de `components/site-shell.tsx` ganha respiro inferior: `py-12` vira `pt-12 pb-28`, para o float nunca cobrir a linha de copyright ("2026 GaspLab" e "São Paulo · Brasil") no fim da rolagem |

### 6.2 Aparecer, pulsar, esconder

| Regra | Valor |
|---|---|
| Aparece quando | (a) ≥ **2.500 ms** após o evento `load` **ou** primeira rolagem ≥ 20% da altura da viewport (o que vier primeiro) **e** (b) na rota com hero Vini (`[data-vini-hero]`), o hero está com **< 30%** visível (`IntersectionObserver`). Voltar ao hero esconde de novo (200 ms), sem novo pulso |
| Entrada | `opacity` 0 a 1 e `translateY` 8 px a 0, 300 ms, `ease-out-soft` |
| **Pulso único** | Anel de 0 a 14 px, cor `--signal` a 55% (`color-mix`), **1.200 ms**, `ease-out-soft`, `iteration-count: 1`, começa ao fim da entrada. Chave `sessionStorage["gasplab:vini:float-pulsed"] = "1"`; não repete na sessão nem depois de o card ter sido aberto. Adicionar o `@keyframes` ao `app/globals.css` (o `pulse-dot` existente é `infinite`, não serve) |
| Esconde em | `/diagnostico` e subrotas (casa por prefixo); viewport com `max-height: 480px` (paisagem curta); `@media print` |
| Carregamento | A entrada do float é um wrapper minúsculo no layout; o botão e o Popover entram por `next/dynamic` (`ssr: false`) **depois do `load` + ociosidade** (`requestIdleCallback`, tempo-limite 2.000 ms; `setTimeout` de 1.200 ms no Safari) |

### 6.3 Card

- Âncora: Popover `side="top"`, `align="end"`, `sideOffset={12}`, `collisionPadding={16}`, `modal={false}`.
- Visual: classe `.panel` + `bg-card text-card-foreground`, `rounded-2xl`, padding 16 px, gap 8 px.
- Largura: `min(320px, calc(100vw - 32px))`. Altura máxima: `min(360px, calc(100dvh - 72px - 16px - 48px - 12px - 16px))` (header 72 px + margens + botão + offset), com rolagem interna.
- Conteúdo, nesta ordem (textos provisórios; **A5 fecha o texto final** em `lib/content.ts`, sem promessa de resposta automática nem de prazo):
  1. Título: "Falar com o Vini".
  2. Link 1, estilo `.btn-primary`: "Conversar no WhatsApp". Mesmo padrão do header: `TrackedLink` com `href={whatsappUrl}`, `event="whatsapp_click"`, `eventProps={{ origem: "vini_float" }}`.
  3. Link 2, estilo `.btn-secondary`: "Começar o diagnóstico". `href="/diagnostico"`, evento `diagnostic_start` com `eventProps={{ origem: "vini_float" }}`.
  4. Botão "Fechar" (ícone), 44×44 px.
- Clique em um link fecha o card. Os dados do diagnóstico **nunca** vão para analytics; `origem` é a única propriedade.
- Abrir ou fechar o card **não** gera evento (nenhum evento novo sem aprovação).
- Sem reduced-motion: o card abre com `opacity` 0 a 1 + `translateY` 6 px a 0, 180 ms, `ease-out-soft`; fecha em 120 ms `ease-std`.

### 6.4 Mobile

- Largura do card: `calc(100vw - 32px)`, máx. 360 px, colado acima do botão. O card nunca invade os 72 px do header (altura máxima do §6.3).
- O float fica **embaixo à direita**; o header é fixo no topo (`sticky top-0 z-40`) e contém "Diagnóstico" e o `MobileNav`. Não há sobreposição geométrica. Em paisagem curta o float some (§6.2). Com o painel do `MobileNav` aberto, o float fica por trás (z 30 < 50).
- Teclado virtual aberto: não interfere, pois o float não existe em `/diagnostico`.

---

## 7. Orçamento de desempenho

### 7.1 Metas globais

Lighthouse mobile **≥ 90** · CLS **< 0,1** (alvo ≤ 0,02, **zero deslocamento atribuível ao Vini**) · LCP no máximo **+200 ms** sobre a linha de base · nenhuma tarefa longa (> 50 ms) vinda do rig · `pointermove` < 1 ms por evento.

### 7.2 Peso por ativo (KB, alvo máximo por arquivo)

Canvas: 1x = 440×550 px, 2x = 880×1100 px. Tamanhos de camada são aproximados; valem os do bounding box real `[E4]`. Encode equivalente para camadas e stills (AVIF qualidade 60, WebP qualidade 82); a diferença de cor entre o rig em repouso e o S01 still é checada no QA (item 7).

| Ativo | Dim. 1x aprox. | AVIF 1x | AVIF 2x | WebP 1x | WebP 2x |
|---|---|---|---|---|---|
| S01 completo (hero, candidato a LCP) | 440×550 | ≤ 26 | ≤ 65 | ≤ 38 | ≤ 95 |
| `body` (limpo, sem cabeça/braço) | 282×424 | ≤ 16 | ≤ 40 | ≤ 24 | ≤ 58 |
| `arm` | 80×210 | ≤ 6 | ≤ 15 | ≤ 9 | ≤ 22 |
| `head` (cabelo, barba, pele; sem olhos/sobrancelhas/boca) | 80×95 | ≤ 14 | ≤ 36 | ≤ 21 | ≤ 52 |
| `eyes` | 50×14 | ≤ 1 | ≤ 2 | ≤ 1,5 | ≤ 3 |
| `pupils` | 50×10 | ≤ 1 | ≤ 2 | ≤ 1 | ≤ 2 |
| `brows` | 56×12 | ≤ 1 | ≤ 2 | ≤ 1,5 | ≤ 3 |
| `mouth` | 34×16 | ≤ 1 | ≤ 2 | ≤ 1,5 | ≤ 3 |
| `eyesClosed` | 50×16 | ≤ 1 | ≤ 2 | ≤ 1,5 | ≤ 3 |
| **Soma do rig (8 camadas)** | | **≤ 41** | **≤ 101** | ≤ 61 | ≤ 146 |
| Cada still de pose (S02 a S12) | 440×550 | ≤ 26 | ≤ 65 | ≤ 38 | ≤ 95 |
| Avatar do float (recorte de busto) | 48×48 | ≤ 2,5 | ≤ 5 | ≤ 3,5 | ≤ 7 |

Totais-alvo (AVIF; no 1x vale a coluna 1x):

| Cenário | Conteúdo | Total máx. (2x) |
|---|---|---|
| Home, caminho completo | S01 65 + rig 101 + S02 65 + um S03 65 | **≤ 296 KB** (o plano previa 250 a 400 KB) |
| `/diagnostico`, caminho completo | S01 65 + S11 + S05 + S07 + S09 (4 × 65) | ≤ 325 KB |
| Qualquer página, float | avatar do float | ≤ 5 KB de imagem |
| JS novo no bundle inicial | provider + loader do float | ≤ 2 kB gzip |
| JS do rig (chunk lazy) | controlador + componentes | ≤ 6 kB gzip |
| JS do float (chunk lazy) | botão + Popover (compartilha o Radix Popper com o `Select`) | ≤ 12 kB gzip |
| Memória de imagem decodificada (rig, 2x) | camadas | ≤ 12 MB |

### 7.3 Ordem de carregamento

1. **SSR e primeiro paint:** hero com **S01 estático** via `next/image` (`width={440}`, `height={550}`, `sizes` por breakpoint, `loading="eager"`, `fetchPriority` padrão). Se o LCP medido pelo A10 passar de +200 ms **e** o elemento LCP for a imagem do Vini, usar `preload` (no Next 16 a prop `priority` está obsoleta); se ainda passar, reduzir o S01 (alvo AVIF 2x de 50 KB). Dimensões fixas, `aspect-ratio: 4/5`, **sem CLS**.
2. **Depois do LCP:** o rig só carrega quando **todas** as condições valem: o evento `load` ocorreu; `requestIdleCallback` disparou (tempo-limite 2.000 ms; `setTimeout` de 1.200 ms no Safari); o hero está a até 200 px da viewport (`IntersectionObserver` com `rootMargin: 200px`); sem reduced-motion; sem `navigator.connection.saveData`; conexão não é `2g`/`slow-2g`. Importado por `next/dynamic` com `ssr: false`.
3. **Montagem do rig:** baixar e decodificar as 8 camadas (`img.decode()`), tudo ou nada, tempo-limite de 4 s. Falhou: permanece o S01 (`data-vini-rig="off"`). Pronto: o rig entra por crossfade de 120 ms **sobre** o S01, as animações só começam depois, e então o S01 vira `visibility: hidden` (nunca fica sob o rig em movimento, para não haver contorno duplo).
4. **Stills sob demanda:** S02 é baixado quando o rig fica pronto e o aceno ainda não tocou; S03 (só o lado necessário) no primeiro `pointerenter` ou foco em `data-vini-cta`, ou quando o CTA entra na viewport, após ociosidade; no `/diagnostico`, S11 após ociosidade da página, S05 no primeiro `input`/`change`, S07 e S09 no início do submit. O float baixa só o seu avatar.

### 7.4 Pausa fora da tela

- `IntersectionObserver` na raiz do rig (`threshold: 0`, `rootMargin: 100px`): fora da tela, **pausa tudo** (`data-vini-paused="true"`): cancela `requestAnimationFrame` e temporizadores de piscar, adiciona `animation-play-state: paused` aos loops CSS, remove `will-change` e remove os ouvintes de `pointermove` e `scroll`. Retoma ao voltar.
- `visibilitychange` (aba oculta) e `pagehide` têm o mesmo efeito.
- Em repouso (cursor parado, rig visível) o custo é: loops de compositor (respiração, balanço) + um `setTimeout` a cada 3 a 6 s. Zero JS por quadro.

### 7.5 Configuração de imagens (Next 16, conferir `next.config.*`)

| Chave `images` | Valor necessário | Por quê |
|---|---|---|
| `formats` | `["image/avif", "image/webp"]` | o padrão é só WebP |
| `qualities` | incluir **75 e 82** (obrigatório no Next 16; valor fora da lista é arredondado para o mais próximo) | qualidade dos stills |
| `imageSizes` | acrescentar **320, 380, 440** | 1x do hero e do panel sem sobrar bytes (todos < 640, o menor `deviceSizes`) |
| `deviceSizes` | acrescentar **760 e 880** | 2x de 380 e de 440 (320 × 2 = 640 já existe) |

- **Stills:** `next/image` (otimizador), `quality={82}`. **Camadas do rig:** arquivos **pré-gerados** por script (`sharp`) em `public/avatar/rig/` e servidos com `<picture>` (AVIF e depois WebP) e `srcset` com descritores `1x` e `2x`. Motivo: tamanho exato por caixa, controle da borda alfa, nenhum consumo de cota do otimizador.
- Nomes: `{id}@1x.avif`, `{id}@2x.avif`, `{id}@1x.webp`, `{id}@2x.webp`. Masters ficam em `brand/avatar/masters/` (fora do git, como no plano §8).
- Plano B se a cota de otimização de imagens do plano da Vercel apertar: servir também os stills pré-gerados com `<picture>`, mesma convenção de nomes.

---

## 8. Componentes e API

Arquivos (plano §8): `components/avatar/vini.tsx`, `vini-rig.tsx` (chunk lazy), `vini-float.tsx`, `vini-still.tsx`, `vini-provider.tsx`; hooks em `components/avatar/use-vini.ts`; dados em `lib/avatar.ts`; textos em `lib/content.ts` (chave `viniContent`).
Os blocos abaixo são **contrato de tipos**, não implementação.

```ts
// lib/avatar.ts (tipos)
export type ViniPoseId =
  | "idle" | "greet" | "pointRight" | "pointLeft" | "explain" | "think"
  | "work" | "success" | "review" | "concern" | "lost" | "listen" | "celebrate";

export type ViniState =
  | "idle" | "attention" | "greet" | "point"
  | "listen" | "think" | "success" | "concern" | "lost";

export type ViniSide = "left" | "right";
export type ViniSource = "route" | "form" | "cta" | "greet";
export type ViniLayerId =
  | "body" | "arm" | "head" | "eyes" | "pupils" | "eyesClosed" | "brows" | "mouth";
```

Mapeamento estado → pose: `idle` e `attention` → `idle`; `greet` → `greet`; `point` → `pointRight` ou `pointLeft` conforme `side`; os demais têm o mesmo nome. As poses `explain`, `work`, `review` e `celebrate` **não** são estados da máquina: existem só em `ViniStill`.

```tsx
// components/avatar/vini.tsx
export type ViniSize = "hero" | "panel";

export interface ViniProps {
  /** Estado controlado. Se omitido, usa useViniState(). */
  state?: ViniState;
  /** hero = rig + stills; panel = só stills com crossfade. Padrão: "hero". */
  size?: ViniSize;
  /** Liga o rig em camadas. Padrão: size === "hero". Só 1 por página. */
  rig?: boolean;
  /** Toca o aceno 1x por sessão. Padrão: false. Só o hero da home liga. */
  greet?: boolean;
  /** Marca a raiz com data-vini-hero (o float usa). Padrão: size === "hero". */
  heroMarker?: boolean;
  className?: string;
}
export function Vini(props: ViniProps): React.ReactElement;
```

```tsx
// components/avatar/vini-still.tsx
export type ViniStillSize = "avatar" | "panel" | "hero";

export interface ViniStillProps {
  pose: ViniPoseId;
  /** avatar = 48 px, recorte de busto (só pose "idle"); panel e hero = canvas 4:5. */
  size?: ViniStillSize;
  /** Padrão true: aria-hidden + alt="". Se false, exige alt (padrão em lib/avatar.ts). */
  decorative?: boolean;
  alt?: string;
  loading?: "eager" | "lazy";
  className?: string;
}
export function ViniStill(props: ViniStillProps): React.ReactElement;
```

```tsx
// components/avatar/vini-float.tsx
export interface ViniFloatProps {
  /** Rotas (por prefixo) onde não aparece. Padrão: ["/diagnostico"]. */
  hideOn?: readonly string[];
  /** Atraso mínimo após o load, em ms. Padrão: 2500. */
  appearAfterMs?: number;
}
export function ViniFloat(props: ViniFloatProps): React.ReactElement | null;
```

```ts
// components/avatar/use-vini.ts
export interface ViniRequestOptions {
  /** Tempo mínimo, em ms, que ESTE estado fica visível antes de ser trocado. */
  holdMs?: number;
  /** Libera o pedido sozinho depois de N ms. */
  ttlMs?: number;
  /** Só para "point". */
  side?: ViniSide;
}

export interface ViniApi {
  /** Estado resolvido (maior prioridade ativa). */
  state: ViniState;
  pose: ViniPoseId;
  side: ViniSide;
  request: (source: ViniSource, state: ViniState, options?: ViniRequestOptions) => void;
  release: (source: ViniSource) => void;
}
export function useViniState(): ViniApi;

/** Para os CTAs do hero: espalhar `handlers`, ligar `ref` e marcar o elemento com data-vini-cta. */
export interface ViniPointBinding<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  handlers: {
    onPointerEnter: React.PointerEventHandler<T>;
    onPointerLeave: React.PointerEventHandler<T>;
    onFocus: React.FocusEventHandler<T>;
    onBlur: React.FocusEventHandler<T>;
  };
}
export function useViniPoint<T extends HTMLElement>(): ViniPointBinding<T>;

/** Para o DiagnosticForm: liga os estados do formulário à máquina. */
export interface ViniFormBinding {
  formProps: {
    onFocus: React.FocusEventHandler<HTMLFormElement>;
    onInvalidCapture: React.FormEventHandler<HTMLFormElement>;
  };
}
export function useViniFormSignal(
  formState: "idle" | "sending" | "success" | "error",
): ViniFormBinding;
```

- `ViniProvider` (client) envolve o conteúdo em `app/layout.tsx`: contexto + reducer, sem importar imagens. `useViniState()` fora do provider lança erro claro em desenvolvimento.
- O `DiagnosticForm` chama `useViniFormSignal(state)` e soma `formProps` ao `<form>` junto do `onFocus={handleFirstFocus}` existente (os dois handlers rodam). **Não** alterar o fluxo de `track("diagnostic_start")` do formulário.

### 8.1 Shape de `lib/avatar.ts`

Fonte única, no padrão de `lib/diagnostic.ts`. Tudo `as const`. **Todos os parâmetros de movimento vivem aqui** (um lugar para ajustar e para o QA ler).

```ts
export interface ViniBox { x: number; y: number; w: number; h: number } // % do pai

export interface ViniPoseAsset {
  id: ViniPoseId;
  code: string;            // "S01" ... "S12" (S03a, S03b)
  src: string;             // master para o otimizador: "/avatar/poses/idle.png"
  width: 880;
  height: 1100;
  alt: string;             // texto de A5; usado só se decorative={false}
}

export interface ViniLayerAsset {
  id: ViniLayerId;
  base: string;            // "/avatar/rig/body" -> body@1x.avif etc.
  width: number;           // px no 1x
  height: number;
  box: ViniBox;            // gerado pelo script de exportação
  parent: "canvas" | "head";
  z: number;
  origin: string;          // transform-origin, ex.: "50% 100%"
}

export interface ViniAvatarAsset {
  base: string;            // "/avatar/avatar/idle" (48x48 e 96x96)
  size: 48;
}

export const viniCanvas = { width: 880, height: 1100, ratio: "4 / 5" } as const;
export const viniSizes = {
  hero: { base: 320, md: 380, lg: 440 },
  panel: { base: 280, md: 320 },
} as const;
export const viniPoses: Record<ViniPoseId, ViniPoseAsset>;
export const viniRig: Record<ViniLayerId, ViniLayerAsset>;
export const viniAvatar: ViniAvatarAsset;
export function poseForState(state: ViniState, side: ViniSide): ViniPoseId;
```

```ts
export const viniMotion = {
  breath: {
    cycleMs: 4000, bodyScaleY: 1.01, bodyScaleX: 1.004,
    headLiftPct: 3, armLiftPct: 1.5, armRotateDeg: 0.8, armDelayMs: 150,
  },
  sway: { cycleMs: 7000, rotateDeg: 0.6 },
  blink: {
    minMs: 3000, maxMs: 6000, firstMinMs: 1500, firstMaxMs: 3000,
    closeMs: 50, holdMs: 40, openMs: 60,
    doubleChance: 0.15, doubleGapMs: 220, minGapMs: 2500,
  },
  track: {
    desktop: {
      headRotateMaxDeg: 7, headX: 1.5, headY: 1.0, faceX: 3.0, faceY: 1.8,
      pupilX: 2.5, pupilY: 1.5, deadZonePx: 120,
      tauMs: { pupil: 70, face: 110, head: 140 },
      idleReturnAfterMs: 4000, returnMs: 700,
    },
    scroll: {
      headY: 1.0, faceY: 1.0, pupilY: 1.5, velocityNorm: 1800, minVelocity: 80,
      tauMs: { pupil: 90, head: 160 }, stopAfterMs: 500, returnMs: 400,
    },
  },
  greet: {
    storageKey: "gasplab:vini:greet", inMs: 240, holdMs: 720, outMs: 240,
    visibleDelayMs: 600, maxWaitMs: 6000,
  },
  point: { hoverIntentMs: 120, leaveGraceMs: 150, maxHoldMs: 8000 },
  form: { thinkMinMs: 600, concernHoldMs: 1500, concernTtlMs: 6000 },
  crossfadeMs: {
    rigIn: 120, greetIn: 240, greetOut: 240, pointIn: 300, pointOut: 250,
    listen: 400, think: 200, success: 400, concern: 250, concernOut: 300,
  },
  float: {
    appearAfterMs: 2500, scrollAppearPct: 20, heroHiddenBelowPct: 30,
    fadeInMs: 300, fadeOutMs: 200, pulseMs: 1200, pulseSpreadPx: 14,
    pulseKey: "gasplab:vini:float-pulsed",
  },
  load: { rigTimeoutMs: 4000, stillTimeoutMs: 1500, idleTimeoutMs: 2000 },
} as const;
```

`viniContent` (em `lib/content.ts`, textos provisórios para A5 fechar): `floatLabel` ("Falar com o Vini"), `whatsappCta`, `diagnosticCta`, `close`. Nenhum texto com promessa, prazo ou número.

---

## 9. Onde cada peça entra

| Local | Peça | Observação |
|---|---|---|
| `app/layout.tsx` | `ViniProvider` + `ViniFloat` como **último filho do body** | provider sem imagens; float lazy |
| Hero da home | `<Vini size="hero" greet />` ao lado do CTA; CTAs com `useViniPoint` e `data-vini-cta` | de `lg` em diante: coluna da direita, base alinhada com o grid; abaixo de `lg`: centralizado sob os CTAs, largura 320 px (380 px em `md`). **Não** substitui a frase-mãe |
| `/diagnostico` | `<Vini size="panel" />` na coluna esquerda; `useViniFormSignal` no `DiagnosticForm` | sem rig; float escondido |
| Método (S04, S05, S06 por etapa) e Governança (S08) | `<ViniStill pose=... size="panel" />` | estáticos, `decorative`; o mapeamento pose por etapa segue o plano §3 |
| `app/not-found.tsx` | `<ViniStill pose="lost" size="panel" />` | sem máquina de estados |
| `components/site-shell.tsx` | `Footer` com `pb-28` | ver §6.1 |
| `lib/use-prefers-reduced-motion.ts` | hook extraído de `visuals.tsx` | ver §4 |
| `app/globals.css` | `@keyframes` do pulso e dos loops de respiração e balanço (classes `.vini-*`) | sem hex; a regra global de reduced-motion já existe |

---

## 10. Lista de verificação de QA (A10, `qa-runner`)

Registrar passou ou falhou e o valor medido. Viewports mínimos: 1440×900, 1024×768, 768×1024, 390×844, 360×640 e 667×375 (paisagem). Navegadores: Chromium, Firefox e WebKit (Playwright), mais iOS Safari e Android Chrome reais para a parte touch.

**A. Máquina de estados**
1. `data-vini-state` e `data-vini-pose` batem com cada linha da §2.1 ao disparar o gatilho real (não por atalho).
2. `point`: hover ≥ 120 ms com `mouse` troca a pose em 300 ms (tolerância de 50); hover < 120 ms não troca; `touch` nunca dispara; foco por Tab dispara; sair do CTA volta em 250 ms; lado correto (CTA à direita do rig leva a `pointRight`).
3. `greet`: toca **uma vez** por aba (limpar `sessionStorage`, recarregar, abrir nova aba, repetir); dura 1.200 ms (tolerância de 100); não toca com reduced-motion, com foco em campo, após rolar mais de 40%, nem em outra rota; `sessionStorage` bloqueado não quebra.
4. `/diagnostico`: foco leva a `listen` (400 ms); submit leva a `think` por ≥ 600 ms mesmo com API instantânea; 200 leva a `success` (terminal); API 500, 429, 503 e falha de rede (interceptar) levam a `concern`; campo `required` vazio leva a `concern` (evento `invalid`); `concern` volta a `listen` ≥ 1.500 ms depois do foco ou em 6 s.
5. `/404`: S10 estático, sem rig, sem requisição de rig.
6. Prioridade: `form` vence `cta`; `route` vence tudo; troca de rota libera os pedidos.
7. Troca rig e still sem salto: com o rig em repouso, a diferença de pixels contra o S01 still fica ≤ 1 px nas bordas (comparação de screenshot).

**B. Parâmetros de movimento** (ler `lib/avatar.ts`; medir com traço de desempenho ou amostragem de `getComputedStyle`)
8. Piscar: 30 intervalos medidos ficam entre 3.000 e 6.000 ms; duração próxima de 150 ms; piscar duplo em torno de 15% (tolerância de 10 pontos em 100 amostras); nenhum piscar em estados com still.
9. Respiração: ciclo de 4.000 ms (tolerância de 50); `scaleY` máx. 1,010; nenhuma alteração de layout (CLS 0).
10. Rastreio desktop: cursor nos cantos extremos mantém a rotação composta da cabeça ≤ 8° e as pupilas dentro de 2,5% e 1,5%; cursor parado por 4 s volta ao centro em cerca de 700 ms; `pointerleave` idem; zona morta de 120 px sem tremor.
11. Mobile (`hover: none`): rolagem lenta (< 80 px/s) não move as pupilas; rolagem rápida move só Y (até 1,5%) e **não** gira a cabeça; para após 500 ms sem scroll; toque na tela **não** move o olhar; âncora `#metodo` com `scroll-behavior: smooth` não ultrapassa os limites.

**C. Reduced-motion** (emulação de `prefers-reduced-motion: reduce`, e alternar em tempo de execução)
12. Nenhuma requisição das camadas do rig nem do chunk `vini-rig`; o hero fica em S01 estático.
13. Zero `requestAnimationFrame` do Vini e zero temporizador de piscar no traço; nenhum `transform` animado no Vini.
14. A troca de pose por estado continua (`listen`, `think`, `success`, `concern`, `point`), **instantânea** (0 ms, sem crossfade).
15. Float sem pulso e sem fade/slide; card abre sem animação; Esc, foco e links funcionam.
16. Ligar reduced-motion com o rig ativo desmonta o rig e volta ao S01 sem erro de console.

**D. Desempenho** (Lighthouse mobile, 5 execuções, mediana; linha de base = commit anterior)
17. Performance ≥ 90; CLS < 0,1 (alvo ≤ 0,02, sem deslocamento atribuível ao Vini); **LCP ≤ linha de base + 200 ms**; TBT sem piora relevante; nenhuma tarefa longa do rig.
18. Peso transferido por ativo ≤ tabela §7.2 (AVIF e WebP, 1x e 2x, via `transferSize`); totais do §7.2: home ≤ 296 KB, `/diagnostico` ≤ 325 KB (AVIF 2x); JS inicial novo ≤ 2 kB gzip; chunks lazy dentro do orçamento.
19. Ordem de rede: nenhuma camada do rig antes do `load`; o rig só pede após ociosidade; S03 só após `pointerenter` ou foco, ou CTA visível; S11, S05, S07 e S09 só no `/diagnostico` e sob demanda.
20. Sem `Save-Data` e sem `2g`: o rig carrega. Com `Save-Data: on` e com `slow-2g` emulado: o rig **não** carrega e os stills de estado continuam.
21. Fora da tela: rolar para longe do hero zera `requestAnimationFrame` e temporizadores (`data-vini-paused="true"`); aba oculta idem; voltar retoma.
22. Falha de camada (bloquear um `body@2x.avif`): permanece S01, sem meio-boneco, sem erro não tratado.
23. `images` no `next.config`: contém `formats`, `qualities` (75 e 82) e os tamanhos novos; o formato servido é AVIF no Chromium e WebP em Safari sem AVIF.
24. Memória decodificada do rig ≤ 12 MB (2x).

**E. Acessibilidade**
25. axe: zero violações em `/`, `/diagnostico` e `/404`, com o card do float aberto e fechado.
26. Mascote: raiz com `aria-hidden="true"`, `alt=""`, nenhum elemento focável dentro, `pointer-events: none` (clicar sobre o Vini atinge o conteúdo abaixo).
27. Só o botão do float aparece na árvore de acessibilidade, com nome "Falar com o Vini", `aria-expanded` correto e `aria-haspopup="dialog"`.
28. Teclado: Tab alcança o botão (depois do rodapé); Enter e Espaço abrem; o foco vai ao primeiro link; Tab percorre WhatsApp, Diagnóstico e Fechar; **Esc fecha e devolve o foco ao botão**; Tab para fora fecha; foco visível em todos os controles (anel de 2 px `--signal`, sem corte).
29. Alvos medidos por `boundingBox`: botão 48×48; links do card e Fechar com ≥ 44 px de altura e largura; espaçamento ≥ 8 px.
30. Contraste (ferramenta, valores de referência da §5): texto do card ≥ 4,5:1; anel de foco e borda do botão ≥ 3:1.
31. Zoom de 200% e 400% e texto aumentado: card legível, sem corte, com rolagem interna.
32. Sucesso e erro continuam disponíveis por texto (`aria-live`, `role="alert"`) com o Vini desligado (imagens bloqueadas).

**F. CTA flutuante**
33. Aparece só depois de ≥ 2,5 s do `load` ou de rolagem de 20%, e (na home) só com o hero < 30% visível; some ao voltar ao hero, sem novo pulso.
34. Pulso exatamente **uma vez** por sessão (`sessionStorage`), 1.200 ms; não repete após abrir o card; ausente com reduced-motion.
35. Escondido em `/diagnostico` e subrotas; escondido em paisagem com altura ≤ 480 px.
36. Mobile 390×844 e 360×640: não cobre o header nem o botão "Diagnóstico" ou o `MobileNav`; com o menu aberto o float fica por trás; o card nunca invade os 72 px do header; respeita `safe-area-inset`.
37. Final da página: o float não cobre a linha de copyright do rodapé (footer com `pb-28`).
38. Eventos: um clique em WhatsApp dispara **um** `whatsapp_click` com `origem: "vini_float"`; um clique em diagnóstico dispara **um** `diagnostic_start` com `origem: "vini_float"`; **nenhum** evento ao abrir ou fechar; nenhum dado de formulário em analytics.
39. O float não carrega JS nem imagem antes de `load` + ociosidade.

**G. Robustez e marca**
40. JS desligado: o hero mostra S01 (SSR), sem float, sem erro.
41. Sem erro de hidratação nem warning no console em `/`, `/diagnostico` e `/404`.
42. Cores: nenhum hex nos arquivos novos (`grep`); só tokens; textos vindos de `lib/content.ts`.
43. O formulário do diagnóstico continua funcional e com os mesmos eventos (`diagnostic_start` uma vez por montagem, `diagnostic_submit`), com e sem Vini.
44. Regressão visual: screenshot de cada pose (S01 a S12) em 1x e 2x, alinhadas na mesma linha de base.
45. A9 (`fact-checker`) lê todo texto do Vini (card, alts, microcopy): nenhuma promessa, prazo ou número fora do Vault.

---

## 11. Requisitos para a arte (E4) que esta especificação assume

- Todas as poses no mesmo canvas 4:5 (880×1100), fundo transparente, mesma linha de base dos pés.
- `body` com *clean plate* (preenchido onde ficam a cabeça e o braço), `head` sem olhos, sobrancelhas e boca, `eyesClosed` opaco sobre o olho e a pupila.
- `pupils` como camada móvel (preferido); direções discretas só como plano B (§3.3).
- Recorte de busto de S01 para o avatar do float, 96×96 px, legível em 48 px e 24 px em escala de cinza.
- Mesmo enquadramento do S01 still e do rig em repouso (verificação de pixels no QA, item 7).

---

## 12. Pendências e dúvidas

1. **Divergência do plano:** o §8 do plano cita `motion`; esta spec recomenda CSS puro (§0.1). Confirmar com Fable e Felipe.
2. **`diagnostic_start` pode contar em dobro:** o formulário já dispara `track("diagnostic_start")` no primeiro foco. Clicar no float e depois focar o formulário registra o evento duas vezes para a mesma intenção. A propriedade `origem: "vini_float"` permite separar no relatório, mas falta decidir se o formulário deve ignorar o evento quando a origem for o float. Não verifiquei se `TrackedLink` aceita `diagnostic_start` no tipo de eventos; se não aceitar, o frontend reporta em vez de criar evento novo.
3. **Arquivos fora do escopo de leitura desta spec:** `components/sections/mobile-nav.tsx` (confirmar que o painel usa `z-50` ou mais), `components/ui/` (existe `popover`? senão, `shadcn add popover`), `package.json` (existe `motion` ou `framer-motion`?), `next.config.*` (valores atuais de `images`).
4. **Cota de otimização de imagens da Vercel** no plano contratado: a conferir pelo frontend ou infra. Plano B no §7.5.
5. **Selo de 32 px monocromático** do plano (§2.3 e §3) não está coberto aqui: precisa de ativo próprio (silhueta). Fica fora deste contrato até a E5 entregar.
6. **Valores `[E4]`** (caixas, pivôs, ordem Z, tamanhos de camada) são padrões; os definitivos saem do script de exportação.
7. **Texto final** do card e dos alts: A5. Esta spec usa textos provisórios, sem promessa.
8. **Layout do hero** (posição exata do Vini ao lado do CTA) é decisão de composição da página; a spec fixa só tamanhos, lado e regras de não-CLS.
