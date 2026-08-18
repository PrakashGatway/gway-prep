"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  GraduationCap,
  Info,
  MapPin,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

const ORANGE = "#ff7a2a";
const NAVY = "#0b1e3f";
const LIGHT = "#f6f8fc";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How accurate is the GRE score calculator?",
    answer:
      "The calculator provides an estimated GRE score based on the practice section results you enter. It is designed to give you a useful benchmark before taking the official GRE.",
  },
  {
    question: "What is a good GRE score for graduate school?",
    answer:
      "A good GRE score depends on your target university, program and applicant pool. Competitive programs may expect stronger Quantitative and Verbal scores.",
  },
  {
    question: "Does Ooshas Prep predict my admission chances?",
    answer:
      "The calculator provides a score-based indication of program competitiveness. Admission depends on many factors including academics, experience, essays, recommendations and the university.",
  },
  {
    question: "How frequently should I use this calculator?",
    answer:
      "Use it after practice tests or major preparation milestones to track your progress and understand how your score is improving.",
  },
  {
    question: "Can I use my calculator results for university planning?",
    answer:
      "Yes. Your estimated score can be used as an initial benchmark when researching universities and graduate programs.",
  },
];

const programs = [
  {
    title: "Top 10 Programs",
    range: "325–340",
    description: "Highly selective graduate programs",
  },
  {
    title: "Top 50 Programs",
    range: "315–324",
    description: "Strong competitive universities",
  },
  {
    title: "Top 100 Programs",
    range: "300–314",
    description: "Broad range of graduate options",
  },
];

const testimonials = [
  {
    name: "Rahul",
    score: "329",
    text: "The calculator helped me understand where my score stood before I started shortlisting universities.",
  },
  {
    name: "Neha",
    score: "321",
    text: "I used the score prediction after every mock test and could clearly see my progress.",
  },
  {
    name: "Arjun",
    score: "334",
    text: "The program matching section made my university research much easier.",
  },
];

export default function GREScoreCalculatorPage() {
  const [verbalCorrect, setVerbalCorrect] = useState(34);
  const [verbalTotal, setVerbalTotal] = useState(40);
  const [quantCorrect, setQuantCorrect] = useState(36);
  const [quantTotal, setQuantTotal] = useState(40);
  const [difficulty, setDifficulty] = useState(75);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const score = useMemo(() => {
    const verbalPercentage =
      verbalTotal > 0 ? verbalCorrect / verbalTotal : 0;

    const quantPercentage = quantTotal > 0 ? quantCorrect / quantTotal : 0;

    const verbalScore = Math.round(130 + verbalPercentage * 40);
    const quantScore = Math.round(130 + quantPercentage * 40);

    return Math.min(340, verbalScore + quantScore);
  }, [verbalCorrect, verbalTotal, quantCorrect, quantTotal]);

  const percentile = useMemo(() => {
    if (score >= 330) return "98+";
    if (score >= 325) return "95+";
    if (score >= 320) return "90+";
    if (score >= 315) return "85+";
    if (score >= 310) return "75+";
    return "65+";
  }, [score]);

  return (
    <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">

      <Hero />

      <PracticeForm
        verbalCorrect={verbalCorrect}
        verbalTotal={verbalTotal}
        quantCorrect={quantCorrect}
        quantTotal={quantTotal}
        setVerbalCorrect={setVerbalCorrect}
        setVerbalTotal={setVerbalTotal}
        setQuantCorrect={setQuantCorrect}
        setQuantTotal={setQuantTotal}
      />

      <ScoreSection
        score={score}
        percentile={percentile}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        verbalCorrect={verbalCorrect}
        verbalTotal={verbalTotal}
        quantCorrect={quantCorrect}
        quantTotal={quantTotal}
      />

      {/* <ProgramMatching score={score} /> */}

      <WhySection />

      <DifferenceSection />

      <BeyondNumberSection />

      {/* <Testimonials /> */}

      {/* <ReportSection score={score} /> */}

      <QuestionsSection />

      <FAQSection
        expandedFAQ={expandedFAQ}
        setExpandedFAQ={setExpandedFAQ}
      />

      <BottomCTA />

    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HEADER */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1e3f]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-extrabold tracking-tight text-white">
            Ooshas
          </span>

          <span
            className="text-sm font-extrabold"
            style={{ color: ORANGE }}
          >
            Prep
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-[14px] font-medium text-white/80 md:flex">
          <a href="#calculator" className="transition hover:text-white">
            GRE Calculator
          </a>
          <a href="#programs" className="transition hover:text-white">
            Grad School Match
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            How It Works
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>

        <button
          className="rounded-full px-4 py-2 text-[10px] font-bold text-white shadow-lg transition hover:scale-105"
          style={{ background: ORANGE }}
        >
          Take Free Test
        </button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fcf3ed]">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(40,78,140,.35),transparent_55%)]" /> */}

      <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
        {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-1 
        text-[10px] font-bold uppercase tracking-wider text-orange-300">
          <Sparkles className="h-3 w-3" />
          Free GRE Tool
        </div> */}

        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight  sm:text-4xl lg:text-5xl">
          Free{" "}
          <span style={{ color: ORANGE }}>
            GRE Score Calculator
          </span>{" "}
          & Grad School Predictor
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6  sm:text-base">
          Estimate your GRE score, understand your percentile, and discover
          graduate programs that match your current performance.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
            style={{ background: ORANGE }}
          >
            Calculate My GRE Score
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#programs"
            className="inline-flex items-center justify-center rounded-lg border border-black  px-6 py-3 text-sm font-semibold
             transition hover:bg-white/10"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  );
}



