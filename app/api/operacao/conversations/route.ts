import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";
import { presentConversation } from "@/lib/operacao/presenters";

const querySchema = z.object({
  leadId: z.string().uuid().optional(),
  syncStatus: z.enum(["synced", "manual", "partial", "unavailable"]).optional(),
});

export async function GET(request: Request) {
  try {
    const { supabase, member } = await requireApiUser();
    const query = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    let builder = supabase
      .from("conversations")
      .select("*, leads(id, name), contacts(id, name, phone_e164)")
      .eq("organization_id", member.organizationId)
      .order("last_message_at", { ascending: false, nullsFirst: false });
    if (query.leadId) builder = builder.eq("lead_id", query.leadId);
    if (query.syncStatus) builder = builder.eq("sync_status", query.syncStatus);
    const { data, error } = await builder;
    if (error) throw error;
    const conversationIds = (data ?? []).map((item) => item.id);
    const latestByConversation = new Map<string, unknown>();
    if (conversationIds.length) {
      const messagesResult = await supabase
        .from("messages")
        .select("conversation_id, text_body, occurred_at")
        .eq("organization_id", member.organizationId)
        .in("conversation_id", conversationIds)
        .order("occurred_at", { ascending: false });
      if (messagesResult.error) throw messagesResult.error;
      for (const message of messagesResult.data ?? []) {
        if (!latestByConversation.has(message.conversation_id)) {
          latestByConversation.set(message.conversation_id, message);
        }
      }
    }
    return dataResponse({
      items: (data ?? []).map((item) =>
        presentConversation(item, latestByConversation.get(item.id)),
      ),
      total: data?.length ?? 0,
    });
  } catch (error) {
    return routeError(error);
  }
}
