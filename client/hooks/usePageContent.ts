import { useQuery } from "@tanstack/react-query";
import { fetchPageContent } from "@/api/wordpress";
import type { WPPageContent } from "@/api/wp-types";

/**
 * Fetches page-level CMS content for a given slug.
 * Returns a flat key/value map. Use with fallback: data?.field || "hardcoded".
 */
export function usePageContent(slug: string) {
  return useQuery<WPPageContent>({
    queryKey: ["wp", "page", slug],
    queryFn: () => fetchPageContent(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: {},
    retry: 1,
  });
}
