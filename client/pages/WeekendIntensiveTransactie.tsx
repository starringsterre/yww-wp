import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, BedDouble, CheckCircle2, Mail } from "lucide-react";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { usePageContent } from "@/hooks/usePageContent";
import { useFAQs } from "@/hooks/useFAQs";
import { resolveSiteLogoUrl, toAbsoluteSiteAssetUrl } from "@/lib/siteBranding";
import SEOHead from "@/components/SEOHead";

const EMPLOYER_PRICE = 1450;
const DUO_PER_PERSON_PRICE = EMPLOYER_PRICE * 0.9;
const DUO_PRICE = DUO_PER_PERSON_PRICE * 2;
const PAGE_PATH = "/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026";
const DEFAULT_HERO_IMAGE = "/workshop-persoonlijke-ontwikkeling.jpg";
const VIDEO_ID = "3djy4-X1-3s";
const DEFAULT_VIDEO_PREVIEW = "/persoonlijke-ontwikkeling-training-vrouwen-testimonial-yww.png";
const VIDEO_URL =
  `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&modestbranding=1&rel=0`;

const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: "Voor wie is deze persoonlijke ontwikkeling training voor vrouwen bedoeld?",
    answer:
      "Voor jonge vrouwelijke professionals (24-29 jaar) die bewust willen groeien in rust, richting en leiderschap.",
  },
  {
    question: "Is dit een persoonlijke ontwikkeling training voor vrouwen in Nederland?",
    answer:
      "Ja, dit trainingsweekend vindt plaats in Oudega, Friesland en is volledig in Nederland.",
  },
  {
    question: "Wat levert deze leiderschapstraining voor vrouwen concreet op?",
    answer:
      "Je gaat naar huis met meer zelfsturing, heldere keuzes, sterke grenzen en een praktisch actieplan voor werk en privé.",
  },
  {
    question: "Kan ik alleen deelnemen als ik niemand ken?",
    answer:
      "Ja, veel deelnemers komen alleen. De groepsopbouw is veilig, warm en begeleid vanaf de eerste sessie.",
  },
  {
    question: "Wat is inbegrepen in het weekend?",
    answer:
      "Intake, begeleiding door 2 coaches, ademwerk en reflectiesessies, 2 overnachtingen, alle maaltijden en een werkboek.",
  },
  {
    question: "Hoeveel plekken zijn er beschikbaar?",
    answer:
      "Er is plek voor maximaal 8 deelnemers zodat er voldoende persoonlijke aandacht en verdieping mogelijk is.",
  },
  {
    question:
      "Wat betekent 'Particulier solo reis' als je niet via je werkgever kunt deelnemen?",
    answer:
      "Wij gunnen iedere vrouw dit retreat. Mocht je werkgever het niet vergoeden vanuit het opleidingstarief, kunnen we een gereduceerd tarief aanbieden. Inquire en we nemen contact op om te kijken naar de mogelijkheden.",
  },
  {
    question: "Kan ik als particulier betalen in 3 termijnen?",
    answer:
      "Er is mogelijkheid tot het betalen in (3) termijnen.",
  },
];

type PackageKey =
  | "Particulier solo reis"
  | "Samen met een vriendin/collega* (kamer delen)"
  | "Betaald vanuit werkgever (factuur)";

