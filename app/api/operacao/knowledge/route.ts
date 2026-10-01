import { z } from "zod";
import { requireApiAdmin, requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, readJson, routeError } from "@/lib/integrations/http";

const schema = z.object({
  title: z.string().trim().min(3).max(160),
  content: z.string().trim().min(10).max(50000),
  category: z.string().trim().min(2).max(80).default("playbook"),
  status: z.enum(["draft", "published"]).default("draft"),
});

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);
}

export async function GET() {
  try {
    const { supabase, member } = await requireApiUser();
    let builder = supabase
      .from("knowledge_documents")
      .select("*")
      .eq("organization_id", member.organizationId)
      .order("updated_at", { ascending: false });
    if (member.role !== "admin") builder = builder.eq("status", "published");
    const { data, error } = await builder;
    if (error) throw error;
    return dataResponse({
      items: (data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        status: item.status,
        updatedAt: item.updated_at,
      })),
      total: data?.length ?? 0,
    });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { supabase, member } = await requireApiAdmin();
    const input = schema.parse(await bodyPromise);
    const { data, error } = await supabase
      .from("knowledge_documents")
      .insert({
        organization_id: member.organizationId,
        title: input.title,
        slug: `${slugify(input.title)}-${Date.now().toString(36)}`,
        category: input.category,
        content: input.content,
        status: input.status,
        published_at: input.status === "published" ? new Date().toISOString() : null,
        created_by: member.authUserId,
        updated_by: member.authUserId,
      })
      .select("*")
      .single();
    if (error) throw error;
    return dataResponse(data, { status: 201 });
  } catch (error) {
    return routeError(error);
  }
}
