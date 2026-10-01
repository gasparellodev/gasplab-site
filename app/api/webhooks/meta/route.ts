import { z } from "zod";
import { createAdminClient } from "@/lib/integrations/supabase-admin";
import { dataResponse, errorResponse, routeError } from "@/lib/integrations/http";
import { fetchWhatsAppMedia, verifyMetaSignature } from "@/lib/integrations/meta";

type MetaMessage = {
  id: string;
  from: string;
  timestamp?: string;
  type?: "text" | "image" | "document" | "audio" | string;
  text?: { body?: string };
  image?: { id?: string; mime_type?: string; caption?: string };
  document?: { id?: string; mime_type?: string; caption?: string; filename?: string };
  audio?: { id?: string; mime_type?: string };
  context?: { id?: string };
};

type MetaStatus = {
  id: string;
  status: "sent" | "delivered" | "read" | "failed" | string;
  timestamp?: string;
  errors?: unknown;
};

type MetaValue = {
  metadata?: { phone_number_id?: string };
  messages?: MetaMessage[];
  statuses?: MetaStatus[];
};

type MetaPayload = {
  entry?: Array<{
    changes?: Array<{ field?: string; value?: MetaValue }>;
  }>;
};

const verifySchema = z.object({
  mode: z.literal("subscribe"),
  token: z.string(),
  challenge: z.string(),
});

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const parsed = verifySchema.safeParse({
    mode: params.get("hub.mode"),
    token: params.get("hub.verify_token"),
    challenge: params.get("hub.challenge"),
  });
  if (
    !parsed.success ||
    !process.env.META_WHATSAPP_VERIFY_TOKEN ||
    parsed.data.token !== process.env.META_WHATSAPP_VERIFY_TOKEN
  ) {
    return errorResponse("FORBIDDEN", "Verificação do webhook recusada.", 403);
  }
  return new Response(parsed.data.challenge, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

function extractMedia(message: MetaMessage) {
  if (message.type === "image") return message.image;
  if (message.type === "document") return message.document;
  if (message.type === "audio") return message.audio;
  return undefined;
}

function fileExtension(mimeType: string) {
  const known: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
    "audio/ogg": "ogg",
    "audio/mpeg": "mp3",
    "audio/mp4": "m4a",
  };
  return known[mimeType] ?? "bin";
}

async function resolveOrganizationId(
  supabase: ReturnType<typeof createAdminClient>,
  phoneNumberId: string | undefined,
) {
  if (!phoneNumberId) return null;
  const { data } = await supabase
    .from("app_settings")
    .select("organization_id, value")
    .eq("key", "whatsapp.meta");
  const match = (data ?? []).find((item) => {
    const value = item.value as { phone_number_id?: string } | null;
    return value?.phone_number_id === phoneNumberId;
  });
  return match?.organization_id ?? null;
}

async function recordEvent(
  supabase: ReturnType<typeof createAdminClient>,
  input: {
    organizationId: string | null;
    externalEventId: string;
    eventType: string;
    payload: unknown;
  },
) {
  const { data: existing, error: existingError } = await supabase
    .from("integration_events")
    .select("id, status")
    .eq("provider", "meta_whatsapp")
    .eq("external_event_id", input.externalEventId)
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing) return { event: existing, duplicate: true };

  const { data, error } = await supabase
    .from("integration_events")
    .insert({
      organization_id: input.organizationId,
      provider: "meta_whatsapp",
      external_event_id: input.externalEventId,
      event_type: input.eventType,
      status: "received",
      payload: input.payload,
      attempts: 1,
      received_at: new Date().toISOString(),
    })
    .select("id, status")
    .single();
  if (error) throw error;
  return { event: data, duplicate: false };
}

