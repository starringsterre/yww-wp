import { Request, Response } from "express";
import { createEvent, subscribeProfileToList } from "../lib/klaviyo";

type PackageOptionKey =
  | "particulier_solo"
  | "duo_met_vriendin"
  | "werkgever_factuur";

function toPackageOptionKey(packageLabel: string): PackageOptionKey {
  if (packageLabel === "Particulier solo reis") {
    return "particulier_solo";
  }
  if (packageLabel === "Samen met een vriendin/collega* (kamer delen)") {
    return "duo_met_vriendin";
  }
  return "werkgever_factuur";
}

export async function handleWeekendInschrijving(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    question,
    selectedPackage,
    friendName,
    paymentRoute,
    platformName,
    companyName,
    invoiceEmail,
    kvkNumber,
    vatNumber,
    invoiceStreet,
    invoiceHouseNumber,
    invoicePostalCode,
    invoiceCity,
    invoiceReference,
    purchaseOrder,
  } = req.body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !selectedPackage?.trim()) {
    return res.status(400).json({ error: "name, email and selectedPackage are required" });
  }

  const trainingsListId = process.env.KLAVIYO_LIST_ID_TRAININGS;
  if (!trainingsListId) {
    console.error("Missing KLAVIYO_LIST_ID_TRAININGS environment variable");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const [firstName = "", ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");
  const packageOption = toPackageOptionKey(selectedPackage);
  const requiresCompanyDetails =
    selectedPackage === "Betaald vanuit werkgever (factuur)" ||
    selectedPackage === "Samen met een vriendin/collega* (kamer delen)";

  try {
    const profile = {
      email: email.trim(),
      firstName,
      lastName,
      phone: (phone || "").trim(),
      properties: {
        source: "weekend_transaction_page",
        lead_type: "weekend_training_inschrijving",
        weekend_package_label: selectedPackage,
        package_option: packageOption,
      },
    };

    await subscribeProfileToList({
      listId: trainingsListId,
      profile,
    });

    await createEvent({
      metricName: "Weekend Inschrijving Gestart",
      profile,
      properties: {
        source: "weekend_transaction_page",
        event_name: "Weekend Intensive juni 2026",
        event_start_date: "2026-06-24T17:30:00+02:00",
        event_end_date: "2026-06-26T16:00:00+02:00",
        package_option: packageOption,
        package_label: selectedPackage,
        question: (question || "").trim(),
        friend_name: (friendName || "").trim(),
        requires_company_details: requiresCompanyDetails,
        payment_route: (paymentRoute || "").trim(),
        platform_name: (platformName || "").trim(),
        company_name: (companyName || "").trim(),
        invoice_email: (invoiceEmail || "").trim(),
        kvk_number: (kvkNumber || "").trim(),
        vat_number: (vatNumber || "").trim(),
        invoice_street: (invoiceStreet || "").trim(),
        invoice_house_number: (invoiceHouseNumber || "").trim(),
        invoice_postal_code: (invoicePostalCode || "").trim(),
        invoice_city: (invoiceCity || "").trim(),
        invoice_reference: (invoiceReference || "").trim(),
        purchase_order: (purchaseOrder || "").trim(),
      },
    });

    return res.json({ success: true, packageOption });
  } catch (error) {
    console.error("Klaviyo weekend inschrijving error:", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process weekend inschrijving",
      detail: process.env.NODE_ENV === "production" ? undefined : detail,
    });
  }
}
