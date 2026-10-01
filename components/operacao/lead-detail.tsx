"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, Bot, CalendarClock, CheckCircle2, ExternalLink, Loader2, MessageCircle, PhoneCall, Plus, Send, UserRound } from "lucide-react";
import { operationFetch, useOperationQuery } from "@/components/operacao/api";
import { EmptyState, ErrorState, LoadingGrid, OperationPage, PageHeading, StatusPill, formatDate, formatMoney } from "@/components/operacao/page-ui";
import type { LeadDetailData, LeadStage } from "@/components/operacao/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const stages: { id: LeadStage; label: string }[] = [
  { id: "new", label: "Novo" }, { id: "contacting", label: "Em contato" }, { id: "interested", label: "Interessado" }, { id: "preview_in_production", label: "Preview em produção" }, { id: "preview_sent", label: "Preview enviado" }, { id: "proposal", label: "Proposta" }, { id: "won", label: "Ganho" }, { id: "lost", label: "Perdido" },
];

const outcomes = [
  ["no_answer", "Não atendeu"], ["no_decision", "Atendeu, sem decisão"], ["interested", "Interessado"], ["declined", "Recusou"], ["invalid_number", "Número inválido"],
] as const;

export function LeadDetail({ leadId }: { leadId: string }) {
  const { data: lead, error, loading, refresh } = useOperationQuery<LeadDetailData>(`/api/operacao/leads/${leadId}`);
  const [callOpen, setCallOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [lossOpen, setLossOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  async function updateLead(payload: Record<string, unknown>) {
    setSaving(true); setActionError(null);
    try {
      await operationFetch(`/api/operacao/leads/${leadId}`, { method: "PATCH", body: JSON.stringify(payload) });
      await refresh();
      return true;
    } catch (cause) { setActionError(cause instanceof Error ? cause.message : "A alteração não pôde ser salva."); return false; }
    finally { setSaving(false); }
  }

  async function registerCall(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setActionError(null);
    const values = new FormData(event.currentTarget);
    try {
      await operationFetch(`/api/operacao/leads/${leadId}/calls`, {
        method: "POST",
        body: JSON.stringify({
          outcome: values.get("outcome"), notes: values.get("notes") || undefined,
          nextAction: values.get("nextAction") || undefined,
          nextActionAt: values.get("nextActionAt") ? new Date(String(values.get("nextActionAt"))).toISOString() : undefined,
          whatsappConsent: values.get("whatsappConsent") === "on",
        }),
      });
      setCallOpen(false); await refresh();
    } catch (cause) { setActionError(cause instanceof Error ? cause.message : "A ligação não pôde ser registrada."); }
    finally { setSaving(false); }
  }

  async function requestPreview() {
    setSaving(true); setActionError(null);
    try { await operationFetch("/api/operacao/previews", { method: "POST", body: JSON.stringify({ leadId }) }); await refresh(); }
    catch (cause) { setActionError(cause instanceof Error ? cause.message : "Não foi possível solicitar o preview."); }
    finally { setSaving(false); }
  }

  async function deliverPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lead?.preview) return;
    setSaving(true); setActionError(null);
    try { await operationFetch(`/api/operacao/previews/${lead.preview.id}`, { method: "PATCH", body: JSON.stringify({ url: previewUrl, status: "ready" }) }); setPreviewUrl(""); await refresh(); }
    catch (cause) { setActionError(cause instanceof Error ? cause.message : "Não foi possível entregar o preview."); }
    finally { setSaving(false); }
  }

  async function markPreviewPresented() {
    if (!lead?.preview) return;
    setSaving(true); setActionError(null);
    try {
      await operationFetch(`/api/operacao/previews/${lead.preview.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "presented" }),
      });
      await refresh();
    } catch (cause) {
      setActionError(cause instanceof Error ? cause.message : "Não foi possível registrar a apresentação.");
    } finally { setSaving(false); }
  }

  async function markLost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reason = String(new FormData(event.currentTarget).get("lossReason") ?? "").trim();
    if (await updateLead({ stage: "lost", lossReason: reason })) setLossOpen(false);
  }

  async function blockContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reason = String(new FormData(event.currentTarget).get("blockReason") ?? "").trim();
    if (await updateLead({ doNotContact: true, doNotContactReason: reason })) setBlockOpen(false);
  }

  if (loading) return <OperationPage><LoadingGrid cards={3} /></OperationPage>;
  if (error || !lead) return <OperationPage><ErrorState message={error ?? "Lead não encontrado."} onRetry={refresh} /></OperationPage>;

  return (
    <OperationPage>
      <Link href="/operacao/crm" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Voltar ao CRM</Link>
      <PageHeading eyebrow={`CRM · ${lead.source ?? "origem não informada"}`} title={lead.companyName} description={lead.nextAction ? `Próxima ação: ${lead.nextAction}` : "Defina a próxima ação para manter esta oportunidade em movimento."} actions={
        <>
          <Button asChild variant="outline"><Link href={`/operacao/gaspar?lead=${lead.id}`}><Bot /> Perguntar ao Gaspar</Link></Button>
          <Dialog open={callOpen} onOpenChange={setCallOpen}>
            <DialogTrigger asChild><Button className="bg-action hover:bg-action-hover" disabled={lead.doNotContact}><PhoneCall /> Registrar ligação</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Registrar resultado da ligação</DialogTitle><DialogDescription>O clique para ligar não conta como tentativa. Confirme aqui o que realmente aconteceu.</DialogDescription></DialogHeader>
              <form onSubmit={registerCall} className="space-y-4">
                <div className="space-y-2"><Label htmlFor="outcome">Resultado</Label><select id="outcome" name="outcome" required className="h-10 w-full rounded-md border border-input bg-sunken px-3 text-sm">{outcomes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
                <div className="space-y-2"><Label htmlFor="notes">Observação</Label><Textarea id="notes" name="notes" placeholder="Contexto útil para o próximo contato" /></div>
                <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="nextAction">Próxima ação</Label><Input id="nextAction" name="nextAction" placeholder="Ex.: enviar apresentação" /></div><div className="space-y-2"><Label htmlFor="nextActionAt">Quando</Label><Input id="nextActionAt" name="nextActionAt" type="datetime-local" /></div></div>
                <label className="flex items-start gap-3 rounded-lg border border-primary/15 p-3 text-sm"><Checkbox name="whatsappConsent" className="mt-0.5" /><span><strong className="block font-medium">Autorizou contato pelo WhatsApp</strong><span className="mt-1 block text-xs text-muted-foreground">Registre apenas quando houver autorização durante o atendimento.</span></span></label>
                <Button type="submit" className="w-full bg-action hover:bg-action-hover" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <CheckCircle2 />} Salvar ligação</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      } />

      {actionError ? <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger" role="alert">{actionError}</div> : null}
      <Dialog open={lossOpen} onOpenChange={setLossOpen}><DialogContent><DialogHeader><DialogTitle>Marcar oportunidade como perdida</DialogTitle><DialogDescription>O motivo fica registrado para análise da operação.</DialogDescription></DialogHeader><form onSubmit={markLost} className="space-y-4"><div className="space-y-2"><Label htmlFor="lossReason">Motivo da perda</Label><Textarea id="lossReason" name="lossReason" required minLength={3} placeholder="Ex.: sem orçamento neste momento" /></div><Button type="submit" variant="destructive" className="w-full" disabled={saving}>Confirmar perda</Button></form></DialogContent></Dialog>
      <Dialog open={blockOpen} onOpenChange={setBlockOpen}><DialogContent><DialogHeader><DialogTitle>Bloquear novos contatos</DialogTitle><DialogDescription>Chamadas e envios ficarão interrompidos até o bloqueio ser removido.</DialogDescription></DialogHeader><form onSubmit={blockContact} className="space-y-4"><div className="space-y-2"><Label htmlFor="blockReason">Motivo do bloqueio</Label><Textarea id="blockReason" name="blockReason" required minLength={3} placeholder="Ex.: solicitou não receber novos contatos" /></div><Button type="submit" variant="destructive" className="w-full" disabled={saving}>Bloquear contato</Button></form></DialogContent></Dialog>
      {lead.doNotContact ? <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4"><Ban className="mt-0.5 size-5 shrink-0 text-danger" /><div><p className="font-medium text-danger">Contato bloqueado</p><p className="mt-1 text-sm text-muted-foreground">Novas abordagens e envios estão interrompidos até revisão explícita do bloqueio.</p></div></div> : null}

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <Card className="panel">
            <CardHeader className="border-b border-primary/15"><CardTitle>Linha do tempo</CardTitle></CardHeader>
            <CardContent className="pt-1">
              {lead.activities.length === 0 ? <EmptyState title="Histórico ainda vazio" description="Ligações, mudanças de etapa e mensagens registradas aparecerão aqui." /> : (
                <ol className="relative ml-2 border-l border-primary/20 pl-6">{lead.activities.map((activity) => <li key={activity.id} className="relative pb-7 last:pb-1"><span className="absolute -left-[29px] top-1.5 size-2 rounded-full bg-signal ring-4 ring-background" /><div className="flex flex-wrap items-center gap-2"><p className="font-medium text-soft">{activity.description}</p><StatusPill>{activity.type}</StatusPill></div><p className="mt-1 text-xs text-subtle">{activity.authorName ?? "Sistema"} · {formatDate(activity.createdAt)}</p></li>)}</ol>
              )}
            </CardContent>
          </Card>

          <Card className="panel">
            <CardHeader className="border-b border-primary/15"><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {!lead.preview ? <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">Nenhum preview solicitado</p><p className="mt-1 text-sm text-muted-foreground">A solicitação cria uma tarefa de produção para Vinícius.</p></div><Button onClick={() => void requestPreview()} disabled={saving || lead.doNotContact}><Plus /> Solicitar preview</Button></div> : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3"><div><StatusPill tone={lead.preview.url ? "success" : "info"}>{lead.preview.status}</StatusPill><p className="mt-2 text-sm text-muted-foreground">{lead.preview.status === "presented" ? "Preview apresentado ao lead." : lead.preview.url ? "Preview pronto para apresentação." : "Produção em andamento."}</p></div><div className="flex flex-wrap gap-2">{lead.preview.url ? <Button asChild variant="outline"><a href={lead.preview.url} target="_blank" rel="noreferrer">Abrir preview <ExternalLink /></a></Button> : null}{lead.preview.status === "ready" ? <Button onClick={() => void markPreviewPresented()} disabled={saving}><CheckCircle2 /> Registrar apresentação</Button> : null}</div></div>
                  {!lead.preview.url ? <form onSubmit={deliverPreview} className="mt-5 flex flex-col gap-3 sm:flex-row"><Input name="preview-url" type="url" autoComplete="off" required value={previewUrl} onChange={(event) => setPreviewUrl(event.target.value)} placeholder="https://preview…" className="bg-sunken" aria-label="Link do preview" /><Button type="submit" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Send />} Marcar como pronto</Button></form> : null}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card className="panel gap-4"><CardHeader><CardTitle>Estado da oportunidade</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label htmlFor="stage">Etapa</Label><select id="stage" value={lead.stage} onChange={(event) => { const stage = event.target.value; if (stage === "lost") setLossOpen(true); else void updateLead({ stage, lossReason: null }); }} disabled={saving} className="h-10 w-full rounded-md border border-input bg-sunken px-3 text-sm">{stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.label}</option>)}</select></div><div className="rounded-lg bg-sunken p-3"><p className="font-mono text-[9px] uppercase tracking-wider text-subtle">Valor proposto</p><p className="mt-1 font-medium">{formatMoney(lead.proposedValue)}</p></div><Button variant={lead.doNotContact ? "outline" : "destructive"} className="w-full" onClick={() => { if (lead.doNotContact) void updateLead({ doNotContact: false, doNotContactReason: null }); else setBlockOpen(true); }}>{lead.doNotContact ? "Liberar contato" : "Marcar como não contatar"}</Button></CardContent></Card>
          <Card className="panel gap-4"><CardHeader><CardTitle>Contato</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><p className="flex gap-2 text-muted-foreground"><UserRound className="size-4 text-signal" />{lead.contactName ?? "Nome não informado"}</p><p className="flex gap-2 text-muted-foreground"><PhoneCall className="size-4 text-signal" />{lead.phone ?? "Telefone não informado"}</p><p className="flex gap-2 text-muted-foreground"><MessageCircle className="size-4 text-signal" />{lead.whatsappConsent ? "WhatsApp autorizado" : "Autorização não registrada"}</p><p className="flex gap-2 text-muted-foreground"><CalendarClock className="size-4 text-signal" />{formatDate(lead.nextActionAt)}</p></CardContent></Card>
        </aside>
      </div>
    </OperationPage>
  );
}

