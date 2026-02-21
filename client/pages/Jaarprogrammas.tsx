import HeroSection from "@/components/HeroSection";

export default function Jaarprogrammas() {
  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/incompany-training-vrouw.png"
        backgroundImageAlt="incompany ontwikkeling training vrouw"
        backgroundPosition="center top"
        title="Jaarprogramma's"
        subtitle="Langlopende bedrijfstrajecten voor duurzame groei van jonge vrouwelijke professionals."
      />

      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Duurzame impact</h2>
          <p className="text-lg text-gray-700">
            Een jaarprogramma combineert coaching, groepssessies en praktische tools die direct toepasbaar zijn in de dagelijkse praktijk.
          </p>
        </div>
      </section>
    </div>
  );
}
