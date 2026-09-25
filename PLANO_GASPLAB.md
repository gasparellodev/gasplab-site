# GaspLab — Plano de finalização (rebranding + site)

Versão 1.2 · 25/09/2026 · **Status: F0–F6 concluídas; publicação (GitHub + Vercel + DNS) aguardando login das contas — ver README, "Publicação — primeira vez".** Decisões: D1 = Vercel (não Cloudflare) + GitHub da conta vinygasparello · D2 = cópia em Projetos/GaspLab · D3 = marcas separadas · domínio de lançamento = gasplab.site (Hostinger). Onde este plano cita Cloudflare/D1/workers.dev, leia Vercel/Neon/preview da Vercel.
Fontes: `GaspLab_Cloud_Handoff.md`, `GaspLab_Context_Vault.md`, `GaspLab_Operacao_Multiagentes.md` e inspeção direta do código.

---

## 1. Onde estamos (verificado no código, não só no handoff)

**Confirmado:**

- O código real fica em `C:\Users\Felipe Pessoa\Documents\Codex\2026-09-25\agora-a-gente-precisa-criar-um\gasplab-site`. Há 7 arquivos modificados e a foto nova, **nada disso commitado**. O histórico tem 1 commit e **não existe remote** (nenhum backup fora desta máquina).
- `C:\Users\Felipe Pessoa\Projetos\GaspLab`, a pasta desta sessão, estava vazia.
- A home (`app/page.tsx`) já usa o novo posicionamento e a paleta azul.
- Sobram 10 ocorrências do verde `#b8ff3d` em 4 arquivos, como o handoff diz.
- O build não foi rodado depois da revisão azul.

**Achados que o handoff não registra:**

1. **A migração vai além do verde.** Os cinzas quentes da versão antiga (`#a8adb3`, `#92989f`, `#70757c`, `#c8cbc7`, `#d6d8d4`, `#b9bdc1`) continuam em 8 arquivos. No total são cerca de 130 cores hex escritas direto nas classes, espalhadas por 11 arquivos. Trocar um hex por outro só adia o mesmo problema. O certo é **tokenizar**.
2. **O dropdown do formulário abre branco.** `--popover: #ffffff` é o padrão do shadcn, então o Select "Interesse" do diagnóstico aparece branco sobre o site escuro. `--secondary`, `--accent` e `--sidebar-*` também continuam claros, `--chart-*` está em laranja e verde-água, e `--muted` ainda é `#15171b`.
3. **SEO e metadata seguem a marca antiga.** `app/layout.tsx` ainda usa "Tecnologia que move negócios" e a descrição antiga. Existe uma meta `codex-preview: development` e não há imagem Open Graph.
4. **`lib/content.ts` ainda tem a oferta antiga:** "Sites que convertem / Automações com IA / Sistemas sob medida". A escada Diagnóstico → Sprint → Implementação → Evolução não aparece em nenhuma página.
5. **O Context Vault está desatualizado e contradiz o site.** Ele ainda traz a tese e o método antigos e diz que RAM/Fiat/Jeep "nunca" podem aparecer como clientes diretos, enquanto o site lista essas marcas em "Clientes, projetos e parceiros". Como o Vault é a fonte de verdade dos agentes, ele precisa ser corrigido antes de tudo.
6. **A publicação depende do ChatGPT Sites.** O staging roda em `*.chatgpt.site` e o deploy passa pelo conector Sites da OpenAI, que não existe neste ambiente. Há código só para isso (`app/chatgpt-auth.ts`, `.openai/hosting.json`, meta `codex-preview`). Por baixo, a stack já é **Cloudflare Workers + D1 (wrangler)**.
7. **Os .tsx estão minificados, cada um em uma linha só.** Isso encarece edições e revisões e facilita erro. Uma passada de Prettier resolve.

---

## 2. Princípios de economia de tokens

