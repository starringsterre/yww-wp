import { useEffect, useState } from "react";
import { Brain, Wind, Lightbulb, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SlideInLeft from "@/components/SlideInLeft";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";

export default function Weekenden() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);
  const [workshopsPerView, setWorkshopsPerView] = useState(3);

  useEffect(() => {
    const pageTitle = "Weekend Training voor Jonge Vrouwen | Young Wise Women";
    const pageDescription =
      "Meerdaagse weekend training in Friesland voor jonge professional vrouwen. Werk aan rust, richting en duurzame persoonlijke groei met 2 coaches.";
    const canonicalPath = "/persoonlijke-ontwikkeling-weekend-training";

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

    const scriptId = "weekend-training-event-jsonld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const jsonLdScript = document.createElement("script");
    jsonLdScript.id = scriptId;
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Weekend Training Young Wise Women",
      description:
        "Weekend training voor jonge professional vrouwen met coaching, reflectie en praktische tools.",
      startDate: "2026-06-12T17:30:00+02:00",
      endDate: "2026-06-14T16:00:00+02:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1600",
      ],
      location: {
        "@type": "Place",
        name: "Weekendlocatie Young Wise Women",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Friesland",
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
        price: "895",
        availability: "https://schema.org/InStock",
        url: `${window.location.origin}${canonicalPath}`,
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

  const gridImages = [
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa07f32a91d3a47298e9d8f93c1ee532c?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F83bc1cad84b64bc5bf179476a883178b?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F1a42d8ce7d884dd285837d12b0b1ffb7?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0454f106b58340f2b1d9e58f52316087?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6420ed9ac504161856d9dcfebc9cb02?format=webp&width=4000",
  ];

  const allSlideImages = [
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa07f32a91d3a47298e9d8f93c1ee532c?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F83bc1cad84b64bc5bf179476a883178b?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F1a42d8ce7d884dd285837d12b0b1ffb7?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0454f106b58340f2b1d9e58f52316087?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6420ed9ac504161856d9dcfebc9cb02?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7b95dc37c38247c9813a6ee7bdb6b379?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc5b0ea28095644428588e919756c54d3?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc7cc8ba9f6254992a285f2c2da8c5eff?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F01831c908a8e41a19470362823c26a2c?format=webp&width=4000",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F4cd163954f0c4a93bbdb5aa941a0d225?format=webp&width=4000",
  ];

  const openModal = (imageIndex: number) => {
    setModalSlideIndex(imageIndex);
    setModalOpen(true);
  };

  const nextSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex + 1) % allSlideImages.length);
  };

  const prevSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex - 1 + allSlideImages.length) % allSlideImages.length);
  };

  const weekendProgramCards = [
    {
      title: "Dag 1 vrijdag",
      subtitle: "Programma",
      description: "Aankomst, kennismaking, intake-inzichten uit je Motivation Factor test en een rustige avond met reflectie.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1600",
      alt: "Dag 1 vrijdag",
    },
    {
      title: "Dag 2 zaterdag",
      subtitle: "Programma",
      description: "Verdieping op verlangens en blokkades, met groepssessies, 1-op-1 coaching en alle maaltijden verzorgd.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=1600",
      alt: "Dag 2 zaterdag",
    },
    {
      title: "Dag 3 zondag",
      subtitle: "Programma",
      description: "Integratie en afronding met praktische tools en werkboek; je vertrekt met richting, rust en focus.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=1600",
      alt: "Dag 3 zondag",
    },
  ];

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

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg"
        headingTag="h2"
        title="Weekend trainingen"
        subtitle="Meerdaagse training voor jonge vrouwen die willen vertragen, verdiepen en duurzaam groeien."
      />

      <section className="py-10 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#B46555]/25 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
                  Weekend Training in Friesland voor jonge vrouwen
                </h1>
                <p className="text-gray-700 mb-5 max-w-2xl">
                  Een intensief en kleinschalig weekend waarin je met professionele begeleiding werkt aan rust, richting en duurzame persoonlijke ontwikkeling.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
                    className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
                  >
                    Bekijk data & beschikbaarheid
                  </Link>
                  <Link
                    to="/ons-verhaal"
                    className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium text-[#1C2826] border border-[#1C2826]/30 bg-white transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
                  >
                    Stel je vraag
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-[#1C2826]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-3">Kerninformatie</p>
                <ul className="space-y-1.5 text-sm text-gray-800">
                  <li><strong>Wanneer:</strong> Vrijdag 17:30 t/m zondag 16:00</li>
                  <li><strong>Waar:</strong> Vakantiehuis in de natuur, Friesland</li>
                  <li><strong>Voor wie:</strong> Jonge professional vrouwen (24+)</li>
                  <li><strong>Inclusief:</strong> Intake, test, begeleiding, verblijf, maaltijden</li>
                  <li><strong>Investering:</strong> vanaf EUR 895</li>
                  <li><strong>Plekken:</strong> maximaal 8 deelnemers</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="rounded-xl bg-white p-4 border border-[#1C2826]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Korte review</p>
                <p className="text-sm text-gray-800">"Ik ging naar huis met rust, focus en concrete keuzes."</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-[#1C2826]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Groepsgrootte</p>
                <p className="text-lg font-semibold text-gray-900">8 plekken</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-[#1C2826]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Begeleiding</p>
                <p className="text-lg font-semibold text-gray-900">2 coaches</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-[#1C2826]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Extra waarde</p>
                <p className="text-lg font-semibold text-gray-900">Motivation Factor test</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="drie-pijlers" className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#B8B7A3" }}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              De Drie Pijlers van de Weekend Training
            </h2>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              Het fundament van onze weekend trainingen rust op drie kernpijlers die samen zorgen voor een diepgaande transformatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Brain size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Reflectie
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                De ideale omgeving voor reflectie op je persoonlijke doelen, je patronen, je (betekenvolle) werk en je eigen energiehuishouding. Met behulp van een werkboek en trainingen gaan we diep in op wat je echt wilt en wat je tegenhoudt.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Wind size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Rust & Ruimte
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ervaar de rust en ruimte op een prachtige locatie in een vakantiehuis in Friesland, samen met een groep gelijkgestemde jonge professionals (24+). Alles is voor je geregeld, zodat je je volledig op jezelf en de groep kunt concentreren.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Lightbulb size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Inspiratie & Nieuwe Tools
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Een intensieve weekend training waarin je een nieuwe kijk op jezelf krijgt, je ervaringen en inzichten deelt, en praktische tools krijgt aangereikt voor nu en je toekomst.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
              className="inline-block px-8 py-3 rounded-lg font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              Bekijk data & beschikbaarheid
            </Link>
          </div>
        </div>
      </section>

      {/* Training Photo Gallery */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Beleef de Weekend Training
            </h2>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              Een blik op de ervaring van vorige edities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gridImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openModal(index)}
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <img loading="lazy"
                  src={image}
                  alt={`Training moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={index === 7 ? { transform: "rotate(90deg)" } : {}}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              aria-label="Close gallery"
            >
              <X size={28} className="text-gray-900" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img loading="lazy"
                src={allSlideImages[modalSlideIndex]}
                alt={`Training foto ${modalSlideIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={modalSlideIndex === 7 ? { transform: "rotate(90deg)" } : {}}
              />

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} className="text-gray-900" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Next photo"
              >
                <ChevronRight size={32} className="text-gray-900" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {modalSlideIndex + 1} / {allSlideImages.length}
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-md">
                {allSlideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setModalSlideIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === modalSlideIndex ? "w-6 bg-white" : "w-2 bg-gray-400 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* For Whom */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            Voor wie zijn onze trainingen
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Dit programma is speciaal ontworpen voor jonge professionals (24+) die:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                ✓ Op zoek zijn naar meer betekenis in hun werk en leven
              </p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                ✓ Ruimte nodig hebben om stil te staan bij hun doelen en praktische tools zoeken voor hun leven en werk
              </p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                ✓ Willen groeien met steun van een groep gelijkgestemde vrouwen
              </p>
            </div>
            <div className="group p-6 rounded-lg border border-gray-200 bg-[rgba(184,183,163,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#B46555] hover:bg-[#B46555]">
              <p className="text-gray-700 transition-colors duration-300 group-hover:text-white">
                ✓ Persoonlijke groei en ontwikkeling willen ervaren
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Experience */}
      <section className="py-14 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-10">
            Jouw Transformatie
          </h2>

          <div className="space-y-5">
            <SlideInLeft className="delay-100">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  Waar je Afscheid van Neemt
                </h3>
                <p className="text-gray-700 mb-2">
                  Zeg vaarwel aan je 'please-gedrag' - jezelf voortdurend aanpassen en moeten voldoen aan standaarden en verwachtingen.
                </p>
                <p className="text-gray-700">
                  Neem afscheid van bullshitbanen, FOMO en de kans op een burnout.
                </p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-200">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  Wat je Meeneemt
                </h3>
                <p className="text-gray-700 mb-2">
                  Persoonlijke groei - of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling.
                </p>
                <p className="text-gray-700 mb-2">
                  Eigen wijsheid - de andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen.
                </p>
                <p className="text-gray-700">
                  Nieuwe energie en motivatie - thema's die al langer in je leven spelen, worden helderder. Je voelt richting, duidelijkheid én de drive om in beweging te komen.
                </p>
              </div>
            </SlideInLeft>

            <SlideInLeft className="delay-300">
              <div className="group relative border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#B46555]">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  Jouw Volgende Stap
                </h3>
                <p className="text-gray-700">
                  Kies nu voor betekenisvol, vitaal en gelukkig leven en werken en word die geweldige vrouw die je bedoeld bent te zijn. Niet door harder te werken of te doen wat anderen doen, maar je eigen unieke koers te volgen en bewuste keuzes te maken.
                </p>
              </div>
            </SlideInLeft>
          </div>
        </div>
      </section>

      {/* Location Hero */}
      <section
        className="relative py-32 px-4 md:px-8 flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28, 40, 38, 0.2), rgba(28, 40, 38, 0.2)), url('https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F581f5321cf7147a6a311aa331c6cbdf2?format=webp&width=2000')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
            Op een inspirerende locatie in Nederland
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mx-auto">
            Veel van onze weekend trainingen vinden plaats in het prachtige Friesland
          </p>
        </div>
      </section>

      <RetreatTestimonialsSection />

      <section id="weekend-adem-yoga" className="py-14 px-4 md:px-8 bg-[#FBF9F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-3">
              De balans tussen denken en voelen
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              In het weekend combineren we mentale verdieping met lichaamswerk, zodat je niet alleen begrijpt wat je wilt veranderen, maar het ook echt voelt en belichaamt.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img loading="lazy"
                  src="/ademwerk.png"
                  alt="Ademsessie breathwork tijdens weekendintensive"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  Ademsessie (breathwork)
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Begeleid door Chris Rauwendaal, specialist in ademwerk voor stressregulatie en emotionele ontlading.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Meer rust in je hoofd en zenuwstelsel</li>
                  <li>✓ Sneller herkennen van spanning en patronen</li>
                  <li>✓ Direct toepasbare ademtools voor dagelijks leven</li>
                </ul>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img loading="lazy"
                  src="/yoga-weekend-persoonlijke-ontwikkeling.png"
                  alt="Yogasessie tijdens weekendintensive"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: "center 78%" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  Yogalessen
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Gegeven door Liene Molendijk, coach met expertise in psychologie, leiderschap en lichaamsgerichte ontwikkeling.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Van overdenken naar aanwezig zijn in je lichaam</li>
                  <li>✓ Meer focus, zachtheid en zelfregie</li>
                  <li>✓ Een stevigere verbinding met je authenticiteit</li>
                </ul>
              </div>
            </article>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
              className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              Bekijk weekendintensive
            </Link>
          </div>
        </div>
      </section>

      {/* Weekend Training Highlight */}
      <section className="min-h-screen py-6 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#B46555]/25 p-5 md:p-6">
            <div className="text-center mb-5">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                Weekend Trainingen
              </h2>
              <span className="block h-0.5 w-24 mx-auto bg-[#6B705C]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 items-start">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Wanneer</p>
                  <p className="text-xs md:text-sm text-gray-800">Op vrijdag vanaf 17:30 tot zondag 16:00</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Waar</p>
                  <p className="text-xs md:text-sm text-gray-800">Prachtige Vakantiehuis in de Natuur aan het water</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1">Voor wie</p>
                  <p className="text-xs md:text-sm text-gray-800">Voor Jonge Professional Vrouwen (24-30)</p>
                  <p className="text-xs md:text-sm text-gray-700">Beperkt plek voor 8 vrouwen</p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-2">Inclusief</p>
                <ul className="space-y-1 text-xs md:text-sm text-gray-700">
                  <li>✓ Voorafgaande online intake met coach</li>
                  <li>✓ Motivation Factor test (t.w.v. €145)</li>
                  <li>✓ Professionele begeleiding van 2 coaches</li>
                  <li>✓ Ademsessie (breathwork) met Chris Rauwendaal</li>
                  <li>✓ Yogalessen</li>
                  <li>✓ 2 nachten accommodatie</li>
                  <li>✓ Alle maaltijden en dranken</li>
                  <li>✓ Werkboek en praktische tools</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-light text-gray-900 mb-4 text-center">
              Programma: Persoonlijke groei & authenticiteit
            </h3>

            <div className="overflow-x-auto">
              <div
                className="flex gap-5"
              >
                {weekendProgramCards.map((card) => (
                  <article
                    key={card.title}
                    className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shrink-0"
                    style={{
                      flex: `0 0 calc((100% - ${(workshopsPerView - 1) * 20}px) / ${workshopsPerView})`,
                    }}
                  >
                    <div className="h-32 md:h-36 bg-gray-200">
                      <img loading="lazy"
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="mb-1.5 flex flex-wrap gap-x-1.5 gap-y-1 text-base md:text-lg font-light text-gray-900">
                        {card.title.split(" ").map((word, index, words) => {
                          const isLastWord = index === words.length - 1;
                          return (
                            <span
                              key={`${card.title}-${word}-${index}`}
                              className={`relative inline-flex w-fit origin-left after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#B46555] after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${
                                isLastWord ? "after:w-full" : "after:w-[calc(100%+0.5rem)]"
                              }`}
                            >
                              {word}
                            </span>
                          );
                        })}
                      </h3>
                      <p className="text-[11px] text-gray-500 mb-1.5">{card.subtitle}</p>
                      <p className="text-[11px] md:text-xs text-gray-700">{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 text-center">
              <Link
                to="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026"
                className="inline-block px-7 py-2.5 rounded-lg text-sm font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                Reserveer je plek
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
