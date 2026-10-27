# Bíblia do Vini — mascote da GaspLab

v1 · 06/10/2026 · Consolida `estrategia/01` a `09` com o fact-check aplicado. Nível visual: G2. Transparência: D-A7. "Pendente" = não afirmar.

## 1. Quem é o Vini

1. Vinícius Gasparello, fundador da GaspLab, em versão ilustrada, criada com IA a partir de fotos reais. A marca não esconde isso.
2. É guia: o cliente é o herói; o Vini escuta, explica o método e aponta o próximo passo.
3. Aparece quando alguém precisa de clareza: prévia, proposta, estados do site, conversa após a resposta do lead.
4. Nunca promete resultado, prazo ou número, nunca vende afobado, nunca "resolve" sozinho.
5. Nunca aparece no produto do cliente, nunca simula conversa ao vivo, nunca trata marcas da trajetória do fundador como clientes.

## 2. Arquitetura de marca

**O logo assina, o Vini conversa.** GaspLab é a marca-mãe: quem contrata, entrega e responde. O Vini é personagem, não submarca: sem logo próprio, nunca assina sozinho.

| Lidera | Superfície |
|---|---|
| Logo | contratos, documentos fiscais, termos, favicon, selo em produto de cliente, Brand Book, foto de perfil do número de prospecção |
| Vini (logo em 2º plano) | WhatsApp após a resposta do lead (figurinhas, card de prévia), CTA flutuante, estados de formulário, 404 |
| Divisão | hero e capa de proposta: a frase lidera, o Vini acompanha o CTA, o logo assina |

**Com time:** um personagem só. Outras pessoas aparecem com foto e nome próprios, nunca como Vini. Se quem responde o WhatsApp do site não for o Vinícius (pendência 25), o CTA vira "Falar com a GaspLab" e o Vini fica como guia do método e da interface. Um futuro "Vini assistente" se declara IA em toda conversa, com revisão humana.

**Nome "Vini" validado:** curto, memorável e é o apelido real (indício: @vini_gasparello). "Gasp" criaria um segundo nome e soaria como bot. O primeiro contato é "[nome de quem envia], da GaspLab", nunca "Vini, da GaspLab". Antes de merch: registro do personagem e termo de imagem (pendência 24).

## 3. Identidade visual

**Kit de identificação (igual em todas as poses)**
- Cabelo castanho-escuro ondulado, volume no topo, jogado para trás, mais longo na nuca.
- Barba curta e cheia, castanho-clara avermelhada, bigode definido; sobrancelhas grossas e retas; olhos castanhos levemente fundos.
- Argolas prateadas pequenas nas duas orelhas (no busto de 48 px, cerca de 1,4× maiores).
- Pino prateado pequeno na narina esquerda do personagem (direita de quem vê).
- Manga tatuada preto e cinza só no braço direito do personagem (esquerda de quem vê), virado para a câmera; um desenho único.
- Camiseta preta lisa, jeans escuro largo, tênis skate genérico cinza e branco, sem marca.

**Nível "D2+" (proposta para G2):** rosto de `styleboard-d/d25-02.png`, tênis de `d25-01.png`; folha de personagem a partir da foto HD e dos dois. Proporção adulta estilizada de 5,5 a 6 cabeças no prompt, medida do queixo ao topo do cabelo (o cabelo conta; os d25 ficaram perto do D2); olhos no máximo 10–15% maiores que o real, brilho único, pálpebra pesada; mãos com cinco dedos; cores chapadas, sombra em um nível, contorno uniforme em camada separada.

**Paleta**
- Cenário e acentos: tokens de `app/globals.css` (`background`, `sunken`, `deep`, `card`, `primary`, `signal`; `paper` na versão clara).
- Personagem: paleta própria, só na ilustração, para pele (tom quente), cabelo, barba e jeans; em código, tokens `--vini-*` (ex.: `--vini-skin`, `--vini-denim`), nunca hex em classe. Valores saem da folha aprovada (nenhum definido hoje); os nomes não podem colidir com as variáveis do rig (`--vini-hr`, `--vini-px`…).
- Nunca: verde, neon, gradiente fora dos tokens, cor de marca de terceiros.

**Proibido na imagem:** texto, números, marca d'água; logos de terceiros; swoosh ou listra lateral nos tênis; argola no nariz; tatuagem no braço esquerdo; balão desenhado (balão e legenda são feitos em código); robô, cérebro brilhando, foguete, partículas; anime, chibi. Zoom nos pés e no nariz antes de aprovar qualquer imagem.

