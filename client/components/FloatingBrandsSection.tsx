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
    left: "18%",
    top: "5%",
  },
  {
    id: "boer-croon",
    name: "Boer & Croon",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc4ba7e79ff3546f5896050313c0cc0f1?format=webp&width=800",
    left: "6%",
    top: "42%",
  },
  {
    id: "adidas",
    name: "Adidas",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
    left: "22%",
    top: "75%",
  },
  {
    id: "paulig",
    name: "Paulig Group",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F4f9cf333764a4f4789ed4f6b90d0a098?format=webp&width=800",
    right: "10%",
    top: "10%",
  },
  {
    id: "calco",
    name: "Calco",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F282018727da84a5bba3e9c6c0fc526bc?format=webp&width=800",
    right: "6%",
    top: "45%",
  },
  {
    id: "schiphol",
    name: "Schiphol",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F807f66344dac49a6aaa9d37c3145a319?format=webp&width=800",
    right: "15%",
    top: "78%",
  },
];

export default function FloatingBrandsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;

      // Calculate progress: 0 when section is at bottom of viewport, 1 when at top
      const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));
      setScrollProgress(progress * 50); // 50px max movement
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8"
      style={{
        backgroundColor: "rgba(152, 164, 129, 0.15)",
        minHeight: isMobile ? "auto" : "900px",
        paddingTop: isMobile ? "40px" : "60px",
        paddingBottom: isMobile ? "40px" : "60px",
      }}
    >
      {!isMobile ? (
        <div className="relative w-full max-w-7xl mx-auto" style={{ height: "800px" }}>
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
                transform: `translate(0, calc(-50% - ${scrollProgress}px))`,
                margin: "40px",
                transition: "transform 0.1s ease-out",
              }}
            >
              <ScrollFadeInUp>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center w-40 h-40">
                  {brand.isText ? (
                    <span className="text-sm font-semibold text-gray-800 text-center px-2 leading-tight">
                      {brand.name}
                    </span>
                  ) : (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-16 object-contain"
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
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-24 h-24 mx-auto">
                  {brand.isText ? (
                    <span className="text-xs font-semibold text-gray-800 text-center px-2">
                      {brand.name}
                    </span>
                  ) : (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-10 object-contain"
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
