import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import SlideInLeft from "@/components/SlideInLeft";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";
import { usePageContent } from "@/hooks/usePageContent";
import { useWorkshops } from "@/hooks/useWorkshops";

const workshopCardImages = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=1600",
    alt: "Female leadership workshop",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1600",
    alt: "Workshop vitaliteit",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1600",
    alt: "Workshop mentale weerbaarheid",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=1600",
    alt: "Workshop persoonlijke effectiviteit",
  },
];

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function LosseWorkshops() {
  const { data: cms } = usePageContent("losse-workshops");
  const { data: workshopData } = useWorkshops();

  const [workshopSlideIndex, setWorkshopSlideIndex] = useState(0);
  const [workshopsPerView, setWorkshopsPerView] = useState(3);

  const workshops = workshopData || [];

  const forWhomItems: string[] = cms?.for_whom_items
    ? cms.for_whom_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Snel en gericht willen werken aan een specifiek thema",
        "✓ Praktische tools zoeken die direct toepasbaar zijn",
        "✓ Een dag willen investeren in persoonlijke groei",
        "✓ Willen groeien met steun van een groep gelijkgestemde vrouwen",
      ];

  const sidebarWhatItems: string[] = cms?.sidebar_what_items
    ? cms.sidebar_what_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Praktische handvatten die direct toepasbaar zijn",
        "✓ Persoonlijke reflectie-oefeningen en werkmateriaal",
        "✓ Feedback van coaches en de groep",
        "✓ Concreet actieplan voor de weken erna",
      ];

  const sidebarPracticalItems: string[] = cms?.sidebar_practical_items
    ? cms.sidebar_practical_items.split("\n").filter((s: string) => s.trim())
    : [
        "✓ Tijd: 09:30 - 17:00",
        "✓ Locatie: Castricum",
        "✓ Groepsgrootte: 10 tot 14 deelnemers",
        "✓ Inclusief lunch, koffie, thee en werkmateriaal",
      ];

  const sidebarNotForItems: string[] = cms?.sidebar_not_for_items
    ? cms.sidebar_not_for_items.split("\n").filter((s: string) => s.trim())
    : [
        "• Als je alleen theorie wilt zonder oefenen",
        "• Als je geen ruimte hebt om te reflecteren",
        "• Als je nu geen concrete verandering wilt maken",
      ];

  useEffect(() => {
    const pageTitle = "Losse Workshops voor Jonge Vrouwen | Young Wise Women";
    const pageDescription =
      "Losse dag workshops voor jonge professionals: female leadership, vitaliteit en mentale weerbaarheid met direct toepasbare tools.";
    const canonicalPath = "/groepstrainingen/losse-workshops";

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

    const scriptId = "losse-workshops-events-jsonld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const events = [
      {
        name: "Female leadership workshop",
        startDate: "2026-03-20T09:30:00+01:00",
        endDate: "2026-03-20T17:00:00+01:00",
        price: "245",
      },
      {
        name: "Workshop vitaliteit",
        startDate: "2026-04-10T09:30:00+02:00",
        endDate: "2026-04-10T17:00:00+02:00",
        price: "215",
      },
      {
        name: "Workshop mentale weerbaarheid",
        startDate: "2026-04-24T09:30:00+02:00",
        endDate: "2026-04-24T17:00:00+02:00",
        price: "225",
      },
      {
        name: "Workshop persoonlijke effectiviteit",
        startDate: "2026-05-08T09:30:00+02:00",
        endDate: "2026-05-08T17:00:00+02:00",
        price: "235",
      },
    ];

    const jsonLdScript = document.createElement("script");
    jsonLdScript.id = scriptId;
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": events.map((event) => ({
        "@type": "Event",
        name: event.name,
        description:
          "Losse dag workshop voor jonge professional vrouwen met direct toepasbare tools.",
        startDate: event.startDate,
        endDate: event.endDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Young Wise Women Trainingslocatie",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Castricum",
            addressCountry: "NL",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Young Wise Women",
          url: window.location.origin,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: event.price,
          availability: "https://schema.org/InStock",
          url: `${window.location.origin}${canonicalPath}`,
        },
      })),
    });
    document.head.appendChild(jsonLdScript);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setWorkshopsPerView(1);
        return;
      }
      if (window.innerWidth < 1024) {
        setWorkshopsPerView(2);
        return;
      }
      setWorkshopsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxWorkshopSlideIndex = Math.max(0, workshops.length - workshopsPerView);
  const workshopPages = maxWorkshopSlideIndex + 1;

  useEffect(() => {
    setWorkshopSlideIndex((prev) => Math.min(prev, maxWorkshopSlideIndex));
  }, [maxWorkshopSlideIndex]);

  const nextWorkshopSlide = () => {
    setWorkshopSlideIndex((prev) => Math.min(prev + 1, maxWorkshopSlideIndex));
  };

  const prevWorkshopSlide = () => {
    setWorkshopSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/workshop-persoonlijke-ontwikkeling.jpg"
        title={cms?.hero_title || "Losse workshops"}
        subtitle={
          cms?.hero_subtitle ||
          "Flexibele dag workshops voor jonge professionals die gericht willen werken aan een specifiek thema."
        }
      />

      <section id="losse-workshops" className="min-h-screen py-6 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#B46555]/25 p-5 md:p-6">
            <div className="text-center mb-5">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">Losse Workshops</h2>
              <span className="block h-0.5 w-24 mx-auto bg-[#6B705C]" />
            </div>

            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${workshopSlideIndex} * ((100% - ${(workshopsPerView - 1) * 20}px) / ${workshopsPerView} + 20px)))`,
                }}
              >
                {workshops.map((card, index) => {
                  const slug = titleToSlug(card.title);
                  const imgData = workshopCardImages[index] ?? {
                    image: "",
                    alt: card.title,
                  };
                  return (
                    <article
                      key={slug}
                      className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shrink-0"
                      style={{
                        flex: `0 0 calc((100% - ${(workshopsPerView - 1) * 20}px) / ${workshopsPerView})`,
                      }}
                    >
                      <a href={`#${slug}`} className="block h-32 md:h-36 bg-gray-200 overflow-hidden">
                        <img
                          loading="lazy"
                          src={imgData.image}
                          alt={imgData.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                      <div className="p-3">
                        <a href={`#${slug}`} className="mb-1.5 inline-flex flex-wrap gap-x-1.5 gap-y-1 text-base md:text-lg font-light text-gray-900">
                          {card.title.split(" ").map((word, wordIndex, words) => {
                            const isLastWord = wordIndex === words.length - 1;
                            return (
                              <span
                                key={`${slug}-${word}-${wordIndex}`}
                                className={`relative inline-flex w-fit origin-left after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#B46555] after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${
                                  isLastWord ? "after:w-full" : "after:w-[calc(100%+0.5rem)]"
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </a>
                        <p className="text-[11px] text-gray-500 mb-1.5">{card.subtitle}</p>
                        <p className="text-[11px] md:text-xs text-gray-700 mb-2">{card.description}</p>
                        <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-700">
                          <span>{card.nextDate}</span>
                          <span className="font-medium text-gray-900">vanaf {card.fromPrice}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {Array.from({ length: workshopPages }).map((_, index) => (
                <button
                  key={`workshop-dot-${index}`}
                  type="button"
                  onClick={() => setWorkshopSlideIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    workshopSlideIndex === index ? "w-5 bg-[#1C2826]" : "w-2 bg-[#1C2826]/35"
                  }`}
                  aria-label={`Ga naar workshop pagina ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={prevWorkshopSlide}
                disabled={workshopSlideIndex === 0}
                className="w-10 h-10 rounded-full border border-[#1C2826]/35 text-[#1C2826] flex items-center justify-center transition-colors disabled:opacity-40"
                aria-label="Vorige workshops"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextWorkshopSlide}
                disabled={workshopSlideIndex >= maxWorkshopSlideIndex}
                className="w-10 h-10 rounded-full border border-[#1C2826] text-[#1C2826] flex items-center justify-center transition-colors disabled:opacity-40"
                aria-label="Volgende workshops"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/kalender#event-kalender"
                className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                Bekijk kalender
              </Link>
              <Link
                to="/ons-verhaal"
                className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-[#1C2826] border border-[#1C2826]/30 bg-white transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
              >
                Neem contact op voor plek
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                    "Je laat twijfel, uitstelgedrag en het gevoel van 'moet ik nog meer?' los, zodat je met meer rust en focus keuzes maakt."}
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
                    "Praktische handvatten, meer energie en heldere prioriteiten die je direct toepast in werk en dagelijks leven."}
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
                    "Je gaat naar huis met een concreet actieplan, zodat je ontwikkeling na de workshop direct doorloopt."}
                </p>
              </div>
            </SlideInLeft>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            {cms?.for_whom_heading || "Voor wie zijn onze workshops"}
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            {cms?.for_whom_intro || "Deze losse workshops zijn ideaal voor jonge professionals (24+) die:"}
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

      <RetreatTestimonialsSection />

      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">
              {cms?.sidebar_what_heading || "Wat je krijgt"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {sidebarWhatItems.map((item, index) => (
                <li key={`sidebar-what-${index}`}>{item}</li>
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
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">
              {cms?.sidebar_not_for_heading || "Voor wie niet"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {sidebarNotForItems.map((item, index) => (
                <li key={`sidebar-not-for-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto space-y-6">
          {workshops.map((card) => {
            const slug = titleToSlug(card.title);
            return (
              <article id={slug} key={slug} className="rounded-2xl border border-gray-200 bg-[#B46555]/10 p-6 md:p-8 scroll-mt-28">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900">{card.title}</h3>
                  <span className="text-sm font-medium text-gray-900">vanaf {card.fromPrice}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Doel</p>
                    <p className="text-sm text-gray-800 mb-3">{card.goal}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Voor wie</p>
                    <p className="text-sm text-gray-800 mb-3">{card.audience}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Programma onderdelen</p>
                    <ul className="space-y-1 text-sm text-gray-800">
                      {card.program.map((item) => (
                        <li key={`${slug}-${item}`}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Duur</p>
                    <p className="text-sm text-gray-800 mb-3">{card.duration}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Investering</p>
                    <p className="text-sm text-gray-800 mb-3">{card.investment}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Locatie</p>
                    <p className="text-sm text-gray-800 mb-3">{card.location}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Eerstvolgende datum</p>
                    <p className="text-sm text-gray-800 mb-4">{card.nextDate}</p>
                    <Link
                      to="/kalender#event-kalender"
                      className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
                    >
                      Meld je aan
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
