# GaspLab — continuidade em outra máquina

Mapa de onde está cada projeto da GaspLab no GitHub, o que foi configurado e como retomar o trabalho do ponto em que parou. Estado sincronizado em **11/11/2026**.

> Este arquivo fica num repositório **público**. Aqui não há senha, chave nem dado de lead. Segredos vivem só nos `.env` de cada máquina e nos painéis (Vercel, Supabase).

O guia mais antigo, [SETUP-NOVA-MAQUINA.md](SETUP-NOVA-MAQUINA.md), continua valendo para os detalhes do site, do hub e das prévias. Este aqui cobre **tudo**: clientes, base privada, agente do Telegram e IceCrew.

---

## 1. Caminho curto (máquina nova)

Instale Git, Node.js 20 ou maior, Python 3.12 (só para o agente do Patrick), GitHub CLI e o Claude Code. Depois:

```bash
gh auth login
```

```bash
mkdir projects && cd projects && git clone https://github.com/gasparellodev/gasplab-site.git GaspLab
```

```bash
cd GaspLab && powershell -ExecutionPolicy Bypass -File scripts\montar-ambiente.ps1
```

O script clona todos os repositórios na estrutura certa, recria as frentes do hub, baixa a base privada e restaura as memórias do Claude. Ele só clona o que falta, então pode rodar de novo. No fim, lista o que não conseguiu baixar por falta de acesso.

Depois dele faltam três coisas manuais: recriar os `.env` (seção 5), rodar `npm install` nos projetos que for usar (seção 6) e reconectar os conectores do Claude (seção 7).

**Contas necessárias.** O git precisa de acesso de escrita a duas contas do GitHub: `gasparellodev` e `icecompany-19`. No primeiro `git clone` de cada conta o Windows abre a janela de login; entre com a conta pedida no endereço. Sem a `icecompany-19`, o script baixa o hub, as prévias, o Mineiro, a ZooVita e o Sr. Parmê das cópias que existem no `gasparellodev` (ver "Cópias no gasparellodev", na seção 2).

---

## 2. Onde está cada coisa

### Dentro da pasta `GaspLab/`

| Pasta | Repositório | Visibilidade | Branch de trabalho | O que é |
|---|---|---|---|---|
| `GaspLab/` (raiz) | `gasparellodev/gasplab-site` | público | `main` | Site gasplab.site, base de conhecimento pública, marca, agentes e squads |
| mesma pasta, git em `.privado.git` | `gasparellodev/gasplab-privado` | privado | `main` | Clientes, Main Thread, aquisição, leads, saídas e memórias do Claude (seção 3) |
| `hub/` | `icecompany-19/gasplab-hub` | privado | `feat/conteudo-organico` | CRM, prospecção, conteúdo, projetos e o assistente Gaspar |
| `hub-gaspar/` | mesma, worktree | privado | `feat/crm-raio-x` | Frente do CRM com o Raio-X e o Gaspar |
| `hub-emergencia/` | mesma, worktree | privado | `fix/abordagem-sem-google` | Abordagem pela prévia, sem nota do Google |
| `hub-mares/` | mesma, worktree | privado | `feat/mares-roteiros-v2` | Roteiros da Barbearia Mares |
| `previews/` | `icecompany-19/gasplab-previews` | privado | `main` | Prévias de clientes, uma pasta por cliente |
| `projects/loja-geral/` | `gasparellodev/loja-geral` | privado | `docs/bootstrap` | Buscador de produtos (motor e coletor da Shopee) |

### Pastas irmãs da `GaspLab/` (em `projects/`)

