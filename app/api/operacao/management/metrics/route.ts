import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";

const querySchema = z.object({
  from: z.string().date().optional(),
  to: z.string().date().optional(),
  ownerMemberId: z.string().uuid().optional(),
});

export async function GET(request: Request) {
  try {
    const { supabase, member } = await requireApiUser();
    const query = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    const to = query.to ? new Date(`${query.to}T23:59:59.999Z`) : new Date();
    const from = query.from
      ? new Date(`${query.from}T00:00:00.000Z`)
      : new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);

    let opportunitiesQuery = supabase
      .from("opportunities")
      .select("id, lead_id, stage, next_action, proposal_value, loss_reason, created_at")
      .eq("organization_id", member.organizationId)
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString());
    if (query.ownerMemberId) {
      opportunitiesQuery = opportunitiesQuery.eq(
        "owner_member_id",
        query.ownerMemberId,
      );
    }

    const [opportunitiesResult, callsResult, previewsResult, tasksResult] =
      await Promise.all([
        opportunitiesQuery,
        supabase
          .from("activities")
          .select("id, lead_id, call_outcome")
          .eq("organization_id", member.organizationId)
          .eq("type", "call")
          .gte("occurred_at", from.toISOString())
          .lte("occurred_at", to.toISOString()),
        supabase
          .from("previews")
          .select("id, status")
          .eq("organization_id", member.organizationId)
          .gte("requested_at", from.toISOString())
          .lte("requested_at", to.toISOString()),
        supabase
          .from("tasks")
          .select("id, status, due_at")
          .eq("organization_id", member.organizationId),
      ]);
    for (const result of [
      opportunitiesResult,
      callsResult,
      previewsResult,
      tasksResult,
    ]) {
      if (result.error) throw result.error;
    }

    const opportunities = opportunitiesResult.data ?? [];
    const calls = callsResult.data ?? [];
    const previews = previewsResult.data ?? [];
    const now = Date.now();
    const byStage = opportunities.reduce<Record<string, number>>((acc, item) => {
      acc[item.stage] = (acc[item.stage] ?? 0) + 1;
      return acc;
    }, {});
    const refusalReasons = opportunities.reduce<Record<string, number>>(
      (acc, item) => {
        if (item.stage === "lost") {
          const reason = item.loss_reason ?? "Sem motivo informado";
          acc[reason] = (acc[reason] ?? 0) + 1;
        }
        return acc;
      },
      {},
    );
    const answered = calls.filter((call) =>
      ["no_decision", "interested", "declined"].includes(call.call_outcome ?? ""),
    ).length;
    const interested = calls.filter(
      (call) => call.call_outcome === "interested",
    ).length;

    return dataResponse({
      period: { from: from.toISOString(), to: to.toISOString() },
      calls: calls.length,
      uniqueLeads: new Set(calls.map((call) => call.lead_id)).size,
      answered,
      interested,
      declined: calls.filter((call) => call.call_outcome === "declined").length,
      answerRate: { numerator: answered, denominator: calls.length },
      interestRate: { numerator: interested, denominator: answered },
      previewsRequested: previews.length,
      previewsDelivered: previews.filter((item) =>
        ["ready", "presented"].includes(item.status),
      ).length,
      won: byStage.won ?? 0,
      lost: byStage.lost ?? 0,
      negotiatedValue: opportunities.reduce(
        (sum, item) => sum + (item.proposal_value ?? 0),
        0,
      ),
      overdueTasks: (tasksResult.data ?? []).filter(
        (task) =>
          task.due_at &&
          new Date(task.due_at).getTime() < now &&
          !["done", "canceled"].includes(task.status),
      ).length,
      withoutNextAction: opportunities.filter(
        (item) =>
          !["won", "lost"].includes(item.stage) && !item.next_action,
      ).length,
      lossesByReason: Object.entries(refusalReasons).map(([reason, count]) => ({
        reason,
        count,
      })),
    });
  } catch (error) {
    return routeError(error);
  }
}
