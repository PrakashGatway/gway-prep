import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpenCheck, Sparkles, Trophy } from "lucide-react";
import { getStudent } from "@/app/services/api";
import { slugify } from "@/app/lib/slug";
import CaseStudyFaqs, { type CaseStudyFaq } from "./faqs";
import SuccessStoryForm from "./success-story-form";
import RecentBlogsSlider from "../events/recent-blogs-slider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";
const palette = ["#FFF4EF", "#FFF0BE", "#FFD7A7", "#FFB09D", "#FF907F", "#F36D45"];

const faqs: CaseStudyFaq[] = [
  {
    question: "What is a student case study?",
    answer: "A student case study shares a learner’s starting point, preparation journey, and outcome so you can see how a structured plan and consistent practice can make a difference.",
  },
  {
    question: "How are these student stories selected?",
    answer: "Stories are created from student profiles and experiences shared with Ooshas Prep. Each published story is reviewed by our team before it appears here.",
  },
  {
    question: "Can I get a preparation plan like the students featured here?",
    answer: "Yes. Tell our counselling team about your target exam, timeline, and current level. We’ll help you explore a preparation plan that fits your goals.",
  },
  {
    question: "Where can I find a student’s full story?",
    answer: "Open any student card with a View Case Study link. Some student profiles are published as testimonials only and don’t have a separate story page.",
  },
];

function plainText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
}

