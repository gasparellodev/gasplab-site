# Compliance e riscos — prospecção ativa em massa + previews gratuitos (GaspLab)

> Versão 1.0 · 01/10/2026 · Autor: agente `analyst` (Atlas), foco em riscos e compliance · Escopo: somente GaspLab.
> Não é parecer jurídico. Termos de serviço, contrato e política de privacidade finais devem passar por advogado antes de escalar.
> Convenções (README da base): fonte = URL + data de acesso (todas acessadas em **01/10/2026**); **estimativa** = número da análise sem fonte oficial; **a confirmar** = dado interno ou externo não verificado.

---

## 1. Resumo executivo

1. **A Cloud API oficial do WhatsApp não deve ser usada para abordagem fria.** A política da Meta só permite iniciar contato com quem deu opt-in; sem isso o risco é limite de envio, templates pausados e perda do número ou do portfólio. Primeiro contato: ligação pedindo permissão, ou mensagem 1:1 humana, curta, sem link, em número dedicado. A Cloud API entra depois do opt-in.
2. **LGPD não é o gargalo, mas não substitui a regra da plataforma.** Legítimo interesse (art. 7º IX e art. 10) cobre contato B2B com dado público, desde que haja teste de balanceamento documentado, origem informada, canal de oposição e lista de supressão.
3. **Hospedagem é o risco técnico imediato:** o plano Hobby da Vercel é só para uso não comercial e a própria definição inclui "receber pagamento para criar, atualizar ou hospedar o site". Migrar para Vercel Pro (US$ 20/mês) ou Cloudflare antes da primeira venda.
4. **Prévia com marca de terceiros precisa de proteção:** link privado, noindex, banner "não oficial", expiração e remoção em 24 h; não copiar avaliações do Google; da Places API guardar só o `place_id`.
5. **"Domínio e manutenção sem custo para sempre" é passivo:** custo recorrente (R$ 40/ano por domínio) sem receita recorrente, oferta que vincula (CDC arts. 30, 35, 47, 51) e a GaspLab responsável por domínio de terceiro. Redigir com prazo, domínio no nome do cliente e regra de continuidade (seção 5).

**Os 3 riscos que podem parar a operação na primeira semana:** R01 (banimento do número de WhatsApp), R07 (suspensão por uso comercial na Vercel Hobby, que derruba também sites já vendidos) e R10 (promessa "para sempre": irreversível depois que o primeiro cliente compra).

---

## 2. Respostas diretas às perguntas da pesquisa

| Pergunta | Resposta |
|---|---|
| Posso usar a Cloud API do sistema para abordagem fria? | **Não.** A Política de Mensagens Comerciais (atualizada em 23/09/2026 segundo a página) diz que a empresa só pode contatar quem forneceu o número e deu opt-in confirmando que quer receber mensagens. Template de abordagem fria é categoria *marketing* (R$ 0,32 por mensagem entregue, **a confirmar** no rate card oficial) e sofre bloqueios e denúncias, que derrubam a qualidade e podem pausar o template. |
| Qual canal para o primeiro contato? | Ordem recomendada: (1) **ligação curta** pedindo permissão para enviar a prévia por WhatsApp, com opt-in registrado no sistema (o fluxo "Autorização registrada durante ligação" já existe); (2) opt-in coletado por outro canal (presencial, e-mail, formulário), aceito pela Meta se identificar a empresa e for claro; (3) **mensagem 1:1 manual** pelo WhatsApp Business App em número dedicado: tolerada na prática por baixo volume e relevância, mas tecnicamente sem opt-in. É risco residual que o Felipe decide conscientemente; (4) DM manual no Instagram (uma mensagem de texto); (5) escalar depois com anúncios Click-to-WhatsApp, que geram opt-in. |
| O WhatsApp Business App (não API) tem regra própria? | Os Termos do WhatsApp proíbem mensagens em massa, automáticas e discadores. O texto da política não distingue produto, e a página de termos separa "Termos do Business App" e "da Plataforma"; **não confirmei** se a política é incorporada literalmente aos Termos do Business App. Tratar como aplicável. O enforcement é por denúncia, bloqueio e detecção de padrão. |
| Existe limite diário "seguro" oficial? | **Não encontrado.** Nem a Meta nem o Instagram publicam. Fontes secundárias convergem em "comportamento pesa mais que volume". Os tetos da seção 4 são **estimativa** conservadora. |
| Instagram permite DM em massa ou automação? | Não para abordagem fria. A API de mensagens só permite enviar a quem escreveu primeiro, com janela de 24 h. Automação não oficial viola os Termos. Seção 8.2. |
| LGPD permite prospectar com dados do Google Maps? | Sim, em tese, por legítimo interesse, com as salvaguardas da seção 8.3. Dados de pessoa jurídica não são dado pessoal. Nome do dono, celular pessoal e perfil do dono (inclusive de MEI) são. |
| "Não Me Perturbe" se aplica? | O cadastro nacional da Anatel cobre telecom e crédito consignado, não este caso. **Mas** a lei paulista 17.334/2021 estendeu o "Não Me Ligue" (Procon-SP) a SMS e WhatsApp. Se a lead for de SP e o número estiver cadastrado, não pode receber. Seção 8.4. |

---

## 3. Matriz de riscos

Escala: Probabilidade A (alta) / M (média) / B (baixa). Impacto: Crítico (para a operação) / Alto / Médio / Baixo. Donos: **Gabriel** = prospecção; **Felipe** = decisão e produção de previews; **Vinícius** = engenharia e sistema.

