import type { Metadata } from "next";
import { OperationShell } from "@/components/operacao/operation-shell";

export const metadata: Metadata = {
  title: { default: "Operação", template: "%s | Operação GaspLab" },
  robots: { index: false, follow: false },
};

export default function OperacaoLayout({ children }: { children: React.ReactNode }) {
  return <OperationShell>{children}</OperationShell>;
}

