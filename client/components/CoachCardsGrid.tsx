import { useState } from "react";

type Coach = {
  id?: string | number;
  _id?: string;
  name: string;
  image?: string;
  bio: string;
};

interface CoachCardsGridProps {
  coaches: Coach[];
}

export default function CoachCardsGrid({ coaches }: CoachCardsGridProps) {
  const [hoveredCoachKey, setHoveredCoachKey] = useState<string | number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {coaches.map((coach, index) => {
        const coachKey = coach.id ?? coach._id ?? coach.name ?? index;
        const isFlipped = hoveredCoachKey === coachKey;

        return (
          <div
            key={coachKey}
            className="relative w-full h-96 cursor-pointer"
            onMouseEnter={() => setHoveredCoachKey(coachKey)}
            onMouseLeave={() => setHoveredCoachKey((current) => (current === coachKey ? null : current))}
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                transform: isFlipped ? "translateZ(0) rotateY(180deg)" : "translateZ(0) rotateY(0deg)",
              }}
            >
              {/* Front side - Photo */}
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(0) rotateY(0deg)",
                }}
              >
                {coach.image ? (
                  <img
                    loading="eager"
                    decoding="async"
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#FBF9F5] text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Back side - Text */}
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center overflow-y-auto"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(0) rotateY(180deg)",
                }}
              >
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {coach.name}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {coach.bio}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
