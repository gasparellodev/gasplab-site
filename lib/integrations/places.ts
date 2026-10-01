import { ApiError } from "@/lib/integrations/http";

export type PlaceSearchItem = {
  placeId: string;
  displayName: string;
  formattedAddress: string;
  nationalPhoneNumber: string | null;
  websiteUri: string | null;
  googleMapsUri: string | null;
  primaryType: string | null;
};

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  primaryType?: string;
};

export async function searchPlaces(textQuery: string): Promise<PlaceSearchItem[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new ApiError(
      "UNAVAILABLE",
      "A pesquisa do Google Places ainda não está configurada.",
      503,
    );
  }

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.primaryType",
      },
      body: JSON.stringify({ textQuery, languageCode: "pt-BR", regionCode: "BR" }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new ApiError(
      "UNAVAILABLE",
      "O Google Places não respondeu à pesquisa.",
      502,
      details.slice(0, 500),
    );
  }

  const payload = (await response.json()) as { places?: GooglePlace[] };
  return (payload.places ?? []).flatMap((place) =>
    place.id
      ? [
          {
            placeId: place.id,
            displayName: place.displayName?.text ?? "Empresa sem nome",
            formattedAddress: place.formattedAddress ?? "",
            nationalPhoneNumber: place.nationalPhoneNumber ?? null,
            websiteUri: place.websiteUri ?? null,
            googleMapsUri: place.googleMapsUri ?? null,
            primaryType: place.primaryType ?? null,
          },
        ]
      : [],
  );
}
