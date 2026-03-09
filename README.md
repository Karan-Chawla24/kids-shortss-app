# Kids Shorts App (Next.js)

A minimal **YouTube Shorts-style** feed that shows **English kids videos**.

## 🎬 What it does

- Fetches **short video results** from the YouTube Data API (if you provide an API key).
- Falls back to a small built-in list of kids shorts if no API key is available.
- Presents videos in a **full-screen scrollable feed** (like YouTube Shorts).

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open: http://localhost:3000

## 🔑 Optional: Dynamic videos via YouTube API

To make the list dynamic (different videos on each load), provide a YouTube API key:

1. Create a `.env.local` file at the repo root.
2. Add:

```env
YOUTUBE_API_KEY=YOUR_API_KEY_HERE
```

If no API key is set, the app will use the built-in fallback list in `src/data/shorts.ts`.

## 🧩 Customize the fallback list

Edit the fallback list in:

- `src/data/shorts.ts`

Each entry contains `id`, `title`, `channel`, `channelUrl`, `videoId`, and an optional `description`.
