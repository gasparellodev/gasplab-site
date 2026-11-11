# GaspLab — como montar o ambiente em outra máquina

> Mapa completo de todos os projetos, da base privada e do agente do Telegram: [CONTINUIDADE.md](CONTINUIDADE.md).

Guia para deixar a base de conhecimento, os agentes e os três repositórios da GaspLab funcionando em um computador novo, do mesmo jeito que na máquina original.

> **Este repositório é público.** Não coloque senhas, chaves, e-mails de clientes nem dados de leads em nenhum arquivo versionado. Segredos ficam só no `.env.local` (ignorado pelo git) e no painel da Vercel.

---

## 1. Visão geral: três repositórios, uma pasta

Tudo vive dentro de uma pasta `GaspLab/`. A raiz é o repositório do site; `hub/` e `previews/` são repositórios próprios, clonados dentro dela e ignorados pelo git da raiz.

```text
GaspLab/                      ← gasparellodev/gasplab-site (público)
├── app/ components/ lib/ db/ drizzle/ public/   site gasplab.site (Next.js)
├── knowledge/                base de conhecimento da GaspLab
├── docs/                     contrato do site (CONTEXTO.md) e acervo de fatos
├── brand/                    brand book, avatar/mascote Vini, style boards
├── outputs/                  logos, favicons, fontes, artes de redes sociais
├── squads/  .aiox-core/      agentes XSquads e framework AIOX
├── .claude/                  agentes, regras, skills, comandos e hooks do Claude Code
├── hub/                      ← icecompany-19/gasplab-hub (privado) — CRM /operacao
└── previews/                 ← icecompany-19/gasplab-previews (privado) — prévias de clientes
```

| Repositório | Conteúdo | Publicação |
|---|---|---|
| `gasparellodev/gasplab-site` | Site institucional + base de conhecimento + agentes | Vercel (gasplab.site) |
| `icecompany-19/gasplab-hub` | CRM, prospecção, tarefas, prévias, conversas, assistente Gaspar | Vercel (gasplab-hub.vercel.app) — merge na `main` publica |
| `icecompany-19/gasplab-previews` | Prévias estáticas, uma pasta por cliente | Vercel (gasplab-previews.vercel.app) — push na `main` publica |

---

## 2. Pré-requisitos

| Ferramenta | Versão | Para quê |
|---|---|---|
| Git | recente | clonar e versionar |
| Node.js | **20 ou maior** (a máquina original usa 24) | site, hub e build das prévias |
| GitHub CLI (`gh`) | recente | clonar os repositórios privados e abrir PRs |
| Claude Code (app desktop ou CLI) | recente | agentes, skills e regras do projeto |
| Vercel CLI (opcional) | `npx vercel@latest` | baixar variáveis de ambiente (`vercel env pull`) |
| Supabase CLI + Docker (opcional) | — | só se quiser um banco do hub 100% local |

Contas necessárias:

- **GitHub:** acesso de escrita a `gasparellodev/gasplab-site` e à organização/conta `icecompany-19` (repositórios privados).
  - Só merges feitos pela conta `icecompany-19` publicam o hub na Vercel (plano Hobby bloqueia outros autores).
- **Vercel:** acesso aos projetos do site, do hub e das prévias (para ler as variáveis de ambiente).
- **Supabase:** acesso ao projeto usado pelo hub.

---

## 3. Clonar na estrutura certa

```bash
gh auth login
```

```bash
git clone https://github.com/gasparellodev/gasplab-site.git GaspLab
```

```bash
cd GaspLab && gh repo clone icecompany-19/gasplab-hub hub
```

```bash
cd GaspLab && gh repo clone icecompany-19/gasplab-previews previews
```

Depois, faça o git do site ignorar o `hub/` (o `previews/` já está no `.gitignore`):

```bash
cd GaspLab && echo "/hub/" >> .git/info/exclude
```

Confira: `git status` na raiz não deve listar `hub/` nem `previews/`.

> Os nomes das pastas importam: `tsconfig.json`, `eslint.config.mjs` e `.vercelignore` do site excluem `hub/` e `previews/` pelo nome.

---

## 4. Variáveis de ambiente (segredos)

Nada disso está no GitHub. Recrie em cada máquina.

### Hub (`hub/.env.local`) — obrigatório para rodar o CRM

O jeito mais seguro é puxar da Vercel, que tem os valores de produção:

```bash
cd GaspLab/hub && npx vercel@latest link && npx vercel@latest env pull .env.local
```

