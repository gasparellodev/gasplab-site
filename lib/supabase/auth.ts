import "server-only";

import { redirect } from "next/navigation";

import type { Member, OperationUser } from "@/lib/operacao/types";
import { createClient } from "@/lib/supabase/server";

export class OperationAuthError extends Error {
  readonly status: 401 | 403;

  constructor(message: string, status: 401 | 403) {
    super(message);
    this.name = "OperationAuthError";
    this.status = status;
  }
}

export function isAdmin(subject: Member | OperationUser): boolean {
  const membership = "membership" in subject ? subject.membership : subject;
  return membership.role === "admin" && membership.status === "active";
}

export async function getOperationUser(): Promise<OperationUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  let { data: membership, error: membershipError } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("accepted_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership && !membershipError) {
    const { error: claimError } = await supabase.rpc("claim_membership_invitation");

    if (!claimError) {
      const result = await supabase
        .from("members")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("accepted_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      membership = result.data;
      membershipError = result.error;
    }
  }

  if (membershipError || !membership) return null;

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", membership.organization_id)
    .single();

  if (organizationError || !organization) return null;
  return { user, membership, organization };
}

interface RequireUserOptions {
  redirectTo?: string | null;
}

export async function requireUser(
  options: RequireUserOptions = {},
): Promise<OperationUser> {
  const operationUser = await getOperationUser();

  if (operationUser) return operationUser;
  if (options.redirectTo !== null) {
    redirect(options.redirectTo ?? "/login?redirect=/operacao");
  }
  throw new OperationAuthError("Autenticação necessária.", 401);
}

export async function requireAdmin(
  options: RequireUserOptions = {},
): Promise<OperationUser> {
  const operationUser = await requireUser(options);

  if (isAdmin(operationUser)) return operationUser;
  if (options.redirectTo !== null) redirect(options.redirectTo ?? "/operacao");
  throw new OperationAuthError("Acesso de administrador necessário.", 403);
}
