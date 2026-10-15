"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import styles from "./spoken-english-course.module.css";

export default function ReviewSlider({ reviews }: { reviews: any[] }) {
  const [paused, setPaused] = useState(false);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 3, spacing: 22 },
    breakpoints: {
      "(max-width: 900px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
    },
    animation: { duration: 800 },
  });

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => slider.current?.next(), 3200);
    return () => window.clearInterval(timer);
  }, [paused, slider]);

  return (
    <div
      ref={sliderRef}
      className={`keen-slider ${styles.reviewSlider}`}
      aria-label="Student reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {reviews.map((review, index) => {
        const text = typeof review === "string" ? review : review?.text || "";
        const parsedRating = Number(typeof review === "string" ? 5 : review?.rating || 5);
        const rating = Math.max(0, Math.min(5, Number.isFinite(parsedRating) ? Math.round(parsedRating) : 5));

        return <article className={`keen-slider__slide ${styles.reviewSlide}`} key={`${text}-${index}`}>
          <div className={styles.reviewCard}>
            <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
              {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </div>
            <p className="!text-base">{text}</p>
          </div>
        </article>;
      })}
    </div>
  );
}
