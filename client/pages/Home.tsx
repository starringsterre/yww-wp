import { Button } from "@/components/ui/button";
import { useState } from "react";
import ScrollFadeInUp from "@/components/ScrollFadeInUp";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CoachCardsGrid from "@/components/CoachCardsGrid";
import { Flower, Zap, Heart, Hammer } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const videoUrl =
    "https://cdn.builder.io/o/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6a83a06db694d329132c995244a4ae5?alt=media&token=37e09b99-1fdb-4c85-a0ff-f319faa2bf31&apiKey=264b1b44affb4c70ba84c30b9a51f9df";
  const ellaImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=800";
  const lieneImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=800";

  return (
    <div className="w-full">
      {/* Hero Video Section */}
      <section className="relative w-full h-screen min-h-96 bg-black overflow-hidden" style={{ marginTop: "0" }}>
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
            Young Wise Women
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
            De community voor jonge wijze vrouwen
          </p>
          <Button
            size="lg"
            className="text-white hover:opacity-90 border-0 animate-fade-in-up"
            style={{ backgroundColor: "#98a481" }}
            asChild
          >
            <a
              href="/kalender"
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            >
              <p>Bekijk de Community kalender</p>
            </a>
          </Button>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-6 text-gray-900">
            Evenementen voor persoonlijke ontwikkeling
          </h2>
          <p
            className="text-center text-gray-600 mx-auto mb-12"
            style={{ maxWidth: "735px" }}
          >
            Young Wise Women organiseert verschillende evenementen waarin jonge
            professionals (24+) samenkomen voor persoonlijke groei. Van
            meerdaagse retreats tot middagjes waar we verhalen en kennis
            uitwisselen - allemaal onder begeleiding en met gelijkgestemden die
            dezelfde waarden delen.
          </p>

          {/* Three Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fe09ac73d09854b79ab26b9a2f1b621b1?format=webp&width=800"
                alt="Sunset nature moment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F359000dab9a94eb6b59fca5e2668ce4f?format=webp&width=800"
                alt="Community group gathering"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fba09bc28922e4f28ae356e7db1c5a2f4?format=webp&width=800"
                alt="Mentoring and connection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "#b7b7a4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollFadeInUp className="text-4xl md:text-5xl font-light text-white mb-4">
              Wat je meeneemt uit het Retreat
            </ScrollFadeInUp>
            <p className="text-gray-600 mx-auto" style={{ maxWidth: "600px" }}>
              Elk retreat is zorgvuldig ontworpen ter ondersteuning van jouw reis van zelfontdekking en persoonlijke transformatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Flower size={32} style={{ color: "rgb(152, 139, 129)" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Persoonlijke Groei
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Of je nu net een zaadje plant of al als een stevige boom staat,
                je maakt altijd een volgende stap in je ontwikkeling
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Heart size={32} style={{ color: "rgb(152, 139, 129)" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Eigen Wijsheid
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                De andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt
                jezelf en je innerlijke wijsheid volledig te omarmen
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Zap size={32} style={{ color: "rgb(152, 139, 129)" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Energie & Motivatie
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Je voelt richting, duidelijkheid en de drive om in beweging te
                komen
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="rounded-2xl p-8 text-center shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: "rgb(251, 249, 245)" }}>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(152, 139, 129, 0.3)" }}>
                  <Hammer size={32} style={{ color: "rgb(152, 139, 129)" }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Praktische Handvatten
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nieuwe, praktische tools die je direct kunt toepassen in je
                leven en carrière
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollFadeInUp className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
              Onze Coaches
            </ScrollFadeInUp>
            <p className="text-gray-600">
              Ervaren en inspirerende trainers met jaren van praktijk en
              begeleiding
            </p>
          </div>

          <p
            className="mx-auto text-center text-gray-700 mb-12"
            style={{ maxWidth: "817px" }}
          >
            Onze coaches zijn ervaren en inspirerende vrouwen die zich volledig
            inzetten voor jouw persoonlijke groei. Met hun diepgaande kennis,
            warmte en betrokkenheid creëren zij een veilige ruimte waarin jij
            jezelf volledig mag zijn. Onder hun begeleiding ontdek je je
            innerlijke wijsheid en krijg je praktische tools mee voor je leven
            na het retreat.
          </p>

          <CoachCardsGrid
            coaches={[
              {
                name: "Ella Taal",
                image: ellaImageUrl,
                bio: "In 2011 is Awareness in Business opgericht door Ella, ontstaan na een management buy-out bij haar vorige organisatie advies kantoor Second Nature. Al ruim 28 jaar heeft zij ervaring als coach, trainer en organisatie adviseur voor diverse opdrachtgevers in zowel binnen- als buitenland. Ze heeft ervaring van het geven van retreats voor o.a. Management teams, DGA's en CEO's. Ella heeft drie dochters van 27, 25 en 22 en wil graag iets terug doen voor de jongere generatie. Bijdragen aan het welzijn van jonge professionals is een passie die ze door het geven van deze retreats naleeft!",
              },
              {
                name: "Liene Molendijk",
                image: lieneImageUrl,
                bio: "Liene (1997) heeft een achtergrond in Psychologie en Leiderschap & Verandering en werkt inmiddels drie jaar bij grote organisatieadviesbureaus. Ze begeleidt uiteenlopende verandertrajecten in het publieke domein, van teams die anders willen samenwerken tot individuen die zoeken naar persoonlijke groei. De mens staat altijd centraal in haar werk. Daarnaast verdiepte ze zich in yoga- en meditatiefilosofie, wat ze meeneemt in het retreat. Zelf bevindt ze zich op de grens van Gen Z en Millennial, waardoor ze zich goed kan inleven in de uitdagingen en verlangens van jonge professionals.",
              },
            ]}
          />
        </div>
      </section>

      {/* Next Retreat Section */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ backgroundColor: "#b7b7a4", marginRight: "15px" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-white mb-12">
            Volgende Editie: 12-14 juni 2025
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Weekend Retreat
                </h3>
                <p className="text-gray-700 mb-3">
                  Ervaar rust en ruimte op een prachtige locatie in de natuur,
                  samen met gelijkgestemde jonge professionals (24+).
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Vrijdag 17:30 uur - Zondag 17:00 uur
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Wat is Inbegrepen
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Intake met coach</li>
                  <li>✓ Motivation Factor test (€145 waarde)</li>
                  <li>✓ Professionele begeleiding van twee coaches</li>
                  <li>✓ 2 nachten accommodatie</li>
                  <li>
                    <p>✓ Alle maaltijden en dranken</p>
                  </li>
                  <li>
                    <p>✓ Werkboek en praktische tools</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 auto-rows-fr">
                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Investering in jezelf
                  </h3>
                  <div
                    className="bg-gray-50 rounded-lg flex-1"
                    style={{ padding: "24px 24px 54px", marginBottom: "-2px" }}
                  >
                    <p className="text-4xl font-bold text-primary mb-2">
                      €1.450
                    </p>
                    <p className="text-xs text-gray-600 mb-4">excl. BTW</p>
                    <p className="text-xs text-gray-600 italic">
                      <br />
                      Vergoed uit het opleidingstarief van je werkgever.
                      Boek de training via het portaal.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Wat er jou oplevert
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg flex-1">
                    <ul className="space-y-4 text-sm">
                      <li className="text-gray-700 flex items-start gap-3">
                        <Flower
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "rgb(152, 139, 129)" }}
                        />
                        <span>
                          <span className="font-medium">
                            Persoonlijke groei
                          </span>{" "}
                          – een volgende stap in je ontwikkeling
                        </span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-3">
                        <Heart
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "rgb(152, 139, 129)" }}
                        />
                        <span>
                          <span className="font-medium">Eigen wijsheid</span> –
                          je wordt uitgedaagd jezelf volledig te omarmen
                        </span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-3">
                        <Zap
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                          style={{ color: "rgb(152, 139, 129)" }}
                        />
                        <span>
                          <span className="font-medium">
                            Nieuwe energie & praktische tools
                          </span>{" "}
                          – helderheid, richting en de drive om in beweging te
                          komen
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a
                  href="https://eepurl.com/h-ZlwT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plaats je Reservering
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeInUp className="text-4xl font-light text-center text-gray-900 mb-12">
            Wat voorgaande deelneemsters zeggen
          </ScrollFadeInUp>

          <div className="max-w-4xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section
        className="py-20 px-4 md:px-8 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop')`,
        }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="rounded-lg p-6 md:p-8 shadow-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.57)" }}>
            <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-2">
              Blijf op de hoogte voor de volgende editie
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Abonneer je op onze nieuwsbrief en ontvang meldingen over
              toekomstige Young Wise Women evenementen.
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Je naam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="je@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full text-white py-3 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#98a481"
                }}
                asChild
              >
                <a
                  href="https://eepurl.com/h-ZlwT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inschrijven
                </a>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
