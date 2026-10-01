import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/auth";
import { ApiError } from "@/lib/integrations/http";

export type OperationRole = "admin" | "member";

export type OperationMember = {
  id: string;
  fullName: string;
  email: string;
  role: OperationRole;
  organizationId: string;
  authUserId: string;
};

export async function requireApiUser(): Promise<{
  supabase: Awaited<ReturnType<typeof createClient>>;
  member: OperationMember;
}> {
  const supabase = await createClient();
  let auth;
  try {
    auth = await requireUser({ redirectTo: null });
  } catch {
    throw new ApiError("UNAUTHORIZED", "Faça login para continuar.", 401);
  }

  const { user, membership } = auth;
  const metadata = user.user_metadata as { full_name?: string; name?: string };

  return {
    supabase,
    member: {
      id: membership.id,
      fullName:
        membership.display_name ??
        metadata.full_name ??
        metadata.name ??
        user.email?.split("@")[0] ??
        "Usuário",
      email: user.email ?? "",
      role: membership.role === "admin" ? "admin" : "member",
      organizationId: membership.organization_id,
      authUserId: user.id,
    },
  };
}

export async function requireApiAdmin() {
  const context = await requireApiUser();
  if (context.member.role !== "admin") {
    throw new ApiError(
      "FORBIDDEN",
      "Apenas administradores podem realizar esta ação.",
      403,
    );
  }
  return context;
}
