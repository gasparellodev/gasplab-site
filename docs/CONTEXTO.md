# CONTEXTO — leitura obrigatória de todo agente (curto de propósito)

Fatos detalhados: `docs/CONTEXT_VAULT.md`. Plano: `PLANO_GASPLAB.md`. **Não leia o handoff inteiro.**

## Marca
- Grafia: **GaspLab** (nunca Gaspi/Gaspy). Domínio de lançamento: **https://gasplab.site**.
- Categoria: empresa de **engenharia de software e inteligência artificial aplicada**.
- Mensagem-mãe: **"Engenharia para a IA funcionar no seu negócio."**
- Apoio: "A GaspLab entende sua operação, mapeia processos e desenha a arquitetura antes de integrar automação, software e inteligência artificial."
- Promessa emocional: evoluir com inteligência, mantendo clareza e controle.
- 4 argumentos: (1) Contexto antes da tecnologia · (2) Arquitetura antes da automação · (3) Software integrado à operação · (4) Adoção com evolução contínua.
- Método: **Entender → Mapear → Arquitetar → Integrar → Evoluir**.
- Oferta em escada: (1) Diagnóstico de prontidão para IA · (2) Sprint de Arquitetura de IA · (3) Implementação (automação, sistema ou experiência digital) · (4) Operação e evolução contínua. Sem preços.
- Sprint entrega: mapa do processo atual, inventário de dados e sistemas, casos de uso priorizados, arquitetura-alvo, recomendação build/buy/partner, riscos e governança, plano 30/60/90, hipótese mensurável de ROI (hipótese, nunca resultado).
- Fundador: **Vinícius Gasparello** — engenheiro de software e IA, 9 anos de trajetória (desde 2017).

## Tom e vocabulário
- Claro, técnico sem jargão, confiante sem hype. Português do Brasil.
- **Proibido:** "sem impacto" (usar "com mínima fricção", "com transição controlada", "sem ruptura desnecessária"); resultado garantido; "revolucionar"; qualquer número/percentual sem fonte no Vault (ex.: "40% menos tempo" está bloqueado); depoimentos; métricas inventadas; URLs, telas ou escopos inventados.
- Governança é argumento: human-in-the-loop, fallback, supervisão, dados sob controle.

## Marcas (decisão aprovada)
- **Clientes GaspLab:** Ice Company, Decora (citados pelo fundador; escopo/URL pendentes → sem case detalhado ainda).
- **Produtos/cases GaspLab:** GaspBio, Contaflow (sem métricas).
- **Trajetória do fundador** (NUNCA chamar de clientes da GaspLab): Core Educação, NextTrack, Folha de S.Paulo, Movida, GIS, digital.code, Genpro; projetos via digital.code: RAM, Fiat, Jeep.
- Marcas aparecem como texto/wordmark tipográfico, nunca logo oficial (sem arquivos/autorização).

## Visual — Blueprint Intelligence
- Cores **somente via tokens** de `app/globals.css` (classes `bg-background`, `bg-sunken`, `bg-card`, `bg-raised`, `bg-deep`, `text-foreground`, `text-soft`, `text-muted-foreground`, `text-subtle`, `text-primary`, `text-signal`, `bg-paper`, `text-paper-muted`, `text-paper-accent`, `text-danger`, bordas `border-primary/20` etc.). **Nunca hex em classe.**
- Botões: `.btn-primary` / `.btn-secondary`. Cards: `.panel`. Rótulos: `.eyebrow`. Títulos: `.display`, `.title`.
- Tipografia: Space Grotesk (texto) + IBM Plex Mono (rótulos técnicos).
- Motion só quando explica causa, relação, estado ou transformação. Respeitar `prefers-reduced-motion`. Sem partículas, WebGL, scroll sequestrado, glow em tudo, autoplay com áudio.

## Contato e dados
- WhatsApp: +55 11 96062-4399 (`whatsappUrl` em `lib/content.ts`). E-mail: vinicius@gasplab.com. São Paulo, Brasil.
- Instagram @gasplab, @vini_gasparello. LinkedIn do fundador: https://www.linkedin.com/in/vinicius-henrique-5b8a35173/
- Cal.com: via `NEXT_PUBLIC_CAL_URL` (ainda não existe → fallback WhatsApp).
- Dados do diagnóstico (nome, contato, gargalo) **nunca** vão para analytics.

## Stack
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + shadcn/Radix. Hospedagem **Vercel**. Banco: Postgres (Neon) via Drizzle, `DATABASE_URL`. Opções do formulário de diagnóstico: `lib/diagnostic.ts` (fonte única para formulário e API).

## Regras de trabalho
- Edite **somente** os arquivos do seu escopo. Precisa mexer fora dele? Pare e reporte.
- Não rode `git commit`, `git reset`, `git checkout` nem apague arquivos fora do escopo — o orquestrador integra.
- Ao terminar, responda em até 15 linhas: arquivos alterados, o que falta, dúvidas factuais.
