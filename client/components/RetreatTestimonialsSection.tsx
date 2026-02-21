import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { InfiniteTwoUpCarousel } from "@/components/InfiniteTwoUpCarousel";

export default function RetreatTestimonialsSection() {
  const controlsRef = useRef<{ next: () => void; prev: () => void } | null>(null);

  const carouselItems = useMemo(
    () =>
      testimonials.map((item) => ({
        quote: item.quote,
        photo: item.image,
        name: item.name,
        role: item.date,
      })),
    [],
  );

  return (
    <section className="bg-[#B8B7A3] overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-12 py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
          <aside className="lg:col-span-5">
            <h2 className="text-[#1C2826] text-4xl md:text-5xl lg:text-6xl leading-tight">
              Ervaringen van deelneemsters
            </h2>
            <p className="mt-8 max-w-xl text-[#1C2826] text-lg leading-relaxed md:text-xl">
              Onze vrouwen in het netwerk nemen ervaringen mee voor het leven.
              Daar zijn we trots op. Een aantal deelneemsters vertellen:
            </p>
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => controlsRef.current?.prev()}
                aria-label="Vorige testimonial"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#1C2826]/25 text-[#1C2826] transition-colors hover:bg-[#FBF9F5]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2826]/30"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => controlsRef.current?.next()}
                aria-label="Volgende testimonial"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#1C2826]/25 text-[#1C2826] transition-colors hover:bg-[#FBF9F5]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2826]/30"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:pt-0">
            <InfiniteTwoUpCarousel
              testimonials={carouselItems}
              onReady={(api) => {
                controlsRef.current = api;
              }}
              renderCard={(item) => (
                <article className="bg-[#FBF9F5] rounded-3xl px-8 pt-8 pb-6 text-[#1C2826] shadow-sm h-auto">
                  <img
                    loading="lazy"
                    src="/quotation.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-auto"
                  />
                  <p className="mt-4 text-sm leading-relaxed">{item.quote}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <img loading="lazy"
                      src={item.photo}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-lg font-semibold">{item.name}</p>
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
