import { useEffect, useRef } from "react";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";

interface BrandLogo {
  id: string;
  name: string;
  image?: string;
  isText?: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
}

const brands: BrandLogo[] = [
  {
    id: "accenture",
    name: "Accenture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png",
    position: "top-left",
  },
  {
    id: "boer-croon",
    name: "Boer & Croon",
    isText: true,
    position: "left",
  },
  {
    id: "adidas",
    name: "Adidas",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
    position: "bottom-left",
  },
  {
    id: "paulig",
    name: "Paulig Group",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Paulig_logo.svg/1200px-Paulig_logo.svg.png",
    position: "top-right",
  },
  {
    id: "calco",
    name: "Calco",
    isText: true,
    position: "right",
  },
  {
    id: "schiphol",
    name: "Schiphol",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Amsterdam_Airport_Schiphol_Logo.svg/1200px-Amsterdam_Airport_Schiphol_Logo.svg.png",
    position: "bottom-right",
  },
];

const getPositionClasses = (position: string, isMobile: boolean) => {
  if (isMobile) {
    return "relative w-20 h-20 mx-auto my-3";
  }

  switch (position) {
    case "top-left":
      return "absolute top-8 left-8 md:top-12 md:left-16";
    case "top-right":
      return "absolute top-8 right-8 md:top-12 md:right-16";
    case "bottom-left":
      return "absolute bottom-8 left-8 md:bottom-12 md:left-16";
    case "bottom-right":
      return "absolute bottom-8 right-8 md:bottom-12 md:right-16";
    case "left":
      return "absolute left-4 top-1/2 -translate-y-1/2 md:left-12";
    case "right":
      return "absolute right-4 top-1/2 -translate-y-1/2 md:right-12";
    default:
      return "";
  }
};

export default function FloatingBrandsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="relative py-20 px-4 md:px-8 flex items-center"
      style={{
        backgroundColor: "rgba(152, 164, 129, 0.15)",
        minHeight: isMobile ? "auto" : "600px",
      }}
    >
      {!isMobile ? (
        <div
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto"
          style={{ height: "500px" }}
        >
          {/* Title - Centered */}
          <ScrollFadeInUp className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 text-center max-w-2xl px-4">
              Krachtige vrouwen bij deze organisaties gingen je voor
            </h2>
          </ScrollFadeInUp>

          {/* Floating Logos */}
          {brands.map((brand) => (
            <ScrollFadeInUp key={brand.id} className={getPositionClasses(brand.position, false)}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center w-24 h-24 md:w-28 md:h-28">
                {brand.isText ? (
                  <span className="text-xs md:text-sm font-semibold text-gray-800 text-center px-2 leading-tight">
                    {brand.name}
                  </span>
                ) : (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-10 md:h-12 object-contain"
                  />
                )}
              </div>
            </ScrollFadeInUp>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <ScrollFadeInUp className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Krachtige vrouwen bij deze organisaties gingen je voor
            </h2>
          </ScrollFadeInUp>

          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => (
              <ScrollFadeInUp key={brand.id}>
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-20 h-20">
                  {brand.isText ? (
                    <span className="text-xs font-semibold text-gray-800 text-center px-2">
                      {brand.name}
                    </span>
                  ) : (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-8 object-contain"
                    />
                  )}
                </div>
              </ScrollFadeInUp>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
