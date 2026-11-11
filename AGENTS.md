# GaspLab — instruções do projeto

Este repositório é **exclusivamente da GaspLab** (site gasplab.site + operação comercial + novo produto Bio + Catálogo).

## Separação de bases (regra dura)
- **Nunca** usar, citar ou misturar dados da Ice Company, Decora, Sinolli, Cold Trek ou qualquer outro negócio do Felipe. Esses contextos vivem em outros projetos.
- **Exceção (decidida pelo Felipe em 14/10/2026):** a Ice Company pode ser citada **apenas como cliente da GaspLab** (nome em lista de clientes/cases). Nada de dados operacionais dela (loja, produtos, fotos, campanhas, Bling/Shopify/Yampi), que vivem em `Projetos\Teste Ice`.
- Fonte de conhecimento da GaspLab: `knowledge/` (negócio, produto, mercado, oferta, aquisição, scripts, técnico, métricas, riscos) e `docs/` (marca e site).
- Se faltar um dado, registre como pendência em `knowledge/99-pendencias.md` — nunca invente números, clientes, depoimentos ou resultados.

## Agentes
- Squads XSquads (13 squads, 178 personas) em `squads/`. Entrada: `squads/xquads/` (Xquads Chief) ou o chefe de cada squad em `.Codex/agents/*-chief.md`.
- Framework AIOX 5.4.1 em `.aiox-core/` (agentes `aiox-*`, comandos `/AIOX:agents:*`). Regras completas do AIOX: `.aiox-core/Codex-AIOX.md` (não carregadas automaticamente, para economizar contexto).
- Agentes do site: `copywriter`, `frontend`, `infra`, `brand-assets`, `fact-checker`, `qa-runner`.
- **Economia de modelos:** Opus só para arquitetura e síntese estratégica; Sonnet para produção e pesquisa; Haiku para checagens mecânicas; script antes de LLM sempre que o trabalho for mecânico.

## Site (Next.js)
- Contrato do site: `docs/CONTEXTO.md`. Pastas de agentes/conhecimento estão excluídas do build, do lint e do deploy (`tsconfig.json`, `eslint.config.mjs`, `.vercelignore`).
- Outra sessão pode estar editando esta pasta: commitar sempre por caminho explícito, nunca `git add -A`.
- Não deixar servidores locais rodando ao terminar.
