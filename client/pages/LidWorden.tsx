import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import FloatingBrandsSection from "@/components/FloatingBrandsSection";
import HeroSection from "@/components/HeroSection";
import PromoVideoSection from "@/components/PromoVideoSection";
import RetreatTestimonialsSection from "@/components/RetreatTestimonialsSection";
import { usePageContent } from "@/hooks/usePageContent";

export default function LidWorden() {
  const { data: cms } = usePageContent("lid-worden");
  const [formData, setFormData] = useState({
    naam: "",
    telefoonnummer: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    {
      title: cms?.benefit_1_title || "Verhalen Delen",
      description: cms?.benefit_1_text || "Deel je persoonlijke verhalen en ervaringen met gelijkgestemde vrouwen in een veilige omgeving.",
    },
    {
      title: cms?.benefit_2_title || "Samen Samenkomen",
      description: cms?.benefit_2_text || "Ontmoet andere vrouwen in het Netwerk op regelmatige bijeenkomsten en events.",
    },
    {
      title: cms?.benefit_3_title || "Samen Dingen Organiseren",
      description: cms?.benefit_3_text || "Werk samen met andere leden aan activiteiten, workshops en projecten.",
    },
    {
      title: cms?.benefit_4_title || "Steun en Verbinding",
      description: cms?.benefit_4_text || "Maak deel uit van een ondersteunende gemeenschap waar je jezelf kunt zijn.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Split naam into first and last name
    const nameParts = formData.naam.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const response = await fetch("/api/netwerk/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: firstName,
          lastName: lastName,
          fullName: formData.naam,
          phone: formData.telefoonnummer,
        })
      });

      if (!response.ok) {
        throw new Error("Netwerk subscription failed");
      }
    } catch (err) {
      console.error("Netwerk subscription error:", err);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        naam: "",
        telefoonnummer: "",
        email: "",
      });
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <HeroSection
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F86170904cb9547f4ad68517ede94266e?format=webp&width=2000"
        title={cms?.hero_title || "Lid worden van het Young Wise Women Netwerk"}
        subtitle={cms?.hero_subtitle || "Sluit je aan bij een groep young professionals die elkaar ondersteunen, inspireren en samen groeien. Lidmaatschap is gratis."}
      />

      {/* Benefits Section */}
      <section className="min-h-screen pt-20 pb-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-gray-900 mb-4 text-center">
            {cms?.benefits_heading || "Voordelen van Lidmaatschap"}
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            {cms?.benefits_intro || "Het Young Wise Women Netwerk is een plek waar je jezelf volledig kunt uiten en groeien. Deelname is volledig gratis."}
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
            {cms?.form_heading || "Schrijf je in"}
          </h2>
          <p className="text-center text-gray-600 mb-12">
            {cms?.form_text || "Vul het formulier in en sluit je aan! Het lidmaatschap is gratis."}
          </p>

          {submitted && (
            <div className="mb-8 p-6 rounded-lg border border-green-200 bg-green-50">
              <p className="text-green-800 text-center font-medium">
                {cms?.form_success || "✓ Bedankt! We ontvangen je inschrijving en sturen je binnenkort meer informatie."}
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

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-3 text-base bg-primary text-white hover:bg-accent hover:scale-105"
            >
              {cms?.form_button || "Ik word gratis lid van het Netwerk"}
            </Button>

            {/* Note */}
            <p className="text-xs text-gray-600 text-center mt-6">
              {cms?.form_privacy || "We respecteren je privacy. Je gegevens worden alleen gebruikt om je in aanraking te brengen met het Young Wise Women Netwerk."}
            </p>
          </form>
        </div>
      </section>

      <RetreatTestimonialsSection />

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <PromoVideoSection />
        </div>
      </section>
    </div>
  );
}
