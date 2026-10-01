import { z } from "zod";
import { requireApiAdmin } from "@/lib/integrations/api-auth";
import {
  ApiError,
  dataResponse,
  readJson,
  routeError,
} from "@/lib/integrations/http";

const schema = z.object({
  title: z.string().trim().min(3).max(160).optional(),
  content: z.string().trim().min(10).max(50000).optional(),
  category: z.string().trim().min(2).max(80).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiAdmin();
    const id = z.string().uuid().parse((await context.params).id);
    const input = schema.parse(await bodyPromise);
    const { data, error } = await supabase
      .from("knowledge_documents")
      .update({
        ...input,
        updated_by: member.authUserId,
        ...(input.status === "published"
          ? { published_at: new Date().toISOString() }
          : {}),
      })
      .eq("organization_id", member.organizationId)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new ApiError("NOT_FOUND", "Documento não encontrado.", 404);
    return dataResponse(data);
  } catch (error) {
    return routeError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { supabase, member } = await requireApiAdmin();
    const id = z.string().uuid().parse((await context.params).id);
    const { data, error } = await supabase
      .from("knowledge_documents")
      .update({
        status: "archived",
        updated_by: member.authUserId,
      })
      .eq("organization_id", member.organizationId)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new ApiError("NOT_FOUND", "Documento não encontrado.", 404);
    return dataResponse(data);
  } catch (error) {
    return routeError(error);
  }
}
