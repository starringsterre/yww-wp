import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const videoUrl =
    "https://cdn.builder.io/o/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F57a6cd627628468aba1862c033c976da?alt=media&token=7af99d8c-ced3-4c9a-b043-ee4b50c73cc0&apiKey=5a9469c697e2499eab1b2d92d6c4e731";
  const ellaImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fedaf553c26414cd5af248f8c42bec4bb?format=webp&width=800";
  const lieneImageUrl =
    "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F11834262257d4b5287de33d164171bdd?format=webp&width=800";

  return (
    <div className="w-full">
      {/* Hero Video Section */}
      <section className="relative w-full h-screen min-h-96 bg-black overflow-hidden">
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
          <h1 className="text-5xl md:text-7xl font-light mb-4 max-w-3xl">
            Young Wise Women
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
            De community voor jonge wijze vrouwen
          </p>
          <Button
            size="lg"
            className="bg-pink-300 text-gray-900 hover:bg-pink-400 border-0"
            asChild
          >
            <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
              Bekijk Retreat
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
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Young Wise Women organiseert verschillende evenementen waarin jonge professionals (24+) samenkomen voor persoonlijke groei. Van meerdaagse retreats tot middagjes waar we verhalen en kennis uitwisselen - allemaal onder begeleiding en met gelijkgestemden die dezelfde waarden delen.
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
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900">
            Wat je Meeneemt uit het Retreat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">💫</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Persoonlijke Groei
              </h3>
              <p className="text-sm text-gray-600">
                Of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">🌟</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Eigen Wijsheid
              </h3>
              <p className="text-sm text-gray-600">
                De andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">⚡</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Energie & Motivatie
              </h3>
              <p className="text-sm text-gray-600">
                Je voelt richting, duidelijkheid en de drive om in beweging te komen
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-4xl">🛠️</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Praktische Handvatten
              </h3>
              <p className="text-sm text-gray-600">
                Nieuwe, praktische tools die je direct kunt toepassen in je leven en carrière
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
              Onze Coaches
            </h2>
            <p className="text-gray-600">
              Ervaren en inspirerende trainers met jaren van praktijk en begeleiding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Coach Card 1 - Ella */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={ellaImageUrl}
                  alt="Ella"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  Ella
                </h3>
                <p className="text-sm text-gray-600">
                  Certified Vinyasa Flow en meditatie instructeur
                </p>
              </div>
            </div>

            {/* Coach Card 2 - Liene */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={lieneImageUrl}
                  alt="Liene"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  Liene
                </h3>
                <p className="text-sm text-gray-600">
                  Certified Hatha Yoga en stretchings instructeur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Retreat Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Volgende Editie: 17-19 oktober 2025
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Weekend Retreat
                </h3>
                <p className="text-gray-700 mb-3">
                  Ervaar rust en ruimte op een prachtige locatie in de natuur, samen met gelijkgestemde jonge professionals (24+).
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
                  <li>✓ Alle maaltijden</li>
                  <li>✓ Werkboek & praktische tools</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Investering in jezelf
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">We gaan ervan uit dat je werkgever het vergoed</p>
                  <p className="text-3xl font-bold text-primary">€1.120</p>
                  <p className="text-xs text-gray-600">incl. BTW</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                  Plaats je Reservering
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Wat voorgaande deelneemsters zeggen
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                "Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan opdoen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten opgedaan!"
              </p>
              <p className="font-medium text-gray-900">Melanie de Reus</p>
              <p className="text-sm text-gray-600">Deelnemer September 2023</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                "Ik heb een superfijn weekend gehad met Karen, Ella en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep."
              </p>
              <p className="font-medium text-gray-900">Aïsha Lankhorst</p>
              <p className="text-sm text-gray-600">Deelnemer Januari 2025</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                "Dit weekend gaf me richting, helderheid en de drive om in beweging te komen!"
              </p>
              <p className="font-medium text-gray-900">Julia</p>
              <p className="text-sm text-gray-600">Deelnemer September 2023</p>
            </div>
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
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-light text-gray-900 mb-2">
              Blijf op de hoogte voor de volgende editie
            </h2>
            <p className="text-gray-600 mb-6">
              Abonneer je op onze nieuwsbrief en ontvang meldingen over toekomstige Young Wise Women retreats.
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Je naam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="je@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Kies gewenste maand</option>
                  <option>Januari</option>
                  <option>Februari</option>
                  <option>Maart</option>
                  <option>April</option>
                  <option>Mei</option>
                  <option>Juni</option>
                  <option>Juli</option>
                  <option>Augustus</option>
                  <option>September</option>
                  <option>Oktober</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
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
