import { useEffect, useState } from "react";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";

interface BrandLogo {
  id: string;
  name: string;
  image?: string;
  isText?: boolean;
  left?: string;
  right?: string;
  top: string;
}

const brands: BrandLogo[] = [
  {
    id: "accenture",
    name: "Accenture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png",
    left: "10%",
    top: "10%",
  },
  {
    id: "boer-croon",
    name: "Boer & Croon",
    isText: true,
    left: "10%",
    top: "50%",
  },
  {
    id: "adidas",
    name: "Adidas",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
    left: "15%",
    top: "70%",
  },
  {
    id: "paulig",
    name: "Paulig Group",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Paulig_logo.svg/1200px-Paulig_logo.svg.png",
    right: "10%",
    top: "10%",
  },
  {
    id: "calco",
    name: "Calco",
    isText: true,
    right: "10%",
    top: "45%",
  },
  {
    id: "schiphol",
    name: "Schiphol",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Amsterdam_Airport_Schiphol_Logo.svg/1200px-Amsterdam_Airport_Schiphol_Logo.svg.png",
    right: "15%",
    top: "70%",
  },
];

export default function FloatingBrandsSection() {
  const [isMobile, setIsMobile] = useState(false);

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
      className="relative px-4 md:px-8"
      style={{
        backgroundColor: "rgba(152, 164, 129, 0.15)",
        minHeight: isMobile ? "auto" : "700px",
        paddingTop: isMobile ? "40px" : "60px",
        paddingBottom: isMobile ? "40px" : "60px",
      }}
    >
      {!isMobile ? (
        <div className="relative w-full max-w-6xl mx-auto" style={{ height: "600px" }}>
          {/* Title - Centered */}
          <ScrollFadeInUp className="absolute inset-0 flex items-center justify-center z-10">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 text-center max-w-2xl px-8">
              Krachtige vrouwen bij deze organisaties gingen je voor
            </h2>
          </ScrollFadeInUp>

          {/* Floating Logos */}
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="absolute"
              style={{
                left: brand.left,
                right: brand.right,
                top: brand.top,
                transform: "translate(0, -50%)",
                margin: "20px",
              }}
            >
              <ScrollFadeInUp>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center w-28 h-28">
                  {brand.isText ? (
                    <span className="text-sm font-semibold text-gray-800 text-center px-2 leading-tight">
                      {brand.name}
                    </span>
                  ) : (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-12 object-contain"
                    />
                  )}
                </div>
              </ScrollFadeInUp>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <ScrollFadeInUp className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
              Krachtige vrouwen bij deze organisaties gingen je voor
            </h2>
          </ScrollFadeInUp>

          <div className="flex flex-col gap-4 items-center">
            {brands.map((brand) => (
              <ScrollFadeInUp key={brand.id} className="w-full">
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-20 h-20 mx-auto">
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
