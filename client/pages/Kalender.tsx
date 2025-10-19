import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

export default function Kalender() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Community Kalender
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Volgende retreats en bijeenkomsten van Young Wise Women
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12">
            Komende Events
          </h2>

          <div className="space-y-8">
            {/* Main Retreat */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Young Wise Women Weekend Retreat
                  </h3>
                  <p className="text-neutral-600">3de Editie</p>
                </div>
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Aanmelden
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-neutral-900">
                      17 - 19 oktober 2025
                    </p>
                    <p className="text-sm text-neutral-600">
                      Vrijdag 17:30 uur - Zondag 17:00 uur
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Nederland
                    </p>
                    <p className="text-sm text-neutral-600">
                      Prachtige vakantiehuis in de natuur
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Voor jonge professionals 24+
                    </p>
                    <p className="text-sm text-neutral-600">
                      Beperkte plaatsen beschikbaar
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-neutral-900 mb-4">
                  Programmaoverzicht
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-neutral-900 mb-2">Dag 1</p>
                    <p className="text-sm text-neutral-600">
                      Aankomst • Kennismaking • Bevindingen Motivation Factor •
                      Avondwandeling • Reflectie & Ademsessie
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-2">Dag 2</p>
                    <p className="text-sm text-neutral-600">
                      Yogasessie • Workshop Verlangens • Mentale Loslating •
                      1-op-1 Coaching • Avondvuur
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-2">Dag 3</p>
                    <p className="text-sm text-neutral-600">
                      Fysieke Activiteit • Loslaten & Manifesteren • Afsluiting
                      • Vertrek rond 17:00 uur
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90"
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

      {/* Past Events & Newsletter Signup */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Volgende Editie Niet in Jouw Agenda?
          </h2>

          <div className="bg-white border border-neutral-200 rounded-lg p-8">
            <p className="text-neutral-700 mb-6">
              Geen zorgen! We organiseren regelmatig nieuwe edities van het
              Young Wise Women retreat. Schrijf je in voor de nieuwsbrief en
              wees als eerste op de hoogte van de volgende gelegenheid.
            </p>

            <div className="space-y-4">
              <p className="font-semibold text-neutral-900">
                Ontvang updates via de nieuwsbrief:
              </p>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="je@email.com"
                  className="flex-grow px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90"
                  asChild
                >
                  <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
                    Inschrijven
                  </a>
                </Button>
              </form>

              <p className="text-sm text-neutral-600 mt-4">
                Of neem contact op via WhatsApp:
              </p>
              <Button
                size="lg"
                className="w-full bg-green-600 text-white hover:bg-green-700"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/send?phone=0655334728"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stuur een bericht via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Retreat Details & What to Expect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12">
            Wat Mag je Verwachten
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Begeleiding
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Professionele begeleiding van twee coaches
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Persoonlijke intake sessie van tevoren
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    1-op-1 coaching tijdens het weekend
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Inclusief
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    2 nachten accommodatie in comfortabele kamers
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Ontbijt, lunch, diner en versnaperingen
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Motivation Factor test (waarde €145)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Voor Meer Informatie
            </h3>
            <p className="text-neutral-700 mb-6">
              Heb je vragen over de volgende edities, groepsretreats of andere
              mogelijkheden? Neem gerust contact op!
            </p>
            <div className="space-y-3 text-neutral-700">
              <p>
                📧{" "}
                <a
                  href="mailto:info@awarenessinbusiness.com"
                  className="text-primary hover:underline"
                >
                  info@awarenessinbusiness.com
                </a>
              </p>
              <p>
                📱{" "}
                <a href="tel:+31655334728" className="text-primary hover:underline">
                  +31 (0)6 55334728
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
