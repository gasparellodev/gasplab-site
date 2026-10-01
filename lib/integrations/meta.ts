import { createHmac, timingSafeEqual } from "node:crypto";
import { ApiError } from "@/lib/integrations/http";

export function verifyMetaSignature(body: string, signature: string | null) {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !signature?.startsWith("sha256=")) return false;

  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export function whatsappConfigured() {
  return Boolean(
    process.env.META_WHATSAPP_ACCESS_TOKEN &&
      process.env.META_WHATSAPP_PHONE_NUMBER_ID &&
      process.env.META_APP_SECRET &&
      process.env.META_WHATSAPP_VERIFY_TOKEN,
  );
}

export async function sendWhatsAppMessage(input: {
  to: string;
  text?: string;
  templateName?: string;
  templateLanguage?: string;
  templateParameters?: string[];
}) {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;
  if (!accessToken || !phoneNumberId) {
    throw new ApiError(
      "UNAVAILABLE",
      "O WhatsApp oficial ainda não está configurado.",
      503,
    );
  }

  const version = process.env.WHATSAPP_GRAPH_API_VERSION ?? "v23.0";
  const isTemplate = Boolean(input.templateName);
  const body = isTemplate
    ? {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: input.to,
        type: "template",
        template: {
          name: input.templateName,
          language: { code: input.templateLanguage ?? "pt_BR" },
          ...(input.templateParameters?.length
            ? {
                components: [
                  {
                    type: "body",
                    parameters: input.templateParameters.map((text) => ({
                      type: "text",
                      text,
                    })),
                  },
                ],
              }
            : {}),
        },
      }
    : {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: input.to,
        type: "text",
        text: { preview_url: false, body: input.text },
      };

  const response = await fetch(
    `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  const payload = (await response.json()) as {
    messages?: { id: string }[];
    error?: unknown;
  };

  if (!response.ok || !payload.messages?.[0]?.id) {
    throw new ApiError(
      "UNAVAILABLE",
      "A Meta não confirmou o envio da mensagem.",
      502,
      payload.error,
    );
  }

  return { externalMessageId: payload.messages[0].id, payload };
}

export async function fetchWhatsAppMedia(mediaId: string) {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new ApiError("UNAVAILABLE", "O WhatsApp oficial não está configurado.", 503);
  }
  const version = process.env.WHATSAPP_GRAPH_API_VERSION ?? "v23.0";
  const metadataResponse = await fetch(
    `https://graph.facebook.com/${version}/${encodeURIComponent(mediaId)}`,
    { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" },
  );
  const metadata = (await metadataResponse.json()) as {
    url?: string;
    mime_type?: string;
    error?: unknown;
  };
  if (!metadataResponse.ok || !metadata.url) {
    throw new ApiError(
      "UNAVAILABLE",
      "Não foi possível obter o anexo do WhatsApp.",
      502,
      metadata.error,
    );
  }
  const mediaResponse = await fetch(metadata.url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!mediaResponse.ok) {
    throw new ApiError(
      "UNAVAILABLE",
      "Não foi possível baixar o anexo do WhatsApp.",
      502,
    );
  }
  return {
    bytes: new Uint8Array(await mediaResponse.arrayBuffer()),
    mimeType:
      metadata.mime_type ?? mediaResponse.headers.get("content-type") ?? "application/octet-stream",
  };
}
