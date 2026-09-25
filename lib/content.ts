// Copy centralizada da GaspLab — pt-BR.
// Fonte de verdade para páginas e metadata. Toda afirmação factual tem lastro em docs/CONTEXT_VAULT.md.

export type ServiceSlug = "sites" | "automacoes" | "sistemas";
export type CaseSlug = "gaspbio" | "contaflow";

// ---------------------------------------------------------------------------
// Identidade do site / metadata
// ---------------------------------------------------------------------------

export const site = {
  name: "GaspLab",
  url: "https://gasplab.site",
  title: "GaspLab — Engenharia para a IA funcionar no seu negócio",
  description:
    "A GaspLab entende sua operação, mapeia processos e desenha a arquitetura antes de integrar automação, software e inteligência artificial.",
  ogTitle: "GaspLab — Engenharia para a IA funcionar no seu negócio",
  ogDescription:
    "Engenharia de software e inteligência artificial aplicada: contexto, arquitetura e adoção real antes de qualquer automação.",
} as const;

// ---------------------------------------------------------------------------
// Hero (home)
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Engenharia de software + inteligência artificial",
  titleBefore: "Engenharia para a",
  titleHighlight: "IA funcionar",
  titleAfter: "no seu negócio.",
  body: "A GaspLab entende sua operação, mapeia processos e desenha a arquitetura antes de integrar automação, software e inteligência artificial.",
  primaryCta: { label: "Começar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Ver como trabalhamos", href: "#metodo" },
  trail: "Contexto → processo → arquitetura → inteligência aplicada",
} as const;

// ---------------------------------------------------------------------------
// O problema real
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: "O problema real",
  title: "IA sem arquitetura vira mais uma ferramenta desconectada.",
  body: "Antes de automatizar, é preciso entender pessoas, dados, decisões e exceções. É aí que a GaspLab começa.",
  frictions: [
    "Dados espalhados",
    "Atendimento manual",
    "Retrabalho entre ferramentas",
    "IA sem adoção",
  ],
} as const;

// ---------------------------------------------------------------------------
// Os 4 argumentos (pilares do posicionamento)
// ---------------------------------------------------------------------------

export const pillars = [
  {
    title: "Contexto antes da tecnologia",
    text: "Entendemos pessoas, dados, decisões e exceções antes de escolher qualquer ferramenta.",
  },
  {
    title: "Arquitetura antes da automação",
    text: "Desenhamos como sistemas, dados e processos se conectam antes de automatizar qualquer fluxo.",
  },
  {
    title: "Software integrado à operação",
    text: "Sites, automações e sistemas funcionam como camadas de uma mesma arquitetura — não como ferramentas isoladas.",
  },
  {
    title: "Adoção com evolução contínua",
    text: "A solução entra na rotina do time e evolui com acompanhamento, não como projeto que termina na entrega.",
  },
] as const;

// ---------------------------------------------------------------------------
// Método GaspLab
// ---------------------------------------------------------------------------