## 4. Personalidade e voz

| É | Não é |
|---|---|
| Calmo, no ritmo de quem quer ser entendido | Afobado, com urgência de vendedor |
| Técnico sem jargão: processo e exemplo | Professor que exibe sigla |
| Confiante sem hype: separa fato de hipótese | Prometedor ("revoluciona", "garantido") |
| Atento: escuta antes de propor | Herói que resolve tudo sozinho |
| Leve: um sorriso, não uma piada | Infantil, sarcástico, de meme |

**Regras de fala**
- 1ª pessoa do personagem só quando o Vinícius envia (legenda "Oi, sou o Vini", assinatura "Vinícius, GaspLab") ou no balão do site (404). No hero: "Comece contando o seu cenário."
- Kit do Gabriel: legendas neutras (imperativo, pergunta, substantivo); a 1ª pessoa do texto é de quem envia; o processo da prévia vai no plural ("montamos", "usamos").
- Sem emoji institucional; no WhatsApp, no máximo 1 por mensagem, nunca em F05, F07 nem na despedida.
- Sem número, percentual, depoimento ou cliente citado; valem as proibições do `docs/CONTEXTO.md`.

**Bloqueado até as pendências 25–27**
- "Falar com o Vini" (25); usar "Falar com a GaspLab".
- "Quem responde é uma pessoa", em qualquer variação (25).
- "Seguimos só quando estiver de acordo" e a legenda "Revisar antes de seguir" (26).
- "A GaspLab vai ler o que você enviou e retornar…" (26); manter o "fila inicial" do formulário atual.
- "Com testes e supervisão humana" (27); usar "com supervisão humana e fallback".
- Também fora: "Eu ouço primeiro." (atribui ao personagem uma ação humana).

## 5. Biblioteca de estados e expressões

| ID | Estado | Uso (site e funil) | Nota de pose |
|---|---|---|---|
| S01 | idle | hero, CTA flutuante, "quem cuida" da proposta, e-mail; F09 "Sem pressa" (follow-up com permissão) | em pé, 3/4, mão direita no bolso, sorriso fechado; base do rig |
| S02 | greet | entrada no site (1×/sessão); F01 "Oi, da GaspLab" após o aceite | aceno curto, mão aberta |
| S03a/b | point | CTAs do site; F04 "Abre o link" | palma aberta para o lado do botão |
| S04 | explain | método, capa de proposta; F06 "Como funciona" | mão aberta diante de diagrama de três nós |
| S05 | think | formulário enviando; F07 "Conferindo aqui" (nunca para adiar preço) | mão no queixo, olhar para cima |
| S06 | work | bastidores; fora das figurinhas | sentado com notebook, concentrado |
| S07 | success | card de prévia ou F03 "Prévia pronta" (um ou outro, após o "sim"); F11 "Combinado" após aceite escrito; diagnóstico enviado | aceno de cabeça, sorriso aberto, nó de check |
| S08 | review | governança; F08 pendente (26) | mão erguida, fluxo com nó de checagem |
| S09 | concern | erro de formulário; F05 "Algo não abriu?" | sobrancelha levemente franzida, palma a meia altura |
| S10 | lost | 404 estático; fora das figurinhas | mapa blueprint aberto, sobrancelha erguida |
| S11 | listen | `/diagnostico` ao focar campo; F02 "Pode contar" | sentado, inclinado, caderno no joelho |
| S12 | celebrate | entrega concluída; F12 "Entregue" | punho discreto no peito, sem pulo |

Funil: nada antes da resposta do lead; o potencial está na entrega da prévia (S07) e no follow-up (F09), hipótese do A/B em `03-negocio.md`. Kit mínimo: S01, S04, S07; F03, F06, F09.

**Expressões:** neutro, sorriso fechado (base), sorriso aberto (overlay), concentrado, preocupado leve, sobrancelha erguida, piscar, olhar dirigido. **Proibidas:** piscadela, joinha, gargalhada, raiva, choro, susto, deboche, pose de herói.

## 6. Regras de uso

