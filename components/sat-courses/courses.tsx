"use client";

import { ImageBaseUrl } from "@/services/axiosInstance";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { BookOpen, Clock, Languages } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getStudent } from "@/app/services/api";

export default function SATCourses({
  courses,
  categories,
  allCourses,
}: {
  courses: any[];
  categories: any[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search"));
  const [sort, setSort] = useState("");

  const handleSort = (sortValue) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sortValue);

    router.push(`/courses?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`/courses?${params.toString()}`);
  };

  const [allCoursesSliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 2,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 1280px)": {
          slides: { perView: 4, spacing: 20 },
        },
        "(max-width: 1023px)": {
          slides: { perView: 2, spacing: 16 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 12 },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        const clearNextTimeout = () => clearTimeout(timeout);
        const nextTimeout = () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => slider.next(), 2000);
        };
        slider.on("created", nextTimeout);
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  const useAllCoursesSlider = allCourses.length > 3;

  return (
    <>
      <section
        className="
        relative w-full overflow-hidden
        bg-cover bg-no-repeat
        min-h-[430px] md:min-h-[500px]
      "
        style={{
          backgroundImage: "url('/image/hero-course1.webp')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">
          <div
            className="
            min-h-[430px] md:min-h-[500px]
            flex flex-col md:flex-row
            items-center justify-between
            gap-8
          "
          >
            {/* LEFT CONTENT */}
            <div className="w-full md:w-[52%] lg:w-[55%] z-10 py-10 md:py-0">
              <h1
                className="
                text-4xl sm:text-5xl lg:text-5xl
                leading-[1.05]
                font-extrabold
                tracking-tight
              "
              >
                <span className="block text-[#F36D45]">Your SAT score</span>

                <span className="block text-[#1C3058] mt-2">starts Here.</span>
              </h1>

              <p
                className="
                mt-6
                max-w-[580px]
                text-base sm:text-lg
                lg:text-[20px]
                leading-relaxed
                text-[#333333]
              "
              >
                Focused courses, expert guidance, and realistic practice to help
                you prepare with confidence—one lesson at a time.
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap gap-4">
                <button
                  className="
                  px-7 py-3
                  rounded-lg
                  bg-[#F36D45]
                  text-white
                  font-semibold
                  shadow-md
                  transition-all duration-300
                  hover:bg-[#e85e37]
                  hover:-translate-y-1
                  hover:shadow-lg
                "
                >
                  Start Preparing
                </button>

                <button
                  className="
                  px-7 py-3
                  rounded-lg
                  border-2 border-[#1C3058]
                  text-[#1C3058]
                  font-semibold
                  bg-white/70
                  transition-all duration-300
                  hover:bg-[#1C3058]
                  hover:text-white
                "
                >
                  Explore SAT
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="
              w-full md:w-[48%] lg:w-[45%]
              flex justify-center md:justify-end
              items-end
              self-end
            "
            >
              <div className="absolute text-white font-bold top-37 text-[60px] z-10 right-65">{categories.name}</div>
              <img
                src="/image/hero-course.webp"
                alt="SAT preparation"
                className="
                w-[280px]
                sm:w-[350px]
                md:w-[420px]
                lg:w-[500px]
                xl:w-[400px]
                h-auto
                object-contain
                drop-shadow-sm
              "
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-0 py-5">
          {/* Heading */}
          <div>
            <h2 className="text-[26px] md:text-4xl font-bold text-[#2D2D2D] leading-tight">
              Find your course
            </h2>

            <p className="mt-2 text-[16px] md:text-[17px] text-[#333333]">
              Choose your exam and find the right way to prepare.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-7 flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
            {/* Course Tabs */}
            <div
              className="
          flex items-center
          bg-[#FFF1E9]
          rounded-[9px]
          p-[3px]
          overflow-hidden
          w-fit
        "
            >
              {/* Active */}
              <button
                className="
            h-[34px]
            px-3
            rounded-[8px]
            bg-black
            text-white
            text-[15px]
            font-semibold
            whitespace-nowrap
            shadow-sm
          "
              >
                All SAT Courses
              </button>

              {/* Tab */}
              <button
                onClick={() => handleSort("-createdAt")}
                className="
            h-[32px]
            px-2.5
            text-[14px]
            text-[#333]
            whitespace-nowrap
            border-r border-[#D8C9C1]
            hover:text-[#F36D45]
            transition-colors
          "
              >
                Newest First
              </button>

              <button
                onClick={() => handleSort("createdAt")}
                className="
            h-[32px]
            px-2.5
            text-[14px]
            text-[#333]
            whitespace-nowrap
            hover:text-[#F36D45]
            transition-colors
          "
              >
                Oldest First
              </button>
            </div>

            {/* Search */}
            <div className="w-full lg:w-[500px] grid grid-cols-[1.3fr_0.7fr] gap-4">
              <div className="h-[35px] w-full flex items-center rounded-[8px] bg-[#FFF1E9] px-3">
                <svg
                  className="w-4 h-4 text-gray-500 mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  />
                </svg>

                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                  }}
                  placeholder="Search courses"
                  className="
        w-full
        bg-transparent
        text-[14px]
        text-[#333]
        outline-none
        placeholder:text-gray-500
      "
                />
              </div>
              <div
                onClick={handleSearch}
                className="
            h-[35px]
            w-full
            flex items-center
            justify-center
            bg-[#FFF1E9]
            rounded-[8px]
            text-[14px]
            text-[#333]
            cursor-pointer
            hover:bg-[#FFE8DD]
            transition-colors
            
          "
              >
                Search
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border p-2 animate-pulse"
                >
                  <div className="h-110 rounded-2xl bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center py-16">
              <h3 className="text-2xl font-bold text-gray-800">
                No Courses Found
              </h3>
              <p className="mt-2 text-gray-500">
                Try searching with a different keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
              {courses.map((course) => (
                <CourseCard
                  key={course._id || course.id}
                  course={course}
                  variant="grid"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <FreeCourseBanner />
      <SATSuccessStories />

      {allCourses.length > 0 && (
        <section className="w-full rounded-3xl bg-white dark:bg-gray-800 p-4 sm:p-6 lg:py-7 lg:px-0 lg:my-5 max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-xl md:text-4xl font-bold text-[#222] dark:text-white">
              Explore Other Test Preps
            </h2>
            <span className="font-medium text-xl">
              Explore subject-wise courses to strengthen your core skills
            </span>
          </div>

          {useAllCoursesSlider ? (
            <div ref={allCoursesSliderRef} className="keen-slider">
              {allCourses.map((item) => (
                <AllCourseCard key={item._id || item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {allCourses.map((item) => (
                <AllCourseCard key={item._id || item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export const CourseCard = ({ course, variant = "grid" }) => {
  const realPrice = course?.pricing?.amount || 0;
  const earlyBird = course?.pricing?.earlyBird;

  const navigate = useRouter();

  const formatPrice = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isEarlyBirdActive =
    !!earlyBird?.deadline &&
    new Date(earlyBird.deadline).getTime() > Date.now();

  let price = realPrice;
  if (isEarlyBirdActive) {
    price = price - (price * (earlyBird?.discount || 0)) / 100;
  }
  const earlyBirdDiscount = isEarlyBirdActive ? earlyBird?.discount || 0 : 0;
  const normalDiscount = course?.pricing?.discount || 0;
  price = price - (price * normalDiscount) / 100;

  const isSlider = variant === "slider";

  return (
    <div className={isSlider ? "keen-slider__slide p-0 " : ""}>
      <div className="w-full h-full  p-5 overflow-hidden">
        {/* Outer Gradient Border */}
        <div
          className="h-full rounded-[32px] p-[1.5px] bg-gradient-to-b from-white via-gray-200 to-gray-500 overflow-hidden  
  transition-all duration-300
 "
        >
          <div className="relative flex h-full flex-col rounded-[32px] bg-white overflow-hidden">
            {/* ================= IMAGE ================= */}
            <div className="shrink-0">
              <div className="rounded-[32px] p-2.5 bg-gradient-to-b from-[#CFCFCF] via-[#ECECEC] to-white">
                <div className="rounded-[32px] overflow-hidden h-full sm:h-full lg:h-[180px]">
                  <img
                    src={
                      !course.thumbnail?.url
                        ? "/images/logo.png"
                        : `${ImageBaseUrl}/${course.thumbnail.url}`
                    }
                    alt={course?.title}
                    className="w-full h-full object-contain lg:object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Discount Badge */}
            {isEarlyBirdActive && (
              <span className="absolute top-5 left-5 z-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8A3D] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                Early Bird
              </span>
            )}

            {/* ================= BODY ================= */}
            <div
              onClick={() => navigate(`/course/${course.slug}`)}
              className="flex flex-1 flex-col px-6 pb-4 cursor-pointer"
            >
              {/* Title */}
              <div className="flex items-center justify-between ">
                <h3 className="text-xl md:text-lg font-bold text-gray-900 leading-tight line-clamp-1 w-55">
                  <span className="text-[#FF6736]">
                    {course?.title?.split(" ")[0]}
                  </span>{" "}
                  <span className="text-gray-900">
                    {course?.title?.split(" ").slice(1).join(" ")}
                  </span>
                </h3>
                {/* Discount Badge */}
                {normalDiscount > 0 && (
                  <span className="flex z-10 bg-green-500 text-white px-3 py-1 rounded-full">
                    <span className="text-[10px] font-medium">
                      {Math.ceil(normalDiscount)}% OFF
                    </span>

                    {isEarlyBirdActive && (
                      <span className="ml-0.5 text-[10px] font-semibold">
                        +{earlyBirdDiscount}%
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm font-medium mt-2 line-clamp-1">
                {course.shortDescription || course.subtitle}
              </p>

              {/* ================= META ================= */}
              <div className="mt-3 text-gray-600 flex flex-wrap items-center gap-4">
                {/* Instructor */}
                <div className="flex items-center gap-1 text-base">
                  <BookOpen size={20} className="text-[#FF6736] shrink-0" />

                  <span className="text-sm">
                    {course.instructors?.length || 1} Instructor
                  </span>
                </div>

                {/* Language */}
                <div className="flex items-center gap-1 text-base line-clamp-1">
                  <Languages size={20} className="text-[#FF6736] shrink-0" />

                  <span className="text-sm">
                    {course.language || "English"}
                  </span>
                </div>

                {/* Level */}
                <div className="flex items-center gap-1 text-base">
                  <Clock size={20} className="text-[#FF6736] shrink-0" />

                  <span className="text-sm">{course.level || "Beginner"}</span>
                </div>
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className=" px-5 pb-2 hidden lg:block">
              {/* ================= PRICE ================= */}
              <div className="mb-3 flex justify-start items-center gap-3">

                <div>
                   <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course?.slug}`);
                      }}
                      className="border border-[#FF6736] rounded-xl px-5 py-2 text-[#FF6736] text-sm font-medium hover:bg-[#FF6736] hover:text-white transition-all duration-300 whitespace-nowrap"
                    >
                      Explore Now
                    </button>
                </div>

                <div>
                   <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course?.slug}`);
                      }}
                      className="border border-[#FF6736] rounded-xl px-5 py-2 text-white text-sm font-medium bg-[#FF6736] hover:text-white transition-all duration-300 whitespace-nowrap"
                    >
                      Book Now
                    </button>
                </div>
              </div>
              <div className="rounded-full bg-[#FCE7D3] flex items-center p-2">
                <span className="bg-[#FF6D42] text-white rounded-full px-4 py-1 text-xs font-semibold">
                  Ooshas Prep
                </span>

                <span className="ml-3 text-gray-700 text-xs">
                  Limited Time Offer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FreeCourseBanner = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px] sm:rounded-[32px] lg:rounded-[38px]
            bg-gradient-to-r from-[#FFF0BD] via-[#FFDDBA] to-[#FFB79D]
            px-6 py-8
            sm:px-10 sm:py-10
            md:px-12
            lg:px-20 lg:py-14
          "
        >
          {/* Decorative circle */}
          <div
            className="
              absolute
              -top-28
              left-[48%]
              h-[300px]
              w-[300px]
              rounded-full
              border-[18px]
              border-white/25
              pointer-events-none
            "
          />

          {/* Small inner circle */}
          <div
            className="
              absolute
              -top-16
              left-[51%]
              h-[170px]
              w-[170px]
              rounded-full
              bg-white/10
              pointer-events-none
            "
          />

          {/* Content */}
          <div
            className="
              relative z-10
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* Left Content */}
            <div className="max-w-4xl">
              <p
                className="
                  text-base
                  sm:text-lg
                  lg:text-[20px]
                  leading-tight
                  text-[#292929]
                "
              >
                Try before you commit
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  sm:text-3xl
                  lg:text-[32px]
                  font-bold
                  leading-tight
                  tracking-tight
                  text-[#252525]
                "
              >
                Start with a free course.
              </h2>

              <p
                className="
                  mt-2
                  max-w-3xl
                  text-sm
                  sm:text-base
                  lg:text-[19px]
                  leading-relaxed
                  text-[#333333]
                "
              >
                Explore Ooshas Prep, find your rhythm, and keep moving toward
                your target score.
              </p>
            </div>

            {/* CTA */}
            <div className="relative z-10 shrink-0">
              <button
                type="button"
                className="
                  w-full
                  sm:w-auto
                  rounded-[13px]
                  bg-[#292929]
                  px-6
                  sm:px-7
                  py-3.5
                  sm:py-4
                  text-base
                  sm:text-lg
                  font-bold
                  text-white
                  whitespace-nowrap
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#1f1f1f]
                  hover:shadow-lg
                  active:translate-y-0
                "
              >
                Explore Free Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SATSuccessStories = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      const data = await getStudent("SAT", 1, 8);
      console.log(data);
      setStudentData(data.data);
    };
    fetchStudent();
  }, []);

  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    loop: studentData.length > 4,
    mode: "snap",

    slides: {
      perView: 4,
      spacing: 16,
    },

    breakpoints: {
      "(max-width: 1280px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },

      "(max-width: 900px)": {
        slides: {
          perView: 2,
          spacing: 14,
        },
      },

      "(max-width: 600px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  return (
    <section className="w-full bg-[#F86B45] py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 lg:px-0">
        {/* ================= HEADER ================= */}
        <div className="mb-7 sm:mb-8 md:mb-10">
          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-[44px]
              lg:text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
            "
          >
            SAT Success Stories
          </h2>

          <p
            className="
              mt-3
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-2xl
              font-normal
              leading-tight
              text-white
            "
          >
            SAT Students. Real Goals. Real Scorers.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            type="button"
            aria-label="Previous success story"
            onClick={() => sliderInstanceRef.current?.prev()}
            className="
              absolute
              left-[-8px]
              sm:left-[-28px]
              md:left-[-40px]
              top-1/2
              z-20
              -translate-y-1/2

              flex
              h-9
              w-9
              sm:h-11
              sm:w-11
              items-center
              justify-center

              text-4xl
              sm:text-5xl
              font-light
              text-white

              transition-all
              duration-300

              hover:scale-110
            "
          >
            ‹
          </button>

          {/* SLIDER */}
          <div ref={sliderRef} className="keen-slider overflow-hidden">
            {studentData.map((student) => (
              <div key={student.name} className="keen-slider__slide">
                <SuccessCard student={student} />
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            type="button"
            aria-label="Next success story"
            onClick={() => sliderInstanceRef.current?.next()}
            className="
              absolute
              right-[-8px]
              sm:right-[-28px]
              md:right-[-40px]
              top-1/2
              z-20
              -translate-y-1/2

              flex
              h-9
              w-9
              sm:h-11
              sm:w-11
              items-center
              justify-center

              text-4xl
              sm:text-5xl
              font-light
              text-white

              transition-all
              duration-300

              hover:scale-110
            "
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SUCCESS CARD
========================================================= */

function SuccessCard({ student }) {
  return (
    <div
      className="
        relative
        h-[190px]
        sm:h-[200px]
        md:h-[210px]
        lg:h-[180px]

        w-full

        overflow-hidden

        rounded-[25px]
        sm:rounded-[28px]

        border-[2px]
        border-white

        bg-white

        shadow-sm
      "
    >
      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
        "
      >
        {/* TOP CONTENT */}
        <div
          className="
            flex
            flex-1
            items-start
            justify-between
            px-5
            pt-5
            sm:px-6
            sm:pt-12
          "
        >
          {/* SCORE */}
          <div>
            <p
              className="
                text-sm
                sm:text-base
                md:text-lg
                font-medium
                text-black
              "
            >
              SAT Score
            </p>

            <p
              className="
                mt-1
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                leading-none
                text-[#F36D45]
              "
            >
              {student.score}
            </p>
          </div>

          {/* STUDENT IMAGE */}
          <div
            className="
              absolute
              right-2
              bottom-[44px]

              h-[150px]
              sm:h-[165px]
              md:h-[175px]
              lg:h-[110px]

              w-[145px]
              sm:w-[155px]
              md:w-[165px]
              lg:w-[175px]

              flex
              items-end
              justify-center
            "
          >
            <Image
              src={student.image}
              alt={student.name}
              fill
              sizes="
                (max-width: 640px) 150px,
                (max-width: 1024px) 165px,
                175px
              "
              className="
                object-contain
                object-bottom
              "
            />
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div
          className="
            mx-5
            sm:mx-6
            border-t-2
            border-[#F36D45]
          "
        />

        {/* FOOTER */}
        <div
          className="
            flex
            h-[42px]
            items-center
            justify-between
            gap-2
            px-5
            sm:px-6
          "
        >
          <span
            className="
              whitespace-nowrap
              text-xs
              sm:text-sm
              md:text-base
              font-medium
              text-black
            "
          >
            Target {student.target}
          </span>

          <span
            className="
              truncate
              text-xs
              sm:text-sm
              md:text-base
              font-bold
              text-black
            "
          >
            {student.name}
          </span>
        </div>
      </div>
    </div>
  );
}

const AllCourseCard = ({ item }) => {
  const realPrice = item?.pricing?.amount || 0;
  const earlyBird = item?.pricing?.earlyBird;
  const isEarlyBirdActive =
    !!earlyBird?.deadline &&
    new Date(earlyBird.deadline).getTime() > Date.now();

  let price = realPrice;
  if (isEarlyBirdActive) {
    price = price - (price * (earlyBird?.discount || 0)) / 100;
  }
  const earlyBirdDiscount = isEarlyBirdActive ? earlyBird?.discount || 0 : 0;
  const normalDiscount = item?.pricing?.discount || 0;
  price = price - (price * normalDiscount) / 100;

  return (
    <div className="bg-gradient-to-b from-[#CFCFCF] via-[#ECECEC] to-black dark:bg-gray-800 p-[1px] rounded-[22px] relative keen-slider__slide h-full">
      {isEarlyBirdActive && (
        <div className="absolute top-0 left-0 z-10">
          <span className="inline-flex items-center gap-1 rounded-tl-[22px] rounded-br-[22px] bg-gradient-to-r from-[#FF6B35] to-[#FF8A3D] px-3 py-1 text-xs font-bold text-white shadow-lg">
            Early Bird
          </span>
        </div>
      )}
      <div className="overflow-hidden rounded-[22px] border border-[#d8d8d8] bg-white dark:bg-gray-800 shadow-sm">
        <div className="p-[6px] rounded-2xl bg-gradient-to-b from-[#CFCFCF] via-[#ECECEC] to-white">
          <div className="relative overflow-hidden">
            <img
              src={
                item?.thumbnail?.url
                  ? `${ImageBaseUrl}/${item.thumbnail.url}`
                  : "/images/course-thumbnail.webp"
              }
              alt={item?.title}
              className="h-35 w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="text font-bold leading-none line-clamp-1 text-base">
            <span className="text-orange-500">
              {item?.title?.split(" ")[0]}
            </span>{" "}
            <span className="text-black dark:text-white  font-semibold">
              {item?.title?.split(" ").slice(1).join(" ")}
            </span>
          </h3>

          <a
            href={
              item.categoryInfo.name == "SAT"
                ? `/course/${item?.slug}`
                : "/coming-soon"
            }
            className="flex justify-center"
          >
            <button className="mt-5 py-2 w-1/2 text-sm rounded-xl border border-[#ff5b2e] text-[#ff5b2e] font-medium transition-all duration-300 hover:bg-[#ff5b2e] hover:text-white">
              Explore
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
