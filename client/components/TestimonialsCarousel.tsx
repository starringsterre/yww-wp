import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InfiniteTwoUpCarousel } from "@/components/InfiniteTwoUpCarousel";

type Testimonial = {
  quote: string;
  name: string;
  date: string;
  image?: string;
};

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const controlsRef = useRef<{ next: () => void; prev: () => void } | null>(null);

  const carouselItems = useMemo(
    () =>
      testimonials.map((testimonial) => ({
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.date,
        photo: testimonial.image ?? "",
      })),
    [testimonials],
  );

  const goToPrev = () => {
    controlsRef.current?.prev();
  };

  const goToNext = () => {
    controlsRef.current?.next();
  };

  return (
    <section className="min-h-screen bg-[#B8B7A3] flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
          <aside className="lg:col-span-5">
            <h2 className="text-[#1C2826] text-4xl md:text-5xl lg:text-6xl leading-tight">
              Stemmen van voorgaande deelneemsters
            </h2>
            <p className="mt-8 max-w-xl text-[#1C2826] text-lg leading-relaxed md:text-xl">
              Voor al onze partners geldt dat ze zelf het voortouw nemen en opvallen
              door hun innovatiekracht. Daar zijn we trots op. Deze bedrijven hebben
              een duidelijke visie over duurzaamheid en zijn ‘purpose-driven’. Een
              aantal partners vertelt:
            </p>
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Vorige testimonial"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#1C2826]/25 text-[#1C2826] transition-colors hover:bg-[#FBF9F5]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2826]/30"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Volgende testimonial"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#1C2826]/25 text-[#1C2826] transition-colors hover:bg-[#FBF9F5]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2826]/30"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </aside>

          <div className="mt-8 lg:col-span-7 lg:mt-0 lg:pt-24">
            <InfiniteTwoUpCarousel
              testimonials={carouselItems}
              onReady={(api) => {
                controlsRef.current = api;
              }}
              renderCard={(item) => (
                <article className="shrink-0 rounded-3xl bg-[#FBF9F5] text-[#1C2826] px-8 pt-8 pb-6 shadow-sm">
                  <img
                    loading="lazy"
                    src="/quotation.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-auto"
                  />
                  <p className="mt-4 text-base leading-relaxed">{item.quote}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-[#1C2826]/10 flex-shrink-0">
                      {item.photo ? (
                        <img loading="lazy"
                          src={item.photo}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="leading-tight min-w-0">
                      <p className="text-lg font-semibold text-[#1C2826]">{item.name}</p>
                      <p className="text-sm text-[#1C2826]/70">{item.role}</p>
                    </div>
                  </div>
                </article>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
