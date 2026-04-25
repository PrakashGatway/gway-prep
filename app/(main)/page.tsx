// import type { Metadata } from "next"
// import { Hero } from "@/app/(main)/components/hero"
// import { AboutSection } from "@/app/(main)/components/about-section"
// import { ServicesGrid } from "@/app/(main)/components/services-grid"
// import { RegistrationSection } from "@/app/(main)/components/registration-section"
// import { TestPrepGrid } from "@/app/(main)/components/test-prep-grid"
// import { WorkingProcess } from "@/app/(main)/components/working-process"
// import { TextTestimonials, VideoTestimonialCard } from "@/app/(main)/components/testimonials"
// import { BlogSlider } from "@/app/(main)/components/blog-slider"
// import { PartnerSection } from "@/app/(main)/components/partner-section"
// import { Consultants } from "@/app/(main)/components/destinations-consultants"
// import Studentrankslider from "@/app/(main)/components/studentRank"
// import {Baners} from "@/app/(main)/components/baner"
// import {HomeStudent} from "@/app/(main)/components/home-student"
// import {Mission} from "@/app/(main)/components/mission"
// import {Aboutresult} from "@/app/(main)/components/about_result"
// import { Banerhome } from "@/app/(main)/components/banerhome"
// import { getPageInfo, getStudent } from "../services/api"

// export const metadata: Metadata = {
//   title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
//   description: "Trusted overseas education consultancy helping students achieve their dreams of studying abroad. Expert guidance for IELTS, TOEFL, GRE, PTE, GMAT, and more.",
//   keywords: "study abroad, overseas education, IELTS coaching, GMAT preparation, study consultants Jaipur",
// }

// export default function Home() {

  
//   const Students = async () => {
//     const data = await getStudent();
//     console.log(data)
//   }

//   const pageinfo = async () => {
//     const data = await getPageInfo('home');
//     console.log(data.sections['Home-hero-section']);
//   }


//   return (
//     <main className="lg:min-w-7xl">
//       <Hero />
//       <RegistrationSection />
//       {/* <AboutSection /> */}
//       <Aboutresult />
//       <ServicesGrid />
//       <TestPrepGrid />
//       {/* <Baners img="/image/about.jpeg" 
//       heading={'Everything you need to <p class="text-brand-orange">prep any time</p>'}/> */}
//       <Baners img="/home/000002.png" />
//       <WorkingProcess />
//       <HomeStudent />
//       <Banerhome img="/home/000002.png" />
//       <Mission />
//       {/* <Studentrankslider /> */}
//       <VideoTestimonialCard />
//       <TextTestimonials />
//       {/* <BlogSlider /> */}
//       <PartnerSection />
//       <Consultants />
//     </main>
//   )
// }





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


// export const metadata: Metadata = {
//   title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
//   description:
//     "Trusted overseas education consultancy helping students achieve their dreams of studying abroad.",
//  };


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
  
  return (
    <main className="lg:min-w-7xl">
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