import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/operacao/:path*",
    "/auth/:path*",
    "/api/operacao/:path*",
    "/api/integrations/:path*",
  ],
};
