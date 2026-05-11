"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isFeed = pathname === "/";
  const isProfile = pathname === "/profile";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[470px] items-center justify-around px-6 py-2.5">
        <Link
          href="/"
          aria-label="Home"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            isFeed ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          <HomeIcon filled={isFeed} />
          <span>Feed</span>
        </Link>
        <Link
          href="/profile"
          aria-label="Profile"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            isProfile ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          <PersonIcon filled={isProfile} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}

function HomeIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function PersonIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
