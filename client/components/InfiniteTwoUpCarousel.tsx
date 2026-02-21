import React, { useEffect, useMemo, useRef, useState } from "react";

type RetreatTestimonial = {
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

  const [isDesktop, setIsDesktop] = useState(false);
  const [gapPx, setGapPx] = useState(24);
  const [slidePx, setSlidePx] = useState(0);
  const [stepPx, setStepPx] = useState(0);

  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);

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

  useEffect(() => {
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
      } else {
        setSlidePx(w);
        setStepPx(w + measuredGap);
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
    if (n === 0) return;
    setDisableTransition(true);
    setIndex(realStart);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableTransition(false));
    });
  }, [realStart, n]);

  const prev = () => {
    if (n <= 1) return;
    setDisableTransition(false);
    setIndex((i) => i - 1);
  };

  const next = () => {
    if (n <= 1) return;
    setDisableTransition(false);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    onReady?.({ next, prev });
  }, [onReady, n]);

  const baseOffset = stepPx > 0 ? index * stepPx : 0;
  const transform = `translate3d(-${baseOffset + (isDragging ? dragOffsetPx : 0)}px, 0, 0)`;

  const handleTrackTransitionEnd = () => {
    if (isDragging || disableTransition) return;
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
    if (n <= 1 || stepPx === 0) return;
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
            key={`${item.name}-${i}`}
            className="shrink-0"
            style={{
              width: isDesktop ? `${slidePx}px` : "100%",
            }}
          >
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
