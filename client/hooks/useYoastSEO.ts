import { useQuery } from "@tanstack/react-query";
import { fetchSEO } from "@/api/wordpress";

export function useYoastSEO(slug: string) {
  return useQuery({
    queryKey: ["wp", "seo", slug],
    queryFn: () => fetchSEO(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}
