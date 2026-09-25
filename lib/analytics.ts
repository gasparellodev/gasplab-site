// Wrapper tipado sobre @vercel/analytics.
// Regra: nunca enviar PII (nome, e-mail, telefone, empresa). Props só com
// valores não pessoais — interesse selecionado, slug de conteúdo, origem do clique.
import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | "diagnostic_start"
  | "diagnostic_submit"
  | "schedule_click"
  | "whatsapp_click"
  | "case_view";

export type AnalyticsProps = {
  interest?: string;
  slug?: string;
  origem?: string;
};

export function track(event: AnalyticsEvent, props?: AnalyticsProps) {
  vercelTrack(event, props);
}
