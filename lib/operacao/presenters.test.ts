import { describe, expect, it } from "vitest";
import {
  presentConversation,
  presentLeadDetail,
  presentMessage,
  presentTask,
} from "./presenters";

describe("operation presenters", () => {
  it("maps CRM records to the stable UI contract", () => {
    const lead = presentLeadDetail({
      id: "lead-1",
      name: "Clínica Aurora",
      source: "manual",
      do_not_contact: false,
      updated_at: "2026-10-01T12:00:00.000Z",
      contacts: [
        {
          name: "Ana",
          phone_e164: "+5511999999999",
          is_primary: true,
          whatsapp_opt_in_at: "2026-10-01T12:00:00.000Z",
        },
      ],
      opportunities: [
        {
          stage: "preview_in_production",
          next_action: "Retornar amanhã",
          proposal_value: 2500,
        },
      ],
      activities: [
        {
          id: "activity-1",
          type: "call",
          call_outcome: "interested",
          occurred_at: "2026-10-01T12:00:00.000Z",
        },
      ],
      tasks: [],
      previews: [],
    });

    expect(lead).toMatchObject({
      companyName: "Clínica Aurora",
      contactName: "Ana",
      phone: "+5511999999999",
      stage: "preview_in_production",
      proposedValue: 2500,
      whatsappConsent: true,
    });
    expect(lead.activities[0].description).toBe("Interesse confirmado na ligação");
  });

  it("maps tasks, conversations and attachment placeholders", () => {
    expect(
      presentTask({
        id: "task-1",
        title: "Apresentar preview",
        status: "todo",
        due_at: null,
        lead_id: "lead-1",
        leads: { name: "Clínica Aurora" },
      }),
    ).toMatchObject({ status: "todo", leadName: "Clínica Aurora" });

    expect(
      presentConversation(
        {
          id: "conversation-1",
          lead_id: "lead-1",
          sync_status: "manual",
          leads: { name: "Clínica Aurora" },
          contacts: { name: "Ana" },
        },
        { text_body: "Falamos amanhã" },
      ),
    ).toMatchObject({ leadName: "Clínica Aurora", lastMessage: "Falamos amanhã" });

    expect(
      presentMessage({
        id: "message-1",
        direction: "inbound",
        message_type: "audio",
        occurred_at: "2026-10-01T12:00:00.000Z",
        status: "delivered",
      }).body,
    ).toBe("[audio]");
  });
});

