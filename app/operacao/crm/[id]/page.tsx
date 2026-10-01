import type { Metadata } from "next";
import { LeadDetail } from "@/components/operacao/lead-detail";

export const metadata: Metadata = { title: "Detalhe do lead" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeadDetail leadId={id} />;
}

