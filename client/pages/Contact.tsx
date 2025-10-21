import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Kan ik me nog aanmelden als ik de deadline gemist heb?",
      answer: "Ja, dat kan! Neem contact met ons op via e-mail of telefoon. We helpen je graag verder en kijken naar mogelijkheden.",
    },
    {
      question: "Is er een betalingsplan mogelijk?",
      answer: "Ja, voor particulieren is betaling in 3 termijnen mogelijk. Neem contact op voor meer informatie over de betalingsopties.",
    },
    {
      question: "Organiseren jullie ook groepsretreats?",
      answer: "Ja, groepsretreats zijn mogelijk op aanvraag. Dit kan heel interessant zijn voor teams of groepen. Laat het ons weten en we bespreken de mogelijkheden!",
    },
    {
      question: "Wat als ik niet kan op de geplande datum?",
      answer: "Schrijf je in voor de nieuwsbrief zodat je op de hoogte bent van volgende edities. We organiseren regelmatig nieuwe retreats.",
    },
    {
      question: "Hoe voorberei ik me voor op het retreat?",
      answer: "Na je inschrijving krijg je alle informatie en ontvang je een persoonlijke intake met een van onze coaches. Dit helpt ons om het retreat perfect op jou af te stemmen.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@awarenessinbusiness.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Naam: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Contact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heb je vragen? We helpen je graag verder!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Contactgegevens
              </h2>

              <p className="text-gray-700 mb-8">
                Neem gerust contact op als je vragen hebt over het retreat, groepsretreats of andere mogelijkheden.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <a
                      href="mailto:info@awarenessinbusiness.com"
                      className="text-primary hover:underline"
                    >
                      info@awarenessinbusiness.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Telefoon</p>
                    <a
                      href="tel:+31655334728"
                      className="text-primary hover:underline"
                    >
                      +31 (0)6 55334728
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adres</p>
                    <p className="text-gray-600">
                      1261 TD Blaricum
                      <br />
                      Nederland
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Link */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="text-gray-700 mb-4 font-medium">
                  Of stuur een bericht via WhatsApp:
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
                    Chat via WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Stuur ons een Bericht
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Jouw Naam
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Je naam"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Jouw E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="je@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Onderwerp
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Waar gaat je bericht over?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Wat wil je ons vertellen?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                >
                  Verstuur Bericht
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Kan ik me nog aanmelden als ik de deadline gemist heb?
              </h3>
              <p className="text-gray-700">
                Ja, dat kan! Neem contact met ons op via e-mail of telefoon. We helpen je graag verder en kijken naar mogelijkheden.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is er een betalingsplan mogelijk?
              </h3>
              <p className="text-gray-700">
                Ja, voor particulieren is betaling in 3 termijnen mogelijk. Neem contact op voor meer informatie over de betalingsopties.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Organiseren jullie ook groepsretreats?
              </h3>
              <p className="text-gray-700">
                Ja, groepsretreats zijn mogelijk op aanvraag. Dit kan heel interessant zijn voor teams of groepen. Laat het ons weten en we bespreken de mogelijkheden!
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Wat als ik niet kan op de geplande datum?
              </h3>
              <p className="text-gray-700">
                Schrijf je in voor de nieuwsbrief zodat je op de hoogte bent van volgende edities. We organiseren regelmatig nieuwe retreats.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Hoe voorberei ik me voor op het retreat?
              </h3>
              <p className="text-gray-700">
                Na je inschrijving krijg je alle informatie en ontvang je een persoonlijke intake met een van onze coaches. Dit helpt ons om het retreat perfect op jou af te stemmen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