async function ingestMessage(
  supabase: ReturnType<typeof createAdminClient>,
  organizationId: string | null,
  message: MetaMessage,
  rawValue: MetaValue,
) {
  const recorded = await recordEvent(supabase, {
    organizationId,
    externalEventId: message.id,
    eventType: "message.received",
    payload: rawValue,
  });
  if (recorded.duplicate) return "duplicate";

  let conversationQuery = supabase
    .from("conversations")
    .select("id, organization_id")
    .eq("external_thread_id", message.from);
  if (organizationId) {
    conversationQuery = conversationQuery.eq("organization_id", organizationId);
  }
  const { data: conversation, error: conversationError } =
    await conversationQuery.maybeSingle();
  if (conversationError) throw conversationError;
  if (!conversation) return "unmatched";

  const media = extractMedia(message);
  let mediaStoragePath: string | null = null;
  let mediaMimeType: string | null = media?.mime_type ?? null;
  if (media?.id) {
    const downloaded = await fetchWhatsAppMedia(media.id);
    mediaMimeType = downloaded.mimeType;
    mediaStoragePath = `${conversation.organization_id}/whatsapp/${conversation.id}/${message.id}.${fileExtension(downloaded.mimeType)}`;
    const { error: uploadError } = await supabase.storage
      .from("operation-attachments")
      .upload(mediaStoragePath, downloaded.bytes, {
        contentType: downloaded.mimeType,
        upsert: false,
      });
    if (uploadError && !uploadError.message.toLowerCase().includes("already exists")) {
      throw uploadError;
    }
  }

  const occurredAt = message.timestamp
    ? new Date(Number(message.timestamp) * 1000).toISOString()
    : new Date().toISOString();
  const textBody =
    message.text?.body ?? message.image?.caption ?? message.document?.caption ?? null;
  const { error: messageError } = await supabase.from("messages").insert({
    organization_id: conversation.organization_id,
    conversation_id: conversation.id,
    external_message_id: message.id,
    direction: "inbound",
    status: "delivered",
    message_type: ["text", "image", "document", "audio"].includes(message.type ?? "")
      ? message.type
      : "note",
    text_body: textBody,
    media_storage_path: mediaStoragePath,
    media_mime_type: mediaMimeType,
    reply_to_external_id: message.context?.id ?? null,
    source: "meta",
    occurred_at: occurredAt,
  });
  if (messageError && messageError.code !== "23505") throw messageError;

  await Promise.all([
    supabase
      .from("conversations")
      .update({
        sync_status: "synced",
        status: "open",
        last_message_at: occurredAt,
        coverage_end_at: occurredAt,
      })
      .eq("id", conversation.id),
    supabase
      .from("integration_events")
      .update({ status: "processed", processed_at: new Date().toISOString() })
      .eq("id", recorded.event.id),
  ]);
  return "processed";
}

async function ingestStatus(
  supabase: ReturnType<typeof createAdminClient>,
  organizationId: string | null,
  status: MetaStatus,
  rawValue: MetaValue,
) {
  const externalEventId = `${status.id}:${status.status}:${status.timestamp ?? ""}`;
  const recorded = await recordEvent(supabase, {
    organizationId,
    externalEventId,
    eventType: `message.${status.status}`,
    payload: rawValue,
  });
  if (recorded.duplicate) return "duplicate";
  const allowedStatus = ["sent", "delivered", "read", "failed"].includes(status.status)
    ? status.status
    : "uncertain";
  const { error } = await supabase
    .from("messages")
    .update({
      status: allowedStatus,
      provider_error: status.errors ? JSON.stringify(status.errors).slice(0, 4000) : null,
    })
    .eq("external_message_id", status.id);
  if (error) throw error;
  await supabase
    .from("integration_events")
    .update({ status: "processed", processed_at: new Date().toISOString() })
    .eq("id", recorded.event.id);
  return "processed";
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (!verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
      return errorResponse("UNAUTHORIZED", "Assinatura do webhook inválida.", 401);
    }
    const payload = JSON.parse(rawBody) as MetaPayload;
    const supabase = createAdminClient();
    const results: string[] = [];

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== "messages" || !change.value) continue;
        const organizationId = await resolveOrganizationId(
          supabase,
          change.value.metadata?.phone_number_id,
        );
        for (const message of change.value.messages ?? []) {
          results.push(
            await ingestMessage(supabase, organizationId, message, change.value),
          );
        }
        for (const status of change.value.statuses ?? []) {
          results.push(await ingestStatus(supabase, organizationId, status, change.value));
        }
      }
    }

    return dataResponse({ accepted: true, results });
  } catch (error) {
    return routeError(error);
  }
}
