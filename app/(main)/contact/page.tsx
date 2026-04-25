
import ContactUs from "@/app/components/contactUs"
import { getPageInfo } from "@/app/services/api"

// export const metadata = {
//   title: "Contact Us | Gateway Abroad",
//   description: "Get in touch with our expert counselors",
//  }


export async function generateMetadata() {
  const  data  = await getPageInfo("contectus");
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
      url: `${seo?.canonicalUrl || "https://ooshasprap.com/contectus/"}`,
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const pageData = await getPageInfo("contectus");
  console.log(pageData.sections)
  return (
    <main className="min-h-screen bg-white">
     <ContactUs Data={pageData.sections}/>
    </main>
  )
}
