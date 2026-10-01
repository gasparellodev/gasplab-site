# Scripts de abordagem — GaspLab (restaurantes: Bio + Catálogo · negócios locais: site)

> Versão 1.0 · 01/10/2026 · Autor: Copy Squad (Copy Master Chief orquestra; redação: Voss, Kennedy, Collier, Wiebe, Kern; revisão de psicologia: Cialdini + Warren; auditoria: Hopkins) · Escopo: somente GaspLab.
> Convenções da base: **estimativa** = inferência sem fonte oficial; **a confirmar** = dado interno ou externo não verificado. Preços em definição pelo Hormozi Squad: use `[PREÇO_BIO]`, `[PREÇO_SITE]`, `[PREÇO_COMBO]`.
> Nenhum número, depoimento ou resultado foi inventado. Os únicos números de mercado usados nos textos são os do iFood (12% a 23% de comissão conforme o plano, 3,2% de pagamento online, mensalidade), de fonte oficial: https://blog-parceiros.ifood.com.br/planos-ifood/ (acesso 01/10/2026, registrado em `20-mercado/concorrentes-precos.md`).

---

## 0. Antes de usar (leia uma vez)

### 0.1 Diagnóstico (Tier 0 — Schwartz)

| | Restaurante pequeno/médio | Negócio local (site) |
|---|---|---|
| Consciência | Já sente o problema (taxa do app, pedido embolado no WhatsApp) e conhece soluções (catálogo do WhatsApp, planos de cardápio digital). Não conhece a GaspLab. | Baixa: muita gente não sente falta de site até ver um pronto com o nome dela. |
| Sofisticação do mercado (**estimativa**) | Alta (estágio 3–4): há opções grátis e planos a partir de ~R$ 100/mês; "cardápio digital" já é promessa gasta. | Baixa a média: concorrente é o "sobrinho" e o freelancer. |
| O que isso muda no texto | Não vender "cardápio digital". Vender o mecanismo: **pronto, com a cara do restaurante, você vê antes de pagar, o pedido chega organizado**. Abrir pela dor que o dono já sente. | Mostrar em vez de explicar: a prévia é o argumento. Abrir por um fato verificável sobre o negócio. |
| Tamanho | Mensagem curta (5 linhas). Quanto mais o dono já conhece o problema, mais curto. | Idem. |

### 0.2 Quem escreveu o quê

| Especialista | Papel neste arquivo |
|---|---|
| Eugene Schwartz | Diagnóstico de consciência e sofisticação (acima) |
| Chris Voss | Rótulos ("parece que…"), perguntas calibradas, pré-resposta a objeções, ligação e objeções |
| Dan Kennedy | Oferta clara, instrução de resposta em uma ação, cadência de follow-up, tabela de testes (rastrear tudo) |
| Robert Collier | Entrar na conversa que já está na cabeça do dono; cena concreta (o cliente com vontade, sem onde clicar) |
| Joanna Wiebe | Palavras do próprio dono (registrar as literais) e testes por hipótese |
| Frank Kern | Resultado antes do pagamento: a prévia é entregue antes de qualquer pedido |
| Cialdini + Warren | Revisão de psicologia (seção 9.1) |
| Claude Hopkins | Auditoria final (seção 9.2). Sugarman entra só como ferramenta de checagem (9.3), nunca como redator |

### 0.3 Campos

| Campo | O que colocar |
|---|---|
| `[NOME]` | Nome de quem atende/dono. Se não souber, use a variante sem nome (2.4). |
| `[RESTAURANTE]` / `[NEGÓCIO]` | Nome como aparece no Google Maps. `[NEGÓCIO]` é o nome do negócio local (campo novo). |
| `[BAIRRO]` | Bairro do Maps. |
| `[PRATO_DESTAQUE]` | Prato que você **viu de verdade** no Instagram/Maps. Se não viu, apague a frase. |
| `[LINK_PREVIA]` / `[LINK_FINAL]` | Links da prévia e da página no ar. Só enviar depois do "sim". |
| `[DATA_EXPIRAÇÃO]` | Dia do envio da prévia + 14 dias (prazo real; ver 0.5). |
| `[PREÇO_BIO]` `[PREÇO_SITE]` `[PREÇO_COMBO]` | Em definição (Hormozi Squad). |
| `[CHAVE_PIX]` `[FAVORECIDO]` | Dados do Pix de **fechamento** (nunca o número de prospecção). |
| `[PRAZO_ENTREGA]` | Prazo da versão final: Felipe define. |
| `[TERMO]` | Termo curto em linguagem simples (rascunho em `40-riscos/compliance-riscos.md`, seção 5.4; revisão de advogado pendente). |
| `[DIA]` | Dia combinado para falar de novo (só se o lead aceitou). |

### 0.4 Regras de compliance que valem para todo texto (resumo de `40-riscos/compliance-riscos.md`, seção 4)

1. Primeiro contato: **ligação** pedindo permissão (preferido) ou **mensagem 1:1 escrita à mão, sem link, foto, PDF ou áudio**, com 4 itens: quem sou, de onde achei, pergunta de permissão, como sair.
2. Link da prévia só depois do "sim". Nada de disparo, lista de transmissão, extensão ou bot.
3. Número de prospecção dedicado; nunca o de fechamento/cobrança. Rampa: 10/dia (dias 1–3), 20/dia (dias 4–7), depois +5/dia por semana, teto 40/dia (número novo). Instagram: até 15/dia, 100% manual.
4. Horário: seg–sex, **14h30–17h30** (secundário 9h30–11h). Nunca 11h–14h30 nem 18h30–22h30. Conferir no Maps o horário e a folga do restaurante.
5. "Não", "pare", "sai", bloqueio ou "quem é você?" irritado: pedir desculpas, **não escrever mais** e marcar `do_not_contact` na hora.
6. Nunca: "para sempre", "vitalício", "grátis" para algo pago, promessa de resultado ("vai aumentar seus pedidos"), "parceiro do iFood/Google/Meta", "site oficial" (a prévia é "criada pela GaspLab"), cobrança ou "você me deve" pela prévia.
7. Nunca copiar avaliação do Google para a prévia. Logo do iFood/Keeta/99Food: usar link de texto.
8. Lead em SP: consultar o cadastro do Procon-SP antes (a confirmar como). Usar o telefone do estabelecimento, não celular pessoal.

### 0.5 Prazos usados nos textos (decisão do Felipe)

Os prazos abaixo são os do rascunho de compliance (seção 5.3): **prévia no ar por 14 dias; 12 meses de hospedagem e manutenção básica incluídos; reembolso em até 7 dias após o pagamento; aviso de 90 dias se a GaspLab um dia encerrar o serviço**. Se o Felipe mudar qualquer um, troque nos textos (a estrutura não muda). O prazo de 14 dias é o **único "urgência" permitido**: é real. Não renove a prévia só para criar pressão; se for estender, diga que estendeu.