| # | Risco | Prob. | Impacto | Mitigação concreta | Dono |
|---|---|---|---|---|---|
| R01 | **Banimento ou restrição do número de WhatsApp** por abordagem fria (texto repetido, volume, bloqueios e denúncias). É o canal único de prospecção e de fechamento. | A | Crítico | (a) Número **dedicado à prospecção**, nunca o número de fechamento, suporte ou cobrança. (b) Tetos e aquecimento da seção 4. (c) Mensagem 1:1, escrita pelo humano, variada, sem link, com origem e opt-out. (d) Parar 48 h ao primeiro aviso do WhatsApp. (e) Nada de extensões, bots ou APIs não oficiais de disparo. (f) Plano B: Instagram e ligação ativos desde o dia 1. | Gabriel (execução), Felipe (decide canal) |
| R02 | **Uso da Cloud API para prospecção fria**: viola a política, derruba a qualidade, pausa templates, pode restringir o portfólio por 7 a 30 dias e, em caso extremo, proibir a organização de usar produtos WhatsApp. | A (se usada a frio) | Alto | Trava no sistema: template só para contato com `whatsapp_opt_in_at` preenchido (hoje a rota `whatsapp/send` não exige). Auto-opt-out por palavra-chave (PARAR, SAIR, NÃO) no webhook. Templates de abordagem fria **não** serão criados. | Vinícius |
| R03 | **Instagram**: bloqueio de ação ou limitação do perfil por DM repetida a não seguidores ou por automação. | M-A | Médio | Perfil dedicado; DM 100% manual; até 15 por dia (**estimativa**); sem link e sem mídia na primeira mensagem (mensagem de não seguidor vira "solicitação", só texto); sem ferramentas de automação. | Gabriel |
| R04 | **LGPD**: tratar dados de contato sem base documentada, sem transparência ou sem opt-out. Reclamação à ANPD ou ao Procon. | M | Médio | Teste de balanceamento de 1 página (modelo ANPD); mensagem 1 informa a origem ("achei vocês no Google Maps"); opt-out honrado na hora; lista de supressão permanente (só o mínimo para não recontatar); coletar só campos necessários; registrar origem e data de cada lead; retenção da seção 8.3. | Felipe (decide), Vinícius (sistema) |
| R05 | **Cadastro de bloqueio de telemarketing** (lei SP 17.334/2021 inclui WhatsApp e SMS; outros estados podem ter lei parecida, não verificado). Multa pelo Procon. | B-M | Médio | Para lead em SP, consultar o cadastro do Procon-SP antes de ligar ou escrever (como o fornecedor consulta: **a confirmar** no portal). Priorizar o telefone do estabelecimento, não celular pessoal. | Gabriel |
| R06 | **Termos do Google Maps Platform**: guardar nome, endereço e telefone vindos da Places API (a cláusula proíbe copiar e salvar nomes e endereços e só permite cachear IDs) pode levar à suspensão da chave. O sistema hoje grava telefone, site e endereço (`places.ts`, coluna `source = google_places`). | M | Médio | Persistir só `place_id` e buscar os detalhes na hora da exibição, ou coletar telefone e site da fonte do próprio negócio (site, Instagram) registrando a fonte. Pesquisa manual no Maps segue os termos do consumidor (**não analisados**). | Vinícius |
| R07 | **Uso comercial na Vercel Hobby**: a Vercel define como comercial qualquer deploy ligado a ganho financeiro de alguém envolvido, inclusive "receber pagamento para criar, atualizar ou hospedar o site" e "anunciar venda de produto ou serviço". Os exemplos atuais (`*.vercel.app`) e os sites vendidos entram. O plano da conta é **a confirmar**. | M | Crítico | Antes de vender: Vercel Pro (US$ 20/mês, 1 vaga de deploy e US$ 20 de crédito; domínios por projeto ilimitados, vs. 50 no Hobby) **ou** Cloudflare Pages/Workers (Free, 100 domínios por projeto). Preferir arquitetura multi-tenant (um deploy, vários tenants). | Vinícius |
| R08 | **Prévia pública com logo, fotos, cardápio e nome de terceiro**: direito autoral (Lei 9.610, arts. 29 e 79), marca e concorrência desleal (Lei 9.279, arts. 189 e 195 V), sinalização de phishing ou denúncia à Vercel (a política de uso aceitável proíbe se passar por outro e violar propriedade intelectual). | M | Alto | URL privada com token aleatório (não o nome do restaurante no subdomínio), `noindex` (meta e `X-Robots-Tag`) e `robots.txt` bloqueando, banner fixo "Prévia criada pela GaspLab; não é o site oficial de [Nome]", expiração automática (14 dias, **estimativa**), remoção em até 24 h a pedido, só material público do próprio negócio, log de origem de cada ativo. | Felipe |
| R09 | **Copiar avaliações do Google** ("Quem já provou" no exemplo Genesis): a cláusula do Google proíbe copiar e salvar avaliações, e há autoria e dado pessoal dos avaliadores. | M | Médio | Não replicar texto, nome ou foto de avaliação. Mostrar nota e link "ver avaliações no Google", ou depoimentos que o restaurante autorizou por escrito. | Felipe |
| R10 | **Promessa "domínio e manutenção sem custo, para sempre"**: oferta vincula e integra o contrato (CDC art. 30; consumidor pode exigir o cumprimento, art. 35); omissão de dado essencial é publicidade enganosa (art. 37 §3º); cláusula ambígua é lida a favor do cliente (art. 47); rescisão só pela GaspLab é nula (art. 51 XI). Custo recorrente sem receita recorrente. | A (já é a oferta) | Alto | Redação segura da seção 5: prazo definido, o que é "manutenção", domínio no nome do cliente, regra de descontinuidade com aviso e entrega do site, direito de saída do cliente. Pedir ao hormozi-squad a conta de continuidade (item de pendência). | Felipe (decide), advogado (revisa) |
| R11 | **Domínio registrado em nome da GaspLab**: o titular responde por violações e por disputas (CGI.br 2008/008, art. 5º I); trocar a titularidade exige procedimento formal (fontes secundárias falam em documentos notariais); domínio com marca de terceiro em nome da GaspLab abre disputa via SACI-Adm por má-fé. Custo de R$ 40/ano por domínio, indefinidamente. | M | Alto | Titular = **CPF ou CNPJ do cliente** (o Registro.br aceita pessoa física e jurídica). A GaspLab pode orientar o cadastro e pagar o 1º ano (**a confirmar** como pagar domínio de conta de terceiro). Nunca registrar o domínio de um restaurante em nome próprio "para reservar". | Felipe |
| R12 | **Direito de arrependimento de 7 dias** (CDC art. 49) em contratação por telefone ou WhatsApp, se o cliente for tratado como consumidor. A STJ aplica o CDC à PJ que **comprovar** vulnerabilidade; porte de microempresa, por si só, não basta. Com caixa zero, um estorno dói. | M | Médio | Assumir que MEI e restaurante pequeno podem invocar o CDC. Política de reembolso de 7 dias escrita no termo; entrega rápida, mas sem vender como "irreversível". | Felipe |
| R13 | **Cobrar pelo preview** ou pressionar com "já está pronto, você me deve": serviço sem solicitação equivale a amostra grátis, sem obrigação de pagamento (CDC art. 39 III e parágrafo único); executar serviço sem orçamento e autorização expressa é prática abusiva (art. 39 VI). | M | Baixo-Médio | Preview sempre apresentado como gratuito e sem compromisso; começar a "produção" paga só com aceite expresso (mensagem registrada) do orçamento. | Gabriel |
| R14 | **Preview vira "site oficial" por vazamento do link**: cliente final pede no WhatsApp do restaurante com preço desatualizado. | B-M | Médio | Botão de pedido da prévia em modo teste (mensagem prefixada "[TESTE DA PRÉVIA]", enviada para o número do lead), preços marcados "exemplo", banner e noindex. | Felipe |
| R15 | **Ferramentas não oficiais de WhatsApp** (extensões, bots, Z-API/Baileys, automação do WhatsApp Web): os Termos proíbem engenharia reversa, modificação, envio automático e em massa. Banimento. | M | Alto | Proibido no projeto. Se for preciso escalar, só Cloud API oficial **depois** do opt-in. | Vinícius |

