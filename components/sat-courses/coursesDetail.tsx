"use client";

import { useEffect, useState } from "react";
import {
  Home,
  ChevronRight,
  CalendarDays,
  Clock3,
  Globe,
  BookOpen,
  Play,
  Check,
  Download,
  ArrowRight,
  Target,
  FileText,
  ChartNoAxesColumnIncreasing,
  Video,
  Users,
  MessageSquare,
  Phone,
  Mail,
  Lightbulb,
  Plus,
  Minus,
  UserRound,
  Headphones,
  TrendingUp,
  Award,
  LockKeyhole,
} from "lucide-react";
import axiosInstance, { ImageBaseUrl } from "@/services/axiosInstance";
import { useGlobal } from "@/hooks/AppStateContext";
import CurriculumLoginPopup from "./authCurriculam";
import { useRouter } from "next/navigation";

const faqs = [
  [
    "What does this course include?",
    "The course includes live interactive classes, complete study materials, practice questions, full-length mock tests, doubt-clearing sessions and chat support.",
  ],
  [
    "Is this course suitable for beginners?",
    "Yes. The course starts with SAT fundamentals and gradually builds your skills and test-taking confidence.",
  ],
  [
    "Is the course available online or offline?",
    "The course is delivered online, so you can join classes and access learning resources from wherever you are.",
  ],
  [
    "How long does it take to complete the course?",
    "The course access period is 6 months, with a structured learning plan to help you stay on track.",
  ],
  [
    "Do you provide study materials and practice tests?",
    "Yes. You receive comprehensive study material, topic-wise practice and full-length mock tests.",
  ],
  [
    "Will I get mock tests as part of the course?",
    "Yes. Five full-length mock tests are included to help you practise under exam-like conditions.",
  ],
  [
    "Do I get guidance from experienced instructors?",
    "Yes. You get expert guidance during live classes and dedicated doubt-clearing sessions.",
  ],
  [
    "How can I enroll in this course?",
    "Use the Enroll Now button or contact our study-abroad experts for help choosing the right course.",
  ],
];

const toneClass = [
  "bg-[#fff3ce] text-[#f36d45]",
  "bg-[#fff0e9] text-[#f36d45]",
  "bg-[#ffe8e7] text-[#f04f35]",
  "bg-[#ffd9cc] text-[#ed5938]",
];

