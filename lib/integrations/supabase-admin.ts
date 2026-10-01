import { createClient } from "@supabase/supabase-js";
import { ApiError } from "@/lib/integrations/http";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new ApiError(
      "UNAVAILABLE",
      "A integração do Supabase para webhooks não está configurada.",
      503,
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