1. **Script antes de LLM.** O trabalho mecânico roda por script e não gasta tokens: codemod de cores, Prettier, lint, tsc, build, Lighthouse, axe, crawl de rotas e exportação de tokens para JSON.
2. **Contexto mínimo por agente.** Cada agente lê o `CONTEXTO.md` (cerca de 1,5 mil tokens com tese, paleta, regras e proibições) e só os arquivos da própria tarefa. Ninguém relê o handoff de 22 KB.
3. **O que já foi decidido não volta para discussão.** O posicionamento foi aprovado pelos XSquads, então os conselhos não rodam de novo. No máximo, uma revisão final curta.
4. **Nem toda tarefa precisa de um agente.** Um subagente começa sem contexto e precisa reler tudo. Tarefas pequenas, ou que dependem do que já foi discutido aqui, ficam com o orquestrador.
5. **Escrever no modelo barato, revisar no caro.** O Sonnet produz e o Opus revisa só o diff. Sai bem mais barato do que o Opus escrever tudo.
6. **Paralelismo só com arquivos disjuntos.** Assim não há conflito nem retrabalho.
7. **Esforço proporcional à tarefa:** Haiku em `low`, Sonnet em `medium` e Opus em `high` só para decisões.

---

## 3. Agentes e modelos

Preço da API por 1M tokens (entrada/saída): **Fable 5.1** $10/$50 · **Opus 5.5** $4/$20 · **Sonnet 5** $2/$10 · **Haiku 4.5** $1/$5.

| Agente | Modelo | Esforço | Responsabilidade | Por que esse modelo |
|---|---|---|---|---|
| **orquestrador** (sessão principal) | Opus 5.5 | high | decisões, sistema de tokens, integração, revisão de diffs, deploy | decisões que afetam todo o resto; já tem o contexto carregado |
| **copywriter** | Sonnet 5 | medium | copy pt-BR, SEO, oferta, cases, founder story | escrita com regras claras; Sonnet é suficiente pela metade do custo |
| **frontend** | Sonnet 5 | medium | páginas, seções, componentes, imagens, eventos | implementação sobre padrões já definidos |
| **infra** | Sonnet 5 | medium | migração Cloudflare, D1, variáveis, rate limit | tarefa técnica bem especificada |
| **brand-assets** | Sonnet 5 | medium | logos SVG azuis, tokens JSON, Brand Book v2 | produção a partir de tokens prontos |
| **fact-checker** | Sonnet 5 | medium | cruzar toda afirmação do site com o Vault | exige julgamento sobre relações (cliente × emprego × projeto); Haiku erra aqui |
| **qa-runner** | Haiku 4.5 | low | rodar checklists, crawl, screenshots, grep, DNS | execução e leitura mecânicas; o modelo mais barato |
| **scripts** | — | — | codemod, Prettier, Lighthouse, axe, exportação de tokens | custo zero em tokens |
| Fable 5.1 | **não usar** | — | — | 2,5× o preço do Opus sem ganho real: a estratégia já está decidida e o código é simples |

As definições ficam em `.claude/agents/*.md`, com `model` e ferramentas restritas. `qa-runner` e `fact-checker` ficam **sem** Write/Edit: eles só apontam problemas, não corrigem.

---

## 4. Fases

Cada fase só fecha quando o critério de aceite for verificado.

### Fase 0 — Fundação · *orquestrador + scripts*

- 0.1 Copiar o checkout inteiro para `Projetos/GaspLab`, preservando as mudanças não commitadas. O original fica intacto como backup.
- 0.2 Commit de snapshot `wip: revisão azul (Codex)` antes de qualquer edição.
- 0.3 Rodar o Prettier em `app/`, `components/` e `lib/`, num commit separado só de formatação.
- 0.4 Rodar `npm run build` como linha de base e registrar os erros.
- 0.5 Escrever o `CONTEXTO.md` compacto e o **Context Vault v2**, com tese e método novos e a regra de marcas resolvida (D3).
- 0.6 Criar `.claude/agents/*.md`.

**Aceite:** snapshot commitado · build de base registrado · Vault sem contradições.