| Pasta | Repositório | Visibilidade | Branch | O que é |
|---|---|---|---|---|
| `burger-bulls/` | `gasparellodev/burger-bulls` | privado | `main` | Cardápio digital, pedidos, painel e comanda da Epson (bullsburguer.site) |
| `patrick-trading/` | `gasparellodev/patrick-trading` | privado | `main` | **Agente do Telegram**: trading de WIN/WDO com alertas, motor, setups e testes |
| `zoom-lupas-video/` | `gasparellodev/zoom-lupas-video` | privado | `main` | Vídeo de 15 s da prévia Zoom Lupas (Remotion) |
| `ice-crew-base/` | `gasparellodev/ice-crew-base` | privado | `main` | **Base de conhecimento da IceCrew** (índice em `00-INDICE.md`) |
| `tonab-lounge/` | `gasparellodev/tonab-lounge` | privado | `feat/landing-aaaa` | App e landing do Tô na B (tonab-lounge.vercel.app) |
| `divino-capelli/` | `gasparellodev/divino-capelli` | privado | `main` | Site do Divino Capelli |
| `istambul-halal/` | `gasparellodev/istambul-halal` | privado | `main` | Link-in-bio do Istambul Halal |
| `restaurante-genesis/` | `gasparellodev/restaurante-genesis` | privado | `main` | Link-in-bio do Restaurante Gênesis |
| `previews/` | `gasparellodev/previews-restaurantes` | privado | `main` | Prévias de restaurantes (cópia; a origem ficava na conta pessoal do Léo) |
| `mineiro-lanches/` | `icecompany-19/mineiro-lanches` | público | `claude/modest-galileo-t43m7f` | Cardápio e painel do Mineiro Lanche. A produção sai dessa branch |
| `zoovita/` | `icecompany-19/zoovita` | privado | `main` | Painel da ZooVita (Supabase, login) |
| `sr-parme/` | `icecompany-19/sr-parme` | privado | `main` | Cardápio do Sr. Parmê |

### Cópias no gasparellodev

Os cinco repositórios da `icecompany-19` têm cópia privada, com o mesmo nome, no `gasparellodev`: `gasplab-hub`, `gasplab-previews`, `mineiro-lanches`, `zoovita` e `sr-parme`. A cópia é de 11/11/2026 e serve de garantia e de acesso por uma conta só.

- **A Vercel publica do original**, na `icecompany-19`. Push só na cópia não publica nada.
- Cada pasta local tem dois remotos: `origin` (original) e `gasparello` (cópia). O `git push` normal vai para o original.
- A cópia não se atualiza sozinha. Para atualizar: `git push gasparello --all` dentro da pasta do projeto.

### Clientes que não têm repositório próprio

Ficam como pasta dentro de outro repositório:

