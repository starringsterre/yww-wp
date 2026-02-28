import { useWPContent } from "./useWPContent";
import { fetchTestimonials } from "@/api/wordpress";
import { testimonials as fallbackData } from "@/lib/testimonials";
import type { WPTestimonial } from "@/api/wp-types";

const fallbackTestimonials: WPTestimonial[] = fallbackData.map((t, i) => ({
  id: i + 1,
  name: t.name,
  date: t.date,
  quote: t.quote,
  image: t.image,
  order: i + 1,
}));

export function useTestimonials() {
  return useWPContent({
    queryKey: ["wp", "testimonials"],
    queryFn: fetchTestimonials,
    fallbackData: fallbackTestimonials,
  });
}
