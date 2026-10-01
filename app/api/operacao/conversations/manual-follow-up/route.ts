import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { ApiError, dataResponse, readJson, routeError } from "@/lib/integrations/http";

const schema = z.object({
  conversationId: z.string().uuid(),
  leadId: z.string().uuid(),
  body: z.string().trim().min(1).max(4000),
});

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = schema.parse(await bodyPromise);
    const occurredAt = new Date().toISOString();

    const [conversationResult, leadResult] = await Promise.all([
      supabase
        .from("conversations")
        .select("id, lead_id, opportunity_id")
        .eq("organization_id", member.organizationId)
        .eq("id", input.conversationId)
        .maybeSingle(),
      supabase
        .from("leads")
        .select("id, do_not_contact")
        .eq("organization_id", member.organizationId)
        .eq("id", input.leadId)
        .maybeSingle(),
    ]);
    if (conversationResult.error) throw conversationResult.error;
    if (leadResult.error) throw leadResult.error;
    if (!conversationResult.data || conversationResult.data.lead_id !== input.leadId) {
      throw new ApiError("NOT_FOUND", "Conversa não encontrada para este lead.", 404);
    }
    if (!leadResult.data) throw new ApiError("NOT_FOUND", "Lead não encontrado.", 404);
    if (leadResult.data.do_not_contact) {
      throw new ApiError("FORBIDDEN", "Este lead está marcado como não contatar.", 403);
    }

    const [messageResult, activityResult] = await Promise.all([
      supabase
        .from("messages")
        .insert({
          organization_id: member.organizationId,
          conversation_id: input.conversationId,
          direction: "outbound",
          status: "manual",
          message_type: "note",
          text_body: input.body,
          source: "manual",
          occurred_at: occurredAt,
        })
        .select("*")
        .single(),
      supabase
        .from("activities")
        .insert({
          organization_id: member.organizationId,
          lead_id: input.leadId,
          opportunity_id: conversationResult.data.opportunity_id,
          actor_user_id: member.authUserId,
          type: "whatsapp_manual",
          call_outcome: null,
          summary: input.body,
          metadata: { conversation_id: input.conversationId },
          occurred_at: occurredAt,
        })
        .select("*")
        .single(),
    ]);
    if (messageResult.error) throw messageResult.error;
    if (activityResult.error) throw activityResult.error;

    await supabase
      .from("conversations")
      .update({ last_message_at: occurredAt, sync_status: "manual" })
      .eq("organization_id", member.organizationId)
      .eq("id", input.conversationId);
    return dataResponse(
      { message: messageResult.data, activity: activityResult.data },
      { status: 201 },
    );
  } catch (error) {
    return routeError(error);
  }
}