- **Entra:** WhatsApp (após a resposta do lead), propostas, site, redes, Brand Book. Painel interno: adiado (pendência 4).
- **Não entra:** nunca dentro do produto do cliente (site, Bio, Catálogo, rodapé) e nunca no selo "feito pela GaspLab", que usa o símbolo. Também fora: contratos, documentos fiscais, 1ª mensagem fria, e ao lado de marcas sugerindo aval.
- **Tamanhos mínimos:** busto circular 48 px; corpo inteiro a partir de 200 px de altura; abaixo de 48 px, o símbolo GaspLab.
- **Fundos:** tokens escuros ou `paper` (com versão clara), grid blueprint discreto; nada de foto carregada.
- **Com o logo:** nunca se tocam; proteção de 1 quadrado `signal`; o Vini não segura nem veste o logo; peça externa traz o nome GaspLab.
- **Com clientes:** marca do prospect só em envio 1:1; peça pública exige autorização escrita. Marcas da trajetória só como texto.
- **Transparência** (D-A7, aguarda aprovação). Curta, em legenda e no perfil comercial do WhatsApp: "Vini é uma ilustração criada com IA, a partir de fotos reais do fundador." Completa, em `/sobre` (ao lado da foto) e no Brand Book: "Vini é a versão ilustrada de Vinícius Gasparello, fundador da GaspLab, criada com IA a partir de fotos reais." A frase sobre quem responde espera a pendência 25.
- **Vídeo com boca animada:** "Ilustração criada com IA" na tela, obrigatório. Voz só a gravada pelo Vinícius; sem voz sintética, sem autoplay com áudio.
- **Alt:** "Vini, mascote ilustrado da GaspLab, [estado]".

## 7. WhatsApp

- **Compliance:** a 1ª mensagem fria é texto escrito à mão, sem mídia (figurinha, card, vídeo, foto, link, PDF, áudio). O Vini entra só depois que o lead responde; prévia e card, só depois do "sim".
- **Quem assina é quem envia** ("[nome], da GaspLab"), com legendas neutras.
- Uma figurinha por mensagem, sempre com texto, nunca no lugar de identificação, origem ou opt-out. Sem figurinha de follow-up sem permissão. Preço: responder em texto. Depois de um "não": despedida só em texto e `do_not_contact`.
- **Figurinha:** WebP 512×512, fundo transparente, estática ≤ 100 KB, pacote de 3 a 30 (sem misturar estática e animada), contorno branco de 8 px, bandeja 96×96 ≤ 50 KB. Legenda aplicada em código ou Canva.
- **Foto de perfil:** o número do Gabriel mantém o logo até a decisão da pendência 23; busto S01 só no número do Vinícius.

## 8. Comportamento no site

1. `idle` (S01): respira e pisca; antes do rig, still S01.
2. `attention`: no desktop, cabeça e pupilas seguem o cursor; voltam ao centro após 4 s. No celular não há rastreio de scroll (decisão do orquestrador em 06/10: menos CPU, menos movimento sem propósito; o celular fica em `idle` + trocas de estado).
3. `greet` (S02): aceno por crossfade, uma vez por sessão.
4. `point` (S03a/b): hover ou foco em CTA; aponta para o botão.
5. `/diagnostico`: foco → `listen`; envio → `think` (mín. 600 ms); 2xx → `success` (terminal); erro → `concern`, que volta a `listen`.
6. `lost` (S10): 404, estático.
7. Pausa fora da tela; falha de camada, Save-Data ou 2G → still S01.
8. CSS puro + JS pequeno, sem `motion`; só `transform` e `opacity`; erro e sucesso nunca só pela pose.
9. Rig só no hero da home; no resto, stills com crossfade. O CTA flutuante surge quando o hero sai da tela e abre um card, não um chatbot.
10. Reduced-motion: o rig nem é baixado; sem respiração, piscar, rastreio, aceno e pulso; a troca de pose continua, instantânea.

## 9. Pendências que bloqueiam copy

Em `knowledge/99-pendencias.md`:
- **21** fotos extras para a folha de personagem.
- **22** cena de origem da GaspLab (capítulo 5, vídeo falado).
- **23** quem opera o kit e em que aparelho (foto de perfil).
- **24** termo de licença de imagem e do nome.
- **25** quem atende o WhatsApp do site e se há resposta automática.
- **26** aceite do cliente antes de publicar; retorno do diagnóstico.
- **27** testes na etapa Integrar.
- **28** conflito entre `CLAUDE.md` e o Vault sobre quais clientes citar.
- **29** domínio do e-mail na assinatura.
