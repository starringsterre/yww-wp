import { useQuery } from "@tanstack/react-query";
import { fetchBlogBySlug } from "@/api/wordpress";

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["wp", "blog", slug],
    queryFn: () => fetchBlogBySlug(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
}
