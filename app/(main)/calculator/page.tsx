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
import { Consultants } from "@/components/destinations-consultants";

const ORANGE = "#ff7a2a";
const NAVY = "#0b1e3f";
// Ascending band color ramp, light -> deep orange, used on the gauge chart.
const BAND_COLORS = ["#ffe8d9", "#ffd0ad", "#ffb37a", "#ff9550", "#ff7a2a"];

type FAQ = {
  question: string;
  answer: string;
};

type ExamType = "GRE" | "GMAT" | "SAT" | "TOEFL" | "IELTS" | "PTE";

type ExamSection = {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  bandFromRaw?: (raw: number) => number;
  bandUnitLabel?: string; // e.g. "Band" — label for the converted value
};

type PercentileBand = {
  // Lowest total score (inclusive) that qualifies for this band.
  threshold: number;
  label: string;
};

type ExamConfig = {
  label: string;
  sections: ExamSection[];
  scoreRange: { min: number; max: number };
  percentileBands: PercentileBand[];
  totalLabel: string;
  computeTotal: (scores: Record<string, number>) => number;
};

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function roundIELTSBand(avg: number) {
  const whole = Math.floor(avg);
  const remainder = avg - whole;
  if (remainder < 0.25) return whole;
  if (remainder < 0.75) return whole + 0.5;
  return whole + 1;
}

const LISTENING_RAW_TO_BAND: { min: number; band: number }[] = [
  { min: 39, band: 9 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8 },
  { min: 32, band: 7.5 },
  { min: 30, band: 7 },
  { min: 26, band: 6.5 },
  { min: 23, band: 6 },
  { min: 18, band: 5.5 },
  { min: 16, band: 5 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4 },
  { min: 8, band: 3.5 },
  { min: 6, band: 3 },
  { min: 4, band: 2.5 },
];

const READING_RAW_TO_BAND: { min: number; band: number }[] = [
  { min: 39, band: 9 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8 },
  { min: 33, band: 7.5 },
  { min: 30, band: 7 },
  { min: 27, band: 6.5 },
  { min: 23, band: 6 },
  { min: 19, band: 5.5 },
  { min: 15, band: 5 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4 },
  { min: 8, band: 3.5 },
  { min: 6, band: 3 },
];

function rawToBand(
  raw: number,
  table: { min: number; band: number }[],
): number {
  for (const row of table) {
    if (raw >= row.min) return row.band;
  }
  return 0;
}

const listeningBandFromRaw = (raw: number) =>
  rawToBand(raw, LISTENING_RAW_TO_BAND);
const readingBandFromRaw = (raw: number) => rawToBand(raw, READING_RAW_TO_BAND);

function defaultSectionValue(section: ExamSection) {
  const step = section.step || 1;
  const raw = section.min + (section.max - section.min) * 0.75;
  return roundToStep(raw, step);
}

// Finds the highest band whose threshold is <= score.
function getPercentileLabel(score: number, bands: PercentileBand[]) {
  let label = bands[0]?.label ?? "";
  for (const band of bands) {
    if (score >= band.threshold) label = band.label;
  }
  return label;
}

const examConfigs: Record<ExamType, ExamConfig> = {
  GRE: {
    label: "GRE",
    // Real GRE section scores are scaled 130-170, not raw 0-40 counts.
    sections: [
      { id: "verbal", label: "Verbal Reasoning", min: 130, max: 170 },
      { id: "quant", label: "Quantitative Reasoning", min: 130, max: 170 },
    ],
    scoreRange: { min: 260, max: 340 },
    percentileBands: [
      { threshold: 260, label: "65th" },
      { threshold: 310, label: "75th" },
      { threshold: 315, label: "85th" },
      { threshold: 320, label: "90th" },
      { threshold: 325, label: "95th" },
      { threshold: 330, label: "98th" },
    ],
    totalLabel: "/340",
    computeTotal: (scores) => (scores.verbal ?? 130) + (scores.quant ?? 130),
  },
  GMAT: {
    label: "GMAT",
    // GMAT Focus Edition subsections are scaled 60-90 each.
    sections: [
      { id: "quant", label: "Quantitative", min: 60, max: 90 },
      { id: "verbal", label: "Verbal", min: 60, max: 90 },
      { id: "di", label: "Data Insights", min: 60, max: 90 },
    ],
    scoreRange: { min: 205, max: 805 },
    percentileBands: [
      { threshold: 205, label: "40th" },
      { threshold: 600, label: "55th" },
      { threshold: 650, label: "75th" },
      { threshold: 700, label: "90th" },
      { threshold: 750, label: "99th" },
    ],
    totalLabel: "/805",

    computeTotal: (scores) => {
      const q = scores.quant ?? 60;
      const v = scores.verbal ?? 60;
      const di = scores.di ?? 60;
      const avg = (q + v + di) / 3;
      const raw = 205 + ((avg - 60) / (90 - 60)) * (805 - 205);
      return roundToStep(raw, 10);
    },
  },
  SAT: {
    label: "SAT",
    sections: [
      { id: "rw", label: "Reading & Writing", min: 200, max: 800 },
      { id: "math", label: "Math", min: 200, max: 800 },
    ],
    scoreRange: { min: 400, max: 1600 },
    percentileBands: [
      { threshold: 400, label: "50th" },
      { threshold: 1200, label: "75th" },
      { threshold: 1300, label: "87th" },
      { threshold: 1400, label: "94th" },
      { threshold: 1500, label: "98th" },
    ],
    totalLabel: "/1600",
    // SAT total is the sum of both section scores.
    computeTotal: (scores) => (scores.rw ?? 200) + (scores.math ?? 200),
  },
  TOEFL: {
    label: "TOEFL iBT",
    sections: [
      { id: "reading", label: "Reading", min: 0, max: 30 },
      { id: "listening", label: "Listening", min: 0, max: 30 },
      { id: "speaking", label: "Speaking", min: 0, max: 30 },
      { id: "writing", label: "Writing", min: 0, max: 30 },
    ],
    scoreRange: { min: 0, max: 120 },
    percentileBands: [
      { threshold: 0, label: "40th" },
      { threshold: 90, label: "60th" },
      { threshold: 100, label: "80th" },
      { threshold: 110, label: "90th" },
      { threshold: 115, label: "95th" },
    ],
    totalLabel: "/120",
    computeTotal: (scores) =>
      (scores.reading ?? 0) +
      (scores.listening ?? 0) +
      (scores.speaking ?? 0) +
      (scores.writing ?? 0),
  },
  IELTS: {
    label: "IELTS",
    sections: [
      {
        id: "listening",
        label: "Listening",
        min: 0,
        max: 40,
        step: 1,
        bandFromRaw: listeningBandFromRaw,
        bandUnitLabel: "Band",
      },
      {
        id: "reading",
        label: "Reading",
        min: 0,
        max: 40,
        step: 1,
        bandFromRaw: readingBandFromRaw,
        bandUnitLabel: "Band",
      },

      { id: "writing", label: "Writing", min: 0, max: 9, step: 0.5 },
      { id: "speaking", label: "Speaking", min: 0, max: 9, step: 0.5 },
    ],
    scoreRange: { min: 0, max: 9 },
    percentileBands: [
      { threshold: 0, label: "60th" },
      { threshold: 7, label: "75th" },
      { threshold: 7.5, label: "88th" },
      { threshold: 8, label: "95th" },
      { threshold: 8.5, label: "98th" },
    ],
    totalLabel: "/9",

    computeTotal: (scores) => {
      const listeningBand = listeningBandFromRaw(scores.listening ?? 0);
      const readingBand = readingBandFromRaw(scores.reading ?? 0);
      const writingBand = scores.writing ?? 0;
      const speakingBand = scores.speaking ?? 0;
      const avg =
        (listeningBand + readingBand + writingBand + speakingBand) / 4;
      return roundIELTSBand(avg);
    },
  },
  PTE: {
    label: "PTE Academic",
    sections: [
      { id: "speaking", label: "Speaking & Writing", min: 10, max: 90 },
      { id: "reading", label: "Reading", min: 10, max: 90 },
      { id: "listening", label: "Listening", min: 10, max: 90 },
    ],
    scoreRange: { min: 10, max: 90 },
    percentileBands: [
      { threshold: 10, label: "45th" },
      { threshold: 65, label: "60th" },
      { threshold: 72, label: "75th" },
      { threshold: 79, label: "88th" },
      { threshold: 85, label: "95th" },
    ],
    totalLabel: "/90",
    computeTotal: (scores) => {
      const avg =
        ((scores.speaking ?? 10) +
          (scores.reading ?? 10) +
          (scores.listening ?? 10)) /
        3;
      return Math.round(avg);
    },
  },
};

