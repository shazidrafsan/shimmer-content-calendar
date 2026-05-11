"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/posts";

const IMAGE_DURATION = 5000;

type Props = {
  posts: Post[];
  startIndex: number;
  onClose: () => void;
  onView: (id: number) => void;
};

export default function StoryViewer({ posts, startIndex, onClose, onView }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = posts[index];
  const media = current.media[0];

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= posts.length - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  }, [posts.length, onClose]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  useEffect(() => {
    onView(current.id);
  }, [current.id, onView]);

  useEffect(() => {
    if (media.kind !== "image") return;
    setProgress(0);
    let raf = 0;
    let start = performance.now();
    let elapsedAtPause = 0;
    const tick = (now: number) => {
      if (paused) {
        elapsedAtPause = now - start;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (elapsedAtPause > 0) {
        start = now - elapsedAtPause;
        elapsedAtPause = 0;
      }
      const p = Math.min(1, (now - start) / IMAGE_DURATION);
      setProgress(p);
      if (p >= 1) {
        next();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, media.kind, media.src, paused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
    >
      {/* progress bars */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 mx-auto flex w-full max-w-[470px] gap-1 px-2 pt-2">
        {posts.map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className="h-full bg-white transition-[width] duration-75 ease-linear"
              style={{
                width:
                  i < index
                    ? "100%"
                    : i === index
                    ? `${progress * 100}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* header */}
      <div className="pointer-events-none absolute left-0 right-0 top-3 z-20 mx-auto flex w-full max-w-[470px] items-center justify-between px-4 pt-2 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-semibold">
            STL
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">shimmerthelabel</div>
            <div className="text-[10px] opacity-70">
              {current.slot} · {current.pillar}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="pointer-events-auto text-2xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* media */}
      <div className="relative flex h-full max-h-[100dvh] w-full max-w-[470px] items-center justify-center">
        {media.kind === "image" ? (
          <img
            src={media.src}
            alt={current.slot}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={media.src}
            className="max-h-full max-w-full object-contain"
            autoPlay
            playsInline
            controls={false}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            onEnded={next}
          />
        )}
      </div>

      {/* tap zones (above media, below header/X) */}
      <button
        onClick={prev}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-label="Previous"
        className="absolute left-0 top-12 z-10 h-[calc(100%-7rem)] w-1/3"
      />
      <button
        onClick={next}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-label="Next"
        className="absolute right-0 top-12 z-10 h-[calc(100%-7rem)] w-1/3"
      />

      {/* caption */}
      {current.caption && (
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 mx-auto w-full max-w-[470px] px-4">
          <div className="rounded-lg bg-black/55 px-3 py-2 text-center text-sm leading-snug text-white whitespace-pre-line backdrop-blur-sm">
            {current.caption}
          </div>
          {current.productLink && (
            <div className="mt-2 flex justify-center">
              <a
                href={current.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-neutral-900"
              >
                Shop the look →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
