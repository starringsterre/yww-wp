// @cms-page slug="het-team" route="/ons-verhaal/het-team" title="Het Team" menuParent="Ons Verhaal" menuLabel="Het Team"

import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { usePageContent } from "@/hooks/usePageContent";
import { renderMultiline } from "@/lib/renderMultiline";

export default function HetTeam() {
  const { data: cms, isPending } = usePageContent("het-team");
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  if (isPending) return null;

  const members = [
    {
      name: cms?.team_1_name || "Ella Taal",
      image:
        cms?.team_1_image ||
        "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000",
    },
    {
      name: cms?.team_2_name || "Liene Molendijk",
      image:
        cms?.team_2_image ||
        "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000",
    },
    {
      name: cms?.team_3_name || "Marloes Versteeg",
      image: cms?.team_3_image || "/marloes-versteeg.jpg",
    },
    {
      name: cms?.team_4_name || "Julia Weekenstroo",
      image: cms?.team_4_image || "/julia-weekenstroo.jpg",
    },
    {
      name: cms?.team_5_name || "Karen van Bremen",
      image: cms?.team_5_image || "/karen-van-bremen.jpg",
    },
  ];

  const scrollToMember = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full">
      <SEOHead
        slug="het-team"
        title="Het Team | Young Wise Women"
        description="Maak kennis met het team van Young Wise Women: ervaren coaches van meerdere generaties die samen persoonlijke groei en leiderschap begeleiden."
        path="/ons-verhaal/het-team"
      />

      <HeroSection
        backgroundImage={cms?.hero_image || "/incompany-training-vrouw.png"}
        title={cms?.hero_title || "Meerdere generaties, één missie"}
        subtitle={
          cms?.hero_subtitle ||
          "Ontdek het team van Young Wise Women: ervaren trainsters met een scherpe blik op hoofd én lichaam, voor coaching die echt beklijft."
        }
      />

      {/* Mobiel: horizontaal scrollbare trainer-nav, tikken scrollt naar de sectie */}
      <div className="md:hidden relative bg-white px-4 py-6">
        <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
          <div className="flex w-max gap-5">
            {members.map((member, i) => (
              <button
                key={member.name}
                type="button"
                onClick={() => scrollToMember(i)}
                className="flex w-20 shrink-0 flex-col items-center gap-2"
              >
                <span className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#ece8df]">
                  <img
                    loading="lazy"
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-center text-xs font-medium leading-tight text-gray-700">
                  {member.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-14 items-center justify-end bg-gradient-to-l from-white via-white/80 to-transparent pr-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#6B705C] shadow-sm">
            <ChevronRight size={16} />
          </span>
        </div>
      </div>

      {/* Ella Taal — foto links */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B705C]">
                  {cms?.team_1_generation || "Generatie X"}
                </p>
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
                src={
                  cms?.team_1_image ||
                  "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=4000"
                }
                alt="Ella Taal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Liene Molendijk — foto rechts */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-[#FBF9F5] flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B705C]">
                  {cms?.team_2_generation || "Zillennial (grens Gen Z en Millennial)"}
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_2_name || "Liene Molendijk"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_2_role || "Coach & Trainer"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_2_bio ||
                    "Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk.\nDaarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
              <img
                loading="lazy"
                src={
                  cms?.team_2_image ||
                  "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=4000"
                }
                alt="Liene Molendijk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marloes Versteeg — foto links */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B705C]">
                  {cms?.team_3_generation || "Generatie Y (beter bekend als Millennials)"}
                </p>
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
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-[#FBF9F5] flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B705C]">
                  {cms?.team_4_generation || "Generatie Z"}
                </p>
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
                src={cms?.team_4_image || "/julia-weekenstroo.jpg"}
                alt="Julia Weekenstroo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Karen van Bremen — foto links */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="min-h-screen py-20 md:py-24 px-4 md:px-8 bg-white flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:order-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B705C]">
                  {cms?.team_5_generation || "Generatie X"}
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  {cms?.team_5_name || "Karen van Bremen"}
                </h2>
                <p className="mt-2 text-base font-medium text-[#B46555]">
                  {cms?.team_5_role || "Coach & Trainer"}
                </p>
              </div>
              <div className="space-y-4">
                {renderMultiline(
                  cms?.team_5_bio ||
                    "Na ruim 13 jaar als zelfstandig logopedist ontwikkelde Karen zich verder als coach en trainer. De afgelopen 15 jaar gaf ze leiderschapstrainingen in het bedrijfsleven en retraites in Portugal en Nederland, gericht op persoonlijke ontwikkeling, bewustzijn en leiderschap.\nAls moeder van drie dochters ziet ze hoe hard de huidige maatschappij deze generatie aanpakt. Met haar kennis en ervaring ondersteunt ze jonge vrouwen om vrijer en liefdevoller hun weg te vinden.",
                  "text-gray-700 leading-relaxed",
                )}
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-lg md:order-1">
              <img
                loading="lazy"
                src={cms?.team_5_image || "/karen-van-bremen.jpg"}
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