### 0.6 Fale assim, não assim

| Diga | Evite |
|---|---|
| página de cardápio, link da bio | catálogo digital, SPA, landing page, plataforma |
| pedido organizado no WhatsApp | pedido estruturado, integração |
| prévia | mockup, demo, preview |
| pagamento único | investimento, solução completa |
| cardápio com a cara de vocês | identidade visual personalizada |

---

## 1. Ligação de permissão (30–45 s)

### 1.1 Antes de ligar

- Telefone do estabelecimento (do Maps). Janela 14h30–17h30, preferindo quarta e quinta.
- Ficha aberta: `[NOME]`, `[BAIRRO]`, `[PRATO_DESTAQUE]`, se está no iFood, se tem link na bio.
- Lead em SP: checar Procon-SP antes.
- Tenha onde registrar na hora: quem autorizou, número autorizado, data e hora (é o opt-in que libera as mensagens seguintes).

### 1.2 Roteiro — restaurante (≈ 90 palavras, 35–40 s)

```text
[Atendeu]
"Boa tarde! Aqui é o Gabriel, da GaspLab. Falo com quem cuida do [RESTAURANTE]?"
[Sim]
"Levo 30 segundos. Posso explicar?"
[Pode]
"Achei vocês no Google Maps, com avaliações ótimas. A gente monta uma página de
cardápio com a cara do restaurante: o cliente escolhe os pratos e o pedido chega
organizado no WhatsApp de vocês, sem comissão. [Só se tiver iFood: Funciona junto com o iFood.]
Posso montar uma prévia gratuita e te mandar por WhatsApp neste número?"
[Sim]
"Combinado, mando ainda hoje. Se não quiser mais contato, é só falar que eu não
ligo nem escrevo mais. Obrigado, [NOME]!"
```

*Por que funciona:* Voss (pede permissão antes de vender e dá o tempo exato: baixa a defesa); Collier (primeira frase entra no mundo do dono: o restaurante dele); Kern (o resultado é mostrado antes de pedir qualquer coisa); Kennedy (uma única ação clara: "posso mandar?").

### 1.3 Roteiro — negócio local (≈ 85 palavras)

```text
[Atendeu]
"Boa tarde! Aqui é o Gabriel, da GaspLab. Falo com quem cuida do [NEGÓCIO]?"
[Sim]
"Levo 30 segundos. Posso explicar?"
[Pode]
"Achei vocês no Google Maps, com ótimas avaliações, mas não vi um site de vocês.
A gente faz um site simples com a cara do [NEGÓCIO]: o que vocês fazem, horário,
onde fica e botão de WhatsApp. Posso montar uma prévia gratuita e te mandar por
WhatsApp neste número? Se não gostar, não tem compromisso."
[Sim]
"Combinado, mando ainda hoje. Se não quiser mais contato, é só falar que eu não
ligo nem escrevo mais. Obrigado, [NOME]!"
```

*Por que funciona:* fato verificável no começo ("não vi um site": confira antes de ligar) mostra que não é lista cega (Cialdini: liking por atenção específica); lista concreta do que o site tem (Hopkins: específico vence adjetivo); risco zero explícito (Warren: acalma o medo).

### 1.4 As 3 respostas mais comuns (ordem de frequência é **estimativa**, sem dado próprio; pendência nº 1 da base)

| Resposta do dono | O que dizer | Por que funciona |
|---|---|---|
| **1. "Tô ocupado / agora não dá"** (quase certo em horário de serviço) | "Imagina, desculpa pegar vocês na correria. Quando é melhor eu ligar: depois do almoço ou amanhã cedo? Se preferir, mando só uma mensagem curta no WhatsApp e você vê quando puder. Pode ser?" Se disser "pode mandar": enviar a mensagem do item 2 **sem link** e registrar o aceite. | Voss: pede desculpas pelo contexto (rótulo), oferece duas saídas e deixa o dono no controle. |
| **2. "O que é isso? / Quanto custa?"** | "É uma página com o cardápio de vocês: o cliente monta o pedido e ele chega pronto no WhatsApp. O valor é `[PREÇO_BIO]`, pagamento único, com hospedagem e manutenção básica incluídas por 12 meses. Mas prefiro que você veja antes de decidir: monto a prévia, sem compromisso. Posso mandar?" (site: trocar por `[PREÇO_SITE]`) | Kennedy: responde o preço sem fugir (tira o medo da surpresa) e volta para a única ação. Hopkins: preço e prazo na mesma frase. |
| **3. "Não tenho interesse"** | "Tranquilo, obrigado pela atenção e desculpa o incômodo. Não ligo nem escrevo mais. Bom movimento aí!" Marcar `do_not_contact`. **Não insistir.** | Voss: o "não" é aceito sem briga, e isso protege o número e a marca. Compliance: não continuar depois de um não. |
| Extra: **"Não sou eu quem decide / o dono não está"** | "Sem problema! Qual o melhor horário pra falar com ele(a)? Ou posso mandar uma mensagem curta pro WhatsApp do restaurante pra ele ver quando puder?" | Collier: segue a conversa que já existe (quem decide) em vez de empurrar. |

### 1.5 Depois da ligação

- Registrar: resultado (sim / ocupado / não / outro decisor), quem autorizou, hora, número autorizado.
- "Sim": mandar a prévia (seção 3, variante pós-ligação) na mesma tarde.
- "Não": supressão. Não tentar outro canal ou outro número da mesma pessoa.

---

## 2. 1ª mensagem de WhatsApp (sem link)

### 2.1 Regras de envio

- Escreva à mão. Troque abertura, origem e saída usando o banco da seção 2.5 (nunca o mesmo texto copiado).
- Inclua ao menos **uma frase real** sobre o lead (`[PRATO_DESTAQUE]`, `[BAIRRO]`). Se não for verdade, tire.
- Ângulo A só para quem **está no iFood** (link no Maps/Instagram). Sem iFood: B ou C.
- Ângulo C só se você **conferiu** que não há link na bio.
- Uma variação por lead; alternar A/B/C na ordem da lista (para o teste da seção 8).
- Sem emoji, ou no máximo um.

### 2.2 Restaurante

**A — Comissão do iFood** (consciência: problema-consciente; só para leads no iFood)

```text
Oi, [NOME]! Aqui é o Gabriel, da GaspLab. Achei o [RESTAURANTE] no Google Maps.

Parece que o iFood leva uma boa parte de cada pedido: de 12% a 23% de comissão, conforme o plano, fora a taxa de pagamento online e a mensalidade.

A gente monta uma página de cardápio com a cara de vocês: o cliente escolhe os pratos e o pedido chega organizado no WhatsApp, sem comissão. Não é pra sair do iFood.

Posso montar uma prévia gratuita e te mandar? Se preferir não receber mensagem, é só avisar que eu não escrevo mais.
```

