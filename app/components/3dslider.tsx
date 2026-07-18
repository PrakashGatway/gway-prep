import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Mousewheel, FreeMode, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import { useState } from "react";




export function StudentsSlider({ data }) {
const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="w-full py-12 sm:px-6">
            <Swiper
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                centeredSlides
                 onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                loop
                grabCursor
                slidesPerView={"auto"}
                spaceBetween={70}
                speed={700}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 30,
                    depth: 120,
                    modifier: 1,
                    scale: 0.95,
                    slideShadows: false,
                }}
                className="students-swiper py-12"
            >
                {[...data, ...data].map((item, i) => {
                    const len = data.length;
                    const current = i % len;

                    const diff =
                        (current - activeIndex + len) % len;

                    let translate = "";

                    if (diff === 0) {
                        // Active
                        translate = "-translate-y-4";
                    } else if (diff === 1 || diff === len - 1) {
                        // Left & Right
                        translate = "-translate-y-6";
                    } else if (diff === 2 || diff === len - 2) {
                        translate = "translate-y-6";
                    } else if (diff === 3 || diff === len - 3) {
                        translate = "-translate-y-6";
                    }
                    return (
                        <SwiperSlide
                            key={i}
                            className="!w-[280px] py-12 transition-transform duration-500"
                        >
                            {({ isActive }) => (
                                <div
                                    className={`group relative bg-white shadow-[0_20px_40px_-15px_rgba(58,13,31,0.25)] p-2.5 ring-black/5 overflow-hidden transition-all duration-500 ${translate} ${isActive ? "scale-103 opacity-100 shadow-[0_30px_60px_-20px_rgba(58,13,31,0.45)]" : "opacity-90"
                                        }`}
                                >
                                    <div
                                        className={`relative h-[200px] bg-gradient-to-tl bg-[#FE8E6D] from-[#FE8E6D] to-white`}
                                    >
                                        <img
                                            src={item?.image}
                                            className="h-full w-full object-cover mx-auto  transition-transform duration-500"
                                            alt={item?.name}
                                        />
                                    </div>
                                    <span className={`flex justify-center w-full text-base text-center font-semibold bg-[${item?.colorCode || '#000'}] text-white px-2 py-1.5`}>
                                        {item?.course || ""}
                                    </span>

                                    <div className="p-2 text-left">
                                        <div className="text-lg font-semibold text-[#1a1a1a] leading-tight">
                                            {item.name}
                                        </div>
                                        <div className="text-sm font-medium text-neutral-500 mt-0.5">
                                            Standardized Test Results
                                        </div>
                                        <div className="mt-0.5 text-sm font-medium text-neutral-500">Score</div>
                                        <div className="text-3xl font-extrabold text-[#ff5722] leading-none">
                                            {item?.score}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    );
}
