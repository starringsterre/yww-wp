import { useEffect, useState } from "react";

interface MemberStatsProps {
  memberCount: number;
}

export default function MemberStats({ memberCount }: MemberStatsProps) {
  const [displayCount, setDisplayCount] = useState(45);

  useEffect(() => {
    if (memberCount > displayCount) {
      const difference = memberCount - displayCount;
      let current = displayCount;
      const increment = Math.ceil(difference / 30);
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= memberCount) {
          setDisplayCount(memberCount);
          clearInterval(interval);
        } else {
          setDisplayCount(current);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [memberCount, displayCount]);

  return (
    <section className="py-0 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F4311546e9b81421890414f3b83697e67?format=webp&width=800"
              alt="Young Wise Women Community"
              className="w-full h-auto rounded-lg shadow-md max-w-md"
            />
          </div>

          {/* Right Column - Counter */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <div className="text-6xl md:text-7xl font-light text-primary mb-4 font-bold">
                {displayCount}
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                jonge wijze vrouwen tussen de 24-30 in de community
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-100">
              <p className="text-gray-600 text-sm">
                ✨ Elke dag groeien we verder. Sluit je aan en word onderdeel van onze groeiende communitygroep!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