*Por que funciona:* Voss (rótulo "parece que…" nomeia a dor antes da oferta e já faz a "auditoria de acusação": "não é pra sair do iFood" derruba a objeção nº 1 antes de ela aparecer); Hopkins (número específico e oficial no lugar de adjetivo); Warren (confirma uma suspeita que é verdadeira: o dono já sente a taxa).

**B — Pedidos organizados** (problema-consciente; serve para qualquer restaurante com WhatsApp)

```text
Oi, [NOME]! Aqui é o Gabriel, da GaspLab. Achei o [RESTAURANTE], lá no [BAIRRO], no Google Maps.

Pedido por WhatsApp costuma chegar bagunçado: item trocado, endereço faltando, pedido que se perde no meio da conversa.

A gente monta uma página de cardápio com a cara de vocês. O cliente escolhe os pratos e o pedido chega no WhatsApp já organizado: itens, quantidades, total, entrega ou retirada e endereço.

Posso montar uma prévia gratuita e te mandar? Se não fizer sentido, me avisa que eu não escrevo mais.
```

*Por que funciona:* Collier (entra na conversa que já acontece na cabeça do dono todo dia: o pedido embolado); Warren (justifica a falha: o problema é a ferramenta, não o capricho dele); Hopkins (lista específica do que chega no pedido). Sem número porque não existe estudo independente sobre erro de pedido (`20-mercado/restaurantes-mercado-comportamento.md`, seção 4.1).

**C — "Vi que vocês não têm link na bio"** (consciência baixa: o dono pode não ter pensado nisso)

```text
Oi, [NOME]! Aqui é o Gabriel, da GaspLab. Achei o [RESTAURANTE] no Google Maps e fui olhar o Instagram de vocês.

Vi que não tem link na bio. Quem vê a foto do [PRATO_DESTAQUE] e fica com vontade de pedir não tem onde clicar.

A gente monta uma página com o cardápio de vocês: o cliente escolhe os pratos e o pedido chega organizado no WhatsApp.

Posso montar uma prévia gratuita, com a cara do [RESTAURANTE], e te mandar? Se preferir não receber mensagem, é só avisar que não escrevo mais.
```

*Por que funciona:* Collier ("filme mental": o cliente com vontade e sem caminho); Cialdini (liking: observação específica prova que alguém olhou o perfil dele); Schwartz (nível de consciência mais baixo: abre com um fato que ele confere em 5 segundos, não com o produto).

### 2.3 Negócio local (site)

**N1 — Quem acha vocês no Google não tem uma página de vocês**

```text
Oi, [NOME]! Aqui é o Gabriel, da GaspLab. Achei o [NEGÓCIO], no [BAIRRO], no Google Maps, com avaliações ótimas, e não encontrei um site de vocês.

Hoje quem acha vocês no Google vê as avaliações, mas não tem uma página própria pra entender o que vocês fazem e chamar no WhatsApp.

A gente faz um site simples com a cara do [NEGÓCIO]: o que vocês fazem, horário, onde fica e botão de WhatsApp.

Posso montar uma prévia gratuita e te mandar? Sem compromisso. Se preferir não receber mensagem, é só avisar que não escrevo mais.
```

*Por que funciona:* Collier (entra no que o dono já pensa: "o pessoal me acha no Google"); Hopkins (lista concreta do que o site tem); Cialdini (reciprocidade: oferece o trabalho pronto antes de pedir algo).

**N2 — Mostrar em vez de explicar**

```text
Oi, [NOME]! Aqui é o Gabriel, da GaspLab. Achei o [NEGÓCIO] no Google Maps.

Em vez de te explicar como seria um site pra vocês, prefiro te mostrar. Eu monto uma prévia com o nome, as cores e o que vocês fazem, e você só olha e diz se gostou. Não precisa mandar nada agora.

Posso te mandar por aqui? É gratuita e sem compromisso. Se preferir não receber mensagem, é só avisar que não escrevo mais.
```

*Por que funciona:* Kern (resultado antes do pagamento); Kennedy (tira esforço: "você só olha"); Warren (acalma o medo de perder tempo e de compromisso).

### 2.4 Variante sem nome do responsável (qualquer ângulo)

```text
Oi, tudo bem? Aqui é o Gabriel, da GaspLab. Achei o [RESTAURANTE] no Google Maps. Falo com quem cuida dos pedidos e do Instagram? Se não for com você, pode me indicar quem é?

Se for com você: a gente monta uma página de cardápio com pedido organizado no WhatsApp, e eu posso te mandar uma prévia gratuita, com a cara de vocês. Posso? Se preferir não receber mensagem, é só avisar que não escrevo mais.
```

*Por que funciona:* Collier (começa pela pessoa, não pelo produto); Voss (a pergunta "falo com quem cuida…?" é fácil de responder e abre a conversa mesmo se o decisor for outro).

### 2.5 Banco de peças para variar (anti-cópia)

| Peça | Opções |
|---|---|
| Abertura | "Oi, [NOME]! Aqui é o Gabriel, da GaspLab." · "Oi, [NOME], tudo bem? Meu nome é Gabriel, sou da GaspLab." · "Boa tarde, [NOME]! Gabriel, da GaspLab." |
| Origem | "Achei o [RESTAURANTE] no Google Maps." · "Vi o [RESTAURANTE], do [BAIRRO], no Google Maps." · "Cheguei no [RESTAURANTE] pelo Google Maps." |
| Frase real (uma só) | "Vi o [PRATO_DESTAQUE] de vocês no Instagram e deu vontade." · "Vi que vocês atendem no [BAIRRO]." (só se for verdade) |
| Saída (opt-out) | "Se preferir não receber mensagem, é só avisar que eu não escrevo mais." · "Se não fizer sentido, me avisa que eu não incomodo mais." · "Se não quiser receber mensagem minha, é só falar e eu não escrevo mais." |

*Por que funciona:* mesmo ângulo, palavras diferentes: o teste mede o ângulo, e o número não vê um texto repetido (risco R01 de banimento).

---

## 3. Entrega da prévia (o lead disse "pode mandar")

### 3.1 Texto principal (prévia já pronta)

```text
Perfeito, [NOME]! Segue a prévia do [RESTAURANTE]:
[LINK_PREVIA]

Ela é gratuita, sem compromisso, e fica no ar por 14 dias. Usei só o que é público de vocês (nome, cores, cardápio). Os preços e pratos que aparecem são de exemplo: a gente acerta tudo com você. O link é só pra você ver, não está aberto ao público.

Abre no celular e faz um pedido de teste. Quando tocar em enviar, ele chega no seu WhatsApp marcado como teste, igual chegaria de um cliente.

O que você ajustaria pra ficar com a cara de vocês?

Se eu não ouvir de você, passo aqui mais uma ou duas vezes só pra saber o que achou. É só falar "pare" que eu paro.
```

*Por que funciona:* Kern (resultado entregue antes de pedir qualquer coisa: reciprocidade, Cialdini); Voss ("o que você ajustaria?" é pergunta calibrada: o dono já começa a se ver como dono da página); Sugarman/Cialdini (envolvimento: o pedido de teste faz ele sentir a página dele funcionando); a última linha avisa os follow-ups e é o opt-in transparente.

