import HeroSection from "@/components/HeroSection";
import InspirationCardsGrid from "@/components/InspirationCardsGrid";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

export default function Inspiratie() {
  const { data: cms } = usePageContent("inspiratie");

  return (
    <div className="w-full">
      <SEOHead
        title="Inspiratie | Young Wise Women"
        description="Verhalen, inzichten en gesprekken die je helpen groeien in werk en leven. Ontdek blogs, podcasts en evenementen."
        path="/inspiratie"
      />
      <HeroSection
        backgroundImage={cms?.hero_image || "https://images.pexels.com/photos/1825206/pexels-photo-1825206.jpeg"}
        title={cms?.hero_title || "Inspiratie"}
        subtitle={cms?.hero_subtitle || "Verhalen, inzichten en gesprekken die je helpen groeien in werk en leven."}
      />

      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="max-w-6xl mx-auto">
          <InspirationCardsGrid />
        </div>
      </section>
    </div>
  );
}
