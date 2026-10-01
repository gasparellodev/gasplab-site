type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function list(value: unknown): UnknownRecord[] {
  return Array.isArray(value) ? value.map(record) : [];
}

function first(value: unknown): UnknownRecord {
  return Array.isArray(value) ? record(value[0]) : record(value);
}

function text(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function number(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

const callOutcomeLabels: Record<string, string> = {
  no_answer: "Ligação: não atendeu",
  no_decision: "Ligação atendida, sem decisão",
  interested: "Interesse confirmado na ligação",
  declined: "Recusou a proposta na ligação",
  invalid_number: "Número inválido",
};

export function presentTask(value: unknown) {
  const item = record(value);
  const lead = first(item.leads);
  const assignee = first(item.members);

  return {
    id: text(item.id) ?? "",
    title: text(item.title) ?? "Tarefa",
    status: text(item.status) ?? "todo",
    dueAt: text(item.due_at),
    leadId: text(item.lead_id),
    leadName: text(lead.name),
    assigneeName: text(assignee.display_name),
    kind: text(item.type),
  };
}

export function presentLead(value: unknown) {
  const item = record(value);
  const opportunity = first(item.opportunities);
  const contacts = list(item.contacts);
  const contact = contacts.find((entry) => entry.is_primary === true) ?? contacts[0] ?? {};
  const owner = first(item.members);

  return {
    id: text(item.id) ?? "",
    companyName: text(item.name) ?? "Empresa",
    contactName: text(contact.name),
    phone: text(contact.phone_e164),
    email: text(contact.email),
    stage: text(opportunity.stage) ?? "new",
    ownerName: text(owner.display_name),
    source: text(item.source),
    nextAction: text(opportunity.next_action),
    nextActionAt: text(opportunity.next_action_at),
    doNotContact: item.do_not_contact === true,
    proposedValue: number(opportunity.proposal_value),
    updatedAt: text(item.updated_at),
  };
}

export function presentLeadDetail(value: unknown) {
  const item = record(value);
  const summary = presentLead(item);
  const contacts = list(item.contacts);
  const contact = contacts.find((entry) => entry.is_primary === true) ?? contacts[0] ?? {};
  const activities = list(item.activities)
    .sort((left, right) => String(right.occurred_at).localeCompare(String(left.occurred_at)))
    .map((activity) => ({
      id: text(activity.id) ?? "",
      type: text(activity.type) ?? "atividade",
      description:
        text(activity.summary) ??
        callOutcomeLabels[text(activity.call_outcome) ?? ""] ??
        "Atividade registrada",
      createdAt: text(activity.occurred_at) ?? text(activity.created_at) ?? "",
      authorName: null,
      metadata: record(activity.metadata),
    }));
  const previews = list(item.previews).sort((left, right) =>
    String(right.created_at).localeCompare(String(left.created_at)),
  );
  const preview = previews[0];

  return {
    ...summary,
    notes: text(item.notes),
    whatsappConsent: Boolean(contact.whatsapp_opt_in_at),
    activities,
    tasks: list(item.tasks).map(presentTask),
    preview: preview
      ? {
          id: text(preview.id) ?? "",
          status: text(preview.status) ?? "requested",
          url: text(preview.url),
        }
      : null,
  };
}

export function presentConversation(value: unknown, latestMessage?: unknown) {
  const item = record(value);
  const lead = first(item.leads);
  const contact = first(item.contacts);
  const message = record(latestMessage);

  return {
    id: text(item.id) ?? "",
    leadId: text(item.lead_id),
    leadName: text(lead.name) ?? "Lead",
    contactName: text(contact.name),
    lastMessage: text(message.text_body),
    lastMessageAt: text(item.last_message_at),
    unreadCount: 0,
    syncStatus: text(item.sync_status) ?? "unavailable",
  };
}

export function presentMessage(value: unknown) {
  const item = record(value);
  const messageType = text(item.message_type) ?? "mensagem";

  return {
    id: text(item.id) ?? "",
    direction: text(item.direction) ?? "system",
    body:
      text(item.text_body) ??
      (text(item.template_name) ? `Template: ${text(item.template_name)}` : `[${messageType}]`),
    createdAt: text(item.occurred_at) ?? text(item.created_at) ?? "",
    status: text(item.status) ?? "manual",
  };
}

