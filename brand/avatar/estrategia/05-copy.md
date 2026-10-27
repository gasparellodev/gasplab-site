# Vini — copy (A5)

v1 · 06/10/2026 · A5 Copy · **Proposta para aprovação do Felipe.** Falta a checagem do A9 (fact-checker) e a conferência dos alts contra as imagens finais (E4). Nada aqui foi publicado nem gerado em imagem.
Fontes: `docs/CONTEXTO.md`, `02-marca.md`, `04-historia.md`, `PLANO_AVATAR.md` §2–3 e o padrão de `lib/content.ts`. Frases sobre o processo da prévia vêm de `knowledge/60-scripts/scripts-abordagem.md` (§3.1) e as regras do WhatsApp, de `knowledge/40-riscos/compliance-riscos.md` (§4).
Contagens entre parênteses e na última coluna conferidas por script (palavras; `[nome]` e `[Restaurante]` contam como 1; a assinatura entra na conta).

## 0. Regras que valem para todo o texto

- **Figurinhas e cards não dizem "sou o Vini".** Legenda neutra; quem assina é quem manda a mensagem. A 1ª pessoa verbal ("te mando", "me avisa") é do Gabriel, não do personagem.
- **Nenhuma mídia na 1ª mensagem fria.** Figurinha só depois de o lead responder, no máximo uma por mensagem, nunca no lugar do texto. Não há card de 1ª mensagem neste arquivo.
- **Sem número, prazo, percentual, promessa de resultado, depoimento ou cliente.** Sem emoji em texto institucional; nas mensagens de WhatsApp abaixo não há emoji (se o Gabriel quiser, um só, e nunca em F05, F07 ou F10).
- **No site, o Vini fala em 1ª pessoa só no balão** (apoio do hero e 404). Card, método e estados do formulário são impessoais ou institucionais, para não atribuir ao personagem ações que são da equipe (ele é guia, não "resolve": `02-marca.md` §1).
- `[nome]` e `[Restaurante]` são preenchidos à mão, com ao menos uma frase personalizada por conversa. As redações são base, não texto para colar em escala (risco R01 do compliance).

## 1. Figurinhas F01–F12

| # | Pose | Quando entra | Legenda (palavras) | Mensagem que acompanha | Assina "Gabriel, GaspLab" | Palavras |
|---|---|---|---|---|---|---|
| F01 | S02 greet | Lead respondeu com aceite ("pode mandar", "sim") | Oi, da GaspLab (3) | Obrigado por responder, [nome]. Vou te mandar a prévia por aqui. | Sim | 13 |
| F02 | S11 listen | Lead mostrou interesse ou fez pergunta aberta | Pode contar (2) | Pode contar: como os pedidos chegam para vocês hoje? Quero entender antes de sugerir qualquer coisa. | Não | 16 |
| F03 | S07 success | Envio da prévia, só depois do "sim" | Prévia pronta (2) | Segue a prévia do [Restaurante], com o que é público de vocês. Não é o site publicado. | Não | 17 |
| F04 | S03 point | Logo depois do link, para dirigir o olhar | Abre o link (3) | É só tocar no link acima e abrir no celular. Se algo não aparecer, me avisa. | Não | 16 |
| F05 | S09 concern | Lead diz que o link não abriu | Algo não abriu? (3) | Se não abriu, me diz o que apareceu na tela. Eu confiro por aqui. | Não | 14 |
| F06 | S04 explain | Lead pergunta "como funciona?" | Como funciona (2) | Em resumo: uso o que é público de vocês, monto uma prévia, você vê e diz o que ajustar. | Não | 19 |
| F07 | S05 think | Pergunta específica que exige conferir | Conferindo aqui (2) | Boa pergunta. Preciso conferir antes de responder com segurança. Volto aqui assim que tiver a resposta. | Não | 16 |
| F08 | S08 review | Lead quer ajustar a prévia ou pergunta quem aprova | Revisar antes de seguir (4) | Você revisa a prévia, me diz o que mudar e seguimos só quando estiver de acordo. | Não | 16 |
| F09 | S01 idle | Lead demorou; só na trilha com permissão | Sem pressa (2) | [nome], sem pressa. Se ainda fizer sentido, é só me chamar por aqui. Se não, tudo bem também. | Não | 18 |
| F10 | S02 greet | Lead disse "não" ou "agora não" | Obrigado pelo tempo (3) | Entendido, [nome]. Não escrevo mais. Obrigado pelo tempo, e desejo o melhor ao [Restaurante]. | Sim | 16 |
| F11 | S07 success, sem moldura | Aceite explícito do lead por texto | Combinado (1) | Perfeito, [nome]. Seguimos como ficou escrito aqui na conversa. Qualquer dúvida, me chama. | Não | 13 |
| F12 | S12 celebrate | Entrega concluída e confirmada | Entregue (1) | Entrega concluída, [nome]. Se precisar de algo, é só chamar por aqui. Obrigado pela confiança. | Sim | 17 |

