import { Request, Response } from "express";
import { GroeiScanLeadRequest } from "@shared/api";

const defaultWebhookUrl = "https://guidocroon.com/n8n/webhook-test/Groeiscan";

export async function handleGroeiScanLead(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as GroeiScanLeadRequest;
  const { name, email, answers, recommendation, consent } = body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "Answers are required" });
  }

  const webhookUrl = process.env.N8N_GROEISCAN_WEBHOOK_URL ?? defaultWebhookUrl;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead_type: "groeiscan",
        name: name.trim(),
        email: email.trim(),
        answers,
        recommendation,
        consent: {
          marketing_email: consent?.marketingEmail ?? true,
          double_opt_in: true,
        },
      }),
    });

    if (!response.ok) {
      console.error(`Groeiscan webhook error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to process groeiscan lead" });
    }

    let result: unknown = null;
    try {
      result = await response.json();
    } catch (_error) {
      result = { ok: true };
    }

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Groeiscan submission error:", error);
    return res.status(500).json({ error: "Failed to process groeiscan lead" });
  }
}
