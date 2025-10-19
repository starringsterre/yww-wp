import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OnsVerhaal() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Ons Verhaal
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Ontdek hoe Young Wise Women ontstaan is en wat ons drijft
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Onze Missie
              </h2>
              <p className="text-lg text-neutral-700 mb-4">
                We geloven dat jonge vrouwen verdienen het om tijd voor
                zichzelf te nemen. Tijd voor reflectie, rust en ruimte.
              </p>
              <p className="text-lg text-neutral-700 mb-4">
                Young Wise Women biedt een veilige plek waar je jezelf volledig
                mag zijn, je vragen mag stellen, en luistert naar je innerlijke
                wijsheid.
              </p>
              <p className="text-lg text-neutral-700">
                We helpen je om bewuste keuzes te maken in je carrière en leven,
                zodat je kunt groeien naar de beste versie van jezelf.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Voor Wie
              </h2>
              <p className="text-lg text-neutral-700 mb-4">
                Dit retreat is speciaal ontworpen voor jonge professionals (24+)
                die:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Op zoek zijn naar meer betekenis in hun werk en leven
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Ruimte nodig hebben om stil te staan bij hun doelen
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Willen groeien met steun van een groep gelijkgestemde vrouwen
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Hun carrière opnieuw willen definiëren
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-neutral-700">
                    Praktische tools zoeken voor hun leven en werk
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars of the Retreat */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            De Drie Pijlers van het Retreat
          </h2>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Reflectie
              </h3>
              <p className="text-neutral-700 mb-4">
                Een prachtige omgeving waarin je kunt nadenken over je
                persoonlijke doelen, je patronen, je (betekenvolle) werk en je
                eigen energiehuishouding.
              </p>
              <p className="text-neutral-700">
                Met behulp van een werkboek en trainingen gaan we diep in op wat
                je echt wilt en wat je tegenhoudt.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Rust & Ruimte
              </h3>
              <p className="text-neutral-700 mb-4">
                Je verdient het om even helemaal los te laten van je dagelijkse
                verplichtingen. In een prachtige locatie in de natuur vind je de
                rust en ruimte die je nodig hebt.
              </p>
              <p className="text-neutral-700">
                Alles is voor je geregeld, zodat je je volledig op jezelf en de
                groep kunt concentreren.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Inspiratie & Tools
              </h3>
              <p className="text-neutral-700 mb-4">
                Leer van ervarende coaches en inspirerende vrouwen in de groep.
                Krijg praktische tools en inzichten mee die je direct kunt
                toepassen.
              </p>
              <p className="text-neutral-700">
                Dit weekend gaat je helpen om met meer helderheid, energie en
                zelfvertrouwen naar huis te gaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-12">
            De Verjaardag van het Retreat
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Wat je Loslaat
              </h3>
              <p className="text-neutral-700">
                Zeg vaarwel tegen je 'please-gedrag', jezelf voortdurend
                aanpassen en moeten voldoen aan standaarden en verwachtingen.
              </p>
              <p className="text-neutral-700 mt-2">
                Neem afscheid van bullshitbanen, FOMO en de kans op een burnout.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Wat je Krijgt
              </h3>
              <p className="text-neutral-700">
                Een nieuwe kijk op jezelf, je talenten en je mogelijkheden. Een
                groep vrouwen die je spiegelt en je ondersteunt.
              </p>
              <p className="text-neutral-700 mt-2">
                Praktische tools, helderheid over je keuzes en de drive om in
                beweging te komen.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Je Volgende Stap
              </h3>
              <p className="text-neutral-700">
                Vanaf nu mag je keuzes maken die goed zijn voor jou. Niet door
                harder te werken of te doen wat anderen doen, maar je eigen
                unieke koers te volgen en bewuste keuzes te maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Klaar voor je volgende stap?
          </h2>
          <p className="text-xl text-neutral-700 mb-8">
            Sluit je aan bij een groep gelijkgestemde jonge vrouwen en ontdek
            je eigen wijsheid.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
            asChild
          >
            <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
              Schrijf je in voor het Volgende Retreat
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
