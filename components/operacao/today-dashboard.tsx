"use client";

import Link from "next/link";
import { ArrowRight, Check, MessageCircle, PhoneCall, Plus } from "lucide-react";
import { operationFetch, useOperationQuery } from "@/components/operacao/api";
import { EmptyState, ErrorState, LoadingGrid, MetricCard, OperationPage, PageHeading, StatusPill, formatDate } from "@/components/operacao/page-ui";
import type { DashboardData } from "@/components/operacao/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const emptyDashboard: DashboardData = { tasks: [], followUps: [], conversations: [] };

export function TodayDashboard() {
  const { data, error, loading, refresh } = useOperationQuery<DashboardData>("/api/operacao/dashboard");
  const dashboard = data ?? emptyDashboard;

  async function completeTask(taskId: string) {
    await operationFetch(`/api/operacao/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "done" }),
    });
    await refresh();
  }

  return (
    <OperationPage>
      <PageHeading
        eyebrow="Meu dia"
        title="O próximo passo está aqui."
        description="Retornos, tarefas e conversas que pedem atenção hoje, organizados para você avançar sem perder contexto."
        actions={<Button asChild className="bg-action hover:bg-action-hover"><Link href="/operacao/prospeccao"><Plus /> Buscar oportunidades</Link></Button>}
      />

      {loading ? <LoadingGrid cards={4} /> : error ? <ErrorState message={error} onRetry={refresh} /> : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores de hoje">
            <MetricCard label="Tentativas hoje" value={dashboard.stats?.callsToday ?? 0} hint="Ligações registradas" />
            <MetricCard label="Atendidas" value={dashboard.stats?.answeredToday ?? 0} hint="Pessoas que atenderam" />
            <MetricCard label="Interessados" value={dashboard.stats?.interestedToday ?? 0} hint="Interesse confirmado" />
            <MetricCard label="Em atraso" value={dashboard.stats?.overdueCount ?? 0} hint="Ações que precisam de revisão" />
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
            <Card className="panel">
              <CardHeader className="border-b border-primary/15">
                <div>
                  <p className="eyebrow">Prioridade</p>
                  <CardTitle className="mt-2">Retornos e próximas ligações</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                {dashboard.followUps.length === 0 ? (
                  <EmptyState title="Nenhum retorno pendente" description="Quando uma próxima ação for agendada no CRM, ela aparecerá aqui." />
                ) : (
                  <ul className="divide-y divide-primary/10">
                    {dashboard.followUps.map((item) => (
                      <li key={item.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 gap-3">
                          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-signal"><PhoneCall className="size-4" /></div>
                          <div className="min-w-0">
                            <Link href={`/operacao/crm/${item.leadId}`} className="font-medium text-soft hover:text-signal">{item.leadName}</Link>
                            <p className="mt-1 truncate text-sm text-muted-foreground">{item.nextAction}</p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-subtle">{formatDate(item.dueAt)}</p>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline"><Link href={`/operacao/crm/${item.leadId}`}>Abrir lead <ArrowRight /></Link></Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="panel">
              <CardHeader className="border-b border-primary/15">
                <div>
                  <p className="eyebrow">Execução</p>
                  <CardTitle className="mt-2">Minhas tarefas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                {dashboard.tasks.length === 0 ? (
                  <EmptyState title="Dia organizado" description="Não há tarefas atribuídas neste momento." />
                ) : (
                  <ul className="divide-y divide-primary/10">
                    {dashboard.tasks.slice(0, 6).map((task) => (
                      <li key={task.id} className="flex items-center gap-3 px-5 py-4">
                        <button
                          type="button"
                          onClick={() => void completeTask(task.id)}
                          className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 text-subtle hover:border-signal hover:text-signal"
                          aria-label={`Concluir ${task.title}`}
                        ><Check className="size-4" /></button>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{task.title}</p>
                          <p className="mt-1 text-xs text-subtle">{task.leadName ?? "Operação interna"} · {formatDate(task.dueAt)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t border-primary/10 p-4"><Button asChild variant="ghost" className="w-full"><Link href="/operacao/tarefas">Ver todas as tarefas <ArrowRight /></Link></Button></div>
              </CardContent>
            </Card>
          </div>

          <Card className="panel">
            <CardHeader className="flex-row items-center justify-between border-b border-primary/15">
              <div><p className="eyebrow">WhatsApp</p><CardTitle className="mt-2">Conversas aguardando você</CardTitle></div>
              <MessageCircle className="size-5 text-signal" />
            </CardHeader>
            <CardContent className="grid gap-3 pt-5 md:grid-cols-2 xl:grid-cols-3">
              {dashboard.conversations.length === 0 ? (
                <div className="md:col-span-2 xl:col-span-3"><EmptyState title="Nenhuma conversa pendente" description="Mensagens sincronizadas ou acompanhamentos manuais aparecem aqui." /></div>
              ) : dashboard.conversations.slice(0, 3).map((conversation) => (
                <Link key={conversation.id} href={`/operacao/conversas?conversa=${conversation.id}`} className="rounded-xl border border-primary/15 bg-sunken p-4 hover:border-primary/40">
                  <div className="flex items-center justify-between gap-3"><p className="font-medium">{conversation.leadName}</p><StatusPill tone={conversation.syncStatus === "synced" ? "info" : "warning"}>{conversation.syncStatus === "synced" ? "Sincronizada" : "Manual"}</StatusPill></div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{conversation.lastMessage ?? "Sem mensagem registrada"}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </OperationPage>
  );
}

