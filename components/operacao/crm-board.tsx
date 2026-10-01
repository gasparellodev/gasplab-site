"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid, List, Loader2, Plus, Search } from "lucide-react";
import { operationFetch, useOperationQuery } from "@/components/operacao/api";
import { EmptyState, ErrorState, LoadingGrid, OperationPage, PageHeading, StatusPill, formatDate, formatMoney } from "@/components/operacao/page-ui";
import type { LeadStage, LeadSummary } from "@/components/operacao/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stages: { id: LeadStage; label: string }[] = [
  { id: "new", label: "Novo" }, { id: "contacting", label: "Em contato" }, { id: "interested", label: "Interessado" },
  { id: "preview_in_production", label: "Preview em produção" }, { id: "preview_sent", label: "Preview enviado" },
  { id: "proposal", label: "Proposta" }, { id: "won", label: "Ganho" }, { id: "lost", label: "Perdido" },
];

type LeadsResponse = { items: LeadSummary[]; total: number };

function stageName(stage: LeadStage) { return stages.find((item) => item.id === stage)?.label ?? stage; }

export function CrmBoard() {
  const { data, error, loading, refresh } = useOperationQuery<LeadsResponse>("/api/operacao/leads");
  const [view, setView] = useState<"board" | "list">("board");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const leads = useMemo(() => {
    const normalized = deferredQuery.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return data?.items ?? [];
    return (data?.items ?? []).filter((lead) => `${lead.companyName} ${lead.contactName ?? ""}`.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [data, deferredQuery]);

  async function createLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    const values = new FormData(event.currentTarget);
    try {
      await operationFetch("/api/operacao/leads", {
        method: "POST",
        body: JSON.stringify({
          companyName: values.get("companyName"), contactName: values.get("contactName") || null,
          phone: values.get("phone") || null, source: "manual",
        }),
      });
      setOpen(false);
      await refresh();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Não foi possível criar o lead.");
    } finally { setSaving(false); }
  }

  return (
    <OperationPage>
      <PageHeading eyebrow="CRM" title="Cada oportunidade, com contexto." description="Acompanhe o estágio, a próxima ação e o histórico de cada relacionamento." actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-action hover:bg-action-hover"><Plus /> Novo lead manual</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Novo lead manual</DialogTitle><DialogDescription>Use dados obtidos diretamente no relacionamento com a empresa.</DialogDescription></DialogHeader>
            <form onSubmit={createLead} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="companyName">Empresa</Label><Input id="companyName" name="companyName" required /></div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="contactName">Contato</Label><Input id="contactName" name="contactName" /></div><div className="space-y-2"><Label htmlFor="phone">Telefone</Label><Input id="phone" name="phone" inputMode="tel" placeholder="+5511999999999" pattern="[+][1-9][0-9]{7,14}" /></div></div>
              {formError ? <p className="text-sm text-danger">{formError}</p> : null}
              <Button type="submit" className="w-full bg-action hover:bg-action-hover" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Plus />} Criar lead</Button>
            </form>
          </DialogContent>
        </Dialog>
      } />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" /><Input name="crm-search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar empresa ou contato…" className="bg-sunken pl-9" aria-label="Buscar empresa ou contato" /></div>
        <div className="flex rounded-lg border border-primary/15 bg-sunken p-1"><Button size="sm" variant={view === "board" ? "secondary" : "ghost"} onClick={() => setView("board")}><LayoutGrid /> Funil</Button><Button size="sm" variant={view === "list" ? "secondary" : "ghost"} onClick={() => setView("list")}><List /> Lista</Button></div>
      </div>

      {loading ? <LoadingGrid /> : error ? <ErrorState message={error} onRetry={refresh} /> : leads.length === 0 ? <EmptyState title="Nenhuma oportunidade encontrada" description={query ? "Ajuste a busca ou limpe o filtro." : "Adicione uma referência da prospecção ou cadastre um lead manual."} /> : view === "board" ? (
        <div className="overflow-x-auto pb-3"><div className="grid min-w-[1700px] grid-cols-8 gap-3">
          {stages.map((stage) => {
            const stageLeads = leads.filter((lead) => lead.stage === stage.id);
            return <section key={stage.id} className="rounded-xl border border-primary/15 bg-sunken/70 p-3" aria-label={stage.label}>
              <div className="mb-3 flex items-center justify-between"><h2 className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{stage.label}</h2><span className="rounded-full bg-raised px-2 py-0.5 text-xs text-subtle">{stageLeads.length}</span></div>
              <div className="space-y-3">{stageLeads.map((lead) => <Link key={lead.id} href={`/operacao/crm/${lead.id}`} className="block rounded-lg border border-primary/15 bg-card p-3 hover:border-primary/40"><div className="flex items-start justify-between gap-2"><p className="font-medium leading-5 text-soft">{lead.companyName}</p>{lead.doNotContact ? <StatusPill tone="danger">Bloqueado</StatusPill> : null}</div><p className="mt-2 text-xs text-muted-foreground">{lead.nextAction ?? "Próxima ação não definida"}</p><p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-subtle">{formatDate(lead.nextActionAt)}</p></Link>)}</div>
            </section>;
          })}
        </div></div>
      ) : (
        <Card className="panel gap-0 overflow-hidden py-0"><div className="divide-y divide-primary/10">{leads.map((lead) => <Link key={lead.id} href={`/operacao/crm/${lead.id}`} className="grid gap-3 p-4 hover:bg-raised/50 sm:grid-cols-[1.2fr_.8fr_1fr_auto] sm:items-center"><div><p className="font-medium text-soft">{lead.companyName}</p><p className="mt-1 text-xs text-subtle">{lead.contactName ?? "Contato não informado"}</p></div><StatusPill tone={lead.stage === "won" ? "success" : lead.stage === "lost" ? "danger" : "info"}>{stageName(lead.stage)}</StatusPill><div><p className="text-sm text-muted-foreground">{lead.nextAction ?? "Próxima ação não definida"}</p><p className="mt-1 text-xs text-subtle">{formatMoney(lead.proposedValue)}</p></div><ArrowRight className="size-4 text-subtle" /></Link>)}</div></Card>
      )}
    </OperationPage>
  );
}

