"use client";

import { useEffect, useRef, useCallback } from "react";
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

  // Always mute=1 in URL so autoplay works on all devices (including iOS Safari).
  // We then unmute via the YouTube postMessage IFrame API after the player loads.
  const iframeSrc = `https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&controls=1&enablejsapi=1`;

  const sendCommand = useCallback(
    (func: string, args: unknown[] = []) => {
      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args }),
          "*"
        );
      }
    },
    []
  );

  // After the iframe loads, wait for the YouTube player to initialise and then
  // attempt to unmute. On desktop browsers this succeeds immediately and the
  // user hears audio right away. On iOS Safari the browser may block the
  // unmute until the user interacts with the player – that is an OS‑level
  // restriction we cannot override.
  const handleIframeLoad = useCallback(() => {
    const tryUnmute = () => {
      sendCommand("unMute");
      sendCommand("setVolume", [100]);
    };

    // The YouTube player needs a moment after the iframe "load" event
    // before it starts accepting postMessage commands.
    setTimeout(tryUnmute, 800);
    setTimeout(tryUnmute, 2000);
  }, [sendCommand]);

  // Re‑attempt unmute whenever this card becomes the active card (user
  // scrolled to it). Helpful when a prior user gesture has unlocked audio.
  useEffect(() => {
    if (active) {
      const id = setTimeout(() => {
        sendCommand("unMute");
        sendCommand("setVolume", [100]);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [active, sendCommand]);

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
            onLoad={handleIframeLoad}
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