**O que mudou em relação ao roteiro de `04-historia.md`**
- **F01** "Oi, sou o Vini" virou "Oi, da GaspLab" (regra de neutralidade). Variante só quando o próprio Vinícius envia: legenda "Oi, sou o Vini" e assinatura "Vinícius, GaspLab".
- **F02, F06, F07, F09** saíram da 1ª pessoa do personagem ("Me conta mais", "Deixa eu explicar", "Vou verificar aqui", "Sigo por aqui") para imperativo, pergunta ou substantivo.
- **F11** "Fechado" virou "Combinado": para o público atual (restaurantes), "Fechado" lê-se "estamos fechados".
- **Mantidas:** F03, F04, F05, F08, F10, F12.

**Condições de uso**
- **F01** só se o lead aceitou receber a prévia. Se ele respondeu com pergunta, use F02, F06 ou F07.
- **F07** não serve para adiar pergunta de preço.
- **F09** só na trilha com permissão (cadência de `scripts-abordagem.md`). Na trilha sem permissão, sem figurinha de follow-up.
- **F10** só se o lead foi cordial. Se estiver irritado ou pedir para parar de forma seca, mande só o texto, sem figurinha, e registre `do_not_contact` na hora.
- **F03** é a versão leve (figurinha com moldura). Se for enviar o card com o print do site, use o texto da seção 2 e **não** a F03: um ou outro, nunca os dois.
- **F11** só depois de aceite explícito por escrito.

## 2. Mensagem de prévia pronta (depois de o lead responder)

| Versão | Mensagem que acompanha o card com o print | Assina "Gabriel, GaspLab" | Palavras |
|---|---|---|---|
| Principal | Segue a prévia do [Restaurante], feita só com o que é público de vocês. Preços e pratos são exemplos, e ela não é o site publicado. O que você ajustaria? | Sim | 32 |
| Variação | [nome], aqui está a prévia do [Restaurante]. Usei apenas informações públicas e deixei preços e pratos como exemplo. Ainda não é o site no ar. Me diz o que mudaria. | Sim | 32 |

- O link da prévia vai no corpo da mesma mensagem, logo abaixo do texto, e só depois do "sim" do lead. Alternar as duas versões ajuda a não repetir texto (R01).
- "Preços e pratos são exemplos" só se a prévia realmente usar dados de exemplo; se usa o cardápio público real, troque por "feita só com o que é público de vocês".
- "O que você ajustaria?" vem do `scripts-abordagem.md` §3.1 (pergunta que põe o dono como dono da página).
- O prazo de validade do link, que o script cita, ficou de fora por regra (nenhum número). Se for útil, vai em mensagem de texto separada.

## 3. Site — microcopy por estado do mascote

### 3.1 Hero (estado `idle`; balão do Vini junto ao CTA "Começar diagnóstico")

| Chave sugerida | Texto | Palavras |
|---|---|---|
| `hero.viniSupport` | Conte seu cenário. Eu ouço primeiro. | 6 |
| `hero.viniSupportNeutral` (alternativa sem 1ª pessoa) | Comece contando o seu cenário. | 5 |

A frase-mãe e o apoio do hero continuam sendo os de `lib/content.ts`; esta linha só acompanha o Vini.

