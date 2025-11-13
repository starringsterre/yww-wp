import { useEffect, useState } from "react";

interface MemberStatsProps {
  memberCount: number;
}

export default function MemberStats({ memberCount }: MemberStatsProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Initial animation from 0 to memberCount on mount
    if (!hasAnimated && memberCount > 0) {
      let current = 0;
      const target = memberCount;
      const increment = Math.ceil(target / 40);

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayCount(target);
          setHasAnimated(true);
          clearInterval(interval);
        } else {
          setDisplayCount(current);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [memberCount, hasAnimated]);

  // Handle updates when memberCount increases (new member added)
  useEffect(() => {
    if (hasAnimated && memberCount > displayCount) {
      const difference = memberCount - displayCount;
      let current = displayCount;
      const increment = Math.ceil(difference / 20);

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
  }, [memberCount, displayCount, hasAnimated]);

  return (
    <section className="py-0 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ paddingTop: "60px", marginBottom: "55px" }}>
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F026a017e57a343fa888f19e29258f0ac?format=webp&width=800"
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

            <div className="p-6 rounded-lg border border-pink-100">
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
