import { useMemo, useState } from "react";

import HeroSection from "@/components/HeroSection";
import { cn } from "@/lib/utils";

type Episode = {
  id: number;
  title: string;
  teaser?: string;
  duration: string;
  date: string;
  guest: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    title: "Episode 1",
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

const sourceOptions = ["Alle platformen", "YouTube", "Spotify"];
const guestOptions = ["Alle gasten", "Met gast", "Zonder gast"];

function getYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }
    const id = parsed.searchParams.get("v");
    return id || null;
  } catch {
    return null;
  }
}

function getThumbnailUrl(episode: Episode): string {
  if (episode.thumbnailUrl) return episode.thumbnailUrl;
  const videoId = getYoutubeVideoId(episode.youtubeUrl);
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return "https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg";
}

function getPreviewUrl(episode: Episode): string {
  const videoId = getYoutubeVideoId(episode.youtubeUrl);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
}

export default function Podcasts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("Alle platformen");
  const [guestFilter, setGuestFilter] = useState("Alle gasten");
  const [activeEpisodeId, setActiveEpisodeId] = useState<number | null>(null);
  const [shareMenuOpenId, setShareMenuOpenId] = useState<number | null>(null);
  const [copiedEpisodeId, setCopiedEpisodeId] = useState<number | null>(null);

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return episodes.filter((episode) => {
      const hasYoutube = Boolean(episode.youtubeUrl);
      const hasSpotify = Boolean(episode.spotifyUrl);
      const hasGuest = Boolean(episode.guest.trim());

      const sourceMatch =
        sourceFilter === "Alle platformen" ||
        (sourceFilter === "YouTube" && hasYoutube) ||
        (sourceFilter === "Spotify" && hasSpotify);

      const guestMatch =
        guestFilter === "Alle gasten" ||
        (guestFilter === "Met gast" && hasGuest) ||
        (guestFilter === "Zonder gast" && !hasGuest);

      const searchMatch =
        !normalizedQuery ||
        episode.title.toLowerCase().includes(normalizedQuery) ||
        episode.teaser?.toLowerCase().includes(normalizedQuery) ||
        episode.guest.toLowerCase().includes(normalizedQuery);

      return sourceMatch && guestMatch && searchMatch;
    });
  }, [guestFilter, searchTerm, sourceFilter]);

  const canUseHoverEffects =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleCardEnter = (id: number) => {
    if (canUseHoverEffects) {
      setActiveEpisodeId(id);
    }
  };

  const handleCardLeave = () => {
    setActiveEpisodeId(null);
  };

  const getEpisodeShareUrl = (episode: Episode): string => {
    if (episode.youtubeUrl) return episode.youtubeUrl;
    if (episode.spotifyUrl) return episode.spotifyUrl;
    if (typeof window !== "undefined") {
      return `${window.location.origin}/inspiratie/podcasts#episode-${episode.id}`;
    }
    return `/inspiratie/podcasts#episode-${episode.id}`;
  };

  const handleCopyShareLink = async (episode: Episode) => {
    const shareUrl = getEpisodeShareUrl(episode);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedEpisodeId(episode.id);
      setShareMenuOpenId(null);
      window.setTimeout(() => {
        setCopiedEpisodeId((current) => (current === episode.id ? null : current));
      }, 1600);
    } catch {
      setCopiedEpisodeId(null);
    }
  };

  return (
    <div className="w-full">
      <HeroSection
        backgroundImage="/podcast-vrouwen.jpeg"
        backgroundImageAlt="Podcastopname met jonge vrouwen"
        title="Podcasts"
        subtitle="Luister naar verhalen, gesprekken en inzichten die je verder brengen."
      />

      <section className="bg-[#fbf9f5] px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center">
          <label className="sr-only" htmlFor="podcast-search">
            Zoek aflevering
          </label>
          <input
            id="podcast-search"
            type="search"
            placeholder="Zoek op titel, teaser of gast"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-11 w-full rounded-md border border-[#d7d2c8] bg-white px-4 text-sm text-[#1c2826] placeholder:text-[#69726f] focus:outline-none focus:ring-2 focus:ring-primary md:flex-1"
          />

          <label className="sr-only" htmlFor="source-filter">
            Filter op platform
          </label>
          <select
            id="source-filter"
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="h-11 rounded-md border border-[#d7d2c8] bg-white px-3 text-sm text-[#1c2826] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="guest-filter">
            Filter op type gast
          </label>
          <select
            id="guest-filter"
            value={guestFilter}
            onChange={(event) => setGuestFilter(event.target.value)}
            className="h-11 rounded-md border border-[#d7d2c8] bg-white px-3 text-sm text-[#1c2826] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {guestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="min-h-screen bg-[#fbf9f5] px-4 pb-20 md:px-8 flex items-center">
        <div className="group/episodes mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {filteredEpisodes.map((episode) => {
            const previewUrl = getPreviewUrl(episode);
            const hasPreview = Boolean(previewUrl);
            const isActive = activeEpisodeId === episode.id;
            const hasAnotherActive = activeEpisodeId !== null && !isActive;
            const guest = episode.guest.trim() || "n.v.t.";
            const shareUrl = getEpisodeShareUrl(episode);
            const shareTitle = `${episode.title} | Young Wise Women Podcasts`;
            const shareBody = `${shareTitle}\n${shareUrl}`;
            const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
            const mailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareBody)}`;
            const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            const isShareOpen = shareMenuOpenId === episode.id;
            const isCopied = copiedEpisodeId === episode.id;

            return (
              <article
                key={episode.id}
                id={`episode-${episode.id}`}
                tabIndex={0}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-white p-4 shadow-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "[@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:hover:shadow-xl",
                )}
                onMouseEnter={() => handleCardEnter(episode.id)}
                onMouseLeave={handleCardLeave}
                onFocus={() => handleCardEnter(episode.id)}
                onBlur={handleCardLeave}
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-[#ece8df]">
                  {isActive && hasPreview ? (
                    <iframe
                      title={`${episode.title} preview`}
                      src={previewUrl}
                      className="h-full w-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <img
                      src={getThumbnailUrl(episode)}
                      alt={`${episode.title} thumbnail`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-[#1c2826]">{episode.title}</h3>
                <p className="mt-1 text-sm text-[#4f5b58]">
                  {episode.duration} • {episode.date} • Gast: {guest}
                </p>
                {episode.teaser ? (
                  <p className="mt-2 text-sm text-[#5c6663]">{episode.teaser}</p>
                ) : null}

                <div className="mt-4 flex items-center justify-end gap-3">
                  <div className="relative">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isShareOpen}
                      aria-label={`${episode.title} delen`}
                      onClick={() =>
                        setShareMenuOpenId((current) => (current === episode.id ? null : episode.id))
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d0c4] text-[#1c2826] transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path
                          d="M7 12a2 2 0 1 0 0 .01V12Zm10-6a2 2 0 1 0 0 .01V6ZM17 18a2 2 0 1 0 0 .01V18ZM8.73 11.05l6.54-3.1m-6.54 5l6.54 3.1"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {isShareOpen ? (
                      <div
                        role="menu"
                        className="absolute right-0 z-20 mt-2 min-w-44 rounded-xl border border-[#e2dbce] bg-white p-2 shadow-lg"
                      >
                        <a
                          href={whatsappShareUrl}
                          target="_blank"
                          rel="noreferrer"
                          role="menuitem"
                          className="block rounded-lg px-3 py-2 text-sm text-[#1c2826] hover:bg-[#f6f2ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={() => setShareMenuOpenId(null)}
                        >
                          Deel via WhatsApp
                        </a>
                        <a
                          href={mailShareUrl}
                          role="menuitem"
                          className="mt-1 block rounded-lg px-3 py-2 text-sm text-[#1c2826] hover:bg-[#f6f2ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={() => setShareMenuOpenId(null)}
                        >
                          Deel via e-mail
                        </a>
                        <a
                          href={linkedinShareUrl}
                          target="_blank"
                          rel="noreferrer"
                          role="menuitem"
                          className="mt-1 block rounded-lg px-3 py-2 text-sm text-[#1c2826] hover:bg-[#f6f2ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={() => setShareMenuOpenId(null)}
                        >
                          Deel via LinkedIn
                        </a>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => void handleCopyShareLink(episode)}
                          className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-[#1c2826] hover:bg-[#f6f2ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          Kopieer link
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <a
                    href={episode.youtubeUrl || "#"}
                    target={episode.youtubeUrl ? "_blank" : undefined}
                    rel={episode.youtubeUrl ? "noreferrer" : undefined}
                    aria-label={`${episode.title} op YouTube`}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                      episode.youtubeUrl
                        ? "border-[#d6d0c4] text-[#1c2826] hover:bg-[#fff3ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        : "cursor-not-allowed border-[#ece8df] text-[#b8b2a8]",
                    )}
                    onClick={(event) => {
                      if (!episode.youtubeUrl) event.preventDefault();
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M21.58 7.19a2.94 2.94 0 0 0-2.07-2.07C17.68 4.6 12 4.6 12 4.6s-5.68 0-7.51.52A2.94 2.94 0 0 0 2.42 7.2 30.1 30.1 0 0 0 2 12a30.1 30.1 0 0 0 .42 4.81 2.94 2.94 0 0 0 2.07 2.07c1.83.52 7.51.52 7.51.52s5.68 0 7.51-.52a2.94 2.94 0 0 0 2.07-2.07A30.1 30.1 0 0 0 22 12a30.1 30.1 0 0 0-.42-4.81ZM10.2 15.01V8.99L15.4 12l-5.2 3.01Z" />
                    </svg>
                  </a>

                  <a
                    href={episode.spotifyUrl || "#"}
                    target={episode.spotifyUrl ? "_blank" : undefined}
                    rel={episode.spotifyUrl ? "noreferrer" : undefined}
                    aria-label={`${episode.title} op Spotify`}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                      episode.spotifyUrl
                        ? "border-[#d6d0c4] text-[#1c2826] hover:bg-[#eefbf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        : "cursor-not-allowed border-[#ece8df] text-[#b8b2a8]",
                    )}
                    onClick={(event) => {
                      if (!episode.spotifyUrl) event.preventDefault();
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm4.46 14.05a.76.76 0 0 1-1.04.25 8.66 8.66 0 0 0-8.76-.56.76.76 0 1 1-.73-1.33 10.2 10.2 0 0 1 10.31.67.76.76 0 0 1 .22.97Zm1.49-2.45a.95.95 0 0 1-1.3.31 10.84 10.84 0 0 0-10.95-.7.95.95 0 1 1-.84-1.7 12.74 12.74 0 0 1 12.86.82.95.95 0 0 1 .23 1.27Zm.13-2.61a12.95 12.95 0 0 0-13.07-.82 1.14 1.14 0 0 1-1.03-2.03 15.24 15.24 0 0 1 15.39.95 1.14 1.14 0 1 1-1.29 1.9Z" />
                    </svg>
                  </a>
                </div>
                {isCopied ? (
                  <p className="mt-2 text-right text-xs text-[#4f5b58]">Link gekopieerd</p>
                ) : null}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-20 rounded-2xl bg-white transition-opacity duration-300",
                    canUseHoverEffects && hasAnotherActive ? "opacity-55" : "opacity-0",
                  )}
                />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
