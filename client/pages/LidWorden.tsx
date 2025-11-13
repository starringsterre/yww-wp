import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import FloatingBrandsSection from "@/components/FloatingBrandsSection";
import HeroSection from "@/components/HeroSection";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";

export default function LidWorden() {
  const [formData, setFormData] = useState({
    naam: "",
    telefoonnummer: "",
    email: "",
    mailchimp: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    {
      title: "Verhalen Delen",
      description: "Deel je persoonlijke verhalen en ervaringen met gelijkgestemde vrouwen in een veilige omgeving.",
    },
    {
      title: "Samen Samenkomen",
      description: "Ontmoet andere vrouwen in het Netwerk op regelmatige bijeenkomsten en events.",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Split naam into first and last name
    const nameParts = formData.naam.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Submit to n8n webhook if checkbox is checked
    if (formData.mailchimp) {
      try {
        const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

        if (!n8nWebhookUrl) {
          console.warn("n8n webhook URL not configured. Please set VITE_N8N_WEBHOOK_URL environment variable.");
        } else {
          const response = await fetch(n8nWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: formData.email,
              firstName: firstName,
              lastName: lastName,
              phone: formData.telefoonnummer,
              fullName: formData.naam,
              subscribeToNewsletter: true,
              subscribedAt: new Date().toISOString()
            })
          });

          if (!response.ok) {
            console.error("n8n webhook error:", response.statusText);
          }
        }

      } catch (err) {
        console.error("n8n webhook submission error:", err);
      }
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
      <HeroSection
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F86170904cb9547f4ad68517ede94266e?format=webp&width=2000"
        title="Lid worden van het Young Wise Women Netwerk"
        subtitle="Sluit je aan bij een groep young professionals die elkaar ondersteunen, inspireren en samen groeien. Lidmaatschap is gratis."
      />

      {/* Benefits Section */}
      <section className="min-h-screen pt-20 pb-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
            Voordelen van Lidmaatschap
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Het Young Wise Women Netwerk is een plek waar je jezelf volledig kunt uiten en groeien. Deelname is volledig gratis.
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
                    style={{ backgroundColor: "#B46555" }}
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

      {/* Companies Section */}
      <FloatingBrandsSection />

      {/* Registration Form Section */}
      <section className="py-14 px-4 md:px-8" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
            Schrijf je in
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
                Ja, ik wil in de WhatsApp Community groepchats en op de hoogte gehouden worden!
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-3 text-base bg-primary text-white hover:bg-accent hover:scale-105"
            >
              Ik word gratis lid van het Netwerk
            </Button>

            {/* Note */}
            <p className="text-xs text-gray-600 text-center mt-6">
              We respecteren je privacy. Je gegevens worden alleen gebruikt om je in aanraking te brengen met het Young Wise Women Netwerk.
            </p>
          </form>
        </div>
      </section>

      <RetreatTestimonialsSection />
    </div>
  );
}
