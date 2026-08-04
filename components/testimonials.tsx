// VideoTestimonialCard.tsx
"use client";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Quote,
  X,
  UserRound,
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ─────────────── HELPERS ─────────────── */

function isYoutubeUrl(url: string): boolean {
  if (!url) return false;
  return /youtu\.?be|youtube\.com\/(watch|embed|shorts)/i.test(url);
}

function isYoutubeShortUrl(url: string): boolean {
  if (!url) return false;
  return /youtube\.com\/shorts\//i.test(url) || /youtu\.be\/shorts\//i.test(url);
}

function getYoutubeId(url: string): string | null {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/v\/|youtube\.com\/u\/\w\/|[?&]v=)([^#&?/]+)/i
  );

  return match && match[1].length === 11 ? match[1] : null;
}

/* ─────────────── YOUTUBE THUMBNAIL ─────────────── */

function YoutubeThumbnail({
  videoId,
  onClick,
  isShort = false,
}: {
  videoId: string;
  onClick: () => void;
  isShort?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="absolute inset-0 group cursor-pointer"
      aria-label="Play video"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Video thumbnail"
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          imgError ? "hidden" : ""
        }`}
        onError={() => setImgError(true)}
      />
      {imgError && <div className="w-full h-full bg-gray-900" />}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-white/20 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div className={`relative rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/30 transition-transform duration-300 group-hover:scale-110 ${
            isShort ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-16 h-16 sm:w-20 sm:h-20'
          }`}>
            <Play
              size={isShort ? 20 : 28}
              className="text-[#FF6B35] ml-1"
              fill="#FF6B35"
              strokeWidth={0}
            />
          </div>
        </div>
      </div>
      
      {/* Shorts Badge */}
      {isShort && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
          SHORTS
        </div>
      )}
    </button>
  );
}

/* ─────────────── YOUTUBE IFRAME ─────────────── */

function YoutubeIframe({ videoId, isShort = false }: { videoId: string; isShort?: boolean }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${isShort ? '&loop=1' : ''}`}
      title="Testimonial video"
      className="w-full h-full absolute inset-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

/* ─────────────── DIRECT VIDEO PLAYER ─────────────── */

function DirectVideoPlayer({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        /* autoplay blocked by browser — user can click play */
      });
    }
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        className="w-full h-full absolute inset-0 object-cover"
      >
        Your browser does not support the video tag.
      </video>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Close video"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ─────────────── DIRECT VIDEO THUMBNAIL ─────────────── */

