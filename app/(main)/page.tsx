import type { Metadata } from "next"
import { Hero } from "@/app/(main)/components/hero"
import { AboutSection } from "@/app/(main)/components/about-section"
import { ServicesGrid } from "@/app/(main)/components/services-grid"
import { RegistrationSection } from "@/app/(main)/components/registration-section"
import { TestPrepGrid } from "@/app/(main)/components/test-prep-grid"
import { WorkingProcess } from "@/app/(main)/components/working-process"
import { TextTestimonials, VideoTestimonialCard } from "@/app/(main)/components/testimonials"
import { BlogSlider } from "@/app/(main)/components/blog-slider"
import { PartnerSection } from "@/app/(main)/components/partner-section"
import { DestinationsAndConsultants } from "@/app/(main)/components/destinations-consultants"
import Studentrankslider from "@/app/(main)/components/studentRank"
import {Baners} from "@/app/(main)/components/baner"
import {HomeStudent} from "@/app/(main)/components/home-student"
import {Mission} from "@/app/(main)/components/mission"
import {Aboutresult} from "@/app/(main)/components/about_result"
import { Banerhome } from "@/app/(main)/components/banerhome"

export const metadata: Metadata = {
  title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
  description: "Trusted overseas education consultancy helping students achieve their dreams of studying abroad. Expert guidance for IELTS, TOEFL, GRE, PTE, GMAT, and more.",
  keywords: "study abroad, overseas education, IELTS coaching, GMAT preparation, study consultants Jaipur",
}

export default function Home() {
  return (
    <main className="min-w-7xl">
      <Hero />
      <RegistrationSection />
      {/* <AboutSection /> */}
      <Aboutresult />
      <ServicesGrid />
      <TestPrepGrid />
      {/* <Baners img="/image/about.jpeg" heading={'Everything you need to <p class="text-brand-orange">prep any time</p>'}/> */}
      <Baners img="/home/000002.png" />
      

      <WorkingProcess />
      <HomeStudent />
      <Banerhome img="/home/000002.png" />
      <Mission />
      {/* <Studentrankslider /> */}
      <VideoTestimonialCard />
      <TextTestimonials />
      {/* <BlogSlider /> */}
      <PartnerSection />
      <DestinationsAndConsultants />
    </main>
  )
}
