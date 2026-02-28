import { useWPContent } from "./useWPContent";
import { fetchPodcasts } from "@/api/wordpress";
import type { WPPodcast } from "@/api/wp-types";

const fallbackPodcasts: WPPodcast[] = [
  {
    id: 1,
    title: "Episode 1",
    teaser: "",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=l5WYmKOh6TI&t=3s",
    spotifyUrl: "",
  },
  {
    id: 2,
    title: "Episode 2",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=oodyR6UYDBY",
    spotifyUrl: "",
  },
  {
    id: 3,
    title: "Episode 3",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    id: 4,
    title: "Episode 4",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    id: 5,
    title: "Episode 5",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
  {
    id: 6,
    title: "Episode 6",
    teaser: "Korte teaser (1 zin) over deze aflevering.",
    duration: "00:00",
    date: "2026-02-15",
    guest: "",
    thumbnailUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
  },
];

export function usePodcasts() {
  return useWPContent({
    queryKey: ["wp", "podcasts"],
    queryFn: fetchPodcasts,
    fallbackData: fallbackPodcasts,
  });
}
