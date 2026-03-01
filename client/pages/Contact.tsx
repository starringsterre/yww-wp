import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

export default function Contact() {
  const { data: cms } = usePageContent("contact");
  const [scrollY, setScrollY] = useState(0);
  const blocksRef = useRef<HTMLDivElement>(null);
  const blocks2Ref = useRef<HTMLDivElement>(null);

  const image1Url =
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F2acad583f0d54543a360b7ba2774caaf?format=webp&width=4000";
  const image2Url =
    "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F5c3d4f91cbf7474889deeae58f7928dd?format=webp&width=4000";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxOffset = (ref: React.RefObject<HTMLDivElement>, direction: "slower" | "faster" = "slower") => {
    if (!ref.current) return 0;
    const elementTop = ref.current.getBoundingClientRect().top + scrollY;
    const distance = scrollY - elementTop;
    const speed = direction === "slower" ? 0.5 : 1;
    const offset = distance * speed;
    // Limit parallax movement to prevent gaps (smaller for square images)
    return Math.max(-80, Math.min(80, offset));
  };

  return (
    <div className="w-full">
      <SEOHead
        title="Ons Verhaal | Young Wise Women"
        description="Leer het team achter Young Wise Women kennen. Ontdek ons verhaal, onze missie en hoe wij jonge vrouwen helpen groeien."
        path="/ons-verhaal"
      />
      {/* Hero */}
      <HeroSection
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fcaa0a42fc6ac438489c0ba9999ec1dbd?format=webp&width=2000"
        title={cms?.hero_title || "Ons Verhaal"}
        subtitle={cms?.hero_subtitle || "Hoe twee generaties elkaar versterken"}
      />


      {/* One Block with Parallax */}
      <section
        ref={blocksRef}
        className="min-h-screen bg-white"
        style={{ padding: "9px 0 0" }}
      >
        <div className="flex flex-col md:flex-row relative">
          {/* Left Column - Text */}
          <div className="w-full md:w-1/2 px-4 md:px-8 flex items-center z-10" style={{ aspectRatio: "1 / 1", position: "sticky", top: "0", backgroundColor: "#fbf9f6" }}>
            <div className="space-y-6 text-center">
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide">
                {cms?.block_1_heading || "Ons Gedachtegoed"}
              </h3>
              <div className="flex justify-center">
                <div className="w-16 h-px bg-gray-400"></div>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {cms?.block_1_text || "Het idee voor dit retreat ontstond bij Ella Taal, zelf afkomstig uit Generatie X en moeder van drie dochters uit Generatie Z. Ze zag van dichtbij hoe jonge vrouwen vandaag de dag zoeken naar hun plek in het professionele werkveld, vaak zonder de begeleiding die ze verdienen. Ella voelde de wens om de kracht en wijsheid van eerdere generaties door te geven aan deze nieuwe generatie, die in een complexe wereld op eigenzinnige en bewuste wijze leiding durft te nemen. Zo wil zij bijdragen aan het versterken van vrouwen die leiderschap tonen – iets waar in deze tijd grote behoefte aan is."}
              </p>
              <div>
                <Link
                  to="/ons-verhaal"
                  className="inline-block px-8 py-3 rounded-lg font-medium text-white bg-primary transition-all duration-300 hover:scale-105 hover:bg-accent"
                >
                  Meer over Founder Ella
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image Top */}
          <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "1 / 1" }}>
            <img loading="lazy"
              src={image1Url}
              alt="Story Top Right"
              className="w-full object-cover"
              style={{
                height: "120%",
                transform: `translateY(${getParallaxOffset(blocksRef, "slower")}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>
        </div>

        <div ref={blocks2Ref} className="flex flex-col-reverse md:flex-row relative" style={{ margin: "0" }}>
          {/* Left Column - Image Bottom */}
          <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "1 / 1" }}>
            <img loading="lazy"
              src={image2Url}
              alt="Story Bottom Left"
              className="w-full object-cover"
              style={{
                height: "120%",
                transform: `translateY(${getParallaxOffset(blocks2Ref, "slower")}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>

          {/* Right Column - Text */}
          <div className="w-full md:w-1/2 px-4 md:px-8 flex items-center z-10" style={{ aspectRatio: "1 / 1", position: "sticky", top: "0", backgroundColor: "#fbf9f7" }}>
            <div className="space-y-6 text-center">
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide">
                {cms?.block_2_heading || "Unieke Kracht"}
              </h3>
              <div className="flex justify-center">
                <div className="w-16 h-px bg-gray-400"></div>
              </div>
              {(cms?.block_2_text || "Die visie wordt versterkt door de samenwerking met Ella's oudste dochter, Liene Molendijk (Generatie Z). Als voormalig deelnemer kent zij de kracht van het retreat van binnenuit. Inmiddels coördineert zij het programma met enthousiasme, ondersteunt ze de groep waar nodig en brengt ze yoga- en meditatiewijsheden op een toegankelijke manier in.\nSamen vormen Ella en Liene een team dat op een intergenerationele, laagdrempelige en inspirerende manier jonge vrouwen begeleidt. Met hun verschillende perspectieven delen ze persoonlijke ervaringen, denken ze pragmatisch mee en creëren ze een veilige setting voor groei en bewustwording. Dit unieke samenspel van generaties maakt het retreat bijzonder krachtig.").split('\n').filter(Boolean).map((p, i) => (
              <p key={i} className="text-sm md:text-base text-gray-700 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
