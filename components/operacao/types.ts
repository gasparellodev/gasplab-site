export type MemberRole = "admin" | "member";

export type SessionData = {
  member: {
    id: string;
    fullName: string;
    email: string;
    role: MemberRole;
    organizationId: string;
  };
  integrations: {
    supabase: boolean;
    places: boolean;
    whatsapp: boolean;
    openai: boolean;
  };
};

export type TaskItem = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done" | "canceled";
  dueAt?: string | null;
  leadId?: string | null;
  leadName?: string | null;
  assigneeName?: string | null;
  kind?: string | null;
};

export type FollowUp = {
  id: string;
  leadId: string;
  leadName: string;
  nextAction: string;
  dueAt?: string | null;
  phone?: string | null;
};

export type LeadStage =
  | "new"
  | "contacting"
  | "interested"
  | "preview_in_production"
  | "preview_sent"
  | "proposal"
  | "won"
  | "lost";

export type LeadSummary = {
  id: string;
  companyName: string;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  stage: LeadStage;
  ownerName?: string | null;
  source?: string | null;
  nextAction?: string | null;
  nextActionAt?: string | null;
  doNotContact?: boolean;
  proposedValue?: number | null;
  updatedAt?: string | null;
};

export type ActivityItem = {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  authorName?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type LeadDetailData = LeadSummary & {
  notes?: string | null;
  whatsappConsent?: boolean;
  activities: ActivityItem[];
  tasks: TaskItem[];
  preview?: { id: string; status: string; url?: string | null } | null;
};

export type ConversationItem = {
  id: string;
  leadId?: string | null;
  leadName: string;
  contactName?: string | null;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  unreadCount?: number;
  syncStatus?: "synced" | "manual" | "partial" | "unavailable";
};

export type MessageItem = {
  id: string;
  direction: "inbound" | "outbound" | "system";
  body: string;
  createdAt: string;
  status?: "pending" | "sent" | "delivered" | "read" | "failed" | "uncertain" | "manual";
};

export type DashboardData = {
  stats?: {
    callsToday?: number;
    answeredToday?: number;
    interestedToday?: number;
    overdueCount?: number;
  };
  tasks: TaskItem[];
  followUps: FollowUp[];
  conversations: ConversationItem[];
};

export type ApiError = { code?: string; message: string };

