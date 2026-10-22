
"use client";

import { useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./spoken-english-course.module.css";

export default function ReviewSlider({
  reviews,
}: {
  reviews: any[];
}) {
  // Remove empty reviews to prevent blank slides.
  const validReviews = useMemo(
    () =>
      (reviews ?? []).filter((review) => {
        const text =
          typeof review === "string" ? review : review?.text;

        return typeof text === "string" && text.trim().length > 0;
      }),
    [reviews]
  );

  // Keen Slider needs enough slides to loop smoothly when showing two.
  // Duplicate only when there are exactly two reviews.
  const sliderReviews = useMemo(
    () =>
      validReviews.length === 2
        ? [...validReviews, ...validReviews]
        : validReviews,
    [validReviews]
  );

  const canLoop = validReviews.length > 1;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: canLoop,
    vertical: true,
    mode: "free-snap",
    drag: canLoop,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
    defaultAnimation: {
      duration: 650,
    },
    renderMode: "performance",
  });

  // Smooth, continuous autoplay without creating multiple intervals.
  useEffect(() => {
    const instance = slider.current;

    if (!instance || !canLoop) return;

    instance.update();

    const timer = window.setInterval(() => {
      slider.current?.next();
    }, 3500);

    return () => window.clearInterval(timer);
  }, [slider, canLoop, sliderReviews.length]);

  if (validReviews.length === 0) return null;

  return (
    <div className={styles.reviewCarousel}>
      <div
        ref={sliderRef}
        className={`keen-slider ${styles.reviewSlider}`}
        aria-label="Student reviews"
      >
        {sliderReviews.map((review, index) => {
          const text =
            typeof review === "string"
              ? review
              : review?.text ?? "";

          const parsedRating = Number(
            typeof review === "string"
              ? 5
              : review?.rating ?? 5
          );

          const rating = Math.max(
            0,
            Math.min(
              5,
              Number.isFinite(parsedRating)
                ? Math.round(parsedRating)
                : 5
            )
          );

          return (
            <article
              className={`keen-slider__slide ${styles.reviewSlide}`}
              key={`${index}-${text}`}
            >
              <div className={styles.reviewCard}>
                <div
                  className={styles.stars}
                  role="img"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </div>

                <p className="!text-base">{text}</p>
              </div>
            </article>
          );
        })}
      </div>

      {canLoop && (
        <div className={styles.reviewControls}>
          <button
            type="button"
            onClick={() => slider.current?.prev()}
            aria-label="Previous review"
          >
            <ChevronUp size={18} />
          </button>

          <button
            type="button"
            onClick={() => slider.current?.next()}
            aria-label="Next review"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}