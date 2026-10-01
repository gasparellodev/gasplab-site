# Produto: Bio + Catálogo para restaurantes

## Ideia (Felipe, 01/10/2026)
Na prospecção de restaurantes pequenos e médios, a maioria **não tem link na bio do Instagram**. Produto: uma página de **bio + cardápio/catálogo** com a identidade visual do restaurante, em que o cliente monta o pedido e envia o **resumo completo pelo WhatsApp**. Simples, rápido de produzir, "cartão de entrada" e gerador de caixa. Produção e prospecção **em massa**, começando em 02/10/2026.

## Exemplos já feitos (analisados em 01/10/2026)
### https://istambul-halal.vercel.app/
- Logo, descrição ("cozinha halal turco-árabe…"), selo da cidade/bairros.
- Status **aberto/fechado** com horário ("Fechado · abre hoje às 11h").
- **Seletor de unidade** (Tatuapé / Brás) — multiunidade.
- CTA principal "Encomendar pelo WhatsApp" + "Ver cardápio e montar pedido".
- Seção **Combos família** ("válidos hoje · entrega e retirada") com botão Adicionar (carrinho).
- "Por que o Istambul" (diferenciais), dados da unidade.
- Mensagem padrão do WhatsApp: "Olá! Vim pelo link da bio do Istambul Halal e quero fazer um pedido."

### https://restaurante-genesis.vercel.app/
- Identidade própria (verde/creme, lousa), "comida caseira da Inêz, desde 2007".
- Status aberto/fechado; CTA "Encomendar para o almoço".
- **Prato do dia por dia da semana** (ex.: Quinta → Panquecas R$ 23,00) com botão "Pedir".
- Cardápio completo (à la carte, lanches, porções, sucos) em `#/cardapio`.
- "Quem já provou" (avaliações), horário e endereço, **Google Maps e Waze**, Instagram, links para **iFood / Keeta / 99Food**.
- Mesmo template técnico do Istambul (SPA com rotas hash) → reutilizável.

## Escopo mínimo (hipótese a validar pelos agentes)
- Página de bio (logo, descrição, status de horário, CTAs) + cardápio com categorias, preços, fotos opcionais.
- Carrinho → mensagem de pedido formatada no WhatsApp (itens, quantidades, total, retirada/entrega, endereço, observações).
- Links: Instagram, Maps/Waze, apps de delivery (opcional).
- Identidade: cores e tipografia extraídas do logo/Instagram do restaurante.

## Princípios
- Estética fiel ao restaurante (identidade dele, não da GaspLab).
- Facilidade de pedir em poucos toques no celular.
- Produção em minutos, não em horas.
