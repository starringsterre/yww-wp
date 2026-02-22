import { useState } from "react";

type Coach = {
  _id?: string;
  name: string;
  image?: string;
  bio: string;
};

interface CoachCardsGridProps {
  coaches: Coach[];
}

export default function CoachCardsGrid({ coaches }: CoachCardsGridProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const getDisplayImage = (cardIndex: number) => {
    // When the other card is flipped, show that coach's image in this position
    const otherIndex = cardIndex === 0 ? 1 : 0;
    const coach = flippedIndex === otherIndex ? coaches[otherIndex] : coaches[cardIndex];
    if (!coach?.image) return null;
    return coach.image;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {coaches.map((coach, index) => {
        if (!coach) return null;
        const isFlipped = flippedIndex === index;
        const displayImage = getDisplayImage(index);

        return (
          <div
            key={coach._id || index}
            className="relative w-full h-96 cursor-pointer"
            onMouseEnter={() => setFlippedIndex(index)}
            onMouseLeave={() => setFlippedIndex(null)}
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front side - Photo */}
              <div
                className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                {displayImage ? (
                  <img loading="lazy"
                    src={displayImage}
                    alt={coach.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>

              {/* Back side - Text */}
              <div
                className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center overflow-y-auto"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
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
