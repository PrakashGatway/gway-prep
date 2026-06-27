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
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ─────────────── HELPERS ─────────────── */

function isYoutubeUrl(url: string): boolean {
  if (!url) return false;
  return /youtu\.?be/.test(url);
}

function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/* ─────────────── YOUTUBE THUMBNAIL ─────────────── */

function YoutubeThumbnail({
  videoId,
  onClick,
}: {
  videoId: string;
  onClick: () => void;
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

/* ─────────────── YOUTUBE IFRAME ─────────────── */

function YoutubeIframe({ videoId }: { videoId: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
    <div className="max-w-7xl mx-auto font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <div
          className="prose prose-headings:mb-0"
          dangerouslySetInnerHTML={{
            __html: heading?.fields["video-testimonial-title"],
          }}
        />
      </div>

      {/* Slider */}
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div ref={sliderRef} className="keen-slider">
          {videoItems.map((item: any) => {
            const isPlaying = activeVideo === item.video;

            return (
              <div
                key={item._id}
                className="keen-slider__slide flex justify-center"
              >
                <div className="w-full max-w-[420px] max-h-[420px] group">
                  {/* Video Area */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-xl 
                  shadow-black/10 ring-1 ring-black/5">
                    {isPlaying ? (
                      item.isYoutube ? (
                        <div className="relative w-full h-full">
                          <YoutubeIframe videoId={item.youtubeId} />
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
                      />
                    ) : (
                      <VideoThumbnail
                        src={item.video}
                        onClick={() => setActiveVideo(item.video)}
                      />
                    )}
                  </div>

                  {/* Info bar */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.couse} &middot;{" "}
                        <span className="text-[#FF6B35] font-medium">
                          {item.score}
                        </span>
                      </p>
                    </div>
                    {!isPlaying && (
                      <div className="flex-shrink-0 px-3 py-1.5 bg-[#FF6B35]/10 rounded-full">
                        <span className="text-xs font-semibold text-[#FF6B35]">
                          ▶ Watch
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={() => slider?.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
            bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
            flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
            transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => slider?.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
            bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
            flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
            transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {videoItems.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => slider?.current?.moveToIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === i
                ? "w-8 h-3 bg-[#FF6B35]"
                : "w-3 h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
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
    <div className="py-8 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-2">
          <div
            className="prose prose-headings:mb-0"
            dangerouslySetInnerHTML={{
              __html: heading?.fields["title"],
            }}
          />
        </div>

        {/* Slider */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider py-2">
            {validTestimonials.map((item: any, idx: number) => (
              <div
                key={idx}
                className="keen-slider__slide relative bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300 border-2 border-gray-100 mt-4"
              >
                {/* Quote Icon */}
                <div className="absolute top-2 left-3 w-14 h-14 flex items-center justify-center z-20">
                  <img
                    src="/icon/text.png"
                    alt="quote icon"
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <div className="h-full flex flex-col pt-6 mt-2">
                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-[1.2rem] line-clamp-4">
                      {item.message}
                    </p>

                    {item.message?.length > 150 && (
                      <button
                        onClick={() =>
                          setSelectedTestimonial(item)
                        }
                        className="mt-3 text-[#FF6B35] font-semibold hover:underline"
                      >
                        Read More
                      </button>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-3 items-center min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-base truncate">
                            {item.name}
                          </p>

                          <p className="text-[#FF6B35] text-sm font-semibold truncate">
                            {item.score}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-0.5 flex-shrink-0">
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
              </div>
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={() => slider?.current?.prev()}
            className="absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next Button */}
          <button
            onClick={() => slider?.current?.next()}
            className="absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100 flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {validTestimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => slider?.current?.moveToIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? "w-8 h-3 bg-[#FF6B35]"
                  : "w-3 h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="text-xl font-bold">
                  {selectedTestimonial.name}
                </h3>

                <p className="text-[#FF6B35] font-medium">
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
            <p className="text-gray-700 leading-8 whitespace-pre-wrap text-base">
              {selectedTestimonial.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}















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
//   return /youtu\.?be/.test(url);
// }

// function getYoutubeId(url: string): string | null {
//   if (!url) return null;
//   const regExp =
//     /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// }

// /* ─────────────── YOUTUBE THUMBNAIL ─────────────── */

// function YoutubeThumbnail({
//   videoId,
//   onClick,
// }: {
//   videoId: string;
//   onClick: () => void;
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

// /* ─────────────── YOUTUBE IFRAME ─────────────── */

// function YoutubeIframe({ videoId }: { videoId: string }) {
//   return (
//     <iframe
//       src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
//       {/* Hidden video to grab a frame */}
//       <video
//         ref={videoRef}
//         src={src}
//         muted
//         preload="metadata"
//         className="hidden"
//         onLoadedData={() => {
//           if (videoRef.current) {
//             // Seek to 1 second to get a meaningful frame
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
//               // Set as background of the overlay div
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

//       {/* Thumbnail bg or fallback */}
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

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

//       {/* Play button */}
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

//   // Filter only video-type items and determine source type
//   const videoItems =
//     data?.data
//       ?.filter((item: any) => item.type === "video" && item.video)
//       .map((item: any) => ({
//         ...item,
//         isYoutube: isYoutubeUrl(item.video),
//         youtubeId: getYoutubeId(item.video),
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
//     <div className="max-w-7xl mx-auto">
//       {/* Heading */}
//       <div className="text-center mb-12 px-4">
//         <div
//           className="prose prose-headings:mb-0"
//           dangerouslySetInnerHTML={{
//             __html: heading?.fields["video-testimonial-title"],
//           }}
//         />
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
//                 <div className="w-full max-w-[420px] max-h-[420px] group">
//                   {/* Video Area */}
//                   <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-xl 
//                   shadow-black/10 ring-1 ring-black/5">
//                     {isPlaying ? (
//                       item.isYoutube ? (
//                         <div className="relative w-full h-full">
//                           <YoutubeIframe videoId={item.youtubeId} />
//                           <button
//                             onClick={() => setActiveVideo(null)}
//                             className="absolute -top-1 -right-1 z-20 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
//                             aria-label="Close video"
//                           >
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ) : (
//                         // <></>
//                         <DirectVideoPlayer
//                           src={item.video}
//                           onClose={() => setActiveVideo(null)}
//                         />
//                       )
//                     ) : item.isYoutube ? (
//                       <YoutubeThumbnail
//                         videoId={item.youtubeId}
//                         onClick={() => setActiveVideo(item.video)}
//                       />
//                     ) : (
//                       <VideoThumbnail
//                         src={item.video}
//                         onClick={() => setActiveVideo(item.video)}
//                       />
//                     )}
//                   </div>

//                   {/* Info bar */}
//                   <div className="mt-4 flex items-center justify-between gap-3">
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
//                       <div className="flex-shrink-0 px-3 py-1.5 bg-[#FF6B35]/10 rounded-full">
//                         <span className="text-xs font-semibold text-[#FF6B35]">
//                           ▶ Watch
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
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
//             bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
//             flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
//             transition-all duration-200 hover:scale-105 active:scale-95"
//           aria-label="Previous"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         <button
//           onClick={() => slider?.current?.next()}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 
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
//   const imageTestimonials = data?.data?.filter(
//     (ele: any) => ele.type === "image",
//   ) || [];

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
//     <div className="bg-gradient-to-b from-gray-50 to-gray-100 mt-10 py-12 md:py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <div
//             className="prose prose-headings:mb-0"
//             dangerouslySetInnerHTML={{ __html: heading?.fields["title"] }}
//           />
//         </div>

//         {/* Slider Container */}
//         <div className="relative">
//           {/* Side Fades */}
//           <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none rounded-l-2xl" />
//           <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none rounded-r-2xl" />

//           <div ref={sliderRef} className="keen-slider">
//             {imageTestimonials.map((item: any, idx: number) => (
//               <div key={idx} className="keen-slider__slide">
//                 <div className="h-full    flex flex-col">
//                   {/* Quote icon */}
//                   <div className="mb-4">
//                     <div className="w-16 h-16 rounded-xl absolute -top-3 left-0 z-100 flex items-center justify-center">
//                       {/* <Quote
//                         size={60}
//                         className="text-[#FF6B35]"
//                         fill="currentColor"
//                       /> */}
//                       <img src="/icon/text.png" alt="icon" />
//                        {/* &ldquo; */}
//                     </div>
//                   </div>

//                 <div className=" bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  
//                   {/* Message */}
//                   <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px] flex-1 line-clamp-6">
//                     &ldquo;{item.message}&rdquo;
//                   </p>

//                   {/* Bottom section */}
//                   <div className="mt-6 pt-5 border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <div className="flex gap-2 items-center">
//                         <img src={item.image} alt="img" className="h-14 w-14 rounded-full" />
//                         <div>
//                         <p className="font-bold text-gray-900 text-base">
//                           {item.name}
//                         </p>
//                         <p className="text-[#FF6B35] text-sm font-semibold ">
//                           {item.score}
//                         </p>
//                         </div>
//                       </div>

//                       {/* Stars */}
//                       <div className="flex gap-0.5">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={16}
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

//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Arrows */}
//           <button
//             onClick={() => slider?.current?.prev()}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 
//               bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
//               flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
//               transition-all duration-200 hover:scale-105 active:scale-95"
//             aria-label="Previous"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           <button
//             onClick={() => slider?.current?.next()}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 
//               bg-white rounded-full shadow-lg shadow-black/10 border border-gray-100
//               flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white
//               transition-all duration-200 hover:scale-105 active:scale-95"
//             aria-label="Next"
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-8">
//           {imageTestimonials.map((_: any, i: number) => (
//             <button
//               key={i}
//               onClick={() => slider?.current?.moveToIdx(i)}
//               className={`rounded-full transition-all duration-300 ${
//                 currentSlide === i
//                   ? "w-8 h-3 bg-[#FF6B35]"
//                   : "w-3 h-3 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/40"
//               }`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }