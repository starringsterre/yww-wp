import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";
import { inspirationItems } from "@/lib/inspirationItems";

type InspirationCardsGridProps = {
  showTitle?: boolean;
  title?: string;
};

export default function InspirationCardsGrid({
  showTitle = false,
  title = "Inspiratie",
}: InspirationCardsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {showTitle && (
        <ScrollFadeInUp as="h2" className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-12">
          {title}
        </ScrollFadeInUp>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {inspirationItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-sm transition-opacity duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
          >
            <img loading="lazy"
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h3
              className="absolute z-10 left-4 right-4 bottom-4 rounded-3xl px-5 py-4 text-2xl md:text-3xl font-semibold text-center border-2"
              style={{
                backgroundColor: "#B46555",
                color: "#FFFFFF",
                borderColor: "#B46555",
              }}
            >
              {item.title}
            </h3>
            <div
              className={`pointer-events-none absolute z-20 inset-0 bg-white transition-opacity duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index ? "opacity-60" : "opacity-0"
              }`}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