---

## 4. Regras operacionais para o prospector (Gabriel)

### Faça

1. **Primeiro contato com identificação, origem, pergunta de permissão e saída**, sem link. Modelo:
   > "Oi, [nome]! Aqui é o Gabriel, da GaspLab. Vi o [Restaurante] no Google Maps e as avaliações são ótimas. Fazemos páginas de cardápio com pedido pelo WhatsApp para restaurantes. Posso te mandar uma prévia gratuita, com a marca de vocês, sem compromisso? Se preferir não receber mensagens, é só avisar que não escrevo mais."
2. **Só envie o link da prévia depois do "sim"** (a resposta abre a conversa e evita link na primeira mensagem).
3. **Peça opt-in explícito** antes de mensagens futuras: "Posso te mandar por aqui a prévia e os valores? Responda SIM". Registrar `whatsapp_opt_in_at` e a fonte no sistema.
4. **Escreva e envie à mão**, variando o texto; intervalos irregulares de 2 a 5 minutos (**estimativa**). Personalize ao menos uma frase (cidade, prato, nota).
5. **Use número dedicado** de prospecção. Perfil comercial completo (nome, foto, descrição, site). Nunca o número de fechamento, suporte ou cobrança.
6. **Respeite os tetos (estimativa; a Meta não publica números):**
   - número novo ou sem histórico: 10 novos contatos/dia nos dias 1 a 3; 20/dia nos dias 4 a 7; depois +5/dia por semana enquanto não houver sinal ruim, até 40/dia;
   - número aquecido (30+ dias de uso normal, conversas de ida e volta): 30/dia, teto de 50/dia;
   - Instagram: até 15 DMs a não seguidores por dia, perfil dedicado;
   - respostas a quem escreveu primeiro não contam no teto.
7. **Horário:** dias úteis, fora do pico de almoço e jantar (sugestão: 14h30 às 17h30). Restaurante ocupado bloqueia e denuncia mais.
8. **Um follow-up só**, 48 a 72 h depois, se não houve resposta. Depois disso, encerrar e não voltar por 90 dias (**estimativa**).
9. **Marcar `do_not_contact` na hora** (com motivo) para "não", "pare", "quem é você?" irritado, bloqueio ou número que pediu para sair. Nunca recontatar.
10. **Registrar origem** de cada lead (Google Maps, `place_id`, data) e anotar se o número é do estabelecimento ou pessoal.
11. **Ligação:** telefone do estabelecimento; identifique-se, diga o motivo, peça a permissão para enviar a prévia por WhatsApp e registre o aceite. Para lead em SP, conferir o cadastro do Procon-SP.

### Não faça

1. Não envie link, foto, PDF ou áudio na primeira mensagem.
2. Não copie e cole o mesmo texto para vários contatos, nem use disparo, lista de transmissão para quem não salvou o número, extensão, bot ou automação do WhatsApp Web.
3. Não use a Cloud API do sistema (template) para quem não tem opt-in registrado.
4. Não prometa "para sempre", "vitalício", "sem custo nunca mais", "grátis" para algo pago, nem resultado ("vai dobrar seus pedidos"). Use só a redação da seção 5.
5. Não diga que a GaspLab "é parceira" ou "foi indicada" por Google, Meta, iFood ou pelo próprio restaurante, e não afirme que a prévia é o site oficial.
6. Não cobre, nem sugira dívida, pela prévia (amostra grátis, CDC art. 39).
7. Não continue depois de um "não", e não insista por outro canal ou outro número da mesma pessoa.
8. Não envie para celular pessoal do dono encontrado fora do Google Maps e do site do negócio.
9. Não use a prévia com avaliação copiada do Google, logo de terceiros (iFood, Keeta, 99Food: usar link de texto) ou foto de fonte desconhecida.
10. Não registre domínio em nome da GaspLab nem de você mesmo para o cliente.

### Gatilhos de parada (kill switch)

- Qualquer aviso do WhatsApp na tela sobre conta ou restrição: **parar 48 h**, revisar texto e volume com o Felipe.
- Dois pedidos de saída ou reclamações no mesmo dia: parar o dia e revisar o texto.
- Mais de 30% das mensagens do dia sem entrega (um tique só): conferir se os números têm WhatsApp, antes de seguir.
- Notificação do Procon, da ANPD ou de um restaurante: Felipe responde em até 24 h e a lead entra em supressão.

### Tensão com a meta (para decisão do Felipe)

Meta de R$ 15.000 com ticket de R$ 597 são **26 vendas** em 15 dias. Os tetos acima dão, com a rampa, algo na casa de **450 a 600 contatos frios** no período (**estimativa**), o que exige **≈ 4% a 6% de conversão do contato frio à venda** (26 ÷ 450 = 5,8%; 26 ÷ 600 = 4,3%). Sem histórico (pendência nº 1 da base) é uma conversão otimista. O compliance não resolve isso: o caminho é somar canais permission-based (ligação com aceite, base quente de clientes, Click-to-WhatsApp). Não "compensar" subindo o volume do número.

