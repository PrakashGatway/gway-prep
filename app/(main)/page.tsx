




import type { Metadata } from "next";
import { Hero } from "@/app/components/hero";
import { ServicesGrid } from "@/app/components/services-grid";
import { RegistrationSection } from "@/app/components/registration-section";
import { TestPrepGrid } from "@/app/components/test-prep-grid";
import { WorkingProcess } from "@/app/components/working-process";
import {
  TextTestimonials,
  VideoTestimonialCard,
} from "@/app/components/testimonials";
import { PartnerSection } from "@/app/components/partner-section";
import { Consultants } from "@/app/components/destinations-consultants";
import { Baners } from "@/app/components/baner";
import { HomeStudent } from "@/app/components/home-student";
import { Mission } from "@/app/components/mission";
import { Aboutresult } from "@/app/components/about_result";
import { Banerhome } from "@/app/components/banerhome";
import { getPageInfo, getStudent } from "../services/api";
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const  data  = await getPageInfo("home");
  const seo = data.seoMeta;

  return {
    title: seo?.title?.trim() || "Home",
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical: `/${seo?.canonicalUrl || ""}`,
    },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: `${seo?.canonicalUrl || "https://ooshasprap.com/home/"}`,
      type: "website",
    },
  };
}


export default async function Home() {
  const pageData = await getPageInfo("home");
  const studentsData =  await getStudent("",1,8);

  const sections = pageData?.sections || {};
  // console.log(sections,'sections')
  
  return (
    <main className="">
      <Hero data={sections["Home-hero-section"]} />
      <RegistrationSection data={sections["Registations"]} />
      <Aboutresult data={studentsData} />
      <ServicesGrid data={sections["Home-Services"]} />
      <TestPrepGrid data={sections["Home-Courses"]} />
      <Baners img="/home/000002.png" />
      <WorkingProcess data={sections["Home-Working-Process"]} />
      <HomeStudent data={studentsData} />
      <Banerhome img="/home/000002.png" data={sections["Home-Tech-platform"]}/>
      <Mission data={sections["Home-page-mission"]} />
      <VideoTestimonialCard
        heading={sections["Home-Video-Testimonial"]}
        data={studentsData}
      />
      <TextTestimonials
        heading={sections["Home-Text-Testimonial"]}
        data={studentsData}
      />
      <PartnerSection />
      <Consultants data={sections['Home-f&q']} />
    </main>
  );
}



