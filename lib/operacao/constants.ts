export const MEMBER_ROLES = ["admin", "member"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export const MEMBER_STATUSES = ["invited", "active", "disabled"] as const;
export type MemberStatus = (typeof MEMBER_STATUSES)[number];

export const LEAD_SOURCES = [
  "manual",
  "google_places",
  "referral",
  "inbound",
  "import",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const DATA_PROVENANCE = [
  "manual",
  "relationship",
  "provided_by_business",
  "import",
] as const;
export type DataProvenance = (typeof DATA_PROVENANCE)[number];

export const OPPORTUNITY_STAGES = [
  "new",
  "contacting",
  "interested",
  "preview_in_production",
  "preview_sent",
  "proposal",
  "won",
  "lost",
] as const;
export type OpportunityStage = (typeof OPPORTUNITY_STAGES)[number];

export const OPPORTUNITY_STAGE_LABELS: Record<OpportunityStage, string> = {
  new: "Novo",
  contacting: "Em contato",
  interested: "Interessado",
  preview_in_production: "Preview em produção",
  preview_sent: "Preview enviado",
  proposal: "Proposta",
  won: "Ganho",
  lost: "Perdido",
};

export const ACTIVITY_TYPES = [
  "call",
  "note",
  "stage_change",
  "whatsapp_manual",
  "task",
  "preview",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const CALL_OUTCOMES = [
  "no_answer",
  "no_decision",
  "interested",
  "declined",
  "invalid_number",
] as const;
export type CallOutcome = (typeof CALL_OUTCOMES)[number];

export const CALL_OUTCOME_LABELS: Record<CallOutcome, string> = {
  no_answer: "Não atendeu",
  no_decision: "Atendeu, sem decisão",
  interested: "Interessado",
  declined: "Recusou",
  invalid_number: "Número inválido",
};

export const TASK_TYPES = [
  "follow_up",
  "call",
  "produce_preview",
  "present_preview",
  "message",
  "other",
] as const;
export type TaskType = (typeof TASK_TYPES)[number];

export const TASK_STATUSES = ["todo", "in_progress", "done", "canceled"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const PREVIEW_STATUSES = [
  "requested",
  "in_progress",
  "ready",
  "presented",
  "canceled",
] as const;
export type PreviewStatus = (typeof PREVIEW_STATUSES)[number];

export const CONVERSATION_STATUSES = ["open", "closed", "archived"] as const;
export type ConversationStatus = (typeof CONVERSATION_STATUSES)[number];

export const CONVERSATION_SYNC_STATUSES = [
  "synced",
  "manual",
  "partial",
  "unavailable",
] as const;
export type ConversationSyncStatus = (typeof CONVERSATION_SYNC_STATUSES)[number];

export const MESSAGE_DIRECTIONS = ["inbound", "outbound", "system"] as const;
export type MessageDirection = (typeof MESSAGE_DIRECTIONS)[number];

export const MESSAGE_STATUSES = [
  "pending",
  "sent",
  "delivered",
  "read",
  "failed",
  "uncertain",
  "manual",
] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export const MESSAGE_TYPES = [
  "text",
  "image",
  "document",
  "audio",
  "template",
  "note",
] as const;
export type MessageType = (typeof MESSAGE_TYPES)[number];

export const KNOWLEDGE_DOCUMENT_STATUSES = ["draft", "published", "archived"] as const;
export type KnowledgeDocumentStatus = (typeof KNOWLEDGE_DOCUMENT_STATUSES)[number];

export const INTEGRATION_EVENT_STATUSES = [
  "received",
  "processing",
  "processed",
  "failed",
  "ignored",
] as const;
export type IntegrationEventStatus = (typeof INTEGRATION_EVENT_STATUSES)[number];

export const DEFAULT_CURRENCY = "BRL";
export const OPERATION_ATTACHMENTS_BUCKET = "operation-attachments";
