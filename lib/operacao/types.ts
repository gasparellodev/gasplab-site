import type { User } from "@supabase/supabase-js";

import type { Tables } from "@/lib/supabase/database.types";

export type Organization = Tables<"organizations">;
export type Member = Tables<"members">;
export type Lead = Tables<"leads">;
export type Contact = Tables<"contacts">;
export type Opportunity = Tables<"opportunities">;
export type Activity = Tables<"activities">;
export type Task = Tables<"tasks">;
export type Preview = Tables<"previews">;
export type Conversation = Tables<"conversations">;
export type Message = Tables<"messages">;
export type KnowledgeDocument = Tables<"knowledge_documents">;
export type IntegrationEvent = Tables<"integration_events">;
export type AppSetting = Tables<"app_settings">;

export interface OperationUser {
  user: User;
  membership: Member;
  organization: Organization;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
}

export interface PlacesLeadCandidate {
  placeId: string;
  displayName: string;
  formattedAddress: string | null;
  nationalPhoneNumber: string | null;
  websiteUri: string | null;
  googleMapsUri: string | null;
}
