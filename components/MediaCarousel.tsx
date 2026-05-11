"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/posts";

type Props = {
  media: MediaItem[];
  alt: string;
};

export default function MediaCarousel({ media, alt }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      setActive(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(media.length - 1, idx));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  const hasMany = media.length > 1;

  return (
    <div className="relative w-full bg-neutral-100">
      <div
        ref={trackRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto"
      >
        {media.map((m, i) => (
          <div
            key={i}
            className="relative flex aspect-square w-full flex-shrink-0 snap-center items-center justify-center bg-neutral-100"
          >
            {m.kind === "image" ? (
              <img
                src={m.src}
                alt={`${alt} (${i + 1}/${media.length})`}
                className="h-full w-full object-contain"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <VideoSlide src={m.src} />
            )}
          </div>
        ))}
      </div>

      {hasMany && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-md backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(active + 1)}
            disabled={active === media.length - 1}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-md backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight />
          </button>

          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
            {active + 1}/{media.length}
          </div>
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {media.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === active ? "bg-neutral-900" : "bg-neutral-900/35"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function VideoSlide({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: [0, 0.6, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className="h-full w-full object-contain"
      playsInline
      muted
      loop
      controls
      preload="metadata"
    />
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
