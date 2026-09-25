import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { diagnostics } from "@/db/schema";
import { diagnosticInterestValues } from "@/lib/diagnostic";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(5).max(160),
  segment: z.string().trim().min(2).max(100),
  interest: z.enum(diagnosticInterestValues),
  challenge: z.string().trim().min(10).max(2000),
  url: z.union([z.literal(""), z.string().url().max(300)]).optional(),
  consent: z.literal(true),
  // honeypot: campo invisível para humanos; se vier preenchido, é bot.
  website: z.string().max(200).optional(),
  // timestamp (ms) de quando o formulário foi montado no client.
  startedAt: z.number().optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_HITS = 5;
const MIN_FILL_TIME_MS = 3000;

/**
 * Rate limit best-effort em memória, por IP. Não é distribuído nem
 * sobrevive a cold starts/múltiplas instâncias — é só uma primeira barreira.
 */
const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hitsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_HITS;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

type NotifyPayload = {
  company: string;
  segment: string;
  interest: string;
};

/** Notificação por e-mail via API REST do Resend. Falha nunca derruba a resposta. */
async function notify(data: NotifyPayload) {
  const { RESEND_API_KEY, DIAGNOSTIC_NOTIFY_TO, DIAGNOSTIC_NOTIFY_FROM } = process.env;
  if (!RESEND_API_KEY || !DIAGNOSTIC_NOTIFY_TO || !DIAGNOSTIC_NOTIFY_FROM) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: DIAGNOSTIC_NOTIFY_FROM,
        to: DIAGNOSTIC_NOTIFY_TO,
        subject: "Novo diagnóstico GaspLab",
        text: `Novo diagnóstico recebido.\nEmpresa: ${data.company}\nSegmento: ${data.segment}\nInteresse: ${data.interest}\n\nAcesse o banco para ver os detalhes completos.`,
      }),
    });
  } catch {
    // Best-effort: a notificação nunca deve derrubar o fluxo de gravação.
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "RATE_LIMITED", message: "Muitas tentativas. Aguarde alguns minutos." },
      },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Revise os campos enviados." } },
        { status: 400 },
      );

    const { website, startedAt, ...data } = parsed.data;

    // Honeypot preenchido → provável bot. Responde ok sem gravar.
    if (website) return NextResponse.json({ ok: true });

    // Envio rápido demais após o formulário abrir → provável bot. Responde ok sem gravar.
    if (typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS) {
      return NextResponse.json({ ok: true });
    }

    const db = getDb();
    if (!db) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: "STORAGE_UNAVAILABLE", message: "Serviço indisponível no momento." },
        },
        { status: 503 },
      );
    }

    await db.insert(diagnostics).values({
      ...data,
      url: data.url || null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      status: "new",
    });

    await notify({ company: data.company, segment: data.segment, interest: data.interest });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INTERNAL_ERROR", message: "Não foi possível registrar o diagnóstico." },
      },
      { status: 500 },
    );
  }
}
