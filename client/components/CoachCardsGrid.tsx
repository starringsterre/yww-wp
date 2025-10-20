import { useState } from "react";

interface Coach {
  name: string;
  image: string;
  bio: string;
}

interface CoachCardsGridProps {
  coaches: Coach[];
}

export default function CoachCardsGrid({ coaches }: CoachCardsGridProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const getDisplayImage = (cardIndex: number) => {
    // When the other card is flipped, show that coach's image in this position
    const otherIndex = cardIndex === 0 ? 1 : 0;
    if (flippedIndex === otherIndex) {
      return coaches[otherIndex].image;
    }
    return coaches[cardIndex].image;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {coaches.map((coach, index) => {
        const isFlipped = flippedIndex === index;
        const displayImage = getDisplayImage(index);

        return (
          <div
            key={index}
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
                className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={displayImage}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
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
