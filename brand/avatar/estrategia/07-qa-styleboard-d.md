# QA visual do style board D (Rota D) — Vini

v1 · 06/10/2026 · A7 QA visual · Avaliação por imagem (1–5), comparação D1 × D2 × D3 e recomendação para a folha de personagem. **Não edita nem gera imagens.**

**Regra:** imagem reprovada se qualquer item ficar abaixo de 4. **Referência:** `public/vinicius-gasparello-hd.jpg`. **Avaliadas:** `d1-01`, `d1-02`, `d2-01`, `d2-02`, `d3-01`, `d3-02` e `prancha-silhueta.png` (em `brand/avatar/styleboard-d/`).

## 1. Veredito

- **Pela regra estrita, as 6 reprovam.** O 24 px de corpo inteiro derruba todas (nenhuma passa de 3); D1-01 ainda tem logo de terceiros.
- **Leitura prática:** o `02-marca.md` §4 fixa como mínimo o **busto circular 48 px** e manda usar o símbolo GaspLab abaixo disso. Tratando o 24 px de corpo inteiro como teste de estresse, passam **D3-01** (média 4,4) e **D2-02** (média 4,1); nas demais sobram itens abaixo de 4.
- **Recomendação: nível D3, variação 01**, com correções que puxam olhos e proporção para perto do D2 (seções 7 e 8). Fallback: D2-02 com contorno e construção do D3.

## 2. Método e limites

- Vi as 7 imagens com Read e fiz recortes de rosto, braço tatuado, mãos e tênis em pasta temporária (nada salvo no projeto). Conferi também os cantos das 6 imagens com contraste forçado: **sem texto, logo ou marca d'água** no fundo; o grid é só textura.
- **Prancha com defeito de layout:** `scripts-silhueta.mjs` põe o bloco 24 px (192 px de largura) em `x + 208`, mas o passo entre células é 316 px; o bloco invade a célula vizinha e fica cortado. Refiz a leitura sem sobreposição (corpo inteiro 48×64 e 24×32 em cinza) e acrescentei um teste de **busto 48 px e 24 px**, que é o uso real (avatar de WhatsApp).
- Proporções são **estimativa visual** (cabeça com cabelo ÷ altura total, ±0,3). Notas são julgamento de um revisor; **não substituem** o checklist D1 × D2 × D3 de `02-marca.md` §5, cujos itens (P) exigem três pessoas de fora.

## 3. Tabela de notas (1–5)

| Imagem | Semelhança | Cabelo e barba | Argolas e piercing | Tatuagem | Figurino | Mãos e anatomia | Seriedade | Paleta | Sem texto/logo | 48 px | 24 px | Animabilidade | Mín. | Média | Veredito |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| D1-01 | 3 | 3 | 5 | 5 | 4 | 4 | 4 | 5 | **2** | 3 | **2** | 3 | 2 | 3,6 | Reprovada |
| D1-02 | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 5 | 4 | 3 | **2** | 3 | 2 | 3,9 | Reprovada |
| D2-01 | 3 | 4 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | **2** | 4 | 2 | 3,9 | Reprovada |
| D2-02 | 4 | 4 | 5 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | **2** | 4 | 2 | 4,1 | Reprovada (só 24 px) |
| D3-01 | 4 | 5 | 5 | 4 | 5 | 4 | 4 | 5 | 4 | 5 | **3** | 5 | 3 | 4,4 | Reprovada (só 24 px) |
| D3-02 | 3 | 4 | 4 | 5 | 4 | 3 | 3 | 5 | 4 | 4 | 3 | 4 | 3 | 3,8 | Reprovada |

Médias por nível: **D1 3,75 · D2 4,00 · D3 4,13** (D3 sobe por D3-01; D3-02 puxa para baixo).

### Evidência por imagem (itens abaixo de 5 ou críticos)

- **D1-01.** *Logo 2:* swoosh da Nike visível nos dois tênis. *Barba 3 / semelhança 3:* barba rala nas bochechas, rosto estreito e jovem, sobrancelha fina. *48/24 px:* sem contorno contínuo, camiseta e jeans somem no navy; cabeça de ~7 px. *Animabilidade 3:* jeans com ruído pictórico, tatuagem esfumada, luz de borda irregular. Pontos fortes: manga preto-e-cinza no braço certo (direito do personagem = esquerdo de quem vê), argolas nas duas orelhas, pino no nariz do lado certo.
- **D1-02.** Rosto e barba mais fiéis que D1-01 (bigode e queixo definidos). Argola no nariz maior que o pino da foto (4). As duas mãos no bolso: mãos não verificáveis. Mesmo problema de contorno e textura do D1-01 (48 px = 3, 24 px = 2, animabilidade 3). Tênis com listra lateral tipo Vans.
- **D2-01.** Rosto jovem e delicado (cílios marcados, barba clara) = semelhança 3. Braço tatuado visto de perfil, vira uma tira fina; o braço oposto é grosso e musculoso, camiseta justa (a da foto é folgada). Contorno branco-azul contínuo ajuda a 48 px, mas 24 px = 2.
- **D2-02.** A melhor semelhança de D1/D2: sobrancelha mais pesada, barba mais cheia, mandíbula mais quadrada. Jeans azul-marinho um pouco mais claro (ainda "escuro", dentro da paleta). Mesma pose do D2-01: tatuagem de perfil, não lê a 48 px. Listra lateral tipo Vans.
- **D3-01.** Melhor cabelo (topete e onda em massa) e barba mais cheia dos seis; contorno uniforme e cores chapadas; o busto a 48 px mantém cabelo, banda da barba e olhos. Riscos: olhos grandes com brilho duplo (estimo +25–35% sobre o real, acima dos 10–15% do plano), cabeça ≈ 1:4,8, mão pendente em "luva", tatuagem fina e semiescondida, listra tipo Vans.
- **D3-02.** Cabeça ≈ 1:4,2 (efeito "bobblehead"), nariz reduzido a um traço, pescoço fino, mão pendente sem dedos, sorriso torto, jeans mais reto que "largo". Melhor leitura da tatuagem (braço dobrado, manga grande). Seriedade 3: lê como desenho infantil.

