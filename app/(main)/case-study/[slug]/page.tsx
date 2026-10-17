import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Quote,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  getPageInfo,
  getPages,
  getStudent,
  getStudentBySlug,
} from "@/app/services/api";
import { slugify } from "@/app/lib/slug";
import { getStudentCaseStudySlug } from "@/app/lib/studentCaseStudy";
import CaseStudyFaqs, { type CaseStudyFaq } from "../faqs";
import ExploreStoriesSlider from "../explore-stories-slider";
import SuccessStoryForm from "../success-story-form";
import RecentBlogsSlider from "../../events/recent-blogs-slider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";

interface CaseStudyDetailProps {
  params: Promise<{ slug: string }>;
}

type AnyRecord = Record<string, any>;
type PageSection = {
  name?: string;
  sectionName?: string;
  slug?: string;
  data?: AnyRecord;
  fields?: AnyRecord | Array<{ name: string; value?: unknown }>;
  [key: string]: any;
};

const DEFAULT_FAQS: CaseStudyFaq[] = [
  {
    question: "What is a student case study?",
    answer:
      "A student case study shares a learner’s preparation journey and outcome so other students can learn from their experience.",
  },
  {
    question: "How are these student stories selected?",
    answer:
      "Stories are created from student profiles and experiences shared with Ooshas Prep. Published stories are reviewed by our team.",
  },
  {
    question: "Can I get a preparation plan like the students featured here?",
    answer:
      "Yes. Tell our counselling team about your target exam, timeline, and current level so they can help you explore a suitable plan.",
  },
  {
    question: "Where can I find a student’s full story?",
    answer:
      "Open a student card with a View Case Study link. Some student profiles may be published as testimonials only.",
  },
];

const DEFAULTS = {
  stories: {
    eyebrow: "Keep exploring",
    title: "More student success stories",
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
    buttonUrl: "/blogs",
  },
  cta: {
    eyebrow: "YOUR STORY STARTS HERE",
    title: "Ready to write your success story?",
    subtitle:
      "Tell us what you’re working toward. Our team will help you find a preparation plan that fits your goal and timeline.",
    helperText: "A counsellor will get back to you shortly",
    formTitle: "Start your success story",
    buttonText: "Start my success story",
  },
};

async function findStudent(slug: string) {
  const normalizedSlug = slugify(slug);

  try {
    const student = await getStudentBySlug(normalizedSlug);
    if (student) return student;
  } catch {
    // Fall back to the complete student list.
  }

  try {
    const response = await getStudent("all");
    const students = Array.isArray(response?.data) ? response.data : [];
    return (
      students.find(
        (student: AnyRecord) =>
          getStudentCaseStudySlug(student) === normalizedSlug,
      ) || null
    );
  } catch {
    return null;
  }
}

/** Supports fields stored as an object or as [{ name, value }] entries. */
function readField(fields: PageSection["fields"], fieldName: string): any {
  if (!fields) return undefined;
  if (Array.isArray(fields)) {
    return fields.find((item) => item?.name === fieldName)?.value;
  }
  return fields[fieldName];
}

/** Matches the same CMS section formats used on the main /case-study page. */
function getSectionData(page: AnyRecord | null, sectionName: string) {
  const sections =
    page?.sections ?? page?.pageData?.sections ?? page?.data?.sections ?? [];

  if (Array.isArray(sections)) {
    const section = sections.find(
      (item: PageSection) =>
        item?.name === sectionName ||
        item?.sectionName === sectionName ||
        item?.slug === sectionName,
    );
    if (!section) return {};

    const result: AnyRecord = {
      ...(section?.data && typeof section.data === "object"
        ? section.data
        : {}),
    };

    if (Array.isArray(section?.fields)) {
      section.fields.forEach((field: AnyRecord) => {
        if (field?.name) result[field.name] = field.value ?? result[field.name];
      });
    } else if (section?.fields && typeof section.fields === "object") {
      Object.assign(result, section.fields);
    }

    return { ...section, ...result };
  }

  if (sections && typeof sections === "object") {
    const section = sections[sectionName] ?? {};
    const result: AnyRecord = {
      ...(section?.data && typeof section.data === "object"
        ? section.data
        : {}),
    };

    if (Array.isArray(section?.fields)) {
      section.fields.forEach((field: AnyRecord) => {
        if (field?.name) result[field.name] = field.value ?? result[field.name];
      });
    } else if (section?.fields && typeof section.fields === "object") {
      Object.assign(result, section.fields);
    }

    // Some CMS responses put fields directly on the section object.
    return { ...section, ...result, ...section.fields };
  }

  return {};
}