### Fase 1 — Sistema visual Blueprint · *orquestrador + script*

- 1.1 Definir os tokens finais em `globals.css` (`@theme`): `bg`, `surface`, `surface-2`, `primary`, `signal`, `text-1/2/3`, `border`, `focus`. Corrigir os tokens shadcn (`popover`, `secondary`, `accent`, `muted`, `sidebar`, `chart`) para o tema escuro azul.
- 1.2 Aplicar por script, em todos os arquivos, um codemod com a tabela hex → token.
- 1.3 Criar classes únicas para botão primário, secundário, link, focus ring e card.

**Aceite:** `rg -i "#[0-9a-f]{6}" app components lib` só encontra hex dentro de `globals.css` · nenhum verde · build ok · dropdown escuro.

### Fase 2 — Conteúdo e oferta · *copywriter (Sonnet)*

Arquivos: `lib/content.ts` (toda a copy passa a morar aqui) e a metadata de `app/layout.tsx`.

- Textos novos de metadata, SEO e Open Graph.
- Oferta em escada, com 4 degraus e o que cada um entrega. Sem preço até haver aprovação.
- Serviços reposicionados como capacidades de uma mesma arquitetura.
- Seção de governança: human-in-the-loop, fallback e supervisão.
- GaspBio e Contaflow no formato de 8 blocos, sem métricas.
- Seção de marcas dividida por tipo de relação (D3).
- Varredura de vocabulário: nada de "sem impacto", garantias ou "40%".

**Aceite:** revisão do orquestrador · fact-checker sem pendências.

### Fase 3 — Páginas e componentes · *frontend (Sonnet)* · depende de F1 e F2

- Home: seções da escada de oferta e de governança; seção de marcas dividida.
- `/cases/[slug]` em 8 blocos; `/servicos/[slug]` alinhado à nova oferta.
- Foto em WebP/AVIF com dimensões fixas, sem CLS. Imagem OG gerada (`app/opengraph-image.tsx`).
- Reels abrem no Instagram, sem autoplay.
- Um wrapper `track()` para eventos sem PII: início e envio do diagnóstico, agenda, WhatsApp e visualização de case. Ele não faz nada até o provedor de analytics ser escolhido.
- Remover os resíduos do ChatGPT Sites (se D1 = Cloudflare).

**Aceite:** build ok · todas as rotas renderizam · diff revisado pelo orquestrador.

### Fase 4 — Infra e publicação · *infra (Sonnet), com supervisão* · paralela a F2–F3 (arquivos disjuntos)

- Configuração própria do wrangler, `wrangler d1 create`, migration aplicada e `NEXT_PUBLIC_CAL_URL` opcional.
- Rate limit em `/api/diagnostics`.
- Staging em `*.workers.dev` protegido por **Cloudflare Access**, porque o workers.dev é público por padrão.
- O `wrangler login` fica com vocês: a credencial não passa pelos agentes.

**Aceite:** staging azul no ar e protegido · um POST de teste grava no D1 e o registro é apagado em seguida.

### Fase 5 — QA · *qa-runner (Haiku) + scripts; julgamento final do orquestrador*

- Scripts: build, lint, tsc, Lighthouse (mobile e desktop), axe, crawl de rotas e verificação de links.
- qa-runner: navegação em 375, 768 e 1440 px, teclado e foco, zoom de 200%, `prefers-reduced-motion`, formulário de ponta a ponta e screenshots.
- fact-checker: cada afirmação do site cruzada com o Vault v2.
- Orquestrador: triagem e correção, ou devolução para o frontend.
- Privacidade e termos: os agentes preparam o rascunho, mas a **revisão é humana/jurídica** (depende de CNPJ e controlador).

**Aceite:** Lighthouse mobile ≥ 90 em performance, acessibilidade, SEO e boas práticas · CLS < 0,1 · zero erro crítico no axe · relatório de QA sem bloqueadores.