type CalculatedResult = {
  exam: ExamType;
  scores: Record<string, number>;
  totalScore: number;
  percentile: string;
};


  const faqs =  {
      name: 'f&q',
      template: 'Preparation',
      label: 'FAQ',
      fields: {
        title: 'Frequently || Asked Questions  ',
        items: [
          {
            answer: 'Our center is widely rated as the best GRE coaching in India because we offer expert physical classroom mentorship, personalized study planners, and a dedicated GRE preparation India simulation lab. We provide individual attention with strict batch limits, making us the top choice for students looking for high-quality classroom GRE coaching.',
            question: 'Which is the best GRE coaching in India for offline classroom preparation?'
          },
          {
            question: 'How can I access a realistic free GRE practice test?',
            answer: 'You can take a high-quality free GRE practice test directly on our platform. Our entry-level gre mock test matches the official ETS exam interface exactly, giving you an accurate baseline score and helping you identify your structural strengths and weaknesses before you buy any premium test series.'
          },
          {
            question: 'Does your GRE mock test series use a section-adaptive algorithm?',
            answer: 'Yes, every full-length gre online mock test in our test series uses a true section-adaptive engine. This means the second section dynamically changes its difficulty based on your performance in the first section, perfectly matching the official shorter GRE format for highly accurate score predictions'
          },
          {
            question: 'Where can I find the updated GRE syllabus 2026 and exam structure?',
            answer: 'You can download the complete GRE syllabus 2026 and detailed gre exam pattern directly from our resources tab. Our syllabus guide breaks down every high-yield topic across the quantitative reasoning, verbal reasoning, and analytical writing sections so you can plan your daily study goals effectively.'
          },
          {
            question: 'How do your online GRE classes help non-native English speakers with vocabulary?',
            answer: ' Our gre online classes feature a dedicated verbal strategy kit built for non-native English speakers. Students gain access to context-based digital flashcards, reading speed drills, and section-specific gre verbal mock test online modules to confidently master high-frequency exam words.'
          },
          {
            question: 'What is the current GRE exam fee in India for registration?',
            answer: 'The standard gre exam fee in India is set globally by ETS. While checking your local center slots for gre registration india, you can view our platform\'s updated fee guide, which outlines current costs in Indian Rupees (INR) alongside any active exam voucher discounts.'
          },
          {
            question: 'Why should I choose your test series over general GRE preparation online tools?',
            answer: 'Unlike basic static quiz tools found across standard gre preparation online websites, our platform provides deep performance analytics. Every gre mock test triggers an automated error report detailing your time spent per question, accuracy tiers, and a national percentile rank comparison.'
          },
          {
            question: 'Is Ooshas Prep good for GRE offline classroom coaching too?',
            answer: 'Ooshas Prep is primarily an online GRE coaching platform, with live instructor-led sessions delivered virtually. This lets us keep costs lower than traditional classroom coaching while still giving you real-time mentor access — a good fit if you want structured guidance without commuting to a coaching center.'
          },
          {
            question: 'Is there a free GRE practice test available?',
            answer: 'Yes. We offer a free GRE diagnostic test that identifies your current score range and weak areas before you commit to a paid plan, so you know exactly what you need to work on.'
          },
          {
            question: 'How long does it take to prepare for the GRE?',
            answer: 'Most students see solid results with [6–10 weeks] of consistent preparation, though this depends on your starting score, target score, and available study time per week. Our diagnostic test helps build a realistic timeline for your specific situation.'
          },
          {
            question: 'What is the GRE online coaching fee at Ooshas Prep in India?',
            answer: 'Our GRE coaching fees are different based on the packages (starter, standard, and premium) and the extent of assistance opted by the candidate. Moreover, the fees might be altered depending upon a new batch start, discount offers, and other such factors. Hence, it will be appropriate to contact our admission counselors to get an exact fee structure.'
          }
        ]
      }
    };

export default function ScoreCalculatorPage() {
  const [selectedExam, setSelectedExam] = useState<ExamType>("GRE");
  const [sectionScores, setSectionScores] = useState<Record<string, number>>(
    {},
  );
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [result, setResult] = useState<CalculatedResult | null>(null);

  const config = examConfigs[selectedExam];

  // Initialize scores for the selected exam using each section's real min/max/step.
  React.useEffect(() => {
    const initial: Record<string, number> = {};
    config.sections.forEach((s) => {
      initial[s.id] = defaultSectionValue(s);
    });
    setSectionScores(initial);
    setResult(null);
  }, [selectedExam]);

  const handleScoreChange = (sectionId: string, value: number) => {
    const section = config.sections.find((s) => s.id === sectionId);
    if (!section) return;
    const step = section.step || 1;
    const snapped = roundToStep(value, step);
    const clamped = Math.min(section.max, Math.max(section.min, snapped));
    setSectionScores((prev) => ({ ...prev, [sectionId]: clamped }));
  };

  const handleCalculate = () => {
    const computed = config.computeTotal(sectionScores);
    const totalScore = Math.min(
      config.scoreRange.max,
      Math.max(config.scoreRange.min, computed),
    );
    const percentile = getPercentileLabel(totalScore, config.percentileBands);
    setResult({
      exam: selectedExam,
      scores: { ...sectionScores },
      totalScore,
      percentile,
    });
  };

  return (
    <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">
      <Hero />

      <div className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {(Object.keys(examConfigs) as ExamType[]).map((exam) => (
            <button
              key={exam}
              onClick={() => setSelectedExam(exam)}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold transition ${
                selectedExam === exam
                  ? "bg-[#0b1e3f] text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {examConfigs[exam].label}
            </button>
          ))}
        </div>
      </div>

      <ScoreSection
        config={config}
        sectionScores={sectionScores}
        onScoreChange={handleScoreChange}
        onCalculate={handleCalculate}
        result={result && result.exam === selectedExam ? result : null}
      />

      <ScoreVisualizationSection
        config={config}
        result={result && result.exam === selectedExam ? result : null}
      />

      <WhySection />
      <DifferenceSection />
      <BeyondNumberSection />
      <QuestionsSection />
      {/* <FAQSection expandedFAQ={expandedFAQ} setExpandedFAQ={setExpandedFAQ} /> */}
      <Consultants data={faqs} />
      <BottomCTA />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fcf3ed]">
      <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Free <span style={{ color: ORANGE }}>Exam Score Calculator</span> &
          Grad School Predictor
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 sm:text-base">
          Estimate your GRE, GMAT, SAT, TOEFL, IELTS, or PTE score, understand
          your percentile, and discover programs that match your performance.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
            style={{ background: ORANGE }}
          >
            Calculate My Score
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#programs"
            className="inline-flex items-center justify-center rounded-lg border border-black px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </section>
  );
}