> Antes de enviar, confira: a prévia tem link com token, `noindex`, banner "Prévia criada pela GaspLab; não é o site oficial", preço marcado como exemplo e botão de pedido em modo teste (compliance R08/R14/G5). Se o botão de teste não existir, troque o 3º parágrafo por "Toca em Pedir e vê a mensagem que se monta pro WhatsApp". Não afirme "link privado" se não for.

### 3.2 Variante: o lead disse "pode mandar", mas a prévia ainda não está montada

```text
Obrigado, [NOME]! Vou montar agora com a identidade do [RESTAURANTE] e te mando aqui ainda hoje.

Pra eu deixar o botão certo: o WhatsApp que recebe os pedidos é este mesmo? Se for outro, me passa o número.

Depois de mandar, passo aqui mais uma ou duas vezes só pra saber o que achou. É só falar "pare" que eu paro.
```

*Por que funciona:* Cialdini (compromisso pequeno e ativo: ele responde uma coisa fácil e já participa); entrega o aviso de follow-up antes (transparência = opt-in). Só prometa "ainda hoje" se o Felipe confirmar a fila de prévias (a confirmar).

### 3.3 Variante: pós-ligação

Troque a 1ª linha do texto 3.1 por: "Oi, [NOME]! Aqui é o Gabriel, da GaspLab, a gente conversou agora há pouco por telefone. Como combinado, segue a prévia do [RESTAURANTE]:" e mantenha o resto.

*Por que funciona:* Cialdini (consistência: cumpre exatamente o que foi combinado por voz).

### 3.4 O que destacar na prévia (nesta ordem)

1. **O pedido de teste chegando no WhatsApp.** É o momento "ah!": itens, quantidades, total, entrega ou retirada, endereço e observações, tudo organizado.
2. **A cara do restaurante**: nome, cores, `[PRATO_DESTAQUE]` em evidência. É a identidade dele, não a da GaspLab.
3. **Aberto/fechado com horário** (e prato do dia ou combos, se houver): o cliente sabe se pode pedir antes de chamar.

Não destacar: avaliações do Google (nunca copiadas), logo de iFood/Keeta/99Food, comparação com outros sistemas, promessa de "mais pedidos", a palavra "oficial".

### 3.5 Pergunta de avanço

- **1ª (já está no texto):** "O que você ajustaria pra ficar com a cara de vocês?"
- **2ª, quando ele responder bem ou mandar ajustes:** "Se ficar do seu jeito, quer que eu te passe o valor e como funciona pra colocar no ar?" (uma pergunta por mensagem). Resposta "sim" ou "quanto é?": ir para 6.1.

---

## 4. Follow-ups

### 4.1 Regra de cadência (conflito resolvido com o compliance)

O pedido era D+1, D+3 e D+7. O compliance (`40-riscos/compliance-riscos.md`, seção 4, "Faça" nº 8) manda **um follow-up só, 48–72 h depois**, para quem **não respondeu e não deu permissão**. Por isso há duas trilhas:

| Trilha | Quem | O que enviar | Depois |
|---|---|---|---|
| **1 — sem permissão** | Não respondeu à 1ª mensagem | **Só o D+3** (4.2), que já funciona como despedida | Marcar "sem resposta" e **não voltar por 90 dias** (**estimativa** do compliance). D+1 e D+7 **não** se aplicam. |
| **2 — com permissão** | Disse "pode mandar" e recebeu a prévia (e foi avisado dos follow-ups no texto 3.1/3.2) | **D+1, D+3 e D+7**, contando a partir do dia do envio da prévia, mesma janela de horário | "Pare"/"não" em qualquer ponto encerra tudo. |

### 4.2 Trilha 1 — D+3 único (sem resposta à 1ª mensagem)

Restaurante:

```text
Oi, [NOME]! Gabriel, da GaspLab, de novo. Sei que a correria no [RESTAURANTE] é grande, então vou direto: quer ver a prévia da página de cardápio com pedido pelo WhatsApp? É só responder "pode mandar".

Se não for o momento, tudo bem: não escrevo mais depois dessa.
```

Negócio local:

```text
Oi, [NOME]! Gabriel, da GaspLab, de novo. Quer ver a prévia de um site simples do [NEGÓCIO]? É só responder "pode mandar".

Se não for o momento, tudo bem: não escrevo mais depois dessa.
```

*Por que funciona:* Voss (dá permissão para dizer não: "não" gera segurança e abre espaço para o "sim"); Kennedy (instrução de resposta em duas palavras); encerra com respeito, o que protege o número (R01).

### 4.3 Trilha 2 — restaurante (depois da prévia)

**D+1: ajuda, sem pedir nada**

```text
Oi, [NOME]! Conseguiu abrir a prévia do [RESTAURANTE]? Se achou algo estranho (cor, nome de prato, preço), me fala que eu ajusto na hora.
[LINK_PREVIA]
```

*Por que funciona:* Kern (continua dando resultado: oferece ajuste, não cobra resposta); Kennedy (um motivo concreto para responder e uma instrução clara).

**D+3: razão para decidir + prazo real**

Para quem está no iFood:

```text
[NOME], só lembrando: a prévia do [RESTAURANTE] fica no ar até [DATA_EXPIRAÇÃO].

Pra ajudar a decidir, uma conta simples: o iFood cobra de 12% a 23% de comissão por pedido, conforme o plano, mais 3,2% do pagamento online. Cada pedido que chega direto pela sua página não paga essa comissão.

Se fizer sentido, o valor é [PREÇO_BIO], pagamento único. Quer que eu te explique como colocar no ar?
```

Para quem não está no iFood (troque o 2º parágrafo):

```text
Pra ajudar a decidir: a página deixa cada pedido organizado no WhatsApp (itens, quantidades, total, entrega ou retirada e endereço), sem ninguém ter que juntar tudo no meio da conversa.
```

*Por que funciona:* Hopkins (razão específica: número oficial, não adjetivo); Kennedy (urgência real, o prazo da prévia, e instrução clara); sem promessa: só diz que o pedido direto não paga a comissão, nunca que "vai economizar X".

**D+7: despedida, porta aberta**

```text
[NOME], vou encerrar por aqui pra não incomodar. A prévia do [RESTAURANTE] fica no ar até [DATA_EXPIRAÇÃO] se quiser rever.

Não escrevo mais depois dessa mensagem. Se mais pra frente fizer sentido ter o cardápio com pedido pelo WhatsApp, é só me chamar neste número que eu retomo.

Se tiver um minuto, me conta o que pesou (valor, tempo, ou não era o momento)? Ajuda a gente a melhorar. Obrigado e bom movimento aí!
```

