import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";
import { presentTask } from "@/lib/operacao/presenters";

const querySchema = z.object({
  status: z.enum(["todo", "in_progress", "done", "canceled"]).optional(),
  assignedToMemberId: z.string().uuid().optional(),
  leadId: z.string().uuid().optional(),
});

export async function GET(request: Request) {
  try {
    const { supabase, member } = await requireApiUser();
    const query = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    let builder = supabase
      .from("tasks")
      .select("*, leads(id, name), previews(id, status, url)")
      .eq("organization_id", member.organizationId)
      .order("due_at", { ascending: true, nullsFirst: false });
    if (query.status) builder = builder.eq("status", query.status);
    if (query.assignedToMemberId) {
      builder = builder.eq("assigned_to_member_id", query.assignedToMemberId);
    }
    if (query.leadId) builder = builder.eq("lead_id", query.leadId);
    const { data, error } = await builder;
    if (error) throw error;
    return dataResponse({ items: (data ?? []).map(presentTask), total: data?.length ?? 0 });
  } catch (error) {
    return routeError(error);
  }
}
