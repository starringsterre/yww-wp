import { Request, Response } from "express";

export async function handleMailchimpSubscribe(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, phone } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: "Email and firstName are required" });
  }

  const listId = process.env.VITE_MAILCHIMP_LIST_ID;
  const apiKey = process.env.VITE_MAILCHIMP_API_KEY;
  const dataCenter = process.env.VITE_MAILCHIMP_DATACENTER;

  if (!listId || !apiKey || !dataCenter) {
    console.error("Missing Mailchimp environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const mailchimpData = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName || "",
        PHONE: phone || ""
      },
      tags: ["YWW"]
    };

    const response = await fetch(
      `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `apikey ${apiKey}`
        },
        body: JSON.stringify(mailchimpData)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Mailchimp API Error:", error);
      return res.status(response.status).json({ error: error.detail || "Failed to subscribe" });
    }

    const result = await response.json();
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Mailchimp submission error:", error);
    return res.status(500).json({ error: "Failed to process subscription" });
  }
}
