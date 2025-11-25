import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function Contact() {
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
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Contact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heb je vragen? We helpen je graag verder!
          </p>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "#b7b7a4" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-white mb-12">
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