function VideoThumbnail({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className="absolute inset-0 group cursor-pointer"
      aria-label="Play video"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        preload="metadata"
        className="hidden"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 1;
          }
        }}
        onSeeked={() => {
          if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth || 480;
            canvas.height = videoRef.current.videoHeight || 560;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              const overlay = document.getElementById(`thumb-${src.slice(-8)}`);
              if (overlay) {
                overlay.style.backgroundImage = `url(${canvas.toDataURL("image/jpeg", 0.7)})`;
                overlay.style.backgroundSize = "cover";
                overlay.style.backgroundPosition = "center";
                setLoaded(true);
              }
            }
          }
        }}
      />

      <div
        id={`thumb-${src.slice(-8)}`}
        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
          !loaded ? "bg-gray-900" : ""
        }`}
      >
        {!loaded && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Play size={20} className="text-white/60 ml-0.5" fill="rgba(255,255,255,0.6)" strokeWidth={0} />
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-white/20 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/30 transition-transform duration-300 group-hover:scale-110">
            <Play
              size={28}
              className="text-[#FF6B35] ml-1"
              fill="#FF6B35"
              strokeWidth={0}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export function VideoTestimonialCard({ heading, data }: any) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoItems =
    data?.data
      ?.filter((item: any) => item.type === "video" && item.video)
      .map((item: any) => ({
        ...item,
        isYoutube: isYoutubeUrl(item.video),
        youtubeId: getYoutubeId(item.video),
        isShort: isYoutubeShortUrl(item.video),
      })) || [];

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);

        const nextTimeout = () => {
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (slider.track?.details) slider.next();
          }, 5000);
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  const currentSlide = slider?.current?.track?.details?.rel || 0;

  return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
      {/* Heading - Updated to 5xl with responsive sizes */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          <span className="text-primary">What Our</span>{" "}
          <span className="">Students Say</span>
        </h2>
        {heading?.fields?.["video-testimonial-title"] && (
          <div 
            className="text-base sm:text-lg text-gray-600 mt-3 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: heading.fields["video-testimonial-title"],
            }}
          />
        )}
      </div>

      {/* Slider */}
      <div className="relative px-2 sm:px-4 lg:px-8">
        <div ref={sliderRef} className="keen-slider">
          {videoItems.map((item: any) => {
            const isPlaying = activeVideo === item.video;

            return (
              <div
                key={item._id}
                className="keen-slider__slide flex justify-center"
              >
                <div className="w-full max-w-[420px] group px-1 sm:px-2">
                  {/* Video Area */}
                  <div className={`relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl 
                    shadow-black/10 ring-1 ring-black/5 ${
                      item.isShort 
                        ? 'aspect-[9/16] max-h-[400px] mx-auto w-[70%] sm:w-[80%] md:w-[85%]' 
                        : 'aspect-video'
                    }`}>
                    {isPlaying ? (
                      item.isYoutube ? (
                        <div className="relative w-full h-full">
                          <YoutubeIframe videoId={item.youtubeId} isShort={item.isShort} />
                          <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute -top-1 -right-1 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
                            aria-label="Close video"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <DirectVideoPlayer
                          src={item.video}
                          onClose={() => setActiveVideo(null)}
                        />
                      )
                    ) : item.isYoutube ? (
                      <YoutubeThumbnail
                        videoId={item.youtubeId}
                        onClick={() => setActiveVideo(item.video)}
                        isShort={item.isShort}
                      />
                    ) : (
                      <VideoThumbnail
                        src={item.video}
                        onClick={() => setActiveVideo(item.video)}
                      />
                    )}
                    
                    {/* Shorts Indicator on Thumbnail */}
                    {item.isShort && !isPlaying && (
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-1.64 2.53-2.33 0-1.17-1.96-2.1-4.53-2.1-2.57 0-4.53.93-4.53 2.1 0 .69.69 1.37 2.53 2.33l.43.22c-.52.2-.94.38-1.32.56-.96.46-2.18 1.04-2.18 2.17 0 1.17 1.96 2.1 4.53 2.1 2.57 0 4.53-.93 4.53-2.1 0-1.13-1.22-1.71-2.18-2.17-.38-.18-.8-.36-1.32-.56zm-10.28-2.9c-.37-.15-.78-.22-1.2-.22-1.66 0-3 1.12-3 2.5s1.34 2.5 3 2.5 3-1.12 3-2.5c0-.37-.12-.74-.34-1.07-.14-.2-.3-.38-.46-.53z"/>
                        </svg>
                        Short
                      </div>
                    )}
                  </div>

                  {/* Info bar */}
                  <div className="mt-4 flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-4">
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                        {item.couse} &middot;{" "}
                        <span className="text-[#FF6B35] font-medium">
                          {item.score}
                        </span>
                      </p>
                    </div>
                    {!isPlaying && (
                      <div className={`flex-shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${
                        item.isShort 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : 'bg-[#FF6B35]/10'
                      }`}>
                        <span className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
                          item.isShort ? 'text-white' : 'text-[#FF6B35]'
                        }`}>
                          {item.isShort ? '⚡ Short' : '▶ Watch'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows - Adjusted for better positioning */}
        <button
          onClick={() => slider?.current?.prev()}
          className="hidden md:flex absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
            bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
            items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
            transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => slider?.current?.next()}
          className="hidden md:flex absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
            bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
            items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
            transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
        {videoItems.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => slider?.current?.moveToIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === i
                ? "w-6 sm:w-8 h-2 sm:h-3 bg-[#FF6B35]"
                : "w-2 h-2 sm:w-3 sm:h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function TextTestimonials({ heading, data }: any) {
  const imageTestimonials =
    data?.data?.filter((ele: any) => ele.type === "image") || [];

  const validTestimonials = imageTestimonials.filter(
    (ele: any) => ele.message !== ""
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<any>(null);

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 24 },
        },
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);

        const nextTimeout = () => {
          clearNextTimeout();

          if (mouseOver) return;

          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });

          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });

          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - Updated to 5xl with responsive sizes */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            What Our Test Preparation{" "}
            <span className="text-primary">Achievers Say</span>
          </h2>
          {heading?.fields?.["title"] && (
            <div 
              className="text-base sm:text-lg text-gray-600 mt-3 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: heading.fields["title"],
              }}
            />
          )}
        </div>

        {/* Slider */}
        <div className="relative px-1 sm:px-2 lg:px-4">
          <div ref={sliderRef} className="keen-slider py-2">
            {validTestimonials.map((item: any, idx: number) => (
              <div
                key={idx}
                className="keen-slider__slide relative bg-white rounded p-4 sm:p-6 lg:p-8 transition-shadow duration-300 border-2 border-gray-100 mt-4"
              >
                {/* Quote Icon */}
                <div className="md:absolute top-2 left-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center z-20">
                  <img
                    src="/icon/quote.png"
                    alt="quote icon"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                </div>

                <div className="h-full flex flex-col md:pt-6 mt-2">
                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base lg:text-lg line-clamp-4">
                      {item.message}
                    </p>

                    {item.message?.length > 140 && (
                      <button
                        onClick={() =>
                          setSelectedTestimonial(item)
                        }
                        className="md:mt-3 text-[#FF6B35] font-semibold hover:underline text-sm sm:text-base"
                      >
                        Read More
                      </button>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="hidden md:block mt-4 sm:mt-6 pt-4 sm:pt-5 border-t-2">
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex gap-2 sm:gap-3 items-center min-w-0">
                        {/* <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 sm:h-12 sm:w-12 p-1 rounded-full object-cover bg-primary flex-shrink-0"
                        /> */}
                        <UserRound
                          className="h-10 w-10 sm:h-12 text-white sm:w-12 p-2 rounded-full object-cover bg-primary flex-shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base truncate">
                            {item.name}
                          </p>

                          <p className="text-[#FF6B35] text-xs sm:text-sm font-semibold truncate">
                            {item.score}
                          </p>
                        </div>
                      </div>

                    </div>
                      <div className="flex justify-end gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < item.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200"
                            }
                          />
                        ))}
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev Button - Updated positioning */}
          <button
            onClick={() => slider?.current?.prev()}
            className="hidden md:flex absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next Button - Updated positioning */}
          <button
            onClick={() => slider?.current?.next()}
            className="hidden md:flex absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {validTestimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => slider?.current?.moveToIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? "w-6 sm:w-8 h-2 sm:h-3 bg-[#FF6B35]"
                  : "w-2 h-2 sm:w-3 sm:h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 top-0 z-500 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />

              <div>
                <p className="text-2xl font-bold">
                  {selectedTestimonial.name}
                </p>

                <p className="text-[#FF6B35] font-medium text-sm sm:text-base">
                  {selectedTestimonial.score}
                </p>

                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < selectedTestimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Full Message */}
            <p className="text-gray-700 leading-7 sm:leading-8 whitespace-pre-wrap text-sm sm:text-base">
              {selectedTestimonial.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
















// // VideoTestimonialCard.tsx
// "use client";
// import Image from "next/image";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Star,
//   Quote,
//   X,
// } from "lucide-react";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

// /* ─────────────── HELPERS ─────────────── */

// function isYoutubeUrl(url: string): boolean {
//   if (!url) return false;
//   return /youtu\.?be|youtube\.com\/(watch|embed|shorts)/i.test(url);
// }

// function isYoutubeShortUrl(url: string): boolean {
//   if (!url) return false;
//   return /youtube\.com\/shorts\//i.test(url) || /youtu\.be\/shorts\//i.test(url);
// }

// function getYoutubeId(url: string): string | null {
//   if (!url) return null;

//   const match = url.match(
//     /(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/v\/|youtube\.com\/u\/\w\/|[?&]v=)([^#&?/]+)/i
//   );

//   return match && match[1].length === 11 ? match[1] : null;
// }

// /* ─────────────── YOUTUBE THUMBNAIL ─────────────── */

// function YoutubeThumbnail({
//   videoId,
//   onClick,
//   isShort = false,
// }: {
//   videoId: string;
//   onClick: () => void;
//   isShort?: boolean;
// }) {
//   const [imgError, setImgError] = useState(false);

//   return (
//     <button
//       onClick={onClick}
//       className="absolute inset-0 group cursor-pointer"
//       aria-label="Play video"
//     >
//       <img
//         src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
//         alt="Video thumbnail"
//         className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
//           imgError ? "hidden" : ""
//         }`}
//         onError={() => setImgError(true)}
//       />
//       {imgError && <div className="w-full h-full bg-gray-900" />}
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
//       {/* Play button */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative">
//           <div
//             className="absolute inset-0 rounded-full bg-white/20 animate-ping"
//             style={{ animationDuration: "2s" }}
//           />
//           <div className={`relative rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/30 transition-transform duration-300 group-hover:scale-110 ${
//             isShort ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-16 h-16 sm:w-20 sm:h-20'
//           }`}>
//             <Play
//               size={isShort ? 20 : 28}
//               className="text-[#FF6B35] ml-1"
//               fill="#FF6B35"
//               strokeWidth={0}
//             />
//           </div>
//         </div>
//       </div>
      
//       {/* Shorts Badge */}
//       {isShort && (
//         <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
//           SHORTS
//         </div>
//       )}
//     </button>
//   );
// }

// /* ─────────────── YOUTUBE IFRAME ─────────────── */

// function YoutubeIframe({ videoId, isShort = false }: { videoId: string; isShort?: boolean }) {
//   return (
//     <iframe
//       src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${isShort ? '&loop=1' : ''}`}
//       title="Testimonial video"
//       className="w-full h-full absolute inset-0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//     />
//   );
// }

// /* ─────────────── DIRECT VIDEO PLAYER ─────────────── */

// function DirectVideoPlayer({
//   src,
//   onClose,
// }: {
//   src: string;
//   onClose: () => void;
// }) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(() => {
//         /* autoplay blocked by browser — user can click play */
//       });
//     }
//   }, [src]);

//   return (
//     <div className="relative w-full h-full">
//       <video
//         ref={videoRef}
//         src={src}
//         controls
//         playsInline
//         className="w-full h-full absolute inset-0 object-cover"
//       >
//         Your browser does not support the video tag.
//       </video>
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
//         aria-label="Close video"
//       >
//         <X size={14} />
//       </button>
//     </div>
//   );
// }

// /* ─────────────── DIRECT VIDEO THUMBNAIL ─────────────── */

// function VideoThumbnail({
//   src,
//   onClick,
// }: {
//   src: string;
//   onClick: () => void;
// }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <button
//       onClick={onClick}
//       className="absolute inset-0 group cursor-pointer"
//       aria-label="Play video"
//     >
//       <video
//         ref={videoRef}
//         src={src}
//         muted
//         preload="metadata"
//         className="hidden"
//         onLoadedData={() => {
//           if (videoRef.current) {
//             videoRef.current.currentTime = 1;
//           }
//         }}
//         onSeeked={() => {
//           if (videoRef.current) {
//             const canvas = document.createElement("canvas");
//             canvas.width = videoRef.current.videoWidth || 480;
//             canvas.height = videoRef.current.videoHeight || 560;
//             const ctx = canvas.getContext("2d");
//             if (ctx) {
//               ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//               const overlay = document.getElementById(`thumb-${src.slice(-8)}`);
//               if (overlay) {
//                 overlay.style.backgroundImage = `url(${canvas.toDataURL("image/jpeg", 0.7)})`;
//                 overlay.style.backgroundSize = "cover";
//                 overlay.style.backgroundPosition = "center";
//                 setLoaded(true);
//               }
//             }
//           }
//         }}
//       />

//       <div
//         id={`thumb-${src.slice(-8)}`}
//         className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
//           !loaded ? "bg-gray-900" : ""
//         }`}
//       >
//         {!loaded && (
//           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
//             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
//               <Play size={20} className="text-white/60 ml-0.5" fill="rgba(255,255,255,0.6)" strokeWidth={0} />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="relative">
//           <div
//             className="absolute inset-0 rounded-full bg-white/20 animate-ping"
//             style={{ animationDuration: "2s" }}
//           />
//           <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/30 transition-transform duration-300 group-hover:scale-110">
//             <Play
//               size={28}
//               className="text-[#FF6B35] ml-1"
//               fill="#FF6B35"
//               strokeWidth={0}
//             />
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// }

// export function VideoTestimonialCard({ heading, data }: any) {
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   const videoItems =
//     data?.data
//       ?.filter((item: any) => item.type === "video" && item.video)
//       .map((item: any) => ({
//         ...item,
//         isYoutube: isYoutubeUrl(item.video),
//         youtubeId: getYoutubeId(item.video),
//         isShort: isYoutubeShortUrl(item.video),
//       })) || [];

//   const [sliderRef, slider] = useKeenSlider(
//     {
//       loop: true,
//       slides: { perView: 1, spacing: 16 },
//       breakpoints: {
//         "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
//         "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
//       },
//     },
//     [
//       (slider) => {
//         let timeout: any;
//         let mouseOver = false;

//         const clearNextTimeout = () => clearTimeout(timeout);

//         const nextTimeout = () => {
//           if (mouseOver) return;
//           timeout = setTimeout(() => {
//             if (slider.track?.details) slider.next();
//           }, 5000);
//         };

//         slider.on("created", () => {
//           slider.container.addEventListener("mouseover", () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });
//           slider.container.addEventListener("mouseout", () => {
//             mouseOver = false;
//             nextTimeout();
//           });
//           nextTimeout();
//         });

//         slider.on("dragStarted", clearNextTimeout);
//         slider.on("animationEnded", nextTimeout);
//         slider.on("updated", nextTimeout);
//       },
//     ],
//   );

//   const currentSlide = slider?.current?.track?.details?.rel || 0;

//   return (
//     <div className="max-w-7xl mx-auto ">
//       {/* Heading */}
//       <div className="text-center mb-12 px-4">
//         {/* <div
//           className="prose prose-headings:mb-0"
//           dangerouslySetInnerHTML={{
//             __html: heading?.fields["video-testimonial-title"],
//           }}
//         /> */}
//         <p className="text-4xl font-bold"><span className="text-[#FF6B35]">What Our</span> <span className="text-[#626363]">Students Say</span></p>
        
//       </div>

//       {/* Slider */}
//       <div className="relative px-4 sm:px-8 lg:px-12">
//         <div ref={sliderRef} className="keen-slider">
//           {videoItems.map((item: any) => {
//             const isPlaying = activeVideo === item.video;

//             return (
//               <div
//                 key={item._id}
//                 className="keen-slider__slide flex justify-center"
//               >
//                 <div className="w-full max-w-[420px] group">
//                   {/* Video Area */}
//                   <div className={`relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl 
//                     shadow-black/10 ring-1 ring-black/5 ${
//                       item.isShort 
//                         ? 'aspect-[9/16] max-h-[400px] mx-auto w-[70%] sm:w-[85%]' 
//                         : 'aspect-video'
//                     }`}>
//                     {isPlaying ? (
//                       item.isYoutube ? (
//                         <div className="relative w-full h-full">
//                           <YoutubeIframe videoId={item.youtubeId} isShort={item.isShort} />
//                           <button
//                             onClick={() => setActiveVideo(null)}
//                             className="absolute -top-1 -right-1 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
//                             aria-label="Close video"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ) : (
//                         <DirectVideoPlayer
//                           src={item.video}
//                           onClose={() => setActiveVideo(null)}
//                         />
//                       )
//                     ) : item.isYoutube ? (
//                       <YoutubeThumbnail
//                         videoId={item.youtubeId}
//                         onClick={() => setActiveVideo(item.video)}
//                         isShort={item.isShort}
//                       />
//                     ) : (
//                       <VideoThumbnail
//                         src={item.video}
//                         onClick={() => setActiveVideo(item.video)}
//                       />
//                     )}
                    
//                     {/* Shorts Indicator on Thumbnail */}
//                     {item.isShort && !isPlaying && (
//                       <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                         <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-1.64 2.53-2.33 0-1.17-1.96-2.1-4.53-2.1-2.57 0-4.53.93-4.53 2.1 0 .69.69 1.37 2.53 2.33l.43.22c-.52.2-.94.38-1.32.56-.96.46-2.18 1.04-2.18 2.17 0 1.17 1.96 2.1 4.53 2.1 2.57 0 4.53-.93 4.53-2.1 0-1.13-1.22-1.71-2.18-2.17-.38-.18-.8-.36-1.32-.56zm-10.28-2.9c-.37-.15-.78-.22-1.2-.22-1.66 0-3 1.12-3 2.5s1.34 2.5 3 2.5 3-1.12 3-2.5c0-.37-.12-.74-.34-1.07-.14-.2-.3-.38-.46-.53z"/>
//                         </svg>
//                         Short
//                       </div>
//                     )}
//                   </div>

//                   {/* Info bar */}
//                   <div className="mt-4 flex items-center justify-between gap-3 px-10">
//                     <div className="min-w-0">
//                       <p className="text-sm font-semibold text-gray-900 truncate">
//                         {item.name}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-0.5">
//                         {item.couse} &middot;{" "}
//                         <span className="text-[#FF6B35] font-medium">
//                           {item.score}
//                         </span>
//                       </p>
//                     </div>
//                     {!isPlaying && (
//                       <div className={`flex-shrink-0 px-3 py-1.5 rounded-full ${
//                         item.isShort 
//                           ? 'bg-gradient-to-r from-red-500 to-red-600' 
//                           : 'bg-[#FF6B35]/10'
//                       }`}>
//                         <span className={`text-xs font-semibold ${
//                           item.isShort ? 'text-white' : 'text-[#FF6B35]'
//                         }`}>
//                           {item.isShort ? '⚡ Short' : '▶ Watch'}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Arrows */}
//         <button
//           onClick={() => slider?.current?.prev()}
//           className="hidden md:block  absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
//             bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
//             flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
//             transition-all duration-200 hover:scale-105 active:scale-95"
//           aria-label="Previous"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         <button
//           onClick={() => slider?.current?.next()}
//           className="hidden md:block  absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
//             bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
//             flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
//             transition-all duration-200 hover:scale-105 active:scale-95"
//           aria-label="Next"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-2 mt-8">
//         {videoItems.map((_: any, i: number) => (
//           <button
//             key={i}
//             onClick={() => slider?.current?.moveToIdx(i)}
//             className={`rounded-full transition-all duration-300 ${
//               currentSlide === i
//                 ? "w-8 h-3 bg-[#FF6B35]"
//                 : "w-3 h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }




// export function TextTestimonials({ heading, data }: any) {
//   const imageTestimonials =
//     data?.data?.filter((ele: any) => ele.type === "image") || [];

//   const validTestimonials = imageTestimonials.filter(
//     (ele: any) => ele.message !== ""
//   );

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedTestimonial, setSelectedTestimonial] =
//     useState<any>(null);

