// @cms-page slug="het-team" route="/ons-verhaal/het-team" title="Het Team" menuParent="Ons Verhaal" menuLabel="Het Team"

import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";
import { renderMultiline } from "@/lib/renderMultiline";

export default function HetTeam() {
  const { data: cms, isPending } = usePageContent("het-team");
  if (isPending) return null;

  return (
    <div className="w-full">
      <SEOHead
        slug="het-team"
        title="Het Team | Young Wise Women"
        description="Maak kennis met het team van Young Wise Women: coaches van Generatie X en Generatie Z die samen persoonlijke groei en leiderschap begeleiden."
        path="/ons-verhaal/het-team"
      />

      <HeroSection
        backgroundImage={cms?.hero_image || "/workshop-persoonlijke-ontwikkeling.jpg"}
        title={cms?.hero_title || "Twee generaties, één aanpak"}
        subtitle={
          cms?.hero_subtitle ||
          "Bij Young Wise Women combineren we de ervaring van Generatie X met de frisse blik van Generatie Z, voor coaching die aansluit bij iedere levensfase."
        }
      />

      {/* Ella Taal — foto links */}
      <section className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_1_name || "Ella Taal"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_1_role || "Founder Awareness in Business & Young Wise Women"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_1_bio ||
                    "Ella Taal is de oprichter van Young Wise Women en Awareness in Business. Met ruim 25 jaar ervaring als coach en leiderschapstrainer begeleidt ze organisaties en individuen naar meer bewustzijn, purpose en flow.",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
              <Link
                to="/ons-verhaal/over-ella"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#B46555] transition-colors hover:underline"
              >
                Lees meer over Ella →
              </Link>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg md:order-1">
              <img
                loading="lazy"
                src={cms?.team_1_image || "/team-ella-taal.svg"}
                alt="Ella Taal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Liene Molendijk — foto rechts */}
      <section className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-[#FBF9F5] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_2_name || "Liene Molendijk"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_2_role || "[Functie invullen]"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_2_bio ||
                    "[Bio tekst voor Liene Molendijk, vul aan via WP Admin]",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
              <img
                loading="lazy"
                src={cms?.team_2_image || "/team-liene-molendijk.svg"}
                alt="Liene Molendijk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marloes Versteeg — foto links */}
      <section className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_3_name || "Marloes Versteeg"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_3_role || "Lichaamsgericht therapeut, Rebalancer"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_3_bio ||
                    "Marloes Versteeg begeleidt professionals die zijn vastgelopen in stress, overbelasting of terugkerende patronen en ondersteunt organisaties die willen investeren in duurzame inzetbaarheid en persoonlijk leiderschap.\nNa een loopbaan binnen het bedrijfsleven, waarin zij zich bezighield met veranderprocessen, samenwerking en leiderschap, werkt zij nu als lichaamsgericht therapeut. Juist doordat zij zowel de dynamiek van organisaties als de mens daarbinnen kent, slaat zij een brug tussen persoonlijke ontwikkeling en de dagelijkse praktijk op de werkvloer.\nMarloes is opgeleid als Rebalancer.",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
              <blockquote className="font-['Lora',Georgia,serif] text-xl italic leading-relaxed text-gray-800">
                "
                {cms?.team_3_quote ||
                  "Duurzame inzetbaarheid begint niet bij harder werken, maar bij het hervinden van de verbinding met jezelf."}
                "
              </blockquote>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg md:order-1">
              <img
                loading="lazy"
                src={cms?.team_3_image || "/marloes-versteeg.jpg"}
                alt="Marloes Versteeg"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Julia Weekenstroo — foto rechts */}
      <section className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-[#FBF9F5] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_4_name || "Julia Weekenstroo"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_4_role || "[Functie invullen]"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_4_bio ||
                    "[Bio tekst voor Julia Weekenstroo, vul aan via WP Admin]",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
              <img
                loading="lazy"
                src={cms?.team_4_image || "/team-julia-weekenstroo.svg"}
                alt="Julia Weekenstroo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Karen van Bremen — foto links */}
      <section className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_5_name || "Karen van Bremen"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_5_role || "[Functie invullen]"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_5_bio ||
                    "[Bio tekst voor Karen van Bremen, vul aan via WP Admin]",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg md:order-1">
              <img
                loading="lazy"
                src={cms?.team_5_image || "/team-karen-van-bremen.svg"}
                alt="Karen van Bremen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
