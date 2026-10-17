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
  fields?: AnyRecord | Array<{ name: string; value?: unknown }>;
  [key: string]: any;
};

async function findStudent(slug: string) {
  const normalizedSlug = slugify(slug);

  try {
    const student = await getStudentBySlug(normalizedSlug);
    if (student) return student;
  } catch {
    // Fall back to the student list for name-based routes.
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

/**
 * Reads one field from either supported section field format:
 * fields: { title: "..." }
 * or fields: [{ name: "title", value: "..." }]
 */
function readField(fields: PageSection["fields"], fieldName: string): any {
  if (!fields) return undefined;

  if (Array.isArray(fields)) {
    const field = fields.find((item) => item?.name === fieldName);
    return field?.value;
  }

  return fields[fieldName];
}

function getSection(page: AnyRecord | null, sectionName: string): PageSection | null {
  const sections = page?.sections;
  if (!sections) return null;

  if (Array.isArray(sections)) {
    return (
      sections.find(
        (section: PageSection) =>
          section?.name === sectionName ||
          section?.sectionName === sectionName ||
          section?.slug === sectionName,
      ) || null
    );
  }

  if (typeof sections === "object") {
    const section = sections[sectionName];
    if (section) {
      return {
        name: sectionName,
        ...section,
        fields: section.fields ?? section,
      };
    }
  }

  return null;
}

function getText(
  page: AnyRecord | null,
  sectionName: string,
  fieldName: string,
  fallback = "",
): string {
  const section = getSection(page, sectionName);
  const value = readField(section?.fields, fieldName);

  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function getRepeater(
  page: AnyRecord | null,
  sectionName: string,
  fieldName: string,
): AnyRecord[] {
  const section = getSection(page, sectionName);
  const value = readField(section?.fields, fieldName);
  return Array.isArray(value) ? value : [];
}

/**
 * Fetch the page content saved in the CMS for this dynamic case-study route.
 * The exact page slug may be either the student slug or "case-study-{slug}".
 * If no matching CMS page exists, the student data and defaults below are used.
 */
async function loadCaseStudyPage(slug: string): Promise<AnyRecord | null> {
  const normalizedSlug = slugify(slug);
  const possibleSlugs = [
    normalizedSlug,
    `case-study-${normalizedSlug}`,
    `case-study-detail-${normalizedSlug}`,
  ];

  for (const pageSlug of possibleSlugs) {
    try {
      const response = await getPageInfo(pageSlug);
      const page = response?.data?.data ?? response?.data ?? response;
      if (page && (page.sections || page.seoMeta || page.template)) return page;
    } catch {
      // Try the next possible slug.
    }
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

    const matchingPage = pages.find((item: AnyRecord) => {
      const pageSlug = slugify(
        item?.seoMeta?.slug || item?.slug || item?.pageSlug || "",
      );
      const template = slugify(
        item?.seoMeta?.template || item?.template || "",
      );
      return (
        (pageSlug === normalizedSlug ||
          pageSlug === `case-study-${normalizedSlug}` ||
          pageSlug === `case-study-detail-${normalizedSlug}`) &&
        (!template ||
          template === "case-study-detail" ||
          template === "casestudydetail")
      );
    });

    return matchingPage || null;
  } catch {
    return null;
  }
}

function richContent(value: unknown) {
  return typeof value === "string" ? value : "";
}

function splitPoints(value: string, fallback: string[]) {
  const points = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return points.length ? points : fallback;
}

const defaultFaqs: CaseStudyFaq[] = [
  {
    question: "Can my preparation journey be different from this one?",
    answer:
      "Absolutely. Every plan should reflect the student’s current level, available study time, and target. This story is one example of a path that worked for one learner.",
  },
  {
    question: "How can I get support for the same course?",
    answer:
      "Contact our team with your exam, goal, and preferred timeline. A counsellor can help you understand available classes, practice resources, and the next steps.",
  },
  {
    question: "Are student stories published with permission?",
    answer:
      "Case studies are shared by Ooshas Prep for learning and inspiration. If you have a question about a particular story or its details, please contact our team.",
  },
];

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
    student.course
      ? `’s ${student.course} preparation journey`
      : "’s preparation journey"
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

  // Keep the dynamic route tied to the actual student record.
  if (!student || getStudentCaseStudySlug(student) !== slugify(slug)) {
    notFound();
  }

  let moreStories: AnyRecord[] = [];

  try {
    const response = await getStudent("all");
    moreStories = (Array.isArray(response?.data) ? response.data : [])
      .filter((item: AnyRecord) => item?._id !== student._id)
      .slice(0, 8);
  } catch {
    moreStories = [];
  }

  const cmsPage = await loadCaseStudyPage(slug);

  const heroSection = "case-study-hero-section";
  const storySection = "case-study-story-section";
  const faqSection = "case-study-faq-section";
  const relatedSection = "case-study-related-section";
  const blogsSection = "case-study-blogs-section";
  const formSection = "case-study-form-section";
  const ctaSection = "case-study-cta-section";

  const accent = student.colorCode || "#F36D45";

  // Hero section: CMS content takes priority; student data is the fallback.
  const heroEyebrow = getText(
    cmsPage,
    heroSection,
    "eyebrow",
    "Student success story",
  );
  const heroTitle = getText(
    cmsPage,
    heroSection,
    "title",
    `${student.name || "Student"}’s journey`,
  );
  const heroDescription = getText(
    cmsPage,
    heroSection,
    "description",
    "A personal path shaped by a clear goal, committed preparation, and steady progress.",
  );
  const heroStudentName = getText(
    cmsPage,
    heroSection,
    "studentName",
    student.name || "Student",
  );
  const heroStudentImage = getText(
    cmsPage,
    heroSection,
    "studentImage",
    student.image || "",
  );
  const heroAchievement = getText(
    cmsPage,
    heroSection,
    "achievement",
    student.score || "A proud milestone",
  );
  const heroCourse = getText(
    cmsPage,
    heroSection,
    "course",
    student.course || "",
  );
  const heroUniversity = getText(
    cmsPage,
    heroSection,
    "university",
    student.university || "",
  );
  const heroBackgroundImage = getText(
    cmsPage,
    heroSection,
    "backgroundImage",
    "",
  );
  const heroButtonText = getText(
    cmsPage,
    heroSection,
    "buttonText",
    "Read the story",
  );
  const heroButtonUrl = getText(
    cmsPage,
    heroSection,
    "buttonUrl",
    "#the-story",
  );

  // Story section.
  const storyEyebrow = getText(
    cmsPage,
    storySection,
    "eyebrow",
    "Behind the milestone",
  );
  const storyHeading = getText(
    cmsPage,
    storySection,
    "heading",
    "A goal. A plan. A story of progress.",
  );
  const storyContent = getText(
    cmsPage,
    storySection,
    "description",
    richContent(student.about),
  );
  const outcomeHeading = getText(
    cmsPage,
    storySection,
    "outcomeHeading",
    "The outcome",
  );
  const outcomeContent = getText(
    cmsPage,
    storySection,
    "outcomeContent",
    richContent(student.outcome),
  );
  const messageContent = getText(
    cmsPage,
    storySection,
    "testimonial",
    richContent(student.message),
  );
  const testimonialName = getText(
    cmsPage,
    storySection,
    "testimonialName",
    student.name || "Student",
  );
  const testimonialImage = getText(
    cmsPage,
    storySection,
    "testimonialImage",
    student.universityLogo || "",
  );
  const studentRating = getText(
    cmsPage,
    storySection,
    "studentRating",
    student.rating ? String(student.rating) : "",
  );
  const highlightsHeading = getText(
    cmsPage,
    storySection,
    "highlightsHeading",
    "The highlights",
  );
  const differenceHeading = getText(
    cmsPage,
    storySection,
    "differenceHeading",
    "What made the difference?",
  );
  const differencePoints = splitPoints(
    getText(cmsPage, storySection, "differencePoints", ""),
    [
      "A clear goal to work toward",
      "Consistent practice and feedback",
      "Confidence built one step at a time",
    ],
  );

  // FAQs: repeater content takes priority over the default questions.
  const cmsFaqs = getRepeater(cmsPage, faqSection, "faqs")
    .map((item) => ({
      question: String(item?.question || "").trim(),
      answer: String(item?.answer || "").trim(),
    }))
    .filter((item) => item.question && item.answer) as CaseStudyFaq[];

  const displayedFaqs = cmsFaqs.length ? cmsFaqs : defaultFaqs;
  const faqEyebrow = getText(
    cmsPage,
    faqSection,
    "eyebrow",
    "A few more details",
  );
  const faqHeading = getText(
    cmsPage,
    faqSection,
    "heading",
    "About this journey.",
  );
  const faqDescription = getText(
    cmsPage,
    faqSection,
    "description",
    "Every learner’s path is personal. Here are a few helpful answers about the story you just read.",
  );

  // Related stories and blogs section labels/buttons.
  const relatedEyebrow = getText(
    cmsPage,
    relatedSection,
    "eyebrow",
    "Keep exploring",
  );
  const relatedHeading = getText(
    cmsPage,
    relatedSection,
    "heading",
    "More student success stories",
  );
  const relatedButtonText = getText(
    cmsPage,
    relatedSection,
    "buttonText",
    "View all stories",
  );
  const relatedButtonUrl = getText(
    cmsPage,
    relatedSection,
    "buttonUrl",
    "/case-study",
  );

  const blogsEyebrow = getText(
    cmsPage,
    blogsSection,
    "eyebrow",
    "From the blog",
  );
  const blogsHeading = getText(
    cmsPage,
    blogsSection,
    "heading",
    "Helpful reads for your next step",
  );
  const blogsButtonText = getText(
    cmsPage,
    blogsSection,
    "buttonText",
    "View all blogs",
  );
  const blogsButtonUrl = getText(
    cmsPage,
    blogsSection,
    "buttonUrl",
    "/blogs",
  );

  // Form and bottom CTA content.
  const formEyebrow = getText(
    cmsPage,
    formSection,
    "eyebrow",
    "Share your success",
  );
  const formHeading = getText(
    cmsPage,
    formSection,
    "heading",
    "Your story could inspire someone next.",
  );
  const formDescription = getText(
    cmsPage,
    formSection,
    "description",
    "Tell us about your learning journey and the milestone you are proud of.",
  );
  const formHelperText = getText(
    cmsPage,
    formSection,
    "helperText",
    "Our team will review your submission before publishing.",
  );
  const formTitle = getText(
    cmsPage,
    formSection,
    "formTitle",
    "Submit your success story",
  );
  const formButtonText = getText(
    cmsPage,
    formSection,
    "buttonText",
    "Submit story",
  );

  const ctaEyebrow = getText(
    cmsPage,
    ctaSection,
    "eyebrow",
    "Make your next move",
  );
  const ctaHeading = getText(
    cmsPage,
    ctaSection,
    "heading",
    "Let’s find a path that works for you.",
  );
  const ctaDescription = getText(
    cmsPage,
    ctaSection,
    "description",
    "Talk with our team about your exam goals and a preparation plan built around your timeline.",
  );
  const ctaButtonText = getText(
    cmsPage,
    ctaSection,
    "buttonText",
    "Talk to a counsellor",
  );
  const ctaButtonUrl = getText(
    cmsPage,
    ctaSection,
    "buttonUrl",
    "/contact",
  );

  return (
    <main className="overflow-hidden bg-white text-[#292522]">
      <section
        className="relative isolate overflow-hidden bg-[#FDF4EF]"
        style={
          heroBackgroundImage
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(253,244,239,.96), rgba(253,244,239,.78)), url("${heroBackgroundImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
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

              <a
                href={heroButtonUrl}
                className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(243,109,69,.24)] transition hover:-translate-y-0.5 hover:bg-[#DD5D38] hover:shadow-[0_14px_30px_rgba(243,109,69,.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F36D45]/25 sm:w-fit"
              >
                {heroButtonText}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[530px] pb-5 lg:mr-0">
              <div className="absolute inset-x-[9%] bottom-[8%] top-[4%] rounded-[3rem] bg-[#FFF0BE]" />
              <div
                className="absolute -right-2 top-0 z-10 h-28 w-28 rounded-full"
                style={{ backgroundColor: `${accent}55` }}
              />
              <div className="absolute -bottom-1 left-2 z-10 h-24 w-24 rounded-full border-[13px] border-white bg-[#FF907F] sm:h-32 sm:w-32 sm:border-[17px]" />

              <div className="relative z-20 mx-auto w-[88%] overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_5rem] bg-gradient-to-br from-[#FFB09D] to-[#F36D45] shadow-[0_30px_75px_rgba(119,69,48,.22)]">
                <div className="relative aspect-[.88/1] max-h-[540px]">
                  {heroStudentImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={heroStudentImage}
                      alt={heroStudentName}
                      className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFB09D] to-[#F36D45] text-[12rem] font-bold text-white/70">
                      {String(heroStudentName || "S").charAt(0)}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#211714]/85 via-transparent to-[#211714]/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                    <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#FFD7A7]">
                      Student spotlight
                    </p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight drop-shadow sm:text-3xl">
                      {heroStudentName}
                    </p>
                    {heroCourse && (
                      <p className="mt-1 text-sm font-medium text-white/85">
                        {heroCourse}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-8 z-30 inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(71,40,29,.15)] sm:-left-1 sm:px-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#292522] text-[#FFD7A7]">
                  <Trophy size={18} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">
                    Achievement
                  </span>
                  <span
                    className="block text-base font-black"
                    style={{ color: accent }}
                  >
                    {heroAchievement}
                  </span>
                </span>
              </div>

              {heroUniversity && (
                <div className="absolute bottom-0 right-0 z-30 max-w-[66%] rounded-2xl border border-[#F0D8CC] bg-white px-4 py-3 shadow-[0_14px_35px_rgba(71,40,29,.15)] sm:right-1 sm:px-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">
                    Next chapter
                  </p>
                  <p className="mt-1 truncate text-sm font-extrabold text-[#292522]">
                    {heroUniversity}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_340px] lg:gap-16 lg:px-8 lg:py-20">
        <div id="the-story" className="scroll-mt-24">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
            {storyEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-.035em] sm:text-4xl">
            {storyHeading}
          </h2>

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
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0BE] text-[#A4553A]">
                  <Trophy size={21} />
                </span>
                <h3 className="text-xl font-bold">{outcomeHeading}</h3>
              </div>
              <div
                className="prose mt-4 max-w-none prose-p:leading-7 prose-p:text-[#655D59]"
                dangerouslySetInnerHTML={{ __html: outcomeContent }}
              />
            </div>
          )}

          {messageContent && (
            <blockquote className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#F36D45] to-[#D95C39] p-6 text-white shadow-[0_18px_45px_rgba(243,109,69,.2)] sm:p-9">
              <Quote size={42} className="absolute right-6 top-6 text-white/20" />
              <div
                className="relative prose max-w-none prose-p:text-lg prose-p:leading-8 prose-p:text-white"
                dangerouslySetInnerHTML={{ __html: messageContent }}
              />
              <footer className="relative mt-5 flex items-center gap-3 border-t border-white/25 pt-5">
                {testimonialImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={testimonialImage}
                    alt=""
                    className="h-10 w-10 rounded-full bg-white object-contain p-1"
                  />
                )}
                <div>
                  <p className="font-bold">{testimonialName}</p>
                  {studentRating && (
                    <p className="text-sm text-white/80">
                      Student rating: {studentRating}
                    </p>
                  )}
                </div>
              </footer>
            </blockquote>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start lg:pt-8">
          <div className="rounded-[1.75rem] bg-[#FFF0BE] p-6 shadow-[0_12px_32px_rgba(41,37,34,.08)] sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#D76843]">
              <Award size={23} />
            </div>
            <h3 className="mt-5 text-xl font-bold">{highlightsHeading}</h3>
            <dl className="mt-5 divide-y divide-[#E6D49F]">
              {heroCourse && (
                <div className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">
                    Course
                  </dt>
                  <dd className="mt-1 font-semibold text-[#463C2E]">
                    {heroCourse}
                  </dd>
                </div>
              )}
              {heroAchievement && (
                <div className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">
                    Achievement
                  </dt>
                  <dd
                    className="mt-1 text-2xl font-bold"
                    style={{ color: accent }}
                  >
                    {heroAchievement}
                  </dd>
                </div>
              )}
              {heroUniversity && (
                <div className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#8C7652]">
                    Next chapter
                  </dt>
                  <dd className="mt-1 font-semibold text-[#463C2E]">
                    {heroUniversity}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-[1.75rem] border border-[#F0D8CC] bg-white p-6 shadow-[0_12px_32px_rgba(41,37,34,.06)] sm:p-7">
            <h3 className="text-lg font-bold">{differenceHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#655D59]">
              {differencePoints.map((point, index) => (
                <li key={`${point}-${index}`} className="flex gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#F36D45]"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#F36D45] bg-white px-4 py-3 text-sm font-bold text-[#D95C39] transition hover:bg-[#F36D45] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F36D45]/20"
            >
              Discuss your goals <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="bg-[#FDF4EF]">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">
              {faqEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              {faqHeading}
            </h2>
            <p className="mt-4 leading-7 text-[#726965]">{faqDescription}</p>
          </div>
          <CaseStudyFaqs items={displayedFaqs} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
  
        <ExploreStoriesSlider students={moreStories} />
      </section>

      <section className="bg-[#FDF4EF] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
         
          <RecentBlogsSlider />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
     
        {/*
          This section's heading/helper copy is CMS-driven here.
          SuccessStoryForm keeps its own form field and submit implementation.
          To make formTitle and formButtonText configurable inside the form,
          pass them as props after adding those props to success-story-form.tsx.
        */}
        <SuccessStoryForm />
      
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-16 lg:px-8">
        <div className="flex flex-col items-stretch justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-[#F36D45] to-[#D95C39] px-6 py-9 text-white shadow-[0_20px_50px_rgba(243,109,69,.22)] sm:flex-row sm:items-center sm:px-10 sm:py-11">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.16em] text-white/75">
              {ctaEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {ctaHeading}
            </h2>
            <p className="mt-2 leading-7 text-white/85">{ctaDescription}</p>
          </div>
          <Link
            href={ctaButtonUrl}
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#D95C39] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#FFF0BE] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 sm:w-auto"
          >
            {ctaButtonText} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