export default function WeekendIntensiveTransactie() {
  const { data: cms } = usePageContent("weekend-intensive");
  const { data: faqData } = useFAQs("weekend-intensive");
  const { data: settings } = useGlobalSettings();
  const siteLogo = toAbsoluteSiteAssetUrl(resolveSiteLogoUrl(settings?.site?.logo));

  const displayFaqs = faqData && faqData.length > 0
    ? faqData.map(f => ({ question: f.question, answer: f.answer }))
    : faqItems; // keep original hardcoded as fallback

  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("Betaald vanuit werkgever (factuur)");
  const [videoHovered, setVideoHovered] = useState(false);
  const [showInquirySuccess, setShowInquirySuccess] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [pulseInquiryButton, setPulseInquiryButton] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [friendName, setFriendName] = useState("");
  const [question, setQuestion] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [paymentRoute, setPaymentRoute] = useState<"Op factuur" | "Via platform (bijv. Alleo)">("Op factuur");
  const [platformName, setPlatformName] = useState("");
  const [invoiceReference, setInvoiceReference] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const inquireButtonWrapRef = useRef<HTMLDivElement | null>(null);
  const inquiryFormRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const requiresCompanyDetails =
    selectedPackage === "Betaald vanuit werkgever (factuur)" ||
    selectedPackage === "Samen met een vriendin/collega* (kamer delen)";
  const isDuoPackage = selectedPackage === "Samen met een vriendin/collega* (kamer delen)";

  const handleInquirySubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setFormError("Vul je naam en e-mailadres in.");
      return;
    }
    if (isDuoPackage && !friendName.trim()) {
      setFormError("Vul de naam van je vriendin in.");
      return;
    }

    if (
      requiresCompanyDetails &&
      (!companyName.trim() ||
        !paymentRoute.trim() ||
        !invoiceReference.trim())
    ) {
      setFormError("Vul alle verplichte werkgever- en factuurgegevens in.");
      return;
    }
    if (requiresCompanyDetails && paymentRoute === "Via platform (bijv. Alleo)" && !platformName.trim()) {
      setFormError("Vul de platformnaam in (bijvoorbeeld Alleo).");
      return;
    }

    setFormError("");
    setIsSubmittingInquiry(true);

    try {
      const response = await fetch("/api/weekend/inschrijving", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          question: question.trim(),
          selectedPackage,
          friendName: isDuoPackage ? friendName.trim() : "",
          paymentRoute: requiresCompanyDetails ? paymentRoute : "",
          platformName: requiresCompanyDetails ? platformName.trim() : "",
          companyName: requiresCompanyDetails ? companyName.trim() : "",
          invoiceReference: requiresCompanyDetails ? invoiceReference.trim() : "",
          purchaseOrder: requiresCompanyDetails ? purchaseOrder.trim() : "",
        }),
      });

      if (!response.ok) {
        const errorPayload = await response
          .json()
          .catch(() => ({ error: "Inschrijving versturen mislukt" }));
        const detailMessage =
          typeof errorPayload?.detail === "string" && errorPayload.detail.trim().length > 0
            ? errorPayload.detail
            : typeof errorPayload?.error === "string" && errorPayload.error.trim().length > 0
              ? errorPayload.error
              : "Inschrijving versturen mislukt";
        throw new Error(detailMessage);
      }

      setShowInquirySuccess(true);
      setShowInquiryForm(false);
    } catch (error) {
      console.error("Weekend inschrijving submit error:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Er ging iets mis bij het versturen. Probeer het opnieuw.",
      );
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const openInquiryForm = () => {
    setShowInquiryForm(true);
    setShowInquirySuccess(false);
    setFormError("");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() => {
      inquiryFormRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
      nameInputRef.current?.focus({ preventScroll: true });
    });
  };

  const scrollToInquiry = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    openInquiryForm();

    window.requestAnimationFrame(() => {
      const target = inquiryFormRef.current ?? inquireButtonWrapRef.current;
      target?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
      nameInputRef.current?.focus({ preventScroll: true });
    });

    if (!prefersReducedMotion) {
      setPulseInquiryButton(true);
      window.setTimeout(() => setPulseInquiryButton(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#FBF9F5]">
      <SEOHead
        title="Persoonlijke ontwikkeling training voor vrouwen | Young Wise Women"
        description="Weekend training voor vrouwen (24–29) die willen groeien in rust en leiderschap. Vergoeding via werkgever mogelijk. Boek je plek."
        path={PAGE_PATH}
        ogImage={`https://youngwisewomen.nl${DEFAULT_HERO_IMAGE}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": "https://youngwisewomen.nl#organization", name: "Young Wise Women", url: "https://youngwisewomen.nl", logo: siteLogo, email: "info@youngwisewomen.nl" },
            { "@type": "Event", "@id": `https://youngwisewomen.nl${PAGE_PATH}#event`, name: "Persoonlijke Ontwikkeling Training voor Vrouwen - Weekend Intensive juni 2026", description: "Persoonlijke ontwikkeling training voor vrouwen in Nederland met focus op rust, richting en leiderschap.", startDate: "2026-06-24T17:30:00+02:00", endDate: "2026-06-26T16:00:00+02:00", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", image: [`https://youngwisewomen.nl${DEFAULT_HERO_IMAGE}`], location: { "@type": "Place", name: "Oudega, Friesland", address: { "@type": "PostalAddress", addressLocality: "Oudega", addressRegion: "Friesland", addressCountry: "NL" } }, organizer: { "@id": "https://youngwisewomen.nl#organization" }, maximumAttendeeCapacity: 8, offers: [{ "@type": "Offer", name: "Samen met een vriendin/collega* (kamer delen)", price: String(DUO_PRICE), priceCurrency: "EUR", availability: "https://schema.org/LimitedAvailability", validFrom: "2026-02-21", url: `https://youngwisewomen.nl${PAGE_PATH}` }, { "@type": "Offer", name: "Betaald vanuit werkgever (factuur)", price: String(EMPLOYER_PRICE), priceCurrency: "EUR", availability: "https://schema.org/LimitedAvailability", validFrom: "2026-02-21", url: `https://youngwisewomen.nl${PAGE_PATH}` }] },
            { "@type": "FAQPage", "@id": `https://youngwisewomen.nl${PAGE_PATH}#faq`, mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
          ],
        }}
      />
      <section className="py-10 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light text-[#1C2826] mb-3">
            {cms?.hero_title || "Persoonlijke Ontwikkeling Training voor Vrouwen – Weekend Intensive juni 2026"}
          </h1>
          <p className="text-sm md:text-base text-gray-700 max-w-4xl">
            {cms?.hero_subtitle || "Gericht op jonge vrouwelijke professionals (24–29 jaar) die willen groeien in rust, richting en leiderschap."}
          </p>
        </div>
      </section>

      <section className="pb-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">
                {cms?.intro_heading || "Persoonlijke ontwikkeling training voor vrouwen in Nederland"}
              </h2>
              <div className="space-y-3 text-sm md:text-base text-gray-700">
                <p>
                  {cms?.intro_text || "Deze persoonlijke ontwikkeling training voor vrouwen combineert coaching, reflectie en lichaamswerk in een kleinschalige setting in Nederland. Tijdens dit trainingsweekend werk je aan rust in je hoofd, helderheid in je keuzes en zichtbaar leiderschap in je werk en leven. Je vertrekt met concrete stappen die je direct toepast in je dagelijkse praktijk."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">Praktisch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#6B705C] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C2826]">{cms?.when_label || "Wanneer"}</p>
                    <p>{cms?.when_text || "Van 24 juni 17:30 t/m 26 juni 16:00 (2026)"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#6B705C] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C2826]">{cms?.where_label || "Waar"}</p>
                    <p>{cms?.where_text || "Oudega, Friesland (natuur en water)"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#6B705C] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C2826]">{cms?.group_label || "Groep"}</p>
                    <p>{cms?.group_text || "Maximaal 8 deelneemsters"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BedDouble className="w-5 h-5 text-[#6B705C] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C2826]">{cms?.rooms_label || "Kamers"}</p>
                    <p>{cms?.rooms_text || "4 slaapkamers, bedden kunnen uit elkaar"}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p>
                  {cms?.additional_text || "Weekenden op aanvraag zijn beschikbaar voor groepen young professionals. Bekijk de mogelijkheden op"}{" "}
                  <Link className="underline underline-offset-2" to="/in-company">
                    de bedrijfspagina
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.video_heading || "Hoe andere deelneemsters het ervaren:"}</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <div className="relative aspect-video bg-black">
                  <img
                    loading="lazy"
                    src={DEFAULT_VIDEO_PREVIEW}
                    alt="Video preview van persoonlijke ontwikkeling training voor vrouwen in Nederland"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoHovered ? "opacity-0" : "opacity-100"}`}
                  />
                  {videoHovered && (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={VIDEO_URL}
                      title="Weekend Intensive video"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setVideoHovered(true)}
                    onMouseLeave={() => setVideoHovered(false)}
                    onFocus={() => setVideoHovered(true)}
                    onBlur={() => setVideoHovered(false)}
                    className="absolute inset-0"
                    aria-label="Speel weekend intensive video op hover"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.about_heading || "Over dit evenement"}</h2>
              <div className="space-y-3 text-sm md:text-base text-gray-700">
                <p>
                  {cms?.about_text_1 || "Je stapt drie dagen uit je dagelijkse ritme om opnieuw contact te maken met wat voor jou klopt. Met coaching, reflectie, ademwerk en beweging werk je aan duurzame verandering die je na het weekend direct toepast."}
                </p>
                <p>
                  {cms?.about_text_2 || "Dit weekend is bewust kleinschalig: 8 deelneemsters, 4 slaapkamers, en een setting waarin veiligheid, diepte en praktische vertaling centraal staan."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.for_whom_heading || "Voor wie is dit weekend bedoeld?"}</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                {cms?.for_whom_items
                  ? cms.for_whom_items.split("\n").filter(Boolean).map((item: string) => (
                      <li key={item}>{item}</li>
                    ))
                  : (
                    <>
                      <li>Voor jonge vrouwelijke professionals die persoonlijk en professioneel willen doorgroeien.</li>
                      <li>Voor vrouwen die veel dragen, maar worstelen met stress, twijfel of het stellen van grenzen.</li>
                      <li>Voor deelnemers die verlangen naar meer rust, richting, zelfvertrouwen en regie.</li>
                      <li>Voor wie na het weekend met concrete inzichten en direct toepasbare acties naar huis wil.</li>
                    </>
                  )
                }
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.results_heading || "Wat levert deze training je op?"}</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                {cms?.results_items
                  ? cms.results_items.split("\n").filter(Boolean).map((item: string) => (
                      <li key={item}>{item}</li>
                    ))
                  : (
                    <>
                      <li>Meer richting in je werk en persoonlijke keuzes.</li>
                      <li>Heldere grenzen communiceren zonder schuldgevoel.</li>
                      <li>Sterker en rustiger leiderschap in uitdagende situaties.</li>
                      <li>Meer energie door betere balans tussen inspanning en herstel.</li>
                      <li>Duidelijkheid over wat nu echt belangrijk is en wat je loslaat.</li>
                      <li>Een concreet actieplan voor de eerste 30 dagen na het weekend.</li>
                    </>
                  )
                }
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.included_heading || "Wat is inbegrepen?"}</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                {cms?.included_items
                  ? cms.included_items.split("\n").filter(Boolean).map((item: string) => (
                      <li key={item}>{item}</li>
                    ))
                  : (
                    <>
                      <li>Intake vantevoren met de coach om je behoeftes in kaart te brengen</li>
                      <li>Motivation Factor self-assessment ter waarde van €145</li>
                      <li>Persoonlijke professionele begeleiding van twee coaches</li>
                      <li>Catering verzorgd met ontbijt, lunch, diner en versnaperingen</li>
                      <li>2 nachten accommodatie in een prachtig huis in Nederland, in comfortabele tweepersoonskamers met losse bedden</li>
                    </>
                  )
                }
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="h-56 md:h-64 overflow-hidden">
                  <img
                    loading="lazy"
                    src="/workshop-persoonlijke-ontwikkeling.jpg"
                    alt="Persoonlijke ontwikkeling training voor vrouwen tijdens reflectiesessie"
                    className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.9) contrast(0.95)" }}
                  />
                </div>
                <div className="p-4 text-sm text-gray-700">{cms?.caption_1 || "Vertragen, voelen en richting kiezen."}</div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="h-56 md:h-64 overflow-hidden">
                  <img
                    loading="lazy"
                    src="/persoonlijke-groei-training.jpg"
                    alt="Leiderschapstraining voor vrouwen in kleine groep"
                    className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.9) contrast(0.95)" }}
                  />
                </div>
                <div className="p-4 text-sm text-gray-700">{cms?.caption_2 || "Van inzicht naar concreet gedrag in werk en leven."}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-3">{cms?.book_heading || "Boek jouw plek"}</h2>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                {cms?.book_text || "Klaar om je plek te reserveren voor dit trainingsweekend voor vrouwen in Nederland?"}
              </p>
              <button
                type="button"
                onClick={scrollToInquiry}
                className="inline-flex items-center rounded-lg bg-[#6B705C] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#B46555]"
              >
                {cms?.book_cta || "Ga naar Inquire now"}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">
                {cms?.faq_heading || "Veelgestelde vragen over persoonlijke ontwikkeling trainingen voor vrouwen"}
              </h2>
              <div className="space-y-4 text-sm md:text-base text-gray-700">
                {displayFaqs.map((item) => (
                  <div key={item.question}>
                    <p className="font-medium text-[#1C2826]">{item.question}</p>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-medium text-[#1C2826] mb-4">{cms?.related_heading || "Lees ook"}</h2>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link className="underline underline-offset-2 text-[#1C2826]" to="/retreats">
                  Persoonlijke ontwikkeling
                </Link>
                <Link className="underline underline-offset-2 text-[#1C2826]" to="/in-company">
                  Bedrijfstrajecten
                </Link>
                <Link className="underline underline-offset-2 text-[#1C2826]" to="/inspiratie">
                  Inspiratie
                </Link>
              </div>
            </div>
          </div>

          <aside className="xl:sticky xl:top-24">
            <div className="rounded-2xl border border-[#B46555]/35 bg-[#B46555]/10 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-[#6B705C] mb-2">{cms?.availability_label || "Beschikbaarheid"}</p>
              <div className="mb-3">
                <div className="flex -space-x-2 mb-2">
                  {[1, 2, 3].map((item) => (
                    <img
                      key={item}
                      loading="lazy"
                      src="/workshop-persoonlijke-ontwikkeling.jpg"
                      alt="Indicatie van reeds bezette plekken"
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      style={{ filter: "blur(1.5px)" }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-[#1C2826]">{cms?.availability_text || "3 van 8"}</span> plekken al gereserveerd
                </p>
              </div>
              <p className="text-xs text-gray-600 mb-5">{cms?.availability_note || "Nog 5 plekken beschikbaar op dit moment."}</p>

              <div className="space-y-3" role="radiogroup" aria-label="Kies je product">
                <label className={`block rounded-xl border bg-white p-4 cursor-pointer transition-colors ${selectedPackage === "Betaald vanuit werkgever (factuur)" ? "border-[#B46555]" : "border-[#1C2826]/15"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="package"
                      className="mt-1 accent-[#B46555]"
                      checked={selectedPackage === "Betaald vanuit werkgever (factuur)"}
                      onChange={() => setSelectedPackage("Betaald vanuit werkgever (factuur)")}
                    />
                    <div>
                      <p className="font-medium text-[#1C2826]">{cms?.package_1_title || "Betaald vanuit je werkgever"}</p>
                      <p className="text-sm text-gray-600 mb-2">{cms?.package_1_subtitle || "Je eenmalige investering"}</p>
                      <p className="text-xl font-semibold text-[#1C2826]">{cms?.package_1_price || `€ ${EMPLOYER_PRICE.toLocaleString("nl-NL")}`}</p>
                      <p className="text-xs text-gray-500">{cms?.package_1_note || "excl. BTW"}</p>
                    </div>
                  </div>
                </label>

                <label className={`block rounded-xl border bg-white p-4 cursor-pointer transition-colors ${selectedPackage === "Samen met een vriendin/collega* (kamer delen)" ? "border-[#B46555]" : "border-[#1C2826]/15"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="package"
                      className="mt-1 accent-[#B46555]"
                      checked={selectedPackage === "Samen met een vriendin/collega* (kamer delen)"}
                      onChange={() => setSelectedPackage("Samen met een vriendin/collega* (kamer delen)")}
                    />
                    <div>
                      <p className="font-medium text-[#1C2826]">{cms?.package_2_title || "Samen met een vriendin/collega*"}</p>
                      <p className="text-sm text-gray-600 mb-2">{cms?.package_2_subtitle || "Per persoon: werkgeverstarief met 10% korting."}</p>
                      <p className="text-xl font-semibold text-[#1C2826]">{cms?.package_2_price || `€ ${DUO_PER_PERSON_PRICE.toLocaleString("nl-NL")} p.p.`}</p>
                      <p className="text-xs text-gray-500">{cms?.package_2_note || "excl. BTW"}</p>
                    </div>
                  </div>
                </label>

                <label className={`block rounded-xl border bg-white p-4 cursor-pointer transition-colors ${selectedPackage === "Particulier solo reis" ? "border-[#B46555]" : "border-[#1C2826]/15"}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="package"
                      className="mt-1 accent-[#B46555]"
                      checked={selectedPackage === "Particulier solo reis"}
                      onChange={() => setSelectedPackage("Particulier solo reis")}
                    />
                    <div>
                      <p className="font-medium text-[#1C2826]">{cms?.package_3_title || "Particulier solo reis"}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        {cms?.package_3_subtitle || "Uitzonderingsroute: een gereduceerd particulier tarief voor wie niet via werkgever kan deelnemen."}
                      </p>
                      <p className="text-sm font-medium text-[#1C2826]">{cms?.package_3_price || "Prijs in overleg"}</p>
                      <p className="text-xs text-gray-500">{cms?.package_3_note || "Beperkt beschikbaar als uitzondering."}</p>
                    </div>
                  </div>
                </label>
              </div>
              <div ref={inquireButtonWrapRef} className="mt-4" id="inquire-now">
                <Button
                  size="lg"
                  className={`w-full text-white transition-all duration-300 ${
                    pulseInquiryButton
                      ? "bg-[#B46555] scale-[1.02] animate-pulse"
                      : "bg-primary hover:bg-accent"
                  }`}
                  onClick={openInquiryForm}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Inquire now
                </Button>
              </div>

              {showInquiryForm && (
                <div ref={inquiryFormRef} className="mt-3 rounded-lg border border-[#1C2826]/15 bg-white p-3">
                  <p className="text-sm font-medium text-[#1C2826] mb-2">{cms?.form_heading || "Laat je gegevens achter"}</p>
                  <div className="space-y-2">
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Naam *"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="E-mailadres *"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Telefoon (optioneel)"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    {isDuoPackage && (
                      <input
                        type="text"
                        value={friendName}
                        onChange={(event) => setFriendName(event.target.value)}
                        placeholder="Naam vriendin *"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    )}
                    <textarea
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      placeholder="Vraag of opmerking (optioneel)"
                      className="w-full min-h-[84px] rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    {requiresCompanyDetails && (
                      <>
                        <div className="rounded-md border border-[#1C2826]/10 bg-[#FBF9F5] px-3 py-2">
                          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#6B705C]">
                            Werkgever- en factuurgegevens
                          </p>
                        </div>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(event) => setCompanyName(event.target.value)}
                          placeholder="Bedrijfsnaam *"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setPaymentRoute("Op factuur");
                              setPlatformName("");
                            }}
                            className={`rounded-md border px-3 py-2 text-sm text-left transition-colors ${
                              paymentRoute === "Op factuur"
                                ? "border-[#B46555] bg-[#B46555]/10 text-[#1C2826]"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                          >
                            Op factuur
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentRoute("Via platform (bijv. Alleo)")}
                            className={`rounded-md border px-3 py-2 text-sm text-left transition-colors ${
                              paymentRoute === "Via platform (bijv. Alleo)"
                                ? "border-[#B46555] bg-[#B46555]/10 text-[#1C2826]"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                          >
                            Via platform (bijv. Alleo)
                          </button>
                        </div>
                        {paymentRoute === "Via platform (bijv. Alleo)" && (
                          <input
                            type="text"
                            value={platformName}
                            onChange={(event) => setPlatformName(event.target.value)}
                            placeholder="Platformnaam * (bijv. Alleo)"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        )}
                        <input
                          type="text"
                          value={invoiceReference}
                          onChange={(event) => setInvoiceReference(event.target.value)}
                          placeholder="Referentie / afdeling *"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        <input
                          type="text"
                          value={purchaseOrder}
                          onChange={(event) => setPurchaseOrder(event.target.value)}
                          placeholder="Inkoopnummer (PO) (optioneel)"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                      </>
                    )}
                    {formError && <p className="text-xs text-red-600">{formError}</p>}
                    <Button
                      size="sm"
                      disabled={isSubmittingInquiry}
                      className="w-full bg-[#6B705C] text-white hover:bg-[#B46555]"
                      onClick={handleInquirySubmit}
                    >
                      {isSubmittingInquiry ? "Bezig met versturen..." : "Verstuur aanvraag"}
                    </Button>
                  </div>
                </div>
              )}

              {showInquirySuccess && (
                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                  <p className="font-medium">{cms?.success_title || "Success! Heel erg bedankt voor je aanmelding."}</p>
                  <p>{cms?.success_text || "We nemen zo snel mogelijk contact met je op."}</p>
                  <p className="mt-1">{cms?.success_signature || "Hartelijke groet, Ella"}</p>
                </div>
              )}

              <ul className="mt-4 space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[#6B705C]" />
                  {cms?.sidebar_benefit_1 || "Binnen 1 werkdag reactie op je aanvraag"}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[#6B705C]" />
                  {cms?.sidebar_benefit_2 || "Inclusief ademwerk en yogalessen"}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