async function loadStudents() {
  try {
    const response = await getStudent("all");
    return Array.isArray(response?.data) ? response.data : [];
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Student Case Studies | Ooshas Prep",
  description: "Explore real student journeys, preparation strategies, and success stories from Ooshas Prep learners.",
  alternates: { canonical: `${SITE_URL}/case-study` },
  openGraph: {
    title: "Student Case Studies | Ooshas Prep",
    description: "Real student journeys and the preparation that helped them move forward.",
    url: `${SITE_URL}/case-study`,
    siteName: "Ooshas Prep",
    type: "website",
  },
};

export default async function CaseStudyPage() {
  const students = await loadStudents();

  return (
    <main className="overflow-hidden bg-white text-[#292522]">
      <section className="relative isolate overflow-hidden bg-[#FFF4EF]">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#FFF0BE] lg:block" />
        <div className="absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full bg-[#FFB09D]/70 blur-[1px]" />
        <div className="absolute -bottom-36 right-[22%] h-[300px] w-[300px] rounded-full bg-[#FFD7A7]/80" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-8 lg:py-14">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4C4B1] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#9E4D35] sm:text-sm">
              <Sparkles size={15} className="text-[#F36D45]" /> Real journeys. Real progress.
            </div>
            <h1 className="max-w-3xl text-left text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-5xl">
              Every big result starts with <span className="text-[#F36D45]">one brave step.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#665C58] sm:text-lg sm:leading-8">
              Meet the students behind the milestones. Explore their goals, the preparation that moved them forward, and the moments that made them proud.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#student-stories" className="inline-flex items-center gap-2 rounded-full bg-[#F36D45] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F36D45]/20 transition hover:-translate-y-0.5 hover:bg-[#DD5D38]">
                Explore student stories <ArrowDown size={17} />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-[#514943] transition hover:text-[#F36D45]">
                Talk to a counsellor <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#EBD3C8] pt-4 text-sm text-[#665C58]">
              <span className="inline-flex items-center gap-2"><BookOpenCheck size={17} className="text-[#F36D45]" /> Personal preparation journeys</span>
              <span className="inline-flex items-center gap-2"><Award size={17} className="text-[#F36D45]" /> Student milestones</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mr-0">
            <div className="absolute inset-x-[8%] bottom-[5%] top-[7%] rounded-[3rem] bg-[#FFF0BE] sm:inset-x-[10%]" />
            <div className="absolute -right-2 top-8 z-10 h-24 w-24 rounded-full bg-[#FF907F]/80 sm:-right-5 sm:h-32 sm:w-32" />
            <div className="absolute -bottom-1 left-0 z-10 h-20 w-20 rounded-full border-[12px] border-white bg-[#F36D45] sm:-left-3 sm:h-28 sm:w-28 sm:border-[16px]" />
            <div className="relative z-20 mx-auto h-[300px] w-full sm:h-[360px] lg:h-[390px]">
              <Image src="/spoken-english/students.webp" alt="Students working together on their learning" fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-contain object-bottom drop-shadow-[0_24px_24px_rgba(71,40,29,.18)]" />
            </div>
            <div className="absolute left-2 top-4 z-30 inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(71,40,29,.14)] sm:left-0 sm:top-8 sm:px-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0BE] text-[#E2603B]"><Trophy size={18} /></span>
              <span><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#9C7768]">Every milestone</span><span className="block text-sm font-extrabold text-[#292522]">Starts with a goal</span></span>
            </div>
            <div className="absolute bottom-2 right-1 z-30 rounded-2xl bg-[#292522] px-4 py-3 text-white shadow-[0_18px_40px_rgba(41,37,34,.25)] sm:bottom-5 sm:right-0 sm:px-5">
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#FFB09D]">The next chapter</p>
              <p className="mt-1 text-sm font-bold">Could be yours.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="student-stories" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8 sm:py-12 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">Student stories</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Meet the people behind the <span className="text-[#F36D45]">progress.</span></h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#726965] sm:text-base">Every learner brings a different starting point. These stories celebrate the goals, effort, and achievements along the way.</p>
        </div>

        {students.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {students.map((student: any, index: number) => {
              const slug = slugify(student?.slug || "");
              const accent = student?.colorCode || palette[index % palette.length];
              const excerpt = plainText(student?.message || student?.about || student?.outcome);
              const card = (
                <div className="relative flex min-h-[320px] flex-1 flex-col justify-between overflow-hidden bg-[#292522] p-4 text-white sm:min-h-[340px] sm:p-5">
                  <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#FFB09D] via-[#FF907F] to-[#F36D45]">
                    {student?.image ? (
                      // Student images come from the existing upload flow and may use any host.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={student.image} alt={student.name || "Ooshas Prep student"} className="h-full w-full scale-110 object-cover transition duration-700 group-hover:scale-125" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-8xl font-black text-white/65">{String(student?.name || "S").charAt(0)}</div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,19,18,.28)_0%,rgba(25,19,18,.08)_35%,rgba(25,19,18,.88)_100%)]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#F36D45]/30 via-transparent to-transparent" />
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <span className="rounded-full border border-white/25 bg-[#292522]/55 px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-white shadow-sm backdrop-blur-md">Achievement spotlight</span>
                    {student?.score && <span className="rounded-xl border border-white/35 bg-white/95 px-2.5 py-1.5 text-right text-[#292522] shadow-lg"><span className="block text-[8px] font-bold uppercase tracking-[.13em] text-[#8A7770]">Result</span><span className="text-sm font-black" style={{ color: accent === "#FFF4EF" || accent === "#FFF0BE" ? "#F36D45" : accent }}>{student.score}</span></span>}
                  </div>
                  <div className="relative z-10 mt-auto pt-20">
                    <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#FFD7A7]">{student?.course || "Ooshas Prep learner"}</p>
                    <h3 className="mt-1 text-xl font-black leading-tight tracking-tight text-white drop-shadow-md">{student?.name || "Student success story"}</h3>
                    {student?.university && <p className="mt-1 truncate text-xs font-medium text-white/75">Next chapter · {student.university}</p>}
                    <p className="mt-2 line-clamp-2 text-xs leading-[1.4rem] text-white/85">{excerpt || "A determined learner, a focused plan, and steady progress. Discover more about this student’s journey."}</p>
                    <span className={`mt-3 inline-flex items-center gap-2 text-xs font-extrabold ${slug ? "text-[#FFD7A7]" : "text-white/70"}`}>
                      {slug ? "Explore achievement" : "Student testimonial"}{slug && <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                    </span>
                  </div>
                </div>
              );

              return slug ? (
                <Link key={student?._id || slug} href={`/case-study/${slug}`} className="group flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1.4rem] bg-[#292522] shadow-[0_12px_35px_rgba(41,37,34,.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(41,37,34,.24)]">
                  {card}
                </Link>
              ) : (
                <article key={student?._id || `${student?.name}-${index}`} className="group flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1.4rem] bg-[#292522] shadow-[0_12px_35px_rgba(41,37,34,.14)]">
                  {card}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#E9C8B9] bg-[#FFF8F4] px-6 py-10 text-center">
            <Award size={36} className="mx-auto text-[#F36D45]" />
            <h3 className="mt-4 text-xl font-bold">Student stories are on the way</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#726965]">Our team is gathering the journeys that deserve to be shared. Check back soon or talk with us about your own preparation plan.</p>
            <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#F36D45] px-5 py-3 text-sm font-bold text-white hover:bg-[#DD5D38]">Talk to our team</Link>
          </div>
        )}
      </section>

      <section className="bg-[#FFF4EF]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-12 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">Questions, answered</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">A little more about <span className="text-[#F36D45]">student success.</span></h2>
            <p className="mt-4 max-w-md leading-7 text-[#726965]">Wondering how these journeys are built or where to begin with your own? Start here.</p>
          </div>
          <CaseStudyFaqs items={faqs} />
        </div>
      </section>

      <RecentBlogsSlider />
      <SuccessStoryForm />
    </main>
  );
}
