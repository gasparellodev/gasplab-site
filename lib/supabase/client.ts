"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/supabase/database.types";
import { getSupabasePublicEnvironment } from "@/lib/supabase/env";

export function createClient() {
  const { url, publishableKey } = getSupabasePublicEnvironment();

  return createBrowserClient<Database>(url, publishableKey);
}
