# GaspLab — handoff para continuidade (25/09/2026)

## Onde está
- **Projeto (fonte da verdade):** `C:\Users\Felipe Pessoa\Projetos\GaspLab` — repositório git, branch `main`, sem remote ainda.
- Backup antigo (versão Codex, não usar para editar): `C:\Users\Felipe Pessoa\Documents\Codex\2026-09-25\agora-a-gente-precisa-criar-um\gasplab-site`
- O staging antigo `gasplab.vhmavi.chatgpt.site` é a versão **verde** e está obsoleto. O site foi migrado do ChatGPT Sites para Vercel.

## Leia primeiro
1. `docs/CONTEXTO.md` — marca, tom, regras, tokens (curto).
2. `docs/CONTEXT_VAULT.md` — fatos verificáveis; nada público sem linha aqui.
3. `README.md` — stack, variáveis, checklist "Publicação — primeira vez".
4. `PLANO_GASPLAB.md` — plano por fases (F0–F7) e decisões.

## Estado
- F0–F6 concluídas e commitadas: tokens Blueprint (azul), copy central em `lib/content.ts`, migração Vinext/Cloudflare → Next.js 16 na Vercel + Postgres Neon (Drizzle), páginas/seções novas, menu mobile, analytics sem PII, Brand Book v2 e logos em `brand/`, QA (Lighthouse mobile 81–89, desktop 95, acessibilidade 100, SEO 100, CLS 0; revisão factual sem bloqueadores).
- **Falta publicar** (depende de login humano): GitHub da conta **vinygasparello** (o `gh` desta máquina está como `icecompany-19`), importar na Vercel, conectar Neon + `npm run db:migrate`, domínio **gasplab.site** com DNS na Hostinger. Passo a passo no README.
- `vercel deploy --temporary` não funciona neste Windows (symlink EPERM, sem WSL) — usar importação GitHub → Vercel.

## Decisões aprovadas (não reabrir)
- Grafia **GaspLab**; domínio de lançamento **gasplab.site**; hospedagem **Vercel**.
- Mensagem-mãe: "Engenharia para a IA funcionar no seu negócio." Método: Entender → Mapear → Arquitetar → Integrar → Evoluir. Oferta: Diagnóstico → Sprint de Arquitetura → Implementação → Evolução.
- Marcas separadas: **Clientes GaspLab** = Ice Company, Decora. **Trajetória do fundador** = Core Educação, NextTrack, Folha de S.Paulo, Movida, GIS, digital.code, Genpro (+ RAM, Fiat, Jeep via digital.code) — nunca como clientes.

## Regras de trabalho
- Cores só por tokens de `app/globals.css` (nunca hex em classe); botões `.btn-primary`/`.btn-secondary`.
- Copy só em `lib/content.ts`; opções do diagnóstico só em `lib/diagnostic.ts`.
- Não inventar clientes, métricas, URLs, depoimentos; "sem impacto" e "40%" proibidos.
- Outra sessão trabalha nesta pasta (`PLANO_AVATAR.md`, avatar do fundador): **commitar por caminho explícito**, nunca `git add -A`.
- Não deixar servidores locais rodando ao terminar.

## Pendências do fundador
Aprovar a frase do fundador (já no site) · URL do Cal.com (`NEXT_PUBLIC_CAL_URL`) · escopo/material de Ice Company e Decora para cases · logos oficiais + autorização · foto em alta · CNPJ/razão social (privacidade e termos) · confirmar e-mail `vinicius@gasplab.com` × domínio `gasplab.site`.

## Backlog técnico
- Desempenho mobile (81–89) → meta 90: reduzir JS de hidratação na home.
- Notificação de novos diagnósticos: configurar Resend (`RESEND_API_KEY`, `DIAGNOSTIC_NOTIFY_TO`, `DIAGNOSTIC_NOTIFY_FROM`).

## Comandos
```bash
npm install
npm run dev              # http://localhost:3000
npm run build && npm run start
npm run lint
npm run db:migrate       # com DATABASE_URL em .env.local
```