export const method = {
  eyebrow: "Método GaspLab",
  title: "Entendemos o sistema antes de construir a solução.",
  body: "Cada etapa reduz incerteza, protege a operação e transforma IA em capacidade real — não em experimento isolado.",
  steps: [
    {
      name: "Entender",
      text: "Ouvimos o time, mapeamos o problema real e definimos o que precisa mudar.",
    },
    {
      name: "Mapear",
      text: "Levantamos processos, dados e sistemas existentes para enxergar o cenário completo.",
    },
    {
      name: "Arquitetar",
      text: "Desenhamos a arquitetura-alvo: como automação, software e IA vão se conectar.",
    },
    {
      name: "Integrar",
      text: "Implementamos com testes, supervisão humana e transição controlada.",
    },
    {
      name: "Evoluir",
      text: "Acompanhamos o uso real e ajustamos a solução com evidência, não achismo.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Oferta em escada (sem preços)
// ---------------------------------------------------------------------------

export const offer = {
  eyebrow: "Como trabalhamos juntos",
  title: "Uma escada, não um pacote fechado.",
  body: "Cada etapa entrega valor por si só e prepara a decisão seguinte — sem obrigar a contratar tudo de uma vez.",
  steps: [
    {
      index: "01",
      name: "Diagnóstico de prontidão para IA",
      summary:
        "Uma conversa estruturada para entender onde sua operação perde tempo, clareza ou oportunidade — e se existe uma rota de IA que faça sentido agora.",
      deliverables: [
        "Leitura do cenário atual",
        "Identificação do gargalo prioritário",
        "Indicação do próximo passo",
      ],
      ctaLabel: "Começar diagnóstico",
    },
    {
      index: "02",
      name: "Sprint de Arquitetura de IA",
      summary:
        "Um mergulho no processo, nos dados e nos sistemas existentes para desenhar a arquitetura-alvo antes de qualquer linha de código.",
      deliverables: [
        "Mapa do processo atual",
        "Inventário de dados e sistemas",
        "Casos de uso priorizados",
        "Arquitetura-alvo",
        "Recomendação build/buy/partner",
        "Riscos e governança",
        "Plano 30/60/90",
        "Hipótese mensurável de ROI",
      ],
      ctaLabel: "Conversar sobre a Sprint",
    },
    {
      index: "03",
      name: "Implementação",
      summary:
        "A arquitetura definida na Sprint vira automação, sistema ou experiência digital, com entregas incrementais e testes ao longo do caminho.",
      deliverables: [
        "Desenvolvimento incremental",
        "Testes e validação com o time",
        "Documentação e transição",
      ],
      ctaLabel: "Conversar sobre implementação",
    },
    {
      index: "04",
      name: "Operação e evolução contínua",
      summary:
        "Depois do lançamento, a solução continua sob acompanhamento — ajustada pelo uso real, não por suposição.",
      deliverables: [
        "Acompanhamento de uso",
        "Ajustes com evidência",
        "Priorização contínua de melhorias",
      ],
      ctaLabel: "Falar sobre operação continuada",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Governança (human-in-the-loop, fallback, dados sob controle, evidência)
// ---------------------------------------------------------------------------

export const governance = {
  eyebrow: "Governança",
  title: "Confiança é parte da arquitetura.",
  body: "IA aplicada com responsabilidade exige supervisão, transparência e um caminho de volta quando algo sai do previsto.",
  points: [
    {
      title: "Human-in-the-loop",
      text: "Decisões sensíveis passam por revisão humana antes de virar ação automática.",
    },
    {
      title: "Fallback projetado",
      text: "Cada fluxo automatizado é projetado com um caminho manual de retorno para quando algo foge do esperado.",
    },
    {
      title: "Dados sob controle",
      text: "Você sabe onde os dados estão, quem acessa e como são usados — sem letra miúda.",
    },
    {
      title: "Evolução com evidência",
      text: "Mudanças na solução são guiadas por uso real e resultado observado, não por tendência.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Capacidades (serviços reposicionados como camadas de uma arquitetura)
// ---------------------------------------------------------------------------

export const capabilities = {
  eyebrow: "Capacidades",
  title: "A arquitetura é uma. As entregas se conectam.",
  body: "Sites, automações e sistemas não são produtos isolados. São camadas de uma operação que precisa funcionar em conjunto.",
} as const;

export const services = [
  {
    slug: "sites",
    index: "01",
    title: "Experiências digitais",
    short: "Presença digital com narrativa, performance e uma jornada clara até a decisão.",
    outcome: "Da primeira impressão ao próximo passo.",
  },
  {
    slug: "automacoes",
    index: "02",
    title: "Automação com IA",
    short: "Fluxos que conectam ferramentas, dados e atendimento para reduzir trabalho repetitivo.",
    outcome: "Do processo manual à operação fluida.",
  },
  {
    slug: "sistemas",
    index: "03",
    title: "Sistemas e produtos",
    short:
      "Produtos digitais para organizar operações que planilhas e ferramentas genéricas já não sustentam.",
    outcome: "Da complexidade dispersa ao controle.",
  },
] as const;

export const serviceDetails: Record<
  ServiceSlug,
  {
    promise: string;
    intro: string;
    fits: string[];
    deliver: string[];
    demo: "site" | "automation" | "system";
  }
> = {
  sites: {
    promise: "Seu site deixa de ser vitrine e passa a conduzir decisões.",
    intro:
      "Estratégia, narrativa, design e engenharia reunidos para construir presença com clareza, velocidade e intenção — dentro da mesma arquitetura que sustenta automação e sistemas.",
    demo: "site",
    fits: [
      "Posicionar uma marca com mais seriedade",
      "Explicar uma oferta complexa com clareza",
      "Criar uma jornada de conversão mensurável",
    ],
    deliver: [
      "Arquitetura e copy",
      "Design responsivo",
      "Desenvolvimento e SEO",
      "Medição sem dados pessoais",
    ],
  },
  automacoes: {
    promise: "Menos repetição. Mais inteligência na operação.",
    intro:
      "Conectamos dados, ferramentas e IA para que as tarefas certas aconteçam no momento certo, com visibilidade e supervisão para o time.",
    demo: "automation",
    fits: [
      "Atendimento com triagem inteligente",
      "Processos manuais entre ferramentas",
      "Rotinas comerciais e operacionais",
    ],
    deliver: [
      "Mapeamento de processo",
      "Desenho do fluxo",
      "Integrações e IA",
      "Monitoramento e evolução",
    ],
  },
  sistemas: {
    promise: "Software que se adapta à operação — não o contrário.",
    intro:
      "Projetamos produtos e sistemas sob medida quando planilhas, remendos e plataformas genéricas já limitam o crescimento.",
    demo: "system",
    fits: [
      "Centralizar uma operação dispersa",
      "Criar um produto digital novo",
      "Substituir processos frágeis ou manuais",
    ],
    deliver: [
      "Descoberta e arquitetura",
      "UX/UI e protótipo",
      "Implementação escalável",
      "Evolução contínua",
    ],
  },
};

// ---------------------------------------------------------------------------
// Clientes GaspLab × Trajetória do fundador (nunca misturar os dois)
// ---------------------------------------------------------------------------

export const clients = {
  gasplab: {
    eyebrow: "Clientes GaspLab",
    title: "Empresas atendidas diretamente pela GaspLab.",
    body: "Os cases completos serão publicados com a autorização de cada cliente.",
    brands: ["Ice Company", "Decora"],
  },
  trajectory: {
    eyebrow: "Trajetória do fundador",
    title: "Nove anos de atuação em engenharia de software.",
    body: "Empresas e projetos em que Vinícius Gasparello atuou como profissional de engenharia. É a experiência pessoal do fundador — não a carteira de clientes da GaspLab.",
    items: [
      { name: "Genpro", relation: "Analista de Sistemas" },
      { name: "digital.code", relation: "Full Stack Developer" },
      { name: "RAM", relation: "Projeto via digital.code" },
      { name: "Fiat", relation: "Projeto via digital.code" },
      { name: "Jeep", relation: "Projeto via digital.code" },
      { name: "GIS", relation: "Tech Lead" },
      { name: "Movida", relation: "Software Engineer" },
      { name: "Folha de S.Paulo", relation: "Liderança técnica" },
      { name: "NextTrack", relation: "Tech Lead" },
      { name: "Core Educação", relation: "AI Software Engineer" },
    ],
  },
} as const;

/** Compat: usado no marquee da home e na grade de "Sobre" — contém somente clientes GaspLab. */
export const clientBrands = clients.gasplab.brands;

// ---------------------------------------------------------------------------
// Cases e produtos
// ---------------------------------------------------------------------------

export const cases = [
  {
    slug: "gaspbio",
    title: "GaspBio",
    kind: "Produto digital",
    summary:
      "Uma experiência de link na bio criada para transformar audiência em jornada de conversão.",
    tags: ["Estratégia", "UX/UI", "Produto"],
  },
  {
    slug: "contaflow",
    title: "Contaflow",
    kind: "Automação contábil",
    summary:
      "Uma frente de automação pensada para organizar rotinas, informações e atendimento de escritórios contábeis.",
    tags: ["Automação", "IA", "Operações"],
  },
] as const;

export const caseDetails: Record<
  CaseSlug,
  {
    context: string;
    problem: string;
    architecture: string;
    solution: string;
    role: string;
    experience: string;
    result: string;
    next: string;
  }
> = {
  gaspbio: {
    context:
      "GaspBio é um produto da GaspLab pensado para perfis que usam redes sociais como principal canal de audiência e precisam de um destino além do link genérico.",
    problem: "Links genéricos organizam destinos, mas raramente criam uma jornada de decisão.",
    architecture:
      "Blocos modulares e independentes, organizados em uma estrutura que separa apresentação, conteúdo e chamada para ação.",
    solution:
      "A GaspLab concebeu uma experiência de link na bio com narrativa própria, blocos modulares e caminhos orientados à conversão.",
    role: "Estratégia de produto, arquitetura de conteúdo, UX/UI e desenvolvimento.",
    experience:
      "Navegação pensada para leitura rápida em celular, com hierarquia visual que conduz do primeiro toque até a próxima ação.",
    result:
      "Métricas ainda não publicadas. Resultados entram aqui somente quando houver base verificável.",
    next: "Evolução contínua do produto conforme uso real e prioridades definidas pela GaspLab.",
  },
  contaflow: {
    context:
      "Escritórios contábeis lidam com mensagens, documentos e tarefas espalhados por canais diferentes, sem um lugar único que organize a rotina.",
    problem: "Rotinas contábeis acumulam mensagens, documentos e tarefas em canais desconectados.",
    architecture:
      "Camada de automação conectada a uma interface própria, pensada para centralizar informação e reduzir a troca manual entre ferramentas.",
    solution:
      "O Contaflow organiza a proposta de uma operação conectada, combinando automação, inteligência artificial e uma interface orientada ao fluxo de trabalho.",
    role: "Descoberta, posicionamento, desenho do produto e implementação da experiência inicial.",
    experience:
      "Interface orientada a fluxo de trabalho, pensada para reduzir o número de telas e cliques necessários até encontrar uma informação.",
    result:
      "Indicadores ainda não publicados. Resultados entram aqui somente após medição e autorização.",
    next: "Evolução do produto guiada por uso real antes de ampliar funcionalidades.",
  },
};

// ---------------------------------------------------------------------------
// Fundador
// ---------------------------------------------------------------------------

export const founder = {
  name: "Vinícius Gasparello",
  role: "Fundador da GaspLab · Engenheiro de software e IA",
  shortBio:
    "Engenheiro de software e IA com nove anos de experiência em arquitetura, produtos digitais, automação e liderança técnica.",
  longBio: [
    "Engenheiro de software e IA com nove anos de experiência em arquitetura escalável, produtos digitais, automação e liderança técnica. Criou a GaspLab para transformar conhecimento técnico em uma forma mais cuidadosa de introduzir inteligência dentro das empresas.",
    "A convicção é simples: antes de escolher uma ferramenta, precisamos compreender as pessoas, os dados, as decisões e as exceções que fazem o negócio funcionar.",
  ],
  quote:
    "A melhor solução de IA não é a mais impressionante. É a que o time consegue usar e o negócio consegue evoluir.",
  highlights: ["Software", "IA aplicada", "Arquitetura responsável"],
  timeline: [
    { period: "abr/2017–abr/2021", company: "Genpro", role: "Analista de Sistemas" },
    { period: "ago/2021–ago/2022", company: "digital.code", role: "Full Stack Developer" },
    { period: "fev/2022–mai/2023", company: "GIS", role: "Tech Lead" },
    { period: "set/2022–out/2023", company: "Movida", role: "Software Engineer" },
    { period: "fev/2024–fev/2025", company: "Folha de S.Paulo", role: "Liderança técnica" },
    { period: "jan/2025–jan/2026", company: "NextTrack", role: "Tech Lead" },
    { period: "desde ago/2025", company: "Core Educação", role: "AI Software Engineer" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Notas de campo (Instagram)
// ---------------------------------------------------------------------------

export const fieldNotes = {
  eyebrow: "Notas de campo",
  title: "IA e automação explicadas por quem constrói.",
  body: "Vídeos do Instagram da GaspLab sobre ferramentas, processos e decisões de engenharia.",
} as const;

/** Reel 1 tem título confirmado publicamente. Reels 2 e 3: fala exata não verificada — rótulos neutros por tema. */
export const instagramReels = [
  {
    href: "https://www.instagram.com/gasplab/reel/DOwqJF-gWDg/",
    title: "Você já utiliza inteligência artificial no seu negócio?",
    meta: "IA aplicada",
  },
  {
    href: "https://www.instagram.com/gasplab/reel/DOoxb9DgaVR/",
    title: "Reel sobre automação",
    meta: "Automação",
  },
  {
    href: "https://www.instagram.com/gasplab/reel/DOmJ3u3gV41/",
    title: "Reel sobre engenharia e ferramentas",
    meta: "Engenharia",
  },
] as const;

// ---------------------------------------------------------------------------
// Página de diagnóstico
// ---------------------------------------------------------------------------

export const diagnosticPage = {
  eyebrow: "Diagnóstico GaspLab",
  title: "Comece pelo problema, não pela ferramenta.",
  body: "Conte onde a operação perde tempo, clareza ou oportunidade. A GaspLab organiza o contexto para apontar uma rota possível.",
  nextSteps: [
    "Você compartilha o cenário",
    "A GaspLab lê o contexto",
    "Conversamos sobre o próximo passo",
  ],
} as const;

// ---------------------------------------------------------------------------
// CTA final
// ---------------------------------------------------------------------------

export const finalCta = {
  eyebrow: "Diagnóstico de prontidão",
  title: "A IA precisa caber no seu negócio — não o contrário.",
  body: "Vamos entender o cenário, localizar os pontos de alavancagem e desenhar o próximo passo com clareza.",
  ctaLabel: "Começar diagnóstico",
} as const;

// ---------------------------------------------------------------------------
// Contato
// ---------------------------------------------------------------------------

export const whatsappUrl =
  "https://wa.me/5511960624399?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20GaspLab%20e%20quero%20fazer%20um%20diagn%C3%B3stico.";
