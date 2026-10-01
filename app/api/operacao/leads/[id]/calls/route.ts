import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";

const schema = z.object({
  outcome: z.enum([
    "no_answer",
    "no_decision",
    "interested",
    "declined",
    "invalid_number",
  ]),
  notes: z.string().trim().max(4000).optional(),
  nextAction: z.string().trim().max(500).optional(),
  nextActionAt: z.string().datetime().optional(),
  whatsappConsent: z.boolean().default(false),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const leadId = z.string().uuid().parse((await context.params).id);
    const input = schema.parse(await bodyPromise);

    const [opportunityResult, leadResult] = await Promise.all([
      supabase
        .from("opportunities")
        .select("id, stage")
        .eq("organization_id", member.organizationId)
        .eq("lead_id", leadId)
        .maybeSingle(),
      supabase
        .from("leads")
        .select("do_not_contact")
        .eq("organization_id", member.organizationId)
        .eq("id", leadId)
        .maybeSingle(),
    ]);
    const { data: opportunity, error: opportunityError } = opportunityResult;
    if (opportunityError) throw opportunityError;
    if (leadResult.error) throw leadResult.error;
    if (!opportunity) {
      throw new ApiError("NOT_FOUND", "Oportunidade não encontrada.", 404);
    }
    if (!leadResult.data) throw new ApiError("NOT_FOUND", "Lead não encontrado.", 404);
    if (leadResult.data.do_not_contact) {
      throw new ApiError("FORBIDDEN", "Este lead está marcado como não contatar.", 403);
    }

    const { data: activity, error: activityError } = await supabase
      .from("activities")
      .insert({
        organization_id: member.organizationId,
        lead_id: leadId,
        opportunity_id: opportunity.id,
        actor_user_id: member.authUserId,
        type: "call",
        call_outcome: input.outcome,
        summary: input.notes ?? null,
        metadata: {
          whatsapp_consent: input.whatsappConsent,
          next_action: input.nextAction ?? null,
          next_action_at: input.nextActionAt ?? null,
        },
        occurred_at: new Date().toISOString(),
      })
      .select("*")
      .single();
    if (activityError) throw activityError;

    const stage =
      input.outcome === "interested"
        ? "interested"
        : input.outcome === "declined"
          ? "lost"
          : opportunity.stage === "new"
            ? "contacting"
            : opportunity.stage;
    const { data: updatedOpportunity, error: updateError } = await supabase
      .from("opportunities")
      .update({
        stage,
        next_action: input.nextAction ?? null,
        next_action_at: input.nextActionAt ?? null,
        ...(input.outcome === "declined"
          ? {
              loss_reason: input.notes ?? "Recusou durante a ligação",
              closed_at: new Date().toISOString(),
            }
          : {}),
      })
      .eq("id", opportunity.id)
      .eq("organization_id", member.organizationId)
      .select("*")
      .single();
    if (updateError) throw updateError;

    if (input.whatsappConsent) {
      const { error: consentError } = await supabase
        .from("contacts")
        .update({
          whatsapp_opt_in_at: new Date().toISOString(),
          whatsapp_opt_in_source: "Autorização registrada durante ligação",
        })
        .eq("organization_id", member.organizationId)
        .eq("lead_id", leadId)
        .eq("is_primary", true);
      if (consentError) throw consentError;
    }

    let task = null;
    if (input.nextAction && input.nextActionAt) {
      const taskResult = await supabase
        .from("tasks")
        .insert({
          organization_id: member.organizationId,
          lead_id: leadId,
          opportunity_id: opportunity.id,
          assigned_to_member_id: member.id,
          type: "follow_up",
          title: input.nextAction,
          status: "todo",
          due_at: input.nextActionAt,
          automation_key: `call:${activity.id}:follow-up`,
          created_by: member.authUserId,
        })
        .select("*")
        .maybeSingle();
      if (taskResult.error) throw taskResult.error;
      task = taskResult.data;
    }

    return dataResponse({ activity, opportunity: updatedOpportunity, task }, { status: 201 });
  } catch (error) {
    return routeError(error);
  }
}