| Cliente | Onde |
|---|---|
| XData Recicla | Página e planos em `previews/xdata-recicla/`; pesquisa em `clientes/xdata-recicla/` (base privada) |
| CNA Poá e Suzano | Proposta em `previews/cna-poa-suzano/`; panorama em `clientes/cna-poa-suzano/` (base privada) |
| Loja Elgin | `previews/elgin-loja/` e `clientes/elgin-loja/` (base privada) |
| Landing pages e prévias (Luma Tintas, Dr. Leonardo Rapp, Rosa Pink, Zoom Lupas, Simbalaê, Shlic's Burger e as demais) | Uma pasta por cliente em `previews/` |
| Barbearia Mares | Plano e roteiros dentro do hub (`hub-mares/`) |
| Main Thread (marca de roupa do Vinícius) | `knowledge/65-main-thread/` e `knowledge/60-gasp-global/` (base privada); a loja Shopify é montada a partir de `knowledge/60-gasp-global/loja-shopify/` |
| SEO e GEO (auditoria da Ice Company) | A página da auditoria é um artefato do Claude, e as fontes ficaram só na pasta temporária da sessão. Não há arquivo no git. Reteste marcado para 03/12/2026 |
| Brasa Hamburgueria | Só existe como lead na planilha de prospecção (`outputs/prospeccao-sp/`, base privada). Ainda não há prévia nem projeto |

---

## 3. Base privada (`gasplab-privado`)

O repositório do site é público, então nada de cliente pode ir para ele. A solução: um segundo repositório, privado, que usa **a mesma pasta** `GaspLab/` como área de trabalho. O git dele fica em `GaspLab/.privado.git` e o `.gitignore` do site ignora todos os caminhos privados. Os arquivos continuam nos lugares de sempre.

O que ele guarda:

| Caminho | Conteúdo |
|---|---|
| `clientes/` | Pesquisas e panoramas de clientes (CNA, Elgin, XData) |
| `knowledge/50-aquisicao/` | Playbook de prospecção |
| `knowledge/60-gasp-global/` | Pesquisa, design e loja Shopify da Main Thread (cerca de 1 GB de fotos e vídeos) |
| `knowledge/65-main-thread/` | Fonte de verdade da Main Thread: identidade, plano, kit de redes, brand book |
| `output/`, `outputs/Guia_Gabriel_Hub/` | Saídas: PDFs, vídeo da Zoom Lupas, guia do Gabriel |
| `outputs/prospeccao-sp/`, `outputs/teste-barbearia/` | Planilhas de leads |
| `.claude/agent-memory/` | Memória dos agentes do projeto |
| `_maquina/claude-memory/` | Cópia das memórias do Claude deste projeto (37 arquivos) |
| `_maquina/claude-skills/` | Skills pessoais do Claude (`compactar`, `content-principles` e as do Google) |

Comandos, sempre na raiz da `GaspLab/`:

```bash
powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 salvar "o que mudou"
```

```bash
powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 atualizar
```

```bash
powershell -ExecutionPolicy Bypass -File scripts\privado.ps1 status
```

`salvar` copia as memórias atuais do Claude para `_maquina/`, faz commit dos caminhos privados e envia. `atualizar` puxa o que veio de outra máquina. `restaurar` é o que o `montar-ambiente.ps1` usa na primeira vez.

Ao criar uma pasta privada nova, inclua o caminho em dois lugares: na lista `$Caminhos` de `scripts/privado.ps1` e no `.gitignore` do site.

**Skills pessoais:** para o Claude da máquina nova reconhecer `compactar` e `content-principles`, copie o conteúdo de `_maquina/claude-skills/` para `C:\Users\<usuário>\.claude\skills\`.

---

## 4. O que estava em andamento

Tudo o que estava sem commit foi salvo na própria branch, em commits marcados com `wip`, para ser retomado.

| Onde | Branch | Estado |
|---|---|---|
| `hub/` | `feat/conteudo-organico` | Quadro de foco do CRM, módulo Projetos, planos de clientes e navegação nova. Código em andamento, ainda sem revisão nem PR |
| `hub-gaspar/` | `feat/crm-raio-x` | Pendências e memória de agentes atualizadas |
| `hub-emergencia/` | `fix/abordagem-sem-google` | Script que registra no CRM o envio feito pelo WhatsApp |
| `previews/` | `wip/luma-tintas-v4` | Desenho da v4 da Luma Tintas e protótipo da lata. Ficou fora da `main` de propósito: push na `main` publica na Vercel |
| `projects/loja-geral/` | `docs/bootstrap` | Motor, coletor da Shopee, critérios e testes |
| `gasplab-hub` | `feat/clientes-planos`, `fix/vercelignore-raiz` | Branches que só existiam nesta máquina; agora estão no GitHub |

As pendências de cada frente estão em `knowledge/99-pendencias.md` (site) e nos `knowledge/99-pendencias.md` de cada pasta do hub.

---

## 5. O que não está no GitHub (recriar à mão)

| Item | Onde recriar | Como obter |
|---|---|---|
| `hub/.env.local` | `GaspLab/hub/` | `npx vercel@latest link` e `npx vercel@latest env pull .env.local`. Variáveis: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `OPERACAO_ADMIN_EMAILS`. As frentes `hub-*` leem este mesmo arquivo |
| `patrick-trading/.env` | `patrick-trading/` | Duas chaves: `ANTHROPIC_API_KEY` (console.anthropic.com) e `TELEGRAM_BOT_TOKEN` (BotFather). Copie da máquina original por um meio privado |
| `patrick-trading/data/` | idem | Histórico de mercado e diários (20 MB). Fica fora do git de propósito. Copie a pasta ou colete de novo pelo Profit |
| `patrick-trading/docs/briefing/originais/` | idem | Apostila com direitos reservados e conversa com dados pessoais. Fora do git de propósito |
| `burger-bulls/ACESSO.md` e `.env.local` | `burger-bulls/` | Senha do painel e token da Vercel. `vercel env pull` recria o `.env.local`; a senha do painel está com o Vinícius |
| `tonab-lounge/.env.production.local` | `tonab-lounge/` | `vercel env pull`. Modelo em `.env.example` |
| `mineiro-lanches` (Mercado Pago) | `mineiro-lanches/` | Modelo em `.env.mercadopago.example`. As chaves públicas do Supabase já estão versionadas |
| `projects/loja-geral/data/` | idem | Acervo bruto do buscador, com dados pessoais de negociação. Fora do git de propósito |
| `hub/.import/` | `GaspLab/hub/` | Bases de importação com telefones. Os dados já estão no Supabase |
| `node_modules/`, `.next/`, `.venv/` | cada projeto | `npm install` ou `pip install -r requirements.txt` |

---

## 6. Rodar cada projeto

| Projeto | Preparar | Rodar | Endereço |
|---|---|---|---|
| Site | `npm install` | `npm run dev` | http://localhost:3000 |
| Hub | `npm install` em `hub/` | `npm run dev` | http://localhost:3000/login |
| Prévias | nada | `node previews/serve.cjs` | http://localhost:4173/<slug>/ |
| Burger Bulls | `npm install` | `npm run dev` | http://localhost:4321 |
| Mineiro Lanche | `npm install` | `npm run dev` | porta do Vite |
| Sr. Parmê | `npm install` | `npm run dev` | http://localhost:4184 |
| Tô na B | `npm install` | `npm run dev` | http://127.0.0.1:3000 |
| Divino Capelli | `npm install` | `npm run dev` | http://127.0.0.1:3107 |
| Zoom Lupas (vídeo) | `npm install` | `npm run studio` ou `npm run render` | Remotion Studio |
| Agente do Patrick | `python -m venv .venv` e `pip install -r requirements.txt` | ver `patrick-trading/README.md` | Telegram |

Site e hub usam a porta 3000: um de cada vez. Encerre os servidores ao terminar. O `.claude/launch.json` do site já tem as configurações de prévia do Claude para hub, frentes do hub, Burger Bulls e Sr. Parmê; os caminhos absolutos apontam para `C:/Users/Léo R/projects/...` e precisam ser trocados se a pasta do usuário tiver outro nome.

---

## 7. Claude Code na máquina nova

1. Abra o Claude Code na pasta `GaspLab/`. O `CLAUDE.md`, os agentes (`.claude/agents/`), as regras, as skills, os squads e o AIOX vêm com o clone.
2. As memórias são restauradas pelo `montar-ambiente.ps1`. O Claude guarda memória por caminho de pasta; se a pasta do projeto mudar de lugar depois, copie `_maquina/claude-memory/` para `C:\Users\<usuário>\.claude\projects\<caminho-da-pasta-com-hífens>\memory\`.
3. Reconecte no app os conectores usados aqui: Shopify (loja da Main Thread), Supabase, Vercel, Claude in Chrome e, se for usar, Google Ads, Meta e Freepik. Conector é da conta e do app, não do repositório.
4. O Codex também está configurado (`AGENTS.md`, `.agents/`, `.codex/`).

---

## 8. Regras que valem em qualquer máquina

- **Publicação por conta.** O hub e as prévias publicam na Vercel pela conta `icecompany-19`. Commit de outro autor na `main` das prévias não publica.
- **Supabase gratuito pausa em 7 dias sem uso** (ZooVita e Tô na B). Banco pausado trava o deploy: reative no painel antes.
- **O Supabase do hub tem dados reais da operação.** Não crie nem apague dados de teste sem combinar com o Vinícius.
- **Commits por caminho explícito**, nunca `git add -A`, no site e no hub.
- **Separação de bases.** Nada da Decora entra aqui. A Ice Company aparece só como cliente da GaspLab; a IceCrew tem repositório próprio (`ice-crew-base`).
- **Dado que falta vira pendência** em `knowledge/99-pendencias.md`. Não inventar número, cliente nem resultado.

---

## 9. Conferência final

- [ ] `montar-ambiente.ps1` terminou sem lista de falhas
- [ ] `git status` limpo na raiz, sem `hub/`, `previews/` nem pastas privadas aparecendo
- [ ] `scripts\privado.ps1 status` não mostra mudanças
- [ ] `hub/.env.local` criado e o login do hub abre
- [ ] `patrick-trading/.env` criado e os testes passam (`python -m pytest`)
- [ ] O Claude aberto na `GaspLab/` lista os agentes e lembra dos clientes (memórias restauradas)
