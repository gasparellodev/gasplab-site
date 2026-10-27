# Vini: checagem de fatos (A9)

v1 · 06/10/2026 · Agente `fact-checker` (Opus, somente leitura; arquivo gravado pelo orquestrador). Fontes: `docs/CONTEXT_VAULT.md` (v2), `docs/CONTEXTO.md`, `CLAUDE.md`, `knowledge/40-riscos/compliance-riscos.md` §4–5, `knowledge/60-scripts/scripts-abordagem.md`, `PLANO_AVATAR.md` (D-A7). Nenhum arquivo verificado foi corrigido.

**Resultado: 21 confirmadas · 8 não constam · 6 contradizem · 5 bloqueadores.**

## Tabela

| # | Arquivo:linha | Trecho | Classificação | Fonte ou regra | Ação recomendada |
|---|---|---|---|---|---|
| C1 | 04:12 | Vini = Vinícius ilustrado, criado com IA a partir de fotos reais | CONFIRMADA | PLANO D-A7; Vault 43 (foto) | Manter. D-A7 aguarda aprovação |
| C2 | 04:15 | Folha, Movida, Fiat nunca como clientes GaspLab | CONFIRMADA | Vault 53-56; CONTEXTO 25 | Manter |
| C3 | 04:31-32 | Genpro, Analista de Sistemas, abr/2017–abr/2021; nove anos | CONFIRMADA | Vault 35, 42; CONTEXTO 15 | Manter |
| C4 | 04:37-38 | digital.code, Full Stack, ago/2021–ago/2022; RAM, Fiat, Jeep via digital.code | CONFIRMADA | Vault 41, 54 | Manter o "via digital.code" |
| C5 | 04:43-44 | GIS Tech Lead fev/2022–mai/2023; Movida set/2022–out/2023; primeira vez "Tech Lead" | CONFIRMADA | Vault 39-40 | Manter. Sobreposição com digital.code até ago/2022 segue aberta |
| C6 | 04:49-50 | Folha, liderança técnica, fev/2024–fev/2025; NextTrack Tech Lead desde jan/2025 | CONFIRMADA | Vault 37-38 | Manter (ver N8) |
| C7 | 04:55-56 | Core Educação AI Software Engineer desde ago/2025; fundador; categoria; "primeiro princípio: contexto antes da tecnologia" | CONFIRMADA | Vault 14, 34, 36; CONTEXTO 7, 11 | Ajuste: o CONTEXTO chama de "argumento", não "princípio" |
| C8 | 04:68, 04:108 | Figurinha e vídeo nunca na 1ª mensagem fria | CONFIRMADA | compliance 65, 82 | Manter |
| C9 | 04:100, 04:106 | "começa entendendo a sua operação, antes de escolher qualquer ferramenta"; "Comece pelo diagnóstico" | CONFIRMADA | CONTEXTO 9, 11-13 | Manter |
| C10 | 04:130 | Modelo de 1º contato "Aqui é o Gabriel, da GaspLab" | CONFIRMADA | compliance 64 | Manter |
| C11 | 05:21, 05:50-51 | Prévia com o que é público; preços e pratos de exemplo; não é o site publicado | CONFIRMADA | scripts 254; compliance 54, 86 | Manter |
| C12 | 05:24 | Processo: material público → prévia → cliente diz o que ajustar | CONFIRMADA | scripts 254, 258 | Manter o conteúdo (sujeito em X6) |
| C13 | 05:28 | F10 "Não escrevo mais." | CONFIRMADA | compliance 64, 76 | Registrar `do_not_contact` sempre |
| C14 | 05:29 | F11 "Seguimos como ficou escrito aqui na conversa" | CONFIRMADA | compliance 53 (R13), 125 | Manter |
| C15 | 05:85-87, 05:89 | Legendas de Entender, Mapear, Arquitetar, Evoluir | CONFIRMADA | CONTEXTO 9, 11-14 | Manter (Integrar: ver N5) |
| C16 | 05:99 | Erro de rede → "fale pelo WhatsApp" | CONFIRMADA | CONTEXTO 37 | Manter |
| C17 | 05:115 | Aviso curto: ilustração criada com IA a partir de fotos reais do fundador | CONFIRMADA | PLANO D-A7 | Manter, pendente de aprovação |
| C18 | 05:146-147 | "Vinícius Gasparello · Fundador, GaspLab"; mensagem-mãe; gasplab.site | CONFIRMADA | Vault 12, 14, 24 | Ajuste: domínio do e-mail (gasplab.com) difere do site, a confirmar (Vault 16) |
| C19 | 02:22 | "Vini" é o apelido real | CONFIRMADA (indício) | Vault 15 (@vini_gasparello) | Manter |
| C20 | 02:42, 02:47 | Vini nunca ao lado de marcas sugerindo aval | CONFIRMADA | Vault 56 | Manter |
| C21 | 02:66 | Foto HD já existe | CONFIRMADA | Vault 43 | Manter |
| N1 | 05:75 | "Quem responde é uma pessoa." | NÃO CONSTA | Vault 3 (afirmação pública exige linha); compliance 163 (resposta automática de opt-out) | **Bloqueador.** Fundador confirma e cria linha no Vault, ou cortar |
| N2 | 05:116 | "Ele guia o site e as conversas; quem responde é uma pessoa da GaspLab." | NÃO CONSTA | Vault 3 | **Bloqueador.** Publicar só a 1ª frase até haver linha no Vault |
| N3 | 05:73; 02:17; 02:23 | "Falar com o Vini"; "frase verdadeira hoje"; "primeira resposta comercial do Vinícius" | NÃO CONSTA (tensão com compliance 37/59: Gabriel prospecta) | Vault sem linha sobre quem atende o WhatsApp do site | **Bloqueador.** Confirmar quem atende +55 11 96062-4399; se não for o Vinícius, aplicar "Falar com a GaspLab" |
| N4 | 05:26; 04:82 | F08 "seguimos só quando estiver de acordo" / "Revisar antes de seguir" | NÃO CONSTA no Vault | base parcial: compliance 125 | Ajuste. Fundador confirma a regra de publicação e registra no Vault |
| N5 | 05:88 | Integrar: "com testes e supervisão humana" | NÃO CONSTA ("testes") | CONTEXTO 20 cobre só supervisão | Ajuste. "com supervisão humana e fallback", ou registrar o processo de testes |
| N6 | 05:97 | "A GaspLab vai ler o que você enviou e retornar pelo contato informado." | NÃO CONSTA (promessa nova) | site atual diz só "entrou na fila inicial" (`components/diagnostic-form.tsx:80`) | Ajuste. Manter "fila inicial" ou confirmar o compromisso de retorno |
| N7 | 05:64 | Balão do Vini: "Eu ouço primeiro." | NÃO CONSTA (personagem promete ação humana) | 02:9 (guia, não age); D-A7 | Ajuste. Preferir `hero.viniSupportNeutral` |
| N8 | 04:50 | "liderar tecnicamente é o centro do trabalho" | NÃO CONSTA (interpretação) | Vault 37-38 só traz cargo e período | Ajuste leve. Cortar ou ficar no cargo |
| X1 | 02:14 | Vini lidera "WhatsApp (1ª mensagem, figurinhas, card de prévia)" | CONTRADIZ | compliance 82 (sem mídia na 1ª mensagem); 05:10 | **Bloqueador.** Tirar "1ª mensagem" (já corrigido no plano §3 em 06/10) |
| X2 | 02:25 | "Primeiro contato: 'Vini, da GaspLab'" | CONTRADIZ | compliance 63-64 (identificação real de quem escreve) | **Bloqueador.** Trocar por "[nome de quem envia], da GaspLab" |
| X3 | 04:75 | F01 legenda "Oi, sou o Vini" | CONTRADIZ (quando o Gabriel envia) | compliance 64; 05:9 e 05:33 | Ajuste. Substituída por "Oi, da GaspLab" (05:33) |
| X4 | 04:94, 04:98 | Selo do vídeo sem citar IA, com boca animada opcional | CONTRADIZ | 02:48 ("Ilustração criada com IA" obrigatória em vídeo com boca animada) | Ajuste; bloqueador se a boca for animada |
| X5 | 04:132 | Cita Ice Company e Decora pelo nome | CONTRADIZ | `CLAUDE.md` ("nunca citar") × Vault 49-50 (clientes) | Ajuste. Remover os nomes e escalar o conflito de regras ao fundador |
| X6 | 05:24; 05:51 | Gabriel em 1ª pessoa: "monto uma prévia" / "Usei apenas informações públicas" | CONTRADIZ | compliance 37 (Felipe produz as prévias) | Ajuste. "montamos" / "Usamos" |

## Varreduras

- Vocabulário proibido ("sem impacto", "revolucionar", garantia, depoimento): nada encontrado (em 02:33 aparecem só como exemplo do que é proibido).
- Números: só "nove anos" (Vault 35) e "quatro anos" (derivado). Px, notas Hopkins e contagens são internos e rotulados.
- Marcas da trajetória como clientes: nenhuma ocorrência.
- Emoji em texto institucional: nenhum. 05:11 permite um no WhatsApp, coerente com 02:66.

## Resumo de bloqueadores

X1 e X2 (`02-marca.md`: mídia e persona no primeiro contato frio); N1, N2 e N3 (quem responde e "Falar com o Vini" sem linha no Vault). Nada desse texto vai ao site nem ao kit de WhatsApp antes da resolução.

Fora do escopo, mas registrado: `lib/content.ts:410` ("Criou a GaspLab para...") não tem linha no Vault; `CLAUDE.md` proíbe citar Ice Company e Decora enquanto o Vault (49-50) as classifica como clientes.
