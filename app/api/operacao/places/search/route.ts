import { z } from "zod";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { dataResponse, routeError } from "@/lib/integrations/http";
import { searchPlaces } from "@/lib/integrations/places";

const querySchema = z.object({
  q: z.string().trim().min(3).max(160),
  location: z.string().trim().min(2).max(160),
});

export async function GET(request: Request) {
  try {
    const authPromise = requireApiUser();
    const params = new URL(request.url).searchParams;
    const query = querySchema.parse({
      q: params.get("q") ?? "",
      location: params.get("location") ?? "",
    });
    const { supabase, member } = await authPromise;
    const items = await searchPlaces(`${query.q} em ${query.location}`);
    const placeIds = items.map((item) => item.placeId);
    const linked = new Set<string>();
    if (placeIds.length) {
      const { data, error } = await supabase
        .from("leads")
        .select("source_reference")
        .eq("organization_id", member.organizationId)
        .eq("source", "google_places")
        .in("source_reference", placeIds);
      if (error) throw error;
      for (const lead of data ?? []) {
        if (lead.source_reference) linked.add(lead.source_reference);
      }
    }
    return dataResponse({
      items: items.map((item) => ({
        ...item,
        alreadyLinked: linked.has(item.placeId),
      })),
      attribution: "Google",
    });
  } catch (error) {
    return routeError(error);
  }
}
