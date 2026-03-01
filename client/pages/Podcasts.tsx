import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";

import HeroSection from "@/components/HeroSection";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { usePodcasts } from "@/hooks/usePodcasts";
import type { WPPodcast } from "@/api/wp-types";
import SEOHead from "@/components/SEOHead";

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

function getThumbnailUrl(episode: WPPodcast): string {
  if (episode.thumbnailUrl) return episode.thumbnailUrl;
  const videoId = getYoutubeVideoId(episode.youtubeUrl);
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return "https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg";
}

function getPreviewUrl(episode: WPPodcast): string {
  const videoId = getYoutubeVideoId(episode.youtubeUrl);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
}

function getSpotifyEpisodeId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const episodeIndex = parts.findIndex((part) => part === "episode");
    if (episodeIndex === -1) return null;
    return parts[episodeIndex + 1] || null;
  } catch {
    return null;
  }
}

export default function Podcasts() {
  const { data: episodes } = usePodcasts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("Alle platformen");
  const [guestFilter, setGuestFilter] = useState("Alle gasten");
  const [activeEpisodeId, setActiveEpisodeId] = useState<number | null>(null);
  const [shareDialogEpisode, setShareDialogEpisode] = useState<WPPodcast | null>(null);
  const [copiedEpisodeId, setCopiedEpisodeId] = useState<number | null>(null);
  const [copiedEmbedEpisodeId, setCopiedEmbedEpisodeId] = useState<number | null>(null);

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return (episodes ?? []).filter((episode) => {
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

  const getEpisodeShareUrl = (episode: WPPodcast): string => {
    if (episode.youtubeUrl) return episode.youtubeUrl;
    if (episode.spotifyUrl) return episode.spotifyUrl;
    if (typeof window !== "undefined") {
      return `${window.location.origin}/inspiratie/podcasts#episode-${episode.id}`;
    }
    return `/inspiratie/podcasts#episode-${episode.id}`;
  };

  const getEpisodeEmbedCode = (episode: WPPodcast): string => {
    const youtubeId = getYoutubeVideoId(episode.youtubeUrl);
    if (youtubeId) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" title="${episode.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }

    const spotifyEpisodeId = getSpotifyEpisodeId(episode.spotifyUrl);
    if (spotifyEpisodeId) {
      return `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/${spotifyEpisodeId}?utm_source=generator" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    }

    return "";
  };

  const handleCopyShareLink = async (episode: WPPodcast) => {
    const shareUrl = getEpisodeShareUrl(episode);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedEpisodeId(episode.id);
      window.setTimeout(() => {
        setCopiedEpisodeId((current) => (current === episode.id ? null : current));
      }, 1600);
    } catch {
      setCopiedEpisodeId(null);
    }
  };

  const handleCopyEmbedCode = async (episode: WPPodcast) => {
    const embedCode = getEpisodeEmbedCode(episode);
    if (!embedCode) return;

    try {
      await navigator.clipboard.writeText(embedCode);
      setCopiedEmbedEpisodeId(episode.id);
      window.setTimeout(() => {
        setCopiedEmbedEpisodeId((current) => (current === episode.id ? null : current));
      }, 1600);
    } catch {
      setCopiedEmbedEpisodeId(null);
    }
  };

  return (
    <div className="w-full">
      <SEOHead
        title="Podcasts | Young Wise Women"
        description="Luister naar inspirerende podcasts over persoonlijke ontwikkeling, leiderschap en groei voor jonge vrouwen."
        path="/inspiratie/podcasts"
      />
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
                      aria-haspopup="dialog"
                      aria-expanded={shareDialogEpisode?.id === episode.id}
                      aria-label={`${episode.title} delen`}
                      onClick={() => setShareDialogEpisode(episode)}
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

      <Dialog
        open={Boolean(shareDialogEpisode)}
        onOpenChange={(open) => {
          if (!open) setShareDialogEpisode(null);
        }}
      >
        {shareDialogEpisode ? (
          <DialogContent className="w-[92vw] max-w-md overflow-hidden rounded-2xl border border-[#d8d2c7] bg-[#fbf9f5] p-0 text-[#1c2826] shadow-2xl">
            <div className="relative bg-gradient-to-r from-[#ece7dc] via-[#efe9de] to-[#e5ddcf] px-6 pb-5 pt-6">
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#b46555]/20 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#9ca08a]/25 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-[#1c2826] shadow-sm">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="font-['Lora'] text-2xl font-semibold leading-tight">
                    Deel aflevering
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-[#5c6663]">
                    {shareDialogEpisode.title}
                  </DialogDescription>
                </div>
              </div>
              <a
                href={getEpisodeShareUrl(shareDialogEpisode)}
                target="_blank"
                rel="noreferrer"
                className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-[#d6d0c4] bg-white/90 px-3 py-1.5 text-xs font-medium text-[#2a3835] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Bekijk aflevering
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="space-y-2 p-6 pt-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareDialogEpisode.title} | Young Wise Women Podcasts ${getEpisodeShareUrl(shareDialogEpisode)}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setShareDialogEpisode(null)}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e9f9ef] text-[#1f7a46]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  Share via WhatsApp
                </span>
                <ExternalLink className="h-4 w-4 text-[#6f7875]" />
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(`${shareDialogEpisode.title} | Young Wise Women Podcasts`)}&body=${encodeURIComponent(`${shareDialogEpisode.title} | Young Wise Women Podcasts\n${getEpisodeShareUrl(shareDialogEpisode)}`)}`}
                className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setShareDialogEpisode(null)}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f8ede9] text-[#a55746]">
                    <Mail className="h-4 w-4" />
                  </span>
                  Share via e-mail
                </span>
                <ExternalLink className="h-4 w-4 text-[#6f7875]" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getEpisodeShareUrl(shareDialogEpisode))}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setShareDialogEpisode(null)}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fb] text-[#1f5fbe]">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  Share via LinkedIn
                </span>
                <ExternalLink className="h-4 w-4 text-[#6f7875]" />
              </a>
              <button
                type="button"
                onClick={() => void handleCopyShareLink(shareDialogEpisode)}
                className="flex w-full items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-left text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eef1f4] text-[#40505b]">
                    <Link2 className="h-4 w-4" />
                  </span>
                  Kopieer link
                </span>
                {copiedEpisodeId === shareDialogEpisode.id ? (
                  <span className="inline-flex items-center gap-1 text-[#2f6f4c]">
                    <Check className="h-4 w-4" />
                    Gekopieerd
                  </span>
                ) : (
                  <Copy className="h-4 w-4 text-[#6f7875]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => void handleCopyEmbedCode(shareDialogEpisode)}
                disabled={!getEpisodeEmbedCode(shareDialogEpisode)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  getEpisodeEmbedCode(shareDialogEpisode)
                    ? "border-[#ddd6ca] bg-white hover:bg-[#f3efe7]"
                    : "cursor-not-allowed border-[#ebe6de] bg-[#f4f1ea] text-[#8c8a85]",
                )}
              >
                <span className="inline-flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      getEpisodeEmbedCode(shareDialogEpisode)
                        ? "bg-[#f2ece1] text-[#755543]"
                        : "bg-[#ece8e1] text-[#979089]",
                    )}
                  >
                    {"</>"}
                  </span>
                  Kopieer embed-code
                </span>
                {copiedEmbedEpisodeId === shareDialogEpisode.id ? (
                  <span className="inline-flex items-center gap-1 text-[#2f6f4c]">
                    <Check className="h-4 w-4" />
                    Gekopieerd
                  </span>
                ) : (
                  <Copy className="h-4 w-4 text-[#6f7875]" />
                )}
              </button>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
