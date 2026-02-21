import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import SlideInLeft from "@/components/SlideInLeft";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";

type WorkshopCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  nextDate: string;
  fromPrice: string;
  duration: string;
  location: string;
  audience: string;
  goal: string;
  program: string[];
  investment: string;
};

export default function OntwikkelingWorkshops() {
  const [workshopSlideIndex, setWorkshopSlideIndex] = useState(0);
  const [workshopsPerView, setWorkshopsPerView] = useState(3);

  const workshopCards: WorkshopCard[] = [
    {
      slug: "female-leadership-workshop",
      title: "Female leadership workshop",
      subtitle: "Workshop van 1 dag",
      description: "1-daagse workshop over leiderschap, positie innemen en zichtbaar groeien.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=1600",
      alt: "Female leadership workshop",
      nextDate: "20 maart 2026",
      fromPrice: "EUR 245",
      duration: "09:30 - 17:00",
      location: "Castricum",
      audience: "Jonge professional vrouwen die steviger willen communiceren en leiden.",
      goal: "Je leert keuzes en positie duidelijker innemen zonder jezelf te verliezen.",
      program: [
        "Persoonlijke leiderschapsstijl en blokkades",
        "Positionering, zichtbaarheid en grenzen",
        "Oefeningen met directe feedback en actieplan",
      ],
      investment: "Vanaf EUR 245 incl. materialen en lunch",
    },
    {
      slug: "workshop-vitaliteit",
      title: "Workshop vitaliteit",
      subtitle: "Workshop van 1 dag",
      description: "Praktische tools voor energie, balans en herstel in je werkweek.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1600",
      alt: "Workshop vitaliteit",
      nextDate: "10 april 2026",
      fromPrice: "EUR 215",
      duration: "09:30 - 17:00",
      location: "Castricum",
      audience: "Jonge professionals die structureel energieverlies of stress ervaren.",
      goal: "Je bouwt een persoonlijk energiesysteem dat werkt in een drukke werkweek.",
      program: [
        "Energiemanagement en stresssignalen herkennen",
        "Focusblokken, herstelmomenten en grenzen",
        "Praktische weekroutine voor duurzame vitaliteit",
      ],
      investment: "Vanaf EUR 215 incl. materialen en lunch",
    },
    {
      slug: "workshop-mentale-weerbaarheid",
      title: "Workshop mentale weerbaarheid",
      subtitle: "Workshop van 1 dag",
      description: "Werk aan focus, grenzen en veerkracht in uitdagende situaties.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1600",
      alt: "Workshop mentale weerbaarheid",
      nextDate: "24 april 2026",
      fromPrice: "EUR 225",
      duration: "09:30 - 17:00",
      location: "Castricum",
      audience: "Vrouwen die mentaal sterker willen reageren op druk, twijfel en verandering.",
      goal: "Je traint veerkracht, focus en regie in situaties met hoge werkdruk.",
      program: [
        "Mentale patronen en stressreacties doorbreken",
        "Grenzen stellen en stevig communiceren",
        "Persoonlijk weerbaarheidsplan voor werk en thuis",
      ],
      investment: "Vanaf EUR 225 incl. materialen en lunch",
    },
    {
      slug: "workshop-persoonlijke-effectiviteit",
      title: "Workshop persoonlijke effectiviteit",
      subtitle: "Workshop van 1 dag",
      description: "Leer prioriteren, helder communiceren en gerichter keuzes maken in je werk.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=1600",
      alt: "Workshop persoonlijke effectiviteit",
      nextDate: "8 mei 2026",
      fromPrice: "EUR 235",
      duration: "09:30 - 17:00",
      location: "Castricum",
      audience: "Professionals die slimmer willen prioriteren en consistenter willen handelen.",
      goal: "Je vergroot impact door keuzes, tijd en communicatie beter te sturen.",
      program: [
        "Prioriteiten stellen op basis van impact",
        "Grenzen en communicatie in samenwerking",
        "Concreet werkritme met focus en opvolging",
      ],
      investment: "Vanaf EUR 235 incl. materialen en lunch",
    },
  ];

  useEffect(() => {
    const pageTitle = "Dag Workshops voor Jonge Vrouwen | Young Wise Women";
    const pageDescription =
      "Praktische dag workshops voor jonge professionals: female leadership, vitaliteit en mentale weerbaarheid met direct toepasbare tools.";
    const canonicalPath = "/groepstrainingen/ontwikkeling-workshops";

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

    const scriptId = "dag-workshops-events-jsonld";
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
          "Praktische dag workshop voor jonge professional vrouwen met direct toepasbare tools.",
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

  const maxWorkshopSlideIndex = Math.max(0, workshopCards.length - workshopsPerView);
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
        title="Dag workshops"
        subtitle="Praktische groepsworkshops voor jonge professionals die willen groeien in focus, energie en leiderschap."
      />

      <section id="dag-workshops" className="min-h-screen py-6 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#B46555]/25 p-5 md:p-6">
            <div className="text-center mb-5">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">Dag Workshops</h2>
              <span className="block h-0.5 w-24 mx-auto bg-[#6B705C]" />
            </div>

            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${workshopSlideIndex} * ((100% - ${(workshopsPerView - 1) * 20}px) / ${workshopsPerView} + 20px)))`,
                }}
              >
                {workshopCards.map((card) => (
                  <article
                    key={card.slug}
                    className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shrink-0"
                    style={{
                      flex: `0 0 calc((100% - ${(workshopsPerView - 1) * 20}px) / ${workshopsPerView})`,
                    }}
                  >
                    <a href={`#${card.slug}`} className="block h-32 md:h-36 bg-gray-200 overflow-hidden">
                      <img loading="lazy"
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                    <div className="p-3">
                      <a href={`#${card.slug}`} className="mb-1.5 inline-flex flex-wrap gap-x-1.5 gap-y-1 text-base md:text-lg font-light text-gray-900">
                        {card.title.split(" ").map((word, index, words) => {
                          const isLastWord = index === words.length - 1;
                          return (
                            <span
                              key={`${card.slug}-${word}-${index}`}
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
                ))}
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
            Jouw Transformatie
          </h2>

          <div className="space-y-5">
            <SlideInLeft className="delay-100">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Waar je Afscheid van Neemt</h3>
                <p className="text-gray-700">Je laat overbelasting, twijfel en continue aanpassing los, zodat je met meer rust en focus keuzes maakt.</p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-200">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Wat je Meeneemt</h3>
                <p className="text-gray-700">Praktische handvatten, meer energie en heldere prioriteiten die je direct toepast in werk en dagelijks leven.</p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-300">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Jouw Volgende Stap</h3>
                <p className="text-gray-700">Je gaat naar huis met een concreet actieplan, zodat je ontwikkeling na de workshop direct doorloopt.</p>
              </div>
            </SlideInLeft>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">Voor wie zijn onze workshops</h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Deze workshops zijn speciaal ontworpen voor jonge professionals (24+) die:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">✓ Op zoek zijn naar meer betekenis in werk en leven</p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">✓ Praktische tools zoeken voor focus, rust en richting</p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">✓ Willen groeien met steun van een groep gelijkgestemde vrouwen</p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">✓ Persoonlijke groei en ontwikkeling willen ervaren</p>
            </div>
          </div>
        </div>
      </section>

      <RetreatTestimonialsSection />

      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">Wat je krijgt</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Praktische handvatten die direct toepasbaar zijn</li>
              <li>✓ Persoonlijke reflectie-oefeningen en werkmateriaal</li>
              <li>✓ Feedback van coaches en de groep</li>
              <li>✓ Concreet actieplan voor de weken erna</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">Praktisch</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Tijd: 09:30 - 17:00</li>
              <li>✓ Locatie: Castricum</li>
              <li>✓ Groepsgrootte: 10 tot 14 deelnemers</li>
              <li>✓ Inclusief lunch, koffie, thee en werkmateriaal</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h3 className="text-xl font-light text-gray-900 mb-3">Voor wie niet</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Als je alleen theorie wilt zonder oefenen</li>
              <li>• Als je geen ruimte hebt om te reflecteren</li>
              <li>• Als je nu geen concrete verandering wilt maken</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto space-y-6">
          {workshopCards.map((card) => (
            <article id={card.slug} key={card.slug} className="rounded-2xl border border-gray-200 bg-[#B46555]/10 p-6 md:p-8 scroll-mt-28">
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
                      <li key={`${card.slug}-${item}`}>✓ {item}</li>
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
          ))}
        </div>
      </section>
    </div>
  );
}