### 3.2 CTA flutuante "Falar com o Vini" (estado `idle`; abre card, não é chatbot)

| Chave sugerida | Texto | Palavras |
|---|---|---|
| `viniFloat.button` (rótulo visível e `aria-label`) | Falar com o Vini | 4 |
| `viniFloat.title` | Como prefere começar? | 3 |
| `viniFloat.text` | No WhatsApp a conversa é direta; no diagnóstico você descreve o cenário com calma. Quem responde é uma pessoa. | 19 |
| `viniFloat.whatsappLabel` (link para `whatsappUrl`) | Falar no WhatsApp | 3 |
| `viniFloat.diagnosticLabel` (link para `/diagnostico`) | Começar diagnóstico | 2 |

Texto do card mais os dois rótulos de link somam 24 palavras (limite 25). Os rótulos reaproveitam os que já existem no site ("Falar no WhatsApp" do erro do formulário e "Começar diagnóstico" do hero).

### 3.3 Método (uma legenda por etapa; impessoais, a pose de cada etapa fica com o A6)

| Chave sugerida | Etapa | Legenda | Palavras |
|---|---|---|---|
| `method.steps[Entender].viniCaption` | Entender | Você conta o cenário. Nós escutamos antes de propor. | 9 |
| `method.steps[Mapear].viniCaption` | Mapear | O que existe hoje vira um mapa: processos, dados e sistemas. | 11 |
| `method.steps[Arquitetar].viniCaption` | Arquitetar | O desenho vem antes da construção: cada peça no seu lugar. | 11 |
| `method.steps[Integrar].viniCaption` | Integrar | A solução entra na rotina com testes e supervisão humana. | 10 |
| `method.steps[Evoluir].viniCaption` | Evoluir | Depois de no ar, o uso real orienta cada ajuste. | 10 |

### 3.4 Diagnóstico (estados do mascote; texto impessoal)

| Chave sugerida | Estado | Texto | Palavras |
|---|---|---|---|
| `diagnosticPage.vini.listen` | Antes de preencher | Conte onde a operação trava. Pode escrever do seu jeito, sem termos técnicos. | 13 |
| `diagnosticPage.vini.think` | Enviando | Enviando o seu cenário. Mantenha esta página aberta. | 8 |
| `diagnosticPage.vini.success` | Enviado | Contexto recebido. A GaspLab vai ler o que você enviou e retornar pelo contato informado. | 15 |
| `diagnosticPage.vini.concern.validation` | Erro de validação | Falta algo no formulário. Confira os campos obrigatórios e envie de novo. | 12 |
| `diagnosticPage.vini.concern.network` | Erro de rede | Não foi possível enviar agora. Confira a conexão e tente de novo, ou fale pelo WhatsApp. | 16 |

`think` dura só enquanto a requisição está em andamento. Em `concern` de rede, as mensagens de limite de tentativas e de indisponibilidade que já existem em `components/diagnostic-form.tsx` continuam como estão.

### 3.5 404 (estado `lost`; balão do Vini na 1ª pessoa)

| Chave sugerida | Texto | Palavras |
|---|---|---|
| `notFound.title` | Página não encontrada. | 3 |
| `notFound.line` | Não achei esse endereço no mapa. Ele pode ter mudado de lugar. | 12 |
| `notFound.backLabel` (link para `/`) | Voltar ao início | 3 |

## 4. Aviso de transparência sobre IA

| Versão | Texto | Palavras | Onde |
|---|---|---|---|
| Curta | Vini é uma ilustração criada com IA, a partir de fotos reais do fundador. | 14 | legenda de imagem; descrição do perfil comercial do WhatsApp |
| Completa | Vini é a versão ilustrada de Vinícius Gasparello, fundador da GaspLab, criada com IA a partir de fotos reais. Ele guia o site e as conversas; quem responde é uma pessoa da GaspLab. | 33 | `/sobre` (ao lado da foto) e Brand Book |

A 1ª frase da versão completa reproduz a D-A7 do plano. A segunda vale enquanto a resposta comercial for de uma pessoa; quando existir um "Vini assistente", o texto muda (`02-marca.md` §1).

## 5. Alt text das poses

