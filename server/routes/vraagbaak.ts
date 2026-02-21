import { Request, Response } from "express";
import { VraagbaakLeadRequest } from "@shared/api";

const defaultWebhookUrl = "https://guidocroon.com/n8n/webhook-test/Groeiscan";

export async function handleVraagbaakLead(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as VraagbaakLeadRequest;
  const { name, email, chatMessages, intakeAnswers, contactPreference } = body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const webhookUrl = process.env.N8N_VRAAGBAAK_WEBHOOK_URL ?? defaultWebhookUrl;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead_type: "vraagbaak",
        name: name.trim(),
        email: email.trim(),
        chat_messages: chatMessages ?? [],
        intake_answers: intakeAnswers ?? [],
        contact_preference: contactPreference ?? "Passende suggesties per e-mail",
        consent: {
          marketing_email: true,
          double_opt_in: true,
        },
      }),
    });

    if (!response.ok) {
      console.error(`Vraagbaak webhook error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to process vraagbaak lead" });
    }

    let result: unknown = null;
    try {
      result = await response.json();
    } catch (_error) {
      result = { ok: true };
    }

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Vraagbaak lead submission error:", error);
    return res.status(500).json({ error: "Failed to process vraagbaak lead" });
  }
}