Ou copie `hub/.env.example` para `hub/.env.local` e preencha à mão. Variáveis principais:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ou `..._PUBLISHABLE_KEY`), `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (o redirect de login do Supabase espera a porta 3000)
- `OPERACAO_ADMIN_EMAILS` — e-mails que viram admin no primeiro login
- Opcionais: `GOOGLE_PLACES_API_KEY`, `META_WHATSAPP_*`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `POSTGRES_URL_NON_POOLING`

> ⚠️ **O Supabase do hub tem dados reais da operação.** Hoje a produção usa o mesmo projeto Supabase que o ambiente local. Não crie nem apague dados de teste nele sem combinar com o Vinícius/Felipe.

### Site (`.env.local` na raiz) — só se for mexer no formulário de diagnóstico

Copie `.env.example` para `.env.local`. Variáveis: `DATABASE_URL` (Neon), `NEXT_PUBLIC_CAL_URL`, `RESEND_API_KEY`, `DIAGNOSTIC_NOTIFY_TO`, `DIAGNOSTIC_NOTIFY_FROM`. Sem elas o site sobe, mas o formulário não grava.

### Prévias

Não usam variáveis de ambiente.

---

## 5. Instalar e rodar

```bash
cd GaspLab && npm install
```

```bash
cd GaspLab/hub && npm install
```

| O quê | Comando | Endereço |
|---|---|---|
| Site | `npm run dev` (na raiz) | http://localhost:3000 |
| Hub (CRM) | `npm run dev` (em `hub/`) | http://localhost:3000/login |
| Prévias | `node previews/serve.cjs` (na raiz) | http://localhost:4173/<slug>/ |

Site e hub usam a mesma porta: rode um de cada vez. Encerre os servidores ao terminar.

Outros comandos úteis (site e hub): `npm run build`, `npm run lint`, `npm test`, `npm run db:generate`, `npm run db:migrate`.

**Migrações do hub:** ficam em `hub/supabase/migrations/`. Aplique sempre **antes** do merge que depende delas (pelo SQL Editor do Supabase ou `npx supabase db push`); o `scripts/migrate.mjs` do build não é confiável para isso.

**Nova prévia:** veja `previews/README.md` (pasta `slug/` com `page.html`, `meta.json`, `assets/`; `node build.mjs https://gasplab-previews.vercel.app slug`; commit e push).

---

## 6. Base de conhecimento e agentes (Claude Code)

Tudo abaixo já vem com o clone do site — não precisa instalar nada a mais.

| Onde | O quê |
|---|---|
| `CLAUDE.md` | Regras do projeto, carregadas em toda sessão. **Leia primeiro.** |
| `knowledge/` | Negócio (`00-gasplab`), produto Bio + Catálogo (`10-...`), mercado (`20-...`), riscos (`40-...`), scripts (`60-...`), técnico (`70-...`) e `99-pendencias.md` |
| `docs/CONTEXTO.md` | Contrato do site: briefing para todo agente que mexe no site |
| `docs/CONTEXT_VAULT.md` | Acervo de fatos que o `fact-checker` usa para validar textos públicos |
| `brand/` | Brand book v3, plano e "Bíblia" do mascote Vini (`brand/avatar/`) |
| `PLANO_GASPLAB.md`, `PLANO_AVATAR.md` | Planos do site e do mascote, com a linha de status no topo |
| `.claude/agents/` | Agentes do site (`copywriter`, `frontend`, `infra`, `brand-assets`, `fact-checker`, `qa-runner`), chefes dos squads e agentes AIOX |
| `.claude/rules/` | Regras de autoridade, handoff e uso de ferramentas |
| `.claude/skills/`, `.claude/commands/`, `.claude/hooks/` | Skills (ex.: `decupagem-video`), comandos `/AIOX:*` e hooks |
| `squads/` | 13 squads XSquads; entrada em `squads/xquads/` |
| `.aiox-core/` | Framework AIOX 5.4.1; regras completas em `.aiox-core/CLAUDE-AIOX.md` |

Regras que valem em qualquer máquina:

1. **Separação de bases:** este projeto é só da GaspLab. Dados operacionais de outros negócios não entram aqui (detalhes no `CLAUDE.md`).
2. **Não inventar dados:** se faltar um número, cliente ou depoimento, registre em `knowledge/99-pendencias.md`.
3. **Commits por caminho explícito**, nunca `git add -A` (outra sessão pode estar editando a mesma pasta).
4. **Nada de segredo ou dado de lead neste repositório**, porque ele é público. Dados de prospecção ficam no Supabase do hub ou no repositório privado das prévias.

### Ajustes manuais depois de clonar

- **`.claude/launch.json`:** as configurações `orochi` e `smoke` apontam para caminhos absolutos da máquina original (`C:/Users/Felipe Pessoa/Projetos/...`). Ajuste para o novo caminho ou remova, se esses projetos não estiverem na máquina nova. `site` e `previews` funcionam como estão.
- **Memórias do Claude:** as memórias entre sessões ficam fora do repositório, em `~/.claude/projects/<pasta-do-projeto>/memory/`. Para levar o contexto acumulado, copie essa pasta da máquina original para a nova à mão (pendrive ou nuvem privada), no caminho equivalente da nova pasta do projeto. Sem elas, o Claude se orienta pelo `CLAUDE.md`, pelos planos e por `knowledge/`.
- **MCPs:** conectores como Freepik, Google Ads/Analytics, Notion e Bling são configurados na conta e no app do Claude, não no repositório. Reconecte-os no app da nova máquina, se precisar.
- **Dados de importação do hub:** `hub/.import/` (base consolidada de prospecção usada pelo `scripts/import-prospeccao.ts`) não está no git. Esses dados já estão no Supabase. Só copie a pasta se for reimportar.

---

## 7. Checklist final

- [ ] `git status` limpo na raiz, em `hub/` e em `previews/`, sem `hub/`/`previews/` aparecendo na raiz
- [ ] `hub/.env.local` criado; `npm run dev` em `hub/` abre o login
- [ ] `npm run dev` na raiz abre o site
- [ ] `node previews/serve.cjs` abre uma prévia
- [ ] Claude Code aberto na pasta `GaspLab/` lista os agentes do projeto (`copywriter`, `frontend`...)
- [ ] `.claude/launch.json` ajustado aos caminhos da nova máquina
- [ ] (opcional) memórias do Claude copiadas
