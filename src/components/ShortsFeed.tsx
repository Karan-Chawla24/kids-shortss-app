"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ShortsFeed.module.css";
import type { ShortItem } from "@/data/shorts";
import { shorts as fallbackShorts } from "@/data/shorts";
import ShortCard from "./ShortCard";

export default function ShortsFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shorts, setShorts] = useState<ShortItem[]>(fallbackShorts);
  const [started, setStarted] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const res = await fetch("/api/shorts");
        const json = await res.json();
        if (Array.isArray(json.items) && json.items.length > 0) {
          setShorts(json.items);
          setActiveIndex(0);
        }
      } catch {
        // keep fallback shorts
      }
    };

    fetchShorts();
  }, []);

  useEffect(() => {
    if (!started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        if (visible[0]) {
          const index = Number(
            visible[0].target.getAttribute("data-index")
          );
          setActiveIndex(index);
        }
      },
      { threshold: [0.55] }
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [shorts, started]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>Kids Shorts</h1>
          <p>Swipe up to browse English kids shorts.</p>
        </div>
        <div className={styles.badge}>
          <span>EN</span>
        </div>
      </header>

      {/* ── Tap-to-start overlay ── */}
      {!started && (
        <div
          className={styles.startOverlay}
          onClick={() => setStarted(true)}
          onTouchEnd={() => setStarted(true)}
        >
          <div className={styles.startContent}>
            <div className={styles.startIcon}>▶</div>
            <p className={styles.startText}>Tap to Start Watching</p>
          </div>
        </div>
      )}

      <section className={styles.feed}>
        {shorts.map((short, index) => (
          <div
            key={short.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            data-index={index}
            className={styles.shortWrapper}
          >
            <ShortCard
              short={short}
              active={started && index === activeIndex}
            />
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Scroll to switch shorts.</p>
      </footer>
    </main>
  );
}
