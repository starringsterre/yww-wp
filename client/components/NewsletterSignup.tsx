import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      toast({
        title: "Ingeschreven!",
        description: "Je bent succesvol ingeschreven voor de nieuwsbrief.",
        duration: 5000,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Fout bij inschrijving",
        description: "Er is iets misgegaan. Probeer het alstublieft opnieuw.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="py-20 px-4 md:px-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(28, 40, 38, 0.4), rgba(28, 40, 38, 0.4)), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop')`,
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Voornaam"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Achternaam"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 transition-all duration-300 hover:scale-105 hover:bg-accent disabled:hover:bg-primary"
              style={{
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Bezig met inschrijven..." : "Inschrijven"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
