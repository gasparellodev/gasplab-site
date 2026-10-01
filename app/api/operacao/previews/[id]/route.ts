import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";

const schema = z
  .object({
    url: z.string().url().max(500).optional(),
    status: z.enum(["requested", "in_progress", "ready", "presented", "canceled"]),
    notes: z.string().trim().max(4000).nullable().optional(),
  })
  .refine((data) => data.status !== "ready" || Boolean(data.url), {
    path: ["url"],
    message: "Informe o link do preview pronto.",
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

    const { data: preview, error } = await supabase
      .from("previews")
      .update({
        status: input.status,
        ...(input.url !== undefined ? { url: input.url } : {}),
        ...(input.notes !== undefined ? { notes: input.notes } : {}),
        ...(input.status === "ready" ? { ready_at: new Date().toISOString() } : {}),
        ...(input.status === "presented"
          ? { presented_at: new Date().toISOString() }
          : {}),
      })
      .eq("organization_id", member.organizationId)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!preview) {
      throw new ApiError("NOT_FOUND", "Preview não encontrado.", 404);
    }

    let presentationTask = null;
    if (input.status === "ready") {
      const { data: existingTask, error: existingError } = await supabase
        .from("tasks")
        .select("*")
        .eq("organization_id", member.organizationId)
        .eq("automation_key", `preview:${preview.id}:present`)
        .maybeSingle();
      if (existingError) throw existingError;
      presentationTask = existingTask;
    }

    return dataResponse({ preview, task: presentationTask });
  } catch (error) {
    return routeError(error);
  }
}