## 4. Achados que valem para as seis

1. **Acertos comuns:** manga tatuada só no braço direito do personagem; piercing no lado esquerdo do rosto (direito de quem vê); argolas prateadas nas duas orelhas; camiseta preta lisa; jeans escuro largo; tênis cinza e branco; paleta navy e azul sem verde; sem texto nem marca d'água.
2. **Nenhuma traz o sorriso aberto.** O plano (E2) pedia duas variações por nível, meio-sorriso e sorriso aberto; as seis são meio-sorriso. O traço mais marcante da foto é o sorriso largo.
3. **O rosto do fundador não foi capturado.** Faltam sobrancelha grossa e reta, olho mais fundo, nariz largo, mandíbula quadrada e barba castanho-avermelhada mais cheia. A semelhança vem do kit (cabelo, barba, argolas, manga, camiseta), não do rosto.
4. **Marcas de terceiros:** swoosh da Nike em D1-01; listra lateral no estilo Vans (marca registrada) em cinco das seis. Não é texto, mas é identificável: trocar por tênis genérico antes da folha.
5. **Piercing:** as seis desenham argola no nariz; a foto mostra um pino pequeno. Decidir e travar.
6. **Argolas e piercing não sobrevivem a ≤ 48 px** em nenhuma; a identificação a 48 px vem de cabelo volumoso, banda da barba e (em D1-01, D1-02 e D3-02) a mancha clara da tatuagem.
7. **Escada de proporção irregular** (cabeça com cabelo, estimada): D1 ≈ 1:5,6 · D2 ≈ 1:5,2 · D3-01 ≈ 1:4,8 · D3-02 ≈ 1:4,2. D1 e D2 ficam próximos (a diferença está em contorno e olhos, não em proporção); D3-02 passa do alvo de 1:5,5 do plano. Os valores do plano (1:7,5 / 1:6,5 / 1:5,5) provavelmente medem a cabeça sem o volume do cabelo.

## 5. Comparação D1 × D2 × D3

| | **D1** · proporção real | **D2** · levemente estilizado | **D3** · mascote gráfico |
|---|---|---|---|
| Semelhança | Média (3–4); rosto genérico e jovem | Média (3–4); D2-02 é a mais fiel de D1/D2 | Média (3–4); caricatura de sobrancelha, mandíbula e barba funciona; olhos grandes afastam do real |
| Seriedade | Alta (4) | Alta (4) | **Fronteira:** D3-01 = 4 no limite, D3-02 = 3 |
| 48 px (busto e corpo) | Fraco (3): sem contorno contínuo, cabeça pequena | Bom (4): contorno contínuo, mas traços finos viram mancha | **Melhor (4–5):** contorno uniforme, cabeça maior, cabelo e barba em massa |
| 24 px corpo inteiro | 2 | 2 | 3 (nenhum chega a 4) |
| Animabilidade (rig T1) | 3: textura de jeans, tatuagem esfumada | 4: formas limpas, ainda com textura | **4–5:** cores chapadas, linha uniforme, poucos detalhes |
| Tatuagem | Boa e visível (braço dobrado) | Fina, de perfil, não lê a 48 px | D3-01 fraca, D3-02 forte |
| Risco principal | Some em 48 px e dá trabalho para animar; D1-01 tem logo | Pouco ganho sobre D1; não resolve o tamanho pequeno | Parecer "fofo" demais para B2B |

### Risco de seriedade no D3

O plano marcou D3 como "pode parecer lúdico demais para B2B". D3-01 fica no limite: o rosto é de adulto (barba cheia, sobrancelha grossa, mandíbula quadrada), mas os olhos brilhantes e a cabeça grande puxam para "simpático de animação". A correção da seção 8 (olhos e cabeça) reduz esse risco sem perder o ganho a 48 px. **Gate antes de aprovar a folha:** o teste de fora do `02-marca.md` §5 (três pessoas chamam de "profissional", não de "fofo").

## 6. Leitura da prancha de silhueta

