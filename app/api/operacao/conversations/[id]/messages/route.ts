import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";
import { presentMessage } from "@/lib/operacao/presenters";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { supabase, member } = await requireApiUser();
    const id = z.string().uuid().parse((await context.params).id);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("organization_id", member.organizationId)
      .eq("conversation_id", id)
      .order("occurred_at", { ascending: true });
    if (error) throw error;
    return dataResponse({ items: (data ?? []).map(presentMessage), total: data?.length ?? 0 });
  } catch (error) {
    return routeError(error);
  }
}
