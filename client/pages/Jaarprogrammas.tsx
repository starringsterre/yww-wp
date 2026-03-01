import { useEffect } from "react";
import { Brain, Wind, Lightbulb, Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SlideInLeft from "@/components/SlideInLeft";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

export default function Jaarprogrammas() {
  const { data: cms } = usePageContent("jaarprogrammas");

  const forWhomItems: string[] = cms?.for_whom_items
    ? cms.for_whom_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Duurzaam willen groeien over een langere periode",
        "✓ Behoefte hebben aan structuur en begeleiding in hun ontwikkeling",
        "✓ Willen investeren in zowel persoonlijk als professioneel leiderschap",
        "✓ Een community zoeken van gelijkgestemde jonge vrouwen",
      ];

  const sidebarInvestmentItems: string[] = cms?.sidebar_investment_items
    ? cms.sidebar_investment_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Maandelijks te betalen of in één keer",
        "✓ Vaak vergoed via opleidingsbudget werkgever",
        "✓ Inclusief alle materialen en tools",
      ];

  const sidebarIncludedItems: string[] = cms?.sidebar_included_items
    ? cms.sidebar_included_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ 1-op-1 coachingsessies met gecertificeerde coach",
        "✓ Maandelijkse groepssessies",
        "✓ Dag workshop en weekend training",
        "✓ Motivation Factor test (t.w.v. €145)",
        "✓ Werkboek en praktische tools",
      ];

  const sidebarPracticalItems: string[] = cms?.sidebar_practical_items
    ? cms.sidebar_practical_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Duur: 12 maanden",
        "✓ Locatie: Castricum / Friesland / online",
        "✓ Groepsgrootte: 8 tot 12 deelnemers",
        "✓ Start: meerdere momenten per jaar",
      ];

  useEffect(() => {
    const pageTitle = "Jaarprogramma's voor Jonge Vrouwen | Young Wise Women";
    const pageDescription =
      "Langlopende ontwikkelprogramma's voor jonge vrouwelijke professionals. Combinatie van coaching, groepssessies, workshops en weekend training voor duurzame groei.";
    const canonicalPath = "/groepstrainingen/jaarprogrammas";

    document.title = pageTitle;
    document.documentElement.lang = "nl";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${canonicalPath}`);

    const scriptId = "jaarprogrammas-jsonld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const jsonLdScript = document.createElement("script");
    jsonLdScript.id = scriptId;
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Young Wise Women Jaarprogramma",
      description: pageDescription,
      provider: {
        "@type": "Organization",
        name: "Young Wise Women",
        url: window.location.origin,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Blended",
        duration: "P12M",
        location: {
          "@type": "Place",
          name: "Young Wise Women Trainingslocatie",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Castricum",
            addressCountry: "NL",
          },
        },
      },
    });
    document.head.appendChild(jsonLdScript);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <SEOHead
        title="Jaarprogramma's voor Jonge Vrouwen | Young Wise Women"
        description="Langlopende ontwikkelingstrajecten voor jonge vrouwen die duurzaam willen groeien. Jaarprogramma's met structuur en begeleiding."
        path="/in-company/jaarprogrammas"
      />
      <HeroSection
        backgroundImage={cms?.hero_image || "https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg"}
        title={cms?.hero_title || "Jaarprogramma's"}
        subtitle={
          cms?.hero_subtitle ||
          "Langlopende ontwikkelprogramma's voor jonge vrouwen die duurzaam willen groeien in leiderschap en persoonlijke kracht."
        }
      />

      {/* Intro */}
      <section className="py-10 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#B46555]/25 p-6 md:p-8">
            <h2 className="max-w-4xl text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {cms?.intro_heading || "Een jaar lang investeren in jouw groei als jonge professional"}
            </h2>
            <div className="max-w-4xl space-y-3 text-gray-700 leading-relaxed">
              <p>
                {cms?.intro_text_1 || "Ons jaarprogramma combineert 1-op-1 coaching, groepssessies, een dag workshop en een weekend training tot een samenhangend traject. Gedurende 12 maanden werk je structureel aan je persoonlijke en professionele ontwikkeling, met begeleiding van ervaren coaches."}
              </p>
              <p>
                {cms?.intro_text_2 || "Je bouwt stap voor stap aan rust, zelfvertrouwen en leiderschap. Het programma is ontworpen zodat je inzichten direct kunt toepassen in je werk en dagelijks leven."}
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block rounded-lg bg-primary px-7 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                {cms?.intro_cta || "Neem contact op voor meer informatie"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Drie Fases */}
      <section id="drie-fases" className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#B8B7A3" }}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              {cms?.phases_heading || "De Drie Fases van het Jaarprogramma"}
            </h2>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              {cms?.phases_intro || "Elk jaarprogramma is opgebouwd uit drie fases die samen zorgen voor een duurzame transformatie."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Brain size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.phase_1_title || "Fase 1: Bewustwording"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.phase_1_text || "Je brengt in kaart wie je bent, wat je drijft en waar je naartoe wilt. Door reflectie, coaching en de Motivation Factor test krijg je helder inzicht in je patronen en kwaliteiten."}
              </p>
            </div>

            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Wind size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.phase_2_title || "Fase 2: Verdieping"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.phase_2_text || "Je werkt actief aan gedragsverandering en leiderschap. In groepssessies en een weekend training ga je dieper in op je blokkades en leer je nieuwe vaardigheden toepassen."}
              </p>
            </div>

            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Lightbulb size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.phase_3_title || "Fase 3: Integratie"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.phase_3_text || "Je borgt je ontwikkeling en maakt het onderdeel van je dagelijks leven. Met een concreet actieplan en terugkomsessies zorg je dat je groei duurzaam doorwerkt."}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-block rounded-lg bg-primary px-7 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              Vraag een kennismaking aan
            </Link>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            {cms?.for_whom_heading || "Voor wie zijn onze jaarprogramma's"}
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            {cms?.for_whom_intro || "Dit programma is speciaal ontworpen voor jonge professionals (24+) die:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forWhomItems.map((item, index) => (
              <div
                key={`for-whom-${index}`}
                className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]"
              >
                <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programma detail card */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-primary">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary mb-2">
                {cms?.edition_label || "JAARPROGRAMMA"}
              </p>
              <h3 className="text-4xl font-light text-gray-900 mb-2">
                {cms?.edition_heading || "Young Wise Women Jaarprogramma"}
              </h3>
              <p className="text-gray-600">{cms?.edition_subtitle || "12 maanden persoonlijke en professionele groei met coaching, groepssessies en intensieve trainingen"}</p>
            </div>

            <div className="space-y-5 mb-8 pb-8 border-b border-gray-200">
              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    {cms?.edition_dates || "Start meerdere momenten per jaar"}
                  </p>
                  <p className="text-gray-600">
                    {cms?.edition_duration || "Doorlooptijd: 12 maanden"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    {cms?.edition_location || "Castricum, Friesland & online"}
                  </p>
                  <p className="text-gray-600">{cms?.edition_location_detail || "Combinatie van fysieke bijeenkomsten en online sessies"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    {cms?.edition_audience || "Voor jonge vrouwelijke professionals (24+)"}
                  </p>
                  <p className="text-gray-600">{cms?.edition_availability || "Kleine groepen van 8 tot 12 deelnemers"}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-900 mb-6">
                {cms?.program_heading || "Programma-opbouw per fase"}
              </h4>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    {cms?.phase_detail_1_label || "Fase 1 — Bewustwording (maand 1-4)"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {cms?.phase_detail_1_text || "Intake en Motivation Factor test • Kennismaking met je groep • 1-op-1 coachingsessies • Reflectie op patronen, drijfveren en doelen • Eerste groepssessies met thema's als grenzen en energie"}
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    {cms?.phase_detail_2_label || "Fase 2 — Verdieping (maand 5-8)"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {cms?.phase_detail_2_text || "Verdiepende groepssessies en 1-op-1 coaching • Dag workshop met focus op leiderschap en effectiviteit • Weekend training (intensief) met reflectie, ademwerk en praktische tools • Werken aan beperkende overtuigingen en gedragsverandering"}
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    {cms?.phase_detail_3_label || "Fase 3 — Integratie (maand 9-12)"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {cms?.phase_detail_3_text || "Borging van inzichten in dagelijks leven en werk • Afsluitende coachingsessies • Terugkomdag met de groep • Concreet actieplan voor na het programma • Afsluiting en certificering"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="block w-full text-center rounded-lg bg-primary px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              Neem contact op voor deelname
            </Link>
          </div>
        </div>
      </section>

      {/* Transformatie */}
      <section className="py-14 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-10">
            {cms?.transform_heading || "Jouw Transformatie"}
          </h2>

          <div className="space-y-5">
            <SlideInLeft className="delay-100">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  {cms?.goodbye_heading || "Waar je Afscheid van Neemt"}
                </h3>
                <p className="text-gray-700">
                  {cms?.goodbye_text ||
                    "Je laat het gevoel van vastlopen, constant aanpassen en twijfelen achter je. Na een jaar heb je helder wat je wilt en de tools om ernaar te handelen."}
                </p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-200">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  {cms?.takeaway_heading || "Wat je Meeneemt"}
                </h3>
                <p className="text-gray-700">
                  {cms?.takeaway_text ||
                    "Diepgaand zelfinzicht, sterker leiderschap en een netwerk van gelijkgestemde vrouwen. Je hebt concrete vaardigheden die je dagelijks inzet."}
                </p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-300">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  {cms?.nextstep_heading || "Jouw Volgende Stap"}
                </h3>
                <p className="text-gray-700">
                  {cms?.nextstep_text ||
                    "Je sluit het programma af met een concreet actieplan en de zekerheid dat je groei duurzaam doorzet, ondersteund door je community."}
                </p>
              </div>
            </SlideInLeft>
          </div>
        </div>
      </section>

      <RetreatTestimonialsSection />

      {/* 3-kolom sidebar */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">
              {cms?.sidebar_investment_heading || "Investering"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {sidebarInvestmentItems.map((item, index) => (
                <li key={`sidebar-investment-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">
              {cms?.sidebar_included_heading || "Inclusief"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {sidebarIncludedItems.map((item, index) => (
                <li key={`sidebar-included-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">
              {cms?.sidebar_practical_heading || "Praktisch"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {sidebarPracticalItems.map((item, index) => (
                <li key={`sidebar-practical-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {cms?.cta_heading || "Klaar om te groeien?"}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {cms?.cta_text || "Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek welk programma bij jou past."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              {cms?.cta_button_1 || "Neem contact op"}
            </Link>
            <Link
              to="/kalender#event-kalender"
              className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-[#1C2826] border border-[#1C2826]/30 bg-white transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
            >
              {cms?.cta_button_2 || "Bekijk kalender"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