### Fase 6 — Artefatos de marca · *brand-assets (Sonnet)* · paralela a F2–F5 (pasta `outputs/`)

- `gasplab-brand-tokens.json` gerado **por script** a partir do `globals.css`.
- Logos horizontal, símbolo e monocromático em azul.
- Brand Book v2 (.docx editável + PDF): tese, 4 argumentos, método, oferta, paleta, tipografia (Space Grotesk + IBM Plex Mono), Flowline, regras de motion, tom de voz e regras de uso de marcas de clientes.

**Aceite:** nenhum verde nos artefatos · revisão do orquestrador.

### Fase 7 — Lançamento · *orquestrador*

Só começa depois de: grafia confirmada, staging aprovado, Cal.com, clientes e logos classificados, textos jurídicos e QA concluído.

- Auditoria de DNS e SSL de `gasplab.com.br`, feita pelo qa-runner em modo só leitura.
- Apontar o domínio, configurar redirects www ↔ apex, atualizar sitemap e robots com o domínio final e ter um plano de rollback.

---

## 5. Ordem e paralelismo

```
F0 ─► F1 ─┬─► F2 (copy) ─► F3 (frontend) ─┬─► F5 (QA) ─► [aprovação] ─► F7
          ├─► F4 (infra) ─────────────────┘
          └─► F6 (brand-assets) ──────────────────────────────────┘
Insumos do fundador (humano, em paralelo) ──► alimentam F2, F3 e F7
```

---

## 6. Insumos do fundador (não bloqueiam F0–F5)

| # | Insumo | Desbloqueia |
|---|---|---|
| 1 | Confirmar a grafia **GaspLab** | F7 |
| 2 | URL do Cal.com | F4/F7 (até lá, o WhatsApp é o fallback) |
| 3 | Logos oficiais + autorização de uso | F3 (até lá, wordmarks) |
| 4 | Ice Company e Decora: URL, screenshots, escopo, período e tipo de relação | cases em F2/F3 |
| 5 | Classificação de cada marca (cliente, prestação, parceria, projeto, emprego) | F2 |
| 6 | Foto original em alta resolução | F3 |
| 7 | Aprovação da frase do fundador | F2 |
| 8 | CNPJ, razão social e controlador | privacidade/termos (F5) |
| 9 | Serviços prioritários | ordem da oferta (F2) |
| 10 | Nome e formato da "Sprint de Arquitetura de IA" | F2/F3 |

Observação: há skills da Ice Company instaladas neste ambiente que servem de contexto de marca para o case. O escopo e o resultado do trabalho da GaspLab, porém, precisam vir do fundador.

---

## 7. Decisões necessárias agora

- **D1 · Hospedagem.** (a) Conta Cloudflare própria (**recomendado**: a stack já é Workers + D1, elimina a dependência do ChatGPT Sites e dá para operar daqui); (b) continuar no ChatGPT Sites (eu preparo o build e vocês publicam pelo Codex).
- **D2 · Local do projeto.** (a) Copiar para `Projetos/GaspLab` (**recomendado**); (b) trabalhar direto no checkout do Codex.
- **D3 · Marcas.** (a) Separar "Clientes GaspLab" de "Trajetória do fundador" (**recomendado**); (b) manter uma lista única, como autorizado.
- **D4 · Backup remoto.** Repositório privado no GitHub (recomendado, opcional).

---

## 8. Riscos

| Risco | Mitigação |
|---|---|
| Preview local no Windows (Miniflare/VC++) falhou antes | tentar `npm run dev`; se falhar, fazer o QA visual no staging Cloudflare |
| Folha, Fiat, Jeep e Movida como "clientes" quando o vínculo foi emprego ou subcontratação | D3 + fact-checker |
| workers.dev público por padrão | Cloudflare Access + `noindex` no staging |
| Nenhum backup fora da máquina | D4 + snapshot em F0 |
| Afirmações sem fonte (ex.: "40% menos tempo") | regra no `CONTEXTO.md` + fact-checker bloqueando |
