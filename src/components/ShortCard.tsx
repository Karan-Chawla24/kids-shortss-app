"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ShortItem } from "@/data/shorts";
import styles from "./ShortCard.module.css";

/* ------------------------------------------------------------------ */
/*  Load the official YouTube IFrame API script once                   */
/* ------------------------------------------------------------------ */
let apiReady = false;
const readyCallbacks: (() => void)[] = [];

function ensureYTApi() {
  if (typeof window === "undefined") return;
  if (apiReady || document.getElementById("yt-iframe-api")) return;

  const tag = document.createElement("script");
  tag.id = "yt-iframe-api";
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
}

function onApiReady(cb: () => void) {
  if (apiReady) {
    cb();
  } else {
    readyCallbacks.push(cb);
    ensureYTApi();
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
type Props = {
  short: ShortItem;
  active: boolean;
};

export default function ShortCard({ short, active }: Props) {
  const thumbnail = `https://i.ytimg.com/vi/${short.videoId}/hqdefault.jpg`;
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const prevActiveRef = useRef(false);

  /* Create / destroy the YT player when this card becomes active */
  useEffect(() => {
    if (active && !prevActiveRef.current) {
      onApiReady(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear any leftover content
        container.innerHTML = "";
        const div = document.createElement("div");
        div.id = `yt-player-${short.videoId}-${Date.now()}`;
        container.appendChild(div);

        playerRef.current = new window.YT.Player(div.id, {
          videoId: short.videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute: 1, // muted so autoplay works on all browsers
            playsinline: 1,
            rel: 0,
            controls: 1,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: YTPlayerEvent) => {
              // Autoplay is already running (muted).
              // Attempt to unmute — works on desktop; on iOS it may
              // need a user gesture inside the player first.
              event.target.unMute();
              event.target.setVolume(100);
            },
          },
        });
      });
    }

    if (!active && prevActiveRef.current) {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* ignore */
        }
        playerRef.current = null;
      }
    }

    prevActiveRef.current = active;
  }, [active, short.videoId]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* ignore */
        }
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <article className={styles.card}>
      <div className={styles.player}>
        {active ? (
          <div ref={containerRef} className={styles.video} />
        ) : (
          <div className={styles.thumbWrapper}>
            <Image
              className={styles.thumb}
              src={thumbnail}
              alt={short.title}
              width={320}
              height={180}
              quality={75}
              priority={false}
            />
            <div className={styles.playOverlay}>
              <div className={styles.playIcon} aria-hidden>
                ▶
              </div>
            </div>
          </div>
        )}
        <div className={styles.duration}>Short</div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>{short.title}</div>
        <div className={styles.meta}>
          <span className={styles.channel}>{short.channel}</span>
        </div>
      </div>
    </article>
  );
}
