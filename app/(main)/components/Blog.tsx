import Image from "next/image";
import Link from "next/link";

const categories = [
  "ALL",
  "UK",
  "USA",
  "IRELAND",
  "DUBAI",
  "CANADA",
  "VISA",
  "NEW ZEALAND",
  "PTE",
  "SAT",
];

const blogs = [
  {
    id: 1,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 2,
    title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 3,
    title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 4,
    title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 5,
    title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
  {
    id: 6,
    title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    slug: "day-1-cpt-programs-usa",
    date: "22 Apr 2025",
    image: "/image/blog-img.jpg",
  },
];

export default function Blog() {
  return (
    <>
        <div className="bg-[url('/image/about-hero-bg.jpg')] absolute bg-cover bg-center bg-no-repeat h-80 w-full"/>

      <section className="relative overflow-hidden  py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute lg:-left-210 lg:-top-15 lg:w-[150%] lg:h-[150%] bg-[url('/image/shape-1.png')] bg-cover bg-center bg-no-repeat" />

        
        
        
        <div className="lg:absolute lg:-right-316 lg:-top-130 lg:w-[90%] lg:h-[75%] bg-[url('/image/shape-2.png')] bg-cover bg-center bg-no-repeat" />

        <div className="relative z-10 max-w-7xl mx-auto ">
          {/* HEADING */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[150px] font-extrabold text-brand-orange">
              BLOGS
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium mt-2 md:mt-3">
              Abroad Insights: News and Tips for Students
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-6xl mx-auto mb-8 md:mb-10">
            <div className="flex items-center bg-white rounded-full border border-gray-400 px-4 sm:px-5 py-2 sm:py-3">
              <span className="text-lg sm:text-xl mr-2 sm:mr-3">🔍</span>
              <input
                type="text"
                placeholder="What are you looking for ?"
                className="flex-1 outline-none text-sm sm:text-base md:text-lg text-gray-600"
              />
              <button className="text-gray-500 font-medium text-lg sm:text-xl md:text-2xl">Search</button>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 mb-8 md:mb-12 justify-start md:justify-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm whitespace-nowrap
                ${cat === "ALL"
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "border-brand-orange text-gray-700 hover:bg-brand-orange hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BLOG CARDS */}
          <div className="relative px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {blogs.map((blog, i) => (
                <div
                  key={i}
                  className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] bg-no-repeat bg-contain bg-center lg:ml-[60px]"
                  style={{
                    backgroundImage: "url('/image/blog-card-shape-1.png')",
                  }}
                >
                  {/* INNER CONTENT */}
                  <div className="absolute inset-0 flex items-center px-4 sm:px-5 md:px-6 lg:px-8">
                    {/* IMAGE */}
                    <div className="w-[45%] sm:w-[50%] md:w-[55%] lg:absolute lg:-left-[60px] shrink-0">
                      <div
                        className="h-18 sm:h-32 md:h-25 lg:h-30 xl:h-49 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${blog.image || "/placeholder.svg"})`,
                          WebkitMaskImage: "url('/card-02.png')",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskSize: "100% 100%",
                          maskImage: "url('/image/blog-card-shape-2.png')",
                          maskRepeat: "no-repeat",
                          maskSize: "100% 100%",
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="ml-4 sm:ml-5 md:ml-6 lg:mt-20 lg:ml-60 flex flex-col h-[47%] md:h-[42%] lg:h-full lg:py-10">
                      <h3 className="text-xs sm:text-sm md:text-sm lg:text-lg font-medium leading-snug mb-1 sm:mb-2 line-clamp-2">
                        {blog.title}
                      </h3>

                      <span className="text-xs sm:text-sm md:text-sm font-medium text-brand-orange mb-2 sm:mb-3 md:mb-4">
                        {blog.date}
                      </span>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline text-white bg-brand-orange rounded-full lg:p-3 text-center font-medium text-xs sm:text-sm md:text-sm lg:text-base md:p-4 p-3 cursor-pointer"
                      >
                        Read more
                      </Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

    </>
  );
}