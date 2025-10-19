import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Lightbulb, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Reflectie, Rust & Ruimte
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Een weekend voor jonge professionals (24+) op zoek naar persoonlijke
            groei, betekenisvolle verbinding en een nieuwe koers in hun
            carrière.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
              asChild
            >
              <Link href="https://eepurl.com/h-ZlwT" target="_blank">
                Inschrijven Nu <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link to="/verhaal">Meer Over Ons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Next Retreat Date */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm font-semibold text-primary mb-2">
              VOLGENDE EDITIE
            </p>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              17 - 19 oktober 2025
            </h2>
            <p className="text-neutral-600 mb-6">
              Een weekend in een prachtige vakantiehuis in Nederland
            </p>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
              asChild
            >
              <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                Plaats Je Reservering
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            Wat je meeneemt uit het retreat
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Persoonlijke Groei
              </h3>
              <p className="text-neutral-600">
                Of je nu net een zaadje plant of al als een stevige boom staat,
                je maakt altijd een volgende stap in je ontwikkeling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Eigen Wijsheid
              </h3>
              <p className="text-neutral-600">
                De andere vrouwen zullen jou spiegelen zodat je uitgedaagd
                wordt jezelf en je innerlijke wijsheid volledig te omarmen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Energie & Motivatie
              </h3>
              <p className="text-neutral-600">
                Thema's die al langer in je leven spelen, worden helderder. Je
                voelt richting, duidelijkheid én de drive om in beweging te
                komen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            Wat is inbegrepen
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Intake Sessie
                </h4>
                <p className="text-neutral-600">
                  Persoonlijke intake met een coach om je behoeften in kaart te
                  brengen
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Motivation Factor Test
                </h4>
                <p className="text-neutral-600">
                  Zelftest ter waarde van €145 om je motivatie en doelen
                  duidelijk te maken
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Professionele Begeleiding
                </h4>
                <p className="text-neutral-600">
                  Twee ervarende coaches begeleiden je het hele weekend
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Maaltijden & Accommodatie
                </h4>
                <p className="text-neutral-600">
                  2 nachten in een comfortabel vakantiehuis, alle maaltijden
                  inbegrepen
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Werkboek & Tools
                </h4>
                <p className="text-neutral-600">
                  Praktische tools en een werkboek voor nu en je toekomst
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  1-op-1 Coaching
                </h4>
                <p className="text-neutral-600">
                  Persoonlijke coachingsessies voor jouw specifieke vragen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            Ervaringen van Deelneemsters
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <p className="text-neutral-700 italic mb-4">
                "Een weekend waarbij je in alle rust kan reflecteren op je leven
                en nieuwe inzichten over jezelf kan opdoen, gesteund door andere
                mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen
                leren en elkaar mogen helpen."
              </p>
              <p className="font-semibold text-neutral-900">Melanie de Reus</p>
              <p className="text-sm text-neutral-600">
                Deelnemer September 2023
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <p className="text-neutral-700 italic mb-4">
                "Ik heb een superfijn weekend gehad met Karen, Ella en de andere
                meiden in een geweldig huis in de natuur in Friesland. De sfeer
                was zo veilig en warm, er werd echt naar elkaar geluisterd."
              </p>
              <p className="font-semibold text-neutral-900">Aïsha Lankhorst</p>
              <p className="text-sm text-neutral-600">Deelnemer Januari 2025</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
              <p className="text-neutral-700 italic mb-4">
                "Dit weekend gaf me richting, helderheid en de drive om in
                beweging te komen!"
              </p>
              <p className="font-semibold text-neutral-900">Julia</p>
              <p className="text-sm text-neutral-600">Deelnemer September 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Registration CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-8">
            Investering in Jezelf
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Via Werkgever
              </h3>
              <p className="text-4xl font-bold text-primary mb-6">€1.120</p>
              <p className="text-neutral-600 mb-4">Incl. BTW</p>
              <p className="text-sm text-neutral-600">
                Opleidingstarief voor inschrijvingen vergoed door je werkgever
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Particulier
              </h3>
              <p className="text-4xl font-bold text-primary mb-6">€600</p>
              <p className="text-neutral-600 mb-4">Excl. BTW</p>
              <p className="text-sm text-neutral-600">
                Mogelijkheid betaling in 3 termijnen
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-12">
            <p className="text-neutral-700 mb-4">
              Heb je vragen of wil je meer informatie?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90"
                asChild
              >
                <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                  Schrijf je nu in
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/send?phone=0655334728"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Berichten via WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div>
            <p className="text-neutral-600 mb-2">
              Stuur een mail naar info@awarenessinbusiness.com
            </p>
            <p className="text-neutral-600">
              of bel +31 (0)6 55334728 voor meer informatie
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