*Por que funciona:* Voss (fecha sem pressão e rotula as 3 razões comuns: o dono responde só com uma palavra); Collier (porta aberta, tom de amigo); Wiebe (a resposta vira dado: registrar as **palavras literais** do dono no log da seção 8). O "não escrevo mais" é o opt-out proativo.

### 4.4 Trilha 2 — negócio local (trocas)

| Texto | Troca |
|---|---|
| D+1 | "prévia do [RESTAURANTE]" → "prévia do site do [NEGÓCIO]"; "(cor, nome de prato, preço)" → "(cor, texto, horário)" |
| D+3, 2º parágrafo | "Pra ajudar a decidir: quem procura vocês no Google já encontra as avaliações; com o site, encontra também o que vocês fazem, o horário, onde ficam e o botão de WhatsApp." |
| D+3, valor | usar `[PREÇO_SITE]` |
| D+7 | "cardápio com pedido pelo WhatsApp" → "um site" |

---

## 5. Respostas às objeções

Regra geral (Voss): primeiro reconheça o que o dono sente, depois responda, depois volte a **uma** ação. Nunca discuta, nunca insista depois de um "não".

### 5.1 "Já estou no iFood"

```text
Faz sentido, e não é pra sair de lá. O iFood traz cliente novo. A página é pro cliente que já conhece o [RESTAURANTE] (do Instagram, de indicação, quem já pediu) pedir direto, sem comissão.

Se for o plano de 12%, com o pagamento online de 3,2% são cerca de R$ 15 de taxa a cada R$ 100 pagos pelo app. O pedido que chega direto pela página não paga isso.

Posso te mostrar a prévia pra você ver se faz sentido?
```

*Por que funciona:* Voss (concorda com o que é verdade antes de responder); Kennedy (reposiciona: complemento, não troca); Hopkins (conta pequena e verificável). A conta vale para pagamento online pelo app no plano de 12%; não generalize para o plano de 23% (a comissão cobre a entrega).

### 5.2 "Não tenho tempo"

```text
Entendo, ainda mais com a cozinha rodando. Por isso a gente faz tudo: você só olha a prévia e diz o que ajustar. Se fizer sentido, eu só preciso do cardápio atualizado, da logo e dos horários.

Posso mandar a prévia pra você olhar quando tiver um tempinho?
```

*Por que funciona:* Kennedy (tira o esforço: o dono só aprova); Collier (reconhece a rotina real do dono antes de responder).

### 5.3 "Tá caro"

```text
É justo olhar o valor com cuidado, caixa de restaurante aperta mesmo. Pra comparar: o valor de [PREÇO_BIO] é pagamento único e já inclui hospedagem e manutenção básica por 12 meses.

Os planos pagos de cardápio digital que eu conheço começam perto de R$ 100 por mês, uns R$ 1.200 no ano. Existem opções gratuitas também, mas geralmente aí quem monta tudo é você.

Se quiser, faço a conta com o seu número: mais ou menos quanto sai de taxa do iFood por mês?
```

Sem iFood, troque a última pergunta por: "Se quiser, faço a conta com o seu número: mais ou menos quantos pedidos chegam por semana no WhatsApp?"

*Por que funciona:* Voss (rótulo do aperto + pergunta calibrada "quanto", o dono faz a conta); Kennedy (vende valor, não dá desconto na hora; âncora é o custo anual real de um plano mensal: R$ 99,90–99,99 × 12 ≈ R$ 1.200, fonte `20-mercado/concorrentes-precos.md`, seção 3); honestidade: admite que existe opção grátis (Sugarman: honestidade constrói confiança). Não ofereça desconto, degrau ou parcelamento enquanto o Hormozi Squad e o Felipe não liberarem (parcelamento: a confirmar).

### 5.4 "Vou pensar"

```text
Claro, sem pressa. Só pra eu entender melhor: o que pesa mais na decisão, o valor, o tempo pra mexer nisso, ou ver se os clientes iam usar?

A prévia fica no ar até [DATA_EXPIRAÇÃO]. Posso te chamar no dia [DIA] pra saber o que você decidiu?
```

*Por que funciona:* Voss (pergunta "o que pesa" descobre a objeção real, e a lista de 3 opções facilita responder); Cialdini (compromisso: ele combina a data do próximo contato, o que também é o opt-in do follow-up). Prazo = o real.

### 5.5 "Já tenho Instagram / WhatsApp"

```text
Ótimo, é aí que a página entra: ela liga os dois. Hoje, quando alguém vê uma foto de vocês no Instagram e quer pedir, qual é o caminho dele?

Com a página, ele toca no link da bio, escolhe os pratos e o pedido cai no seu WhatsApp organizado, com itens, total e endereço. Se você usa o catálogo do WhatsApp, abre a prévia do lado e compara: a identidade de vocês, o horário aberto/fechado, os combos do dia.

Posso te mandar a prévia?
```

Negócio local, troque o 2º parágrafo por: "O Instagram é ótimo pra mostrar o trabalho. O site é onde quem pesquisa no Google confere o que vocês fazem, o horário e chama no WhatsApp. Um não substitui o outro."

*Por que funciona:* Collier (a pergunta coloca o dono dentro da cena: o cliente com vontade, sem caminho); Voss (concorda e reposiciona: "liga os dois"). Não diga que o catálogo do WhatsApp "não tem" algo: **a confirmar** (pendência nº 10); por isso a frase é "abre do lado e compara".

### 5.6 "Quem é você?"

Curioso/neutro:

```text
Sou o Gabriel, da GaspLab, empresa de sites e páginas de cardápio. Achei o [RESTAURANTE] no Google Maps e escrevi eu mesmo pra vocês: não é lista nem robô. O site da GaspLab está no meu perfil do WhatsApp (gasplab.site).

Se não quiser conversar, é só falar que eu não escrevo mais. Se quiser, te mando a prévia do [RESTAURANTE] sem compromisso.
```

Irritado/desconfiado (qualquer sinal de incômodo ou "como conseguiu meu número?"):

```text
Desculpa o incômodo, [NOME]. Achei o contato de vocês no Google Maps. Já tirei da minha lista e não escrevo mais. Bom movimento aí.
```

Marcar `do_not_contact` com o motivo. Não mandar nada além disso.

*Por que funciona:* Voss (responde a pergunta escondida, "isso é golpe?", antes de ela virar acusação); Cialdini (autoridade honesta: quem sou, de onde achei, como sair); o site só entra depois que o lead escreveu primeiro (não é link na 1ª mensagem).

### 5.7 "Manda proposta por escrito"

```text
Mando sim. Em vez de um PDF genérico, te mando a prévia pronta com a cara do [RESTAURANTE] e, junto, o valor e o que está incluso, em texto curto, aqui mesmo. Fica mais fácil decidir vendo o produto. E se for fechar, te mando o termo por escrito antes de qualquer pagamento.

Pode ser?
```

Depois do "pode ser": prévia (3.1) e, na sequência, a proposta curta (6.1).