function ScoreSection({
  config,
  sectionScores,
  onScoreChange,
  onCalculate,
  result,
}: {
  config: ExamConfig;
  sectionScores: Record<string, number>;
  onScoreChange: (id: string, value: number) => void;
  onCalculate: () => void;
  result: CalculatedResult | null;
}) {
  const displayTotal =
    result &&
    (Number.isInteger(result.totalScore)
      ? result.totalScore
      : result.totalScore.toFixed(1));

  return (
    <section id="calculator" className="px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={`${config.label} SCORE CALCULATOR`}
          title={`Convert Your Raw Score Into Your Real ${config.label} Score`}
          description={`Enter your practice performance and click Calculate to see your estimated ${config.label} score.`}
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

            {config.sections.map((section) => {
              const value = sectionScores[section.id] ?? section.min;
              const percentage = Math.round(
                ((value - section.min) / (section.max - section.min)) * 100,
              );
              const step = section.step || 1;
              const bandEquivalent = section.bandFromRaw
                ? section.bandFromRaw(value)
                : null;
              return (
                <div
                  key={section.id}
                  className="mb-4 rounded-xl border border-slate-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xm font-bold">
                      {section.label}
                      {section.bandFromRaw && (
                        <span className="ml-1.5 font-normal text-slate-400">
                          (out of {section.max})
                        </span>
                      )}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                      {value}
                      <span className="text-slate-400"> / {section.max}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={section.min}
                      max={section.max}
                      step={step}
                      value={value}
                      onChange={(e) =>
                        onScoreChange(section.id, Number(e.target.value))
                      }
                      className="flex-1 accent-orange-500"
                    />
                    <input
                      type="number"
                      min={section.min}
                      max={section.max}
                      step={step}
                      value={value}
                      onChange={(e) =>
                        onScoreChange(section.id, Number(e.target.value))
                      }
                      className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-center text-sm font-bold outline-none focus:border-orange-400"
                    />
                  </div>
                  {/* <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(Math.max(percentage, 0), 100)}%`,
                        background: ORANGE,
                      }}
                    />
                  </div> */}
                  {bandEquivalent !== null && (
                    <p className="mt-2 text-[11px] font-semibold text-orange-500">
                      ≈ {section.bandUnitLabel ?? "Band"} {bandEquivalent}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={onCalculate}
              className="mt-5 w-full rounded-lg py-3 text-xm font-bold text-white transition hover:brightness-95"
              style={{ background: ORANGE }}
            >
              Calculate My Score
            </button>
          </div>

          <div className="relative flex flex-col justify-center bg-[#0b1e3f] p-7 text-white">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative">
              {!result ? (
                <ResultPlaceholder />
              ) : (
                <>
                  <p className="text-center text-[10px] font-medium uppercase tracking-widest text-blue-200/60">
                    Your Estimated {config.label} Score
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-6xl font-black tracking-tight">
                      {displayTotal}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-white/50">
                      {config.totalLabel}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
                      {result.percentile} Percentile
                    </span>
                  </div>

                  <div className="mt-8 space-y-4">
                    {config.sections.map((section) => {
                      const val = result.scores[section.id] ?? section.min;
                      const pct = Math.round(
                        ((val - section.min) / (section.max - section.min)) *
                          100,
                      );
                      return (
                        <ScoreMeter
                          key={section.id}
                          label={section.label}
                          value={pct}
                        />
                      );
                    })}
                    <ScoreMeter
                      label="Overall Performance"
                      value={Math.round(
                        ((result.totalScore - config.scoreRange.min) /
                          (config.scoreRange.max - config.scoreRange.min)) *
                          100,
                      )}
                    />
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5 text-center">
                    <p className="text-[10px] leading-5 text-blue-100/60">
                      Your estimated score is a planning benchmark and should
                      not be considered an official result.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultPlaceholder() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-white/20">
        <Sparkles className="h-6 w-6 text-white/40" />
      </div>
      <p className="mt-4 text-sm font-bold text-white/80">No score yet</p>
      <p className="mx-auto mt-2 max-w-[220px] text-[12px] leading-5 text-blue-100/60">
        Enter your section scores on the left, then click{" "}
        <span className="font-semibold text-orange-300">
          Calculate My Score
        </span>{" "}
        to see your estimated result and charts.
      </p>
    </div>
  );
}

function ScoreMeter({ label, value }: { label: string; value: number }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-[10px]">
        <span className="text-white/70">{label}</span>
        <span className="font-bold text-white">{Math.round(clamped)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-orange-400 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

function ScoreVisualizationSection({
  config,
  result,
}: {
  config: ExamConfig;
  result: CalculatedResult | null;
}) {
  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SCORE BREAKDOWN"
          title="See Your Score & Band, Visually"
          description="A section-by-section chart of your practice scores, plus where your total score falls on the official band scale."
        />
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-sm font-extrabold">Section Score Chart</h3>
            <p className="mt-1 text-[14px] text-slate-500">
              Each bar shows how your entered score compares to that section's
              full range.
            </p>
            {result ? (
              <SectionBarChart config={config} sectionScores={result.scores} />
            ) : (
              <ChartPlaceholder />
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="text-sm font-extrabold">
              Total Score & Band Position
            </h3>
            {result ? (
              <>
                <p className="mt-1 text-[14px] text-slate-500">
                  Your {config.label} total of{" "}
                  {Number.isInteger(result.totalScore)
                    ? result.totalScore
                    : result.totalScore.toFixed(1)}{" "}
                  sits in the{" "}
                  <span className="font-bold text-orange-500">
                    {result.percentile} percentile
                  </span>{" "}
                  band.
                </p>
                <BandGaugeChart
                  config={config}
                  totalScore={result.totalScore}
                />
              </>
            ) : (
              <>
                <p className="mt-1 text-[14px] text-slate-500">
                  Click Calculate My Score above to see where your total lands.
                </p>
                <ChartPlaceholder />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartPlaceholder() {
  return (
    <div className="mt-5 flex h-[220px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
      <p className="max-w-[220px] text-center text-[12px] leading-5 text-slate-400">
        Your chart will appear here once you calculate your score.
      </p>
    </div>
  );
}

function SectionBarChart({
  config,
  sectionScores,
}: {
  config: ExamConfig;
  sectionScores: Record<string, number>;
}) {
  const width = 600;
  const height = 260;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 56;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const sections = config.sections;
  const gap = 24;
  const barWidth = (chartWidth - gap * (sections.length - 1)) / sections.length;

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-5 w-full"
      role="img"
      aria-label="Section score chart"
    >
      {/* Y-axis grid lines */}
      {gridLines.map((pct) => {
        const y = paddingTop + chartHeight - (pct / 100) * chartHeight;
        return (
          <g key={pct}>
            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text
              x={paddingLeft - 8}
              y={y + 3}
              textAnchor="end"
              fontSize={9}
              fill="#94a3b8"
            >
              {pct}%
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {sections.map((section, i) => {
        const value = sectionScores[section.id] ?? section.min;
        const pct = Math.min(
          100,
          Math.max(
            0,
            ((value - section.min) / (section.max - section.min)) * 100,
          ),
        );
        const barHeight = (pct / 100) * chartHeight;
        const x = paddingLeft + i * (barWidth + gap);
        const y = paddingTop + chartHeight - barHeight;
        const bandEquivalent = section.bandFromRaw
          ? section.bandFromRaw(value)
          : null;

        return (
          <g key={section.id}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(barHeight, 2)}
              rx={6}
              fill={ORANGE}
            />
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={NAVY}
            >
              {bandEquivalent !== null ? `${value} → ${bandEquivalent}` : value}
            </text>
            {wrapLabel(section.label).map((line, li) => (
              <text
                key={li}
                x={x + barWidth / 2}
                y={paddingTop + chartHeight + 16 + li * 12}
                textAnchor="middle"
                fontSize={10}
                fill="#64748b"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function wrapLabel(label: string): string[] {
  if (label.length <= 12) return [label];
  const words = label.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function BandGaugeChart({
  config,
  totalScore,
}: {
  config: ExamConfig;
  totalScore: number;
}) {
  const width = 600;
  const height = 150;
  const paddingLeft = 20;
  const paddingRight = 20;
  const barY = 46;
  const barHeight = 28;
  const trackWidth = width - paddingLeft - paddingRight;

  const { min, max } = config.scoreRange;
  const bands = config.percentileBands;
  const boundaries = [...bands.map((b) => b.threshold), max];

  const activeIndex = (() => {
    let idx = 0;
    bands.forEach((b, i) => {
      if (totalScore >= b.threshold) idx = i;
    });
    return idx;
  })();

  const pointerX =
    paddingLeft + ((totalScore - min) / (max - min)) * trackWidth;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-5 w-full"
      role="img"
      aria-label="Total score band gauge"
    >
      {/* Band segments */}
      {bands.map((band, i) => {
        const segStart = boundaries[i];
        const segEnd = boundaries[i + 1];
        const segX =
          paddingLeft + ((segStart - min) / (max - min)) * trackWidth;
        const segWidth = ((segEnd - segStart) / (max - min)) * trackWidth;
        const segPct = (segWidth / trackWidth) * 100;
        const isActive = i === activeIndex;

        return (
          <g key={band.label}>
            <rect
              x={segX}
              y={barY}
              width={Math.max(segWidth, 1)}
              height={barHeight}
              fill={BAND_COLORS[i % BAND_COLORS.length]}
              stroke={isActive ? NAVY : "transparent"}
              strokeWidth={isActive ? 2 : 0}
              rx={4}
            />
            {segPct > 9 && (
              <text
                x={segX + segWidth / 2}
                y={barY + barHeight + 16}
                textAnchor="middle"
                fontSize={9}
                fontWeight={isActive ? 700 : 400}
                fill={isActive ? NAVY : "#94a3b8"}
              >
                {band.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Range end labels */}
      <text
        x={paddingLeft}
        y={barY - 10}
        textAnchor="start"
        fontSize={9}
        fill="#94a3b8"
      >
        {min}
      </text>
      <text
        x={width - paddingRight}
        y={barY - 10}
        textAnchor="end"
        fontSize={9}
        fill="#94a3b8"
      >
        {max}
      </text>

      {/* Pointer marking the current total score */}
      <line
        x1={pointerX}
        x2={pointerX}
        y1={barY - 8}
        y2={barY + barHeight + 8}
        stroke={NAVY}
        strokeWidth={2}
      />
      <polygon
        points={`${pointerX - 6},${barY - 8} ${pointerX + 6},${barY - 8} ${pointerX},${barY - 18}`}
        fill={NAVY}
      />
      <text
        x={pointerX}
        y={barY - 22}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={NAVY}
      >
        {Number.isInteger(totalScore) ? totalScore : totalScore.toFixed(1)}
      </text>
    </svg>
  );
}

function WhySection() {
  return (
    <section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
            More Than A Number
          </div>
          <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl text-[#0b1e3f]">
            Your Score Doesn't Stop Here — <br /> Practice For Real
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#0b1e3f]/80">
            Your exam score is only one part of your graduate school journey.
            Use your results to identify weaknesses, improve your preparation,
            and build a stronger application strategy.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Identify your strongest and weakest sections",
              "Track progress across multiple practice tests",
              "Understand where your score stands",
              "Build a smarter graduate school shortlist",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-xm text-[#0b1e3f]/90"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <button
            className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white"
            style={{ background: ORANGE }}
          >
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
            <div
              key={label}
              className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5"
            >
              <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
              <p className="mt-1 text-[10px] text-[#0b1e3f]/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="OUR DIFFERENCE"
          title="How Ooshas Prep's Calculator Is Different"
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
              <div className="p-3 font-semibold text-slate-700">{item}</div>
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
      text: "Compare your score against program ranges.",
    },
    {
      icon: Trophy,
      title: "Build Your Profile",
      text: "Use your score as part of your larger application plan.",
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
          description="Your result can tell you much more when combined with the right context."
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

function QuestionsSection() {
  return (
    <section className="bg-[#fcf3ed] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="COMMUNITY"
          title="Student Questions & Comments"
          description="Have a question about your score? Ask our team and community."
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
          title="Score Calculator — Frequently Asked Questions"
          description="Everything you need to know about our score calculator."
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
                  onClick={() => setExpandedFAQ(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-xm font-bold">{faq.question}</span>
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
          background: "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)",
        }}
      >
        <h2 className="text-xl font-black text-white sm:text-2xl">
          Your Dream Grad School Is One Score Away
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xm leading-5 text-white/80">
          Understand your current performance and take the next step toward your
          graduate school goals.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <a
            href="#calculator"
            className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white"
          >
            Calculate My Score
          </a>
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
      {/* <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${dark ? "bg-orange-400/10 text-orange-300" : "bg-orange-50 text-orange-500"}`}>
        {eyebrow}
      </span> */}
      <h2
        className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
      >
        {description}
      </p>
    </div>
  );
}











// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   ArrowRight,
//   Check,
//   ChevronDown,
//   ChevronUp,
//   Clock3,
//   GraduationCap,
//   Info,
//   MapPin,
//   Search,
//   Sparkles,
//   Star,
//   Target,
//   TrendingUp,
//   Trophy,
//   Users,
// } from "lucide-react";

// const ORANGE = "#ff7a2a";
// const NAVY = "#0b1e3f";
// // Ascending band color ramp, light -> deep orange, used on the gauge chart.
// const BAND_COLORS = ["#ffe8d9", "#ffd0ad", "#ffb37a", "#ff9550", "#ff7a2a"];

// type FAQ = {
//   question: string;
//   answer: string;
// };

// type ExamType = "GRE" | "GMAT" | "SAT" | "TOEFL" | "IELTS" | "PTE";

// type ExamSection = {
//   id: string;
//   label: string;
//   min: number;
//   max: number;
//   step?: number; // increment allowed for this section, defaults to 1
// };

// type PercentileBand = {
//   // Lowest total score (inclusive) that qualifies for this band.
//   threshold: number;
//   label: string;
// };

// type ExamConfig = {
//   label: string;
//   sections: ExamSection[];
//   scoreRange: { min: number; max: number };
//   // Ascending list of bands, e.g. [{threshold: 260, label: "65+"}, ...].
//   // Single source of truth for both the percentile lookup and the gauge chart.
//   percentileBands: PercentileBand[];
//   totalLabel: string;
//   // Converts raw section inputs into a real total score for this exam.
//   // This is exam-specific because not every exam's total is a simple sum
//   // (e.g. IELTS/PTE are averages, GMAT total isn't a linear sum of subsections).
//   computeTotal: (scores: Record<string, number>) => number;
// };

// // Rounds to the nearest multiple of `step` (e.g. step=0.5 -> nearest half point)
// function roundToStep(value: number, step: number) {
//   return Math.round(value / step) * step;
// }

// // Official IELTS rounding: overall band is the average of 4 sections, rounded
// // to the nearest whole or half band (.25 rounds up to .5, .75 rounds up to
// // the next whole band).
// function roundIELTSBand(avg: number) {
//   const whole = Math.floor(avg);
//   const remainder = avg - whole;
//   if (remainder < 0.25) return whole;
//   if (remainder < 0.75) return whole + 0.5;
//   return whole + 1;
// }

// function defaultSectionValue(section: ExamSection) {
//   const step = section.step || 1;
//   const raw = section.min + (section.max - section.min) * 0.75;
//   return roundToStep(raw, step);
// }

// // Finds the highest band whose threshold is <= score.
// function getPercentileLabel(score: number, bands: PercentileBand[]) {
//   let label = bands[0]?.label ?? "";
//   for (const band of bands) {
//     if (score >= band.threshold) label = band.label;
//   }
//   return label;
// }

// const examConfigs: Record<ExamType, ExamConfig> = {
//   GRE: {
//     label: "GRE",
//     // Real GRE section scores are scaled 130-170, not raw 0-40 counts.
//     sections: [
//       { id: "verbal", label: "Verbal Reasoning", min: 130, max: 170 },
//       { id: "quant", label: "Quantitative Reasoning", min: 130, max: 170 },
//     ],
//     scoreRange: { min: 260, max: 340 },
//     percentileBands: [
//       { threshold: 260, label: "65th" },
//       { threshold: 310, label: "75th" },
//       { threshold: 315, label: "85th" },
//       { threshold: 320, label: "90th" },
//       { threshold: 325, label: "95th" },
//       { threshold: 330, label: "98th" },
//     ],
//     totalLabel: "/340",
//     // GRE total is simply verbal + quant.
//     computeTotal: (scores) => (scores.verbal ?? 130) + (scores.quant ?? 130),
//   },
//   GMAT: {
//     label: "GMAT",
//     // GMAT Focus Edition subsections are scaled 60-90 each.
//     sections: [
//       { id: "quant", label: "Quantitative", min: 60, max: 90 },
//       { id: "verbal", label: "Verbal", min: 60, max: 90 },
//       { id: "di", label: "Data Insights", min: 60, max: 90 },
//     ],
//     scoreRange: { min: 205, max: 805 },
//     percentileBands: [
//       { threshold: 205, label: "40th" },
//       { threshold: 600, label: "55th" },
//       { threshold: 650, label: "75th" },
//       { threshold: 700, label: "90th" },
//       { threshold: 750, label: "99th" },
//     ],
//     totalLabel: "/805",
//     // The official GMAT total isn't a direct sum of subsection scores (GMAC
//     // uses a proprietary conversion). We approximate it by scaling the
//     // average subsection performance (60-90) into the 205-805 total range,
//     // then rounding to the nearest 10, matching how GMAT totals are reported.
//     computeTotal: (scores) => {
//       const q = scores.quant ?? 60;
//       const v = scores.verbal ?? 60;
//       const di = scores.di ?? 60;
//       const avg = (q + v + di) / 3;
//       const raw = 205 + ((avg - 60) / (90 - 60)) * (805 - 205);
//       return roundToStep(raw, 10);
//     },
//   },
//   SAT: {
//     label: "SAT",
//     // Real SAT section scores are scaled 200-800 each.
//     sections: [
//       { id: "rw", label: "Reading & Writing", min: 200, max: 800 },
//       { id: "math", label: "Math", min: 200, max: 800 },
//     ],
//     scoreRange: { min: 400, max: 1600 },
//     percentileBands: [
//       { threshold: 400, label: "50th" },
//       { threshold: 1200, label: "75th" },
//       { threshold: 1300, label: "87th" },
//       { threshold: 1400, label: "94th" },
//       { threshold: 1500, label: "98th" },
//     ],
//     totalLabel: "/1600",
//     // SAT total is the sum of both section scores.
//     computeTotal: (scores) => (scores.rw ?? 200) + (scores.math ?? 200),
//   },
//   TOEFL: {
//     label: "TOEFL iBT",
//     sections: [
//       { id: "reading", label: "Reading", min: 0, max: 30 },
//       { id: "listening", label: "Listening", min: 0, max: 30 },
//       { id: "speaking", label: "Speaking", min: 0, max: 30 },
//       { id: "writing", label: "Writing", min: 0, max: 30 },
//     ],
//     scoreRange: { min: 0, max: 120 },
//     percentileBands: [
//       { threshold: 0, label: "40th" },
//       { threshold: 90, label: "60th" },
//       { threshold: 100, label: "80th" },
//       { threshold: 110, label: "90th" },
//       { threshold: 115, label: "95th" },
//     ],
//     totalLabel: "/120",
//     // TOEFL total is the sum of all four section scores.
//     computeTotal: (scores) =>
//       (scores.reading ?? 0) +
//       (scores.listening ?? 0) +
//       (scores.speaking ?? 0) +
//       (scores.writing ?? 0),
//   },
//   IELTS: {
//     label: "IELTS",
//     // IELTS bands are scored in 0.5 increments.
//     sections: [
//       { id: "listening", label: "Listening", min: 0, max: 9, step: 0.5 },
//       { id: "reading", label: "Reading", min: 0, max: 9, step: 0.5 },
//       { id: "writing", label: "Writing", min: 0, max: 9, step: 0.5 },
//       { id: "speaking", label: "Speaking", min: 0, max: 9, step: 0.5 },
//     ],
//     scoreRange: { min: 0, max: 9 },
//     percentileBands: [
//       { threshold: 0, label: "60th" },
//       { threshold: 7, label: "75th" },
//       { threshold: 7.5, label: "88th" },
//       { threshold: 8, label: "95th" },
//       { threshold: 8.5, label: "98th" },
//     ],
//     totalLabel: "/9",
//     // IELTS overall band is the AVERAGE of the four sections, rounded using
//     // the official half/whole band rounding rule — not a sum of the four.
//     computeTotal: (scores) => {
//       const avg =
//         ((scores.listening ?? 0) +
//           (scores.reading ?? 0) +
//           (scores.writing ?? 0) +
//           (scores.speaking ?? 0)) /
//         4;
//       return roundIELTSBand(avg);
//     },
//   },
//   PTE: {
//     label: "PTE Academic",
//     // Each PTE communicative skill is scored 10-90.
//     sections: [
//       { id: "speaking", label: "Speaking & Writing", min: 10, max: 90 },
//       { id: "reading", label: "Reading", min: 10, max: 90 },
//       { id: "listening", label: "Listening", min: 10, max: 90 },
//     ],
//     scoreRange: { min: 10, max: 90 },
//     percentileBands: [
//       { threshold: 10, label: "45th" },
//       { threshold: 65, label: "60th" },
//       { threshold: 72, label: "75th" },
//       { threshold: 79, label: "88th" },
//       { threshold: 85, label: "95th" },
//     ],
//     totalLabel: "/90",
//     // PTE's overall score is closely approximated by the average of the
//     // three communicative skill scores, not their sum.
//     computeTotal: (scores) => {
//       const avg =
//         ((scores.speaking ?? 10) + (scores.reading ?? 10) + (scores.listening ?? 10)) / 3;
//       return Math.round(avg);
//     },
//   },
// };

// export default function ScoreCalculatorPage() {
//   const [selectedExam, setSelectedExam] = useState<ExamType>("GRE");
//   const [sectionScores, setSectionScores] = useState<Record<string, number>>({});
//   const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

//   const config = examConfigs[selectedExam];

//   // Initialize scores for the selected exam using each section's real min/max/step.
//   React.useEffect(() => {
//     const initial: Record<string, number> = {};
//     config.sections.forEach((s) => {
//       initial[s.id] = defaultSectionValue(s);
//     });
//     setSectionScores(initial);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedExam]);

//   const totalScore = useMemo(() => {
//     const computed = config.computeTotal(sectionScores);
//     // Safety clamp in case of rounding at the edges of the scale.
//     return Math.min(config.scoreRange.max, Math.max(config.scoreRange.min, computed));
//   }, [sectionScores, config]);

//   const percentile = useMemo(() => {
//     return getPercentileLabel(totalScore, config.percentileBands);
//   }, [totalScore, config]);

//   const handleScoreChange = (sectionId: string, value: number) => {
//     const section = config.sections.find((s) => s.id === sectionId);
//     if (!section) return;
//     const step = section.step || 1;
//     const snapped = roundToStep(value, step);
//     const clamped = Math.min(section.max, Math.max(section.min, snapped));
//     setSectionScores((prev) => ({ ...prev, [sectionId]: clamped }));
//   };

//   const displayTotal = Number.isInteger(totalScore) ? totalScore : totalScore.toFixed(1);

//   return (
//     <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">
//       <Hero />

//       {/* Exam Selector */}
//       <div className="mx-auto max-w-6xl px-4 pb-4 pt-8">
//         <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
//           {(Object.keys(examConfigs) as ExamType[]).map((exam) => (
//             <button
//               key={exam}
//               onClick={() => setSelectedExam(exam)}
//               className={`rounded-lg px-5 py-2.5 text-sm font-bold transition ${
//                 selectedExam === exam
//                   ? "bg-[#0b1e3f] text-white"
//                   : "bg-slate-50 text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               {examConfigs[exam].label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <ScoreSection
//         examType={selectedExam}
//         config={config}
//         sectionScores={sectionScores}
//         onScoreChange={handleScoreChange}
//         totalScore={totalScore}
//         displayTotal={displayTotal}
//         percentile={percentile}
//       />

//       <ScoreVisualizationSection
//         config={config}
//         sectionScores={sectionScores}
//         totalScore={totalScore}
//         percentile={percentile}
//       />

//       <WhySection />
//       <DifferenceSection />
//       <BeyondNumberSection />
//       <QuestionsSection />
//       <FAQSection expandedFAQ={expandedFAQ} setExpandedFAQ={setExpandedFAQ} />
//       <BottomCTA />
//     </main>
//   );
// }

// function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-[#fcf3ed]">
//       <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
//         <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
//           Free{" "}
//           <span style={{ color: ORANGE }}>
//             Exam Score Calculator
//           </span>{" "}
//           & Grad School Predictor
//         </h1>
//         <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 sm:text-base">
//           Estimate your GRE, GMAT, SAT, TOEFL, IELTS, or PTE score, understand
//           your percentile, and discover programs that match your performance.
//         </p>
//         <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
//           <a
//             href="#calculator"
//             className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
//             style={{ background: ORANGE }}
//           >
//             Calculate My Score
//             <ArrowRight className="h-4 w-4" />
//           </a>
//           <a
//             href="#programs"
//             className="inline-flex items-center justify-center rounded-lg border border-black px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
//           >
//             Explore Programs
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ScoreSection({
//   examType,
//   config,
//   sectionScores,
//   onScoreChange,
//   totalScore,
//   displayTotal,
//   percentile,
// }: {
//   examType: ExamType;
//   config: ExamConfig;
//   sectionScores: Record<string, number>;
//   onScoreChange: (id: string, value: number) => void;
//   totalScore: number;
//   displayTotal: string | number;
//   percentile: string;
// }) {
//   return (
//     <section id="calculator" className="px-4 pb-16">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow={`${config.label} SCORE CALCULATOR`}
//           title={`Convert Your Raw Score Into Your Real ${config.label} Score`}
//           description={`Enter your practice performance and understand how your current results translate into an estimated ${config.label} score.`}
//         />

//         <div className="mt-9 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:grid-cols-[1fr_360px]">
//           <div className="p-5 sm:p-7">
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm font-extrabold">
//                   Enter Your Practice Test Results
//                 </h3>
//                 <p className="mt-1 text-[14px] text-slate-500">
//                   Use your latest mock test for the best estimate.
//                 </p>
//               </div>
//               <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-500">
//                 LIVE
//               </span>
//             </div>

//             {config.sections.map((section) => {
//               const value = sectionScores[section.id] ?? section.min;
//               const percentage = Math.round(
//                 ((value - section.min) / (section.max - section.min)) * 100
//               );
//               const step = section.step || 1;
//               return (
//                 <div key={section.id} className="mb-4 rounded-xl border border-slate-200 p-4">
//                   <div className="mb-3 flex items-center justify-between">
//                     <span className="text-xm font-bold">{section.label}</span>
//                     <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
//                       {value}
//                       <span className="text-slate-400"> / {section.max}</span>
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="range"
//                       min={section.min}
//                       max={section.max}
//                       step={step}
//                       value={value}
//                       onChange={(e) =>
//                         onScoreChange(section.id, Number(e.target.value))
//                       }
//                       className="flex-1 accent-orange-500"
//                     />
//                     <input
//                       type="number"
//                       min={section.min}
//                       max={section.max}
//                       step={step}
//                       value={value}
//                       onChange={(e) =>
//                         onScoreChange(section.id, Number(e.target.value))
//                       }
//                       className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-center text-sm font-bold outline-none focus:border-orange-400"
//                     />
//                   </div>
//                   <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
//                     <div
//                       className="h-full rounded-full transition-all"
//                       style={{
//                         width: `${Math.min(Math.max(percentage, 0), 100)}%`,
//                         background: ORANGE,
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}

//             <button
//               className="mt-5 w-full rounded-lg py-3 text-xm font-bold text-white"
//               style={{ background: ORANGE }}
//             >
//               Calculate My Score
//             </button>
//           </div>

//           <div className="relative flex flex-col justify-center bg-[#0b1e3f] p-7 text-white">
//             <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
//             <div className="relative">
//               <p className="text-center text-[10px] font-medium uppercase tracking-widest text-blue-200/60">
//                 Your Estimated {config.label} Score
//               </p>
//               <div className="mt-4 text-center">
//                 <span className="text-6xl font-black tracking-tight">
//                   {displayTotal}
//                 </span>
//                 <span className="ml-1 text-sm font-semibold text-white/50">
//                   {config.totalLabel}
//                 </span>
//               </div>
//               <div className="mt-3 text-center">
//                 <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
//                   {percentile} Percentile
//                 </span>
//               </div>

//               <div className="mt-8 space-y-4">
//                 {config.sections.map((section) => {
//                   const val = sectionScores[section.id] ?? section.min;
//                   const pct = Math.round(
//                     ((val - section.min) / (section.max - section.min)) * 100
//                   );
//                   return (
//                     <ScoreMeter key={section.id} label={section.label} value={pct} />
//                   );
//                 })}
//                 <ScoreMeter
//                   label="Overall Performance"
//                   value={Math.round(
//                     ((totalScore - config.scoreRange.min) /
//                       (config.scoreRange.max - config.scoreRange.min)) *
//                       100
//                   )}
//                 />
//               </div>

//               <div className="mt-8 border-t border-white/10 pt-5 text-center">
//                 <p className="text-[10px] leading-5 text-blue-100/60">
//                   Your estimated score is a planning benchmark and should not
//                   be considered an official result.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ScoreMeter({ label, value }: { label: string; value: number }) {
//   const clamped = Math.min(Math.max(value, 0), 100);
//   return (
//     <div>
//       <div className="mb-2 flex justify-between text-[10px]">
//         <span className="text-white/70">{label}</span>
//         <span className="font-bold text-white">{Math.round(clamped)}%</span>
//       </div>
//       <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
//         <div
//           className="h-full rounded-full bg-orange-400 transition-all"
//           style={{ width: `${clamped}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Score visualization: a bar chart comparing section scores, and a band/
// // percentile gauge showing where the total score falls on the exam's scale.
// // ---------------------------------------------------------------------------

// function ScoreVisualizationSection({
//   config,
//   sectionScores,
//   totalScore,
//   percentile,
// }: {
//   config: ExamConfig;
//   sectionScores: Record<string, number>;
//   totalScore: number;
//   percentile: string;
// }) {
//   return (
//     <section className="px-4 pb-20">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="SCORE BREAKDOWN"
//           title="See Your Score & Band, Visually"
//           description="A section-by-section chart of your practice scores, plus where your total score falls on the official band scale."
//         />
//         <div className="mt-9 grid gap-5 lg:grid-cols-2">
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <h3 className="text-sm font-extrabold">Section Score Chart</h3>
//             <p className="mt-1 text-[14px] text-slate-500">
//               Each bar shows how your entered score compares to that section's full range.
//             </p>
//             <SectionBarChart config={config} sectionScores={sectionScores} />
//           </div>
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <h3 className="text-sm font-extrabold">Total Score & Band Position</h3>
//             <p className="mt-1 text-[14px] text-slate-500">
//               Your {config.label} total of {Number.isInteger(totalScore) ? totalScore : totalScore.toFixed(1)}
//               {" "}sits in the <span className="font-bold text-orange-500">{percentile} percentile</span> band.
//             </p>
//             <BandGaugeChart config={config} totalScore={totalScore} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SectionBarChart({
//   config,
//   sectionScores,
// }: {
//   config: ExamConfig;
//   sectionScores: Record<string, number>;
// }) {
//   const width = 600;
//   const height = 260;
//   const paddingLeft = 40;
//   const paddingRight = 20;
//   const paddingTop = 30;
//   const paddingBottom = 56;
//   const chartWidth = width - paddingLeft - paddingRight;
//   const chartHeight = height - paddingTop - paddingBottom;

//   const sections = config.sections;
//   const gap = 24;
//   const barWidth = (chartWidth - gap * (sections.length - 1)) / sections.length;

//   const gridLines = [0, 25, 50, 75, 100];

//   return (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       className="mt-5 w-full"
//       role="img"
//       aria-label="Section score chart"
//     >
//       {/* Y-axis grid lines */}
//       {gridLines.map((pct) => {
//         const y = paddingTop + chartHeight - (pct / 100) * chartHeight;
//         return (
//           <g key={pct}>
//             <line
//               x1={paddingLeft}
//               x2={width - paddingRight}
//               y1={y}
//               y2={y}
//               stroke="#e2e8f0"
//               strokeWidth={1}
//             />
//             <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">
//               {pct}%
//             </text>
//           </g>
//         );
//       })}

//       {/* Bars */}
//       {sections.map((section, i) => {
//         const value = sectionScores[section.id] ?? section.min;
//         const pct = Math.min(
//           100,
//           Math.max(0, ((value - section.min) / (section.max - section.min)) * 100)
//         );
//         const barHeight = (pct / 100) * chartHeight;
//         const x = paddingLeft + i * (barWidth + gap);
//         const y = paddingTop + chartHeight - barHeight;

//         return (
//           <g key={section.id}>
//             <rect
//               x={x}
//               y={y}
//               width={barWidth}
//               height={Math.max(barHeight, 2)}
//               rx={6}
//               fill={ORANGE}
//             />
//             <text
//               x={x + barWidth / 2}
//               y={y - 8}
//               textAnchor="middle"
//               fontSize={11}
//               fontWeight={700}
//               fill={NAVY}
//             >
//               {value}
//             </text>
//             {wrapLabel(section.label).map((line, li) => (
//               <text
//                 key={li}
//                 x={x + barWidth / 2}
//                 y={paddingTop + chartHeight + 16 + li * 12}
//                 textAnchor="middle"
//                 fontSize={10}
//                 fill="#64748b"
//               >
//                 {line}
//               </text>
//             ))}
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// // Splits a section label onto up to two lines so it fits under a narrow bar.
// function wrapLabel(label: string): string[] {
//   if (label.length <= 12) return [label];
//   const words = label.split(" ");
//   const mid = Math.ceil(words.length / 2);
//   return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
// }

// function BandGaugeChart({
//   config,
//   totalScore,
// }: {
//   config: ExamConfig;
//   totalScore: number;
// }) {
//   const width = 600;
//   const height = 150;
//   const paddingLeft = 20;
//   const paddingRight = 20;
//   const barY = 46;
//   const barHeight = 28;
//   const trackWidth = width - paddingLeft - paddingRight;

//   const { min, max } = config.scoreRange;
//   const bands = config.percentileBands;
//   const boundaries = [...bands.map((b) => b.threshold), max];

//   const activeIndex = (() => {
//     let idx = 0;
//     bands.forEach((b, i) => {
//       if (totalScore >= b.threshold) idx = i;
//     });
//     return idx;
//   })();

//   const pointerX =
//     paddingLeft + ((totalScore - min) / (max - min)) * trackWidth;

//   return (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       className="mt-5 w-full"
//       role="img"
//       aria-label="Total score band gauge"
//     >
//       {/* Band segments */}
//       {bands.map((band, i) => {
//         const segStart = boundaries[i];
//         const segEnd = boundaries[i + 1];
//         const segX = paddingLeft + ((segStart - min) / (max - min)) * trackWidth;
//         const segWidth = ((segEnd - segStart) / (max - min)) * trackWidth;
//         const segPct = (segWidth / trackWidth) * 100;
//         const isActive = i === activeIndex;

//         return (
//           <g key={band.label}>
//             <rect
//               x={segX}
//               y={barY}
//               width={Math.max(segWidth, 1)}
//               height={barHeight}
//               fill={BAND_COLORS[i % BAND_COLORS.length]}
//               stroke={isActive ? NAVY : "transparent"}
//               strokeWidth={isActive ? 2 : 0}
//               rx={4}
//             />
//             {segPct > 9 && (
//               <text
//                 x={segX + segWidth / 2}
//                 y={barY + barHeight + 16}
//                 textAnchor="middle"
//                 fontSize={9}
//                 fontWeight={isActive ? 700 : 400}
//                 fill={isActive ? NAVY : "#94a3b8"}
//               >
//                 {band.label}
//               </text>
//             )}
//           </g>
//         );
//       })}

//       {/* Range end labels */}
//       <text x={paddingLeft} y={barY - 10} textAnchor="start" fontSize={9} fill="#94a3b8">
//         {min}
//       </text>
//       <text x={width - paddingRight} y={barY - 10} textAnchor="end" fontSize={9} fill="#94a3b8">
//         {max}
//       </text>

//       {/* Pointer marking the current total score */}
//       <line
//         x1={pointerX}
//         x2={pointerX}
//         y1={barY - 8}
//         y2={barY + barHeight + 8}
//         stroke={NAVY}
//         strokeWidth={2}
//       />
//       <polygon
//         points={`${pointerX - 6},${barY - 8} ${pointerX + 6},${barY - 8} ${pointerX},${barY - 18}`}
//         fill={NAVY}
//       />
//       <text
//         x={pointerX}
//         y={barY - 22}
//         textAnchor="middle"
//         fontSize={11}
//         fontWeight={700}
//         fill={NAVY}
//       >
//         {Number.isInteger(totalScore) ? totalScore : totalScore.toFixed(1)}
//       </text>
//     </svg>
//   );
// }

// function WhySection() {
//   return (
//     <section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
//       <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
//         <div>
//           <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
//             More Than A Number
//           </div>
//           <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl text-[#0b1e3f]">
//             Your Score Doesn't Stop Here — <br /> Practice For Real
//           </h2>
//           <p className="mt-5 max-w-xl text-sm leading-6 text-[#0b1e3f]/80">
//             Your exam score is only one part of your graduate school journey. Use your results to identify weaknesses, improve your preparation, and build a stronger application strategy.
//           </p>
//           <ul className="mt-6 space-y-3">
//             {[
//               "Identify your strongest and weakest sections",
//               "Track progress across multiple practice tests",
//               "Understand where your score stands",
//               "Build a smarter graduate school shortlist",
//             ].map((item) => (
//               <li key={item} className="flex items-center gap-3 text-xm text-[#0b1e3f]/90">
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
//                   <Check className="h-3 w-3" />
//                 </span>
//                 {item}
//               </li>
//             ))}
//           </ul>
//           <button className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white" style={{ background: ORANGE }}>
//             Start Your Preparation
//           </button>
//         </div>
//         <div className="grid grid-cols-2 gap-3">
//           {[
//             ["2,000+", "Students Tested"],
//             ["10,000+", "Practice Results"],
//             ["42 pts", "Average Improvement"],
//             ["247", "Universities Explored"],
//           ].map(([number, label]) => (
//             <div key={label} className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5">
//               <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
//               <p className="mt-1 text-[10px] text-[#0b1e3f]/60">{label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function DifferenceSection() {
//   return (
//     <section id="how-it-works" className="bg-white px-4 py-12">
//       <div className="mx-auto max-w-5xl">
//         <SectionHeading
//           eyebrow="OUR DIFFERENCE"
//           title="How Ooshas Prep's Calculator Is Different"
//           description="A simple calculator designed to give you useful insights beyond just a single number."
//         />
//         <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
//           <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-[#0b1e3f] text-[10px] font-bold text-white">
//             <div className="p-3">Feature</div>
//             <div className="p-3 text-center">Ooshas Prep</div>
//             <div className="p-3 text-center">Basic Calculator</div>
//             <div className="p-3 text-center">Random Predictor</div>
//           </div>
//           {[
//             "Practice-based score estimate",
//             "Section-level insights",
//             "Grad program matching",
//             "Performance tracking",
//             "Study recommendations",
//             "Admission planning",
//           ].map((item, index) => (
//             <div
//               key={item}
//               className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-slate-200 text-[14px]"
//             >
//               <div className="p-3 font-semibold text-slate-700">{item}</div>
//               <div className="flex items-center justify-center bg-orange-50 p-3">
//                 <Check className="h-4 w-4 text-orange-500" />
//               </div>
//               <div className="flex items-center justify-center p-3">
//                 {index < 2 ? (
//                   <Check className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <span className="text-slate-300">×</span>
//                 )}
//               </div>
//               <div className="flex items-center justify-center p-3">
//                 {index === 2 ? (
//                   <Check className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <span className="text-slate-300">×</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BeyondNumberSection() {
//   const features = [
//     { icon: TrendingUp, title: "Track Your Progress", text: "Monitor score changes over multiple practice tests." },
//     { icon: Target, title: "Pinpoint Weak Areas", text: "Understand which section needs more preparation." },
//     { icon: GraduationCap, title: "Explore Universities", text: "Compare your score against program ranges." },
//     { icon: Trophy, title: "Build Your Profile", text: "Use your score as part of your larger application plan." },
//     { icon: MapPin, title: "Find Your Fit", text: "Discover programs that align with your goals." },
//     { icon: Sparkles, title: "Get Smarter Insights", text: "Turn raw practice results into actionable information." },
//   ];
//   return (
//     <section className="bg-[#fff] px-4 py-12">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="BEYOND THE NUMBER"
//           title="Go Beyond the Number — Understand Your Score"
//           description="Your result can tell you much more when combined with the right context."
//         />
//         <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map(({ icon: Icon, title, text }) => (
//             <div
//               key={title}
//               className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//             >
//               <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
//                 <Icon className="h-4 w-4" />
//               </div>
//               <h3 className="text-sm font-extrabold">{title}</h3>
//               <p className="mt-2 text-[14px] leading-5 text-slate-500">{text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function QuestionsSection() {
//   return (
//     <section className="bg-[#fcf3ed] px-4 py-12">
//       <div className="mx-auto max-w-3xl">
//         <SectionHeading
//           eyebrow="COMMUNITY"
//           title="Student Questions & Comments"
//           description="Have a question about your score? Ask our team and community."
//         />
//         <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <div className="grid gap-3 sm:grid-cols-2">
//             <input placeholder="Your name" className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400" />
//             <input placeholder="Email address" className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400" />
//           </div>
//           <textarea placeholder="Ask your question..." rows={4} className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400" />
//           <button className="mt-3 rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">Post Question</button>
//         </div>
//         <div className="mt-4 space-y-3">
//           {[
//             "How can I improve my Quant score?",
//             "Is a 320 GRE score competitive?",
//             "Which universities should I target?",
//           ].map((question, index) => (
//             <div key={question} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="flex gap-3">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1e3f] text-[10px] font-bold text-white">
//                   {index + 1}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-xm font-bold">{question}</p>
//                   <p className="mt-1 text-[10px] text-slate-400">Asked by GRE student</p>
//                 </div>
//                 <button className="text-[10px] font-bold text-orange-500">Answer</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function FAQSection({
//   expandedFAQ,
//   setExpandedFAQ,
// }: {
//   expandedFAQ: number | null;
//   setExpandedFAQ: (value: number | null) => void;
// }) {
//   const faqs: FAQ[] = [
//     { question: "How accurate is the score calculator?", answer: "The calculator provides an estimated score based on the practice section results you enter. It is designed to give you a useful benchmark before taking the official exam." },
//     { question: "What is a good score for graduate school?", answer: "A good score depends on your target university, program and applicant pool. Competitive programs may expect stronger scores." },
//     { question: "Does Ooshas Prep predict my admission chances?", answer: "The calculator provides a score-based indication of program competitiveness. Admission depends on many factors including academics, experience, essays, recommendations and the university." },
//     { question: "How frequently should I use this calculator?", answer: "Use it after practice tests or major preparation milestones to track your progress and understand how your score is improving." },
//     { question: "Can I use my calculator results for university planning?", answer: "Yes. Your estimated score can be used as an initial benchmark when researching universities and graduate programs." },
//   ];
//   return (
//     <section id="faq" className="bg-[#fff] px-4 pb-20">
//       <div className="mx-auto max-w-3xl">
//         <SectionHeading
//           eyebrow=""
//           title="Score Calculator — Frequently Asked Questions"
//           description="Everything you need to know about our score calculator."
//         />
//         <div className="mt-8 space-y-2">
//           {faqs.map((faq, index) => {
//             const open = expandedFAQ === index;
//             return (
//               <div key={faq.question} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
//                 <button onClick={() => setExpandedFAQ(open ? null : index)} className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left">
//                   <span className="text-xm font-bold">{faq.question}</span>
//                   {open ? <ChevronUp className="h-4 w-4 shrink-0 text-orange-500" /> : <ChevronDown className="h-4 w-4 shrink-0 text-orange-500" />}
//                 </button>
//                 {open && (
//                   <div className="border-t border-slate-100 px-4 pb-4 pt-3">
//                     <p className="text-[14px] leading-5 text-slate-500">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BottomCTA() {
//   return (
//     <section id="contact" className="bg-white px-4 pb-5">
//       <div className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10" style={{ background: "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)" }}>
//         <h2 className="text-xl font-black text-white sm:text-2xl">Your Dream Grad School Is One Score Away</h2>
//         <p className="mx-auto mt-2 max-w-xl text-xm leading-5 text-white/80">
//           Understand your current performance and take the next step toward your graduate school goals.
//         </p>
//         <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
//           <button className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">Calculate My Score</button>
//           <button className="rounded-lg bg-white px-5 py-3 text-xm font-bold text-[#0b1e3f]">Talk To An Expert</button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SectionHeading({
//   eyebrow,
//   title,
//   description,
//   dark = false,
// }: {
//   eyebrow: string;
//   title: string;
//   description: string;
//   dark?: boolean;
// }) {
//   return (
//     <div className="mx-auto max-w-2xl text-center">
//       <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${dark ? "bg-orange-400/10 text-orange-300" : "bg-orange-50 text-orange-500"}`}>
//         {eyebrow}
//       </span>
//       <h2 className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}>{title}</h2>
//       <p className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}>{description}</p>
//     </div>
//   );
// }

// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   ArrowRight,
//   Check,
//   ChevronDown,
//   ChevronUp,
//   Clock3,
//   GraduationCap,
//   Info,
//   MapPin,
//   Search,
//   Sparkles,
//   Star,
//   Target,
//   TrendingUp,
//   Trophy,
//   Users,
// } from "lucide-react";

// const ORANGE = "#ff7a2a";

// type FAQ = {
//   question: string;
//   answer: string;
// };

// type PracticeProps = {
//   verbalCorrect: number;
//   verbalTotal: number;
//   quantCorrect: number;
//   quantTotal: number;
//   setVerbalCorrect: (value: number) => void;
//   setVerbalTotal: (value: number) => void;
//   setQuantCorrect: (value: number) => void;
//   setQuantTotal: (value: number) => void;
// };

// const faqs: FAQ[] = [
//   {
//     question: "How accurate is the GRE score calculator?",
//     answer:
//       "The calculator provides an estimated GRE score based on the practice section results you enter. It is designed to give you a useful benchmark before taking the official GRE.",
//   },
//   {
//     question: "What is a good GRE score for graduate school?",
//     answer:
//       "A good GRE score depends on your target university, program and applicant pool. Competitive programs may expect stronger Quantitative and Verbal scores.",
//   },
//   {
//     question: "Does Ooshas Prep predict my admission chances?",
//     answer:
//       "The calculator provides a score-based indication of program competitiveness. Admission depends on many factors including academics, experience, essays, recommendations and the university.",
//   },
//   {
//     question: "How frequently should I use this calculator?",
//     answer:
//       "Use it after practice tests or major preparation milestones to track your progress and understand how your score is improving.",
//   },
//   {
//     question: "Can I use my calculator results for university planning?",
//     answer:
//       "Yes. Your estimated score can be used as an initial benchmark when researching universities and graduate programs.",
//   },
// ];

// export default function GREScoreCalculatorPage() {
//   const [verbalCorrect, setVerbalCorrect] = useState(34);
//   const [verbalTotal, setVerbalTotal] = useState(40);
//   const [quantCorrect, setQuantCorrect] = useState(36);
//   const [quantTotal, setQuantTotal] = useState(40);
//   const [difficulty, setDifficulty] = useState(75);
//   const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

//   const score = useMemo(() => {
//     const verbalPercentage =
//       verbalTotal > 0 ? verbalCorrect / verbalTotal : 0;

//     const quantPercentage = quantTotal > 0 ? quantCorrect / quantTotal : 0;

//     const verbalScore = Math.round(130 + verbalPercentage * 40);
//     const quantScore = Math.round(130 + quantPercentage * 40);

//     return Math.min(340, verbalScore + quantScore);
//   }, [verbalCorrect, verbalTotal, quantCorrect, quantTotal]);

//   const percentile = useMemo(() => {
//     if (score >= 330) return "98+";
//     if (score >= 325) return "95+";
//     if (score >= 320) return "90+";
//     if (score >= 315) return "85+";
//     if (score >= 310) return "75+";
//     return "65+";
//   }, [score]);

//   return (
//     <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">
//       <Hero />

//       <ScoreSection
//         type={'gre'}
//         score={score}
//         percentile={percentile}
//         difficulty={difficulty}
//         setDifficulty={setDifficulty}
//         verbalCorrect={verbalCorrect}
//         verbalTotal={verbalTotal}
//         quantCorrect={quantCorrect}
//         quantTotal={quantTotal}
//       />

//       <WhySection />

//       <DifferenceSection />

//       <BeyondNumberSection />

//       <QuestionsSection />

//       <FAQSection
//         expandedFAQ={expandedFAQ}
//         setExpandedFAQ={setExpandedFAQ}
//       />

//       <BottomCTA />
//     </main>
//   );
// }

// function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-[#fcf3ed]">
//       {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(40,78,140,.35),transparent_55%)]" /> */}

//       <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
//         {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-1
//         text-[10px] font-bold uppercase tracking-wider text-orange-300">
//           <Sparkles className="h-3 w-3" />
//           Free GRE Tool
//         </div> */}

//         <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight  sm:text-4xl lg:text-5xl">
//           Free{" "}
//           <span style={{ color: ORANGE }}>
//             GRE Score Calculator
//           </span>{" "}
//           & Grad School Predictor
//         </h1>

//         <p className="mx-auto mt-5 max-w-2xl text-sm leading-6  sm:text-base">
//           Estimate your GRE score, understand your percentile, and discover
//           graduate programs that match your current performance.
//         </p>

//         <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
//           <a
//             href="#calculator"
//             className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
//             style={{ background: ORANGE }}
//           >
//             Calculate My GRE Score
//             <ArrowRight className="h-4 w-4" />
//           </a>

//           <a
//             href="#programs"
//             className="inline-flex items-center justify-center rounded-lg border border-black  px-6 py-3 text-sm font-semibold
//              transition hover:bg-white/10"
//           >
//             Explore Programs
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ScoreSection({
//   score,
//   percentile,
//   difficulty,
//   setDifficulty,
//   verbalCorrect,
//   verbalTotal,
//   quantCorrect,
//   quantTotal,
// }: {
//   score: number;
//   percentile: string;
//   difficulty: number;
//   setDifficulty: (value: number) => void;
//   verbalCorrect: number;
//   verbalTotal: number;
//   quantCorrect: number;
//   quantTotal: number;
// }) {
//   return (
//     <section id="calculator" className="px-4 pb-20">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="GRE SCORE CALCULATOR"
//           title="Convert Your Raw Score Into Your Real GRE Score"
//           description="Enter your practice performance and understand how your current results translate into an estimated GRE score."
//         />

//         <div className="mt-9 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:grid-cols-[1fr_360px]">
//           <div className="p-5 sm:p-7">
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm font-extrabold">
//                   Enter Your Practice Test Results
//                 </h3>
//                 <p className="mt-1 text-[14px] text-slate-500">
//                   Use your latest mock test for the best estimate.
//                 </p>
//               </div>

//               <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-500">
//                 LIVE
//               </span>
//             </div>

//             <ResultRow
//               label="Verbal Reasoning"
//               value={`${verbalCorrect}/${verbalTotal}`}
//               percentage={
//                 verbalTotal
//                   ? Math.round((verbalCorrect / verbalTotal) * 100)
//                   : 0
//               }
//             />

//             <ResultRow
//               label="Quantitative Reasoning"
//               value={`${quantCorrect}/${quantTotal}`}
//               percentage={
//                 quantTotal
//                   ? Math.round((quantCorrect / quantTotal) * 100)
//                   : 0
//               }
//             />

//             <div className="mt-5 rounded-xl border border-slate-200 p-4">
//               <div className="mb-3 flex justify-between">
//                 <div>
//                   <p className="text-xm font-bold">Question Difficulty</p>
//                   <p className="mt-1 text-[10px] text-slate-400">
//                     How challenging was your practice test?
//                   </p>
//                 </div>

//                 <span className="text-xm font-bold text-orange-500">
//                   {difficulty}%
//                 </span>
//               </div>

//               <input
//                 type="range"
//                 min={0}
//                 max={100}
//                 value={difficulty}
//                 onChange={(e) => setDifficulty(Number(e.target.value))}
//                 className="w-full accent-orange-500"
//               />
//             </div>

//             <button
//               className="mt-5 w-full rounded-lg py-3 text-xm font-bold text-white"
//               style={{ background: ORANGE }}
//             >
//               Calculate My GRE Score
//             </button>
//           </div>

//           <div className="relative flex flex-col justify-center bg-[#0b1e3f] p-7 text-white">
//             <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

//             <div className="relative">
//               <p className="text-center text-[10px] font-medium uppercase tracking-widest text-blue-200/60">
//                 Your Estimated GRE Score
//               </p>

//               <div className="mt-4 text-center">
//                 <span className="text-6xl font-black tracking-tight">
//                   {score}
//                 </span>

//                 <span className="ml-1 text-sm font-semibold text-white/50">
//                   /340
//                 </span>
//               </div>

//               <div className="mt-3 text-center">
//                 <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
//                   {percentile} Percentile
//                 </span>
//               </div>

//               <div className="mt-8 space-y-4">
//                 <ScoreMeter label="Verbal Reasoning" value={verbalCorrect / Math.max(verbalTotal, 1) * 100} />
//                 <ScoreMeter label="Quantitative Reasoning" value={quantCorrect / Math.max(quantTotal, 1) * 100} />
//                 <ScoreMeter label="Overall Performance" value={Math.min((score / 340) * 100, 100)} />
//               </div>

//               <div className="mt-8 border-t border-white/10 pt-5 text-center">
//                 <p className="text-[10px] leading-5 text-blue-100/60">
//                   Your estimated score is a planning benchmark and should not
//                   be considered an official GRE result.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ResultRow({
//   label,
//   value,
//   percentage,
// }: {
//   label: string;
//   value: string;
//   percentage: number;
// }) {
//   return (
//     <div className="mb-4 rounded-xl border border-slate-200 p-4">
//       <div className="mb-3 flex items-center justify-between">
//         <span className="text-xm font-bold">{label}</span>

//         <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
//           {value}
//         </span>
//       </div>

//       <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//         <div
//           className="h-full rounded-full transition-all"
//           style={{
//             width: `${Math.min(percentage, 100)}%`,
//             background: ORANGE,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// function ScoreMeter({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div>
//       <div className="mb-2 flex justify-between text-[10px]">
//         <span className="text-white/70">{label}</span>
//         <span className="font-bold text-white">
//           {Math.round(value)}%
//         </span>
//       </div>

//       <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
//         <div
//           className="h-full rounded-full bg-orange-400 transition-all"
//           style={{ width: `${Math.min(value, 100)}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function WhySection() {
//   return (<section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
//   <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
//     <div>
//       <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
//         More Than A Number
//       </div>
//       <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl text-[#0b1e3f]">
//         Your Score Doesn't Stop Here — <br /> Practice For Real
//       </h2>
//       <p className="mt-5 max-w-xl text-sm leading-6 text-[#0b1e3f]/80">
//         Your GRE score is only one part of your graduate school journey. Use your results to identify weaknesses, improve your preparation, and build a stronger application strategy.
//       </p>
//       <ul className="mt-6 space-y-3">
//         {[
//           "Identify your strongest and weakest GRE sections",
//           "Track progress across multiple practice tests",
//           "Understand where your score stands",
//           "Build a smarter graduate school shortlist",
//         ].map((item) => (
//           <li key={item} className="flex items-center gap-3 text-xm text-[#0b1e3f]/90" >
//             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
//               <Check className="h-3 w-3" />
//             </span>
//             {item}
//           </li>
//         ))}
//       </ul>
//       <button className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white" style={{ background: ORANGE }} >
//         Start Your Preparation
//       </button>
//     </div>
//     <div className="grid grid-cols-2 gap-3">
//       {[
//         ["2,000+", "Students Tested"],
//         ["10,000+", "Practice Results"],
//         ["42 pts", "Average Improvement"],
//         ["247", "Universities Explored"],
//       ].map(([number, label]) => (
//         <div key={label} className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5" >
//           <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
//           <p className="mt-1 text-[10px] text-[#0b1e3f]/60">{label}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//   );
// }

// function DifferenceSection() {
//   return (
//     <section
//       id="how-it-works"
//       className="bg-white px-4 py-12"
//     >
//       <div className="mx-auto max-w-5xl">
//         <SectionHeading
//           eyebrow="OUR DIFFERENCE"
//           title="How Ooshas Prep's GRE Calculator Is Different"
//           description="A simple calculator designed to give you useful insights beyond just a single number."
//         />

//         <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
//           <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-[#0b1e3f] text-[10px] font-bold text-white">
//             <div className="p-3">Feature</div>
//             <div className="p-3 text-center">Ooshas Prep</div>
//             <div className="p-3 text-center">Basic Calculator</div>
//             <div className="p-3 text-center">Random Predictor</div>
//           </div>

//           {[
//             "Practice-based score estimate",
//             "Section-level insights",
//             "Grad program matching",
//             "Performance tracking",
//             "Study recommendations",
//             "Admission planning",
//           ].map((item, index) => (
//             <div
//               key={item}
//               className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-slate-200 text-[14px]"
//             >
//               <div className="p-3 font-semibold text-slate-700">
//                 {item}
//               </div>

//               <div className="flex items-center justify-center bg-orange-50 p-3">
//                 <Check className="h-4 w-4 text-orange-500" />
//               </div>

//               <div className="flex items-center justify-center p-3">
//                 {index < 2 ? (
//                   <Check className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <span className="text-slate-300">×</span>
//                 )}
//               </div>

//               <div className="flex items-center justify-center p-3">
//                 {index === 2 ? (
//                   <Check className="h-4 w-4 text-emerald-500" />
//                 ) : (
//                   <span className="text-slate-300">×</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BeyondNumberSection() {
//   const features = [
//     {
//       icon: TrendingUp,
//       title: "Track Your Progress",
//       text: "Monitor score changes over multiple practice tests.",
//     },
//     {
//       icon: Target,
//       title: "Pinpoint Weak Areas",
//       text: "Understand which section needs more preparation.",
//     },
//     {
//       icon: GraduationCap,
//       title: "Explore Universities",
//       text: "Compare your score against graduate program ranges.",
//     },
//     {
//       icon: Trophy,
//       title: "Build Your Profile",
//       text: "Use your GRE score as part of your larger application plan.",
//     },
//     {
//       icon: MapPin,
//       title: "Find Your Fit",
//       text: "Discover programs that align with your goals.",
//     },
//     {
//       icon: Sparkles,
//       title: "Get Smarter Insights",
//       text: "Turn raw practice results into actionable information.",
//     },
//   ];

//   return (
//     <section className="bg-[#fff] px-4 py-12">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="BEYOND THE NUMBER"
//           title="Go Beyond the Number — Understand Your Score"
//           description="Your GRE result can tell you much more when combined with the right context."
//         />

//         <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map(({ icon: Icon, title, text }) => (
//             <div
//               key={title}
//               className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//             >
//               <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
//                 <Icon className="h-4 w-4" />
//               </div>

//               <h3 className="text-sm font-extrabold">{title}</h3>

//               <p className="mt-2 text-[14px] leading-5 text-slate-500">
//                 {text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function QuestionsSection() {
//   return (
//     <section className="bg-[#fcf3ed] px-4 py-12">
//       <div className="mx-auto max-w-3xl">
//         <SectionHeading
//           eyebrow="COMMUNITY"
//           title="Student Questions & Comments"
//           description="Have a question about your GRE score? Ask our team and community."
//         />

//         <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <div className="grid gap-3 sm:grid-cols-2">
//             <input
//               placeholder="Your name"
//               className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
//             />

//             <input
//               placeholder="Email address"
//               className="rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
//             />
//           </div>

//           <textarea
//             placeholder="Ask your question..."
//             rows={4}
//             className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-xm outline-none focus:border-orange-400"
//           />

//           <button className="mt-3 rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">
//             Post Question
//           </button>
//         </div>

//         <div className="mt-4 space-y-3">
//           {[
//             "How can I improve my Quant score?",
//             "Is a 320 GRE score competitive?",
//             "Which universities should I target?",
//           ].map((question, index) => (
//             <div
//               key={question}
//               className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
//             >
//               <div className="flex gap-3">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1e3f] text-[10px] font-bold text-white">
//                   {index + 1}
//                 </div>

//                 <div className="flex-1">
//                   <p className="text-xm font-bold">{question}</p>
//                   <p className="mt-1 text-[10px] text-slate-400">
//                     Asked by GRE student
//                   </p>
//                 </div>

//                 <button className="text-[10px] font-bold text-orange-500">
//                   Answer
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function FAQSection({
//   expandedFAQ,
//   setExpandedFAQ,
// }: {
//   expandedFAQ: number | null;
//   setExpandedFAQ: (value: number | null) => void;
// }) {
//   return (
//     <section id="faq" className="bg-[#fff] px-4 pb-20">
//       <div className="mx-auto max-w-3xl">
//         <SectionHeading
//           eyebrow=""
//           title="GRE Score Calculator — Frequently Asked Questions"
//           description="Everything you need to know about our GRE score calculator."
//         />

//         <div className="mt-8 space-y-2">
//           {faqs.map((faq, index) => {
//             const open = expandedFAQ === index;

//             return (
//               <div
//                 key={faq.question}
//                 className="overflow-hidden rounded-lg border border-slate-200 bg-white"
//               >
//                 <button
//                   onClick={() =>
//                     setExpandedFAQ(open ? null : index)
//                   }
//                   className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
//                 >
//                   <span className="text-xm font-bold">
//                     {faq.question}
//                   </span>

//                   {open ? (
//                     <ChevronUp className="h-4 w-4 shrink-0 text-orange-500" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4 shrink-0 text-orange-500" />
//                   )}
//                 </button>

//                 {open && (
//                   <div className="border-t border-slate-100 px-4 pb-4 pt-3">
//                     <p className="text-[14px] leading-5 text-slate-500">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BottomCTA() {
//   return (
//     <section id="contact" className="bg-white px-4 pb-5">
//       <div
//         className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10"
//         style={{
//           background:
//             "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)",
//         }}
//       >
//         <h2 className="text-xl font-black text-white sm:text-2xl">
//           Your Dream Grad School Is One Score Away
//         </h2>

//         <p className="mx-auto mt-2 max-w-xl text-xm leading-5 text-white/80">
//           Understand your current GRE performance and take the next step
//           toward your graduate school goals.
//         </p>

//         <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
//           <button className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-xm font-bold text-white">
//             Calculate My Score
//           </button>

//           <button className="rounded-lg bg-white px-5 py-3 text-xm font-bold text-[#0b1e3f]">
//             Talk To An Expert
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SectionHeading({
//   eyebrow,
//   title,
//   description,
//   dark = false,
// }: {
//   eyebrow: string;
//   title: string;
//   description: string;
//   dark?: boolean;
// }) {
//   return (
//     <div className="mx-auto max-w-2xl text-center">
//       <span
//         className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${
//           dark
//             ? "bg-orange-400/10 text-orange-300"
//             : "bg-orange-50 text-orange-500"
//         }`}
//       >
//         {eyebrow}
//       </span>

//       <h2
//         className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${
//           dark ? "text-white" : "text-[#0b1e3f]"
//         }`}
//       >
//         {title}
//       </h2>

//       <p
//         className={`mt-3 text-xm leading-5 sm:text-sm ${
//           dark ? "text-blue-100/60" : "text-slate-500"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// }
