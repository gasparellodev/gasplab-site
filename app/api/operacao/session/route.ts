import { dataResponse, routeError } from "@/lib/integrations/http";
import { requireApiUser } from "@/lib/integrations/api-auth";
import { whatsappConfigured } from "@/lib/integrations/meta";

export async function GET() {
  try {
    const { member } = await requireApiUser();
    return dataResponse({
      member: {
        id: member.id,
        fullName: member.fullName,
        email: member.email,
        role: member.role,
        organizationId: member.organizationId,
      },
      integrations: {
        supabase: Boolean(
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        ),
        places: Boolean(process.env.GOOGLE_PLACES_API_KEY),
        whatsapp: whatsappConfigured(),
        openai: Boolean(process.env.OPENAI_API_KEY),
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
