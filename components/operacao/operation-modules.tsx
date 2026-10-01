"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Check, CircleAlert, ExternalLink, Loader2, Plus, Send, ShieldCheck, Sparkles } from "lucide-react";
import { operationFetch, useOperationQuery } from "@/components/operacao/api";
import { EmptyState, ErrorState, LoadingGrid, MetricCard, OperationPage, PageHeading, StatusPill, formatDate, formatMoney } from "@/components/operacao/page-ui";
import { useOperationSession } from "@/components/operacao/operation-shell";
import type { ConversationItem, MessageItem, TaskItem } from "@/components/operacao/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ConversationsResponse = { items: ConversationItem[]; total: number };
type MessagesResponse = { items: MessageItem[]; total: number };

export function ConversationsPage() {
  const session = useOperationSession();
  const { data, error, loading, refresh } = useOperationQuery<ConversationsResponse>("/api/operacao/conversations");
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const conversations = data?.items ?? [];
  const selectedId = selected ?? conversations[0]?.id ?? null;
  const selectedConversation = conversations.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    operationFetch<MessagesResponse>(`/api/operacao/conversations/${selectedId}/messages`)
      .then((value) => { if (active) setMessages(value.items); })
      .catch(() => { if (active) setMessages([]); })
      .finally(() => { if (active) setMessagesLoading(false); });
    return () => { active = false; };
  }, [selectedId]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConversation || !body.trim()) return;
    setSending(true);
    const manual = !session?.integrations.whatsapp;
    try {
      await operationFetch(manual ? "/api/operacao/conversations/manual-follow-up" : "/api/operacao/whatsapp/send", {
        method: "POST",
        body: JSON.stringify(manual
          ? { conversationId: selectedConversation.id, leadId: selectedConversation.leadId, body: body.trim() }
          : { conversationId: selectedConversation.id, body: body.trim() }),
      });
      setBody("");
      const next = await operationFetch<MessagesResponse>(`/api/operacao/conversations/${selectedConversation.id}/messages`);
      setMessages(next.items);
      await refresh();
    } finally { setSending(false); }
  }

  return <OperationPage>
    <PageHeading eyebrow="Conversas" title="O relacionamento em um só lugar." description="Acompanhe mensagens sincronizadas e registre manualmente os contatos quando o WhatsApp ainda não estiver conectado." />
    {!session?.integrations.whatsapp ? <div className="flex flex-col gap-4 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><CircleAlert className="mt-0.5 size-5 shrink-0 text-warning" /><div><p className="font-medium text-warning">WhatsApp não sincronizado</p><p className="mt-1 text-sm text-muted-foreground">Abra o aplicativo para conversar e registre aqui o acompanhamento realizado.</p></div></div><Button asChild variant="outline"><a href="https://web.whatsapp.com" target="_blank" rel="noreferrer">Abrir WhatsApp <ExternalLink /></a></Button></div> : null}
    {loading ? <LoadingGrid /> : error ? <ErrorState message={error} onRetry={refresh} /> : conversations.length === 0 ? <EmptyState title="Nenhuma conversa encontrada" description="Quando um contato for iniciado ou registrado, o histórico aparecerá aqui." /> : (
      <Card className="panel min-h-[620px] gap-0 overflow-hidden py-0 lg:grid lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-primary/15 lg:border-b-0 lg:border-r"><div className="border-b border-primary/15 p-4"><p className="font-mono text-[10px] uppercase tracking-wider text-subtle">Caixa de entrada · {conversations.length}</p></div><div className="max-h-56 overflow-auto lg:max-h-[570px]">{conversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => { setMessagesLoading(true); setSelected(conversation.id); }} className={`w-full border-b border-primary/10 p-4 text-left hover:bg-raised/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${selectedId === conversation.id ? "bg-raised" : ""}`}><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-medium">{conversation.leadName}</p>{conversation.unreadCount ? <span className="grid size-5 place-items-center rounded-full bg-action text-[10px] text-white">{conversation.unreadCount}</span> : null}</div><p className="mt-2 truncate text-xs text-muted-foreground">{conversation.lastMessage ?? "Sem mensagem"}</p></button>)}</div></aside>
        <section className="flex min-h-[420px] flex-col"><header className="flex items-center justify-between border-b border-primary/15 p-4"><div><h2 className="font-medium">{selectedConversation?.leadName}</h2><p className="mt-1 text-xs text-subtle">{selectedConversation?.contactName ?? "Contato não informado"}</p></div><StatusPill tone={session?.integrations.whatsapp ? "info" : "warning"}>{session?.integrations.whatsapp ? "Sincronizada" : "Registro manual"}</StatusPill></header><div className="flex flex-1 flex-col gap-3 overflow-auto bg-sunken/40 p-4 sm:p-6" aria-live="polite">{messagesLoading ? <Loader2 className="mx-auto mt-16 animate-spin text-signal" /> : messages.length === 0 ? <EmptyState title="Sem mensagens registradas" description="Use o campo abaixo para registrar o acompanhamento desta conversa." /> : messages.map((message) => <div key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.direction === "outbound" ? "ml-auto bg-action text-action-foreground" : "mr-auto border border-primary/15 bg-card"}`}><p className="break-words whitespace-pre-wrap leading-6">{message.body}</p><p className={`mt-2 text-[10px] ${message.direction === "outbound" ? "text-action-foreground/70" : "text-subtle"}`}>{formatDate(message.createdAt)} · {message.status ?? "registrada"}</p></div>)}</div><form onSubmit={submit} className="flex gap-2 border-t border-primary/15 p-4"><Input name="message" autoComplete="off" value={body} onChange={(event) => setBody(event.target.value)} placeholder={session?.integrations.whatsapp ? "Escreva uma mensagem…" : "O que foi tratado no WhatsApp?"} className="h-11 bg-sunken" aria-label="Mensagem" /><Button type="submit" size="icon-lg" disabled={sending || !body.trim()} aria-label="Enviar mensagem">{sending ? <Loader2 className="animate-spin" /> : <Send />}</Button></form></section>
      </Card>
    )}
  </OperationPage>;
}

type TasksResponse = { items: TaskItem[]; total: number };
export function TasksPage() {
  const { data, error, loading, refresh } = useOperationQuery<TasksResponse>("/api/operacao/tasks");
  const tasks = data?.items ?? [];
  async function complete(id: string) { await operationFetch(`/api/operacao/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status: "done" }) }); await refresh(); }
  const pending = tasks.filter((task) => task.status !== "done" && task.status !== "canceled");
  const completeItems = tasks.filter((task) => task.status === "done");
  return <OperationPage><PageHeading eyebrow="Tarefas e previews" title="Produção com passagem de bastão." description="Acompanhe o que está pendente, quem precisa agir e os previews ligados a cada oportunidade." />{loading ? <LoadingGrid /> : error ? <ErrorState message={error} onRetry={refresh} /> : tasks.length === 0 ? <EmptyState title="Nenhuma tarefa criada" description="Solicitações de preview e próximas ações automáticas aparecerão aqui." /> : <div className="grid gap-5 xl:grid-cols-2"><TaskList title="Pendentes" items={pending} onComplete={complete} /><TaskList title="Concluídas" items={completeItems} /></div>}</OperationPage>;
}

