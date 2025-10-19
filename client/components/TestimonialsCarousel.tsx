import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface Testimonial {
  name: string;
  date: string;
  quote: string;
  image: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className="flex gap-8 md:gap-12 items-start">
      {/* Profile Image - Left Side */}
      <div className="flex-shrink-0 hidden sm:block">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
          <img
            src={current.image}
            alt={current.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Testimonial Content - Right Side */}
      <div className="flex-grow flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4 flex-grow">
          <span
            className="text-7xl leading-none flex-shrink-0 -mt-4"
            style={{ color: "rgba(80, 70, 61, 1)", fontFamily: "Georgia, serif", fontWeight: "bold" }}
          >
            "
          </span>
          <p className="text-lg text-gray-700 italic leading-relaxed min-h-72">
            {current.quote}
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-900 mb-1">{current.name}</p>
          <p className="text-sm text-gray-600 mb-6">{current.date}</p>
        </div>

        {/* Navigation Arrows Only */}
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(80, 70, 61, 0.2)",
              color: "rgba(80, 70, 61, 1)",
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgb(255, 181, 192)",
              color: "white",
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