- **Corpo inteiro a 48 px (cinza):** em todas, o que sobrevive é camiseta preta, jeans largo, tênis claros e pose de mão no bolso. Cabelo vira uma tampa escura; barba e argolas somem. A mancha clara da tatuagem aparece em D1-01, D1-02 e D3-02; em D2 e D3-01 o braço fica fino demais.
- **Corpo inteiro a 24 px:** ninguém se reconhece como o fundador. D3-01 e D3-02 distinguem cabelo e rosto (cabeça de ~10 px); em D1 e D2 a cabeça tem ~6 px.
- **Busto a 48 px (uso real):** todas mantêm cabelo volumoso e sombra da barba; D3-01 é a mais nítida (contorno grosso e olhos legíveis). Argolas ficam em ~1 px e piercing do nariz some em todas.

## 7. Recomendação: D3, variação 01

**Por quê (3 razões objetivas):**

1. **Menos correções e melhor nota.** Média 4,4 contra 4,1 (D2-02) e 3,9 (D1-02); é a única sem item abaixo de 4 além do 24 px de corpo inteiro (3, empatado com D3-02 como a melhor leitura a 24 px). D2-02 cai a 2 nesse teste.
2. **Reconhecimento a 48 px, que é o P0 (WhatsApp).** Contorno uniforme e cabeça ≈ 1:4,8 mantêm volume do cabelo, banda da barba e olhos no busto de 48 px; em D1 e D2 os olhos viram pontos e a barba, mancha. No desempate do `02-marca.md` §5, Reconhecimento vence.
3. **Animabilidade.** Cores chapadas, linha de espessura única e sombra simples separam em camadas (cabeça, cabelo, braço direito, olhos, boca) para o rig T1 com menos retoque; D1 e D2 carregam textura de jeans e tatuagem esfumada.

**Por que não D3-02:** cabeça 1:4,2, mão sem dedos e rosto de desenho infantil (seriedade 3). **Por que não D1:** pior em 48 px e animação, e D1-01 traz logo. **D2-02 como fallback:** melhor semelhança facial, falha só no 24 px; vira opção se o gate de seriedade do D3 não passar.

## 8. Correções no D3-01 antes da folha

**Bloqueantes**

1. **Olhos:** de ~+25–35% para **+10–15%** sobre o real; um único brilho pequeno (sem brilho duplo); pálpebra superior mais pesada; manter sobrancelha grossa e reta.
2. **Cabeça:** de ≈ 1:4,8 para **≈ 1:5,5** (reduzir cabeça e cabelo ~12% ou alongar o tronco); pescoço ~15% mais grosso.
3. **Sorriso:** gerar o **sorriso aberto**, que não veio nas seis; base fica sorriso fechado (S01) e o aberto entra como overlay (S07), com a foto HD como referência de boca e bochecha.
4. **Tênis:** tirar a listra lateral estilo Vans e qualquer swoosh; skate genérico cinza e branco, painéis lisos, sola caramelo.
5. **Tatuagem:** virar o braço direito para a câmera (cotovelo dobrado com a mão no bolso, como em D3-02, ou tronco girado 15–20°); 3–4 massas pretas e cinza densas do punho da manga ao pulso, sem tom bege; precisa ler como "braço mais escuro" a 48 px. Travar um desenho único para todas as poses.

**Ajustes**

6. **Barba:** cheia nas bochechas, bigode definido, castanho-avermelhado mais claro que o cabelo, sem falhas.
7. **Rosto:** sobrancelhas mais grossas e retas, olho mais fundo (sombra suave), nariz mais largo, mandíbula quadrada.
8. **Mãos:** dedos simplificados (4 + polegar); a mão pendente hoje parece luva. Incluir folha de mãos.
9. **Piercing e argolas:** decidir argola ou pino (foto = pino pequeno) com o fundador e travar tamanho; mesmo diâmetro de argola nas duas orelhas; versão de busto 48 px com argolas ~×1,4 maiores.
10. **Construção para o rig:** contorno único em camada separada (não "queimado" na imagem), jeans em dois tons chapados sem ruído, sombra em um nível, fundo navy chapado com grid em camada à parte. Manter o jeans escuro e largo.
11. **Prancha:** corrigir a sobreposição do bloco 24 px e incluir **busto circular 48 px** (tamanho mínimo do `02-marca.md` §4) ao lado do corpo inteiro.
12. **Re-teste:** nota ≥ 4 em todos os itens. Sobre o 24 px de corpo inteiro: ou aprovar a política "abaixo de 48 px entra o símbolo GaspLab" (teste de 24 px só informativo), ou aceitar que nenhum corpo inteiro passa e testar o 24 px apenas no busto.

## 9. Decisões e pendências para o fundador

- Argola ou pino no nariz (a foto mostra pino pequeno).
- Aprovar o sorriso aberto como parte do kit de expressões (já permitido em `02-marca.md` §4).
- Política do 24 px (símbolo GaspLab abaixo de 48 px) para encerrar a ambiguidade na regra de reprovação.
- Registrar em `knowledge/99-pendencias.md` (não editado aqui): trocar o desenho do tênis por modelo genérico, para evitar marca de terceiros.
