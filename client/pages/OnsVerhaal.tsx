import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

const image1Url =
  "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fcf6849fa4e1a4b76b17b1abaac301ee1?format=webp&width=4000";
const image2Url =
  "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F664a16fe95e34cfa87d16dd246540bca?format=webp&width=4000";

export default function OnsVerhaal() {
  const [scrollY, setScrollY] = useState(0);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxOffset = (
    elementRef: React.RefObject<HTMLDivElement>,
    direction: "slower" | "faster" = "slower"
  ) => {
    if (!elementRef.current) return 0;

    const elementTop = elementRef.current.getBoundingClientRect().top + scrollY;
    const distance = scrollY - elementTop;
    const speed = direction === "slower" ? 0.5 : 1;

    return distance * speed;
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/12198985/pexels-photo-12198985.jpeg"
        title="Ons Verhaal"
        subtitle="Ontdek wat Young Wise Women betekent en wat ons drijft"
      />

      {/* Section 1: Text Left, Image Right (with parallax) */}
      <section
        ref={section1Ref}
        className="min-h-screen py-20 px-4 md:px-8 bg-white overflow-hidden flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Het Begin van Ons Avontuur
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Young Wise Women is geboren uit een passie om jonge professionals
                te ondersteunen in hun persoonlijke en professionele groei. We
                geloven dat de beste versie van jezelf niet alleen goed is voor
                jouw wellbeing, maar ook voor de wereld om je heen.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Onze missie is om vrouwen in de leeftijd van 24+ te helpen een
                betekenisvol leven te leiden, waarbij ze hun unieke talenten en
                wijsheid volledig kunnen omarmen. We creëren ruimte voor reflectie,
                groei en inspiratie.
              </p>
            </div>

            {/* Image with Parallax Effect */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img loading="lazy"
                src={image1Url}
                alt="Young Wise Women"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${getParallaxOffset(section1Ref, "slower")}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Image Left, Text Right (mirrored with parallax) */}
      <section
        ref={section2Ref}
        className="min-h-screen py-20 px-4 md:px-8 bg-gray-50 overflow-hidden flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image with Parallax Effect (mirrored position) */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg order-2 md:order-1">
              <img loading="lazy"
                src={image2Url}
                alt="Young Wise Women Netwerk"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${getParallaxOffset(section2Ref, "slower")}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>

            {/* Text Content (mirrored order) */}
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Onze Waarden
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We geloven in de kracht van authenticiteit, zelfkennis en
                ondersteuning van elkaar. Elke vrouw heeft waardevolle wijsheid
                in zich, en het is ons doel om die naar boven te brengen.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Authentieke verbinding met jezelf en anderen
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Ruimte voor reflectie en persoonlijke groei
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Steun en inspiratie van gelijkgestemde vrouwen
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Praktische tools voor betekenisvolle verandering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Ben je klaar voor je volgende stap?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Sluit je aan bij onze Netwerk van jonge professionals en ontdek
            wat er in jou zit. Samen groeien we naar onze beste versie.
          </p>
          <Link
            to="/groepstrainingen"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg transition-all duration-300 hover:scale-105 hover:bg-accent font-medium"
          >
            Ontdek onze groepstrainingen
          </Link>
        </div>
      </section>
    </div>
  );
}
