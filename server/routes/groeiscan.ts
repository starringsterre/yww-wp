import { Request, Response } from "express";
import { GroeiScanLeadRequest } from "../../shared/api";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

const DEFAULT_KLAVIYO_LEADS_LIST_ID = "R4PSyk";

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
        source: "groeiscan",
        lead_type: "groeiscan",
        groeiscan_answers_json: JSON.stringify(answers ?? []),
        groeiscan_answers_count: Array.isArray(answers) ? answers.length : 0,
        groeiscan_primary_track: recommendation?.primaryTrack ?? "",
        groeiscan_bridge_track: recommendation?.bridgeTrack ?? "",
        groeiscan_summary: recommendation?.summary ?? "",
        groeiscan_weekend_score: recommendation?.weekendScore ?? 0,
        groeiscan_workshop_score: recommendation?.workshopScore ?? 0,
        consent_marketing_email: consent?.marketingEmail ?? true,
        consent_double_opt_in: consent?.doubleOptIn ?? true,
      },
    };

    await subscribeProfileToList({
      listId: leadsListId,
      profile,
    });

    await createEvent({
      metricName: "Groeiscan Ingevuld",
      profile,
      properties: {
        source: "groeiscan",
        lead_type: "groeiscan",
        answers,
        recommendation,
        consent: {
          marketing_email: consent?.marketingEmail ?? true,
          double_opt_in: consent?.doubleOptIn ?? true,
        },
      },
    });

    return res.json({ success: true, listId: leadsListId });
  } catch (error) {
    console.error("Groeiscan submission error:", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process groeiscan lead",
      detail: process.env.NODE_ENV === "production" ? undefined : detail,
    });
  }
}
