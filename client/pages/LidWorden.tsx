import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import MemberStats from "@/components/MemberStats";

export default function LidWorden() {
  const [formData, setFormData] = useState({
    naam: "",
    telefoonnummer: "",
    email: "",
    mailchimp: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [memberCount, setMemberCount] = useState(45);

  const benefits = [
    {
      title: "Verhalen Delen",
      description: "Deel je persoonlijke verhalen en ervaringen met gelijkgestemde vrouwen in een veilige omgeving.",
    },
    {
      title: "Samen Samenkomen",
      description: "Ontmoet andere vrouwen in de community op regelmatige bijeenkomsten en events.",
    },
    {
      title: "Samen Dingen Organiseren",
      description: "Werk samen met andere leden aan activiteiten, workshops en projecten.",
    },
    {
      title: "Steun en Verbinding",
      description: "Maak deel uit van een ondersteunende gemeenschap waar je jezelf kunt zijn.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Increment member count if mailchimp is checked
    if (formData.mailchimp) {
      setMemberCount(prev => prev + 1);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        naam: "",
        telefoonnummer: "",
        email: "",
        mailchimp: true,
      });
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white" style={{ marginBottom: "-4px" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Lid worden van de Young Wise Women Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sluit je aan bij een groep vrouwen die elkaar ondersteunen, inspireren en groeien samen.
          </p>
        </div>
      </section>

      {/* Member Stats Section */}
      <MemberStats memberCount={memberCount} />

      {/* Benefits Section */}
      <section className="pb-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
            Voordelen van Lidmaatschap
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            De Young Wise Women Community is een plek waar je jezelf volledig kunt uiten en groeien.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-gray-50 hover:bg-white"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#ffb5c0" }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
            Schrijf je In
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Vul het formulier in en sluit je aan! Het lidmaatschap is gratis.
          </p>

          {submitted && (
            <div className="mb-8 p-6 rounded-lg border border-green-200 bg-green-50">
              <p className="text-green-800 text-center font-medium">
                ✓ Bedankt! We ontvangen je inschrijving en sturen je binnenkort meer informatie.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            {/* Naam */}
            <div className="mb-6">
              <label
                htmlFor="naam"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Naam <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="naam"
                name="naam"
                value={formData.naam}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Je volledige naam"
              />
            </div>

            {/* Telefoonnummer */}
            <div className="mb-6">
              <label
                htmlFor="telefoonnummer"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Telefoonnummer <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefoonnummer"
                name="telefoonnummer"
                value={formData.telefoonnummer}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+31 (0)6 12345678"
              />
            </div>

            {/* Email */}
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                E-mailadres <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="jij@email.com"
              />
            </div>

            {/* Mailchimp Checkbox */}
            <div className="mb-8 flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="mailchimp"
                name="mailchimp"
                checked={formData.mailchimp}
                onChange={handleChange}
                className="mt-1 w-4 h-4 cursor-pointer accent-primary"
              />
              <label
                htmlFor="mailchimp"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Ja, ik wil me aanmelden voor de nieuwsbrief van Young Wise Women en op de hoogte blijven van updates, events en aanbiedingen.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-3 text-base"
              style={{ backgroundColor: "#98a481", color: "white" }}
            >
              Schrijf Me In - Gratis!
            </Button>

            {/* Note */}
            <p className="text-xs text-gray-600 text-center mt-6">
              We respecteren je privacy. Je gegevens worden alleen gebruikt om je in aanraking te brengen met de Young Wise Women Community.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
