import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ShortItem } from "@/data/shorts";

const FALLBACK_SHORTS: ShortItem[] = [
  {
    id: "cocomelon-1",
    title: "Wheels on the Bus | Cocomelon",
    channel: "Cocomelon - Nursery Rhymes",
    channelUrl: "https://www.youtube.com/@cocomelon",
    videoId: "KQt_PJdML8g",
    description: "Sing along with this kids' short from Cocomelon.",
  },
  {
    id: "blippi-1",
    title: "Blippi Learns Colors",
    channel: "Blippi",
    channelUrl: "https://www.youtube.com/@Blippi",
    videoId: "Hj8LzH6Vkjw",
    description: "A short clip of Blippi teaching colors to kids.",
  },
  {
    id: "peppa-1",
    title: "Peppa Pig: Jumping in Muddy Puddles",
    channel: "Peppa Pig - Official Channel",
    channelUrl: "https://www.youtube.com/@peppapig",
    videoId: "jV7lCgKO_M8",
    description: "Peppa and George jump in muddy puddles in this short.",
  },
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const SEARCH_TERMS = [
  "funny kids shorts",
  "kids english shorts",
  "kids short songs",
  "nursery rhymes",
  "kids learning",
  "children animation",
  "kids sing along",
  "preschool songs",
  "kids english shorts",
  "educational shorts for kids",
  "kids storytelling"
];

function pickQuery(request: NextRequest) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (q) return q;

  // Pick a pseudo-random query each time so the returned videos change.
  return SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const query = pickQuery(request);

  if (!apiKey) {
    return NextResponse.json({ items: shuffle(FALLBACK_SHORTS), source: "fallback" });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("videoDuration", "short");
  url.searchParams.set("relevanceLanguage", "en");
  url.searchParams.set("q", query);
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("safeSearch", "strict");

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
      { items: shuffle(FALLBACK_SHORTS), source: "fallback", error: text },
      );
    }

    const data = (await res.json()) as any;
    const items: ShortItem[] = (data.items ?? []).map((item: any) => {
      const videoId = item.id?.videoId ?? item.id;
      const snippet = item.snippet ?? {};
      return {
        id: videoId ?? `${Math.random().toString(16).slice(2)}`,
        title: snippet.title ?? "Untitled short",
        channel: snippet.channelTitle ?? "Unknown",
        channelUrl: snippet.channelId
          ? `https://www.youtube.com/channel/${snippet.channelId}`
          : "",
        videoId,
        description: snippet.description,
      };
    });

    return NextResponse.json({ items, source: "api", query });
  } catch (error) {
    return NextResponse.json(
      { items: FALLBACK_SHORTS, source: "fallback", error: String(error) },
      { status: 500 }
    );
  }
}
