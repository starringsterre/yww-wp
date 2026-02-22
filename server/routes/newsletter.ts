import { Request, Response } from "express";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

export async function handleNewsletterSubscribe(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, source } = req.body;

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
        source: source || "website_newsletter_route",
        lead_type: "newsletter",
      },
    };

    await subscribeProfileToList({ listId, profile });
    await createEvent({
      metricName: "Nieuwsbrief Inschrijving",
      profile,
      properties: { source: source || "website_newsletter_route" },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Klaviyo newsletter submission error:", error);
    return res.status(500).json({ error: "Failed to process subscription" });
  }
}
