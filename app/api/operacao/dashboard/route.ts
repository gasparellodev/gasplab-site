import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";
import { presentConversation, presentTask } from "@/lib/operacao/presenters";

export async function GET() {
  try {
    const { supabase, member } = await requireApiUser();
    const now = new Date().toISOString();
    const startOfToday = new Date();
    startOfToday.setUTCHours(3, 0, 0, 0);
    if (startOfToday.getTime() > Date.now()) {
      startOfToday.setUTCDate(startOfToday.getUTCDate() - 1);
    }
    const [tasksResult, returnsResult, conversationsResult, pipelineResult, callsResult] =
      await Promise.all([
        supabase
          .from("tasks")
          .select("*, leads(id, name)")
          .eq("organization_id", member.organizationId)
          .eq("assigned_to_member_id", member.id)
          .in("status", ["todo", "in_progress"])
          .order("due_at", { ascending: true, nullsFirst: false })
          .limit(20),
        supabase
          .from("opportunities")
          .select("id, lead_id, title, stage, next_action, next_action_at, leads(id, name)")
          .eq("organization_id", member.organizationId)
          .eq("owner_member_id", member.id)
          .not("next_action_at", "is", null)
          .lte("next_action_at", now)
          .not("stage", "in", "(won,lost)")
          .order("next_action_at", { ascending: true })
          .limit(20),
        supabase
          .from("conversations")
          .select("id, lead_id, status, sync_status, last_message_at, leads(id, name)")
          .eq("organization_id", member.organizationId)
          .or("status.eq.open,sync_status.neq.synced")
          .order("last_message_at", { ascending: false })
          .limit(20),
        supabase
          .from("opportunities")
          .select("stage")
          .eq("organization_id", member.organizationId)
          .not("stage", "in", "(won,lost)"),
        supabase
          .from("activities")
          .select("id, call_outcome")
          .eq("organization_id", member.organizationId)
          .eq("type", "call")
          .gte("occurred_at", startOfToday.toISOString()),
      ]);

    for (const result of [
      tasksResult,
      returnsResult,
      conversationsResult,
      pipelineResult,
      callsResult,
    ]) {
      if (result.error) throw result.error;
    }

    const pipeline = (pipelineResult.data ?? []).reduce<Record<string, number>>(
      (counts, item) => {
        counts[item.stage] = (counts[item.stage] ?? 0) + 1;
        return counts;
      },
      {},
    );

    const tasks = tasksResult.data ?? [];
    const calls = callsResult.data ?? [];
    const followUps = (returnsResult.data ?? []).map((item) => {
      const lead = Array.isArray(item.leads) ? item.leads[0] : item.leads;
      return {
        id: item.id,
        leadId: item.lead_id,
        leadName: lead?.name ?? item.title,
        nextAction: item.next_action ?? "Realizar acompanhamento",
        dueAt: item.next_action_at,
        phone: null,
      };
    });
    return dataResponse({
      stats: {
        callsToday: calls.length,
        answeredToday: calls.filter((call) =>
          ["no_decision", "interested", "declined"].includes(call.call_outcome ?? ""),
        ).length,
        interestedToday: calls.filter((call) => call.call_outcome === "interested").length,
        overdueCount:
          tasks.filter((task) => task.due_at && task.due_at < now).length +
          followUps.length,
      },
      tasks: tasks.map(presentTask),
      followUps,
      conversations: (conversationsResult.data ?? []).map((item) =>
        presentConversation(item),
      ),
      pipeline,
    });
  } catch (error) {
    return routeError(error);
  }
}