| ID | Estado | Alt | Palavras |
|---|---|---|---|
| S01 | idle | Vini, mascote ilustrado da GaspLab, em pé, mão no bolso, meio-sorriso. | 11 |
| S02 | greet | Vini, em pé, acenando com a mão aberta e sorrindo. | 10 |
| S03a | point (direita) | Vini, em pé, indicando com a palma aberta algo à direita. | 11 |
| S03b | point (esquerda) | Vini, em pé, indicando com a palma aberta algo à esquerda. | 11 |
| S04 | explain | Vini, explicando com a mão aberta um diagrama de três nós. | 11 |
| S05 | think | Vini, em pé, com a mão no queixo, olhando para cima, pensativo. | 12 |
| S06 | work | Vini, sentado diante de um notebook aberto, concentrado. | 8 |
| S07 | success | Vini, sorrindo e assentindo, com um nó de check ao lado. | 11 |
| S08 | review | Vini, mão erguida, ao lado de um fluxo com ponto de checagem. | 12 |
| S09 | concern | Vini, com leve expressão de preocupação e a palma da mão aberta. | 12 |
| S10 | lost | Vini, segurando um mapa desdobrado, com uma sobrancelha erguida. | 9 |
| S11 | listen | Vini, sentado e inclinado à frente, ouvindo, com um caderno no joelho. | 12 |
| S12 | celebrate | Vini, em pé, com o punho fechado à altura do peito, satisfeito. | 12 |

- S01 já segue o padrão do Brand Book ("Vini, mascote ilustrado da GaspLab, [estado]"); nas demais, o prefixo foi encurtado para "Vini, " para não cansar o leitor de tela quando há várias poses na página.
- Se o texto ao lado já diz o que o estado mostra, a imagem pode ir com `alt=""` (decorativa). S01 no hero e no CTA flutuante mantêm o alt.
- Escritos a partir das descrições de pose do plano (as imagens ainda não existem): conferir contra o arquivo final de cada pose.

## 6. Assinatura de e-mail (2 linhas ao lado do avatar S01, 48 px)

| Linha | Texto |
|---|---|
| 1 | Vinícius Gasparello · Fundador, GaspLab |
| 2 | Engenharia para a IA funcionar no seu negócio · gasplab.site |

Alt do avatar na assinatura: o de S01. Para outra pessoa do time, a linha 2 é a mesma, a linha 1 vira "{Nome} · {Cargo}, GaspLab" (cargo pendente) e o Vini não vai ao lado, para não sugerir que a pessoa é o Vini (`02-marca.md` §1).

## 7. Checagem

- **Tier 0:** lead que respondeu a uma abordagem fria está, no máximo, consciente do problema e ainda não do produto. Por isso as mensagens são curtas, mostram o objeto (a prévia), pedem permissão ou fazem uma pergunta, e não argumentam.
- **Mecânica (script):** todos os limites de palavras, "começa com 'Vini, '" nos alts, ausência de dígitos, percentuais, emoji e dos termos vetados ("sem impacto", "revolucionar", "garantido", "grátis", "sou o Vini" fora da variante documentada).
- **Hopkins, autoavaliação (estimativa, não é medição):** 86/100 antes da checagem do A9. Descontos: −6 sem prova social (proibida), −4 sem dado de resposta real do WhatsApp, −4 poses e imagens ainda não geradas. O portão formal de 85 e a checagem Sugarman ficam com o Opus e o A9 (o kit é microcopy; os 30 gatilhos não se aplicam).

## 8. Pendências e dúvidas

1. **"Quem responde é uma pessoa"** (card do CTA e aviso completo): confirmar que nenhuma resposta comercial é automática. O compliance (G2) prevê confirmação automática de opt-out, que seria a única exceção.
2. **F06 e F08** dizem que o cliente revisa e que se segue "só quando estiver de acordo". Confirmar que nada vai ao ar sem o OK do cliente (o Vault não registra essa regra).
3. **Cargo do Gabriel** para a assinatura de e-mail: pendente (não inventado).
4. **Prévia com dados de exemplo:** definir se preços e pratos de exemplo são regra ou exceção (muda a 2ª frase do card).