function TaskList({ title, items, onComplete }: { title: string; items: TaskItem[]; onComplete?: (id: string) => Promise<void> }) {
  return <Card className="panel"><CardHeader className="border-b border-primary/15"><CardTitle>{title} · {items.length}</CardTitle></CardHeader><CardContent className="px-0">{items.length === 0 ? <EmptyState title={`Sem tarefas ${title.toLocaleLowerCase("pt-BR")}`} description="Esta lista está atualizada." /> : <ul className="divide-y divide-primary/10">{items.map((task) => <li key={task.id} className="flex items-start gap-3 p-5">{onComplete ? <button type="button" onClick={() => void onComplete(task.id)} className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 text-subtle hover:text-signal" aria-label={`Concluir ${task.title}`}><Check className="size-4" /></button> : <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-signal"><Check className="size-4" /></div>}<div className="min-w-0 flex-1"><p className="font-medium text-soft">{task.title}</p><p className="mt-1 text-xs text-muted-foreground">{task.leadName ?? "Operação interna"} · {task.assigneeName ?? "Sem responsável"}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-subtle">{formatDate(task.dueAt)}</p>{task.leadId ? <Button asChild variant="link" size="sm" className="mt-2 h-auto p-0 text-signal"><Link href={`/operacao/crm/${task.leadId}`}>Abrir oportunidade</Link></Button> : null}</div></li>)}</ul>}</CardContent></Card>;
}

type GasparReply = { answer: string; sources?: { label: string; reference?: string }[] };
type ChatItem = { id: string; role: "user" | "assistant"; content: string; sources?: GasparReply["sources"] };
export function GasparPage({ leadId }: { leadId?: string }) {
  const [messages, setMessages] = useState<ChatItem[]>([{ id: "intro", role: "assistant", content: "Olá. Posso ajudar a priorizar retornos, resumir um lead ou preparar uma abordagem com base no playbook da GaspLab." }]);
  const [message, setMessage] = useState(""); const [pending, setPending] = useState(false); const [error, setError] = useState<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!message.trim()) return; const prompt = message.trim(); setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: prompt }]); setMessage(""); setPending(true); setError(null); try { const reply = await operationFetch<GasparReply>("/api/operacao/gaspar", { method: "POST", body: JSON.stringify({ message: prompt, leadId }) }); setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: reply.answer, sources: reply.sources }]); } catch (cause) { setError(cause instanceof Error ? cause.message : "O Gaspar não conseguiu responder agora."); } finally { setPending(false); } }
  return <OperationPage><PageHeading eyebrow="Gaspar" title="Clareza para o próximo passo." description="Assistente consultivo da GaspLab. Ele sugere, resume e prepara rascunhos; decisões e envios continuam com você." />
    <div className="grid gap-5 xl:grid-cols-[1fr_300px]"><Card className="panel min-h-[640px] gap-0 py-0"><div className="flex-1 space-y-4 p-5 sm:p-7" aria-live="polite">{messages.map((item) => <div key={item.id} className={`flex gap-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}>{item.role === "assistant" ? <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-signal"><Bot className="size-4" /></div> : null}<div className={`max-w-[85%] rounded-2xl px-4 py-3 ${item.role === "user" ? "bg-action text-action-foreground" : "border border-primary/15 bg-sunken"}`}><p className="break-words whitespace-pre-wrap text-sm leading-6">{item.content}</p>{item.sources?.length ? <div className="mt-3 border-t border-primary/15 pt-2 font-mono text-[9px] uppercase tracking-wider text-subtle">Fontes: {item.sources.map((source) => source.label).join(" · ")}</div> : null}</div></div>)}{pending ? <div className="flex items-center gap-3 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin text-signal" /> Gaspar está consultando o contexto disponível…</div> : null}{error ? <p className="text-sm text-danger" role="alert">{error}</p> : null}</div><form onSubmit={submit} className="flex gap-2 border-t border-primary/15 p-4"><Input name="gaspar-message" autoComplete="off" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Pergunte sobre um lead, objeção ou prioridade…" className="h-11 bg-sunken" aria-label="Pergunta para o Gaspar" /><Button type="submit" size="icon-lg" disabled={pending || !message.trim()} aria-label="Enviar pergunta ao Gaspar"><Send /></Button></form></Card><aside className="space-y-3"><p className="eyebrow">Sugestões</p>{["Quais retornos devo priorizar hoje?", "Como responder à objeção de preço?", "Prepare uma mensagem para apresentar um preview."].map((suggestion) => <button key={suggestion} type="button" onClick={() => setMessage(suggestion)} className="w-full rounded-xl border border-primary/15 bg-card p-4 text-left text-sm leading-5 text-muted-foreground hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"><Sparkles className="mb-3 size-4 text-signal" />{suggestion}</button>)}<div className="rounded-xl border border-primary/15 bg-sunken p-4 text-xs leading-5 text-subtle"><ShieldCheck className="mb-2 size-4 text-signal" />O Gaspar não envia mensagens, altera etapas nem inventa preços ausentes do playbook.</div></aside></div>
  </OperationPage>;
}

type Metrics = { calls?: number; uniqueLeads?: number; answered?: number; interested?: number; previewsRequested?: number; previewsDelivered?: number; won?: number; lost?: number; negotiatedValue?: number; overdueTasks?: number; withoutNextAction?: number; lossesByReason?: { reason: string; count: number }[] };
export function ManagementPage() {
  const { data, error, loading, refresh } = useOperationQuery<Metrics>("/api/operacao/management/metrics");
  return <OperationPage><PageHeading eyebrow="Gestão" title="Controle para agir, não só observar." description="Indicadores calculados a partir dos registros reais da operação. Cada número deve levar a uma conversa ou correção objetiva." />{loading ? <LoadingGrid cards={4} /> : error ? <ErrorState message={error} onRetry={refresh} /> : <><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Tentativas de ligação" value={data?.calls ?? 0} hint={`${data?.uniqueLeads ?? 0} leads únicos trabalhados`} /><MetricCard label="Atendidas" value={data?.answered ?? 0} hint={`de ${data?.calls ?? 0} tentativas registradas`} /><MetricCard label="Interessados" value={data?.interested ?? 0} hint={`de ${data?.answered ?? 0} ligações atendidas`} /><MetricCard label="Valor negociado" value={formatMoney(data?.negotiatedValue)} hint={`${data?.won ?? 0} oportunidades ganhas`} /></section><section className="grid gap-5 lg:grid-cols-3"><Card className="panel"><CardHeader><CardTitle>Previews</CardTitle></CardHeader><CardContent className="space-y-3"><ManagementRow label="Solicitados" value={data?.previewsRequested ?? 0} /><ManagementRow label="Entregues" value={data?.previewsDelivered ?? 0} /></CardContent></Card><Card className="panel"><CardHeader><CardTitle>Higiene do funil</CardTitle></CardHeader><CardContent className="space-y-3"><ManagementRow label="Tarefas vencidas" value={data?.overdueTasks ?? 0} /><ManagementRow label="Sem próxima ação" value={data?.withoutNextAction ?? 0} /></CardContent></Card><Card className="panel"><CardHeader><CardTitle>Encerramentos</CardTitle></CardHeader><CardContent className="space-y-3"><ManagementRow label="Ganhos" value={data?.won ?? 0} /><ManagementRow label="Perdidos" value={data?.lost ?? 0} /></CardContent></Card></section>{(data?.lossesByReason?.length ?? 0) > 0 ? <Card className="panel"><CardHeader><CardTitle>Motivos de perda</CardTitle></CardHeader><CardContent className="space-y-3">{data?.lossesByReason?.map((item) => <ManagementRow key={item.reason} label={item.reason} value={item.count} />)}</CardContent></Card> : null}</>}</OperationPage>;
}
function ManagementRow({ label, value }: { label: string; value: string | number }) { return <div className="flex items-center justify-between rounded-lg bg-sunken p-3"><span className="text-sm text-muted-foreground">{label}</span><strong className="font-mono text-sm text-soft">{value}</strong></div>; }

type KnowledgeItem = { id: string; title: string; updatedAt?: string };
type KnowledgeResponse = { items: KnowledgeItem[] };
type MemberItem = { id: string; email?: string | null; displayName?: string | null; role: "admin" | "member"; status: "invited" | "active" | "disabled"; invitedAt?: string | null };
type MembersResponse = { items: MemberItem[] };
export function SettingsPage() {
  const session = useOperationSession();
  const { data, error, loading, refresh } = useOperationQuery<KnowledgeResponse>("/api/operacao/knowledge");
  const members = useOperationQuery<MembersResponse>("/api/operacao/members");
  const [saving, setSaving] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  if (session?.member.role !== "admin") return <OperationPage><ErrorState message="Esta área é reservada ao administrador da operação." /></OperationPage>;
  async function addKnowledge(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); const form = event.currentTarget; const values = new FormData(form); try { await operationFetch("/api/operacao/knowledge", { method: "POST", body: JSON.stringify({ title: values.get("title"), content: values.get("content"), status: "published" }) }); form.reset(); await refresh(); } finally { setSaving(false); } }
  async function inviteMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setInviteError(null);
    const form = event.currentTarget; const values = new FormData(form);
    try {
      await operationFetch("/api/operacao/members", { method: "POST", body: JSON.stringify({ displayName: values.get("displayName"), email: values.get("email"), role: values.get("role") }) });
      form.reset(); await members.refresh();
    } catch (cause) { setInviteError(cause instanceof Error ? cause.message : "Não foi possível enviar o convite."); }
    finally { setSaving(false); }
  }
  return <OperationPage><PageHeading eyebrow="Configurações" title="Governança da operação." description="Acompanhe as integrações e mantenha a base de conhecimento que orienta o Gaspar." />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(session.integrations).map(([name, connected]) => <Card key={name} className="panel gap-3 py-5"><CardContent className="px-5"><div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{name}</p><StatusPill tone={connected ? "success" : "warning"}>{connected ? "Conectado" : "Pendente"}</StatusPill></div><p className="mt-4 text-sm text-muted-foreground">{connected ? "Integração disponível para a operação." : "Configure as credenciais no ambiente seguro da aplicação."}</p></CardContent></Card>)}</section>
    <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><Card className="panel"><CardHeader><CardTitle>Convidar colaborador</CardTitle></CardHeader><CardContent><form onSubmit={inviteMember} className="space-y-4"><div className="space-y-2"><Label htmlFor="member-name">Nome</Label><Input id="member-name" name="displayName" required placeholder="Gabriel" /></div><div className="space-y-2"><Label htmlFor="member-email">E-mail</Label><Input id="member-email" name="email" type="email" required placeholder="gabriel@empresa.com" /></div><div className="space-y-2"><Label htmlFor="member-role">Papel</Label><select id="member-role" name="role" defaultValue="member" className="h-10 w-full rounded-md border border-input bg-sunken px-3 text-sm"><option value="member">Comercial</option><option value="admin">Administrador</option></select></div>{inviteError ? <p className="text-sm text-danger" role="alert">{inviteError}</p> : null}<Button type="submit" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Plus />} Enviar convite</Button></form></CardContent></Card><Card className="panel"><CardHeader><CardTitle>Acessos da operação</CardTitle></CardHeader><CardContent>{members.loading ? <LoadingGrid cards={2} /> : members.error ? <ErrorState message={members.error} onRetry={members.refresh} /> : (members.data?.items.length ?? 0) === 0 ? <EmptyState title="Nenhum acesso configurado" description="Convide o primeiro colaborador para a operação." /> : <ul className="divide-y divide-primary/10">{members.data?.items.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 py-4"><div><p className="font-medium">{item.displayName ?? item.email ?? "Usuário"}</p><p className="mt-1 text-xs text-subtle">{item.email ?? "E-mail vinculado no Supabase"} · {item.role === "admin" ? "Administrador" : "Comercial"}</p></div><StatusPill tone={item.status === "active" ? "success" : "warning"}>{item.status === "active" ? "Ativo" : item.status === "invited" ? "Convidado" : "Desativado"}</StatusPill></li>)}</ul>}</CardContent></Card></div>
    <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><Card className="panel"><CardHeader><CardTitle>Adicionar ao playbook</CardTitle></CardHeader><CardContent><form onSubmit={addKnowledge} className="space-y-4"><div className="space-y-2"><Label htmlFor="knowledge-title">Título</Label><Input id="knowledge-title" name="title" required placeholder="Ex.: Objeções frequentes" /></div><div className="space-y-2"><Label htmlFor="knowledge-content">Conteúdo aprovado</Label><Textarea id="knowledge-content" name="content" required rows={10} placeholder="Registre a orientação que o Gaspar poderá consultar." /></div><Button type="submit" disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : <Plus />} Salvar documento</Button></form></CardContent></Card><Card className="panel"><CardHeader><CardTitle>Base de conhecimento</CardTitle></CardHeader><CardContent>{loading ? <LoadingGrid cards={2} /> : error ? <ErrorState message={error} onRetry={refresh} /> : (data?.items.length ?? 0) === 0 ? <EmptyState title="Playbook ainda vazio" description="Adicione oferta, qualificação, objeções e critérios de passagem de etapa." /> : <ul className="divide-y divide-primary/10">{data?.items.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 py-4"><div><p className="font-medium">{item.title}</p><p className="mt-1 text-xs text-subtle">Atualizado em {formatDate(item.updatedAt)}</p></div><StatusPill>Ativo</StatusPill></li>)}</ul>}</CardContent></Card></div>
  </OperationPage>;
}