type PracticeProps = {
  verbalCorrect: number;
  verbalTotal: number;
  quantCorrect: number;
  quantTotal: number;
  setVerbalCorrect: (value: number) => void;
  setVerbalTotal: (value: number) => void;
  setQuantCorrect: (value: number) => void;
  setQuantTotal: (value: number) => void;
};

function PracticeForm({
  verbalCorrect,
  verbalTotal,
  quantCorrect,
  quantTotal,
  setVerbalCorrect,
  setVerbalTotal,
  setQuantCorrect,
  setQuantTotal,
}: PracticeProps) {
  return (
    <section className="mt-7 px-4 pb-14">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
        <div className="mb-5 flex items-start gap-3">
          <div
            className="mt-0.5 rounded-lg p-2"
            style={{ background: "#fff0e8", color: ORANGE }}
          >
            <Target className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-extrabold sm:text-base">
              Get Your Free GRE Diagnostic & Study Plan
            </h2>
            <p className="mt-1 text-xm leading-5 text-slate-500">
              Enter your latest practice results to get an instant estimate.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ScoreInput
            label="Verbal Reasoning"
            value={verbalCorrect}
            total={verbalTotal}
            setValue={setVerbalCorrect}
            setTotal={setVerbalTotal}
          />

          <ScoreInput
            label="Quantitative Reasoning"
            value={quantCorrect}
            total={quantTotal}
            setValue={setQuantCorrect}
            setTotal={setQuantTotal}
          />
        </div>

        <button
          className="mt-5 w-full rounded-lg py-3 text-sm font-bold text-white shadow-md transition hover:brightness-105"
          style={{ background: ORANGE }}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

function ScoreInput({
  label,
  value,
  total,
  setValue,
  setTotal,
}: {
  label: string;
  value: number;
  total: number;
  setValue: (value: number) => void;
  setTotal: (value: number) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xm font-bold text-slate-700">{label}</span>

        <span className="text-[10px] font-semibold text-slate-400">
          Practice Result
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-[10px] font-semibold text-slate-500">
            Correct Answers
          </span>

          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-orange-400"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-semibold text-slate-500">
            Total Questions
          </span>

          <input
            type="number"
            min={1}
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-orange-400"
          />
        </label>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SCORE SECTION */
/* -------------------------------------------------------------------------- */

function ScoreSection({
  score,
  percentile,
  difficulty,
  setDifficulty,
  verbalCorrect,
  verbalTotal,
  quantCorrect,
  quantTotal,
}: {
  score: number;
  percentile: string;
  difficulty: number;
  setDifficulty: (value: number) => void;
  verbalCorrect: number;
  verbalTotal: number;
  quantCorrect: number;
  quantTotal: number;
}) {
  return (
    <section id="calculator" className="px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="GRE SCORE CALCULATOR"
          title="Convert Your Raw Score Into Your Real GRE Score"
          description="Enter your practice performance and understand how your current results translate into an estimated GRE score."
        />

        <div className="mt-9 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:grid-cols-[1fr_360px]">
          <div className="p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold">
                  Enter Your Practice Test Results
                </h3>
                <p className="mt-1 text-[14px] text-slate-500">
                  Use your latest mock test for the best estimate.
                </p>
              </div>

              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-500">
                LIVE
              </span>
            </div>

            <ResultRow
              label="Verbal Reasoning"
              value={`${verbalCorrect}/${verbalTotal}`}
              percentage={
                verbalTotal
                  ? Math.round((verbalCorrect / verbalTotal) * 100)
                  : 0
              }
            />

            <ResultRow
              label="Quantitative Reasoning"
              value={`${quantCorrect}/${quantTotal}`}
              percentage={
                quantTotal
                  ? Math.round((quantCorrect / quantTotal) * 100)
                  : 0
              }
            />

            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex justify-between">
                <div>
                  <p className="text-xm font-bold">Question Difficulty</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    How challenging was your practice test?
                  </p>
                </div>

                <span className="text-xm font-bold text-orange-500">
                  {difficulty}%
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <button
              className="mt-5 w-full rounded-lg py-3 text-xm font-bold text-white"
              style={{ background: ORANGE }}
            >
              Calculate My GRE Score
            </button>
          </div>

          <div className="relative flex flex-col justify-center bg-[#0b1e3f] p-7 text-white">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-center text-[10px] font-medium uppercase tracking-widest text-blue-200/60">
                Your Estimated GRE Score
              </p>

              <div className="mt-4 text-center">
                <span className="text-6xl font-black tracking-tight">
                  {score}
                </span>

                <span className="ml-1 text-sm font-semibold text-white/50">
                  /340
                </span>
              </div>

              <div className="mt-3 text-center">
                <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
                  {percentile} Percentile
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <ScoreMeter label="Verbal Reasoning" value={verbalCorrect / Math.max(verbalTotal, 1) * 100} />
                <ScoreMeter label="Quantitative Reasoning" value={quantCorrect / Math.max(quantTotal, 1) * 100} />
                <ScoreMeter label="Overall Performance" value={Math.min((score / 340) * 100, 100)} />
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center">
                <p className="text-[10px] leading-5 text-blue-100/60">
                  Your estimated score is a planning benchmark and should not
                  be considered an official GRE result.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="mb-4 rounded-xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xm font-bold">{label}</span>

        <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            background: ORANGE,
          }}
        />
      </div>
    </div>
  );
}

function ScoreMeter({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[10px]">
        <span className="text-white/70">{label}</span>
        <span className="font-bold text-white">
          {Math.round(value)}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-orange-400 transition-all"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROGRAM MATCHING */
/* -------------------------------------------------------------------------- */

function ProgramMatching({ score }: { score: number }) {
  return (
    <section
      id="programs"
      className="bg-[#f6f8fc] px-4 pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="PROGRAM MATCHING"
          title="Which Grad Programs Match Your GRE Score?"
          description={`Based on your estimated score of ${score}, here are the types of graduate programs you can explore.`}
        />

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <span className="text-xm font-bold">Your Current Range</span>

            <button className="rounded-md bg-[#0b1e3f] px-3 py-2 text-[10px] font-bold text-white">
              View More Programs
            </button>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className={`p-5 ${
                  index !== programs.length - 1
                    ? "border-b border-slate-200 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-orange-500">
                    {program.title}
                  </span>

                  <GraduationCap className="h-4 w-4 text-slate-300" />
                </div>

                <p className="text-xl font-black">{program.range}</p>

                <p className="mt-2 text-[14px] leading-5 text-slate-500">
                  {program.description}
                </p>

                <button className="mt-4 text-[10px] font-bold text-orange-500">
                  Explore Programs →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHY SECTION */
/* -------------------------------------------------------------------------- */

function WhySection() {
  return (<section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]"> 
  <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center"> 
    <div> 
      <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600"> 
        More Than A Number 
      </div> 
      <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl text-[#0b1e3f]"> 
        Your Score Doesn't Stop Here — <br /> Practice For Real 
      </h2> 
      <p className="mt-5 max-w-xl text-sm leading-6 text-[#0b1e3f]/80"> 
        Your GRE score is only one part of your graduate school journey. Use your results to identify weaknesses, improve your preparation, and build a stronger application strategy. 
      </p> 
      <ul className="mt-6 space-y-3"> 
        {[ 
          "Identify your strongest and weakest GRE sections", 
          "Track progress across multiple practice tests", 
          "Understand where your score stands", 
          "Build a smarter graduate school shortlist", 
        ].map((item) => ( 
          <li key={item} className="flex items-center gap-3 text-xm text-[#0b1e3f]/90" > 
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-600"> 
              <Check className="h-3 w-3" /> 
            </span> 
            {item} 
          </li> 
        ))} 
      </ul> 
      <button className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white" style={{ background: ORANGE }} > 
        Start Your Preparation 
      </button> 
    </div> 
    <div className="grid grid-cols-2 gap-3"> 
      {[ 
        ["2,000+", "Students Tested"], 
        ["10,000+", "Practice Results"], 
        ["42 pts", "Average Improvement"], 
        ["247", "Universities Explored"], 
      ].map(([number, label]) => ( 
        <div key={label} className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5" > 
          <p className="text-xl font-black text-[#0b1e3f]">{number}</p> 
          <p className="mt-1 text-[10px] text-[#0b1e3f]/60">{label}</p> 
        </div> 
      ))} 
    </div> 
  </div> 
</section>

  );
}

/* -------------------------------------------------------------------------- */
/* DIFFERENCE */
/* -------------------------------------------------------------------------- */

function DifferenceSection() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-4 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="OUR DIFFERENCE"
          title="How Ooshas Prep's GRE Calculator Is Different"
          description="A simple calculator designed to give you useful insights beyond just a single number."
        />

        <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-[#0b1e3f] text-[10px] font-bold text-white">
            <div className="p-3">Feature</div>
            <div className="p-3 text-center">Ooshas Prep</div>
            <div className="p-3 text-center">Basic Calculator</div>
            <div className="p-3 text-center">Random Predictor</div>
          </div>

          {[
            "Practice-based score estimate",
            "Section-level insights",
            "Grad program matching",
            "Performance tracking",
            "Study recommendations",
            "Admission planning",
          ].map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-slate-200 text-[14px]"
            >
              <div className="p-3 font-semibold text-slate-700">
                {item}
              </div>

              <div className="flex items-center justify-center bg-orange-50 p-3">
                <Check className="h-4 w-4 text-orange-500" />
              </div>

              <div className="flex items-center justify-center p-3">
                {index < 2 ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span className="text-slate-300">×</span>
                )}
              </div>

              <div className="flex items-center justify-center p-3">
                {index === 2 ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span className="text-slate-300">×</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function BeyondNumberSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      text: "Monitor score changes over multiple practice tests.",
    },
    {
      icon: Target,
      title: "Pinpoint Weak Areas",
      text: "Understand which section needs more preparation.",
    },
    {
      icon: GraduationCap,
      title: "Explore Universities",
      text: "Compare your score against graduate program ranges.",
    },
    {
      icon: Trophy,
      title: "Build Your Profile",
      text: "Use your GRE score as part of your larger application plan.",
    },
    {
      icon: MapPin,
      title: "Find Your Fit",
      text: "Discover programs that align with your goals.",
    },
    {
      icon: Sparkles,
      title: "Get Smarter Insights",
      text: "Turn raw practice results into actionable information.",
    },
  ];

  return (
    <section className="bg-[#fff] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="BEYOND THE NUMBER"
          title="Go Beyond the Number — Understand Your Score"
          description="Your GRE result can tell you much more when combined with the right context."
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <Icon className="h-4 w-4" />
              </div>

              <h3 className="text-sm font-extrabold">{title}</h3>

              <p className="mt-2 text-[14px] leading-5 text-slate-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  return (
    <section className="bg-[#0b1e3f] px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          dark
          eyebrow="REAL USERS"
          title="Students Who Used Our GRE Tools"
          description="See how students used their GRE results to improve their preparation."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    className="h-3 w-3 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              <p className="mt-4 text-xm leading-6 text-blue-100/75">
                “{testimonial.text}”
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-xm font-bold">{testimonial.name}</p>
                  <p className="mt-1 text-[9px] text-blue-100/40">
                    GRE Student
                  </p>
                </div>

                <span className="rounded-full bg-orange-400/10 px-2.5 py-1 text-[10px] font-bold text-orange-300">
                  {testimonial.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* REPORT */
/* -------------------------------------------------------------------------- */

function ReportSection({ score }: { score: number }) {
  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="FREE SCORE REPORT"
          title="Get a Free Detailed Score & Admissions Report"
          description="Enter your email to receive a detailed summary of your estimated GRE performance."
        />

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
          <label className="mb-4 block">
            <span className="mb-2 block text-[10px] font-bold text-slate-600">
              Your Email
            </span>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
          </label>

          <div className="mb-4 rounded-lg bg-slate-50 p-3">
            <p className="text-[10px] text-slate-400">
              Current estimated score
            </p>
            <p className="mt-1 text-lg font-black">{score}/340</p>
          </div>

          <button
            className="w-full rounded-lg py-3 text-xm font-bold text-white"
            style={{ background: ORANGE }}
          >
            Send My Free Report
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* QUESTIONS */
/* -------------------------------------------------------------------------- */

function QuestionsSection() {
  return (
    <section className="bg-[#fcf3ed] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="COMMUNITY"
          title="Student Questions & Comments"
          description="Have a question about your GRE score? Ask our team and community."
        />

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Your name"
              className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
            />

            <input
              placeholder="Email address"
              className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
            />
          </div>

          <textarea
            placeholder="Ask your question..."
            rows={4}
            className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
          />

          <button className="mt-3 rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">
            Post Question
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {[
            "How can I improve my Quant score?",
            "Is a 320 GRE score competitive?",
            "Which universities should I target?",
          ].map((question, index) => (
            <div
              key={question}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1e3f] text-[10px] font-bold text-white">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="text-xm font-bold">{question}</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Asked by GRE student
                  </p>
                </div>

                <button className="text-[10px] font-bold text-orange-500">
                  Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ */
/* -------------------------------------------------------------------------- */

function FAQSection({
  expandedFAQ,
  setExpandedFAQ,
}: {
  expandedFAQ: number | null;
  setExpandedFAQ: (value: number | null) => void;
}) {
  return (
    <section id="faq" className="bg-[#fff] px-4 pb-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow=""
          title="GRE Score Calculator — Frequently Asked Questions"
          description="Everything you need to know about our GRE score calculator."
        />

        <div className="mt-8 space-y-2">
          {faqs.map((faq, index) => {
            const open = expandedFAQ === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(open ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-xm font-bold">
                    {faq.question}
                  </span>

                  {open ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-orange-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-orange-500" />
                  )}
                </button>

                {open && (
                  <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                    <p className="text-[14px] leading-5 text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



function BottomCTA() {
  return (
    <section id="contact" className="bg-white px-4 pb-5">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10"
        style={{
          background:
            "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)",
        }}
      >
        <h2 className="text-xl font-black text-white sm:text-2xl">
          Your Dream Grad School Is One Score Away
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xm leading-5 text-white/80">
          Understand your current GRE performance and take the next step
          toward your graduate school goals.
        </p>

        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <button className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">
            Calculate My Score
          </button>

          <button className="rounded-lg bg-white px-5 py-3 text-xm font-bold text-[#0b1e3f]">
            Talk To An Expert
          </button>
        </div>
      </div>
    </section>
  );
}




function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${
          dark
            ? "bg-orange-400/10 text-orange-300"
            : "bg-orange-50 text-orange-500"
        }`}
      >
        {eyebrow}
      </span>

      <h2
        className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${
          dark ? "text-white" : "text-[#0b1e3f]"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${
          dark ? "text-blue-100/60" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </div>
  );
}












