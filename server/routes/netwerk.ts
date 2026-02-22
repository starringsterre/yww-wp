import { Request, Response } from "express";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

export async function handleNetwerkSubscribe(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, fullName, email, phone } = req.body;

  if (!email || !(firstName || fullName)) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  const netwerkListId = process.env.KLAVIYO_LIST_ID_NETWERK;
  const nieuwsbriefListId = process.env.KLAVIYO_LIST_ID_NEWSLETTER;

  if (!netwerkListId || !nieuwsbriefListId) {
    console.error("Missing KLAVIYO_LIST_ID_NETWERK or KLAVIYO_LIST_ID_NEWSLETTER environment variable");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const resolvedFirstName =
    (firstName || "").trim() || (fullName || "").trim().split(" ")[0] || "";
  const resolvedLastName =
    (lastName || "").trim() ||
    (fullName || "")
      .trim()
      .split(" ")
      .slice(1)
      .join(" ");

  try {
    const profile = {
      email: email.trim(),
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      phone: (phone || "").trim(),
      properties: {
        source: "join_netwerk_form",
        lead_type: "netwerk",
        full_name: (fullName || `${resolvedFirstName} ${resolvedLastName}`).trim(),
        is_network_member: true,
        newsletter_subscriber: true,
        communication_channel_preference: ["email", "whatsapp"],
      },
    };

    await Promise.all([
      subscribeProfileToList({ listId: netwerkListId, profile }),
      subscribeProfileToList({ listId: nieuwsbriefListId, profile }),
    ]);

    await createEvent({
      metricName: "Netwerk Inschrijving",
      profile,
      properties: {
        source: "join_netwerk_form",
        subscribed_lists: ["netwerk", "nieuwsbrief"],
        whatsapp_opt_in_intent: true,
      },
    });

    return res.json({ success: true, subscribedLists: ["netwerk", "nieuwsbrief"] });
  } catch (error) {
    console.error("Klaviyo netwerk subscription error:", error);
    return res.status(500).json({ error: "Failed to process netwerk subscription" });
  }
}
