/** Fonte única das opções do diagnóstico — usada pelo formulário e pela API. */
export const diagnosticInterests = [
  { value: "diagnostico", label: "Diagnóstico de prontidão para IA" },
  { value: "sprint", label: "Sprint de Arquitetura de IA" },
  { value: "automacoes", label: "Automação com IA" },
  { value: "sistemas", label: "Sistema ou produto sob medida" },
  { value: "sites", label: "Site ou experiência digital" },
  { value: "evolucao", label: "Operação e evolução contínua" },
  { value: "nao-sei", label: "Ainda não sei" },
] as const;

export type DiagnosticInterest = (typeof diagnosticInterests)[number]["value"];

export const diagnosticInterestValues = diagnosticInterests.map((i) => i.value) as [
  DiagnosticInterest,
  ...DiagnosticInterest[],
];

const legacy: Record<string, DiagnosticInterest> = {
  site: "sites",
  automacao: "automacoes",
  sistema: "sistemas",
  integrado: "diagnostico",
};

/** Normaliza `?interesse=` (inclui slugs antigos) para um valor válido, ou "" se desconhecido. */
export function normalizeInterest(raw: string | null | undefined): DiagnosticInterest | "" {
  if (!raw) return "";
  if ((diagnosticInterestValues as string[]).includes(raw)) return raw as DiagnosticInterest;
  return legacy[raw] ?? "";
}
