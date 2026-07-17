"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ThreeDCarouselItem {
  _id: string;
  name: string;
  image: string;
  course: string;
  score: string;
  title?: string;
  brand?: string;
  description?: string;
  tags?: string[];
  link?: string;
}

interface AboutResultProps {
  data: {
    data: ThreeDCarouselItem[];
  };
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
}

// Color gradients for each card based on test type
const getGradientColors = (course: string) => {
  const gradients: Record<string, string> = {
    IELTS: "from-orange-500 to-amber-400",
    GMAT: "from-orange-600 to-amber-500",
    GRE: "from-orange-600 to-amber-500",
    SAT: "from-orange-500 to-amber-400",
  };

  // Find matching gradient or return default
  for (const [key, value] of Object.entries(gradients)) {
    if (course.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "from-indigo-500 to-blue-400";
};

export const Aboutresult = ({
  data,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 350,
}: AboutResultProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardWidth, setCardWidth] = useState(260);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure data exists and has items
  const originalItems = data?.data || [];

  // Create a circular array with enough items for 5-card view
  const items = originalItems.length > 0 ? [...originalItems] : [];
  const totalItems = items.length;
  const minSwipeDistance = 50;

  // Calculate responsive card width
  useEffect(() => {
    const calculateCardWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1280) { // xl screens
        return 220;
      } else if (windowWidth >= 1024) { // lg screens
        return 200;
      } else if (windowWidth >= 768) { // md screens
        return 180;
      } else if (windowWidth >= 640) { // sm screens
        return 160;
      } else {
        return 140;
      }
    };

    setCardWidth(calculateCardWidth());

    const handleResize = () => {
      setCardWidth(calculateCardWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    console.log("Going to next slide"); // Debug log
    setIsTransitioning(true);
    setActive((prev) => (prev + 1) % totalItems);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || totalItems === 0) return;
    setIsTransitioning(true);
    setActive((prev) => (prev - 1 + totalItems) % totalItems);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === active || totalItems === 0) return;
      setIsTransitioning(true);
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [active, isTransitioning, totalItems],
  );

  // Auto-rotate effect - simplified
  useEffect(() => {
    // Clear any existing timer
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }

    if (autoRotate && !isHovering && totalItems > 0) {
      console.log("Starting auto-rotation"); // Debug log
      autoRotateTimerRef.current = setInterval(() => {
        goToNext();
      }, rotateInterval);
    } else {
      console.log("Auto-rotation paused"); // Debug log
    }

    // Cleanup function
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
    };
  }, [autoRotate, isHovering, rotateInterval, goToNext, totalItems]);

  // Touch handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
    // Pause auto-rotation on touch
    setIsHovering(true);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsHovering(false);
      return;
    }
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
    // Resume auto-rotation after touch
    setTimeout(() => setIsHovering(false), 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Get card position based on active index (shows 5 cards)
  const getCardPosition = (index: number) => {
    if (totalItems === 0) return { transform: 'translateX(0px)', opacity: 0, zIndex: 0, scale: 0.9 };

    // Calculate relative position (cyclic)
    let diff = (((index - active) % totalItems) + totalItems) % totalItems;

    // Fixed gap between cards - no extra gap
    const gap = 0;
    const totalWidth = cardWidth + gap;

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;

    // Center card
    if (diff === 0) {
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 20;
    }
    // Right side cards
    else if (diff === 1) {
      translateX = totalWidth;
      scale = 0.9;
      opacity = 1;
      zIndex = 15;
    }
    else if (diff === 2) {
      translateX = totalWidth * 2;
      scale = 0.8;
      opacity = 1;
      zIndex = 5;
    }
    // Left side cards
    else if (diff === totalItems - 1) {
      translateX = -totalWidth;
      scale = 0.9;
      opacity = 1;
      zIndex = 15;
    }
    else if (diff === totalItems - 2) {
      translateX = -totalWidth * 2;
      scale = 0.8;
      opacity = 1;
      zIndex = 5;
    }
    // Hidden cards
    else {
      translateX = 0;
      scale = 0.7;
      opacity = 0;
      zIndex = 0;
    }

    return { translateX, scale, opacity, zIndex };
  };

  // Early return if no items
  if (totalItems === 0) {
    return (
      <section className="bg-transparent min-w-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <p>No items to display</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ThreeDCarousel"
      className="bg-transparent w-full flex items-center justify-center py-8"
    >
      <div className="w-full mx-auto">
        <div
          className="relative overflow-hidden"
          style={{ height: `${cardHeight + 80}px` }}
          onMouseEnter={() => {
            console.log("Mouse enter - pausing");
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            console.log("Mouse leave - resuming");
            setIsHovering(false);
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-[35%] z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-[35%] z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Items */}
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              const gradientClass = getGradientColors(item.course);
              const position = getCardPosition(index);

              return (
                <div
                  key={`${item._id}-${index}`}
                  className={`absolute top-0 !shadow-none transform transition-all duration-500 ease-in-out`}
                  style={{
                    height: `${cardHeight}px`,
                    width: `${cardWidth}px`,
                    transform: `translateX(${position.translateX}px) scale(${position.scale})`,
                    opacity: position.opacity,
                    zIndex: position.zIndex,
                    left: '50%',
                    marginLeft: `-${cardWidth / 2}px`,
                  }}
                >
                  <div>

                    <div className="overflow-hidden border-4 border-white bg-white flex flex-col h-full p-2  duration-300">
                      <div
                        className={`relative bg-[#FE8E6D] flex flex-col items-center justify-center h-[80%] overflow-hidden`}
                      >
                        <img
                          src={item?.image}
                          className="h-full w-full object-cover mx-auto bg-[#FE8E6D] group-hover:scale-105 transition-transform duration-500"
                          alt={item?.name}
                        />
                        <span className="absolute bottom-0 left-0 w-full text-xs text-center font-bold bg-[#000] text-white px-2 py-1.5">
                          {item?.course || "NEET - UG '25"}
                        </span>
                      </div>

                      <div className="text-left mt-1 capitalize px-4 pb-2 flex-1">
                        <p className="font-bold text-sm sm:text-base break-words text-gray-800 leading-tight">
                          {item?.name}
                        </p>
                        <div className="flex flex-col items-start justify-between mt-0.5">
                          <span className="font-medium text-[10px] sm:text-xs text-gray-500 truncate w-full">
                            Standardized Test Results
                          </span>
                          <span className="font-medium text-[10px] sm:text-xs text-gray-500 truncate w-full">
                            Score
                          </span>
                          <span className="text-[#f26e46] m-0 p-0 font-bold text-xl sm:text-2xl transition-colors duration-200">
                            {item?.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-2 z-30 py-3">
            {items.slice(0, Math.min(totalItems, 10)).map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${active === idx
                  ? "bg-gray-700 w-4"
                  : "bg-gray-300 w-1.5 hover:bg-gray-400"
                  }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
            {totalItems > 10 && (
              <span className="text-xs text-gray-400">+{totalItems - 10}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};