---

## 5. Redação segura da oferta (hospedagem e domínio sem criar passivo)

### 5.1 Princípios

1. Dizer **exatamente o que está incluso, por quanto tempo e o que acontece depois**. Oferta "suficientemente precisa" vincula (CDC art. 30); dado essencial omitido é publicidade enganosa (art. 37 §3º).
2. **Separar** cinco itens: criação (pagamento único), hospedagem, domínio, alterações e saída. Cada um com prazo e limite.
3. O domínio fica **no nome do cliente**. O cliente é o dono e pode levá-lo quando quiser.
4. A GaspLab **pode encerrar o serviço**, mas com aviso, entrega do site e sem deixar o domínio preso. O cliente **também pode sair a qualquer momento** (igualdade de direito, CDC art. 51 XI).
5. Não prometer resultado de vendas, e não chamar de "grátis" nada que faz parte de um serviço pago. A prévia é grátis; o resto é parte do preço.
6. Preço e prazo na mesma frase. Termo em linguagem simples, enviado por escrito antes do pagamento.

### 5.2 Frases que **não** usar × versão segura

| Evitar | Usar |
|---|---|
| "Pague uma vez e não paga nunca mais" | "Pagamento único de R$ 597 pela criação do site, com hospedagem e manutenção básica incluídas por 12 meses." |
| "Domínio e hospedagem para sempre, sem custo" | "O domínio .com.br fica no seu nome. Pagamos o 1º ano. Depois, a renovação do domínio é com você (hoje R$ 40/ano no Registro.br). A hospedagem segue sem mensalidade enquanto mantivermos o serviço, com aviso de 90 dias antes de encerrar e entrega do site." |
| "Manutenção vitalícia" | "Manutenção básica: correção de erros do site e até [N] atualizações de cardápio por mês nos 12 meses incluídos. Depois, atualizações avulsas ou plano opcional." |
| "Sem mensalidade" (isolado) | "Sem mensalidade pelos 12 meses incluídos; depois disso, só o que está descrito no termo." |
| "Prévia grátis, é só aprovar e pagar" | "A prévia é gratuita e sem compromisso. Só começamos a versão final depois do seu aceite por escrito." |
| "Vamos aumentar seus pedidos" | "Facilita o pedido pelo WhatsApp e deixa seu cardápio organizado." |
| "Site oficial do restaurante" (na prévia) | "Prévia criada pela GaspLab com a identidade do restaurante" |

### 5.3 Texto de oferta curto (WhatsApp, depois do "sim")

> "Segue a prévia: [link]. Ela é gratuita e expira em 14 dias. Se gostar, o valor é R$ 597 em pagamento único e inclui: criação do site, hospedagem e manutenção básica por 12 meses, e o domínio .com.br registrado no **seu** nome (pagamos o 1º ano). Depois dos 12 meses, a renovação do domínio é sua (R$ 40/ano no Registro.br) e a hospedagem continua sem mensalidade, com aviso prévio de 90 dias se um dia deixarmos de oferecer. Você pode cancelar quando quiser e leva seu site e seu domínio. Se desistir em até 7 dias após pagar, devolvemos o valor. Quer que eu mande o termo?"

> Numerais (12 meses, 14 dias, 90 dias, "até N atualizações") são **decisão do Felipe**; mantive os do rascunho para ter um texto fechado. Se a decisão for outra, o texto muda, não a estrutura.

### 5.4 Cláusulas-base do termo (rascunho para o advogado revisar)

1. **Objeto e preço:** criação do site descrito no anexo, por R$ 597, pagamento único.
2. **Hospedagem e manutenção incluídas:** 12 meses a contar da publicação. "Manutenção" = correção de defeitos do site e até [N] atualizações de conteúdo por mês. Não inclui novas páginas, integrações, anúncios nem suporte de domínio de terceiros.
3. **Continuidade após o prazo:** hospedagem sem mensalidade por liberalidade da GaspLab, **enquanto mantiver o serviço**. Encerramento só com aviso de 90 dias, entrega do código e dos arquivos e apoio à migração sem custo.
4. **Domínio:** registrado no CPF ou CNPJ do cliente (titular, nos termos do Registro.br). A GaspLab paga a 1ª anuidade. A renovação é do cliente, e a GaspLab avisa 30 dias antes do vencimento. O cliente responde pelo nome escolhido (CGI.br 2008/008, art. 5º).
5. **Conteúdo do cliente:** o cliente declara ter direitos sobre logo, fotos, textos e cardápio entregues e autoriza a GaspLab a hospedá-los e exibi-los **somente** para executar o serviço; a GaspLab remove material questionado em até 24 h.
6. **Direito de saída:** o cliente pode rescindir a qualquer momento e levar o site e o domínio. Reembolso integral em até 7 dias da contratação (CDC art. 49).
7. **Limitação de responsabilidade:** limitada ao valor pago (para PJ a limitação é admitida "em situações justificáveis", CDC art. 51 I). Sem garantia de resultado comercial.
8. **Privacidade:** quem é controlador e operador dos dados dos clientes finais do restaurante (pedidos pelo WhatsApp não passam pela GaspLab: a mensagem vai direto ao restaurante). Canal do titular.
9. **Prévia:** gratuita, de caráter ilustrativo, sem obrigação de contratar e sem direito da GaspLab a cobrar por ela (CDC art. 39 p.ú.).

### 5.5 A conta que justifica o prazo (por que "para sempre" é passivo)

- Domínio .com.br: **R$ 40/ano** por cliente, fixo (Registro.br). Isso é 6,7% do ticket por ano e 33,5% em 5 anos. Com 26 clientes: R$ 1.040/ano; com 100: R$ 4.000/ano, para sempre.
- Hospedagem multi-tenant: custo fixo (Vercel Pro US$ 20/mês de plataforma, com 1 vaga e US$ 20 de crédito; **câmbio a confirmar**) e marginal baixo por cliente. O risco aqui é de **continuidade e suporte**, não de infra.
- Se o domínio ficar no nome da GaspLab, o passivo é duplo: custo recorrente e responsabilidade de titular. Se ficar no nome do cliente e a renovação for dele, o passivo some.
- Alternativa comercial (a decidir com o hormozi-squad, `knowledge/30-oferta/`): plano de continuidade **opcional** pago, para quem quiser manutenção e atualização depois dos 12 meses. Valor **a definir**.

