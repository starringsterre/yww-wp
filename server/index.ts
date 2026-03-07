import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleMailchimpSubscribe } from "./routes/mailchimp";
import { handleNewsletterSubscribe } from "./routes/newsletter";
import { handleNetwerkSubscribe } from "./routes/netwerk";
import { handleBedrijfsBrochureLead } from "./routes/bedrijfs";
import { handleWeekendInschrijving } from "./routes/weekend-inschrijving";
import { handleGroeiScanLead } from "./routes/groeiscan";
import { handleVraagbaakLead } from "./routes/vraagbaak";

export function createServer() {
  const app = express();

  // Middleware — scoped to /api so body parsers don't consume WP proxy requests
  app.use(cors());
  app.use("/api", express.json());
  app.use("/api", express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/debug/env-check", (_req, res) => {
    res.json({
      KLAVIYO_PRIVATE_KEY: !!process.env.KLAVIYO_PRIVATE_KEY,
      KLAVIYO_LIST_ID_NEWSLETTER: !!process.env.KLAVIYO_LIST_ID_NEWSLETTER,
      KLAVIYO_LIST_ID_NETWERK: !!process.env.KLAVIYO_LIST_ID_NETWERK,
      KLAVIYO_LIST_ID_TRAININGS: !!process.env.KLAVIYO_LIST_ID_TRAININGS,
      KLAVIYO_LIST_ID_LEADS: !!process.env.KLAVIYO_LIST_ID_LEADS,
      KLAVIYO_LIST_ID_BEDRIJFS: !!process.env.KLAVIYO_LIST_ID_BEDRIJFS,
      KLAVIYO_API_REVISION: process.env.KLAVIYO_API_REVISION || "(default 2024-10-15)",
    });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/mailchimp/subscribe", handleMailchimpSubscribe);
  app.post("/api/newsletter/subscribe", handleNewsletterSubscribe);
  app.post("/api/netwerk/subscribe", handleNetwerkSubscribe);
  app.post("/api/bedrijfs/brochure-lead", handleBedrijfsBrochureLead);
  app.post("/api/weekend/inschrijving", handleWeekendInschrijving);
  app.post("/api/groeiscan/lead", handleGroeiScanLead);
  app.post("/api/vraagbaak/lead", handleVraagbaakLead);

  return app;
}
