# GaspLab — site

Site institucional da GaspLab (https://gasplab.site). Next.js 16 (App Router) + React 19 +
TypeScript + Tailwind 4, com formulário de diagnóstico gravando em Postgres (Neon) via Drizzle.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** Tailwind CSS 4, componentes shadcn/Radix
- **Banco:** Postgres (Neon), acesso via Drizzle ORM (`drizzle-orm/neon-http`)
- **Hospedagem:** Vercel

## Scripts

```bash
npm run dev          # ambiente de desenvolvimento (next dev)
npm run build         # build de produção (next build)
npm run start          # serve o build de produção (next start)
npm run lint            # eslint .
npm run db:generate # gera SQL de migração a partir de db/schema.ts
npm run db:migrate  # aplica as migrações pendentes em DATABASE_URL
```

## Variáveis de ambiente

Veja `.env.example`. Nenhuma delas tem valor real commitado.

| Variável                | Obrigatória | Descrição                                                              |
| ------------------------ | ----------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`           | Sim*        | String de conexão do Postgres (Neon). Sem ela, a API de diagnóstico responde `503`. |
| `NEXT_PUBLIC_CAL_URL`    | Não         | Link do Cal.com exibido após o envio do diagnóstico. Sem ela, o CTA cai para o WhatsApp. |
| `RESEND_API_KEY`         | Não         | Habilita notificação por e-mail (via API REST do Resend) a cada novo diagnóstico. |
| `DIAGNOSTIC_NOTIFY_TO`   | Não         | Destinatário da notificação. Exigida junto com `RESEND_API_KEY`.       |
| `DIAGNOSTIC_NOTIFY_FROM` | Não         | Remetente verificado no Resend. Exigida junto com `RESEND_API_KEY`.     |

\* O site funciona sem banco (todas as páginas são estáticas); só o endpoint de diagnóstico
depende de `DATABASE_URL`.

## Banco de dados (Neon)

1. Crie o banco Postgres pela **Vercel Marketplace** (aba *Storage* → *Neon*) e conecte ao
   projeto — isso já injeta `DATABASE_URL` nas envs da Vercel.
2. Copie o mesmo valor para `.env.local` em desenvolvimento (não versionado).
3. Gere e aplique as migrações:

   ```bash
   npm run db:generate   # opcional: só quando o schema (db/schema.ts) mudar
   npm run db:migrate
   ```

O schema fica em `db/schema.ts` (tabela `diagnostics`) e as migrações versionadas em `drizzle/`.

## Deploy (Vercel)

1. Importe o repositório na Vercel.
2. Conecte o banco Neon pela Marketplace (ver acima) ou configure `DATABASE_URL` manualmente em
   *Settings → Environment Variables*.
3. Opcional: configure `NEXT_PUBLIC_CAL_URL`, `RESEND_API_KEY`, `DIAGNOSTIC_NOTIFY_TO` e
   `DIAGNOSTIC_NOTIFY_FROM`.
4. Rode `npm run db:migrate` (localmente, apontando para o `DATABASE_URL` de produção, ou via um
   passo de deploy) antes do primeiro acesso ao formulário de diagnóstico.
5. Domínio de produção: **gasplab.site**.

## Publicação — primeira vez (checklist)

Precisa de login humano nas contas da GaspLab. Nenhuma credencial fica no repositório.

1. **GitHub (conta vinygasparello)**
   ```bash
   gh auth login --hostname github.com --git-protocol https --web
   gh repo create gasplab-site --private --source . --remote origin
   gh auth setup-git
   git push -u origin main
   ```
   Se esta máquina também usa outra conta do GitHub, volte para ela depois com `gh auth switch`.
2. **Vercel:** *Add New → Project → Import* `gasplab-site` (preset Next.js detectado automaticamente).
   Cada push na `main` passa a publicar sozinho.
3. **Banco:** *Storage → Neon → Connect* ao projeto. Depois, localmente com o `DATABASE_URL` de
   produção em `.env.local`: `npm run db:migrate`. Até isso acontecer, o formulário mostra o
   fallback para WhatsApp.
4. **Domínio:** em *Settings → Domains*, adicione `gasplab.site` e `www.gasplab.site`. Na Hostinger
   (*Domínios → gasplab.site → DNS*), crie exatamente os registros que a Vercel mostrar —
   normalmente `A @ 76.76.21.21` e `CNAME www cname.vercel-dns.com` — e remova registros `A`/`CNAME`
   antigos de `@` e `www`. O SSL é emitido pela Vercel após a propagação.
5. **Opcional:** `NEXT_PUBLIC_CAL_URL` (quando houver Cal.com) e as variáveis do Resend para
   receber e-mail a cada diagnóstico.
6. **Conferir:** abrir https://gasplab.site, enviar um diagnóstico de teste e verificar a linha na
   tabela `diagnostics` do Neon.
