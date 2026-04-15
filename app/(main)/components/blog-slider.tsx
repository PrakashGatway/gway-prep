import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const blogs = [
  {
    title: "Preparing for TOEFL Speaking Scoring",
    desc: "Particularly for non-native English speakers, the TOEFL Speaking segment can be a difficult part...",
    img: "/image/blog-1.jpg",
  },
  {
    title: "EDUCATIONAL LOAN FOR STUDY ABROAD",
    desc: "Start your U.S. study journey with confidence...",
    img: "/image/blog-2.png",
  },
  {
    title: "FORM I-20 EXPLAINED",
    desc: "Start your U.S. study journey with confidence...",
    img: "/image/blog-3.png",
  },
]

export function BlogSlider() {
  return (
    <section className="py-12 md:py-20 lg:py-25 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-end mb-8 md:mb-12 gap-4">
          <span className="flex items-center text-center font-semibold my-10 text-3xl">
                    Recent <p className="text-orange-500">{"  "} Blogs Post</p>
                  </span>
         
        </div>

        <div className="relative px-8 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog, i) => (
              <div
                key={i}
                className={`rounded-2xl md:rounded-[28px] overflow-hidden shadow-lg md:shadow-xl
                  text-black
                  `}
              >
                {/* IMAGE */}
                <div className="relative mb-4 h-40 sm:h-44 md:h-48 w-[92%] md:w-[93%] top-3 md:top-[15px] left-1/2 -translate-x-1/2 md:left-[14px] md:translate-x-0 overflow-hidden rounded-lg md:rounded-xl bg-gray-200">
                  <img 
                    src={blog.img || "/placeholder.svg"}  
                    className="h-full w-full object-top " 
                    alt={blog.title}
                  />
                  <span className="absolute bottom-2 right-2 border-2 text-white bg-purple-900 p-2 text-sm rounded-lg">{"19 Arile 2026"}</span>
                </div>

                {/* CONTENT */}
                <div className="p-4 md:p-6 flex flex-col   lg:p-5">
                  {/* <h3 className="text-base sm:text-lg font-bold leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h3> */}

                  <p className="text-xs sm:text-sm text-black/80 line-clamp-3 border-b-2 mb-2 border-black">
                    {blog.title}
                  </p>
                  <button type="button" className="text-orange-500 text-left my-2 flex">Know More <ChevronRight/> </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons - hidden on mobile, show on md+ */}
          <button className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          <div className="w-6 md:w-8 h-2 bg-brand-orange rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  )
}