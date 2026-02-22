import { Request, Response } from "express";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

export async function handleMailchimpSubscribe(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, phone } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: "Email and firstName are required" });
  }

  const listId = process.env.KLAVIYO_LIST_ID_NEWSLETTER;

  if (!listId) {
    console.error("Missing KLAVIYO_LIST_ID_NEWSLETTER environment variable");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const profile = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      phone: (phone || "").trim(),
      properties: {
        source: "website_newsletter_form",
        lead_type: "newsletter",
      },
    };

    await subscribeProfileToList({ listId, profile });
    await createEvent({
      metricName: "Nieuwsbrief Inschrijving",
      profile,
      properties: {
        source: "website_newsletter_form",
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Klaviyo newsletter submission error:", error);
    return res.status(500).json({ error: "Failed to process subscription" });
  }
}
