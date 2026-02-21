import HeroSection from "@/components/HeroSection";

export default function LosseWorkshops() {
  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/incompany-training-vrouw.png"
        backgroundImageAlt="incompany ontwikkeling training vrouw"
        backgroundPosition="center top"
        title="Losse workshops"
        subtitle="Flexibele bedrijfstrajecten workshops rond thema's zoals leiderschap, energie en samenwerking."
      />

      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Snel inzetbaar</h2>
          <p className="text-lg text-gray-700">
            Losse workshops zijn ideaal voor teams die direct willen werken aan een specifiek ontwikkelthema.
          </p>
        </div>
      </section>
    </div>
  );
}
