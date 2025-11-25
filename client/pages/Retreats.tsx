import { useState } from "react";
import { Plus, Minus, Brain, Wind, Lightbulb, ChevronLeft, ChevronRight, X } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

import { testimonials } from "@/lib/testimonials";

export default function Retreats() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  const gridImages = [
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa07f32a91d3a47298e9d8f93c1ee532c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F83bc1cad84b64bc5bf179476a883178b?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F1a42d8ce7d884dd285837d12b0b1ffb7?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0454f106b58340f2b1d9e58f52316087?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6420ed9ac504161856d9dcfebc9cb02?format=webp&width=800",
  ];

  const allSlideImages = [
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe595860bbcf54834ad2cb6761d7f4bb8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7a71bde85c8a499ea2bd4af0b6755fc4?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa07f32a91d3a47298e9d8f93c1ee532c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F83bc1cad84b64bc5bf179476a883178b?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0c9c89796f6a451cad25ef33b9bfd178?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F1a42d8ce7d884dd285837d12b0b1ffb7?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F0454f106b58340f2b1d9e58f52316087?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6420ed9ac504161856d9dcfebc9cb02?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7b95dc37c38247c9813a6ee7bdb6b379?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc5b0ea28095644428588e919756c54d3?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc7cc8ba9f6254992a285f2c2da8c5eff?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F01831c908a8e41a19470362823c26a2c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F4cd163954f0c4a93bbdb5aa941a0d225?format=webp&width=800",
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

  const faqs = [
    {
      question: "Kan ik me nog aanmelden als ik de deadline gemist heb?",
      answer: "Ja, dat kan! Neem contact met ons op via e-mail of telefoon. We helpen je graag verder en kijken naar mogelijkheden.",
    },
    {
      question: "Is er een betalingsplan mogelijk?",
      answer: "Ja, voor particulieren is betaling in 3 termijnen mogelijk. Neem contact op voor meer informatie over de betalingsopties.",
    },
    {
      question: "Organiseren jullie ook groepsretreats?",
      answer: "Ja, groepsretreats zijn mogelijk op aanvraag. Dit kan heel interessant zijn voor teams of groepen. Laat het ons weten en we bespreken de mogelijkheden!",
    },
    {
      question: "Wat als ik niet kan op de geplande datum?",
      answer: "Schrijf je in voor de nieuwsbrief zodat je op de hoogte bent van volgende edities. We organiseren regelmatig nieuwe retreats.",
    },
    {
      question: "Hoe voorberei ik me voor op het retreat?",
      answer: "Na je inschrijving krijg je alle informatie en ontvang je een persoonlijke intake met een van onze coaches. Dit helpt ons om het retreat perfect op jou af te stemmen.",
    },
  ];
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Onze Retreats
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek wat Young Wise Women betekent en wat ons drijft
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "#b7b7a4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              De Drie Pijlers van het Retreat
            </h2>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              Het fundament van onze retreats rust op drie kernpijlers die samen zorgen voor een diepgaande transformatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Brain size={32} style={{ color: "rgb(152, 139, 129)" }} />
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
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Wind size={32} style={{ color: "rgb(152, 139, 129)" }} />
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
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Lightbulb size={32} style={{ color: "rgb(152, 139, 129)" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Inspiratie & Nieuwe Tools
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Een weekend (re)treat waarin je een nieuwe kijk op jezelf krijgt, je ervaringen en inzichten deelt, en nieuwe praktische tools krijgt aangereikt voor nu en je toekomst als bevordering voor jou als young professional in je carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retreat Photo Gallery */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Beleef het Retreat
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
                <img
                  src={image}
                  alt={`Retreat moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
              <img
                src={allSlideImages[modalSlideIndex]}
                alt={`Retreat photo ${modalSlideIndex + 1}`}
                className="max-w-full max-h-full object-contain"
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

      {/* What You Experience */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            Jouw Transformatie
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
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

            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
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

            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-3">
                Jouw Volgende Stap
              </h3>
              <p className="text-gray-700">
                Kies nu voor betekenisvol, vitaal en gelukkig leven en werken en word die geweldige vrouw die je bedoeld bent te zijn. Niet door harder te werken of te doen wat anderen doen, maar je eigen unieke koers te volgen en bewuste keuzes te maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            Voor Wie is dit Retreat
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Dit retreat is speciaal ontworpen voor jonge professionals (24+) die:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Op zoek zijn naar meer betekenis in hun werk en leven
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Ruimte nodig hebben om stil te staan bij hun doelen
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Willen groeien met steun van een groep gelijkgestemde vrouwen
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Hun carrière opnieuw willen definiëren
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Praktische tools zoeken voor hun leven en werk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Stemmen van Deelneemsters
          </h2>

          <div className="max-w-4xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-8" style={{ backgroundColor: "#b7b7a4", padding: "0 32px 80px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-white mb-12" style={{ paddingTop: "40px" }}>
            Veelgestelde Vragen
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center gap-4 transition-colors text-left group"
                >
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <Minus
                        className="w-5 h-5"
                        style={{ color: "#98a481" }}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5"
                        style={{ color: "#98a481" }}
                      />
                    )}
                  </div>
                  <h3
                    className="text-base font-medium transition-colors cursor-pointer"
                    style={{
                      color: expandedFaq === index ? "#5a6d4f" : "rgb(0, 0, 0)"
                    }}
                    onMouseEnter={(e) => {
                      if (expandedFaq !== index) {
                        e.currentTarget.style.color = "#5a6d4f";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedFaq !== index) {
                        e.currentTarget.style.color = "rgb(0, 0, 0)";
                      }
                    }}
                  >
                    {faq.question}
                  </h3>
                </button>

                {expandedFaq === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
