"use client";

import { useState } from "react";
import Link from "next/link";
import { posts as allPosts } from "@/lib/posts";

const HIGHLIGHTS = [
  { label: "New In", cover: "/assets/images/14.png" },
  { label: "Spring Lovin'", cover: "/assets/images/5.png" },
  { label: "Impressions", cover: "/assets/images/15.png" },
  { label: "Reverie", cover: "/assets/images/11.png" },
  { label: "Strike Out", cover: "/assets/images/9.png" },
  { label: "Bridal", cover: "/assets/images/6.png" },
];

const TABS = [
  { key: "posts", label: "Posts" },
  { key: "reels", label: "Reels" },
  { key: "tagged", label: "Tagged" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function Profile() {
  const [tab, setTab] = useState<TabKey>("posts");
  const [following, setFollowing] = useState(false);

  const reels = allPosts.filter((p) => p.media.some((m) => m.kind === "video"));
  const tagged = allPosts.filter((p) => p.media.length > 1);

  const display =
    tab === "reels" ? reels : tab === "tagged" ? tagged : allPosts;

  return (
    <>
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[470px] items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Back" className="text-neutral-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </Link>
          <div className="flex items-center gap-1.5 text-[15px] font-semibold">
            <span>shimmerthelabel</span>
            <svg className="h-3.5 w-3.5 text-sky-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.39 1.77 2.94-.39.92 2.83 2.45 1.72-.92 2.83.92 2.83-2.45 1.72-.92 2.83-2.94-.39L12 22l-2.39-1.77-2.94.39-.92-2.83-2.45-1.72.92-2.83-.92-2.83 2.45-1.72.92-2.83 2.94.39L12 2zm-1.2 13.4l5.6-5.6-1.4-1.4-4.2 4.2-1.8-1.8-1.4 1.4 3.2 3.2z" />
            </svg>
          </div>
          <button aria-label="More" className="text-xl leading-none text-neutral-700">⋯</button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[470px] pb-24">
        {/* Avatar + stats */}
        <section className="flex items-center gap-6 px-4 pt-4">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-neutral-200 bg-neutral-50">
              <img
                src="/assets/images/14.png"
                alt="Shimmer The Label avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-around text-center">
            <Stat value={allPosts.length} label="posts" />
            <Stat value="8,462" label="followers" />
            <Stat value="287" label="following" />
          </div>
        </section>

        {/* Bio */}
        <section className="px-4 pt-3 text-sm leading-snug">
          <div className="font-semibold">Shimmer The Label</div>
          <div className="text-[12px] uppercase tracking-wide text-[var(--muted)]">
            Women’s Clothing Store
          </div>
          <p className="mt-1 whitespace-pre-line">
            {"Feminine elegance, playful sophistication.\nOccasion + everyday dresses, made in Sydney 🇦🇺\nSince 2001. Online since 2024."}
          </p>
          <a
            href="https://www.shimmerthelabel.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[#00376b]"
          >
            shimmerthelabel.com.au
          </a>
        </section>

        {/* Action buttons */}
        <section className="flex gap-2 px-4 pt-4">
          <button
            onClick={() => setFollowing((v) => !v)}
            className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition ${
              following
                ? "bg-neutral-100 text-neutral-900"
                : "bg-sky-500 text-white"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
          <a
            href="mailto:hello@shimmerthelabel.com.au"
            className="flex-1 rounded-md bg-neutral-100 py-1.5 text-center text-sm font-semibold text-neutral-900"
          >
            Message
          </a>
          <a
            href="https://www.shimmerthelabel.com.au/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-semibold text-neutral-900"
            aria-label="Shop"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </a>
        </section>

        {/* Highlights */}
        <section className="no-scrollbar mt-5 flex gap-4 overflow-x-auto px-4 pb-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="flex w-16 flex-shrink-0 flex-col items-center gap-1">
              <div className="rounded-full border border-neutral-300 p-[2px]">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-neutral-100">
                  <img src={h.cover} alt={h.label} className="h-full w-full object-cover" />
                </div>
              </div>
              <span className="w-full truncate text-center text-[10px] text-neutral-700">
                {h.label}
              </span>
            </div>
          ))}
        </section>

        {/* Tabs */}
        <div className="sticky top-[49px] z-20 border-y border-[var(--border)] bg-white">
          <div className="flex">
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex flex-1 items-center justify-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-wider ${
                    active
                      ? "border-t-2 border-neutral-900 text-neutral-900"
                      : "border-t-2 border-transparent text-neutral-400"
                  }`}
                >
                  {t.label === "Posts" && <GridGlyph />}
                  {t.label === "Reels" && <ReelGlyph />}
                  {t.label === "Tagged" && <TagGlyph />}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <section className="grid grid-cols-3 gap-0.5">
          {display.map((p) => {
            const cover = p.media[0];
            const isVideo = cover.kind === "video";
            const isMulti = p.media.length > 1;
            return (
              <Link
                key={p.id}
                href={`/?post=${p.id}#post-${p.id}`}
                className="relative aspect-square overflow-hidden bg-neutral-100"
              >
                {isVideo ? (
                  <video
                    src={cover.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={cover.src}
                    alt={p.slot}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                {isMulti && (
                  <span className="absolute right-1.5 top-1.5 text-white drop-shadow">
                    <CarouselGlyph />
                  </span>
                )}
                {isVideo && (
                  <span className="absolute right-1.5 top-1.5 text-white drop-shadow">
                    <PlayGlyph />
                  </span>
                )}
              </Link>
            );
          })}
        </section>

        {display.length === 0 && (
          <p className="py-10 text-center text-sm text-[var(--muted)]">
            Nothing here yet.
          </p>
        )}
      </main>
    </>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="text-base font-semibold leading-tight">{value}</div>
      <div className="text-xs text-neutral-600">{label}</div>
    </div>
  );
}

function GridGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function ReelGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}
function TagGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}
function CarouselGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="14" height="14" rx="1" />
      <path d="M3 7v12a2 2 0 0 0 2 2h12" />
    </svg>
  );
}
