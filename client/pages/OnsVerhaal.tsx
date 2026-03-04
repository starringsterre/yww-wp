import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { usePageContent } from "@/hooks/usePageContent";

const defaultImage1Url =
  "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fcf6849fa4e1a4b76b17b1abaac301ee1?format=webp&width=4000";
const defaultImage2Url =
  "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F664a16fe95e34cfa87d16dd246540bca?format=webp&width=4000";

export default function OnsVerhaal() {
  const { data: cms } = usePageContent("ons-verhaal");
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);
    } else {
      mediaQuery.addListener(updateIsMobile);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateIsMobile);
      } else {
        mediaQuery.removeListener(updateIsMobile);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const getParallaxOffset = (
    elementRef: React.RefObject<HTMLDivElement>,
    direction: "slower" | "faster" = "slower"
  ) => {
    if (isMobile) return 0;
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
        backgroundImage={cms?.hero_image || "https://images.pexels.com/photos/12198985/pexels-photo-12198985.jpeg"}
        title={cms?.hero_title || "Ons Verhaal"}
        subtitle={cms?.hero_subtitle || "Ontdek wat Young Wise Women betekent en wat ons drijft"}
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
                {cms?.section_1_heading || "Het Begin van Ons Avontuur"}
              </h2>
              {(cms?.section_1_text || "Young Wise Women is geboren uit een passie om jonge professionals te ondersteunen in hun persoonlijke en professionele groei. We geloven dat de beste versie van jezelf niet alleen goed is voor jouw wellbeing, maar ook voor de wereld om je heen.\nOnze missie is om vrouwen in de leeftijd van 24+ te helpen een betekenisvol leven te leiden, waarbij ze hun unieke talenten en wijsheid volledig kunnen omarmen. We creëren ruimte voor reflectie, groei en inspiratie.").split('\n').filter(Boolean).map((p, i) => (
                <p key={i} className="text-lg text-gray-700 leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Image with Parallax Effect */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img loading="lazy"
                src={cms?.section_1_image || defaultImage1Url}
                alt="Young Wise Women"
                className="w-full h-full object-cover"
                style={
                  isMobile
                    ? undefined
                    : {
                        transform: `translateY(${getParallaxOffset(section1Ref, "slower")}px)`,
                        transition: "transform 0.1s ease-out",
                      }
                }
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
                src={cms?.section_2_image || defaultImage2Url}
                alt="Young Wise Women Netwerk"
                className="w-full h-full object-cover"
                style={
                  isMobile
                    ? undefined
                    : {
                        transform: `translateY(${getParallaxOffset(section2Ref, "slower")}px)`,
                        transition: "transform 0.1s ease-out",
                      }
                }
              />
            </div>

            {/* Text Content (mirrored order) */}
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                {cms?.section_2_heading || "Onze Waarden"}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We geloven in de kracht van authenticiteit, zelfkennis en
                ondersteuning van elkaar. Elke vrouw heeft waardevolle wijsheid
                in zich, en het is ons doel om die naar boven te brengen.
              </p>
              <div className="space-y-4 pt-4">
                {(cms?.section_2_items || "Authentieke verbinding met jezelf en anderen\nRuimte voor reflectie en persoonlijke groei\nSteun en inspiratie van gelijkgestemde vrouwen\nPraktische tools voor betekenisvolle verandering").split('\n').filter(Boolean).map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    ✓
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {cms?.cta_heading || "Ben je klaar voor je volgende stap?"}
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Sluit je aan bij onze Netwerk van jonge professionals en ontdek
            wat er in jou zit. Samen groeien we naar onze beste versie.
          </p>
          <Link
            to="/retreats"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg transition-all duration-300 hover:scale-105 hover:bg-accent font-medium"
          >
            {cms?.cta_text || "Ontdek onze groepstrainingen"}
          </Link>
        </div>
      </section>
    </div>
  );
}
