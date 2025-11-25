import { Request, Response } from "express";

export async function handleNewsletterSubscribe(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: "Email and firstName are required" });
  }

  const webhookUrl = "https://guidocroon.com/n8n/webhook/nieuwsbrief";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });

    if (!response.ok) {
      console.error(`Webhook error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: "Failed to process subscription" });
    }

    const result = await response.json();
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Newsletter submission error:", error);
    return res.status(500).json({ error: "Failed to process subscription" });
  }
}
