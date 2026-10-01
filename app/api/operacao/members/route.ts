import { z } from "zod";
import { requireApiAdmin } from "@/lib/integrations/api-auth";
import { createAdminClient } from "@/lib/integrations/supabase-admin";
import { ApiError, dataResponse, readJson, routeError } from "@/lib/integrations/http";

const inviteSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  displayName: z.string().trim().min(2).max(120),
  role: z.enum(["admin", "member"]).default("member"),
});

export async function GET() {
  try {
    const { supabase, member } = await requireApiAdmin();
    const { data, error } = await supabase
      .from("members")
      .select("id, invited_email, display_name, role, status, invited_at, accepted_at")
      .eq("organization_id", member.organizationId)
      .order("created_at", { ascending: true });
    if (error) throw error;

    return dataResponse({
      items: (data ?? []).map((item) => ({
        id: item.id,
        email: item.invited_email,
        displayName: item.display_name,
        role: item.role,
        status: item.status,
        invitedAt: item.invited_at,
        acceptedAt: item.accepted_at,
      })),
    });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const bodyPromise = readJson(request);
    const { member } = await requireApiAdmin();
    const input = inviteSchema.parse(await bodyPromise);
    const admin = createAdminClient();

    const { data: existing, error: existingError } = await admin
      .from("members")
      .select("id, status")
      .eq("organization_id", member.organizationId)
      .ilike("invited_email", input.email)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existing) {
      throw new ApiError("CONFLICT", "Este e-mail já faz parte da operação.", 409);
    }

    const { data: invitedMember, error: memberError } = await admin
      .from("members")
      .insert({
        organization_id: member.organizationId,
        invited_email: input.email,
        display_name: input.displayName,
        role: input.role,
        status: "invited",
        invited_by: member.authUserId,
      })
      .select("*")
      .single();
    if (memberError) throw memberError;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    const { error: inviteError } = await admin.auth.admin.inviteUserByEmail(input.email, {
      data: { full_name: input.displayName },
      redirectTo: `${siteUrl}/auth/callback?next=/operacao`,
    });
    if (inviteError) {
      await admin.from("members").delete().eq("id", invitedMember.id);
      throw new ApiError(
        "UNAVAILABLE",
        "O Supabase não conseguiu enviar o convite. Tente novamente.",
        502,
      );
    }

    return dataResponse(
      {
        id: invitedMember.id,
        email: invitedMember.invited_email,
        displayName: invitedMember.display_name,
        role: invitedMember.role,
        status: invitedMember.status,
      },
      { status: 201 },
    );
  } catch (error) {
    return routeError(error);
  }
}
