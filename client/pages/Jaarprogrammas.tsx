import HeroSection from "@/components/HeroSection";
import { usePageContent } from "@/hooks/usePageContent";

export default function Jaarprogrammas() {
  const { data: cms } = usePageContent("jaarprogrammas");

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/incompany-training-vrouw.png"
        backgroundImageAlt="incompany ontwikkeling training vrouw"
        backgroundPosition="center top"
        title={cms?.hero_title || "Jaarprogramma's"}
        subtitle={cms?.hero_subtitle || "Langlopende bedrijfstrajecten voor duurzame groei van jonge vrouwelijke professionals."}
      />

      <section className="min-h-screen py-20 px-4 md:px-8 bg-white flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">{cms?.section_heading || "Duurzame impact"}</h2>
          <p className="text-lg text-gray-700">
            {cms?.section_text || "Een jaarprogramma combineert coaching, groepssessies en praktische tools die direct toepasbaar zijn in de dagelijkse praktijk."}
          </p>
        </div>
      </section>
    </div>
  );
}