---

## 6. Ajustes no sistema interno (guardrails de compliance)

Código lido: `lib/integrations/meta.ts`, `lib/integrations/places.ts`, `app/api/operacao/whatsapp/send/route.ts`, migração `202609300001_operation_foundation.sql`.

| # | Hoje | Ajuste |
|---|---|---|
| G1 | A rota `whatsapp/send` bloqueia `do_not_contact` e texto fora da janela de 24 h, mas **permite template para contato sem opt-in**. | Exigir `contacts.whatsapp_opt_in_at` não nulo para qualquer template. Erro 403 com mensagem clara. |
| G2 | Não há tratamento de opt-out por palavra-chave. | No webhook, mensagem inbound com PARAR, SAIR, NÃO QUERO, CANCELAR marca `do_not_contact` com motivo e responde confirmando. |
| G3 | `places.ts` e `leads` persistem nome, endereço, telefone e site da Places API. | Persistir `place_id` (cacheável) e resolver o restante sob demanda; telefone entra por coleta do operador com fonte registrada. |
| G4 | `source_reference` registra o `place_id`, mas não a data nem a base legal. | Acrescentar `source_collected_at` e `lawful_basis = legitimate_interest`. |
| G5 | Previews: não verifiquei o gerador. | Exigir token aleatório, `noindex`, banner de prévia, expiração e rota de remoção. |
| G6 | Sem lista de supressão separada. | Guardar hash do telefone dos que pediram saída, retido por prazo indeterminado, para evitar recontato. |

---

## 7. Checklist D-0 (antes do primeiro envio de 02/10/2026)

- [ ] Confirmar o plano da conta Vercel. Se Hobby: migrar para Pro ou para Cloudflare antes de vender (R07).
- [ ] Número de prospecção dedicado, com perfil completo; número de fechamento separado (R01).
- [ ] Texto do primeiro contato aprovado (modelo da seção 4), sem link.
- [ ] Lista de supressão criada (planilha ou campo `do_not_contact`) e conhecida por Gabriel.
- [ ] Prévias com `noindex`, banner "não oficial", URL com token e sem nome do restaurante no subdomínio (R08, R14).
- [ ] Decisão do Felipe sobre a oferta (seção 5) e termo curto pronto para enviar antes do pagamento (R10, R11, R12).
- [ ] Trava G1 no sistema, ou regra manual "template só com opt-in" até a trava subir.
- [ ] Teste de balanceamento de legítimo interesse de 1 página, salvo em `knowledge/40-riscos/` (R04).

---

## 8. Evidências por tema

Legenda de confiança: **[Oficial]** texto da própria Meta, do governo ou do fornecedor; **[Secundária]** blog, notícia ou agregador; **[Estimativa]** conclusão da análise.

### 8.1 WhatsApp

- **Opt-in:** a empresa só pode contatar quem forneceu o número ou nome de usuário **e** deu permissão confirmando que quer receber mensagens ou ligações seguintes. Também: não enganar, não fazer spam, não surpreender; respeitar pedidos de parar; usuários podem bloquear e denunciar, e os sistemas podem limitar o envio com base nisso; encerramento da conta pode vetar toda a organização de produtos WhatsApp. **[Oficial]** Página atualizada em 23/09/2026 segundo o próprio texto, **reverificar antes de escalar**. https://whatsappbusiness.com/policy/ (redireciona de https://business.whatsapp.com/policy), acesso 01/10/2026.
- **Diretrizes gerais:** proíbem mensagens em massa, automáticas, discador e "contato repetido indesejado"; moderação automatizada mais revisão humana; suspensão temporária ou permanente de contas. **[Oficial]** https://www.whatsapp.com/legal/messaging-guidelines, acesso 01/10/2026.
- **Termos de Serviço:** proíbem uso envolvendo mensagens em massa, mensagens automáticas e discagem automática, bem como engenharia reversa e modificação do cliente; uso não pessoal só quando autorizado. **[Oficial]** (última atualização 04/01/2021) https://www.whatsapp.com/legal/terms-of-service, acesso 01/10/2026.
- **Métodos de opt-in aceitos:** SMS, site, telefone (IVR), presencial ou papel. Exigências: deixar claro que a pessoa está aceitando receber comunicação, citar o nome da empresa e cumprir a lei aplicável. **[Oficial]** https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in, acesso 01/10/2026.
- **Preço:** desde 01/07/2025 é por mensagem de template entregue; categorias marketing, utility, authentication, service (service gratuito). Cobrança em BRL por entidade local para negócios elegíveis a partir de 01/07/2026, com migração obrigatória até 30/06/2027; a atualização de 01/10/2026 não lista mudança de tarifa para o Brasil. **[Oficial]** https://developers.facebook.com/docs/whatsapp/pricing e https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing/, acesso 01/10/2026. **Valores:** R$ 0,3217 (marketing) e R$ 0,035 (utility) por mensagem, segundo agregadores, com data de verificação setembro/2026: **[Secundária]** https://whautomate.com/whatsapp-business-api-pricing-brazil e https://www.messagecentral.com/blog/whatsapp-business-api-pricing-brazil, acesso 01/10/2026. **A confirmar** no rate card oficial (a página oficial não exibiu os números).
- **Categorias de template:** conteúdo promocional vira *marketing*; utility só para mensagem não promocional de conta ou transação; reclassificação automática; uso indevido gera advertência, limite de taxa, suspensão de utility e restrição do portfólio por 7 a 30 dias. **[Oficial]** https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines/, acesso 01/10/2026. Templates com feedback negativo ou baixa leitura ficam pausados e há teto por usuário para templates de marketing: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview, acesso 01/10/2026.
- **Limites (tiers):** 250 contatos únicos por 24 h (padrão), 2.000, 10.000, 100.000, ilimitado; subir exige qualidade alta e uso de pelo menos 50% do limite em 7 dias; para chegar a 2.000, verificação de empresa ou 2.000 entregas de qualidade em 30 dias. **[Oficial]** https://developers.facebook.com/docs/whatsapp/messaging-limits, acesso 01/10/2026. Limite medido por portfólio desde out/2025: **[Secundária]** https://chatarmin.com/en/blog/whats-app-messaging-limits.
- **Business App:** a página de ajuda descreve banimento por spam e mensagens em massa; envio de marketing suspenso por 3 dias após aviso por denúncias e bloqueios; transmissão limitada a 256 contatos e só chega a quem salvou seu número. **[Oficial, via índice de busca: as páginas do Help Center renderizam por JavaScript e não carregaram integralmente]** https://faq.whatsapp.com/723378546580115 e https://faq.whatsapp.com/740266744985664; o limite de 256 é **[Secundária]** https://blueticks.co/blog/whatsapp-business-app-limitations, acesso 01/10/2026.
- **Números "seguros":** **não encontrado em fonte oficial.** Fontes secundárias brasileiras tratam prospecção fria, texto repetido e números novos com picos como os maiores gatilhos, sem dar teto: https://inteligentegestao.com.br/artigo/whatsapp-banimento-numeros-comerciais-2026/, https://z-api.io/blog/o-que-e-banimento-no-whatsapp-e-como-proteger-a-operacao-da-sua-empresa-em-2026/, https://www.socialhub.pro/blog/frequencia-mensagens-whatsapp-business-quantas-vezes-semana/ (cadência de follow-up D1, D3, D7, no máximo 3 a 4 toques para lead com permissão), acesso 01/10/2026. Os tetos da seção 4 são **[Estimativa]**.