*Por que funciona:* Kennedy (transforma o pedido de papel em um passo que avança); Kern (mostra antes de pedir decisão); Warren (acalma o medo: nada é cobrado sem termo escrito).

### 5.8 "Meu sobrinho faz"

```text
Que bom ter alguém de confiança pra isso! Então a prévia é só uma comparação, sem compromisso: você vê como o pedido chega organizado no WhatsApp e decide o que faz mais sentido. Se quiser, mostra pra ele também, quem sabe ele curte.

E se um dia você fechar com a gente, pode sair quando quiser e levar a página com você, sem ficar preso.

Quer ver a prévia?
```

*Por que funciona:* Voss (não ataca a pessoa que o dono respeita e aceita a lealdade dele); Cialdini (unidade: coloca o sobrinho do mesmo lado); Warren (acalma o medo de ficar preso: direito de saída, compliance 5.4 item 6).

### 5.9 Extras

**"Não" / "pare" / "não quero"** → sempre:

```text
Tranquilo, obrigado por avisar. Não escrevo mais. Bom movimento aí!
```

Marcar `do_not_contact`, guardar o telefone na lista de supressão, não tentar outro canal. *Por que funciona:* Voss (aceitar o não com elegância; compliance: nunca recontatar).

**"Quanto custa?" antes da prévia**

```text
O valor é [PREÇO_BIO], pagamento único, com hospedagem e manutenção básica por 12 meses (site: [PREÇO_SITE]). Antes de qualquer pagamento você vê a prévia pronta. Posso montar e te mandar?
```

*Por que funciona:* Kennedy (responde o preço sem fugir e volta para uma ação); Hopkins (preço e prazo na mesma frase, como pede o compliance 5.1).

---

## 6. Fechamento, cobrança, onboarding e indicação

Ordem obrigatória (compliance 5.1 e R13): prévia grátis → o dono demonstra interesse → **proposta curta + termo por escrito** → **"ACEITO" por escrito** → Pix → começa a versão final. Nunca cobrar nem sugerir dívida pela prévia (CDC art. 39).

### 6.1 Proposta curta (quando o dono diz "gostei" ou "quanto é?" ou pede por escrito)

Restaurante:

```text
Que bom que gostou, [NOME]! Resumindo como funciona:

Valor: [PREÇO_BIO], pagamento único.
Inclui: a página do [RESTAURANTE] com o cardápio e o pedido pelo WhatsApp, hospedagem e manutenção básica por 12 meses.
Você pode cancelar quando quiser e levar a página com você. Se desistir em até 7 dias depois de pagar, devolvo o valor.

Vou te mandar o termo curto por escrito antes do Pix: [TERMO]
Se estiver de acordo, responde ACEITO e eu te passo os dados do Pix.
```

Negócio local (site): trocar o 2º bloco por: "Inclui: site simples do [NEGÓCIO] (o que vocês fazem, horário, onde fica, botão de WhatsApp), hospedagem e manutenção básica por 12 meses e o domínio .com.br no seu nome. Pagamos o 1º ano; depois a renovação é sua (hoje R$ 40 por ano no Registro.br)." **[a confirmar: política de domínio e como pagar domínio de conta de terceiro; pendência nº 9]**

Se o negócio quiser as duas coisas, acrescente uma linha: "Se quiser a página do cardápio e o site juntos, o combo sai por [PREÇO_COMBO]." Só se ele já tiver mostrado interesse nos dois (um pedido por vez).

*Por que funciona:* Kennedy (oferta clara e uma instrução: "responde ACEITO"); Cialdini (comprometimento por escrito é mais forte que verbal); Warren (acalma os medos nomeando cancelamento, saída e reembolso); Hopkins (diz exatamente o que está incluso e por quanto tempo, como pede o CDC art. 30). Não escreva "para sempre", "sem mensalidade" sozinho ou "grátis".

### 6.2 Cobrança (Pix)

```text
Combinado, [NOME]! Pra começar, o Pix:

Chave: [CHAVE_PIX]
Nome que aparece: [FAVORECIDO]
Valor: [PREÇO_BIO]

Confere o nome antes de confirmar. Quando pagar, me manda o comprovante por aqui que eu já começo a versão final.
```

Nota fiscal: **a confirmar** (pendência nº 6); não prometer nem negar até o Felipe decidir.

*Por que funciona:* Kennedy (todos os dados e a próxima ação juntos, sem atrito); Warren/Hopkins ("confere o nome" reduz o medo de golpe); linguagem de serviço, sem pressão.

### 6.3 Lembrete de pagamento (no máximo 2, tom de serviço)

1º lembrete, 24 h depois, na janela de horário:

```text
Oi, [NOME]! Só conferindo se deu certo com o Pix. Se surgiu alguma dúvida ou você mudou de ideia, pode me falar, sem problema.
```

2º e último, se continuar sem resposta (depois de 48 h):

```text
[NOME], último recado: a prévia do [RESTAURANTE] fica no ar até [DATA_EXPIRAÇÃO]. Se quiser seguir, é só me chamar. Se não for o momento, tudo bem. Obrigado!
```

*Por que funciona:* Voss (dá saída honrosa, o que reduz a defesa); Kennedy (follow-up sistemático com prazo real). Nunca "você me deve", nunca citar o trabalho já feito como dívida (CDC art. 39).

### 6.4 Confirmação de pagamento

```text
Pagamento confirmado! Obrigado pela confiança, [NOME]. Já vou começar a versão final do [RESTAURANTE]. Prazo: [PRAZO_ENTREGA]. Já te mando o que preciso de você.
```

*Por que funciona:* Cialdini (confirma a decisão e reforça a identidade de quem decide: "a confiança"); Kennedy (próximo passo claro).

### 6.5 Onboarding — o que o cliente precisa mandar

Restaurante (Bio + Catálogo):

```text
Pra eu montar a versão final, me manda por aqui:

1. Cardápio atualizado (foto, PDF ou texto), com preços e categorias. Se tiver adicional ou opção (tamanho, sabor), me avisa.
2. Logo do [RESTAURANTE]. Se tiver o arquivo original, melhor; senão, uma foto nítida serve.
3. Horários de funcionamento, com folgas e feriados.
4. O número de WhatsApp que vai receber os pedidos.
5. Como vocês entregam: bairros atendidos, taxa de entrega e formas de pagamento. Ou só retirada?
6. Fotos dos pratos, se quiser (só as que são suas ou que você tem permissão pra usar).
7. Instagram e, se quiser, o link do iFood pra ficar na página.

Pra fechar: você confirma que tem direito de usar a logo e as fotos que mandar?
```

Negócio local (site): trocar os itens por: (1) o que o negócio faz e os serviços principais, em texto corrido ou tópicos; (2) logo; (3) horários; (4) endereço e área atendida; (5) WhatsApp que recebe o contato; (6) fotos (só as que são dele); (7) Instagram; (8) nome desejado para o domínio e **CPF ou CNPJ do titular** (o domínio fica no nome do cliente); e a mesma confirmação de direitos.

