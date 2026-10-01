import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";
import { sendWhatsAppMessage } from "@/lib/integrations/meta";
import { createAdminClient } from "@/lib/integrations/supabase-admin";

const schema = z
  .object({
    conversationId: z.string().uuid(),
    body: z.string().trim().min(1).max(4096).optional(),
    templateName: z.string().trim().min(1).max(512).optional(),
    templateLanguage: z.string().trim().max(20).optional(),
    templateParameters: z.array(z.string().max(1024)).max(20).optional(),
  })
  .refine((data) => Boolean(data.body) !== Boolean(data.templateName), {
    message: "Envie texto ou template, mas não os dois.",
  });

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = schema.parse(await bodyPromise);

    const { data: conversation, error: conversationError } = await supabase
      .from("conversations")
      .select("id, lead_id, external_thread_id, sync_status")
      .eq("organization_id", member.organizationId)
      .eq("id", input.conversationId)
      .maybeSingle();
    if (conversationError) throw conversationError;
    if (!conversation) {
      throw new ApiError("NOT_FOUND", "Conversa não encontrada.", 404);
    }
    if (!conversation.external_thread_id) {
      throw new ApiError(
        "UNAVAILABLE",
        "A conversa ainda não possui um número sincronizado.",
        503,
      );
    }

    const [leadResult, inboundResult] = await Promise.all([
      supabase
        .from("leads")
        .select("do_not_contact")
        .eq("organization_id", member.organizationId)
        .eq("id", conversation.lead_id)
        .single(),
      supabase
        .from("messages")
        .select("occurred_at")
        .eq("organization_id", member.organizationId)
        .eq("conversation_id", conversation.id)
        .eq("direction", "inbound")
        .order("occurred_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    if (leadResult.error) throw leadResult.error;
    if (inboundResult.error) throw inboundResult.error;
    if (leadResult.data.do_not_contact) {
      throw new ApiError(
        "FORBIDDEN",
        "Este lead está marcado como não contatar.",
        403,
      );
    }

    const sessionOpen = Boolean(
      inboundResult.data?.occurred_at &&
        Date.now() - new Date(inboundResult.data.occurred_at).getTime() <
          24 * 60 * 60 * 1000,
    );
    if (input.body && !sessionOpen) {
      throw new ApiError(
        "CONFLICT",
        "A janela de atendimento de 24 horas está fechada. Use um template aprovado.",
        409,
        { requiresTemplate: true },
      );
    }

    const now = new Date().toISOString();
    const admin = createAdminClient();
    const { data: pending, error: pendingError } = await admin
      .from("messages")
      .insert({
        organization_id: member.organizationId,
        conversation_id: conversation.id,
        direction: "outbound",
        status: "pending",
        message_type: input.templateName ? "template" : "text",
        text_body: input.body ?? null,
        template_name: input.templateName ?? null,
        source: "meta",
        occurred_at: now,
      })
      .select("*")
      .single();
    if (pendingError) throw pendingError;

    try {
      const sent = await sendWhatsAppMessage({
        to: conversation.external_thread_id,
        text: input.body,
        templateName: input.templateName,
        templateLanguage: input.templateLanguage,
        templateParameters: input.templateParameters,
      });
      const { data: message, error } = await admin
        .from("messages")
        .update({
          external_message_id: sent.externalMessageId,
          status: "sent",
        })
        .eq("id", pending.id)
        .select("*")
        .single();
      if (error) throw error;
      await admin
        .from("conversations")
        .update({ sync_status: "synced", last_message_at: now })
        .eq("id", conversation.id);
      return dataResponse(message, { status: 201 });
    } catch (error) {
      await admin
        .from("messages")
        .update({
          status: "uncertain",
          provider_error: error instanceof Error ? error.message : "Falha desconhecida",
        })
        .eq("id", pending.id);
      throw error;
    }
  } catch (error) {
    return routeError(error);
  }
}