export default function SATMasterclassPage({ CourseDetail }) {
  const { user, userInfo } = useGlobal();
  const [openModule, setOpenModule] = useState(-1);
  const [openFaq, setOpenFaq] = useState(-1);
  const [showLogin, setShowLogin] = useState(false);
  const [curriculam, setCurriculum] = useState([]);

  const videoUrl = CourseDetail?.preview?.url;

  useEffect(() => {
    const FetchCurriculam = async () => {
      try {
        const res = await axiosInstance.get(
          `/courses/curriculum/${CourseDetail._id}`,
        );
        setCurriculum(res.data.curriculum || []);
      } catch (err) {
        console.error("Failed to load curriculum:", err);
        setCurriculum([]);
      }
    };
    FetchCurriculam();
  }, []);

  let embedUrl = "";

  if (videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")) {
    const match = videoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/,
    );

    const videoId = match?.[1];

    if (videoId?.length === 11) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&controls=1&playsinline=1`;
    }
  } else if (videoUrl?.includes("vimeo.com")) {
    const match = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = match?.[1];

    if (videoId) {
      embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=0&controls=1`;
    }
  }

  const objectiveIcons = [Target, BookOpen, TrendingUp, Award];

  const route = useRouter();

  console.log(CourseDetail);
  console.log(curriculam);

  return (
    <>
      <main className="min-h-screen bg-[#fffdfb] px-4 py-5 text-[#101d42] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero and enrollment card */}
          <nav
            className="mb-3 flex flex-wrap items-center gap-2 text-base text-slate-400"
            aria-label="Breadcrumb"
          >
            <span
              className="cursor-pointer"
              onClick={() => route.push("/courses")}
            >
              Courses
            </span>
            <ChevronRight size={13} />
            <span className="font-medium text-[#f36d45]">
              {CourseDetail?.title}
            </span>
          </nav>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.3fr)_350px] xl:grid-cols-[minmax(0,1.35fr)_350px]">
            {/* Left Section */}
            <section className="min-w-0">
              <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {CourseDetail.title}
              </h1>

              <p className="mt-1 text-base leading-5 text-slate-600 line-clamp-4">
                {CourseDetail.shortDescription}
              </p>

              <div className="grid grid-cols-[1fr_1fr] gap-4 bg-gray-200/50 rounded-2xl mt-6 p-4">
                {/* Hero Image */}
                <div className=" flex  w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                  <img
                    src={`${ImageBaseUrl}/${CourseDetail.thumbnail.url}`}
                    alt="SAT Masterclass course banner"
                    className="h-full w-full object-cover object-contain"
                  />
                </div>

                {/* Course Details */}
                <div className="my-4 grid grid-cols-2 gap-x-3 gap-y-3 p-5">
                  {/* Start Date */}
                  <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0e9] text-[#f36d45]">
                      <CalendarDays size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-bold">Start Date</p>
                      <p className="text-xs leading-4 text-slate-500">
                        {new Date(
                          CourseDetail?.schedule?.startDate,
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0e9] text-[#f36d45]">
                      <Clock3 size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-bold">Level</p>
                      <p className="text-xs leading-4 text-slate-500">
                        {CourseDetail?.level}
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0e9] text-[#f36d45]">
                      <Globe size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-bold">Language</p>
                      <p className="text-xs leading-4 text-slate-500">
                        {CourseDetail?.language}
                      </p>
                    </div>
                  </div>

                  {/* Access */}
                  <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0e9] text-[#f36d45]">
                      <BookOpen size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-bold">Access</p>
                      <p className="text-xs leading-4 text-slate-500">
                        24 Months
                      </p>
                    </div>
                  </div>
                </div>

                {/* Smaller Hero Image */}
              </div>
            </section>

            {/* Right Enrollment Card */}
            <aside className="flex h-full flex-col rounded-2xl bg-white p-3 shadow-[0_4px_22px_rgba(16,29,66,0.09)]">
              {/* Course Preview */}

              <div className="w-full overflow-hidden rounded-lg">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title="SAT Masterclass course preview"
                    className="block aspect-video w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src="/sat-assets/sat-preview.jpg"
                    alt="SAT Masterclass course preview"
                    className="block aspect-video w-full object-cover"
                  />
                )}
              </div>

              <div className="mt-4">
                {/* Course Benefits */}
                <ul className="mb-3 space-y-2 text-base text-slate-600">
                  {[
                    "59 Live Interactive Sessions",
                    "Complete Study Material",
                    "5 Full-Length Mock Tests",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-[#ff653b] text-white">
                        <Check size={10} strokeWidth={3} />
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="mt-">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6035] px-3 py-2.5 text-base font-bold text-white transition hover:bg-[#e94e28]"
                >
                  Enroll Now
                  <ArrowRight size={15} />
                </button>

                <div className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#fff1ca] px-2 py-2 text-[11px] font-medium text-[#f36d45]">
                  <Clock3 size={15} />
                  Limited Time Offer
                </div>
              </div>
            </aside>
          </div>

          {/* Overview */}
          <section className="relative mt-5 overflow-hidden rounded-xl bg-[#fff0e8]">
            <div className="relative z-10 max-w-[72%] p-5 sm:max-w-[70%] sm:p-6">
              <h2 className="text-lg font-extrabold">Course Overview</h2>
              <span className="mt-1 block h-[3px] w-9 bg-[#f36d45]" />
              <p className="mt-3 text-base leading-[1.65] text-slate-700 sm:text-base line-clamp-4">
                {CourseDetail.description}
              </p>
            </div>
            <img
              src="/sat-assets/course-overview-illustration.png"
              alt="Student learning illustration"
              className="absolute bottom-0 right-0 h-full w- object-cover object-left"
            />
          </section>

          {/* What you'll learn */}
          <section className="mt-4">
            <SectionHeading>What You’ll Learn</SectionHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {CourseDetail.objectives?.map((item, i) => {
                const Icon = objectiveIcons[i % objectiveIcons.length];

                return (
                  <article
                    key={i}
                    className={`rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      toneClass[i % toneClass.length]
                    }`}
                  >
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-current/10 bg-white/70">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <p className="text-base leading-relaxed text-slate-700">
                      {item}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Highlights */}
          <section className="mt-4">
            <SectionHeading>Course Highlights</SectionHeading>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {CourseDetail?.features?.map((item, i) => {
                const Icon = objectiveIcons[i % objectiveIcons.length];

                return (
                  <article
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#f7e8df] bg-white p-3 transition-shadow duration-300 hover:shadow-md"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                        toneClass[i % toneClass.length]
                      }`}
                    >
                      <Icon size={25} fill="currentColor" fillOpacity={0.12} />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-slate-800">
                        {item}
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Requirements / audience */}
          <section className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <SectionHeading>Requirements</SectionHeading>
              <div className="rounded-xl bg-[#fff7e4] p-4">
                <ul className="space-y-2.5 text-base text-slate-600">
                  {CourseDetail.requirements.map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <CheckCircle />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <SectionHeading>Who This Course Is For</SectionHeading>
              <div className="rounded-xl bg-[#fff0ef] p-4">
                <ul className="space-y-2 text-base text-slate-600">
                  {CourseDetail.targetAudience.map((t, i) => (
                    <li key={t} className="flex items-start gap-3">
                      <UserRound
                        size={17}
                        className="shrink-0 text-[#f36d45]"
                        fill="currentColor"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section className="my-5">
            <SectionHeading>Course Curriculum</SectionHeading>

            <div className="relative">
              {/* Curriculum content */}
              <div
                className={`relative space-y-1.5 pl-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-[#ffd7c8] ${
                  !user
                    ? "pointer-events-none select-none overflow-hidden blur-[5px]"
                    : ""
                }`}
              >
                {curriculam?.slice(0, 8).map((module, i) => (
                  <div key={module.title} className="relative">
                    <span
                      className={`absolute -left-5 top-1/2 z-10 grid h-[30px] w-[30px] -translate-y-1/2 place-items-center rounded-full text-base font-bold ${
                        [
                          "bg-[#ff825d] text-white",
                          "bg-[#ffedb9] text-[#4a351d]",
                          "bg-[#ffd7c9] text-[#c23e24]",
                          "bg-[#ffd8d6] text-[#512e2c]",
                        ][i % 4]
                      }`}
                    >
                      {i + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => setOpenModule(openModule === i ? -1 : i)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#f8e8df] bg-white px-4 py-3 pl-6 text-left hover:bg-[#fffaf7]"
                    >
                      <span className="text-[11px] font-bold sm:text-base">
                        {module.title}
                      </span>

                      <span className="flex shrink-0 items-center gap-3 text-[10px] text-slate-500">
                        <span>{module.items.length} Topics</span>
                        <ChevronRight
                          size={15}
                          className={`transition-transform `}
                        />
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Login overlay */}
              {!user && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/40 p-4">
                  <div className="w-full max-w-sm rounded-2xl  p-6 text-center ">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Unlock Full Curriculum
                    </h3>

                    <button
                      type="button"
                      onClick={() => setShowLogin(true)}
                      className="mt-3 w-full rounded-xl bg-[#f36d45] px-5 py-3 text-base font-bold text-white transition hover:bg-[#e85d36]"
                    >
                      View Full Curriculum
                    </button>
                  </div>
                </div>
              )}
              {showLogin && (
                <CurriculumLoginPopup
                  onClose={() => setShowLogin(false)}
                  onAuthenticated={userInfo}
                  // onSuccess={() => setIsLoggedIn(true)}
                />
              )}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="relative mt-5 flex min-h-[125px] items-center overflow-hidden rounded-xl bg-[#fff2d2] px-5 py-5 sm:px-7">
            <img
              src="/sat-assets/course-help-illustration.webp"
              alt="Course advisor ready to help"
              className="absolute bottom-0 left-0 hidden h-full w-[190px] object-cover object-top sm:block"
            />
            <div className="relative z-10 ml-0 sm:ml-[190px]">
              <h2 className="text-lg font-extrabold sm:text-lg">
                Need Help Choosing the Right Course?
              </h2>
              <p className="mt-1 max-w-2xl text-base leading-4 text-slate-600">
                Our study abroad experts are here to help you select the best
                course, explain fees, guide admissions, and answer any questions
                before you enroll.
              </p>
            </div>
            <button className="relative z-10 mt-4 flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ff6035] px-4 py-3 text-base font-bold text-white hover:bg-[#e94e28] sm:ml-auto sm:mt-0">
              Talk to Our Experts <ArrowRight size={14} />
            </button>
          </section>
        </div>

        {/* FAQ */}
      </main>

      <section className="mt-5 bg-[#F3F4F6] py-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="space-y-1">
            {faqs.map(([q, a], i) => (
              <div
                key={q}
                className="overflow-hidden rounded-lg border border-[#f7e7dc] bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-base text-slate-600 hover:bg-[#fffaf7]"
                >
                  <span>{q}</span>
                  <span className="grid h-[28px] w-[22px] shrink-0 place-items-center rounded-full bg-[#fff0d0] text-[#f36d45]">
                    {openFaq === i ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="border-t border-[#f7e7dc] px-4 py-3 text-base leading-5 text-slate-600">
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="my-6 border-l-[3px] border-[#f36d45] pl-3 text-2xl font-extrabold leading-5">
      {children}
    </h2>
  );
}

function CheckCircle() {
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#ff653b] text-white">
      <Check size={11} strokeWidth={3} />
    </span>
  );
}
