export default function Retreats() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-96 bg-gray-100 py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Onze Retreats
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ontdek de transformatieve retraites die speciaal zijn ontworpen voor jonge vrouwen die hun innerlijke wijsheid willen ontdekken en hun authentieke zelf omarmen.
          </p>
        </div>
      </section>

      {/* Retreat Options Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Wat onze Retreats zo bijzonder maakt
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Retreat Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "#b7b7a4" }}>
                  <span className="text-white font-medium">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Persoonlijke Begeleiding
                </h3>
                <p className="text-gray-600">
                  Ontvang aandacht van ervaren coaches die je ondersteunen bij je persoonlijke groei en zelfontdekking.
                </p>
              </div>
            </div>

            {/* Retreat Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "#b7b7a4" }}>
                  <span className="text-white font-medium">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Veilige Gemeenschap
                </h3>
                <p className="text-gray-600">
                  Omring jezelf met gelijkgestemde vrouwen in een veilige en ondersteunende omgeving.
                </p>
              </div>
            </div>

            {/* Retreat Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "#b7b7a4" }}>
                  <span className="text-white font-medium">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Natuurlijke Omgeving
                </h3>
                <p className="text-gray-600">
                  Verbind je met jezelf en de natuur op prachtige locaties, weg van de drukke stadse wereld.
                </p>
              </div>
            </div>

            {/* Retreat Feature 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md" style={{ backgroundColor: "#b7b7a4" }}>
                  <span className="text-white font-medium">4</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Praktische Gereedschappen
                </h3>
                <p className="text-gray-600">
                  Leer technieken en oefeningen die je kunt gebruiken voor je verdere persoonlijke ontwikkeling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Retreats Section */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: "#b7b7a4" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center text-white mb-16">
            Komende Retreats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Retreat Card 1 */}
            <div className="bg-white rounded-lg p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-sm font-semibold text-gray-600 mb-2">OKTOBER 2025</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Young Wise Women Retreat
              </h3>
              <p className="text-gray-600 mb-6">
                Drie dagen waarin je jezelf volledig mag zijn en samen met andere vrouwen op zoek gaat naar je authentieke zelf en innerlijke wijsheid.
              </p>
              <div className="mb-6 text-sm text-gray-700">
                <p className="mb-2"><span className="font-semibold">Datum:</span> 17-19 oktober 2025</p>
                <p className="mb-2"><span className="font-semibold">Locatie:</span> Friesland</p>
                <p><span className="font-semibold">Prijs:</span> Op aanvraag</p>
              </div>
              <a
                href="/kalender"
                className="inline-block px-6 py-2 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: "#98a481" }}
              >
                Bekijk meer details
              </a>
            </div>

            {/* Retreat Card 2 */}
            <div className="bg-white rounded-lg p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-sm font-semibold text-gray-600 mb-2">2026</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Zomer Retreat
              </h3>
              <p className="text-gray-600 mb-6">
                Een revitaliserende zomereditie van ons retreat waar je jezelf mag herstellen en helemaal opnieuw kunt ontdekken.
              </p>
              <div className="mb-6 text-sm text-gray-700">
                <p className="mb-2"><span className="font-semibold">Datum:</span> Binnenkort bekend</p>
                <p className="mb-2"><span className="font-semibold">Locatie:</span> TBD</p>
                <p><span className="font-semibold">Prijs:</span> Op aanvraag</p>
              </div>
              <button
                disabled
                className="inline-block px-6 py-2 rounded-lg font-medium text-white opacity-50 cursor-not-allowed"
                style={{ backgroundColor: "#98a481" }}
              >
                Binnenkort beschikbaar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Klaar om jezelf te ontdekken?
          </h2>
          <p className="text-gray-600 mb-8">
            Schrijf je in voor één van onze komende retreats en begin je reis naar zelfontdekking en persoonlijke transformatie.
          </p>
          <a
            href="/kalender"
            className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#98a481" }}
          >
            Bekijk de kalender
          </a>
        </div>
      </section>
    </div>
  );
}