//   const [sliderRef, slider] = useKeenSlider(
//     {
//       loop: true,
//       slides: { perView: 1, spacing: 16 },
//       breakpoints: {
//         "(min-width: 640px)": {
//           slides: { perView: 2, spacing: 20 },
//         },
//         "(min-width: 1024px)": {
//           slides: { perView: 3, spacing: 24 },
//         },
//       },
//       slideChanged(s) {
//         setCurrentSlide(s.track.details.rel);
//       },
//     },
//     [
//       (slider) => {
//         let timeout: any;
//         let mouseOver = false;

//         const clearNextTimeout = () => clearTimeout(timeout);

//         const nextTimeout = () => {
//           clearNextTimeout();

//           if (mouseOver) return;

//           timeout = setTimeout(() => {
//             slider.next();
//           }, 5000);
//         };

//         slider.on("created", () => {
//           slider.container.addEventListener("mouseover", () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });

//           slider.container.addEventListener("mouseout", () => {
//             mouseOver = false;
//             nextTimeout();
//           });

//           nextTimeout();
//         });

//         slider.on("dragStarted", clearNextTimeout);
//         slider.on("animationEnded", nextTimeout);
//         slider.on("updated", nextTimeout);
//       },
//     ]
//   );

//   return (
//     <div className="py-8 ">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
//         {/* Heading */}
//         <div className="text-center mb-2">
//           {/* <div
//             className="prose prose-headings:mb-0"
//             dangerouslySetInnerHTML={{
//               __html: heading?.fields["title"],
//             }}
//           /> */}
//           <p className="text-2xl sm:text-3xl md:text4xl font-semibold text-gray-600 leading-tight">
//             What Our Test Preparation <span className="text-[#FF6B35]">Achievers Say</span></p>
//         </div>

