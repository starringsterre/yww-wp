import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

import { testimonials } from "@/lib/testimonials";

export default function Retreats() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

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
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            De Drie Pijlers van het Retreat
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                1. Reflectie
              </h3>
              <p className="text-gray-700 mb-3">
                De ideale omgeving voor reflectie op je persoonlijke doelen, je patronen, je (betekenvolle) werk en je eigen energiehuishouding. Met behulp van een werkboek en trainingen gaan we diep in op wat je echt wilt en wat je tegenhoudt.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                2. Rust & Ruimte
              </h3>
              <p className="text-gray-700 mb-3">
                Ervaar de rust en ruimte op een prachtige locatie in een vakantiehuis in Friesland, samen met een groep gelijkgestemde jonge professionals (24+). Alles is voor je geregeld, zodat je je volledig op jezelf en de groep kunt concentreren.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                3. Inspiratie & Nieuwe Tools
              </h3>
              <p className="text-gray-700 mb-3">
                Een weekend (re)treat waarin je een nieuwe kijk op jezelf krijgt, je ervaringen en inzichten deelt, en nieuwe praktische tools krijgt aangereikt voor nu en je toekomst als bevordering voor jou als young professional in je carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

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
