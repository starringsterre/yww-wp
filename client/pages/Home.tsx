import { Button } from "@/components/ui/button";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";
import SlideInLeft from "@/components/SlideInLeft";
import SlideInRight from "@/components/SlideInRight";
import BlurReveal from "@/components/BlurReveal";
import StaggerChildren from "@/components/StaggerChildren";
import CoachCardsGrid from "@/components/CoachCardsGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import InspirationCardsGrid from "@/components/InspirationCardsGrid";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";
import FloatingBrandsSection from "@/components/FloatingBrandsSection";
import GroeiScanSection from "@/components/GroeiScanSection";
import PromoVideoSection from "@/components/PromoVideoSection";
import { Flower, Zap, Heart, Hammer } from "lucide-react";
import { useCoaches } from "@/hooks/useCoaches";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const { data: coaches } = useCoaches();
  const { data: cms } = usePageContent("home");
  const videoUrl =
    cms?.hero_video_url || "https://cdn.builder.io/o/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6a83a06db694d329132c995244a4ae5?alt=media&token=37e09b99-1fdb-4c85-a0ff-f319faa2bf31&apiKey=264b1b44affb4c70ba84c30b9a51f9df";
  return (
    <div className="w-full">
      <SEOHead
        title="Young Wise Women | Persoonlijke Ontwikkeling voor Jonge Vrouwen"
        description="Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren. Ontdek trainingen, weekenden en workshops voor persoonlijke groei."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Young Wise Women",
          url: "https://youngwisewomen.nl",
          logo: "https://youngwisewomen.nl/Logo-Young-Wise-Women.png",
          description: "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren.",
          email: "info@youngwisewomen.nl",
        }}
      />
      {/* Hero Video Section */}
      <section className="relative w-full h-screen min-h-screen bg-black overflow-hidden" style={{ marginTop: "0" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <h1
            className="text-5xl md:text-7xl font-light max-w-3xl"
            style={{ margin: "3px 0 16px" }}
          >
            {cms?.hero_title || "Young Wise Women"}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
            {cms?.hero_subtitle || "Het Netwerk voor jonge vrouwelijke professionals"}
          </p>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-gray-900">
            {cms?.atmosphere_heading || "Evenementen voor persoonlijke ontwikkeling"}
          </h2>
          <p
            className="text-center text-gray-600 mx-auto mb-12"
            style={{ maxWidth: "735px" }}
          >
            {cms?.atmosphere_text || "Young Wise Women organiseert verschillende evenementen waarin jonge professionals (24+) samenkomen voor persoonlijke groei. Van meerdaagse retreats tot middagjes waar we verhalen en kennis uitwisselen - allemaal onder begeleiding en met gelijkgestemden die dezelfde waarden delen."}
          </p>

          {/* Three Image Cards */}
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            animationType="blur-reveal"
            staggerDelay={200}
          >
            <div data-stagger-child className="opacity-0 aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img loading="lazy"
                src={cms?.atmosphere_image_1 || "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fe09ac73d09854b79ab26b9a2f1b621b1?format=webp&width=4000"}
                alt="Sunset nature moment"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div data-stagger-child className="opacity-0 aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img loading="lazy"
                src={cms?.atmosphere_image_2 || "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F359000dab9a94eb6b59fca5e2668ce4f?format=webp&width=4000"}
                alt="Netwerk group gathering"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div data-stagger-child className="opacity-0 aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img loading="lazy"
                src={cms?.atmosphere_image_3 || "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fba09bc28922e4f28ae356e7db1c5a2f4?format=webp&width=4000"}
                alt="Mentoring and connection"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </StaggerChildren>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
              asChild
            >
              <a href="/inspiratie/evenementen">{cms?.atmosphere_cta || "Bekijk evenementen"}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#B8B7A3" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollFadeInUp as="h2" className="text-4xl md:text-5xl font-light text-white mb-4">
              {cms?.benefits_heading || "Wat Young Wise Women trajecten opleveren"}
            </ScrollFadeInUp>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              {cms?.benefits_intro || "Of je nu kiest voor een workshop of weekendtraining: je ontwikkelt inzichten en tools die direct doorwerken in je werk en dagelijks leven."}
            </p>
          </div>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            animationType="slide-in-left"
            staggerDelay={150}
          >
            {/* Benefit 1 */}
            <div data-stagger-child className="opacity-0 rounded-2xl p-8 text-center shadow-sm relative top-0 transition-[top,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-top-3 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Flower size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.benefit_1_title || "Persoonlijke Groei"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.benefit_1_text || "Of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling"}
              </p>
            </div>

            {/* Benefit 2 */}
            <div data-stagger-child className="opacity-0 rounded-2xl p-8 text-center shadow-sm relative top-0 transition-[top,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-top-3 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Heart size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.benefit_2_title || "Eigen Wijsheid"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.benefit_2_text || "De andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen"}
              </p>
            </div>

            {/* Benefit 3 */}
            <div data-stagger-child className="opacity-0 rounded-2xl p-8 text-center shadow-sm relative top-0 transition-[top,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-top-3 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Zap size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.benefit_3_title || "Energie & Motivatie"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.benefit_3_text || "Je voelt richting, duidelijkheid en de drive om in beweging te komen"}
              </p>
            </div>

            {/* Benefit 4 */}
            <div data-stagger-child className="opacity-0 rounded-2xl p-8 text-center shadow-sm relative top-0 transition-[top,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-top-3 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "#FBF9F5" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(251, 249, 245, 0.85)" }}>
                  <Hammer size={32} style={{ color: "#6B705C" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {cms?.benefit_4_title || "Praktische Handvatten"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cms?.benefit_4_text || "Nieuwe, praktische tools die je direct kunt toepassen in je leven en carrière"}
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>

      <FloatingBrandsSection />

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <PromoVideoSection />
        </div>
      </section>

      {/* Trainingen Spotlight */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-[#FBF9F5] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img loading="lazy"
                src={cms?.trainingen_image || "https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F25e2fbcf9b2d4e6e939dee29a85f190a?format=webp&width=1800"}
                alt="Weekend trainingen en dag workshops"
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                {cms?.trainingen_heading || "Weekend trainingen & Dag workshops"}
              </h2>
              <p className="text-gray-700 mb-6">
                {cms?.trainingen_text || "Kies de vorm die past bij jouw ontwikkelvraag: verdieping in een weekend of direct toepasbare tools in een dagworkshop."}
              </p>
              <Button
                size="lg"
                className="bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
                asChild
              >
                <a href="/groepstrainingen">{cms?.trainingen_cta || "Meer over persoonlijke ontwikkeling"}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GroeiScanSection />

      <RetreatTestimonialsSection />

      {/* Coaches Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollFadeInUp as="h2" className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
              {cms?.coaches_heading || "Onze Coaches"}
            </ScrollFadeInUp>
            <p className="text-gray-600">
              {cms?.coaches_intro || "Ervaren en inspirerende trainers met jaren van praktijk en begeleiding"}
            </p>
          </div>

          <p
            className="mx-auto text-center text-gray-700 mb-12"
            style={{ maxWidth: "817px" }}
          >
            {cms?.coaches_text || "Onze coaches zijn ervaren en inspirerende vrouwen die zich volledig inzetten voor jouw persoonlijke groei. Met hun diepgaande kennis, warmte en betrokkenheid creëren zij een veilige ruimte waarin jij jezelf volledig mag zijn. Onder hun begeleiding ontdek je je innerlijke wijsheid en krijg je praktische tools mee voor je leven na het retreat."}
          </p>

          <div className="mb-10 text-center">
            <Button
              size="lg"
              className="bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
              asChild
            >
              <a href="/ons-verhaal">{cms?.coaches_cta || "Lees ons unieke verhaal"}</a>
            </Button>
          </div>

          <CoachCardsGrid coaches={coaches ?? []} />
        </div>
      </section>

      {/* Next Retreat Section */}
      <section
        className="py-14 px-4 md:px-8"
        style={{ backgroundColor: "#B8B7A3" }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center text-white mb-8">
            {cms?.next_retreat_heading || "Volgende weekend intensive editie: 24-26 juni 2026"}
          </h2>

          <ScrollFadeInUp className="rounded-lg max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  {cms?.next_retreat_date_text || "Weekend training (intensief)"}
                </h3>
                <p className="text-gray-700 mb-3">
                  {cms?.next_retreat_description || "Ervaar rust en ruimte op een prachtige locatie in de natuur, samen met gelijkgestemde jonge professionals (24-29)."}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  {cms?.next_retreat_time || "Vrijdag 17:30 uur - Zondag 17:00 uur"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Wat is Inbegrepen
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {cms?.inclusions
                    ? cms.inclusions.split("\n").filter(Boolean).map((item: string, i: number) => (
                        <li key={i}>✓ {item.replace(/^✓\s*/, "")}</li>
                      ))
                    : (
                      <>
                        <li>✓ Intake met coach</li>
                        <li>
                          <p>
                            <span style={{ fontSize: "14px" }}>✓</span>{" "}
                            Motivation Factor test (€145 waarde)
                          </p>
                        </li>
                        <li>✓ Professionele begeleiding van twee coaches</li>
                        <li>✓ Ademsessie (breathwork) met Chris Rauwendaal</li>
                        <li>✓ Yogalessen</li>
                        <li>✓ 2 nachten accommodatie</li>
                        <li>
                          <p>✓ Alle maaltijden en dranken</p>
                        </li>
                        <li>
                          <p>✓ Werkboek en praktische tools</p>
                        </li>
                      </>
                    )
                  }
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 auto-rows-fr">
                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {cms?.investment_heading || "Investering in jezelf"}
                  </h3>
                  <div
                    className="bg-gray-50 rounded-lg flex-1 transition-transform duration-300 hover:scale-105"
                    style={{ padding: "24px 24px 54px", marginBottom: "-2px" }}
                  >
                    <p className="text-4xl font-bold text-primary mb-2">
                      {cms?.investment_price || "€1450"}
                    </p>
                    <p className="text-xs text-gray-600 mb-4">excl. BTW</p>
                    <p className="text-xs text-gray-600 italic">
                      <br />
                      {cms?.investment_note || "Vergoed uit het opleidingstarief van je werkgever. Boek de training via het portaal."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {cms?.results_heading || "Wat er jou oplevert"}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg flex-1 transition-transform duration-300 hover:scale-105">
                    <ul className="space-y-4 text-sm">
                      <li className="text-gray-700 flex items-start gap-3">
                        <Flower
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "#6B705C" }}
                        />
                        <span>
                          {cms?.result_1 || <><span className="font-medium">Persoonlijke groei</span>{" "}– een volgende stap in je ontwikkeling</>}
                        </span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-3">
                        <Heart
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "#6B705C" }}
                        />
                        <span>
                          {cms?.result_2 || <><span className="font-medium">Eigen wijsheid</span>{" "}– je wordt uitgedaagd jezelf volledig te omarmen</>}
                        </span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-3">
                        <Zap
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "#6B705C" }}
                        />
                        <span>
                          {cms?.result_3 || <><span className="font-medium">Nieuwe energie & praktische tools</span>{" "}– helderheid, richting en de drive om in beweging te komen</>}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-white py-3 transition-all duration-300 hover:scale-105 hover:bg-accent"
                asChild
              >
                <a href="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026">
                  Plaats je Reservering
                </a>
              </Button>
            </div>
            </div>
          </ScrollFadeInUp>
        </div>
      </section>

      {/* Bedrijfstrajecten Hero Block */}
      <section
        className="relative min-h-screen px-4 md:px-8 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(rgba(28, 40, 38, 0.45), rgba(28, 40, 38, 0.45)), url('${cms?.bedrijf_image || "/incompany-training-vrouw.png"}')`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            {cms?.bedrijf_heading || "Bedrijfstrajecten"}
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            {cms?.bedrijf_text || "Voor organisaties die jonge vrouwelijke professionals gericht willen laten groeien in leiderschap, energie en eigenaarschap."}
          </p>
          <Button
            size="lg"
            className="bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
            asChild
          >
            <a href="/in-company">{cms?.bedrijf_cta || "Bekijk bedrijfstrajecten"}</a>
          </Button>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="max-w-6xl mx-auto">
          <InspirationCardsGrid showTitle />
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <NewsletterSignup />
    </div>
  );
}