//         {/* Slider */}
//         <div className="relative">
//           <div ref={sliderRef} className="keen-slider py-2">
//             {validTestimonials.map((item: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="keen-slider__slide relative bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300 border-2 border-gray-100 mt-4"
//               >
//                 {/* Quote Icon */}
//                 <div className="absolute top-2 left-3 w-14 h-14 flex items-center justify-center z-20">
//                   <img
//                     src="/icon/text.png"
//                     alt="quote icon"
//                     className="w-14 h-14 object-contain"
//                   />
//                 </div>

//                 <div className="h-full flex flex-col pt-6 mt-2">
//                   {/* Testimonial Text */}
//                   <div className="flex-1">
//                     <p className="text-gray-600 leading-relaxed text-sm sm:text-[1.2rem] line-clamp-4">
//                       {item.message}
//                     </p>

//                     {item.message?.length > 150 && (
//                       <button
//                         onClick={() =>
//                           setSelectedTestimonial(item)
//                         }
//                         className="mt-3 text-[#FF6B35] font-semibold hover:underline"
//                       >
//                         Read More
//                       </button>
//                     )}
//                   </div>

//                   {/* Footer */}
//                   <div className="mt-6 pt-5 border-t border-gray-100">
//                     <div className="flex items-center justify-between gap-2">
//                       <div className="flex gap-3 items-center min-w-0">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="h-12 w-12 rounded-full object-cover flex-shrink-0"
//                         />

