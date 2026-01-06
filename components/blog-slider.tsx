import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const blogs = [
  {
    title: "Preparing for TOEFL Speaking Scoring",
    desc: "Particularly for non-native English speakers, the TOEFL Speaking segment can be a difficult part...",
    img: "/images/gaway-20prep-20final-202.jpg",
  },
  {
    title: "EDUCATIONAL LOAN FOR STUDY ABROAD",
    desc: "Start your U.S. study journey with confidence...",
    img: "/images/gaway-20prep-20final-202.jpg",
  },
  {
    title: "FORM I-20 EXPLAINED",
    desc: "Start your U.S. study journey with confidence...",
    img: "/images/gaway-20prep-20final-202.jpg",
  },
]

export function BlogSlider() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-extrabold text-brand-orange underline decoration-brand-orange decoration-4 underline-offset-8">
            Important Facts & Information
          </h2>
          <button className="bg-brand-dark text-white px-8 py-2 rounded-lg font-bold">View All Blogs</button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <div key={i} className="bg-[#666] rounded-3xl overflow-hidden shadow-xl group">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={blog.img || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={
                      i === 0
                        ? { objectPosition: "80px 735px" }
                        : i === 1
                          ? { objectPosition: "410px 735px" }
                          : { objectPosition: "720px 735px" }
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg">{blog.title}</div>
                </div>
                <div className="p-6">
                  <p className="text-white/80 text-sm mb-4">{blog.desc}</p>
                  <button className="text-brand-orange font-bold text-sm uppercase tracking-wider">Read More</button>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-8 h-2 bg-brand-orange rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  )
}
