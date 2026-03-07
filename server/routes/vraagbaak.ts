import { Request, Response } from "express";
import { VraagbaakLeadRequest } from "@shared/api";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

const DEFAULT_KLAVIYO_LEADS_LIST_ID = "R4PSyk";

export async function handleVraagbaakLead(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as VraagbaakLeadRequest;
  const { name, email, chatMessages, intakeAnswers, contactPreference } = body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const leadsListId =
    process.env.KLAVIYO_LIST_ID_LEADS?.trim() || DEFAULT_KLAVIYO_LEADS_LIST_ID;

  try {
    const [firstName = "", ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");

    const profile = {
      email: email.trim(),
      firstName,
      lastName,
      properties: {
        source: "vraagbaak",
        lead_type: "vraagbaak",
        vraagbaak_chat_messages_json: JSON.stringify(chatMessages ?? []),
        vraagbaak_chat_messages_count: Array.isArray(chatMessages) ? chatMessages.length : 0,
        vraagbaak_intake_answers_json: JSON.stringify(intakeAnswers ?? []),
        vraagbaak_intake_answers_count: Array.isArray(intakeAnswers) ? intakeAnswers.length : 0,
        vraagbaak_contact_preference:
          contactPreference ?? "Passende suggesties per e-mail",
        consent_marketing_email: true,
        consent_double_opt_in: true,
      },
    };

    await subscribeProfileToList({
      listId: leadsListId,
      profile,
    });

    await createEvent({
      metricName: "Vraagbaak Lead Ingevuld",
      profile,
      properties: {
        source: "vraagbaak",
        lead_type: "vraagbaak",
        chat_messages: chatMessages ?? [],
        intake_answers: intakeAnswers ?? [],
        contact_preference:
          contactPreference ?? "Passende suggesties per e-mail",
        consent: {
          marketing_email: true,
          double_opt_in: true,
        },
      },
    });

    return res.json({ success: true, listId: leadsListId });
  } catch (error) {
    console.error("Vraagbaak lead submission error:", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process vraagbaak lead",
      detail: process.env.NODE_ENV === "production" ? undefined : detail,
    });
  }
}
