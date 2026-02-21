import HeroSection from "@/components/HeroSection";
import InspirationCardsGrid from "@/components/InspirationCardsGrid";

export default function Inspiratie() {
  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="https://images.pexels.com/photos/1825206/pexels-photo-1825206.jpeg"
        title="Inspiratie"
        subtitle="Verhalen, inzichten en gesprekken die je helpen groeien in werk en leven."
      />

      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="max-w-6xl mx-auto">
          <InspirationCardsGrid />
        </div>
      </section>
    </div>
  );
}
