import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpenCheck,
  Sparkles,
} from "lucide-react";

import { getStudent, getPageInfo, getPages } from "@/app/services/api";
import { slugify } from "@/app/lib/slug";

import CaseStudyFaqs, { type CaseStudyFaq } from "./faqs";
import StudentStoryCard from "./student-story-card";
import SuccessStoryForm from "./success-story-form";
import RecentBlogsSlider from "../events/recent-blogs-slider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";

const DEFAULT_FAQS: CaseStudyFaq[] = [
  {
    question: "What is a student case study?",
    answer:
      "A student case study shares a learner’s starting point, preparation journey, and outcome so you can see how a structured plan and consistent practice can make a difference.",
  },
  {
    question: "How are these student stories selected?",
    answer:
      "Stories are created from student profiles and experiences shared with Ooshas Prep. Each published story is reviewed by our team before it appears here.",
  },
  {
    question:
      "Can I get a preparation plan like the students featured here?",
    answer:
      "Yes. Tell our counselling team about your target exam, timeline, and current level. We’ll help you explore a preparation plan that fits your goals.",
  },
  {
    question: "Where can I find a student’s full story?",
    answer:
      "Open any student card with a View Case Study link. Some student profiles are published as testimonials only and don’t have a separate story page.",
  },
];

const DEFAULTS = {
  hero: {
    eyebrow: "REAL JOURNEYS. REAL PROGRESS.",
    title: "Every big result starts with one brave step.",
    subtitle:
      "Meet the students behind the milestones. Explore their goals, the preparation that moved them forward, and the moments that made them proud.",
    heroImage: "/case-study/students-cutout.png",
    heroImageAlt: "Two students celebrating their learning progress",
    button1Text: "Explore student stories",
    button1Url: "#student-stories",
    button2Text: "Talk to a counsellor",
    button2Url: "/contact",
    feature1: "Personal preparation journeys",
    feature2: "Student milestones",
  },
  stories: {
    eyebrow: "STUDENT STORIES",
    title: "Meet the people behind the progress.",
    subtitle:
      "Every learner brings a different starting point. These stories celebrate the goals, effort, and achievements along the way.",
  },
  faq: {
    eyebrow: "QUESTIONS, ANSWERED",
    title: "A little more about student success.",
    subtitle:
      "Wondering how these journeys are built or where to begin with your own? Start here.",
  },
  blogs: {
    eyebrow: "FRESH FROM THE BLOG",
    title: "Keep your preparation moving",
    subtitle: "",
    buttonText: "All articles",
    buttonUrl: "/blog",
  },
  cta: {
    eyebrow: "YOUR STORY STARTS HERE",
    title: "Ready to write your success story?",
    subtitle:
      "Tell us what you’re working toward. Our team will help you find a preparation plan that fits your goal, timeline, and next chapter.",
    helperText: "A counsellor will get back to you shortly",
    formTitle: "Start your success story",
    buttonText: "Start my success story",
  },
};

/**
 * Supports section data stored as either:
 * 1. sections: [{ name, fields: [{ name, value }] }]
 * 2. sections: [{ name, eyebrow, title, ... }]
 * 3. sections: { "case-study-hero-section": { eyebrow, title, ... } }
 *
 * If your API uses a different response shape, adjust this helper
 * to match the actual response.
 */
function getSectionData(page: any, sectionName: string) {
  const sections =
    page?.sections ??
    page?.pageData?.sections ??
    page?.data?.sections ??
    [];

  if (Array.isArray(sections)) {
    const section = sections.find(
      (item: any) => item?.name === sectionName,
    );

    if (!section) return {};

    const result: Record<string, any> = {
      ...(section?.data && typeof section.data === "object"
        ? section.data
        : {}),
    };

    if (Array.isArray(section?.fields)) {
      section.fields.forEach((field: any) => {
        if (field?.name) {
          result[field.name] = field.value ?? result[field.name];
        }
      });
    } else if (
      section?.fields &&
      typeof section.fields === "object"
    ) {
      Object.assign(result, section.fields);
    }

    return { ...section, ...result };
  }

  if (sections && typeof sections === "object") {
    const section = sections[sectionName] ?? {};
    const result: Record<string, any> = {
      ...(section?.data && typeof section.data === "object"
        ? section.data
        : {}),
    };

    if (Array.isArray(section?.fields)) {
      section.fields.forEach((field: any) => {
        if (field?.name) {
          result[field.name] = field.value ?? result[field.name];
        }
      });
    } else if (
      section?.fields &&
      typeof section.fields === "object"
    ) {
      Object.assign(result, section.fields);
    }

    return { ...section, ...result };
  }

  return {};
}

function getText(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return fallback;
}

function getLink(value: unknown, fallback: string) {
  return getText(value, fallback);
}

