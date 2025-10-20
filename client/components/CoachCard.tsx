import { useState } from "react";

interface CoachCardProps {
  name: string;
  image: string;
  title: string;
  bio: string;
}

export default function CoachCard({ name, image, title, bio }: CoachCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-96 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className="absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back side */}
        <div
          className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-4">{name}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}
