export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type TableDefinition<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type OrganizationRow = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export type MemberRow = {
  id: string;
  organization_id: string;
  user_id: string | null;
  invited_email: string | null;
  display_name: string | null;
  role: "admin" | "member";
  status: "invited" | "active" | "disabled";
  invited_by: string | null;
  invited_at: string;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadRow = {
  id: string;
  organization_id: string;
  owner_member_id: string | null;
  name: string;
  segment: string | null;
  website_url: string | null;
  source: "manual" | "google_places" | "referral" | "inbound" | "import";
  source_reference: string | null;
  provenance: "manual" | "relationship" | "provided_by_business" | "import";
  notes: string | null;
  do_not_contact: boolean;
  do_not_contact_reason: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type ContactRow = {
  id: string;
  organization_id: string;
  lead_id: string;
  name: string;
  job_title: string | null;
  phone_e164: string | null;
  email: string | null;
  is_primary: boolean;
  provenance: "manual" | "relationship" | "provided_by_business" | "import";
  whatsapp_opt_in_at: string | null;
  whatsapp_opt_in_source: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type OpportunityRow = {
  id: string;
  organization_id: string;
  lead_id: string;
  owner_member_id: string | null;
  title: string;
  stage:
    | "new"
    | "contacting"
    | "interested"
    | "preview_in_production"
    | "preview_sent"
    | "proposal"
    | "won"
    | "lost";
  next_action: string | null;
  next_action_at: string | null;
  proposal_value: number | null;
  currency: string;
  loss_reason: string | null;
  closed_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type ActivityRow = {
  id: string;
  organization_id: string;
  lead_id: string;
  opportunity_id: string | null;
  actor_user_id: string | null;
  type: "call" | "note" | "stage_change" | "whatsapp_manual" | "task" | "preview";
  call_outcome:
    | "no_answer"
    | "no_decision"
    | "interested"
    | "declined"
    | "invalid_number"
    | null;
  summary: string | null;
  metadata: Json;
  occurred_at: string;
  created_at: string;
}

export type PreviewRow = {
  id: string;
  organization_id: string;
  lead_id: string;
  opportunity_id: string;
  requested_by_member_id: string | null;
  assigned_to_member_id: string | null;
  status: "requested" | "in_progress" | "ready" | "presented" | "canceled";
  url: string | null;
  notes: string | null;
  requested_at: string;
  ready_at: string | null;
  presented_at: string | null;
  created_at: string;
  updated_at: string;
}

export type TaskRow = {
  id: string;
  organization_id: string;
  lead_id: string | null;
  opportunity_id: string | null;
  preview_id: string | null;
  assigned_to_member_id: string | null;
  type: "follow_up" | "call" | "produce_preview" | "present_preview" | "message" | "other";
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done" | "canceled";
  due_at: string | null;
  completed_at: string | null;
  automation_key: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type ConversationRow = {
  id: string;
  organization_id: string;
  lead_id: string;
  contact_id: string;
  opportunity_id: string | null;
  channel: "whatsapp";
  external_thread_id: string | null;
  status: "open" | "closed" | "archived";
  sync_status: "synced" | "manual" | "partial" | "unavailable";
  coverage_start_at: string | null;
  coverage_end_at: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageRow = {
  id: string;
  organization_id: string;
  conversation_id: string;
  external_message_id: string | null;
  direction: "inbound" | "outbound" | "system";
  status: "pending" | "sent" | "delivered" | "read" | "failed" | "uncertain" | "manual";
  message_type: "text" | "image" | "document" | "audio" | "template" | "note";
  text_body: string | null;
  media_storage_path: string | null;
  media_mime_type: string | null;
  template_name: string | null;
  reply_to_external_id: string | null;
  provider_error: string | null;
  source: "meta" | "manual" | "system";
  occurred_at: string;
  created_at: string;
  updated_at: string;
}

export type KnowledgeDocumentRow = {
  id: string;
  organization_id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export type IntegrationEventRow = {
  id: string;
  organization_id: string | null;
  provider: string;
  external_event_id: string;
  event_type: string;
  status: "received" | "processing" | "processed" | "failed" | "ignored";
  payload: Json;
  error: string | null;
  attempts: number;
  received_at: string;
  processed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type AppSettingRow = {
  id: string;
  organization_id: string;
  key: string;
  value: Json;
  description: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

type InsertShape<
  T extends { id: string; created_at: string; updated_at: string },
  OptionalKeys extends keyof Omit<T, "id" | "created_at" | "updated_at"> = never,
> = Omit<T, "id" | "created_at" | "updated_at" | OptionalKeys> &
  Partial<Pick<T, OptionalKeys>> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  };

type UpdateShape<T> = Partial<Omit<T, "id" | "created_at">>;

export type Database = {
  public: {
    Tables: {
      organizations: TableDefinition<
        OrganizationRow,
        InsertShape<OrganizationRow>,
        UpdateShape<OrganizationRow>
      >;
      members: TableDefinition<
        MemberRow,
        InsertShape<
          MemberRow,
          | "user_id"
          | "invited_email"
          | "display_name"
          | "role"
          | "status"
          | "invited_by"
          | "invited_at"
          | "accepted_at"
        >,
        UpdateShape<MemberRow>
      >;
      leads: TableDefinition<
        LeadRow,
        InsertShape<
          LeadRow,
          | "owner_member_id"
          | "segment"
          | "website_url"
          | "source"
          | "source_reference"
          | "provenance"
          | "notes"
          | "do_not_contact"
          | "do_not_contact_reason"
          | "created_by"
        >,
        UpdateShape<LeadRow>
      >;
      contacts: TableDefinition<
        ContactRow,
        InsertShape<
          ContactRow,
          | "job_title"
          | "phone_e164"
          | "email"
          | "is_primary"
          | "provenance"
          | "whatsapp_opt_in_at"
          | "whatsapp_opt_in_source"
          | "created_by"
        >,
        UpdateShape<ContactRow>
      >;
      opportunities: TableDefinition<
        OpportunityRow,
        InsertShape<
          OpportunityRow,
          | "owner_member_id"
          | "stage"
          | "next_action"
          | "next_action_at"
          | "proposal_value"
          | "currency"
          | "loss_reason"
          | "closed_at"
          | "created_by"
        >,
        UpdateShape<OpportunityRow>
      >;
      activities: TableDefinition<
        ActivityRow,
        Omit<
          ActivityRow,
          | "id"
          | "created_at"
          | "actor_user_id"
          | "opportunity_id"
          | "call_outcome"
          | "summary"
          | "metadata"
          | "occurred_at"
        > & {
          id?: string;
          actor_user_id?: string | null;
          opportunity_id?: string | null;
          call_outcome?: ActivityRow["call_outcome"];
          summary?: string | null;
          metadata?: Json;
          occurred_at?: string;
          created_at?: string;
        },
        Partial<Omit<ActivityRow, "id" | "created_at">>
      >;
      previews: TableDefinition<
        PreviewRow,
        InsertShape<
          PreviewRow,
          | "requested_by_member_id"
          | "assigned_to_member_id"
          | "status"
          | "url"
          | "notes"
          | "requested_at"
          | "ready_at"
          | "presented_at"
        >,
        UpdateShape<PreviewRow>
      >;
      tasks: TableDefinition<
        TaskRow,
        InsertShape<
          TaskRow,
          | "lead_id"
          | "opportunity_id"
          | "preview_id"
          | "assigned_to_member_id"
          | "description"
          | "status"
          | "due_at"
          | "completed_at"
          | "automation_key"
          | "created_by"
        >,
        UpdateShape<TaskRow>
      >;
      conversations: TableDefinition<
        ConversationRow,
        InsertShape<
          ConversationRow,
          | "opportunity_id"
          | "channel"
          | "external_thread_id"
          | "status"
          | "sync_status"
          | "coverage_start_at"
          | "coverage_end_at"
          | "last_message_at"
        >,
        UpdateShape<ConversationRow>
      >;
      messages: TableDefinition<
        MessageRow,
        InsertShape<
          MessageRow,
          | "external_message_id"
          | "status"
          | "text_body"
          | "media_storage_path"
          | "media_mime_type"
          | "template_name"
          | "reply_to_external_id"
          | "provider_error"
          | "source"
          | "occurred_at"
        >,
        UpdateShape<MessageRow>
      >;
      knowledge_documents: TableDefinition<
        KnowledgeDocumentRow,
        InsertShape<
          KnowledgeDocumentRow,
          "category" | "status" | "published_at" | "created_by" | "updated_by"
        >,
        UpdateShape<KnowledgeDocumentRow>
      >;
      integration_events: TableDefinition<
        IntegrationEventRow,
        InsertShape<
          IntegrationEventRow,
          | "organization_id"
          | "status"
          | "payload"
          | "error"
          | "attempts"
          | "received_at"
          | "processed_at"
        >,
        UpdateShape<IntegrationEventRow>
      >;
      app_settings: TableDefinition<
        AppSettingRow,
        InsertShape<
          AppSettingRow,
          "description" | "created_by" | "updated_by"
        >,
        UpdateShape<AppSettingRow>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      claim_membership_invitation: {
        Args: Record<PropertyKey, never>;
        Returns: MemberRow[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Row"];

export type TablesInsert<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Insert"];

export type TablesUpdate<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Update"];
