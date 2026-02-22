import { useRef, useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromoVideoSectionProps {
  className?: string;
  videoContainerClassName?: string;
  ctaContainerClassName?: string;
  ctaLabel?: string;
  introVideoSrc?: string;
  modalVideoSrc?: string;
}

export default function PromoVideoSection({
  className,
  videoContainerClassName,
  ctaContainerClassName,
  ctaLabel = "Bekijk de hele video",
  introVideoSrc = "https://cdn.builder.io/o/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6a83a06db694d329132c995244a4ae5?alt=media&token=37e09b99-1fdb-4c85-a0ff-f319faa2bf31&apiKey=264b1b44affb4c70ba84c30b9a51f9df",
  modalVideoSrc = "https://cdn.builder.io/o/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2Fc6a83a06db694d329132c995244a4ae5?alt=media&token=37e09b99-1fdb-4c85-a0ff-f319faa2bf31&apiKey=264b1b44affb4c70ba84c30b9a51f9df",
}: PromoVideoSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundButtonPos, setSoundButtonPos] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      await video.play().catch(() => {});
    }
  };

  const openModal = () => {
    videoRef.current?.pause();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={cn(className)}>
        <div
          className={cn(
            "relative mx-auto aspect-[9/16] w-full overflow-hidden rounded-3xl md:aspect-video",
            videoContainerClassName,
          )}
          role="button"
          tabIndex={0}
          aria-label={isMuted ? "Video met geluid afspelen" : "Video dempen"}
          onPointerEnter={(event) => {
            setIsHovered(true);
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            const clampedX = Math.max(14, Math.min(86, x));
            const clampedY = Math.max(18, Math.min(82, y));
            setSoundButtonPos({ x: clampedX, y: clampedY });
          }}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            const clampedX = Math.max(14, Math.min(86, x));
            const clampedY = Math.max(18, Math.min(82, y));
            setSoundButtonPos({ x: clampedX, y: clampedY });
          }}
          onPointerLeave={() => setIsHovered(false)}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            void toggleMute();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void toggleMute();
            }
          }}
          style={{ touchAction: "none" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full bg-black object-cover"
            src={introVideoSrc}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-300",
              isHovered || isMuted ? "opacity-100" : "opacity-0",
            )}
          >
            <button
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
                void toggleMute();
              }}
              className="pointer-events-auto absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-[#B46555] px-5 py-3 text-sm text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isMuted ? "Sound inschakelen" : "Sound uitschakelen"}
              onBlur={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              style={{
                fontFamily: '"Poppins", sans-serif',
                left: `${soundButtonPos.x}%`,
                top: `${soundButtonPos.y}%`,
              }}
            >
              SOUND
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1C2826]">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </span>
            </button>
          </div>
        </div>

        <div className={cn("mt-8 flex justify-center", ctaContainerClassName)}>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center rounded-lg bg-primary px-7 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-accent"
          >
            {ctaLabel}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 px-4 py-8 md:px-10 md:py-12"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-[#1f1f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-6"
            aria-label="Sluit video"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="mx-auto flex h-full w-full max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                src={modalVideoSrc}
                className="h-full w-full"
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
