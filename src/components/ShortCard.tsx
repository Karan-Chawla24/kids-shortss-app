import Image from "next/image";
import type { ShortItem } from "@/data/shorts";
import styles from "./ShortCard.module.css";

type Props = {
  short: ShortItem;
  active: boolean;
};

export default function ShortCard({ short, active }: Props) {
  const thumbnail = `https://i.ytimg.com/vi/${short.videoId}/hqdefault.jpg`;
  const iframeSrc = `https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=0&playsinline=1&rel=0&controls=1`;

  return (
    <article className={styles.card}>
      <div className={styles.player}>
        {active ? (
          <iframe
            className={styles.video}
            src={iframeSrc}
            title={short.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
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
