




import type { Metadata } from "next";
import { Hero } from "@/app/components/hero";
import  ServicesGrid  from "@/app/components/services-grid";
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
import { AboutSection } from "@/app/components/about-section";
import { Banerhome } from "@/app/components/banerhome";
import { getPageInfo, getStudent } from "../services/api";
export const dynamic = "force-dynamic";


const SITE_URL = "https://ooshasprep.com"; 

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("blog");
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "/";

  const title = seo?.title?.trim() || "/";
  const description =
    seo?.description ||
    "Stay updated with the latest news and insights from Ooshas Prep.";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,
    keywords: seo?.keywords,

    alternates: {
      canonical: `/${canonical}`,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: `${SITE_URL}/${canonical}`,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: seo?.ogImage || "/image/logo.png",
          width: 1200,
          height: 630,
          alt: seo?.ogTitle || title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [seo?.ogImage || "/image/logo.png"],
    },
  };
}


// export async function generateMetadata() {
//   const  data  = await getPageInfo("home");
//   const seo = data.seoMeta;

//   return {
//     title: seo?.title?.trim() || "Home",
//     description: seo?.description,
//     keywords: seo?.keywords,
//     alternates: {
//       canonical: `/${seo?.canonicalUrl || ""}`,
//     },
//     openGraph: {
//       title: seo?.title,
//       description: seo?.description,
//       url: `${seo?.canonicalUrl || "https://ooshasprap.com/home/"}`,
//       type: "website",
//     },
//   };
//}


export default async function Home() {
  const pageData = await getPageInfo("home");
  const studentsData =  await getStudent("",1,8);

  const sections = pageData?.sections || {};

  
  const serviceData = sections["Home-Standard"].fields?.items ||
   [
  {
    "id": 1,
    "title": "Online Live Classes",
    "description": "High-energy interactive sessions with real-time doubt clearing, live Q&A polls and peer discussion—from anywhere in the world.",
    "buttonText": "Book a Free Demo",
    "link":"/auth",
    "image": "/images/online-class.png"
  },
  {
    "id": 2,
    "title": "Offline Classroom",
    "description": "Distraction-free focused learning at our state-of-the-art centers with structured study plans and peer groups.",
    "buttonText": "Visit a Center",
    // "link":"/auth",
    "image": "/images/offline-class.png"
  },
  {
    "id": 3,
    "title": "One-on-One Classes",
    "description": "Dedicated sessions with a certified mentor, customized to your weak areas and target scores.",
    "buttonText": "Book Session",
    "link":"/auth",
    "image": "/images/one-to-one.png"
  },
  {
    "id": 4,
    "title": "AI Tutor (Self-Paced)",
    "description": "An intelligent AI tutor available 24/7 that adapts to your learning curve and explains every concept.",
    "buttonText": "Try AI Tutor Free",
    "link":"/auth",
    "image": "/images/ai-tutor.png"
  }
]
  
  return (
    <main className="">
      <Hero data={sections["Home-hero-section"]} student={studentsData} />
      <RegistrationSection data={sections["Registations"]} />
      {/* <Aboutresult data={studentsData} /> */}
      <AboutSection data={sections["Home-Banner"]}/>
      <ServicesGrid data={serviceData} heading={sections["Home-Standard"]} />
      <TestPrepGrid data={sections["Home-Courses"]} />
      {/* <Baners img="/home/000002.png" /> */}
      <WorkingProcess data={sections["Home-Working-Process"]} />
      <HomeStudent data={studentsData} />
      <Banerhome img="/home/000002.png" data={sections["Home-Tech-platform"]}/>
      {/* <Mission data={sections["Home-page-mission"]} /> */}
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




