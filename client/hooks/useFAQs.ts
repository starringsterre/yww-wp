import { useQuery } from "@tanstack/react-query";
import { fetchFAQs } from "@/api/wordpress";
import type { WPFAQ } from "@/api/wp-types";

/**
 * Fetches FAQ items, optionally filtered by page slug.
 * Provide fallbackData inline where used.
 */
export function useFAQs(pageSlug?: string) {
  return useQuery<WPFAQ[]>({
    queryKey: ["wp", "faqs", pageSlug || "all"],
    queryFn: () => fetchFAQs(pageSlug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: [],
    retry: 1,
  });
}
