import { useState, useEffect } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-advance carousel every 3 seconds, but pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container with overflow hidden */}
      <div className="w-full overflow-hidden mb-4">
        {/* Inner carousel that slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}%))`,
          }}
        >
          {/* Each testimonial item - full width */}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex gap-8 md:gap-12 items-start flex-shrink-0"
              style={{ width: "100%", boxSizing: "border-box", minWidth: "100%" }}
            >
              {/* Profile Image & Info - Left Side */}
              <div className="flex-shrink-0 hidden sm:flex sm:flex-col sm:items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-900 text-center">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {testimonial.date}
                </p>
              </div>

              {/* Testimonial Quote - Right Side */}
              <div className="flex-grow max-w-2xl flex flex-col h-full relative">
                {/* Decorative quote mark - top right */}
                <span
                  className="absolute z-10"
                  style={{
                    right: 0,
                    top: 0,
                    fontSize: "88px",
                    color: "#D9E9DF",
                    opacity: 0.8,
                    lineHeight: "1",
                    fontFamily: "Inter, DM Sans, sans-serif",
                    fontWeight: "300",
                  }}
                >
                  "
                </span>

                <div
                  className="relative"
                  style={{ padding: "16px 48px 0" }}
                >
                  <p
                    className="text-gray-700"
                    style={{
                      fontSize: "20px",
                      lineHeight: "1.6",
                      fontStyle: "italic",
                      marginLeft: "-1px",
                    }}
                  >
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots - Centered Below */}
      <div className="flex gap-3 justify-center">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="rounded-full transition-all"
            style={{
              width: "12px",
              height: "12px",
              backgroundColor:
                index === currentIndex
                  ? "#98a481"
                  : "rgba(200, 200, 200, 0.5)",
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
