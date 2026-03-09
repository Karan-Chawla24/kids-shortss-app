"use client";

import { useEffect } from "react";
import styles from "./ShortModal.module.css";

type Props = {
  videoId: string;
  onClose: () => void;
};

export default function ShortModal({ videoId, onClose }: Props) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.frame}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button className={styles.close} onClick={onClose} type="button">
          ×
        </button>
        <iframe
          className={styles.video}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
