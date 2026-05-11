"use client";

import { useCallback, useMemo, useState } from "react";
import PostCard from "./Post";
import StoryViewer from "./StoryViewer";
import { posts as allPosts } from "@/lib/posts";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "image", label: "Posts" },
  { key: "video", label: "Reels" },
  { key: "carousel", label: "Carousels" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function Feed() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [view, setView] = useState<"feed" | "grid">("feed");
  const [viewedIds, setViewedIds] = useState<Set<number>>(new Set());
  const [storyIndex, setStoryIndex] = useState<number | null>(null);

  const openStory = (idx: number) => setStoryIndex(idx);

  const markViewed = useCallback(
    (id: number) => {
      setViewedIds((prev) => {
        if (prev.has(id)) return prev;
        const updated = new Set(prev);
        updated.add(id);
        // reset when every story has been seen
        if (updated.size >= allPosts.length) {
          return new Set();
        }
        return updated;
      });
    },
    []
  );

  const closeStory = useCallback(() => setStoryIndex(null), []);

  const posts = useMemo(() => {
    if (filter === "all") return allPosts;
    if (filter === "video")
      return allPosts.filter((p) => p.media.some((m) => m.kind === "video"));
    if (filter === "carousel")
      return allPosts.filter((p) => p.media.length > 1);
    return allPosts.filter(
      (p) => p.media.length === 1 && p.media[0].kind === "image"
    );
  }, [filter]);

  return (
    <>
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex w-full max-w-[470px] items-center justify-center px-4 py-3">
          <div className="font-wordmark text-[26px] leading-none text-neutral-900">
            SHIMMER
          </div>
          <button
            onClick={() => setView(view === "feed" ? "grid" : "feed")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700"
            aria-label="Toggle view"
          >
            {view === "feed" ? "Grid" : "Feed"}
          </button>
        </div>

        {/* Stories rail */}
        <div className="no-scrollbar mx-auto w-full max-w-[470px] overflow-x-auto pb-3">
          <div className="mx-auto flex w-max gap-3 px-4">
            {allPosts.map((p, idx) => {
              const viewed = viewedIds.has(p.id);
              return (
                <button
                  key={`s-${p.id}`}
                  type="button"
                  onClick={() => openStory(idx)}
                  className="flex w-16 flex-shrink-0 flex-col items-center gap-1"
                  aria-label={`Open ${p.slot} story`}
                >
                  <div
                    className={`rounded-full p-[2.5px] transition-colors ${
                      viewed
                        ? "bg-neutral-300"
                        : "bg-gradient-to-tr from-rose-600 via-red-500 to-orange-500"
                    }`}
                  >
                    <div className="rounded-full bg-white p-[2px]">
                      <div className="h-14 w-14 overflow-hidden rounded-full bg-neutral-100">
                        {p.media[0].kind === "image" ? (
                          <img
                            src={p.media[0].src}
                            alt={p.slot}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <video
                            src={p.media[0].src}
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`w-full truncate text-center text-[10px] ${
                      viewed ? "text-neutral-400" : "text-neutral-700"
                    }`}
                  >
                    {p.slot}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="border-t border-[var(--border)]">
          <div className="no-scrollbar mx-auto flex w-full max-w-[470px] gap-2 overflow-x-auto px-4 py-2">
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-600"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto self-center text-[11px] text-[var(--muted)]">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
          </div>
        </div>
      </header>

      {/* Body */}
      {view === "feed" ? (
        <main className="pb-16">
          {posts.map((p) => (
            <div key={p.id} id={`post-${p.id}`}>
              <PostCard post={p} />
            </div>
          ))}
        </main>
      ) : (
        <main className="mx-auto max-w-[470px] px-0.5 pb-16 sm:px-0">
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((p) => (
              <a
                key={p.id}
                href={`#post-${p.id}`}
                onClick={() => setView("feed")}
                className="relative aspect-square overflow-hidden bg-neutral-100"
              >
                {p.media[0].kind === "image" ? (
                  <img
                    src={p.media[0].src}
                    alt={p.slot}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={p.media[0].src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                )}
                {p.media.length > 1 && (
                  <span className="absolute right-1 top-1 rounded bg-black/60 px-1 text-[10px] text-white">
                    ▢▢
                  </span>
                )}
                {p.media[0].kind === "video" && (
                  <span className="absolute right-1 top-1 rounded bg-black/60 px-1 text-[10px] text-white">
                    ▶
                  </span>
                )}
              </a>
            ))}
          </div>
        </main>
      )}

      <footer className="py-6 text-center text-[11px] text-[var(--muted)]">
        Shimmer The Label · Content calendar preview
      </footer>

      {storyIndex !== null && (
        <StoryViewer
          posts={allPosts}
          startIndex={storyIndex}
          onClose={closeStory}
          onView={markViewed}
        />
      )}
    </>
  );
}