### 8.2 Instagram

- A API de mensagens só permite enviar a quem mandou mensagem antes, com 24 h de janela (e etiqueta de agente humano para estender). Resposta privada a comentário: dentro de 7 dias, uma por comentário. **[Oficial]** https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api e .../private-replies, acesso 01/10/2026.
- Política de plataforma: conteúdo promocional só dentro da janela de 24 h ou em mensagens patrocinadas; bots devem identificar-se como automáticos; descumprimento pode restringir o envio. **[Oficial]** https://developers.facebook.com/documentation/business-messaging/messenger-platform/policy, acesso 01/10/2026.
- Termos de Uso proíbem criar contas ou acessar e coletar informação por meios não autorizados (inclui scripts, bots e scrapers). **[Secundária; o texto integral em help.instagram.com/581066165581870 não carregou]**, citado por resultados de busca, acesso 01/10/2026.
- **Limites diários:** a Meta não publica. Fontes secundárias falam em 5 a 10 DMs frios por dia para conta nova, 20 a 40 para conta estabelecida, e bloqueio de ação de 24 a 48 h ao exceder: https://ainfluencer.com/instagram-dm-limit/, https://flowgent.ai/blog/instagram-dm-limits-how-many-messages-you-can-send-daily, https://www.usewave.co/blog/instagram-dm-limits. Mensagem a não seguidor vira "solicitação" e só aceita uma mensagem de texto até ser aceita (**[Secundária]** https://www.thewhitehatter.ca/post/yes-instagram-introduces-new-features-to-enhance-user-safety-in-direct-messages). Teto de 15/dia é **[Estimativa]**.

### 8.3 LGPD (Lei 13.709/2018)

- **Alcance:** protege dado de **pessoa natural** (art. 1º, art. 5º I). Razão social, CNPJ e telefone fixo de empresa não são dado pessoal; nome do dono, celular dele e perfil pessoal (inclusive MEI) são. **[Oficial]** https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm, acesso 01/10/2026.
- **Base legal:** art. 7º IX (legítimo interesse do controlador, exceto se prevalecerem direitos e liberdades do titular); art. 7º §3º (dado público: considerar finalidade, boa-fé e interesse público da disponibilização) e §4º (dispensa de consentimento para dado manifestamente público, resguardados direitos e princípios); art. 10 (finalidade legítima de situação concreta, "apoio e promoção de atividades do controlador"; só dados estritamente necessários; transparência; ANPD pode pedir relatório de impacto); art. 18 §2º (titular pode se opor); art. 37 (registro das operações, "especialmente" no legítimo interesse); art. 52 II (multa de até 2% do faturamento, máximo R$ 50 milhões por infração). **[Oficial]**.
- **Guia da ANPD:** legítimo interesse exige finalidade legítima, situação concreta, necessidade, balanceamento entre interesse e legítimas expectativas do titular e salvaguardas; recomenda **teste de balanceamento documentado** (3 fases) e canal acessível para descadastrar, opor-se e pedir eliminação. **[Oficial]** Guia Orientativo v1.0 (fev/2024), publicado no portal em 22/11/2024: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse, acesso 01/10/2026. O guia **não trata especificamente** de prospecção B2B com dados do Google Maps: a aplicação é inferência desta análise.
- **Pequeno porte:** a Resolução CD/ANPD 2/2022 dispensa a indicação de encarregado e admite registro simplificado das operações. Se a GaspLab se enquadra: **a confirmar** (porte, regime). **[Oficial, via busca]** https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022, acesso 01/10/2026.
- **Retenção:** a LGPD **não fixa prazo**; exige eliminar quando acaba a finalidade (arts. 15 e 16). **[Estimativa]**: lead sem resposta, 6 meses; lead em supressão, só o mínimo (hash do telefone) por tempo indeterminado; cliente, pelo prazo do contrato e das obrigações fiscais (validar com o contador).
- **Distinção que importa:** a base legal da LGPD (legítimo interesse) **não** autoriza o envio no WhatsApp: a política da plataforma é uma camada contratual separada e mais restritiva.

### 8.4 "Não Me Perturbe" e telemarketing

