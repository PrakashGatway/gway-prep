import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Mousewheel, FreeMode, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import { useState } from "react";

export function StudentsSlider({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="w-full px-2 sm:px-4 md:px-6">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        centeredSlides
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        grabCursor
        slidesPerView={"auto"}
        spaceBetween={20}
        speed={700}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 80,
          modifier: 1,
          scale: 0.9,
          slideShadows: false,
        }}
        breakpoints={{
          320: {
            spaceBetween: 15,
            coverflowEffect: {
              stretch: 5,
              depth: 40,
              scale: 0.85,
            }
          },
          480: {
            spaceBetween: 20,
            coverflowEffect: {
              stretch: 8,
              depth: 60,
              scale: 0.9,
            }
          },
          640: {
            spaceBetween: 30,
            coverflowEffect: {
              stretch: 15,
              depth: 80,
              scale: 0.9,
            }
          },
          768: {
            spaceBetween: 40,
            coverflowEffect: {
              stretch: 20,
              depth: 100,
              scale: 0.95,
            }
          },
          1024: {
            spaceBetween: 70,
            coverflowEffect: {
              stretch: 30,
              depth: 120,
              scale: 0.95,
            }
          }
        }}
        className="students-swiper py-6 sm:py-8 md:py-10 lg:py-12"
      >
        {data.map((item, i) => {
          const len = data.length;
          const current = i % len;
          const diff = (current - activeIndex + len) % len;

          let translate = "";

          if (diff === 0) {
            translate = "-translate-y-2 sm:-translate-y-3 md:-translate-y-4";
          } else if (diff === 1 || diff === len - 1) {
            translate = "-translate-y-3 sm:-translate-y-4 md:-translate-y-6";
          } else if (diff === 2 || diff === len - 2) {
            translate = "translate-y-3 sm:translate-y-4 md:translate-y-6";
          } else if (diff === 3 || diff === len - 3) {
            translate = "-translate-y-3 sm:-translate-y-4 md:-translate-y-6";
          }
          
          return (
            <SwiperSlide
              key={i}
              className="!w-[180px] sm:!w-[200px] md:!w-[220px] lg:!w-[260px] py-6 sm:py-8 md:py-10 lg:py-12 transition-transform duration-500"
            >
              {({ isActive }) => (
                <div
                  className={`group relative bg-white shadow-[0_20px_40px_-15px_rgba(58,13,31,0.25)]
                    p-2 sm:p-2.5 ring-black/5 overflow-hidden transition-all duration-500 
                    
                    ${translate} 
                    ${isActive 
                      ? "scale-100 sm:scale-102 md:scale-103 opacity-100 shadow-[0_30px_60px_-20px_rgba(58,13,31,0.45)]" 
                      : "opacity-70 sm:opacity-80 md:opacity-90"
                    }`}
                >
                  <div
                    className={`relative  w-full h-full bg-gradient-to-bl bg-[#FE8E6D] from-[#FE8E6D] to-white`}
                  >
                    <img
                      src={item?.image}
                      width={410}
                      height={486}
                      className="h-full w-48 mx-auto object-contain duration-500"
                      alt={item?.name}
                    />

                    <span
                      className={`absolute bottom-0 flex justify-center w-full text-xs sm:text-sm md:text-2xl text-center font-semibold
                         text-white px-2 py-1 sm:py-0 `}
                      style={{ backgroundColor: item?.colorCode || '#000' }}
                    >
                      {item?.course || ""}
                    </span>
                  </div>
                  

                  <div className="p-1.5 sm:px-6 sm:pb-3 text-left">
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-[#1a1a1a] leading-tight truncate">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-neutral-500 ">
                      Standardized Test Results
                    </div>
                    <div className=" text-xs sm:text-sm font-medium text-neutral-500">Score</div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-extrabold text-[#ff5722] leading-none">
                      {item?.score}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}













// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Autoplay, Mousewheel, FreeMode, Keyboard } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/free-mode";
// import { useState } from "react";




// export function StudentsSlider({ data }) {
// const [activeIndex, setActiveIndex] = useState(0);
//     return (
//         <div className="w-full  sm:px-6">
//             <Swiper
//                 modules={[EffectCoverflow, Autoplay]}
//                 effect="coverflow"
//                 centeredSlides
//                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                 loop
//                 grabCursor
//                 slidesPerView={"auto"}
//                 spaceBetween={70}
//                 speed={700}
//                 autoplay={{
//                     delay: 2500,
//                     disableOnInteraction: false,
//                 }}
//                 coverflowEffect={{
//                     rotate: 0,
//                     stretch: 30,
//                     depth: 120,
//                     modifier: 1,
//                     scale: 0.95,
//                     slideShadows: false,
//                 }}
//                 className="students-swiper py-12"
//             >
//                 {/* {[...data, ...data].map((item, i) => { */}
//                 {data.map((item, i) => {
//                     const len = data.length;
//                     const current = i % len;

//                     const diff =
//                         (current - activeIndex + len) % len;

//                     let translate = "";

//                     if (diff === 0) {
//                         // Active
//                         translate = "-translate-y-4";
//                     } else if (diff === 1 || diff === len - 1) {
//                         // Left & Right
//                         translate = "-translate-y-6";
//                     } else if (diff === 2 || diff === len - 2) {
//                         translate = "translate-y-6";
//                     } else if (diff === 3 || diff === len - 3) {
//                         translate = "-translate-y-6";
//                     }
//                     return (
//                         <SwiperSlide
//                             key={i}
//                             className="!w-[240px] py-12 transition-transform duration-500"
//                         >
//                             {({ isActive }) => (
//                                 <div
//                                     className={`group relative bg-white shadow-[0_20px_40px_-15px_rgba(58,13,31,0.25)]
//                                          p-2.5 ring-black/5 overflow-hidden transition-all duration-500 ${translate} ${isActive ? "scale-103 opacity-100 shadow-[0_30px_60px_-20px_rgba(58,13,31,0.45)]" : "opacity-90"
//                                         }`}
//                                 >
//                                     <div
//                                         className={`relative h-[140px] bg-gradient-to-bl bg-[#FE8E6D] from-[#FE8E6D] to-white`}
//                                     >
//                                         <img
//                                             src={item?.image}
//                                             className="h-full w-full object-contain mx-auto  transition-transform duration-500"
//                                             alt={item?.name}
//                                         />
//                                     </div>
//                                     <span className={`flex justify-center w-full text-base text-center font-semibold bg-[${item?.colorCode || '#000'}] text-white px-2 py-1.5`}>
//                                         {item?.course || ""}
//                                     </span>

//                                     <div className="p-2 text-left">
//                                         <div className="text-lg font-semibold text-[#1a1a1a] leading-tight">
//                                             {item.name}
//                                         </div>
//                                         <div className="text-sm font-medium text-neutral-500 mt-0.5">
//                                             Standardized Test Results
//                                         </div>
//                                         <div className="mt-0.5 text-sm font-medium text-neutral-500">Score</div>
//                                         <div className="text-3xl font-extrabold text-[#ff5722] leading-none">
//                                             {item?.score}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </SwiperSlide>
//                     )
//                 })}
//             </Swiper>
//         </div >
//     );
// }
