import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";
import { presentLeadDetail } from "@/lib/operacao/presenters";

const idSchema = z.string().uuid();
const updateSchema = z
  .object({
    name: z.string().trim().min(2).max(160).optional(),
    segment: z.string().trim().max(120).nullable().optional(),
    websiteUrl: z.string().url().max(500).nullable().optional(),
    notes: z.string().trim().max(4000).nullable().optional(),
    ownerMemberId: z.string().uuid().optional(),
    doNotContact: z.boolean().optional(),
    doNotContactReason: z.string().trim().max(500).nullable().optional(),
    stage: z
      .enum([
        "new",
        "contacting",
        "interested",
        "preview_in_production",
        "preview_sent",
        "proposal",
        "won",
        "lost",
      ])
      .optional(),
    nextAction: z.string().trim().max(500).nullable().optional(),
    nextActionAt: z.string().datetime().nullable().optional(),
    proposalValue: z.number().nonnegative().nullable().optional(),
    lossReason: z.string().trim().max(500).nullable().optional(),
  })
  .refine(
    (data) => data.stage !== "lost" || Boolean(data.lossReason),
    { path: ["lossReason"], message: "Informe o motivo da perda." },
  )
  .refine(
    (data) => data.doNotContact !== true || Boolean(data.doNotContactReason),
    { path: ["doNotContactReason"], message: "Informe o motivo do bloqueio." },
  );

const detailSelect = `
  id, name, segment, website_url, source, source_reference, provenance,
  notes, do_not_contact, do_not_contact_reason, owner_member_id,
  created_at, updated_at,
  contacts (*), opportunities (*), activities (*), tasks (*), previews (*),
  conversations (*, messages (*))
`;

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { supabase, member } = await requireApiUser();
    const id = idSchema.parse((await context.params).id);
    const { data, error } = await supabase
      .from("leads")
      .select(detailSelect)
      .eq("organization_id", member.organizationId)
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new ApiError("NOT_FOUND", "Lead não encontrado.", 404);
    return dataResponse(presentLeadDetail(data));
  } catch (error) {
    return routeError(error);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const id = idSchema.parse((await context.params).id);
    const input = updateSchema.parse(await bodyPromise);

    const leadUpdate = {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.segment !== undefined ? { segment: input.segment } : {}),
      ...(input.websiteUrl !== undefined ? { website_url: input.websiteUrl } : {}),
      ...(input.notes !== undefined ? { notes: input.notes } : {}),
      ...(input.ownerMemberId !== undefined
        ? { owner_member_id: input.ownerMemberId }
        : {}),
      ...(input.doNotContact !== undefined
        ? { do_not_contact: input.doNotContact }
        : {}),
      ...(input.doNotContactReason !== undefined
        ? { do_not_contact_reason: input.doNotContactReason }
        : {}),
    };

    const opportunityUpdate = {
      ...(input.stage !== undefined ? { stage: input.stage } : {}),
      ...(input.nextAction !== undefined ? { next_action: input.nextAction } : {}),
      ...(input.nextActionAt !== undefined
        ? { next_action_at: input.nextActionAt }
        : {}),
      ...(input.proposalValue !== undefined
        ? { proposal_value: input.proposalValue }
        : {}),
      ...(input.lossReason !== undefined ? { loss_reason: input.lossReason } : {}),
      ...(input.ownerMemberId !== undefined
        ? { owner_member_id: input.ownerMemberId }
        : {}),
      ...(["won", "lost"].includes(input.stage ?? "")
        ? { closed_at: new Date().toISOString() }
        : input.stage
          ? { closed_at: null }
          : {}),
    };

    const [leadResult, opportunityResult] = await Promise.all([
      Object.keys(leadUpdate).length
        ? supabase
            .from("leads")
            .update(leadUpdate)
            .eq("organization_id", member.organizationId)
            .eq("id", id)
            .select("*")
            .maybeSingle()
        : supabase
            .from("leads")
            .select("*")
            .eq("organization_id", member.organizationId)
            .eq("id", id)
            .maybeSingle(),
      Object.keys(opportunityUpdate).length
        ? supabase
            .from("opportunities")
            .update(opportunityUpdate)
            .eq("organization_id", member.organizationId)
            .eq("lead_id", id)
            .select("*")
            .maybeSingle()
        : supabase
            .from("opportunities")
            .select("*")
            .eq("organization_id", member.organizationId)
            .eq("lead_id", id)
            .maybeSingle(),
    ]);

    if (leadResult.error) throw leadResult.error;
    if (opportunityResult.error) throw opportunityResult.error;
    if (!leadResult.data) {
      throw new ApiError("NOT_FOUND", "Lead não encontrado.", 404);
    }
    if (input.doNotContact === true) {
      const [tasksResult, nextActionResult] = await Promise.all([
        supabase
          .from("tasks")
          .update({ status: "canceled" })
          .eq("organization_id", member.organizationId)
          .eq("lead_id", id)
          .in("status", ["todo", "in_progress"]),
        supabase
          .from("opportunities")
          .update({ next_action: null, next_action_at: null })
          .eq("organization_id", member.organizationId)
          .eq("lead_id", id),
      ]);
      if (tasksResult.error) throw tasksResult.error;
      if (nextActionResult.error) throw nextActionResult.error;
    }
    return dataResponse({
      lead: leadResult.data,
      opportunity: opportunityResult.data,
    });
  } catch (error) {
    return routeError(error);
  }
}
