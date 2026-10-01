import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";
import { presentLead } from "@/lib/operacao/presenters";

const listSchema = z.object({
  q: z.string().trim().max(120).optional(),
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
  ownerMemberId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

const createLeadSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(160).optional(),
  phone: z.string().trim().regex(/^\+[1-9]\d{7,14}$/).optional(),
  email: z.string().trim().email().max(254).optional(),
  placeId: z.string().trim().min(3).max(255).optional(),
  source: z.enum(["google_places", "manual", "referral"]).default("manual"),
  segment: z.string().trim().max(120).optional(),
  websiteUrl: z.string().url().max(500).optional(),
  notes: z.string().trim().max(4000).optional(),
  ownerMemberId: z.string().uuid().optional(),
}).refine((data) => data.source !== "google_places" || Boolean(data.placeId), {
  path: ["placeId"],
  message: "A referência do Google é obrigatória.",
});

const leadSelect = `
  id, name, segment, website_url, source, source_reference, provenance,
  notes, do_not_contact, do_not_contact_reason, owner_member_id,
  created_at, updated_at,
  contacts (id, name, phone_e164, email, is_primary, whatsapp_opt_in_at),
  opportunities (
    id, title, stage, next_action, next_action_at, proposal_value,
    currency, loss_reason, closed_at, owner_member_id, updated_at
  )
`;

export async function GET(request: Request) {
  try {
    const { supabase, member } = await requireApiUser();
    const params = new URL(request.url).searchParams;
    const query = listSchema.parse(Object.fromEntries(params));

    let builder = supabase
      .from("leads")
      .select(leadSelect, { count: "exact" })
      .eq("organization_id", member.organizationId)
      .order("updated_at", { ascending: false })
      .range(query.offset, query.offset + query.limit - 1);

    if (query.q) builder = builder.ilike("name", `%${query.q}%`);
    if (query.ownerMemberId) {
      builder = builder.eq("owner_member_id", query.ownerMemberId);
    }
    if (query.stage) {
      builder = builder.eq("opportunities.stage", query.stage);
    }

    const { data, count, error } = await builder;
    if (error) throw error;
    return dataResponse({ items: (data ?? []).map(presentLead), total: count ?? 0 });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = createLeadSchema.parse(await bodyPromise);

    if (input.placeId) {
      const { data: duplicate, error: duplicateError } = await supabase
        .from("leads")
        .select("id, name")
        .eq("organization_id", member.organizationId)
        .eq("source_reference", input.placeId)
        .maybeSingle();
      if (duplicateError) throw duplicateError;
      if (duplicate) {
        throw new ApiError(
          "CONFLICT",
          "Esta empresa já existe no CRM.",
          409,
          { leadId: duplicate.id },
        );
      }
    }

    const ownerMemberId = input.ownerMemberId ?? member.id;
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        organization_id: member.organizationId,
        owner_member_id: ownerMemberId,
        name: input.companyName,
        segment: input.segment ?? null,
        website_url: input.websiteUrl ?? null,
        source: input.source,
        source_reference: input.placeId ?? null,
        provenance: "manual",
        notes: input.notes ?? null,
        created_by: member.authUserId,
      })
      .select("*")
      .single();
    if (leadError) throw leadError;

    const { data: opportunity, error: opportunityError } = await supabase
      .from("opportunities")
      .insert({
        organization_id: member.organizationId,
        lead_id: lead.id,
        owner_member_id: ownerMemberId,
        title: `Site — ${lead.name}`,
        stage: "new",
        currency: "BRL",
        created_by: member.authUserId,
      })
      .select("*")
      .single();
    if (opportunityError) throw opportunityError;

    let contact = null;
    let conversation = null;
    if (input.contactName || input.phone || input.email) {
      const contactResult = await supabase
        .from("contacts")
        .insert({
          organization_id: member.organizationId,
          lead_id: lead.id,
          name: input.contactName ?? lead.name,
          phone_e164: input.phone ?? null,
          email: input.email ?? null,
          is_primary: true,
          provenance: "manual",
          created_by: member.authUserId,
        })
        .select("*")
        .single();
      if (contactResult.error) throw contactResult.error;
      contact = contactResult.data;

      if (input.phone) {
        const conversationResult = await supabase
          .from("conversations")
          .insert({
            organization_id: member.organizationId,
            lead_id: lead.id,
            contact_id: contact.id,
            opportunity_id: opportunity.id,
            external_thread_id: input.phone,
            sync_status: "manual",
          })
          .select("*")
          .single();
        if (conversationResult.error) throw conversationResult.error;
        conversation = conversationResult.data;
      }
    }

    return dataResponse({ lead, opportunity, contact, conversation }, { status: 201 });
  } catch (error) {
    return routeError(error);
  }
}
