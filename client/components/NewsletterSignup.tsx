import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  return (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Voornaam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Achternaam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  required
                />
              </div>
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
                backgroundColor: "rgb(120, 110, 100)",
                opacity: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.75";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
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
  );
}
