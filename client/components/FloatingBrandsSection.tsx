import { useEffect, useState, useRef } from "react";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";

interface BrandLogo {
  id: string;
  name: string;
  image?: string;
  isText?: boolean;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  zIndex?: number;
  disableHover?: boolean;
}

interface BrandWithDelay extends BrandLogo {
  delay: number;
}

const brands: BrandWithDelay[] = [
  {
    id: "accenture",
    name: "Accenture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png",
    left: "10%",
    top: "calc(5% + 80px)",
    delay: 0,
  },
  {
    id: "paulig",
    name: "Paulig Group",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F4f9cf333764a4f4789ed4f6b90d0a098?format=webp&width=800",
    right: "0%",
    top: "calc(10% + 80px)",
    delay: 120,
  },
  {
    id: "boer-croon",
    name: "Boer & Croon",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc4ba7e79ff3546f5896050313c0cc0f1?format=webp&width=800",
    left: "0%",
    top: "calc(42% + 80px)",
    delay: 240,
  },
  {
    id: "calco",
    name: "Calco",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F282018727da84a5bba3e9c6c0fc526bc?format=webp&width=800",
    right: "6%",
    top: "calc(45% + 80px)",
    delay: 360,
  },
  {
    id: "adidas",
    name: "Adidas",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
    left: "15%",
    top: "calc(75% + 80px)",
    delay: 480,
  },
  {
    id: "schiphol",
    name: "Schiphol",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F807f66344dac49a6aaa9d37c3145a319?format=webp&width=800",
    right: "0%",
    top: "calc(82% + 80px)",
    delay: 600,
  },
  {
    id: "google",
    name: "Google",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F5af03c40775e46feb8447decda3acf4b?format=webp&width=800",
    left: "43%",
    top: "32%",
    delay: 0,
    zIndex: 0,
    disableHover: true,
  },
  {
    id: "valcon",
    name: "Valcon",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F6679e6c72b9341f8bc5552e159e10e87?format=webp&width=800",
    left: "38%",
    top: "70%",
    delay: 0,
    zIndex: 1,
    disableHover: true,
  },
  {
    id: "placeholder",
    name: "Van Doorne",
    image: "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fe0179028eeb446eaa3db2eeab7a44453?format=webp&width=800",
    right: "25%",
    bottom: "-80px",
    delay: 720,
    zIndex: 1,
    disableHover: true,
  },
];

export default function FloatingBrandsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const viewportHeight = window.innerHeight;

      // Calculate bidirectional parallax offset (-90px to 90px movement)
      // Allows dramatic parallax effect both when scrolling down and up
      const normalized = (viewportHeight - sectionTop) / viewportHeight;
      const offset = Math.max(-90, Math.min(90, normalized * 180 - 90));
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

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
          <ScrollFadeInUp className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
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
                bottom: brand.bottom,
                zIndex: brand.zIndex || 1,
                margin: "40px",
                // Safe parallax scroll effect: Move Y from 0px to -60px
                // For centered logos (Google, Valcon), apply translateX(-50%) and then adjust Y
                transform: brand.left === "50%"
                  ? `translateX(-50%) translateY(calc(-50% - ${scrollOffset}px))`
                  : `translate(0, calc(-50% - ${scrollOffset}px))`,
                transition: "transform 900ms ease-out",
              }}
            >
              <ScrollFadeInUp>
                {/* Inner wrapper - handles hover effect */}
                <div
                  className="bg-white rounded-2xl p-8 flex items-center justify-center w-40 h-40 cursor-pointer"
                  style={{
                    // Hover effect: scale and shadow on inner wrapper (only if not disabled)
                    transform: !brand.disableHover && hoveredId === brand.id ? "scale(1.08)" : "scale(1)",
                    boxShadow: !brand.disableHover && hoveredId === brand.id
                      ? "0px 8px 24px rgba(0, 0, 0, 0.08)"
                      : "0 1px 3px rgba(0, 0, 0, 0.1)",
                    transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
                    // Staggered entrance delay (for fade-in animation)
                    animationDelay: `${brand.delay}ms`,
                    transformOrigin: "center center",
                  }}
                  onMouseEnter={() => !isMobile && !brand.disableHover && setHoveredId(brand.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
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
