"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { ShortItem } from "@/data/shorts";
import styles from "./ShortCard.module.css";

type Props = {
  short: ShortItem;
  active: boolean;
};

export default function ShortCard({ short, active }: Props) {
  const thumbnail = `https://i.ytimg.com/vi/${short.videoId}/hqdefault.jpg`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Direct iframe src with all params needed for iOS Safari autoplay:
  // autoplay=1  → request autoplay
  // mute=1      → required by iOS Safari for autoplay to work
  // playsinline=1 → play inline instead of fullscreen on iOS
  // enablejsapi=1 → allow postMessage control for unmuting later
  const iframeSrc = active
    ? `https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&controls=1&enablejsapi=1`
    : undefined;

  // Once the iframe loads and is playing (muted), attempt to unmute via
  // the YouTube postMessage API. This works on desktop immediately.
  // On iOS it may silently fail until a user gesture occurs.
  useEffect(() => {
    if (!active || !iframeRef.current) return;

    const iframe = iframeRef.current;

    const tryUnmute = () => {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: [] }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [100],
          }),
          "*"
        );
      } catch {
        /* cross-origin — ignore */
      }
    };

    // Try unmuting at a few intervals after the iframe loads
    const t1 = setTimeout(tryUnmute, 1500);
    const t2 = setTimeout(tryUnmute, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  return (
    <article className={styles.card}>
      <div className={styles.player}>
        {active ? (
          <iframe
            ref={iframeRef}
            className={styles.video}
            src={iframeSrc}
            title={short.title}
            frameBorder="0"
            allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
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
