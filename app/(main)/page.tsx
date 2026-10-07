import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import ServicesGrid from "@/components/services-grid";
import { RegistrationSection } from "@/components/registration-section";
import { TestPrepGrid } from "@/components/test-prep-grid";
import { WorkingProcess } from "@/components/working-process";
import {
  TextTestimonials,
  VideoTestimonialCard,
} from "@/components/testimonials";
import { PartnerSection } from "@/components/partner-section";
import { Consultants } from "@/components/destinations-consultants";
import { Baners } from "@/components/baner";
import { HomeStudent } from "@/components/home-student";
import { Mission } from "@/components/mission";
import { Aboutresult } from "@/components/about_result";
import { AboutSection } from "@/components/about-section";
import { Banerhome } from "@/components/banerhome";
import { getPageInfo, getPages, getStudent } from "../services/api";
import Script from "next/script";
export const dynamic = "force-dynamic";

const SITE_URL = "https://www.ooshasprep.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("home");
  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "/";

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

export default async function Home() {
  const pageData = await getPageInfo("home");
  const NavData = await getPages("30");
  const studentsData = await getStudent("", 1, 8);

  const sections = pageData?.sections || {};

  const serviceData = sections["Home-Standard"].fields?.items || [
    {
      id: 1,
      title: "Online Live Classes",
      description:
        "High-energy interactive sessions with real-time doubt clearing, live Q&A polls and peer discussion—from anywhere in the world.",
      buttonText: "Book a Free Demo",
      link: "/auth",
      image: "/images/online-class.png",
    },
    {
      id: 2,
      title: "Offline Classroom",
      description:
        "Distraction-free focused learning at our state-of-the-art centers with structured study plans and peer groups.",
      buttonText: "Visit a Center",
      // "link":"/auth",
      image: "/images/offline-class.png",
    },
    {
      id: 3,
      title: "One-on-One Classes",
      description:
        "Dedicated sessions with a certified mentor, customized to your weak areas and target scores.",
      buttonText: "Book Session",
      link: "/auth",
      image: "/images/one-to-one.png",
    },
    {
      id: 4,
      title: "AI Tutor (Self-Paced)",
      description:
        "An intelligent AI tutor available 24/7 that adapts to your learning curve and explains every concept.",
      buttonText: "Try AI Tutor Free",
      link: "/auth",
      image: "/images/ai-tutor.png",
    },
  ];

  return (
    <main className="">
      <Script
        id="ooshasprep-home-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "EducationalOrganization",
                "@id": "https://www.ooshasprep.com/#organization",
                name: "Ooshas Prep",
                url: "https://www.ooshasprep.com/",
                logo: {
                  "@type": "ImageObject",
                  "@id": "https://www.ooshasprep.com/#logo",
                  url: "https://www.ooshasprep.com/image/logo.png",
                  contentUrl: "https://www.ooshasprep.com/image/logo.png",
                  width: 1200,
                  height: 630,
                },
                description:
                  "Ooshas Prep is an online test preparation platform providing coaching and preparation for IELTS, GRE, GMAT, SAT, TOEFL and PTE.",

                sameAs: [
                  "https://www.instagram.com/ooshasprep",
                  "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
                  "https://x.com/ooshasprep",
                  "https://youtube.com/@ooshasprep",
                ],

                telephone: "+91-9166146538",
                email: "info@ooshasprep.com",
              },

              {
                "@type": "WebSite",
                "@id": "https://www.ooshasprep.com/#website",
                url: "https://www.ooshasprep.com/",
                name: "Ooshas Prep",
                description:
                  "Online test preparation and coaching platform for IELTS, GRE, GMAT, SAT, TOEFL and PTE.",
                publisher: {
                  "@id": "https://www.ooshasprep.com/#organization",
                },
                inLanguage: "en-US",
              },

              {
                "@type": "WebPage",
                "@id": "https://www.ooshasprep.com/#webpage",
                url: "https://www.ooshasprep.com/",
                name: "Ooshas Prep | IELTS, PTE, SAT, GRE, GMAT & TOEFL Preparation",
                description:
                  "Prepare for IELTS, PTE, SAT, GRE, GMAT and TOEFL with Ooshas Prep through expert coaching, practice tests, study material and personalized learning.",
                isPartOf: {
                  "@id": "https://www.ooshasprep.com/#website",
                },
                about: {
                  "@id": "https://www.ooshasprep.com/#organization",
                },
                primaryImageOfPage: {
                  "@id": "https://www.ooshasprep.com/#logo",
                },
                inLanguage: "en-US",
              },
            ],
          }),
        }}
      />

      <Hero data={sections["Home-hero-section"]} student={studentsData} />
      <RegistrationSection data={sections["Registations"]} />
      {/* <Aboutresult data={studentsData} /> */}
      <AboutSection data={sections["Home-Banner"]} />
      <ServicesGrid data={serviceData} heading={sections["Home-Standard"]} />
      <TestPrepGrid data={sections["Home-Courses"]} NavData={NavData} />
      {/* <Baners img="/home/000002.png" /> */}
      <WorkingProcess data={sections["Home-Working-Process"]} />
      <HomeStudent data={studentsData} />
      <Banerhome img="/home/000002.png" data={sections["Home-Tech-platform"]} />
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
      <Consultants data={sections["Home-f&q"]} />
    </main>
  );
}