function getText(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function getLink(value: unknown, fallback: string): string {
  return getText(value, fallback);
}

async function loadCaseStudyPage(): Promise<AnyRecord | null> {
  try {
    const response = await getPageInfo("casestudy");
    const page = response?.data?.data ?? response?.data ?? response;
    if (page && !Array.isArray(page)) return page;
  } catch {
    // Fall back to the pages list.
  }

  try {
    const response = await getPages(300);
    const pages = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response)
          ? response
          : [];

    return (
      pages.find((page: AnyRecord) => {
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

export async function generateMetadata({
  params,
}: CaseStudyDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const student = await findStudent(slug);

  if (!student) {
    return {
      title: "Student Case Study | Ooshas Prep",
      robots: { index: false, follow: true },
    };
  }

  const title = `${student.name || "Student Success"} | ${
    student.course || "Case Study"
  } | Ooshas Prep`;
  const description = `${student.name || "An Ooshas Prep student"}${
    student.course ? `’s ${student.course} preparation journey` : "’s preparation journey"
  }${student.score ? ` and achievement of ${student.score}` : ""}.`;
  const canonical = `${SITE_URL}/case-study/${slugify(slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ooshas Prep",
      type: "article",
      images: student.image
        ? [{ url: student.image, alt: student.name || "Student case study" }]
        : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailProps) {
  const { slug } = await params;
  const student = await findStudent(slug);

  if (!student || getStudentCaseStudySlug(student) !== slugify(slug)) {
    notFound();
  }

  const [sharedPage, studentResponse] = await Promise.all([
    loadCaseStudyPage(),
    getStudent("all").catch(() => null),
  ]);

  const allStudents = Array.isArray(studentResponse?.data)
    ? studentResponse.data
    : [];
  const moreStories = allStudents
    .filter((item: AnyRecord) => item?._id !== student._id)
    .slice(0, 8);


    console.log(student,"jk")

  // Shared CMS sections — same section names as the main /case-study page.
  const storiesData = getSectionData(
    sharedPage,
    "case-study-stories-section",
  );
  const faqData = getSectionData(sharedPage, "case-study-faq-section");
  const blogsData = getSectionData(sharedPage, "case-study-blogs-section");
  const ctaData = getSectionData(
    sharedPage,
    "case-study-final-cta-section",
  );

  const stories = {
    eyebrow: getText(storiesData.eyebrow, DEFAULTS.stories.eyebrow),
    title: getText(storiesData.title, DEFAULTS.stories.title),
    subtitle: getText(storiesData.subtitle, DEFAULTS.stories.subtitle),
  };

  const faq = {
    eyebrow: getText(faqData.eyebrow, DEFAULTS.faq.eyebrow),
    title: getText(faqData.title, DEFAULTS.faq.title),
    subtitle: getText(faqData.subtitle, DEFAULTS.faq.subtitle),
  };

  const rawFaqs = Array.isArray(faqData.items)
    ? faqData.items
    : Array.isArray(faqData.faqs)
      ? faqData.faqs
      : [];

  const cmsFaqs: CaseStudyFaq[] = rawFaqs
    .filter(
      (item: AnyRecord) =>
        typeof item?.question === "string" &&
        item.question.trim() &&
        typeof item?.answer === "string" &&
        item.answer.trim(),
    )
    .map((item: AnyRecord) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));

  const displayedFaqs = cmsFaqs.length ? cmsFaqs : DEFAULT_FAQS;

  const blogs = {
    eyebrow: getText(blogsData.eyebrow, DEFAULTS.blogs.eyebrow),
    title: getText(blogsData.title, DEFAULTS.blogs.title),
    subtitle: getText(blogsData.subtitle, DEFAULTS.blogs.subtitle),
    buttonText: getText(blogsData.buttonText, DEFAULTS.blogs.buttonText),
    buttonUrl: getLink(blogsData.buttonUrl, DEFAULTS.blogs.buttonUrl),
  };

  const cta = {
    eyebrow: getText(ctaData.eyebrow, DEFAULTS.cta.eyebrow),
    title: getText(ctaData.title, DEFAULTS.cta.title),
    subtitle: getText(ctaData.subtitle, DEFAULTS.cta.subtitle),
    helperText: getText(ctaData.helperText, DEFAULTS.cta.helperText),
    formTitle: getText(ctaData.formTitle, DEFAULTS.cta.formTitle),
    buttonText: getText(ctaData.buttonText, DEFAULTS.cta.buttonText),
  };

  // The student API supplies editable hero values; keep these defaults for older records.
  const accent = student.colorCode || "#F36D45";
  const heroEyebrow = "Student success story";
  const heroTitle = getText(
    student.title,
    `${student.name || "Student"}’s journey`,
  );
  const heroDescription = getText(
    student.subtitle,
    "A personal path shaped by a clear goal, committed preparation, and steady progress.",
  );
  const heroStudentName = student.name || "Student";
  const heroStudentImage = getText(student.heroImage, student.image || "");
  const heroAchievement = student.score || "A proud milestone";
  const heroCourse = student.course || "";
  const heroUniversity = student.university || "";
  const heroButtonText = getText(student.button1Text, "Read the story");
  const heroButtonUrl = getText(student.button1Url, "#the-story");
  const heroSecondaryButtonText = getText(
    student.button2Text,
    "Talk to a counsellor",
  );
  const heroSecondaryButtonUrl = getText(student.button2Url, "/contact");

  const storyEyebrow = "Behind the milestone";
  const storyHeading = "A goal. A plan. A story of progress.";
  const storyContent = typeof student.about === "string" ? student.about : "";
  const outcomeHeading = "The outcome";
  const outcomeContent = typeof student.outcome === "string" ? student.outcome : "";
  const messageContent = typeof student.message === "string" ? student.message : "";
  const testimonialName = student.name || "Student";
  const testimonialImage = student.universityLogo || "";
  const studentRating = student.rating ? String(student.rating) : "";
  const highlightsHeading = "The highlights";
  const differenceHeading = "What made the difference?";
  const differencePoints = [
    "A clear goal to work toward",
    "Consistent practice and feedback",
    "Confidence built one step at a time",
  ];

  return (
    <main className="overflow-hidden bg-white text-[#292522]">
      {/* Static student-specific hero */}
      <section className="relative isolate overflow-hidden bg-[#FDF4EF]">
        <div className="absolute right-0 top-0 h-full w-[35%] bg-[#FFF0BE]" />
        <div className="absolute -right-32 -top-36 h-[430px] w-[430px] rounded-full bg-[#FFB09D]/65" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
          <Link
            href="/case-study"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#F0D8CC] bg-white/85 px-4 text-sm font-bold text-[#72584D] shadow-sm transition hover:-translate-y-0.5 hover:border-[#F36D45] hover:text-[#D95C39] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F36D45]/20"
          >
            <ArrowLeft size={16} /> All student stories
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_.9fr] lg:gap-14">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F4C4B1] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-[#A4553A]">
                <Sparkles size={15} className="text-[#F36D45]" />
                {heroEyebrow}
              </div>
              <h1 className="mt-4 text-left text-3xl font-extrabold leading-[1.08] tracking-[-.04em] sm:text-4xl lg:text-[3.5rem]">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#665C58]">
                {heroDescription}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {heroCourse && (
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#72584D] shadow-sm">
                    {heroCourse}
                  </span>
                )}
                {heroUniversity && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#72584D] shadow-sm">
                    <MapPin size={15} className="text-[#F36D45]" />
                    {heroUniversity}
                  </span>
                )}
                {student.messageDate && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#72584D] shadow-sm">
                    <CalendarDays size={15} className="text-[#F36D45]" />
                    {student.messageDate}
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={heroButtonUrl}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(243,109,69,.24)] transition hover:-translate-y-0.5 hover:bg-[#DD5D38] sm:w-fit"
                >
                  {heroButtonText}
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={heroSecondaryButtonUrl}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#F0D8CC] bg-white px-6 py-3.5 text-sm font-bold text-[#72584D] shadow-sm transition hover:-translate-y-0.5 hover:border-[#F36D45] hover:text-[#D95C39] sm:w-fit"
                >
                  {heroSecondaryButtonText}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[530px] pb-5 lg:mr-0">
              <div className="absolute inset-x-[9%] bottom-[8%] top-[4%] rounded-[3rem] bg-[#FFF0BE]" />
              <div
                className="absolute -right-2 top-0 z-10 h-28 w-28 rounded-full"
                style={{ backgroundColor: `${accent}55` }}
              />
              <div className="absolute -bottom-1 left-2 z-10 h-24 w-24 rounded-full border-[13px] border-white bg-[#FF907F] sm:h-32 sm:w-32 sm:border-[17px]" />

              <div className="relative z-20 mx-auto w-[88%] overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_5rem] bg-[#F36D45] shadow-[0_30px_75px_rgba(119,69,48,.22)]">
                <div className="relative aspect-[.88/1] max-h-[540px]">
                  {heroStudentImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={heroStudentImage}
                      alt={heroStudentName}
                      className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[12rem] font-bold text-white/70">
                      {heroStudentName.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211714]/85 via-transparent to-[#211714]/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                    <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#FFD7A7]">
                      Student spotlight
                    </p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {heroStudentName}
                    </p>
                    {heroCourse && <p className="mt-1 text-sm text-white/85">{heroCourse}</p>}
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-8 z-30 inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(71,40,29,.15)] sm:-left-1 sm:px-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#292522] text-[#FFD7A7]">
                  <Trophy size={18} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">Achievement</span>
                  <span className="block text-base font-black" style={{ color: accent }}>{heroAchievement}</span>
                </span>
              </div>

              {heroUniversity && (
                <div className="absolute bottom-0 right-0 z-30 max-w-[66%] rounded-2xl border border-[#F0D8CC] bg-white px-4 py-3 shadow-[0_14px_35px_rgba(71,40,29,.15)] sm:right-1 sm:px-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">Next chapter</p>
                  <p className="mt-1 truncate text-sm font-extrabold text-[#292522]">{heroUniversity}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Static student-specific "Behind the milestone" section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_340px] lg:gap-16 lg:px-8 lg:py-20">
        <div id="the-story" className="scroll-mt-24">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">{storyEyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-.035em] sm:text-4xl">{storyHeading}</h2>

          {storyContent ? (
            <div
              className="prose prose-lg mt-7 max-w-none prose-headings:text-[#302A27] prose-p:leading-8 prose-p:text-[#655D59] prose-strong:text-[#302A27]"
              dangerouslySetInnerHTML={{ __html: storyContent }}
            />
          ) : (
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#655D59]">
              {student.name} worked toward {student.course || "a personal learning goal"} with focus and consistency. Every student journey is different, and this milestone reflects the commitment it takes to keep learning, practising, and moving forward.
            </p>
          )}

          {outcomeContent && (
            <div className="mt-10 rounded-[1.75rem] border border-[#F0D8CC] bg-[#FDF4EF] p-6 shadow-[0_12px_32px_rgba(41,37,34,.06)] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0BE] text-[#A4553A]"><Trophy size={21} /></span>
                <h3 className="text-xl font-bold">{outcomeHeading}</h3>
              </div>
              <div className="prose mt-4 max-w-none prose-p:leading-7 prose-p:text-[#655D59]" dangerouslySetInnerHTML={{ __html: outcomeContent }} />
            </div>
          )}

          {messageContent && (
            <blockquote className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#F36D45] to-[#D95C39] p-6 text-white shadow-[0_18px_45px_rgba(243,109,69,.2)] sm:p-9">
              <Quote size={42} className="absolute right-6 top-6 text-white/20" />
              <div className="relative prose max-w-none prose-p:text-lg prose-p:leading-8 prose-p:text-white" dangerouslySetInnerHTML={{ __html: messageContent }} />
              <footer className="relative mt-5 flex items-center gap-3 border-t border-white/25 pt-5">
                {testimonialImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={testimonialImage} alt="" className="h-10 w-10 rounded-full bg-white object-contain p-1" />
                )}
                <div>
                  <p className="font-bold">{testimonialName}</p>
                  {studentRating && <p className="text-sm text-white/80">Student rating: {studentRating}</p>}
                </div>
              </footer>
            </blockquote>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start lg:pt-8">
          <div className="rounded-[1.75rem] bg-[#FFF0BE] p-6 shadow-[0_12px_32px_rgba(41,37,34,.08)] sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#D76843]"><Award size={23} /></div>
            <h3 className="mt-5 text-xl font-bold">{highlightsHeading}</h3>
            <dl className="mt-5 divide-y divide-[#E6D49F]">
              {heroCourse && <div className="py-3"><dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">Course</dt><dd className="mt-1 font-semibold text-[#463C2E]">{heroCourse}</dd></div>}
              {heroAchievement && <div className="py-3"><dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">Achievement</dt><dd className="mt-1 text-2xl font-bold" style={{ color: accent }}>{heroAchievement}</dd></div>}
              {heroUniversity && <div className="py-3"><dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">Next chapter</dt><dd className="mt-1 font-semibold text-[#463C2E]">{heroUniversity}</dd></div>}
            </dl>
          </div>

          <div className="rounded-[1.75rem] border border-[#F0D8CC] bg-white p-6 shadow-[0_12px_32px_rgba(41,37,34,.06)] sm:p-7">
            <h3 className="text-lg font-bold">{differenceHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#655D59]">
              {differencePoints.map((point, index) => (
                <li key={`${point}-${index}`} className="flex gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F36D45]" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#F36D45] bg-white px-4 py-3 text-sm font-bold text-[#D95C39] transition hover:bg-[#F36D45] hover:text-white">
              Discuss your goals <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </section>

      {/* FAQ heading and questions use the shared /case-study CMS response */}
      <section className="bg-[#FDF4EF]">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">{faq.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">{faq.title}</h2>
            <p className="mt-4 leading-7 text-[#726965]">{faq.subtitle}</p>
          </div>
          <CaseStudyFaqs items={displayedFaqs} />
        </div>
      </section>

      {/* Related student stories: shared CMS headings + slug page's related students */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
    
        <ExploreStoriesSlider students={moreStories} stories={stories} />
      </section>

      {/* Blog content itself stays in RecentBlogsSlider; its heading comes from the shared CMS page. */}
      <section className="bg-[#FDF4EF] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
          <RecentBlogsSlider blog={blogs} />
        </div>
      </section>

      {/* CTA/form headings use the shared CMS response. The form component is unchanged. */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-0">
        <SuccessStoryForm cta={cta} />
      </section>

   
    </main>
  );
}
