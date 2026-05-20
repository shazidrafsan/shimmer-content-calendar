"use client";

import { useMemo, useState } from "react";
import MediaCarousel from "./MediaCarousel";
import type { Post } from "@/lib/posts";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function fakeStats(id: number) {
  const likes = 320 + Math.floor(seededRandom(id * 31 + 7) * 9200);
  const comments = 8 + Math.floor(seededRandom(id * 17 + 3) * 240);
  return { likes, comments };
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

export default function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => fakeStats(post.id), [post.id]);
  const isVideo = post.media.some((m) => m.kind === "video");
  const isCarousel = post.media.length > 1;

  return (
    <article className="mx-auto w-full max-w-[470px] overflow-hidden border-b border-[var(--border)] bg-white sm:my-4 sm:rounded-md sm:border">
      {/* header */}
      <header className="flex items-center gap-3 px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-50">
          <span className="text-[10px] font-semibold tracking-wider text-neutral-700">
            STL
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold">shimmerthelabel</span>
            <svg
              className="h-3.5 w-3.5 text-sky-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2l2.39 1.77 2.94-.39.92 2.83 2.45 1.72-.92 2.83.92 2.83-2.45 1.72-.92 2.83-2.94-.39L12 22l-2.39-1.77-2.94.39-.92-2.83-2.45-1.72.92-2.83-.92-2.83 2.45-1.72.92-2.83 2.94.39L12 2zm-1.2 13.4l5.6-5.6-1.4-1.4-4.2 4.2-1.8-1.8-1.4 1.4 3.2 3.2z" />
            </svg>
          </div>
          <div className="truncate text-[11px] text-[var(--muted)]">
            {post.slot} • {post.pillar}
          </div>
        </div>
        <button className="text-xl leading-none text-neutral-700" aria-label="More">
          ⋯
        </button>
      </header>

      {/* media */}
      <MediaCarousel media={post.media} alt={post.slot} />

      {/* action bar */}
      <div className="flex items-center gap-4 px-3 pb-1 pt-2.5">
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Like"
          className="transition-transform active:scale-90"
        >
          <HeartIcon filled={liked} />
        </button>
        <button aria-label="Comment">
          <CommentIcon />
        </button>
        <button aria-label="Share">
          <ShareIcon />
        </button>
        <button
          onClick={() => setSaved((v) => !v)}
          aria-label="Save"
          className="ml-auto transition-transform active:scale-90"
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>

      {/* likes */}
      <div className="px-3 pt-1 text-sm font-semibold">
        {formatCount(stats.likes + (liked ? 1 : 0))} likes
      </div>
      <div className="px-3 pt-0.5 text-xs text-[var(--muted)]">
        View all {formatCount(stats.comments)} comments
      </div>

      {/* caption */}
      <div className="px-3 pt-1 text-sm">
        <span className="mr-1.5 font-semibold">shimmerthelabel</span>
        <span
          className={expanded ? "whitespace-pre-line" : "caption-clamp whitespace-pre-line"}
        >
          {post.caption}
        </span>
        {!expanded && post.caption.length > 80 && (
          <button
            className="ml-1 text-[var(--muted)]"
            onClick={() => setExpanded(true)}
          >
            more
          </button>
        )}
      </div>

      {/* hashtags */}
      {post.hashtags && (
        <div className="px-3 pt-1 text-sm leading-relaxed text-[#00376b]">
          {post.hashtags}
        </div>
      )}

      {/* product link */}
      {post.productLink && (
        <div className="px-3 pt-2">
          <a
            href={post.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white"
          >
            {post.linkLabel ?? "Shop the look →"}
          </a>
        </div>
      )}

      {/* meta strip */}
      <div className="mt-2 flex flex-wrap gap-1.5 px-3 pb-3">
        <Pill>{post.contentType}</Pill>
        {isCarousel && <Pill>Carousel · {post.media.length}</Pill>}
        {isVideo && !isCarousel && <Pill>Video</Pill>}
      </div>

      {/* purpose / KPI */}
      <div className="border-t border-[var(--border)] bg-neutral-50 px-3 py-2 text-[11px] leading-snug text-[var(--muted)]">
        <span className="font-semibold uppercase tracking-wider text-neutral-700">
          KPI ·{" "}
        </span>
        {post.purpose}
      </div>
    </article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-600">
      {children}
    </span>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={filled ? "#ed4956" : "none"}
      stroke={filled ? "#ed4956" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
