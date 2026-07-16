import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import ImageLightbox from "@/components/ImageLightbox";
import { useBlogs } from "@/hooks/useBlogs";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

export default function Blogs() {
  const { data: blogItems } = useBlogs();
  const { data: cms } = usePageContent("tools-en-handvatten");
  return (
    <div className="w-full">
      <SEOHead
        slug="tools-en-handvatten"
        title="Blogs & Artikelen voor Jonge Vrouwen | Young Wise Women"
        description="Praktische en verdiepende artikelen over persoonlijke ontwikkeling, leiderschap en groei voor jonge professionals."
        path="/inspiratie/tools-en-handvatten"
      />
      <div className="hidden md:block">
        <HeroSection
          backgroundImage={"/inspiratie-tools-en-handvatten.jpg"}
          title={cms?.hero_title || "Tools & Handvatten"}
          subtitle={"Inzichten, verhalen en handvatten over jong vrouwelijk talent."}
        />
      </div>
      <div className="md:hidden">
        <HeroSection
          backgroundImage={"/inspiratie-tools-handvatten-mobile.jpg"}
          title={cms?.hero_title || "Tools & Handvatten"}
          subtitle={"Inzichten, verhalen en handvatten over jong vrouwelijk talent."}
        />
      </div>

      <section className="min-h-screen py-16 lg:py-20 px-4 md:px-8 bg-[#f3f2ef] flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gray-500/70 flex-1" />
            <div className="h-px bg-gray-500/70 flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {(blogItems ?? []).map((item) => (
              <article key={item.id} className="group">
                <ImageLightbox
                  src={item.image}
                  alt={item.title}
                  containerClassName="aspect-[4/3] overflow-hidden bg-white rounded-2xl"
                  imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pt-4">
                  <Link to={`/inspiratie/tools-en-handvatten/${item.slug || item.id}`}>
                    <h2 className="uppercase tracking-[0.08em] text-2xl md:text-3xl leading-tight text-[#21252d] transition-all duration-200 group-hover:text-[#B46555]">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-base md:text-lg text-[#2f333a] leading-relaxed max-w-[38ch]">
                    {item.excerpt}
                  </p>
                  <Link
                    to={`/inspiratie/tools-en-handvatten/${item.slug || item.id}`}
                    className="relative self-start mt-5 inline-flex text-sm font-medium text-[#6B705C] origin-right after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-right after:scale-x-100 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-0"
                  >
                    Lees meer
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
