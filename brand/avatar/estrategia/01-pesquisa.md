# 01 · Pesquisa — mascote Vini (A1)

06/10/2026. **[FATO]** = fonte linkada. **[OPINIÃO]** = minha leitura. "Não encontrado" = busquei e não achei.

## 1. Mascotes e personagens humanos em B2B e serviços

Achado central: **não encontrei caso B2B documentado de cartoon do próprio fundador** (nem brasileiro). O [censo de mascotes B2B](https://www.stfo.io/research/b2b-mascot-census) achou 105 em ~30 mil empresas de software: 64 animais, 13 robôs/IA, 7 humanos; o autor excluiu "rosto de fundador" da amostra. **[OPINIÃO]** O Vini seria pioneiro no nicho.

| Marca | Sério | Infantil / risco |
|---|---|---|
| [KFC, Coronel Sanders](https://en.wikipedia.org/wiki/KFC_advertising) (consumo) | Fundador real, persona usada como ferramenta de marketing, décadas | Versão animada de 1998 foi trocada por atores |
| [Mailchimp, Freddie](https://www.thedrum.com/news/2019/08/06/mailchimp-co-founder-how-he-nearly-killed-the-monkey-and-introducing-original) (SaaS; criado pelo cofundador) | Personalidade sobre produto sólido | O CEO quis "matar o macaco" por não ser "sério o bastante" (trecho via busca) |
| [Go Compare, Gio Compario](https://www.thedrum.com/news/twitter-reacts-go-compare-brings-back-your-face-mascot-gio-compario) (serviço, UK) | Altíssimo reconhecimento | [Mascote mais irritante](https://www.marketing-beat.co.uk/2022/08/05/six-most-annoying-ads-uk/): caricatura demais |
| **BR** [Lu, Magalu](https://www.ogilvy.com/work/lu-magalu) (varejo) | Função clara (voz do e-commerce desde 2003), consistência, ouro em Cannes | Nenhum apontado |
| **BR** [Vovó Arthêmia, Casa do Pão de Queijo](https://topbrands.com.br/artigos/analise-de-icones-visuais-e-personagens-de-marcas/) (mãe do fundador) | Memorável, origem real | Personalidade "relativa", sem arco |
| **BR** [Skyone CL@UD-IA](https://www.abcdacomunicacao.com.br/skyone-apresenta-clud-ia-mascote-que-humaniza-a-tecnologia-e-reforca-estrategia-de-marca-no-mercado-b2b/) (cloud/IA B2B) | Criado para "humanizar a tecnologia" | Não é humano; sem dado de resultado |

**[OPINIÃO]** Sustenta seriedade: papel funcional, consistência, expressão contida, prova ao lado. Infantiliza: caricatura exagerada, humor como função, personagem sem papel.

## 2. Divulgação, imagem e licença

- **CONAR [FATO]:** o [Guia de Influenciadores](https://www.conar.org.br/noticias/guia-de-marketing-e-publicidade-por-influenciadores-digitais) (publicado 26/05/2026, vigente desde 01/06; [PDF](https://conar.wpenginepowered.com/wp-content/uploads/2026/05/260525_GUIA_INFLUENCIADORES_CONAR_v6.pdf), item 1.3.1) aplica o CBAP integralmente a conteúdo gerado por IA; anunciante e agência respondem pelo resultado e o anúncio não pode induzir a erro com "apresentação visual", simulações ou testemunhais. A nota 6 diz que **não cria dever novo de aviso de uso de IA** e remete a CBAP art. 27 §9º, art. 34 e Anexo Q (imagem de pessoas). O [Propmark](https://propmark.com.br/digital/conar-atualiza-guia-de-publicidade-com-influenciadores-e-inclui-regras-sobre-ia/) cita outra data (13/05); usei o CONAR. O [Migalhas](https://www.migalhas.com.br/depeso/456124/guia-conar-2026-o-que-todo-influenciador-precisa-saber-agora) vê o aviso como boa prática provavelmente futura obrigação. **[OPINIÃO]** Manter a legenda da D-A7; o Vini nunca "depõe" resultado de cliente.
- **LGPD:** o [Radar ANPD 2024](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-biometria-anpd-1.pdf/@@display-file/file) cita o art. 5º, II: dado biométrico "vinculado a uma pessoa natural" é sensível. Um [escritório](https://www.barbieriadvogados.com/dados-sensiveis-na-lgpd/) (não a ANPD) afirma que foto só vira biométrico com meio técnico de identificação unívoca. **[OPINIÃO]** Como titular, o risco é baixo; os riscos reais são subir foto de terceiros ao gerador e formalizar a cessão de imagem de Vinícius (PF) à GaspLab (PJ), pois o [CC art. 20](https://www.jusbrasil.com.br/topicos/10729559/artigo-20-da-lei-n-10406-de-10-de-janeiro-de-2002) exige autorização para fins comerciais. Não é parecer jurídico.
- **Freepik [FATO, via trechos de busca; a página devolve 403 ao fetch, confirmar no navegador]:** [AI content and copyright](https://www.freepik.com/ai/docs/ai-content-and-copyright): planos pagos têm licença comercial para conteúdo de IA; Premium sem atribuição; **sem garantia de titularidade autoral em todas as jurisdições**; o usuário responde por não infringir terceiros; conteúdo de IA fica fora da indenização padrão (só Enterprise). A Merchandise License é do Pro e, segundo resumo de terceiros, para ativos não-IA: **confirmar antes de camiseta e adesivo (P4)**. Precedente brasileiro sobre autoria de imagem de IA: não encontrado. **[OPINIÃO]** Redesenho humano do Vini fortalece a autoria.

## 3. Mascote interativo leve

| Abordagem | Peso | LCP/Lighthouse | Interatividade |
|---|---|---|---|
| **Rive** | [Docs](https://rive.app/docs/runtimes/runtime-sizes.md): canvas-lite 222 KB br, canvas 567 KB. Medi no jsDelivr (v2.44.0): wasm lite 353 KB + JS 108 KB br. [.riv de 16 KB vs 267 KB em Lottie](https://rive.app/blog/why-importing-lotties-isn-t-the-workflow-rive-was-built-for) (dado do fornecedor) | `<canvas>` [não é candidato a LCP](https://web.dev/articles/lcp); custo em banda e CPU. Lighthouse de sites reais: não encontrado | Máquina de estados nativa; [demo "olhos seguem o mouse"](https://rive.app/marketplace/25312-47233-interactive-eyes-follow-mouse/) (CC BY) |
| **Lottie** | lottie-web: [306 KB min / 77 KB gzip](https://bundlephobia.com/package/lottie-web) (medi 48 KB br na light). dotLottie: JS 27 KB + wasm 480 KB br (medido); `.lottie` [70–80% menor que JSON](https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026) | Renderer SVG força layout/paint | Linha do tempo, [sem máquina de estados](https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026); olhar que segue o cursor é impraticável **[OPINIÃO]** |
| **SVG/camadas + código** | Sem runtime em CSS; [Motion](https://motion.dev/docs/react-reduce-bundle-size) ~4,6 KB (m + LazyMotion). Asset típico de personagem: não encontrado | SVG inline também não conta como LCP; `transform`/`opacity` rodam na GPU | Total, com máquina de estados manual (XState ou reducer) |

**[OPINIÃO]** T1 (camadas AVIF/WebP) com `<img>` estático como LCP e rig em idle é o caminho seguro; Rive é a evolução se houver animador.

## 4. Figurinhas do WhatsApp

**[FATO]** ([README oficial](https://github.com/WhatsApp/stickers/blob/main/Android/README.md), [Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/media)): WebP **512×512**, fundo transparente, **estática ≤100 KB, animada ≤500 KB**; animada com quadros ≥8 ms e ≤10 s, primeiro quadro "diz tudo" (o loop termina nele); contorno branco de 8 px recomendado; bandeja 96×96 ≤50 KB; pacote de 3 a 30, sem misturar estática e animada. **Margem além do contorno: não encontrado;** **[OPINIÃO]** ~16 px de respiro.

Criação: (a) app próprio via [Stickers API](https://github.com/WhatsApp/stickers/blob/main/iOS/README.md) (Android: pastas + `contents.json`; iOS: pasteboard `whatsapp://stickerPack`); (b) pacotes nativos do WhatsApp, até 30 ([TecMundo](https://www.tecmundo.com.br/software/404025-whatsapp-finalmente-permite-criar-e-compartilhar-pacotes-de-figurinhas.htm), via busca); (c) Cloud API envia só **figurinha individual** (`media_id` ou link); pacote por API: não encontrado.

## 5. Três riscos de percepção (PMEs brasileiras) **[OPINIÃO]**

1. **Dependência de uma pessoa.** O rosto do fundador sugere "é um cara só". No [caso Havan](https://www.gazetadopovo.com.br/economia/apos-boato-de-que-marca-pertencia-a-lula-dono-da-havan-mostra-a-cara-b24fb4eu9wx4x6bxjxy0hjkt1) a face do dono teve de carregar a marca numa crise (foto, não cartoon). Mitigar: nome próprio, método e equipe visíveis.
2. **Lúdico demais para "engenharia séria".** Mailchimp e Gio Compario mostram a tensão; figurinha em WhatsApp frio pode soar como spam ou golpe. Mitigar: proporção D2; figurinha só depois de o lead responder.
3. **Mascote antes de prova.** O censo diz "estratégia primeiro"; [87% reconheceram um ativo, 68% o atribuíram à marca certa](https://inkbotdesign.com/famous-company-mascots/). Sem cases (pendência), o Vini vira enfeite. Mitigar: sempre ao lado de prova real.
