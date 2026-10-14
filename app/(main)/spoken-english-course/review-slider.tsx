"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import styles from "./spoken-english-course.module.css";

export default function ReviewSlider({ reviews }: { reviews: string[] }) {
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
      {reviews.map((review) => (
        <article className={`keen-slider__slide ${styles.reviewSlide}`} key={review}>
          <div className={styles.reviewCard}>
            <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
            <p>{review}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
