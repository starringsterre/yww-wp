// @cms-page slug="over-ella" route="/ons-verhaal/over-ella" title="Over Ella" menuParent="Ons Verhaal" menuLabel="Over Ella"

import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";

const defaultBio = `Na mijn studie Juridisch Politieke wetenschappen aan de Universiteit van Leiden werd ik intern consultant duurzaamheid bij Koninklijke Ahold. Na 4 jaar werkervaring als intern consultant en trainer communicatie-en onderhandeltechnieken voor ondernemingsraden vond ik dat ik voldoende werkervaring en ondergrond om mijn eigen onderneming te starten. Op mijn 31 ste startte ik mijn eerste organisatieadviesbureau Second Nature Management Consultants gespecialiseerd in het optimaliseren van de factor mens in ondernemingen (en organisaties) en werd ik ondernemer (1996).

Het ondernemen heb ik van huis uit meegekregen van mijn moeder, die eveneens als zelfstandige werkte en het ondernemen met het moederschap moeiteloos wist te combineren.

Tijdens mijn ondernemerschap werd ik ook moeder van 3 dochters (inmiddels 27, 25 en 21 jaar oud). In september 2011 richtte ik, na een management buy out, het organisatieadviesbureau ''Awareness in Business, conscious people better results'' op dat is gespecialiseerd in het ontwerp en de uitvoering van leiderschaps- en bewustzijnsverruimingsprogramma hoger management en business leaders en ondernemers.

Mijn droom is om een bijdrage te leveren in het bedrijfsleven aan de transformatie van result-driven naar purpose-driven, waarbij de mensen die in deze organisaties werken vanuit hun intrinsieke motivatie (talenten en eigen purpose) het beste van zichzelf laten zien en meer geluk op de werkvloer ervaren voor een goeie privé-werk balans

Op deze manier streef ik ernaar een betere wereld achter te laten voor mijn kinderen, waarin er ruimte is voor geluk, passie, intrinsieke motivatie en ambitie.

Een passie heb ik voor mensen en hun intrinsiek gemotiveerde potentieel, om hen vanuit daar naar een volgend niveau van bewustzijn (waar loopt mijn energie weg en wat zijn mijn persoonlijke behoeftes) te begeleiden. Om vervolgens vanuit dit verhoogde bewustzijn vanuit intrinsieke motivatie (vanuit talenten en purpose) moeiteloos in flow te werken en te leven.

Bevoorrecht voel ik dat mijn werk en energie bijdraagt aan meer bewustwording en een positieve verandering bij individuen en teams in bedrijven en organisaties.

Al ruim 25 jaar heb ik ervaring als zelfstandig coach, leiderschapsontwikkeling trainer en organisatieadviseur voor diverse opdrachtgevers zoals PwC Nederland, PwC Midden Oosten, DSM, Ahold, Boskalis, Prinses Maxima Centrum, Aeson Solutions, Thal technologies, Evers Partners, Public Matters, Ministerie van VROM, Sociale Zaken en het Openbaar Ministerie. Daarnaast ben ik gecertificeerd als DISC- en Motivation Factor practitioner, instrumenten die ik inzet aan het begin van een coachings- of leiderschapsontwikkelingstraject.

Sinds 2012 ben ik ook werkzaam in Caribisch Nederland. Onder andere leid ik teamontwikkelingsprojecten en veranderingstrajecten voor diverse klanten zoals de Port of Sint Maarten, Sint Maarten Medical Centre, Sint Maarten Government, Oyster Bay beach resort en Police Force Curaçao, Bonaire, Aruba en Sint Maarten.

Brede ervaring heb ik in het ontwerp en uitvoering van leiderschapsprogramma's en coachingsprogramma's voor bedrijfsleven en overheid. Ik weet te schakelen en te verbinden tussen harde en zachte elementen in mijn advisering, training en coaching.`;

export default function OverElla() {
  const { data: cms } = usePageContent("over-ella");
  const { data: homeCms } = usePageContent("home");

  const bioText = cms?.bio_text || defaultBio;

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage={cms?.hero_image || "https://images.pexels.com/photos/12198985/pexels-photo-12198985.jpeg"}
        title={cms?.hero_title || "Over Ella"}
        subtitle={cms?.hero_subtitle || "Leer Ella kennen – de drijvende kracht achter Young Wise Women"}
      />

      {/* Bio section: full-bleed image left, text right */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Left: photo, 50% width, full height */}
        <div className="w-full md:w-1/2 min-h-[400px] md:min-h-screen relative flex-shrink-0">
          <img
            loading="lazy"
            src={cms?.profile_photo || "https://images.pexels.com/photos/12198985/pexels-photo-12198985.jpeg"}
            alt="Ella Taal"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: text */}
        <div className="w-full md:w-1/2 flex items-start justify-center py-16 px-8 md:px-12 bg-white overflow-y-auto">
          <div className="max-w-xl space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                {cms?.name_heading || "Ella Taal"}
              </h1>
              <p className="mt-2 text-base font-medium text-[#B46555]">
                {cms?.role_subheading || "Founder Awareness in Business en Young Wise Women"}
              </p>
            </div>

            <div className="space-y-4">
              {bioText.split("\n\n").filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awareness in Business */}
      <section className="min-h-screen overflow-hidden flex flex-col justify-center py-24" style={{ backgroundColor: "rgba(152, 164, 129, 0.15)" }}>
        <h2 className="text-3xl md:text-4xl font-light text-center text-gray-800 mb-12 px-4">
          {homeCms?.trusted_heading || "Young Wise Women is onderdeel van Awareness in Business"}
        </h2>
        <div className="overflow-hidden w-full">
          <div className="flex w-max animate-logo-marquee items-center gap-12">
            {[...Array(15)].map((_, i) => {
              const logo = homeCms?.[`trusted_logo_${i + 1}` as keyof typeof homeCms];
              return (
                <div
                  key={`a-${i}`}
                  className="w-52 h-32 shrink-0 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50"
                >
                  {logo ? (
                    <img src={logo} alt={`Logo ${i + 1}`} className="h-20 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-[10px] text-gray-300 font-mono">logo_{i + 1}</span>
                  )}
                </div>
              );
            })}
            {[...Array(15)].map((_, i) => {
              const logo = homeCms?.[`trusted_logo_${i + 1}` as keyof typeof homeCms];
              return (
                <div
                  key={`b-${i}`}
                  className="w-52 h-32 shrink-0 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50"
                >
                  {logo ? (
                    <img src={logo} alt={`Logo ${i + 1}`} className="h-20 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-[10px] text-gray-300 font-mono">logo_{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-10 px-4">
          {homeCms?.trusted_subtitle || "Trusted partners van Awareness in Business"}
        </p>
        <div className="mt-6 flex justify-center px-4">
          <Button
            size="lg"
            className="bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
            asChild
          >
            <a href={homeCms?.trusted_cta_url || "https://awarenessinbusiness.com"} target="_blank" rel="noopener noreferrer">
              {homeCms?.trusted_cta || "Meer over Awareness in Business"}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
