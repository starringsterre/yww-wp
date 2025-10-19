import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
    // In a real app, this would send to a backend
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
      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Contact
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Heb je vragen? We helpen je graag verder!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Email</h3>
              <p className="text-neutral-600 mb-4">
                Voor algemene vragen en informatie
              </p>
              <a
                href="mailto:info@awarenessinbusiness.com"
                className="text-primary font-semibold hover:underline"
              >
                info@awarenessinbusiness.com
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Telefoon
              </h3>
              <p className="text-neutral-600 mb-4">
                Voor snelle vragen of inschrijving
              </p>
              <a
                href="tel:+31655334728"
                className="text-primary font-semibold hover:underline"
              >
                +31 (0)6 55334728
              </a>
            </div>

            {/* WhatsApp */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                WhatsApp
              </h3>
              <p className="text-neutral-600 mb-4">
                Direct berichtje sturen is ook mogelijk
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=0655334728"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                Stuur een bericht
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 text-center mb-20">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Adres</h3>
            <p className="text-neutral-700">
              Awareness in Business
              <br />
              1261 TD Blaricum
              <br />
              Nederland
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Stuur ons een Bericht
          </h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-neutral-200">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Jouw Naam *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Vul je naam in"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Jouw Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="jouw@email.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Onderwerp *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Waar gaat je bericht over?"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Bericht *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Wat wil je ons vertellen?"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              Verstuur Bericht
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Veelgestelde Vragen
          </h2>

          <div className="space-y-8">
            <div className="border-b border-neutral-200 pb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Kan ik me nog aanmelden als ik de deadline misgelopen ben?
              </h3>
              <p className="text-neutral-700">
                Ja, dat kan! Neem contact met ons op via email of telefoon. We
                helpen je graag verder en kijken naar mogelijkheden.
              </p>
            </div>

            <div className="border-b border-neutral-200 pb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Is er een betaalplan mogelijk?
              </h3>
              <p className="text-neutral-700">
                Ja, voor particulieren is betaling in 3 termijnen mogelijk. Neem
                contact op voor meer informatie over de betalingsopties.
              </p>
            </div>

            <div className="border-b border-neutral-200 pb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Organiseren jullie ook groepsretreats?
              </h3>
              <p className="text-neutral-700">
                Ja, groepsretreats zijn mogelijk op aanvraag. Dit kan heel
                interessant zijn voor teams of groepen. Laat het ons weten en we
                bespreken de mogelijkheden!
              </p>
            </div>

            <div className="border-b border-neutral-200 pb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Wat als ik niet kan aanwezig zijn op de geplande datum?
              </h3>
              <p className="text-neutral-700">
                Schrijf je in voor de nieuwsbrief zodat je op de hoogte bent van
                volgende edities. We organiseren regelmatig nieuwe retreats.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Hoe voorberei ik me voor op het retreat?
              </h3>
              <p className="text-neutral-700">
                Na je inschrijving krijg je alle informatie en ontvang je een
                persoonlijke intake met een van onze coaches. Dit helpt ons om
                het retreat perfect op jou af te stemmen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Klaar om te Beginnen?
          </h2>
          <p className="text-lg text-neutral-700 mb-8">
            Schrijf je nu in en maak je plek veilig voor het volgende retreat!
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
            asChild
          >
            <a href="https://eepurl.com/h-ZlwT" target="_blank" rel="noopener noreferrer">
              Plaats je Reservering
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
