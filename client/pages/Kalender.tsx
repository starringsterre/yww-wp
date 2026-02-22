import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import EventCalendar from "@/components/EventCalendar";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroSection from "@/components/HeroSection";

export default function Kalender() {
  return (
    <div className="w-full">
      {/* Hero */}
      <HeroSection
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F291b0682317740babd189a82623e6509?format=webp&width=2000"
        title="Evenementen Kalender"
        subtitle="Volgende evenementen van het Young Wise Women Netwerk"
      />

      {/* Event Calendar */}
      <EventCalendar />

      {/* Upcoming Retreat */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-primary">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary mb-2">
                4DE EDITIE
              </p>
              <h3 className="text-4xl font-light text-gray-900 mb-2">
                Young Wise Women Weekend Intensive
              </h3>
              <p className="text-gray-600">Reflectie, Rust & Ruimte: een meerdaagse training voor persoonlijke ontwikkeling</p>
            </div>

            <div className="space-y-5 mb-8 pb-8 border-b border-gray-200">
              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    24 - 26 juni 2026
                  </p>
                  <p className="text-gray-600">
                    Vrijdag 17:30 uur tot Zondag 16:00 uur
                  </p>
                  <p className="text-gray-600">
                    Daarna: 16 - 18 oktober 2026
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Prachtige Vakantiehuis in de Natuur aan het water
                  </p>
                  <p className="text-gray-600">Oudega, Friesland</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Voor Jonge Professional Vrouwen (24-29)
                  </p>
                  <p className="text-gray-600">Beperkte plaatsen beschikbaar</p>
                </div>
              </div>
            </div>

            {/* Program Overview */}
            <div className="mb-8">
              <h4 className="text-xl font-medium text-gray-900 mb-6">
                Programmaoverzicht
              </h4>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    Dag 1 - Vrijdag
                  </p>
                  <p className="text-gray-700 text-sm">
                    Aankomst vanaf 17:30 uur • Kennismaking met de andere
                    vrouwen • Bespreken van bevindingen uit Motivation Factor
                    test • Avondwandeling of rust • Deelronde, reflectiemomenten
                    en ademsessie voor een goede nachtrust
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    Dag 2 - Zaterdag
                  </p>
                  <p className="text-gray-700 text-sm">
                    Ochtend: yogasessie of fysieke activiteit • Ontbijt •
                    Verlangens (zakelijk en privé): richting vinden, omgaan met
                    twijfel en heldere keuzes maken • Lunch • Werken aan
                    beperkende overtuigingen en blokkades; mentale en fysieke
                    loslating • 1-op-1 coaching • Reflectiemomenten en rust •
                    Avond: deelronde buiten bij het vuur
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">
                    Dag 3 - Zondag
                  </p>
                  <p className="text-gray-700 text-sm">
                    Ochtend: fysieke activiteit (yoga/wandeling/energetisch
                    lichaamswerk) • Ontbijt • Loslaten van niet-dienende zaken;
                    manifesteren van verlangens met Motivation Factor werkboek •
                    Lunch • Middag: afsluiting met een spel om energie,
                    vertrouwen en focus te brengen • Vertrek rond 17:00 uur
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-white hover:bg-accent hover:scale-105 py-3"
              asChild
            >
              <a href="/persoonlijke-ontwikkeling-training-vrouwen-weekend-intensive-juni-2026">
                Bevestig je deelname
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="min-h-screen py-20 px-4 md:px-8 bg-gray-50 flex items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Eenmalige Investering in jezelf
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Via Werkgever
              </h3>
              <p className="text-5xl font-light text-primary mb-2">€1.450</p>
              <p className="text-sm text-gray-600 mb-6">excl. BTW</p>
              <p className="text-gray-700 text-sm">
                Opleidingstarief voor inschrijvingen vergoed door je werkgever.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Wat er jou oplevert
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-700 text-sm">
                  <span className="font-medium">Persoonlijke groei</span> – een
                  volgende stap in je ontwikkeling
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-medium">Eigen wijsheid</span> – je
                  worden uitgedaagd jezelf volledig te omarmen
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-medium">Nieuwe energie</span> –
                  helderheid, richting en de drive om in beweging te komen
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h4 className="font-medium text-gray-900 mb-4">
              Wat is Inbegrepen
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  Intake van tevoren met de coach om je behoeften in kaart te
                  brengen
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  Motivation Factor self-assessment ter waarde van €145
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  Persoonlijke professionele begeleiding van twee coaches
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Ontbijt, lunch, diner en versnaperingen</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  2 nachten accommodatie in comfortabele tweepersoonskamers
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Werkboek en praktische tools voor je toekomst</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <NewsletterSignup />
    </div>
  );
}