- Plataforma nacional da Anatel: bloqueia ofertas por telefone de empresas de telecomunicações e instituições financeiras (empréstimos e consignados). A adesão das operadoras passou a ser obrigatória em 02/09/2025, prazo de 60 dias. **Não cobre** oferta de site para restaurante. **[Oficial/Secundária]** https://www.naomeperturbe.com.br/ e https://site.mppr.mp.br/consumidor/Noticia/Anatel-unifica-bloqueio-de-telemarketing-com-adesao-obrigatoria-ao-Nao-Me, acesso 01/10/2026. Se cobre WhatsApp: não informado nas fontes.
- **São Paulo:** a Lei 17.334/2021 estendeu o cadastro "Não Me Ligue" (Lei 13.226/2008) a SMS e aplicativos como WhatsApp; vale 30 dias após o cadastro; fornecedores e empresas de telemarketing devem respeitar o cadastro; multa pelo Procon-SP (valor não informado nas fontes). **[Secundária]** https://canaltech.com.br/legislacao/procon-sp-amplia-lei-e-proibe-telemarketing-por-sms-ou-whatsapp-180681/ e https://teletime.com.br/12/03/2021/lei-estadual-inclui-sms-e-whatsapp-em-cadastro-nao-me-ligue-do-procon-sp/, acesso 01/10/2026. O texto da lei no portal da Alesp não carregou. Protege consumidores que se cadastraram (pessoa física); se aplica a restaurantes como "consumidor" é **a confirmar**. Outros estados: **não verificado**.
- **Anatel e prefixo 0303:** deixou de ser obrigatório em ago/2025 (chamada verificada para quem faz mais de 500 mil chamadas por mês). Irrelevante no volume da GaspLab. **[Secundária]** https://olhardigital.com.br/2025/08/12/pro/anatel-ligacoes-de-telemarketing-deixarao-de-ter-prefixo-0303/.

### 8.5 Google Places API / Google Maps

- Termos da Plataforma §3.2.3(a): proíbem exportar, extrair ou "scrape" conteúdo do Google Maps para uso fora dos serviços, incluindo guardar (pre-fetch, index, store, reshare, rehost), baixar em massa informações de lugares, e "copiar e salvar nomes de negócios, endereços ou avaliações de usuários"; §3.2.3(b): sem cache além do permitido. Termos Específicos: só IDs (como `place_id`) podem ser guardados. **[Oficial]** (última modificação 26/08/2026) https://cloud.google.com/maps-platform/terms e (10/06/2026) https://cloud.google.com/maps-platform/terms/maps-service-terms, acesso 01/10/2026.
- A cláusula de "lead generation" **não encontrada** no texto lido. O risco é de **restrição de armazenamento**, não de proibição de contato.

### 8.6 Hospedagem e domínio

- **Vercel Hobby:** "restrito a uso pessoal não comercial"; comercial = deploy usado para ganho financeiro de qualquer um envolvido na produção, **incluindo** pedir ou processar pagamento de visitantes, **anunciar venda de produto ou serviço**, "receber pagamento para criar, atualizar ou hospedar o site", afiliados, anúncios. Exceder pode levar a suspensão. **[Oficial]** https://vercel.com/docs/limits/fair-use-guidelines (atualizada em 14/09/2026), https://vercel.com/docs/plans/hobby e https://vercel.com/legal/terms, acesso 01/10/2026. Política de uso aceitável: proíbe se passar por terceiros, violar propriedade intelectual e spam: https://vercel.com/legal/acceptable-use-policy.
- **Vercel Pro:** US$ 20/mês de taxa de plataforma, com 1 vaga de deploy e US$ 20 de crédito mensal; vaga extra US$ 20/mês; viewers grátis; CDN de taxa fixa (1 milhão de requisições e 1 TB por mês); domínios por projeto **ilimitados** (limite flexível de 100.000) vs. **50** no Hobby; custom SSL e preview multi-tenant só Enterprise; limites de API: 100 domínios adicionados por hora por time. **[Oficial]** https://vercel.com/docs/plans/pro-plan (15/09/2026), https://vercel.com/docs/platforms/multi-tenant-platforms/limits (08/09/2026), https://vercel.com/docs/limits (16/09/2026), acesso 01/10/2026. Preço em R$: **não encontrado** (só USD, sem impostos).
- **Cloudflare:** Pages Free = 500 builds/mês, 20.000 arquivos por site, 100 domínios por projeto, 100 projetos por conta (docs atualizadas em 05/09/2026); Workers Free = 100.000 requisições/dia; Cloudflare for SaaS inclui 100 hostnames e cobra US$ 0,10 por hostname adicional. **[Oficial]** https://developers.cloudflare.com/pages/platform/limits/, https://developers.cloudflare.com/workers/platform/limits/ e https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/, acesso 01/10/2026. **Uso comercial no plano gratuito:** sem restrição nas páginas oficiais lidas; a confirmação de que o contrato (Self-Serve Subscription Agreement) permite vem de resposta em fórum da comunidade (não consegui abrir: HTTP 403) e dos resultados de busca: **[Secundária]**, **a confirmar** no texto do contrato https://www.cloudflare.com/terms/ antes de migrar.
- **Registro.br:** R$ 40,00 por ano para .com.br (a própria página institucional exibe na descrição). **[Oficial]** https://registro.br/ajuda/precos/, acesso 01/10/2026. Múltiplos anos: R$ 76 (2), R$ 111 (3), R$ 174 (5) **[Secundária]** https://blog.linkfl.com.br/como-registrar-um-dominio-com-br/.
- **Titularidade:** o registro é permitido a entidades que atuam legalmente no país, profissionais liberais e pessoas físicas (art. 2º); o registrante informa e mantém dados corretos (CPF ou CNPJ, art. 4º); **responde por ações judiciais ou extrajudiciais decorrentes de violação de direitos ou dano a terceiros pelo nome, uso e conteúdo**, e CGI.br/NIC.br ficam isentos (art. 5º I); falta de pagamento ou dados irregulares podem cancelar (art. 9º). **[Oficial]** Resolução CGI.br/RES/2008/008/P https://www.cgi.br/resolucoes/documento/2008/008/, acesso 01/10/2026. Troca de titularidade exige procedimento formal com documentos, e não só alteração online: **[Secundária]** https://www.wpboss.com.br/como-transferir-titularidade-dominio-registro-br/. Domínio vencido: suspenso e depois liberado (prazos variam por fonte): **[Secundária]** https://tudosobrehospedagemdesites.com.br/processo-de-liberacao-de-dominios-registro-br/, **a confirmar**.
- **Conflito com marca:** disputas por domínio idêntico ou confundível com marca registrada no INPI vão ao SACI-Adm quando há má-fé. **[Secundária, via busca]** https://registro.br/dominio/saci-adm/regulamento/, acesso 01/10/2026.

### 8.7 Logo, fotos e cardápio do restaurante em prévia não solicitada