//                         <div className="min-w-0">
//                           <p className="font-bold text-gray-900 text-base truncate">
//                             {item.name}
//                           </p>

//                           <p className="text-[#FF6B35] text-sm font-semibold truncate">
//                             {item.score}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex gap-0.5 flex-shrink-0">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             className={
//                               i < item.rating
//                                 ? "fill-amber-400 text-amber-400"
//                                 : "fill-gray-200 text-gray-200"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Prev Button */}
//           <button
//             onClick={() => slider?.current?.prev()}
//             className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
//             aria-label="Previous"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           {/* Next Button */}
//           <button
//             onClick={() => slider?.current?.next()}
//             className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
//             aria-label="Next"
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-8">
//           {validTestimonials.map((_: any, i: number) => (
//             <button
//               key={i}
//               onClick={() => slider?.current?.moveToIdx(i)}
//               className={`rounded-full transition-all duration-300 ${
//                 currentSlide === i
//                   ? "w-8 h-3 bg-[#FF6B35]"
//                   : "w-3 h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedTestimonial && (
//         <div
//           className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
//           onClick={() => setSelectedTestimonial(null)}
//         >
//           <div
//             className="bg-white rounded max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close */}
//             <button
//               onClick={() => setSelectedTestimonial(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black"
//             >
//               <X size={24} />
//             </button>

//             {/* User Info */}
//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={selectedTestimonial.image}
//                 alt={selectedTestimonial.name}
//                 className="w-16 h-16 rounded-full object-cover"
//               />

//               <div>
//                 <p className="text-xl font-bold">
//                   {selectedTestimonial.name}
//                 </p>

//                 <p className="text-[#FF6B35] font-medium">
//                   {selectedTestimonial.score}
//                 </p>

//                 <div className="flex gap-1 mt-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={16}
//                       className={
//                         i < selectedTestimonial.rating
//                           ? "fill-amber-400 text-amber-400"
//                           : "fill-gray-200 text-gray-200"
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Full Message */}
//             <p className="text-gray-700 leading-8 whitespace-pre-wrap text-base">
//               {selectedTestimonial.message}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









