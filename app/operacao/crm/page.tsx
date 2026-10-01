import type { Metadata } from "next";
import { CrmBoard } from "@/components/operacao/crm-board";

export const metadata: Metadata = { title: "CRM" };
export default function Page() { return <CrmBoard />; }

