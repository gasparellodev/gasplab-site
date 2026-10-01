import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import {
  getSupabasePublicEnvironment,
  getSupabaseServiceRoleKey,
} from "@/lib/supabase/env";

export function createAdminClient() {
  const { url } = getSupabasePublicEnvironment();

  return createSupabaseClient<Database>(url, getSupabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