*Por que funciona:* Kennedy (lista numerada com instrução única: "me manda"); Hopkins (específico: ele não precisa adivinhar o que enviar); a confirmação de direitos cumpre a cláusula 5 do termo (R08).

### 6.6 Entrega e pedido de indicação

Entrega, quando a página entrar no ar:

```text
Está no ar, [NOME]! [LINK_FINAL]

Faz um pedido de teste pelo celular e vê como chega no seu WhatsApp. Coloca o link na bio do Instagram e no status do WhatsApp. Se quiser mudar qualquer coisa (preço, prato, horário), me chama que eu ajusto, dentro da manutenção que está incluída.
```

*Por que funciona:* Kern (o cliente vê o resultado na mão dele); Kennedy (próximas ações claras: bio e status).

Indicação — enviar **só depois que o cliente disser que está usando ou gostou** (não antes, não por calendário):

```text
Que bom que está funcionando, [NOME]! Uma ajuda: você conhece outro dono de restaurante ou de negócio que também ia gostar disso? Se conhecer, encaminha meu contato pra ele, ou pede pra ele me chamar. Assim ele decide se quer conversar, sem eu escrever do nada. Obrigado!
```

Pedido de depoimento (opcional, em mensagem separada, uns dias depois):

```text
Se puder deixar uma frase sobre como foi, posso usar no meu site com o seu nome? Só publico se você autorizar por aqui.
```

*Por que funciona:* Cialdini (compromisso e prova social de fonte real: o cliente satisfeito apresenta, e o novo lead chega com permissão); compliance: pedir que **ele encaminhe** o contato evita pegar telefone de terceiro sem consentimento (LGPD), e o depoimento só entra com autorização escrita (R09). Não ofereça benefício por indicação até o Felipe criar um (hoje não existe).

---

## 7. DM do Instagram (curta, só texto, sem link)

Regras: perfil dedicado; até 15 por dia; manual; mensagem a quem não segue vira "solicitação" e **só aceita 1 texto até ser aceita**, então **não dá para fazer follow-up enquanto estiver pendente**; nada de mídia na 1ª mensagem.

**1ª mensagem — restaurante (≈ 45 palavras)**

```text
Oi! Gabriel, da GaspLab. Achei o [RESTAURANTE] no Google Maps e vim pro Instagram: o [PRATO_DESTAQUE] tá lindo. A gente faz página de cardápio com o pedido organizado no WhatsApp. Posso mandar uma prévia gratuita, com a cara de vocês? Se preferir não receber mensagem, é só avisar.
```

*Por que funciona:* elogio específico e verdadeiro (liking, Cialdini) + uma única pergunta de permissão (Voss) + identificação e saída no mesmo fôlego. Tire o elogio se não for verdade.

**1ª mensagem — negócio local (≈ 40 palavras)**

```text
Oi! Gabriel, da GaspLab. Achei o [NEGÓCIO] no Google Maps e vim pro Instagram. Não vi um site de vocês. A gente faz sites simples, com a cara do negócio. Posso mandar uma prévia gratuita? Se preferir não receber mensagem, é só avisar.
```

*Por que funciona:* fato verificável + oferta de mostrar antes (Kern) + saída clara.

**Follow-up (1 vez só; só se a solicitação foi aceita ou se ele respondeu; mesmo canal)**

```text
Oi, [NOME]! Gabriel de novo. Só pra saber se faz sentido eu te mandar a prévia do [RESTAURANTE]. Se não for o momento, tudo bem, não escrevo mais.
```

(Negócio local: "a prévia do site do [NEGÓCIO]".)

*Por que funciona:* Voss (dá permissão para o "não"; baixa pressão) e fecha o ciclo sem insistir. Se o "sim" vier por DM, peça o WhatsApp para mandar o link: "Qual o melhor número pra eu te mandar a prévia?" (o link só depois do "sim").

---

## 8. Tabela de testes A/B (Kennedy: rastrear tudo; Hopkins: uma variável por vez; Wiebe: testar a mensagem, não a cosmética)

### 8.1 Tabela

| # | O que testa | Variações | Medir (principal · apoio) | Critério após **50 envios por variação** | Trava de segurança |
|---|---|---|---|---|---|
| T1 | Ângulo da 1ª mensagem, restaurante | A (iFood) · B (pedidos) · C (sem link na bio). **Mesmo pool:** A só entra com leads no iFood; sem iFood, só B vs C. Distribuição na ordem da lista (A, B, C, A, B, C…) | **Principal:** "sim" para a prévia ÷ mensagens entregues. **Apoio:** qualquer resposta que continua a conversa; pedido de saída/bloqueio; "quanto custa?"; prévia aprovada; pago | Vence a variação com **mais "sim"**, desde que tenha **≥ 3 "sim" a mais** que a 2ª ou **≥ 2× o resultado dela**. Se não, **estenda para 100 por variação**. Se ainda empatar: vence a de **menos saídas** e depois a de **texto mais curto**. | Descartar na hora a variação com ≥ 2 pedidos de saída/bloqueio no mesmo dia (kill switch do compliance) |
| T2 | Ângulo da 1ª mensagem, negócio local | N1 (quem acha no Google não tem página) · N2 (mostrar em vez de explicar) | Igual a T1 | Igual a T1 (≥ 3 "sim" a mais ou ≥ 2×) | Igual a T1 |
| T3 | Canal: ligação × mensagem | Ligação (30 tentativas) × mensagem vencedora de T1 (50) | **Principal:** permissão obtida por tentativa e **minutos de trabalho por "sim"**. **Apoio:** % que atende; % "ocupado"; % "não" | Canal com **menos minutos por "sim"** vence; desempate: o de menos saídas | Procon-SP antes de ligar; telefone do estabelecimento |
| T4 | Prévia com preço junto × preço depois | 3.1 + `[PREÇO_BIO]` na mesma mensagem × 3.1 sem preço (preço só na pergunta 3.5) | **Principal:** prévia → "aceito"/pede proposta. **Apoio:** tempo até a 1ª resposta; "tá caro" | Só **20 prévias por variação** (a produção é o limite). Vence quem tiver **≥ 3 aceites/pedidos de proposta a mais**; senão, mantenha sem preço junto | Nunca cobrar pela prévia |
| T5 | Janela de horário | 14h30–17h30 × 9h30–11h, mesmo texto, alternando por dia | **Principal:** resposta que continua ÷ entregues | Igual a T1 | Nada de 11h–14h30 nem 18h30–22h30 |

**Próximos testes** (um por vez, depois que T1 e T2 elegerem o ângulo): (1) com × sem os números do iFood no texto A; (2) pergunta final de permissão × pergunta de conversa ("como chegam os pedidos hoje?"); (3) texto curto (3 linhas) × completo; (4) "Gabriel, da GaspLab" × "Gabriel" com o site no perfil.

### 8.2 Como ler os números (honestidade estatística)

