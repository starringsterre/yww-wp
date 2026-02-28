/**
 * Generic WordPress content fetching hook with fallback support.
 * Uses React Query with staleTime of 5 minutes and hardcoded fallback data.
 */

import { useQuery } from "@tanstack/react-query";

interface UseWPContentOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  fallbackData: T;
}

export function useWPContent<T extends object | unknown[]>({
  queryKey,
  queryFn,
  fallbackData,
}: UseWPContentOptions<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<T>({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: fallbackData as any, // TanStack Query v5 generics workaround
    retry: 1,
  });
}
