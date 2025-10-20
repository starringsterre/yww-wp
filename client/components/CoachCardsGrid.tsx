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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {coaches.map((coach, index) => {
        const isFlipped = flippedIndex === index;
        const otherIndex = index === 0 ? 1 : 0;
        const displayImage = isFlipped ? coaches[index].image : coaches[index].image;
        const otherDisplayImage = flippedIndex === otherIndex ? coaches[index].image : coaches[otherIndex].image;

        return (
          <div key={index} className="flex flex-col gap-12">
            {/* Current card */}
            <div
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

            {/* Other card that shows this coach's image when flipped */}
            {index === 0 && (
              <div
                className="relative w-full h-96 cursor-pointer"
                onMouseEnter={() => setFlippedIndex(otherIndex)}
                onMouseLeave={() => setFlippedIndex(null)}
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedIndex === otherIndex ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front side - Photo */}
                  <div
                    className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={otherDisplayImage}
                      alt={coaches[otherIndex].name}
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
                      {coaches[otherIndex].name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {coaches[otherIndex].bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
