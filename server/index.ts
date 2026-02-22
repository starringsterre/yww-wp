import "dotenv/config";
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

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
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
