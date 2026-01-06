"use client"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"

export function VideoTestimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-16">
          What Our <span className="text-brand-orange">Students Say</span>
        </h2>

        <div className="relative group">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {[1, 2].map((i) => (
              <div key={i} className="relative w-full max-w-md bg-brand-orange rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video relative group/item">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&query=student testimonial ${i}`}
                    alt="Video Testimonial"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                      <Play fill="white" size={24} className="translate-x-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4 text-white font-bold flex justify-between items-center">
                  <span>Congratulations, Deepika!</span>
                  <div className="flex gap-4 opacity-70 text-sm">
                    <span>Watch Later</span>
                    <span>Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export function TextTestimonials() {
  const testimonials = [
    {
      name: "Khushal",
      score: 80,
      text: "My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my trainers gave an accurate simulation of the real exam, regular feedback on my performance...",
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything, from personal attention to practice...",
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything, from personal attention to practice tests to doubt sessions. So, in my opinion, thi...",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-extrabold text-brand-orange leading-tight">
            What Our Test Preparation{" "}
            <span className="underline decoration-brand-dark decoration-4 underline-offset-8 block mt-2 text-brand-dark">
              Achievers Say
            </span>
          </h2>
        </div>
        <div className="lg:w-2/3 space-y-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-brand-orange">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-brand-orange font-bold text-xl">
                    {t.name}: {t.score}
                  </span>
                </div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
