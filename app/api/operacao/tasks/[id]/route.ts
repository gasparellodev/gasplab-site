import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";

const schema = z.object({
  status: z.enum(["todo", "in_progress", "done", "canceled"]).optional(),
  assignedToMemberId: z.string().uuid().optional(),
  dueAt: z.string().datetime().nullable().optional(),
  description: z.string().trim().max(4000).nullable().optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiUser();
    const id = z.string().uuid().parse((await context.params).id);
    const input = schema.parse(await bodyPromise);
    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...(input.status !== undefined ? { status: input.status } : {}),
        ...(input.assignedToMemberId !== undefined
          ? { assigned_to_member_id: input.assignedToMemberId }
          : {}),
        ...(input.dueAt !== undefined ? { due_at: input.dueAt } : {}),
        ...(input.description !== undefined
          ? { description: input.description }
          : {}),
        ...(input.status === "done"
          ? { completed_at: new Date().toISOString() }
          : input.status
            ? { completed_at: null }
            : {}),
      })
      .eq("organization_id", member.organizationId)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new ApiError("NOT_FOUND", "Tarefa não encontrada.", 404);
    if (input.status === "done" && data.type === "present_preview" && data.preview_id) {
      const { error: previewError } = await supabase
        .from("previews")
        .update({ status: "presented", presented_at: new Date().toISOString() })
        .eq("organization_id", member.organizationId)
        .eq("id", data.preview_id);
      if (previewError) throw previewError;
    }
    return dataResponse(data);
  } catch (error) {
    return routeError(error);
  }
}
