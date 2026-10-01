import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";

const schema = z.object({
  leadId: z.string().uuid(),
  notes: z.string().trim().max(4000).optional(),
});

export async function GET() {
  try {
    const { supabase, member } = await requireApiUser();
    const { data, error } = await supabase
      .from("previews")
      .select("*, leads(id, name), tasks(*)")
      .eq("organization_id", member.organizationId)
      .order("requested_at", { ascending: false });
    if (error) throw error;
    return dataResponse({ items: data ?? [], total: data?.length ?? 0 });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const input = schema.parse(await bodyPromise);

    const [leadResult, opportunityResult, existingResult, adminResult] =
      await Promise.all([
        supabase
          .from("leads")
          .select("id, name, do_not_contact")
          .eq("organization_id", member.organizationId)
          .eq("id", input.leadId)
          .maybeSingle(),
        supabase
          .from("opportunities")
          .select("id, owner_member_id")
          .eq("organization_id", member.organizationId)
          .eq("lead_id", input.leadId)
          .maybeSingle(),
        supabase
          .from("previews")
          .select("*")
          .eq("organization_id", member.organizationId)
          .eq("lead_id", input.leadId)
          .in("status", ["requested", "in_progress", "ready"])
          .maybeSingle(),
        supabase
          .from("members")
          .select("id")
          .eq("organization_id", member.organizationId)
          .eq("role", "admin")
          .eq("status", "active")
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle(),
      ]);
    for (const result of [
      leadResult,
      opportunityResult,
      existingResult,
      adminResult,
    ]) {
      if (result.error) throw result.error;
    }
    if (!leadResult.data || !opportunityResult.data) {
      throw new ApiError("NOT_FOUND", "Lead ou oportunidade não encontrada.", 404);
    }
    if (leadResult.data.do_not_contact) {
      throw new ApiError("FORBIDDEN", "Este lead está marcado como não contatar.", 403);
    }
    if (existingResult.data) {
      throw new ApiError(
        "CONFLICT",
        "Já existe um preview ativo para este lead.",
        409,
        { previewId: existingResult.data.id },
      );
    }

    const assigneeId = adminResult.data?.id ?? member.id;
    const { data: preview, error: previewError } = await supabase
      .from("previews")
      .insert({
        organization_id: member.organizationId,
        lead_id: input.leadId,
        opportunity_id: opportunityResult.data.id,
        requested_by_member_id: member.id,
        assigned_to_member_id: assigneeId,
        status: "requested",
        notes: input.notes ?? null,
        requested_at: new Date().toISOString(),
      })
      .select("*")
      .single();
    if (previewError) throw previewError;

    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("organization_id", member.organizationId)
      .eq("automation_key", `preview:${preview.id}:produce`)
      .maybeSingle();
    if (taskError) throw taskError;

    return dataResponse({ preview, task }, { status: 201 });
  } catch (error) {
    return routeError(error);
  }
}
