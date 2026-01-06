import { Topbar } from "@/components/topbar"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ServicesGrid } from "@/components/services-grid"
import { RegistrationSection } from "@/components/registration-section"
import { TestPrepGrid } from "@/components/test-prep-grid"
import { WorkingProcess } from "@/components/working-process"
import { VideoTestimonials, TextTestimonials } from "@/components/testimonials"
import { BlogSlider } from "@/components/blog-slider"
import { PartnerSection } from "@/components/partner-section"
import { Footer } from "@/components/footer"

function DestinationsAndConsultants() {
  const destinations = [
    "UK",
    "USA",
    "Australia",
    "New Zealand",
    "Canada",
    "Dubai",
    "Ireland",
    "Germany",
    "France",
    "Swedan",
    "Spain",
    "Singapore",
    "Italy",
    "Brazil",
  ]
  const cities = ["Udaipur", "Jodhpur", "Bikaner", "Delhi", "Ajmer", "Sikar", "Alwar", "Kota"]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-extrabold text-brand-orange mb-8">Choose Your Destination</h3>
        <div className="flex flex-wrap gap-4 mb-20">
          {destinations.map((d) => (
            <div
              key={d}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <h3 className="text-3xl font-extrabold text-brand-orange mb-8">Study Abroad Consultants in</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {cities.map((c) => (
            <div
              key={c}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-center text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {c}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-10 border border-brand-orange/30 rounded-xl" />
          ))}
        </div>

        <div className="relative h-[250px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image
            src="/images/gaway-20prep-20final-202.jpg"
            alt="London Skyline"
            fill
            className="object-cover"
            style={{ objectPosition: "0px 935px" }}
          />
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">

      <Hero />
      <AboutSection />
      <ServicesGrid />
      <RegistrationSection />
      <div className="bg-white py-10 overflow-hidden">
        <div className="flex gap-4 animate-infinite-scroll whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-3 shadow-sm min-w-[250px]"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100" />
              <div>
                <div className="font-bold text-sm text-gray-800">Abhinandan Singh</div>
                <div className="text-xs text-brand-orange font-bold">GMAT 710</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestPrepGrid />
      <WorkingProcess />
      <VideoTestimonials />
      <TextTestimonials />
      <BlogSlider />
      <PartnerSection />
      <DestinationsAndConsultants />
    </main>
  )
}
