import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const testimonials = [
  {
    name: "Lisanne de Moel",
    date: "Deelnemer Januari 2025",
    quote:
      "Een heel fijn weekend gehad op de boerderij in Friesland. Wat is het leuk om een weekend te spenderen met allemaal vrouwen die elkaar aanmoedigen en van wie je kan leren. Ik vond het een hele waardevolle ervaring, waarbij je echt even tijd voor jezelf mag en kan nemen. Ella en Karin stelden de juiste vragen, waardoor je interessante inzichten over jezelf doet.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F8bd83a1cca6e455095fbc2cce26f0452?format=webp&width=800",
  },
  {
    name: "Melanie de Reus",
    date: "Deelnemer September 2023",
    quote:
      "Een weekend waarbij je in alle rust kan reflecteren op je leven en nieuwe inzichten over jezelf kan op doen, gesteund door andere mooie vrouwen. We hebben als jonge vrouwen van elkaar mogen leren en elkaar mogen helpen. Ontzettend mooie en waardevolle inzichten op gedaan!",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fc5eef54d11c9437abf49ea4fe7b69596?format=webp&width=800",
  },
  {
    name: "Aïsha Lankhorst",
    date: "Deelnemer Januari 2025",
    quote:
      "Ik heb een superfijn weekend gehad met Karen, Ella en de andere meiden in een geweldig huis in de natuur in Friesland. De sfeer was zo veilig en warm, er werd echt naar elkaar geluisterd. We hebben veel van Karen en Ella geleerd, maar ook van elkaar als groep. Ik heb echt het gevoel dat ik weer een stapje verder kan zetten, zowel op persoonlijk als op professioneel vlak. Wat ik ook erg waardeerde was dat er naast alle diepe en mooie gespreken veel ruimte was voor luchtigheid en gezelligheid met elkaar. Ik kan dit retreat echt aanraden, want de inzichten en ervaringen die ik heb opgedaan, neem ik voor de rest van mijn leven mee.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fb56ba9e008fe487cbc9f8dae8d42a849?format=webp&width=800",
  },
  {
    name: "Marina Feyz",
    date: "Deelnemer",
    quote:
      "Ik heb er geen andere woorden voor dan 'echt geweldig'! Ondanks dat ik de andere meiden van tevoren niet kende, voelde het vrijwel direct zo vertrouwd en zo warm. Ik had het gevoel dat iedereen helemaal zichzelf kon zijn en er een hele veilige omgeving was om je kwetsbaar op te stellen. Zowel Ella als Wineke zijn beiden prachtige vrouwen die mij nieuwe inzichten hebben gegeven, die ik tot op de dag vandaag nog steeds toepas. Wat vullen jullie elkaar goed aan! En dat allemaal in een prachtige omgeving in de natuur. Ik had niet meer kunnen wensen. Onwijs dankbaar voor deze onvergetelijke ervaring.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2F6a36df5bf8b047eaafd0b1579b1fcf62?format=webp&width=800",
  },
  {
    name: "Julia",
    date: "Deelnemer September 2023",
    quote:
      "Het young wise women retreat was een hele fijne en leerzame ervaring. Vol oefeningen maar ook ruimte voor eigen ideeën. De begeleiding van Ella en Wineke is professioneel en duidelijk, waar zowel lichaam en geest aan bod komen. Ik heb zo veel inspiratie en wijsheid gehaald uit hun oefeningen en ideeën, maar ook uit de verhalen van andere deelnemers. Het is niet erg als je niet met een specifieke leervraag naar dit weekend komt, zie het als een jaarlijkse 'APK' van je mentale gezondheid. Heel erg waardevol!",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Ff29681ec3e8841db98437ca5e7175eb1?format=webp&width=800",
  },
  {
    name: "Julia Bleeker",
    date: "Deelnemer September 2023",
    quote:
      "Het retreat van Ella en Wineke was voor mij een ontzettend fijn en betekenisvol weekend. Door middel van opdrachten en verbindende gesprekken, heb ik in een veilige en rustige setting veel helderheid en inzicht gekregen in mijn behoeftes en talenten. We waren midden in de natuur en alles werd voor ons verzorgd. Naast dat ik het fijn vond met de andere meiden in de groep, heb ik veel geleerd wat ik kan toepassen in de keuzes voor jezelf en in mijn werk.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F5a9469c697e2499eab1b2d92d6c4e731%2Fbdc3b23ee87f40b48865669c690e579d?format=webp&width=800",
  },
];

export default function OnsVerhaal() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Ons Verhaal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek wat Young Wise Women betekent en wat ons drijft
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            De Drie Pijlers van het Retreat
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                1. Reflectie
              </h3>
              <p className="text-gray-700 mb-3">
                De ideale omgeving voor reflectie op je persoonlijke doelen, je patronen, je (betekenvolle) werk en je eigen energiehuishouding. Met behulp van een werkboek en trainingen gaan we diep in op wat je echt wilt en wat je tegenhoudt.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                2. Rust & Ruimte
              </h3>
              <p className="text-gray-700 mb-3">
                Ervaar de rust en ruimte op een prachtige locatie in een vakantiehuis in Friesland, samen met een groep gelijkgestemde jonge professionals (24+). Alles is voor je geregeld, zodat je je volledig op jezelf en de groep kunt concentreren.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                3. Inspiratie & Nieuwe Tools
              </h3>
              <p className="text-gray-700 mb-3">
                Een weekend (re)treat waarin je een nieuwe kijk op jezelf krijgt, je ervaringen en inzichten deelt, en nieuwe praktische tools krijgt aangereikt voor nu en je toekomst als bevordering voor jou als young professional in je carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Experience */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            Jouw Transformatie
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-3">
                Waar je Afscheid van Neemt
              </h3>
              <p className="text-gray-700 mb-2">
                Zeg vaarwel aan je 'please-gedrag' - jezelf voortdurend aanpassen en moeten voldoen aan standaarden en verwachtingen.
              </p>
              <p className="text-gray-700">
                Neem afscheid van bullshitbanen, FOMO en de kans op een burnout.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-3">
                Wat je Meeneemt
              </h3>
              <p className="text-gray-700 mb-2">
                Persoonlijke groei - of je nu net een zaadje plant of al als een stevige boom staat, je maakt altijd een volgende stap in je ontwikkeling.
              </p>
              <p className="text-gray-700 mb-2">
                Eigen wijsheid - de andere vrouwen zullen jou spiegelen zodat je uitgedaagd wordt jezelf en je innerlijke wijsheid volledig te omarmen.
              </p>
              <p className="text-gray-700">
                Nieuwe energie en motivatie - thema's die al langer in je leven spelen, worden helderder. Je voelt richting, duidelijkheid én de drive om in beweging te komen.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 bg-white p-6 rounded-r-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-3">
                Jouw Volgende Stap
              </h3>
              <p className="text-gray-700">
                Kies nu voor betekenisvol, vitaal en gelukkig leven en werken en word die geweldige vrouw die je bedoeld bent te zijn. Niet door harder te werken of te doen wat anderen doen, maar je eigen unieke koers te volgen en bewuste keuzes te maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16">
            Voor Wie is dit Retreat
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Dit retreat is speciaal ontworpen voor jonge professionals (24+) die:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Op zoek zijn naar meer betekenis in hun werk en leven
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Ruimte nodig hebben om stil te staan bij hun doelen
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Willen groeien met steun van een groep gelijkgestemde vrouwen
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Hun carrière opnieuw willen definiëren
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                ✓ Praktische tools zoeken voor hun leven en werk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Stemmen van Deelneemsters
          </h2>

          <div className="max-w-4xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>
    </div>
  );
}
