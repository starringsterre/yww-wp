import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type RetreatTestimonial = {
  id: string | number;
  quote: string;
  photo: string;
  name: string;
  role: string;
};

export function InfiniteTwoUpCarousel({
  testimonials,
  renderCard,
  onReady,
}: {
  testimonials: RetreatTestimonial[];
  renderCard: (t: RetreatTestimonial) => React.ReactNode;
  onReady?: (api: { next: () => void; prev: () => void }) => void;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const n = testimonials.length;

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );
  const [isMeasured, setIsMeasured] = useState(false);
  const [gapPx, setGapPx] = useState(24);
  const [slidePx, setSlidePx] = useState(0);
  const [stepPx, setStepPx] = useState(0);

  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);
  const hasInitializedRef = useRef(false);

  const dragState = useRef<{
    startX: number;
    startIndex: number;
    currentDelta: number;
  }>({ startX: 0, startIndex: 0, currentDelta: 0 });

  const cloneCount = n <= 1 ? 0 : isDesktop ? 2 : 1;

  const extended = useMemo(() => {
    if (n === 0) return [] as RetreatTestimonial[];
    if (cloneCount === 0) return testimonials;
    const start = testimonials.slice(-cloneCount);
    const end = testimonials.slice(0, cloneCount);
    return [...start, ...testimonials, ...end];
  }, [testimonials, n, cloneCount]);

  const realStart = cloneCount;
  const realEnd = cloneCount + (n - 1);
  const desktopFallbackWidth = "calc((100% - 1.5rem) / 2)";

  useLayoutEffect(() => {
    if (!viewportRef.current) return;

    const update = () => {
      if (!viewportRef.current) return;
      const w = viewportRef.current.clientWidth;
      if (w === 0) return;

      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(desktop);

      let measuredGap = 24;
      const track = trackRef.current;
      if (track) {
        const styles = window.getComputedStyle(track);
        const g = parseFloat(styles.columnGap || styles.gap || "24");
        if (!Number.isNaN(g) && g > 0) measuredGap = g;
      }
      setGapPx(measuredGap);

      if (desktop) {
        const forcedSlide = (w - measuredGap) / 2;
        setSlidePx(forcedSlide);
        setStepPx(forcedSlide + measuredGap);
        setIsMeasured(forcedSlide > 0);
      } else {
        setSlidePx(w);
        setStepPx(w + measuredGap);
        setIsMeasured(w > 0);
      }
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(viewportRef.current);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!isMeasured || n === 0) return;
    setDisableTransition(true);
    setIndex((current) => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        return realStart;
      }

      if (n <= 1) {
        return realStart;
      }

      const normalized = ((current - realStart) % n + n) % n;
      return realStart + normalized;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableTransition(false));
    });
  }, [isMeasured, realStart, n]);

  const prev = useCallback(() => {
    if (!isMeasured || n <= 1) return;
    setDisableTransition(false);
    setIndex((i) => i - 1);
  }, [isMeasured, n]);

  const next = useCallback(() => {
    if (!isMeasured || n <= 1) return;
    setDisableTransition(false);
    setIndex((i) => i + 1);
  }, [isMeasured, n]);

  useEffect(() => {
    onReady?.({ next, prev });
  }, [onReady, next, prev]);

  const baseOffset = isMeasured && stepPx > 0 ? index * stepPx : 0;
  const transform = `translate3d(-${baseOffset + (isDragging ? dragOffsetPx : 0)}px, 0, 0)`;

  const handleTrackTransitionEnd = () => {
    if (!isMeasured || isDragging || disableTransition) return;
    if (cloneCount === 0) return;

    if (index < realStart) {
      setDisableTransition(true);
      setIndex(realEnd);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
      return;
    }

    if (index > realEnd) {
      setDisableTransition(true);
      setIndex(realStart);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isMeasured || n <= 1 || stepPx === 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    dragState.current = {
      startX: e.clientX,
      startIndex: index,
      currentDelta: 0,
    };

    setIsDragging(true);
    setDisableTransition(true);
    setDragOffsetPx(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.currentDelta = dx;
    setDragOffsetPx(-dx);
  };

  const endDrag = () => {
    if (!isDragging) return;

    const dx = dragState.current.currentDelta;
    const threshold = stepPx * 0.18;

    let nextIndex = dragState.current.startIndex;
    if (dx < -threshold) nextIndex = dragState.current.startIndex + 1;
    else if (dx > threshold) nextIndex = dragState.current.startIndex - 1;

    setDragOffsetPx(0);
    setIsDragging(false);
    setDisableTransition(false);
    setIndex(nextIndex);
  };

  if (n === 0) return null;

  return (
    <div
      ref={viewportRef}
      className={[
        "overflow-hidden select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      ].join(" ")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {!isMeasured ? (
        <div
          className={
            isDesktop
              ? "grid grid-cols-2 gap-6"
              : "grid grid-cols-1 gap-6"
          }
        >
          {testimonials
            .slice(0, isDesktop ? 2 : 1)
            .map((item) => (
              <div key={item.id} className="shrink-0">
                {renderCard(item)}
              </div>
            ))}
        </div>
      ) : (
      <div
        ref={trackRef}
        className={[
          "flex gap-6 will-change-transform",
          disableTransition || isDragging
            ? "transition-none"
            : "transition-transform duration-500 ease-out",
        ].join(" ")}
        style={{ transform }}
        onTransitionEnd={handleTrackTransitionEnd}
      >
        {extended.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="shrink-0"
            style={{
              width: isDesktop
                ? slidePx > 0
                  ? `${slidePx}px`
                  : desktopFallbackWidth
                : "100%",
            }}
          >
            {renderCard(item)}
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