- Com a **estimativa** de resposta de 8–15% (semi-quente) e ~60% de aceite, 50 envios rendem **só ~2–5 "sim" por variação**. Diferenças pequenas são ruído. Por isso o critério pede margem (≥ 3 "sim" a mais ou ≥ 2×) e **estende para 100 por variação** se não houver vencedora clara.
- **Não decida por "pago" com n=50**: no cenário base (1,2% de conversão do contato à venda, **estimativa**), 50 envios dão ~0,6 venda. Use "pago" só como desempate ou com ≥ 100 por variação.
- **Tempo:** 150 envios (3 × 50) levam ~9 dias com número novo na rampa do compliance (10/dia por 3 dias, 20/dia por 4 dias, depois 25/dia) e ~5 dias com número aquecido (30/dia). Como o teto total é ~450–600 contatos frios em 15 dias (compliance), o teste A/B/C ocupa 25–33% do período: **faça leitura parcial no 25º envio por variação** e use-a **só para descartar** (0 respostas que continuam, ou ≥ 2 saídas), nunca para declarar vencedora.
- Se T1 e T2 forem rodados no mesmo número, os envios somam no teto diário.

### 8.3 Registro mínimo (uma linha por contato)

`data/hora · lead_id · tipo (restaurante/negócio) · bairro · está no iFood (s/n) · variação (A/B/C/N1/N2) · canal · entregue (s/n) · resposta (sim / pergunta / preço / não-saída / silêncio) · minutos até a resposta · prévia enviada (s/n) · preço junto (s/n) · aceito (s/n) · pago (s/n) · motivo da recusa **com as palavras literais do dono**`

As palavras literais viram o próximo texto (Wiebe: "a mensagem é encontrada, não inventada").

---

## 9. Controle de qualidade (interno, para o Felipe)

### 9.1 Arquitetura de persuasão (Cialdini + Warren)

| Princípio | Onde aparece | Observação |
|---|---|---|
| Reciprocidade | Prévia pronta antes de pedir qualquer coisa (2.x, 3.1) | Núcleo do método |
| Comprometimento/consistência | "Pode mandar" → ajuste → "ACEITO" (3.5, 6.1) | Cada passo pequeno e escrito |
| Liking | Observação específica (C, IG), `[BAIRRO]`, tom de WhatsApp | Só com fato verdadeiro |
| Autoridade | Identificação clara, site no perfil, honestidade sobre limites (5.3, 5.6) | Sem credencial inventada |
| Escassez | Só o prazo real da prévia (14 dias) | Nada de "vagas limitadas" ou "preço de lançamento" inventados |
| Unidade | "A gente", mesmo lado do sobrinho (5.8) | Leve |
| **Prova social** | **Não usada** | Não há cliente/depoimento verificável. **Lacuna**: coletar o 1º depoimento autorizado (6.6) e usá-lo só com autorização escrita |
| Warren: acalmar medos | Prévia antes de pagar, reembolso de 7 dias, termo escrito, saída fácil, opt-out em tudo | |
| Warren: justificar falhas | Pedido bagunçado é problema da ferramenta (B) | |
| Warren: confirmar suspeitas verdadeiras | Taxa do iFood (A) | Só com dado oficial |
| Warren: encorajar sonhos | **Evitado de propósito** (nada de "vai dobrar pedidos") | Compliance |

### 9.2 Auditoria Hopkins (autoavaliação, antes da aprovação do Felipe)

| Critério (Hopkins) | Resultado |
|---|---|
| Específico, não adjetivo (12–23%, 3,2%, lista do pedido, 14 dias, 7 dias) | Passa |
| Razão para agir ("reason why") em cada texto | Passa |
| Sem superlativo nem promessa de resultado | Passa |
| Linguagem simples, frases curtas, sem jargão | Passa |
| Uma ação por mensagem | Passa |
| Amostra grátis (a prévia) como motor | Passa |
| **Teste em campo** | **Pendente**: nenhum texto foi testado ainda; a seção 8 é o teste |
| Prova | Lacuna (ver 9.1: sem depoimento verificável) |

**Nota 88/100 (autoavaliação, estimativa).** Descontos: −5 sem prova social verificável, −4 sem dado próprio de resposta (pendências nº 1, 2 e 8), −3 preços ainda em placeholder. O texto está pronto para o teste; **a aprovação de desempenho só vem dos dados da seção 8**.

### 9.3 Checagem Sugarman (ferramenta, não redator)

O arquivo `sugarman-30-triggers.md` **não existe neste repositório**; a checagem usou os 18 gatilhos listados na persona (`squads/copy-master/agents/joe-sugarman.md`). Aplicados e pertinentes ao canal (12): envolvimento (pedido de teste), honestidade, integridade, autoridade (leve), curiosidade (C, D+1), urgência (só a real), gratificação imediata (prévia hoje), simplicidade (um passo por mensagem), relação humana, especificidade, familiaridade (Maps, bairro), esperança (o cliente pede em poucos toques, sem prometer resultado). **Excluídos de propósito** (6): culpa (proibido, CDC art. 39), exclusividade/escassez falsa, coleção, pertencimento, medo de perda inventado, narrativa longa (não cabe em mensagem de 5 linhas). Cobertura dos pertinentes: 12/12; dos 18 listados: 12/18 (67%). **Não atinge 80% dos 30 gatilhos por escolha de canal e compliance**, e não faz sentido forçar: um texto frio de 5 linhas com culpa, escassez falsa e medo derrubaria o número e violaria o compliance.

### 9.4 Pendências que afetam estes scripts (para o orquestrador registrar em `99-pendencias.md`)

1. Preços `[PREÇO_BIO]`, `[PREÇO_SITE]`, `[PREÇO_COMBO]` (Hormozi Squad), e se haverá degrau, parcelamento ou desconto para "tá caro".
2. Prazos 14 dias / 12 meses / 7 dias / 90 dias (Felipe) e número de atualizações de manutenção por mês.
3. `[TERMO]` curto revisado por advogado; política de domínio e como pagar o 1º ano de domínio em conta de terceiro (pendência nº 9).
4. Nota fiscal e dados de cobrança Pix (pendência nº 6): `[CHAVE_PIX]`, `[FAVORECIDO]`.
5. Prévia: confirmar que o gerador entrega token, `noindex`, banner "não oficial", expiração e botão de pedido em modo teste (compliance G5/R14), pois o texto 3.1 depende disso.
6. Prazo real de produção da prévia depois do "sim" ("ainda hoje" só se houver fila para isso) e `[PRAZO_ENTREGA]` da versão final.
7. Confirmar com teste de produto o que o catálogo do WhatsApp e os planos grátis entregam (pendência nº 10) antes de afirmar diferença em texto.
8. Lista de leads com iFood marcado (sim/não) e link da bio (sim/não), para o ângulo A/C só entrar com fato conferido.
9. Reverificar os números do iFood antes de escalar (planos mudam).
