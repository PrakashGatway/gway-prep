import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ServicesGrid } from "@/components/services-grid"
import { RegistrationSection } from "@/components/registration-section"
import { TestPrepGrid } from "@/components/test-prep-grid"
import { WorkingProcess } from "@/components/working-process"
import { TextTestimonials, VideoTestimonialCard } from "@/components/testimonials"
import { BlogSlider } from "@/components/blog-slider"
import { PartnerSection } from "@/components/partner-section"
import { DestinationsAndConsultants } from "@/components/destinations-consultants"
import Studentrankslider from "@/components/studentRank"
import {Baners} from "@/components/baner"
import {HomeStudent} from "@/components/home-student"

export const metadata: Metadata = {
  title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
  description: "Trusted overseas education consultancy helping students achieve their dreams of studying abroad. Expert guidance for IELTS, TOEFL, GRE, PTE, GMAT, and more.",
  keywords: "study abroad, overseas education, IELTS coaching, GMAT preparation, study consultants Jaipur",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <RegistrationSection />
      <AboutSection />
      <ServicesGrid />
      <TestPrepGrid />
      <Baners />
      <WorkingProcess />
      <HomeStudent />
      <Studentrankslider />
      <VideoTestimonialCard />
      <TextTestimonials />
      <BlogSlider />
      <PartnerSection />
      <DestinationsAndConsultants />
    </main>
  )
}