async function loadCaseStudyPage() {
  try {
    const exactPage = await getPageInfo("casestudy");

    if (exactPage && !Array.isArray(exactPage)) {
      return exactPage;
    }
  } catch {
    // Try the pages list below if the direct request fails.
  }

  try {
    const pages = await getPages(300);

    if (!Array.isArray(pages)) return null;

    return (
      pages.find((page: any) => {
        const template = String(
          page?.template ?? page?.seoMeta?.template ?? "",
        )
          .trim()
          .toLowerCase()
          .replace(/[\s_-]/g, "");

        const storedSlug = slugify(
          page?.seoMeta?.slug ?? page?.slug ?? page?.name ?? "",
        );

        return (
          template === "casestudy" ||
          storedSlug === "case-study" ||
          storedSlug === "casestudy"
        );
      }) ?? null
    );
  } catch {
    return null;
  }
}

async function loadStudents() {
  try {
    const response = await getStudent("all");

    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response)) return response;

    return [];
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadCaseStudyPage();

  const title = getText(
    page?.seoMeta?.title,
    "Student Case Studies | Ooshas Prep",
  );

  const description = getText(
    page?.seoMeta?.description,
    "Explore real student journeys, preparation strategies, and success stories from Ooshas Prep learners.",
  );

  return {
    title,
    description,
    keywords: page?.seoMeta?.keywords,
    alternates: {
      canonical: `${SITE_URL}/case-study`,
    },
    openGraph: {
      title: getText(page?.seoMeta?.ogTitle, title),
      description: getText(page?.seoMeta?.ogDescription, description),
      url: `${SITE_URL}/case-study`,
      siteName: "Ooshas Prep",
      type: "website",
      images: page?.seoMeta?.ogImage
        ? [page.seoMeta.ogImage]
        : [`${SITE_URL}/image/logo.png`],
    },
  };
}