- **Direito autoral (Lei 9.610/98):** fotografia é obra protegida (art. 7º VII); reprodução depende de autorização prévia e expressa do autor (art. 29); o autor da foto deve ser creditado quando usada por terceiros (art. 79 §1º); o titular pode pedir apreensão ou suspensão da divulgação, sem prejuízo de indenização (art. 102). **[Oficial]** https://www.planalto.gov.br/ccivil_03/leis/l9610.htm, acesso 01/10/2026. A foto do restaurante pode ser de fotógrafo terceiro, de plataforma de delivery ou de cliente: a posse da imagem pelo restaurante **não prova** que ele tenha cedido os direitos.
- **Marca (Lei 9.279/96):** o registro dá uso exclusivo ao titular (art. 129); reproduzir marca registrada sem autorização, de modo a induzir confusão, é crime (art. 189 I); usar indevidamente nome comercial, título de estabelecimento ou insígnia alheios é concorrência desleal (art. 195 V). **[Oficial]** https://www.planalto.gov.br/ccivil_03/leis/l9279.htm, acesso 01/10/2026. Na prática, o titular da marca no cenário é o próprio restaurante, que é o destinatário da prévia: o risco aparece quando a prévia fica pública, indexada, ou é vista por terceiros como "site oficial".
- **Boas práticas** (derivadas dos itens acima e do R08): link privado, `noindex`, banner "não oficial", expiração, remoção a pedido, só material público do próprio negócio com log da origem, crédito de fotógrafo quando conhecido. **[Estimativa]** (não há norma específica para "prévia comercial").
- **Cardápio:** receita e lista de pratos com preços são fatos; o texto autoral descritivo e as fotos são protegidos. Preço desatualizado numa prévia que vira pública pode induzir consumidor a erro (CDC art. 37), por isso "preços de exemplo" (R14).

### 8.8 Código de Defesa do Consumidor e promessas de longo prazo

- **Texto legal:** art. 30 (informação ou publicidade suficientemente precisa obriga o fornecedor e integra o contrato); art. 35 (recusa de cumprir a oferta: o consumidor escolhe entre cumprimento forçado, serviço equivalente ou rescindir com restituição e perdas e danos); art. 37 §1º e §3º (enganosa por ação ou omissão de dado essencial); art. 39 III e parágrafo único (serviço sem solicitação equivale a amostra grátis, sem obrigação de pagamento) e VI (executar serviço sem orçamento e autorização expressa); art. 47 (interpretação mais favorável ao consumidor); art. 49 (7 dias de arrependimento na contratação fora do estabelecimento, "especialmente por telefone"; devolução imediata e corrigida); art. 51 I, IV e XI (nulidade de cláusulas que exoneram, são iníquas ou permitem à fornecedora cancelar sozinha). **[Oficial]** https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm, acesso 01/10/2026.
- **Cliente PJ:** o STJ aplica a teoria finalista mitigada: a PJ pode ser consumidora se **comprovar** vulnerabilidade técnica, fática, jurídica ou informacional; ser microempresa não basta. **[Oficial]** https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/2024/08092024-Consumidor-pessoa-juridica-quando-as-empresas-podem-ter-a-protecao-do-CDC.aspx (08/09/2024), acesso 01/10/2026. Para um dono de restaurante pequeno que contrata site por WhatsApp, a vulnerabilidade técnica é um argumento plausível: **tratar como cliente protegido**.
- **Oferta vinculante online:** a oferta obriga mesmo quando está errada (regra geral), com exceção para erro grosseiro. **[Oficial]** TJDFT https://www.tjdft.jus.br/consultas/jurisprudencia/jurisprudencia-em-temas/cdc-na-visao-do-tjdft-1/o-consumidor-na-internet/responsabilidade-do-fornecedor-por-oferta-de-produto-na-internet, acesso 01/10/2026.
- **"Vitalício" / "para sempre":** **não encontrei jurisprudência específica sobre serviço digital "vitalício"** em fontes oficiais. A conclusão (oferta vincula, ambiguidade contra o fornecedor, cancelamento unilateral nulo, encerramento sem aviso é falha na prestação) é inferência dos arts. 30, 35, 47 e 51 e de decisões gerais sobre encerramento de atividade sem comunicação; **validar com advogado** a redação final.

---

## 9. Não encontrado e a confirmar

| Item | Situação |
|---|---|
| Tarifa BRL oficial por mensagem (marketing, utility) | Página oficial não exibiu os números; valores de agregadores com data de verificação set/2026. **A confirmar** no rate card (CSV/PDF) em https://business.whatsapp.com/products/platform-pricing#rates. |
| Limite diário "seguro" do WhatsApp Business App e do Instagram | Não existe em fonte oficial. Tetos da seção 4 são estimativa. |
| Texto integral das páginas do Help Center do WhatsApp e do Instagram | Carregam por JavaScript; consultei via índice de busca. Reverificar manualmente os artigos 723378546580115 e 740266744985664 do WhatsApp. |
| Se a política de mensagens é incorporada literalmente aos Termos do Business App | Não confirmado. |
| Plano atual da conta Vercel (Hobby ou Pro) e onde estão os sites já vendidos | A confirmar com o Felipe (pendência nº 7 da base). |
| Uso comercial no plano gratuito do Cloudflare | Sem restrição nas páginas oficiais lidas; confirmação do contrato só por fonte secundária. |
| Como o fornecedor consulta o cadastro "Não Me Ligue" do Procon-SP; leis de outros estados | Não verificado. |
| Texto da lei paulista 17.334/2021 na fonte oficial e valor das multas | Portal da Alesp não carregou. |
| Como pagar domínio de conta Registro.br de terceiro (titular = cliente) | A confirmar no Registro.br antes de prometer "pagamos o 1º ano". |
| Porte e regime da GaspLab (ME, MEI, startup) | A confirmar, para aplicar a Res. CD/ANPD 2/2022 e para o contrato. |
| Jurisprudência específica de "vitalício" em serviço digital | Não encontrada. |
| Termos de Serviço do Google para uso **manual** do Maps | Não analisados. |
| Cobrança (Pix, boleto, nota fiscal) e contrato: obrigações fiscais | Fora do escopo; ver pendência nº 6 da base. |
