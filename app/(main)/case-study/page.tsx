import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Award, BookOpenCheck, Sparkles } from "lucide-react";
import { getStudent } from "@/app/services/api";
import CaseStudyFaqs, { type CaseStudyFaq } from "./faqs";
import StudentStoryCard from "./student-story-card";
import SuccessStoryForm from "./success-story-form";
import RecentBlogsSlider from "../events/recent-blogs-slider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";
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
      <section className="relative isolate overflow-hidden bg-[#FFFBF9]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(243,109,69,.12) 1px, transparent 1.2px)",
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

          <div className="relative mx-auto w-full max-w-[680px] lg:justify-self-end">
            <div className="relative mx-auto h-[340px] w-full sm:h-[430px] lg:h-[500px] xl:h-[500px]">
              <Image src="/case-study/students-cutout.png" alt="Two students celebrating their learning progress" fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-contain object-bottom drop-shadow-[0_24px_24px_rgba(71,40,29,.18)]" />
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
            {students.map((student: any, index: number) => (
              <StudentStoryCard key={student?._id || `${student?.name}-${index}`} student={student} index={index} />
            ))}
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
