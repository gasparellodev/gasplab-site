import { GasparPage } from "@/components/operacao/operation-modules";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const { lead } = await searchParams;
  return <GasparPage leadId={lead} />;
}