export default async function CaseStudyPage() {
  const [pageData, students] = await Promise.all([
    loadCaseStudyPage(),
    loadStudents(),
  ]);

  console.log(pageData,"pp")

  // Read content from the API, then fall back to defaults.
  const heroData = getSectionData(
    pageData,
    "case-study-hero-section",
  );
  const storiesData = getSectionData(
    pageData,
    "case-study-stories-section",
  );
  const faqData = getSectionData(
    pageData,
    "case-study-faq-section",
  );
  const blogsData = getSectionData(
    pageData,
    "case-study-blogs-section",
  );
  const ctaData = getSectionData(
    pageData,
    "case-study-final-cta-section",
  );

  const hero = {
    eyebrow: getText(heroData.eyebrow, DEFAULTS.hero.eyebrow),
    title: getText(heroData.title, DEFAULTS.hero.title),
    subtitle: getText(heroData.subtitle, DEFAULTS.hero.subtitle),
    heroImage: getText(heroData.heroImage, DEFAULTS.hero.heroImage),
    heroImageAlt: getText(
      heroData.heroImageAlt,
      DEFAULTS.hero.heroImageAlt,
    ),
    button1Text: getText(
      heroData.button1Text,
      DEFAULTS.hero.button1Text,
    ),
    button1Url: getLink(
      heroData.button1Url,
      DEFAULTS.hero.button1Url,
    ),
    button2Text: getText(
      heroData.button2Text,
      DEFAULTS.hero.button2Text,
    ),
    button2Url: getLink(
      heroData.button2Url,
      DEFAULTS.hero.button2Url,
    ),
    feature1: getText(heroData.feature1, DEFAULTS.hero.feature1),
    feature2: getText(heroData.feature2, DEFAULTS.hero.feature2),
  };

  const stories = {
    eyebrow: getText(
      storiesData.eyebrow,
      DEFAULTS.stories.eyebrow,
    ),
    title: getText(storiesData.title, DEFAULTS.stories.title),
    subtitle: getText(
      storiesData.subtitle,
      DEFAULTS.stories.subtitle,
    ),
  };

  const faq = {
    eyebrow: getText(faqData.eyebrow, DEFAULTS.faq.eyebrow),
    title: getText(faqData.title, DEFAULTS.faq.title),
    subtitle: getText(faqData.subtitle, DEFAULTS.faq.subtitle),
  };

  const rawFaqs = Array.isArray(faqData.items) ? faqData.items : [];

  const faqs: CaseStudyFaq[] = rawFaqs
    .filter(
      (item: any) =>
        typeof item?.question === "string" &&
        item.question.trim() &&
        typeof item?.answer === "string" &&
        item.answer.trim(),
    )
    .map((item: any) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));

  // If the API has no FAQ entries, show the default FAQs.
  const displayedFaqs = faqs.length ? faqs : DEFAULT_FAQS;

  const blogs = {
    eyebrow: getText(blogsData.eyebrow, DEFAULTS.blogs.eyebrow),
    title: getText(blogsData.title, DEFAULTS.blogs.title),
    subtitle: getText(blogsData.subtitle, DEFAULTS.blogs.subtitle),
    buttonText: getText(
      blogsData.buttonText,
      DEFAULTS.blogs.buttonText,
    ),
    buttonUrl: getLink(
      blogsData.buttonUrl,
      DEFAULTS.blogs.buttonUrl,
    ),
  };

  const cta = {
    eyebrow: getText(ctaData.eyebrow, DEFAULTS.cta.eyebrow),
    title: getText(ctaData.title, DEFAULTS.cta.title),
    subtitle: getText(ctaData.subtitle, DEFAULTS.cta.subtitle),
    helperText: getText(
      ctaData.helperText,
      DEFAULTS.cta.helperText,
    ),
    formTitle: getText(
      ctaData.formTitle,
      DEFAULTS.cta.formTitle,
    ),
    buttonText: getText(
      ctaData.buttonText,
      DEFAULTS.cta.buttonText,
    ),
  };

  return (
    <main className="overflow-hidden bg-white text-[#292522]">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#FFFBF9]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(243,109,69,.12) 1px, transparent 1.2px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-36 h-[430px] w-[460px] rounded-[42%_58%_54%_46%/48%_42%_58%_52%] bg-[#F36D45]/[.045]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 -right-28 h-[520px] w-[480px] rounded-[58%_42%_46%_54%/43%_57%_43%_57%] bg-[#FFD7A7]/25"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-12 lg:px-8 lg:py-14">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4C4B1] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#9E4D35] sm:text-sm">
              <Sparkles size={15} className="text-[#F36D45]" />
              {hero.eyebrow}
            </div>

            <h1 className="max-w-3xl text-left text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-5xl">
              {hero.title.split(/(one brave step\.)/i).map((part, index) =>
                part.toLowerCase() === "one brave step." ? (
                  <span key={index} className="text-[#F36D45]">
                    {part}
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                ),
              )}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#665C58] sm:text-lg sm:leading-8">
              {hero.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={hero.button1Url}
                className="inline-flex items-center gap-2 rounded-full bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F36D45]/20 transition hover:-translate-y-0.5 hover:bg-[#DD5D38]"
              >
                {hero.button1Text}
                <ArrowDown size={17} />
              </a>

              <Link
                href={hero.button2Url}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-[#514943] transition hover:text-[#F36D45]"
              >
                {hero.button2Text}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#EBD3C8] pt-4 text-sm text-[#665C58]">
              <span className="inline-flex items-center gap-2">
                <BookOpenCheck
                  size={17}
                  className="text-[#F36D45]"
                />
                {hero.feature1}
              </span>

              <span className="inline-flex items-center gap-2">
                <Award size={17} className="text-[#F36D45]" />
                {hero.feature2}
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:justify-self-end">
            <div className="relative mx-auto h-[340px] w-full sm:h-[430px] lg:h-[500px] xl:h-[500px]">
              <Image
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-contain object-bottom drop-shadow-[0_24px_24px_rgba(71,40,29,.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories Section */}
      <section
        id="student-stories"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8 sm:py-12 lg:px-8"
      >
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
              {stories.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {stories.title}
            </h2>
          </div>

       
        </div>

        {students.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {students.map((student: any, index: number) => (
              <StudentStoryCard
                key={student?._id || `${student?.name}-${index}`}
                student={student}
                index={index}
                stories={stories}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#E9C8B9] bg-[#FFF8F4] px-6 py-10 text-center">
            <Award size={36} className="mx-auto text-[#F36D45]" />

            <h3 className="mt-4 text-xl font-bold">
              Student stories are on the way
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#726965]">
              Our team is gathering the journeys that deserve to be shared.
              Check back soon or talk with us about your own preparation plan.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-[#F36D45] px-5 py-3 text-sm font-bold text-white hover:bg-[#DD5D38]"
            >
              Talk to our team
            </Link>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="bg-[#FFF4EF]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-12 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
              {faq.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {faq.title}
            </h2>

            <p className="mt-4 max-w-md leading-7 text-[#726965]">
              {faq.subtitle}
            </p>
          </div>

          <CaseStudyFaqs items={displayedFaqs} />
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section>
        {/* <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
            {blogs.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {blogs.title}
          </h2>

          {blogs.subtitle && (
            <p className="mt-3 max-w-2xl leading-7 text-[#726965]">
              {blogs.subtitle}
            </p>
          )}

          <div className="mt-3">
            <Link
              href={blogs.buttonUrl}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F36D45] hover:text-[#DD5D38]"
            >
              {blogs.buttonText}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div> */}

        <RecentBlogsSlider />
      </section>

      {/* Final CTA Section */}
      <section className="pt-8">
        {/* <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
            {cta.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {cta.title}
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#726965]">
            {cta.subtitle}
          </p>

          <p className="mt-2 text-sm text-[#726965]">
            {cta.helperText}
          </p>
        </div> */}

        <SuccessStoryForm cta={cta} />
      </section>
    </main>
  );
}