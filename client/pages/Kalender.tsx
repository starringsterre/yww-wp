import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import EventCalendar from "@/components/EventCalendar";

export default function Kalender() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Community Kalender
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Volgende evenementen en retreats van Young Wise Women
          </p>
        </div>
      </section>

      {/* Event Calendar */}
      <EventCalendar />

      {/* Upcoming Retreat */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Volgende Retreat
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-2 border-primary">
            <div className="mb-8">
              <p className="text-sm font-medium text-primary mb-2">
                3DE EDITIE
              </p>
              <h3 className="text-4xl font-light text-gray-900 mb-2">
                Young Wise Women Weekend Retreat
              </h3>
              <p className="text-gray-600">Reflectie, Rust & Ruimte</p>
            </div>

            <div className="space-y-6 mb-10 pb-10 border-b border-gray-200">
              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    17 - 19 oktober 2025
                  </p>
                  <p className="text-gray-600">
                    Vrijdag 17:30 uur tot Zondag 17:00 uur
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Prachtige Vakantiehuis in de Natuur
                  </p>
                  <p className="text-gray-600">
                    Nederland (afwisselend tussen Friesland en Limburg)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Voor Jonge Professionals 24+
                  </p>
                  <p className="text-gray-600">
                    Beperkte plaatsen beschikbaar
                  </p>
                </div>
              </div>
            </div>

            {/* Program Overview */}
            <div className="mb-10">
              <h4 className="text-xl font-medium text-gray-900 mb-6">
                Programmaoverzicht
              </h4>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Dag 1 - Vrijdag</p>
                  <p className="text-gray-700 text-sm">
                    Aankomst vanaf 17:30 uur • Kennismaking met de andere vrouwen • Bespreken van bevindingen uit Motivation Factor test • Avondwandeling of rust • Deelronde, reflectiemomenten en ademsessie voor een goede nachtrust
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Dag 2 - Zaterdag</p>
                  <p className="text-gray-700 text-sm">
                    Ochtend: yogasessie of fysieke activiteit • Ontbijt • Verlangens (zakelijk en privé): richting vinden, omgaan met twijfel en heldere keuzes maken • Lunch • Werken aan beperkende overtuigingen en blokkades; mentale en fysieke loslating • 1-op-1 coaching • Reflectiemomenten en rust • Avond: deelronde buiten bij het vuur
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Dag 3 - Zondag</p>
                  <p className="text-gray-700 text-sm">
                    Ochtend: fysieke activiteit (yoga/wandeling/energetisch lichaamswerk) • Ontbijt • Loslaten van niet-dienende zaken; manifesteren van verlangens met Motivation Factor werkboek • Lunch • Middag: afsluiting met een spel om energie, vertrouwen en focus te brengen • Vertrek rond 17:00 uur
                  </p>
                </div>
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
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Eenmalige Investering in jezelf
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Via Werkgever
              </h3>
              <p className="text-5xl font-light text-primary mb-2">€1.120</p>
              <p className="text-sm text-gray-600 mb-6">incl. BTW</p>
              <p className="text-gray-700 text-sm">
                Opleidingstarief voor inschrijvingen vergoed door je werkgever
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Particulier
              </h3>
              <p className="text-5xl font-light text-primary mb-2">€600</p>
              <p className="text-sm text-gray-600 mb-6">excl. BTW</p>
              <p className="text-gray-700 text-sm">
                Mogelijkheid tot betalen in 3 termijnen
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h4 className="font-medium text-gray-900 mb-4">
              Wat is Inbegrepen
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Intake van tevoren met de coach om je behoeften in kaart te brengen</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Motivation Factor self-assessment ter waarde van €145</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Persoonlijke professionele begeleiding van twee coaches</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Ontbijt, lunch, diner en versnaperingen</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>2 nachten accommodatie in comfortabele tweepersoonskamers</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Werkboek en praktische tools voor je toekomst</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-4">
            Deze Datum Past Niet in je Agenda?
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            We organiseren regelmatig nieuwe edities van het Young Wise Women retreat. Schrijf je in voor de nieuwsbrief en wees als eerste op de hoogte van de volgende gelegenheid.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-700 mb-6 font-medium">
              Of neem contact op via WhatsApp of e-mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700 py-3"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/send?phone=0655334728"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 py-3"
                asChild
              >
                <a href="mailto:info@awarenessinbusiness.com">
                  E-mail
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
