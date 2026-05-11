# Shimmer The Label — Content Calendar

An Instagram-style preview of the Shimmer The Label content calendar, built with **Next.js 14** (App Router) + **Tailwind CSS**.

## Features

- Mobile-first Instagram feed: stories rail, sticky header, like / save / share actions, post pills
- Grid view toggle (3-column profile layout)
- Carousel posts (horizontal swipe + dots + counter)
- Native HTML5 videos with autoplay-on-scroll, mute, loop, `playsinline`, and controls
- Filters: All / Posts / Reels / Carousels
- Captions, hashtags, KPI strip, and product links pulled from the calendar
- Vercel-ready (zero config)

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. `git init && git add . && git commit -m "init"`
2. Push to GitHub.
3. On [vercel.com/new](https://vercel.com/new) import the repo — no env vars needed.
4. Build command: `next build` · output: `.next` (auto-detected).

> Assets (`public/assets/`) total ~85 MB. Well under Vercel's 100 MB Hobby file-size cap. If you swap in larger videos, host them on Cloudflare Stream, Mux, or Bunny CDN and update the `src` paths in `lib/posts.ts`.

## Editing content

All posts live in [`lib/posts.ts`](./lib/posts.ts). Each entry references files in `public/assets/images/` or `public/assets/videos/`. Add a new post by appending to the `raw` array.
