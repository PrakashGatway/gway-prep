import Image from "next/image";

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
    date: "22 Apr 2025",
    image: "/image/blog-1.jpg",
  },
  {
    id: 2,
    title:
      "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
    date: "22 Apr 2025",
    image: "/image/blog-2.jpg",
  },
  {
    id: 3,
    title:
      "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
    date: "22 Apr 2025",
    image: "/image/blog-3.jpg",
  },
];

export default function Blog() {
  return (
    <>
   
  
    <section className="relative overflow-hidden  bg-[url('/image/about-hero-bg.jpg')]
    bg-cover bg-center bg-no-repeat py-20 px-4">
      {/* Decorative blobs */}
      <div className="absolute lg:-left-210 lg:-top-15 lg:w-[150%] lg:h-[150%] bg-[url('/image/shape-1.png')]
    bg-cover bg-center bg-no-repeat" />
      <div className="absolute lg:-right-180 lg:-top-80 lg:w-[60%] lg:h-[75%] bg-[url('/image/shape-2.png')]
    bg-cover bg-center bg-no-repeat" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-[150px]  font-extrabold text-brand-orange">
            BLOGS
          </h1>
          <p className="text-gray-600 text-xl font-medium mt-3">
            Abroad Insights: News and Tips for Students
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-6xl mx-auto  mb-10 ">
          <div className="flex items-center bg-white rounded-full border border-gray-400 px-5 py-3">
            <span className="text-xl mr-3">🔍</span>
            <input
              type="text"
              placeholder="What are you looking for ?"
              className="flex-1 outline-none text-lg text-gray-600"
            />
            <button className="text-gray-500 font-medium text-2xl">Search</button>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-12 justify-start md:justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-5 py-2 rounded-full border text-sm whitespace-nowrap
              ${
                cat === "ALL"
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "border-brand-orange text-gray-700 hover:bg-brand-orange hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BLOG CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full h-[200px] object-cover"
              />

              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-gray-700 mb-2">{blog.title}</p>
                <span className="text-xs text-brand-orange mb-4">
                  {blog.date}
                </span>

                <button className="mt-auto bg-brand-orange text-white py-2 rounded-md">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
