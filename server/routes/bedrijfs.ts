import { Request, Response } from "express";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

export async function handleBedrijfsBrochureLead(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, company, role } = req.body;

  if (!email || !firstName || !lastName || !company) {
    return res.status(400).json({ error: "firstName, lastName, email and company are required" });
  }

  const listId = process.env.KLAVIYO_LIST_ID_BEDRIJFS;
  if (!listId) {
    console.error("Missing KLAVIYO_LIST_ID_BEDRIJFS environment variable");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const profile = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      properties: {
        source: "bedrijfs_brochure_download",
        lead_type: "bedrijfs_brochure",
        company: company.trim(),
        role: (role || "").trim(),
      },
    };

    await subscribeProfileToList({ listId, profile });
    await createEvent({
      metricName: "Bedrijfs Brochure Download",
      profile,
      properties: {
        source: "bedrijfs_brochure_download",
        company: company.trim(),
        role: (role || "").trim(),
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Klaviyo bedrijfs brochure lead error:", error);
    return res.status(500).json({ error: "Failed to process brochure lead" });
  }
}
