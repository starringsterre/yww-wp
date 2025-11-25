import { Plus, Minus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [scrollY, setScrollY] = useState(0);
  const blocksRef = useRef<HTMLDivElement>(null);

  const image1Url =
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F2acad583f0d54543a360b7ba2774caaf?format=webp&width=800";
  const image2Url =
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fa3d9da8a58614d01b654adc4425fe752?format=webp&width=800";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxOffset = (direction: "slower" | "faster" = "slower") => {
    if (!blocksRef.current) return 0;
    const elementTop = blocksRef.current.getBoundingClientRect().top + scrollY;
    const distance = scrollY - elementTop;
    const speed = direction === "slower" ? 0.5 : 1;
    const offset = distance * speed;
    // Limit parallax movement to prevent gaps
    return Math.max(-120, Math.min(120, offset));
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
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Ons Verhaal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hoe zijn we begonnen?
          </p>
        </div>
      </section>


      {/* One Block with Parallax */}
      <section
        ref={blocksRef}
        className="bg-white"
        style={{ padding: "9px 0 0" }}
      >
        <div className="flex flex-col md:flex-row relative">
          {/* Left Column - Text */}
          <div className="w-full md:w-1/2 px-4 md:px-8 flex items-center z-10" style={{ height: "640px", position: "sticky", top: "0" }}>
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-gray-900">
                Ons Verhaal
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Right Column - Image Top */}
          <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center" style={{ minHeight: "140vh" }}>
            <img
              src={image1Url}
              alt="Story Top Right"
              className="w-full object-cover"
              style={{
                height: "120%",
                transform: `translateY(${getParallaxOffset("slower")}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row relative" style={{ margin: "0" }}>
          {/* Left Column - Image Bottom */}
          <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center" style={{ minHeight: "140vh" }}>
            <img
              src={image2Url}
              alt="Story Bottom Left"
              className="w-full object-cover"
              style={{
                height: "120%",
                transform: `translateY(${getParallaxOffset("slower")}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>

          {/* Right Column - Text */}
          <div className="w-full md:w-1/2 px-4 md:px-8 flex items-center z-10" style={{ height: "640px", position: "sticky", top: "0" }}>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
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
