import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, readJson, routeError } from "@/lib/integrations/http";
import type { Json } from "@/lib/supabase/database.types";

const schema = z.object({
  leadId: z.string().uuid(),
  opportunityId: z.string().uuid().optional(),
  type: z.enum(["note", "whatsapp_manual", "stage_change", "preview", "task"]),
  summary: z.string().trim().min(1).max(4000),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.string().datetime().optional(),
});

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = schema.parse(await bodyPromise);
    const { data, error } = await supabase
      .from("activities")
      .insert({
        organization_id: member.organizationId,
        lead_id: input.leadId,
        opportunity_id: input.opportunityId ?? null,
        actor_user_id: member.authUserId,
        type: input.type,
        call_outcome: null,
        summary: input.summary,
        metadata: (input.metadata ?? {}) as Json,
        occurred_at: input.occurredAt ?? new Date().toISOString(),
      })
      .select("*")
      .single();
    if (error) throw error;
    return dataResponse(data, { status: 201 });
  } catch (error) {
    return routeError(error);
  }
}
