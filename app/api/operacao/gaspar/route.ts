import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { askGaspar } from "@/lib/integrations/openai";
import { dataResponse, readJson, routeError } from "@/lib/integrations/http";

const schema = z.object({
  message: z.string().trim().min(2).max(4000),
  leadId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = schema.parse(await bodyPromise);

    const knowledgePromise = supabase
      .from("knowledge_documents")
      .select("id, title, category, content, updated_at")
      .eq("organization_id", member.organizationId)
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(12);
    const leadPromise = input.leadId
      ? Promise.all([
          supabase
            .from("leads")
            .select("id, name, segment, notes, do_not_contact, updated_at")
            .eq("organization_id", member.organizationId)
            .eq("id", input.leadId)
            .maybeSingle(),
          supabase
            .from("opportunities")
            .select("id, stage, next_action, next_action_at, proposal_value, loss_reason")
            .eq("organization_id", member.organizationId)
            .eq("lead_id", input.leadId),
          supabase
            .from("activities")
            .select("id, type, call_outcome, summary, occurred_at")
            .eq("organization_id", member.organizationId)
            .eq("lead_id", input.leadId)
            .order("occurred_at", { ascending: false })
            .limit(20),
          supabase
            .from("tasks")
            .select("id, type, title, status, due_at")
            .eq("organization_id", member.organizationId)
            .eq("lead_id", input.leadId)
            .order("created_at", { ascending: false })
            .limit(20),
        ])
      : Promise.resolve(null);

    const [knowledgeResult, leadResults] = await Promise.all([
      knowledgePromise,
      leadPromise,
    ]);
    if (knowledgeResult.error) throw knowledgeResult.error;
    if (leadResults) {
      for (const result of leadResults) if (result.error) throw result.error;
    }

    const knowledge = knowledgeResult.data ?? [];
    const sources = knowledge.map((doc) => ({
      type: "knowledge_document",
      id: doc.id,
      label: doc.title,
    }));
    if (input.leadId && leadResults?.[0].data) {
      sources.push({
        type: "lead",
        id: input.leadId,
        label: leadResults[0].data.name,
      });
    }
    const context = JSON.stringify(
      {
        playbook: knowledge.map(({ id, title, category, content }) => ({
          id,
          title,
          category,
          content,
        })),
        lead: leadResults
          ? {
              record: leadResults[0].data,
              opportunities: leadResults[1].data ?? [],
              recentActivities: leadResults[2].data ?? [],
              tasks: leadResults[3].data ?? [],
            }
          : null,
      },
      null,
      2,
    ).slice(0, 60000);

    const response = await askGaspar({ message: input.message, context, sources });
    return dataResponse({
      answer: response.message,
      sources: response.sources,
      model: response.model,
    });
  } catch (error) {
    return routeError(error);
  }
}
