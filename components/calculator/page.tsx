"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import EditorContent from "../editorContent";
import axiosInstance from "@/app/lib/axios";
import QuestionsSection from "../comment";

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

// ---- NEW: adaptive (two-section) setup used by GRE ----
type AdaptiveGroup = {
  id: string; // e.g. "verbal" | "quant" (must match a section id in `sections`)
  label: string;
  section1Max: number;
  section2Max: number;
};

type AdaptiveConfig = {
  groups: AdaptiveGroup[];
  // Extra non-adaptive input shown below the groups (Analytical Writing).
  writing: ExamSection;
  // Converts raw correct answers into a scaled section score.
  scaleScore: (
    rawCorrect: number,
    totalQuestions: number,
    harderSection2: boolean,
  ) => number;
};

type ExamConfig = {
  label: string;
  sections: ExamSection[];
  scoreRange: { min: number; max: number };
  percentileBands: PercentileBand[];
  totalLabel: string;
  computeTotal: (scores: Record<string, number>) => number;
  adaptive?: AdaptiveConfig; // NEW
  tierBands?: PercentileBand[]; // NEW: "best-fit grad school tier"
};

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Unofficial GMAT practice-test estimate.
 * The official GMAT algorithm is proprietary. This estimate uses the public
 * structure that all three 60–90 section scores contribute equally.
 */
function estimateGmatTotal(scores: Record<string, number>) {
  const quant = clamp(Number(scores.quant ?? 60), 60, 90);
  const verbal = clamp(Number(scores.verbal ?? 60), 60, 90);
  const dataInsights = clamp(Number(scores.di ?? 60), 60, 90);
  const average = (quant + verbal + dataInsights) / 3;
  const unroundedTotal = 205 + ((average - 60) / 30) * 600;

  // GMAT totals are 205, 215, 225 ... 805. The old implementation
  // rounded from zero and could produce invalid values such as 630.
  const roundedTotal =
    205 + Math.round((unroundedTotal - 205) / 10) * 10;

  return clamp(roundedTotal, 205, 805);
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
  if (!bands.length) return "Not available";

  let label = bands[0]?.label ?? "";
  for (const band of bands) {
    if (score >= band.threshold) label = band.label;
  }
  return label;
}

// NEW: GRE Analytical Writing input (0–6 in half-point steps).
const greWritingSection: ExamSection = {
  id: "aw",
  label: "Analytical Writing",
  min: 0,
  max: 6,
  step: 0.5,
};

const examConfigs: Record<ExamType, ExamConfig> = {
  GRE: {
    label: "GRE",
    
    sections: [
      { id: "verbal", label: "Verbal Reasoning", min: 130, max: 170 },
      { id: "quant", label: "Quantitative Reasoning", min: 130, max: 170 },
      greWritingSection,
    ],
    adaptive: {
      groups: [
        {
          id: "verbal",
          label: "Verbal Reasoning",
          section1Max: 12,
          section2Max: 15,
        },
        {
          id: "quant",
          label: "Quantitative Reasoning",
          section1Max: 12,
          section2Max: 15,
        },
      ],
      writing: greWritingSection,
      
      scaleScore: (rawCorrect, totalQuestions, harderSection2) => {
        const span = harderSection2 ? 40 : 29;
        return clamp(
          Math.round(130 + (rawCorrect / totalQuestions) * span),
          130,
          170,
        );
      },
    },
    scoreRange: { min: 260, max: 340 },
    percentileBands: [
      { threshold: 260, label: "65th" },
      { threshold: 310, label: "75th" },
      { threshold: 315, label: "85th" },
      { threshold: 320, label: "90th" },
      { threshold: 325, label: "95th" },
      { threshold: 330, label: "98th" },
    ],
    tierBands: [
      { threshold: 260, label: "Foundational Programs" },
      { threshold: 295, label: "Good Regional Programs" },
      { threshold: 305, label: "Strong State Programs" },
      { threshold: 315, label: "Competitive Top 50 Programs" },
      { threshold: 320, label: "Highly Competitive Top 25 Programs" },
      { threshold: 330, label: "Elite / Ivy-Level Programs" },
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
    // Do not hardcode GMAT percentiles. They change with the current GMAC
    // reference population and require a verified percentile table.
    percentileBands: [],
    totalLabel: "/805",
    computeTotal: estimateGmatTotal,
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
  tier?: string; // NEW
};

export default function ScoreCalculatorPage({ pageInfo, slug }: any) {
  const [selectedExam, setSelectedExam] = useState<ExamType>(
    pageInfo?.sections?.hero?.fields.pageType || "GRE",
  );
  const [sectionScores, setSectionScores] = useState<Record<string, number>>(
    {},
  );

  const [result, setResult] = useState<CalculatedResult | null>(null);

  const config = examConfigs[selectedExam];

  
  React.useEffect(() => {
    const initial: Record<string, number> = {};
    if (config.adaptive) {
      // GRE: keys are `${group}_s1`, `${group}_s2`, `${group}_harder` (1 = harder, 0 = easier)
      config.adaptive.groups.forEach((g) => {
        initial[`${g.id}_s1`] = Math.round(g.section1Max * 0.75);
        initial[`${g.id}_s2`] = Math.round(g.section2Max * 0.75);
        initial[`${g.id}_harder`] = 1;
      });
      initial[config.adaptive.writing.id] = defaultSectionValue(
        config.adaptive.writing,
      );
    } else {
      config.sections.forEach((s) => {
        initial[s.id] = defaultSectionValue(s);
      });
    }
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

  // NEW: generic handler for the GRE inputs (sliders, number boxes, toggles).
  const handleAdaptiveChange = (
    key: string,
    value: number,
    min: number,
    max: number,
    step = 1,
  ) => {
    const snapped = roundToStep(value, step);
    setSectionScores((prev) => ({ ...prev, [key]: clamp(snapped, min, max) }));
  };

  const handleCalculate = () => {
    let scores: Record<string, number> = { ...sectionScores };

    // GRE: turn raw "correct" counts into scaled 130–170 section scores.
    if (config.adaptive) {
      const { groups, writing, scaleScore } = config.adaptive;
      const scaled: Record<string, number> = {};
      groups.forEach((g) => {
        const raw =
          (sectionScores[`${g.id}_s1`] ?? 0) +
          (sectionScores[`${g.id}_s2`] ?? 0);
        const harder = (sectionScores[`${g.id}_harder`] ?? 1) === 1;
        scaled[g.id] = scaleScore(
          raw,
          g.section1Max + g.section2Max,
          harder,
        );
      });
      scaled[writing.id] = sectionScores[writing.id] ?? writing.min;
      scores = scaled;
    }

    const computed = config.computeTotal(scores);
    const totalScore = Math.min(
      config.scoreRange.max,
      Math.max(config.scoreRange.min, computed),
    );
    const percentile = getPercentileLabel(totalScore, config.percentileBands);
    const tier = config.tierBands
      ? getPercentileLabel(totalScore, config.tierBands)
      : undefined;
    setResult({
      exam: selectedExam,
      scores,
      totalScore,
      percentile,
      tier,
    });
  };

  return (
    <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">
      <Hero data={pageInfo?.sections?.hero?.fields} />

      <div className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <div
          className={`hidden flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm`}
        >
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
        data = {pageInfo?.sections?.calculator}
        config={config}
        sectionScores={sectionScores}
        onScoreChange={handleScoreChange}
        onAdaptiveChange={handleAdaptiveChange}
        onCalculate={handleCalculate}
        result={result && result.exam === selectedExam ? result : null}
      />

      <ScoreVisualizationSection
        data = {pageInfo?.sections?.chart}
        config={config}
        result={result && result.exam === selectedExam ? result : null}
      />

      <WhySection data={pageInfo?.sections?.whySection?.fields} />
      <DifferenceSection data={pageInfo?.sections?.differenceSection?.fields} />
      <BeyondNumberSection data={pageInfo?.sections?.beyondNumber?.fields} />
      <QuestionsSection page={'Calculator'} heading={'Student Questions & Comments'} />
      <Consultants data={pageInfo?.sections?.faq} />
      <BottomCTA data={pageInfo?.sections?.bottomCTA?.fields} />
    </main>
  );
}

function Hero({ data }: { data: any }) {
  const title = data?.title || "";
  const [firstPart, ...rest] = title.split("&");

  return (
    <section className="relative overflow-hidden bg-[#fcf3ed]">
      <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {rest.length > 0 ? (
            <>
              {firstPart.trim()} &
              <span style={{ color: ORANGE }}>{rest.join("&")}</span>
            </>
          ) : (
            title
          )}
        </h1>

        <div
          className="mx-auto mt-5 max-w-2xl text-sm leading-6 sm:text-base"
          dangerouslySetInnerHTML={{
            __html: data?.description || "",
          }}
        />

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {data?.primaryButtonText && (
            <a
              href={data?.primaryButtonUrl || "#calculator"}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
              style={{ background: ORANGE }}
            >
              {data.primaryButtonText}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}


function AdaptiveInputs({
  adaptive,
  sectionScores,
  onChange,
}: {
  adaptive: AdaptiveConfig;
  sectionScores: Record<string, number>;
  onChange: (
    key: string,
    value: number,
    min: number,
    max: number,
    step?: number,
  ) => void;
}) {
  const { groups, writing } = adaptive;
  const writingValue = sectionScores[writing.id] ?? writing.min;

  return (
    <>
      {groups.map((group) => {
        const totalQuestions = group.section1Max + group.section2Max;
        const harder = (sectionScores[`${group.id}_harder`] ?? 1) === 1;
        const parts = [
          {
            key: `${group.id}_s1`,
            label: "Section 1 correct",
            max: group.section1Max,
          },
          {
            key: `${group.id}_s2`,
            label: "Section 2 correct",
            max: group.section2Max,
          },
        ];

        return (
          <div
            key={group.id}
            className="mb-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xm font-bold">{group.label}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500">
                {totalQuestions} questions
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {parts.map((part) => {
                const value = sectionScores[part.key] ?? 0;
                return (
                  <div key={part.key}>
                    <p className="mb-2 text-[13px] font-semibold text-slate-600">
                      {part.label} (out of {part.max})
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={part.max}
                        step={1}
                        value={value}
                        onChange={(e) =>
                          onChange(part.key, Number(e.target.value), 0, part.max)
                        }
                        className="flex-1 accent-orange-500"
                        aria-label={`${group.label} ${part.label}`}
                      />
                      <input
                        type="number"
                        min={0}
                        max={part.max}
                        step={1}
                        value={value}
                        onChange={(e) =>
                          onChange(part.key, Number(e.target.value), 0, part.max)
                        }
                        className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-center text-sm font-bold outline-none focus:border-orange-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mb-2 mt-4 text-[13px] font-semibold text-slate-600">
              Section 2 difficulty you received
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Harder Section 2", isHarder: true },
                { label: "Easier Section 2", isHarder: false },
              ].map((opt) => {
                const active = harder === opt.isHarder;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      onChange(`${group.id}_harder`, opt.isHarder ? 1 : 0, 0, 1)
                    }
                    className={`rounded-lg border px-3 py-2.5 text-[13px] font-bold transition ${
                      active
                        ? "border-orange-400 bg-orange-50 text-orange-600"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Analytical Writing */}
      {/* <div className="mb-4 rounded-xl border border-slate-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xm font-bold">{writing.label}</span>
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
            {writingValue}
            <span className="text-slate-400"> / {writing.max}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={writing.min}
            max={writing.max}
            step={writing.step}
            value={writingValue}
            onChange={(e) =>
              onChange(
                writing.id,
                Number(e.target.value),
                writing.min,
                writing.max,
                writing.step,
              )
            }
            className="flex-1 accent-orange-500"
            aria-label={writing.label}
          />
          <input
            type="number"
            min={writing.min}
            max={writing.max}
            step={writing.step}
            value={writingValue}
            onChange={(e) =>
              onChange(
                writing.id,
                Number(e.target.value),
                writing.min,
                writing.max,
                writing.step,
              )
            }
            className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-center text-sm font-bold outline-none focus:border-orange-400"
          />
        </div>
      </div> */}
    </>
  );
}

function ScoreSection({
  data,
  config,
  sectionScores,
  onScoreChange,
  onAdaptiveChange,
  onCalculate,
  result,
}: {
  data : any
  config: ExamConfig;
  sectionScores: Record<string, number>;
  onScoreChange: (id: string, value: number) => void;
  onAdaptiveChange: (
    key: string,
    value: number,
    min: number,
    max: number,
    step?: number,
  ) => void;
  onCalculate: () => void;
  result: CalculatedResult | null;
}) {
  console.log(result , "in the scoresection ")
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
          title={data?.fields?.title || `Convert Your Raw Score Into Your Real ${config.label} Score`}
          description={data?.fields?.description || `Enter your practice performance and click Calculate to see your estimated ${config.label} score.`}
        />

        <div className="mt-9 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:grid-cols-[1fr_360px]">
          <div className="p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold">
                  Enter Your Practice Test Results
                </h3>
                <p className="mt-1 text-[14px] text-slate-500">
                  {config.adaptive
                    ? "Works with any full-length GRE practice test (ETS PowerPrep, Ooshas Prep mock tests, or the official Bluebook-style portal)."
                    : "Use your latest mock test for the best estimate."}
                </p>
              </div>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-500">
                LIVE
              </span>
            </div>

            {config.adaptive ? (
              <AdaptiveInputs
                adaptive={config.adaptive}
                sectionScores={sectionScores}
                onChange={onAdaptiveChange}
              />
            ) : (
              config.sections.map((section) => {
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
              })
            )}

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
                  {result.percentile !== "Not available" && (
                    <div className="mt-3 text-center">
                      <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
                        {result.percentile} Percentile
                      </span>
                    </div>
                  )}
                  {config.label === "GMAT" && (
                    <p className="mt-3 text-center text-[10px] leading-4 text-blue-100/60">
                      Percentile is not estimated. Use a current, verified GMAC
                      percentile table for percentile reporting.
                    </p>
                  )}

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
                          display={
                            config.adaptive
                              ? String(
                                  Number.isInteger(val) ? val : val.toFixed(1),
                                )
                              : undefined
                          }
                        />
                      );
                    })}
                    {!config.adaptive && (
                      <ScoreMeter
                        label="Overall Performance"
                        value={Math.round(
                          ((result.totalScore - config.scoreRange.min) /
                            (config.scoreRange.max - config.scoreRange.min)) *
                            100,
                        )}
                      />
                    )}
                    {config.adaptive && result.tier && (
                      <div className="flex items-center justify-between gap-3 pt-2 text-[12px]">
                        <span className="text-white/70">
                          Best-fit grad school tier
                        </span>
                        <span className="text-right font-bold text-white">
                          {result.tier}
                        </span>
                      </div>
                    )}
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

function ScoreMeter({
  label,
  value,
  display,
}: {
  label: string;
  value: number;
  display?: string; // NEW: show a custom value (e.g. 145) instead of a %
}) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-[10px]">
        <span className="text-white/70">{label}</span>
        <span className="font-bold text-white">
          {display ?? `${Math.round(clamped)}%`}
        </span>
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
  data,
  config,
  result,
}: {
  data : any;
  config: ExamConfig;
  result: CalculatedResult | null;
}) {
  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SCORE BREAKDOWN"
          title={data?.field?.title || "See Your Score & Band, Visually"}
          description={data?.field?.description || 'A section-by-section chart of your practice scores and your estimated total-score position.'}
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
                  {result.percentile !== "Not available" ? (
                    <>
                      sits in the{" "}
                      <span className="font-bold text-orange-500">
                        {result.percentile} percentile
                      </span>{" "}
                      band.
                    </>
                  ) : (
                    <>is an estimated total-score scale position.</>
                  )}
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

function WhySection({ data }: { data: any }) {
  return (
    <section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
            More Than A Number
          </div>

          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">
            {data?.title || ""}
          </h2>

          <div
            className="mt-5 max-w-3xl text-sm leading-6 text-[#0b1e3f]/80"
            dangerouslySetInnerHTML={{
              __html: data?.description || "",
            }}
          />
          <button
            className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white"
            style={{ background: ORANGE }}
          >
            Start Your Preparation
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data?.statistics?.map(({ number, label }, index) => (
            <div
              key={`${label}-${index}`}
              className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5"
            >
              <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#0b1e3f]/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceSection({ data }: { data: any }) {
  return (
    <section id="how-it-works" className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="OUR DIFFERENCE"
          title={data?.title || ""}
          description={data?.description || ""}
        />

        {data?.Data && (
          <EditorContent content_data={data.Data} />
          // <div
          //   className="mt-9 overflow-x-auto rounded-2xl border border-slate-200 bg-white "
          //   dangerouslySetInnerHTML={{
          //     __html: data.Data,
          //   }}
          // />
        )}
      </div>
    </section>
  );
}

function BeyondNumberSection({ data }: { data: any }) {
  const iconMap: Record<string, any> = {
    TrendingUp,
    Target,
    GraduationCap,
    Trophy,
    MapPin,
    Sparkles,
    Users,
    Star,
    Search,
    Info,
  };

  const features = Array.isArray(data?.features) ? data.features : [];

  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="BEYOND THE NUMBER"
          title={data?.title || ""}
          description={data?.description || ""}
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: any, index: number) => {
            const Icon = iconMap[feature?.icon] || Sparkles;

            return (
              <div
                key={`${feature?.title || "feature"}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-extrabold">
                  {feature?.title || ""}
                </h3>
                <p className="mt-2 text-[14px] leading-5 text-slate-500">
                  {feature?.text || ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BottomCTA({ data }: { data: any }) {
  return (
    <section id="contact" className="bg-white px-4 pb-5">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10"
        style={{
          background: "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)",
        }}
      >
        <h2 className="text-xl font-black text-white sm:text-2xl">
          {data?.title || ""}
        </h2>

        <p className="mx-auto mt-2 max-w-xl whitespace-pre-line text-sm leading-5 text-white/80">
          {data?.description || ""}
        </p>

        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          {data?.primaryButtonText && (
            <a
              href={data?.primaryButtonUrl || "#calculator"}
              className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-sm font-bold text-white"
            >
              {data.primaryButtonText}
            </a>
          )}

          {data?.secondaryButtonText && (
            <a
              href={data?.secondaryButtonUrl || "#"}
              className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0b1e3f]"
            >
              {data.secondaryButtonText}
            </a>
          )}
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
      {/* <EditorContent content_data={description} /> */}
      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
        dangerouslySetInnerHTML={{__html : description}}
      />
        {/* {description}
      </p> */}
    </div>
  );
}





// "use client";

// import React, { useEffect, useMemo, useState } from "react";
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
// import { Consultants } from "@/components/destinations-consultants";
// import EditorContent from "../editorContent";
// import axiosInstance from "@/app/lib/axios";
// import QuestionsSection from "../comment";

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
//   step?: number;
//   bandFromRaw?: (raw: number) => number;
//   bandUnitLabel?: string; // e.g. "Band" — label for the converted value
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
//   percentileBands: PercentileBand[];
//   totalLabel: string;
//   computeTotal: (scores: Record<string, number>) => number;
// };

// function roundToStep(value: number, step: number) {
//   return Math.round(value / step) * step;
// }

// function clamp(value: number, min: number, max: number) {
//   return Math.min(max, Math.max(min, value));
// }

// /**
//  * Unofficial GMAT practice-test estimate.
//  * The official GMAT algorithm is proprietary. This estimate uses the public
//  * structure that all three 60–90 section scores contribute equally.
//  */
// function estimateGmatTotal(scores: Record<string, number>) {
//   const quant = clamp(Number(scores.quant ?? 60), 60, 90);
//   const verbal = clamp(Number(scores.verbal ?? 60), 60, 90);
//   const dataInsights = clamp(Number(scores.di ?? 60), 60, 90);
//   const average = (quant + verbal + dataInsights) / 3;
//   const unroundedTotal = 205 + ((average - 60) / 30) * 600;

//   // GMAT totals are 205, 215, 225 ... 805. The old implementation
//   // rounded from zero and could produce invalid values such as 630.
//   const roundedTotal =
//     205 + Math.round((unroundedTotal - 205) / 10) * 10;

//   return clamp(roundedTotal, 205, 805);
// }

// function roundIELTSBand(avg: number) {
//   const whole = Math.floor(avg);
//   const remainder = avg - whole;
//   if (remainder < 0.25) return whole;
//   if (remainder < 0.75) return whole + 0.5;
//   return whole + 1;
// }

// const LISTENING_RAW_TO_BAND: { min: number; band: number }[] = [
//   { min: 39, band: 9 },
//   { min: 37, band: 8.5 },
//   { min: 35, band: 8 },
//   { min: 32, band: 7.5 },
//   { min: 30, band: 7 },
//   { min: 26, band: 6.5 },
//   { min: 23, band: 6 },
//   { min: 18, band: 5.5 },
//   { min: 16, band: 5 },
//   { min: 13, band: 4.5 },
//   { min: 10, band: 4 },
//   { min: 8, band: 3.5 },
//   { min: 6, band: 3 },
//   { min: 4, band: 2.5 },
// ];

// const READING_RAW_TO_BAND: { min: number; band: number }[] = [
//   { min: 39, band: 9 },
//   { min: 37, band: 8.5 },
//   { min: 35, band: 8 },
//   { min: 33, band: 7.5 },
//   { min: 30, band: 7 },
//   { min: 27, band: 6.5 },
//   { min: 23, band: 6 },
//   { min: 19, band: 5.5 },
//   { min: 15, band: 5 },
//   { min: 13, band: 4.5 },
//   { min: 10, band: 4 },
//   { min: 8, band: 3.5 },
//   { min: 6, band: 3 },
// ];

// function rawToBand(
//   raw: number,
//   table: { min: number; band: number }[],
// ): number {
//   for (const row of table) {
//     if (raw >= row.min) return row.band;
//   }
//   return 0;
// }

// const listeningBandFromRaw = (raw: number) =>
//   rawToBand(raw, LISTENING_RAW_TO_BAND);
// const readingBandFromRaw = (raw: number) => rawToBand(raw, READING_RAW_TO_BAND);

// function defaultSectionValue(section: ExamSection) {
//   const step = section.step || 1;
//   const raw = section.min + (section.max - section.min) * 0.75;
//   return roundToStep(raw, step);
// }

// // Finds the highest band whose threshold is <= score.
// function getPercentileLabel(score: number, bands: PercentileBand[]) {
//   if (!bands.length) return "Not available";

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
//     // Do not hardcode GMAT percentiles. They change with the current GMAC
//     // reference population and require a verified percentile table.
//     percentileBands: [],
//     totalLabel: "/805",
//     computeTotal: estimateGmatTotal,
//   },
//   SAT: {
//     label: "SAT",
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
//     computeTotal: (scores) =>
//       (scores.reading ?? 0) +
//       (scores.listening ?? 0) +
//       (scores.speaking ?? 0) +
//       (scores.writing ?? 0),
//   },
//   IELTS: {
//     label: "IELTS",
//     sections: [
//       {
//         id: "listening",
//         label: "Listening",
//         min: 0,
//         max: 40,
//         step: 1,
//         bandFromRaw: listeningBandFromRaw,
//         bandUnitLabel: "Band",
//       },
//       {
//         id: "reading",
//         label: "Reading",
//         min: 0,
//         max: 40,
//         step: 1,
//         bandFromRaw: readingBandFromRaw,
//         bandUnitLabel: "Band",
//       },

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

//     computeTotal: (scores) => {
//       const listeningBand = listeningBandFromRaw(scores.listening ?? 0);
//       const readingBand = readingBandFromRaw(scores.reading ?? 0);
//       const writingBand = scores.writing ?? 0;
//       const speakingBand = scores.speaking ?? 0;
//       const avg =
//         (listeningBand + readingBand + writingBand + speakingBand) / 4;
//       return roundIELTSBand(avg);
//     },
//   },
//   PTE: {
//     label: "PTE Academic",
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
//     computeTotal: (scores) => {
//       const avg =
//         ((scores.speaking ?? 10) +
//           (scores.reading ?? 10) +
//           (scores.listening ?? 10)) /
//         3;
//       return Math.round(avg);
//     },
//   },
// };

// type CalculatedResult = {
//   exam: ExamType;
//   scores: Record<string, number>;
//   totalScore: number;
//   percentile: string;
// };

// export default function ScoreCalculatorPage({ pageInfo, slug }: any) {
//   const [selectedExam, setSelectedExam] = useState<ExamType>(
//     pageInfo?.sections?.hero?.fields.pageType || "GRE",
//   );
//   const [sectionScores, setSectionScores] = useState<Record<string, number>>(
//     {},
//   );

//   const [result, setResult] = useState<CalculatedResult | null>(null);

//   const config = examConfigs[selectedExam];

  
//   React.useEffect(() => {
//     const initial: Record<string, number> = {};
//     config.sections.forEach((s) => {
//       initial[s.id] = defaultSectionValue(s);
//     });
//     setSectionScores(initial);
//     setResult(null);
//   }, [selectedExam]);

//   const handleScoreChange = (sectionId: string, value: number) => {
//     const section = config.sections.find((s) => s.id === sectionId);
//     if (!section) return;
//     const step = section.step || 1;
//     const snapped = roundToStep(value, step);
//     const clamped = Math.min(section.max, Math.max(section.min, snapped));
//     setSectionScores((prev) => ({ ...prev, [sectionId]: clamped }));
//   };

//   const handleCalculate = () => {
//     const computed = config.computeTotal(sectionScores);
//     const totalScore = Math.min(
//       config.scoreRange.max,
//       Math.max(config.scoreRange.min, computed),
//     );
//     const percentile = getPercentileLabel(totalScore, config.percentileBands);
//     setResult({
//       exam: selectedExam,
//       scores: { ...sectionScores },
//       totalScore,
//       percentile,
//     });
//   };

//   return (
//     <main className="min-h-screen bg-[#fff] text-[#0b1e3f]">
//       <Hero data={pageInfo?.sections?.hero?.fields} />

//       <div className="mx-auto max-w-6xl px-4 pb-4 pt-8">
//         <div
//           className={`hidden flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm`}
//         >
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
//         data = {pageInfo?.sections?.calculator}
//         config={config}
//         sectionScores={sectionScores}
//         onScoreChange={handleScoreChange}
//         onCalculate={handleCalculate}
//         result={result && result.exam === selectedExam ? result : null}
//       />

//       <ScoreVisualizationSection
//         data = {pageInfo?.sections?.chart}
//         config={config}
//         result={result && result.exam === selectedExam ? result : null}
//       />

//       <WhySection data={pageInfo?.sections?.whySection?.fields} />
//       <DifferenceSection data={pageInfo?.sections?.differenceSection?.fields} />
//       <BeyondNumberSection data={pageInfo?.sections?.beyondNumber?.fields} />
//       <QuestionsSection page={'Calculator'} heading={'Student Questions & Comments'} />
//       <Consultants data={pageInfo?.sections?.faq} />
//       <BottomCTA data={pageInfo?.sections?.bottomCTA?.fields} />
//     </main>
//   );
// }

// function Hero({ data }: { data: any }) {
//   const title = data?.title || "";
//   const [firstPart, ...rest] = title.split("&");

//   return (
//     <section className="relative overflow-hidden bg-[#fcf3ed]">
//       <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-20 lg:pt-20">
//         <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
//           {rest.length > 0 ? (
//             <>
//               {firstPart.trim()} &
//               <span style={{ color: ORANGE }}>{rest.join("&")}</span>
//             </>
//           ) : (
//             title
//           )}
//         </h1>

//         <div
//           className="mx-auto mt-5 max-w-2xl text-sm leading-6 sm:text-base"
//           dangerouslySetInnerHTML={{
//             __html: data?.description || "",
//           }}
//         />

//         <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
//           {data?.primaryButtonText && (
//             <a
//               href={data?.primaryButtonUrl || "#calculator"}
//               className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
//               style={{ background: ORANGE }}
//             >
//               {data.primaryButtonText}
//               <ArrowRight className="h-4 w-4" />
//             </a>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ScoreSection({
//   data,
//   config,
//   sectionScores,
//   onScoreChange,
//   onCalculate,
//   result,
// }: {
//   data : any
//   config: ExamConfig;
//   sectionScores: Record<string, number>;
//   onScoreChange: (id: string, value: number) => void;
//   onCalculate: () => void;
//   result: CalculatedResult | null;
// }) {
//   console.log(result , "in the scoresection ")
//   const displayTotal =
//     result &&
//     (Number.isInteger(result.totalScore)
//       ? result.totalScore
//       : result.totalScore.toFixed(1));

//   return (
//     <section id="calculator" className="px-4 pb-16">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow={`${config.label} SCORE CALCULATOR`}
//           title={data?.fields?.title || `Convert Your Raw Score Into Your Real ${config.label} Score`}
//           description={data?.fields?.description || `Enter your practice performance and click Calculate to see your estimated ${config.label} score.`}
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
//                 ((value - section.min) / (section.max - section.min)) * 100,
//               );
//               const step = section.step || 1;
//               const bandEquivalent = section.bandFromRaw
//                 ? section.bandFromRaw(value)
//                 : null;
//               return (
//                 <div
//                   key={section.id}
//                   className="mb-4 rounded-xl border border-slate-200 p-4"
//                 >
//                   <div className="mb-3 flex items-center justify-between">
//                     <span className="text-xm font-bold">
//                       {section.label}
//                       {section.bandFromRaw && (
//                         <span className="ml-1.5 font-normal text-slate-400">
//                           (out of {section.max})
//                         </span>
//                       )}
//                     </span>
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
//                   {/* <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
//                     <div
//                       className="h-full rounded-full transition-all"
//                       style={{
//                         width: `${Math.min(Math.max(percentage, 0), 100)}%`,
//                         background: ORANGE,
//                       }}
//                     />
//                   </div> */}
//                   {bandEquivalent !== null && (
//                     <p className="mt-2 text-[11px] font-semibold text-orange-500">
//                       ≈ {section.bandUnitLabel ?? "Band"} {bandEquivalent}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}

//             <button
//               type="button"
//               onClick={onCalculate}
//               className="mt-5 w-full rounded-lg py-3 text-xm font-bold text-white transition hover:brightness-95"
//               style={{ background: ORANGE }}
//             >
//               Calculate My Score
//             </button>
//           </div>

//           <div className="relative flex flex-col justify-center bg-[#0b1e3f] p-7 text-white">
//             <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
//             <div className="relative">
//               {!result ? (
//                 <ResultPlaceholder />
//               ) : (
//                 <>
//                   <p className="text-center text-[10px] font-medium uppercase tracking-widest text-blue-200/60">
//                     Your Estimated {config.label} Score
//                   </p>
//                   <div className="mt-4 text-center">
//                     <span className="text-6xl font-black tracking-tight">
//                       {displayTotal}
//                     </span>
//                     <span className="ml-1 text-sm font-semibold text-white/50">
//                       {config.totalLabel}
//                     </span>
//                   </div>
//                   {result.percentile !== "Not available" && (
//                     <div className="mt-3 text-center">
//                       <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
//                         {result.percentile} Percentile
//                       </span>
//                     </div>
//                   )}
//                   {config.label === "GMAT" && (
//                     <p className="mt-3 text-center text-[10px] leading-4 text-blue-100/60">
//                       Percentile is not estimated. Use a current, verified GMAC
//                       percentile table for percentile reporting.
//                     </p>
//                   )}

//                   <div className="mt-8 space-y-4">
//                     {config.sections.map((section) => {
//                       const val = result.scores[section.id] ?? section.min;
//                       const pct = Math.round(
//                         ((val - section.min) / (section.max - section.min)) *
//                           100,
//                       );
//                       return (
//                         <ScoreMeter
//                           key={section.id}
//                           label={section.label}
//                           value={pct}
//                         />
//                       );
//                     })}
//                     <ScoreMeter
//                       label="Overall Performance"
//                       value={Math.round(
//                         ((result.totalScore - config.scoreRange.min) /
//                           (config.scoreRange.max - config.scoreRange.min)) *
//                           100,
//                       )}
//                     />
//                   </div>

//                   <div className="mt-8 border-t border-white/10 pt-5 text-center">
//                     <p className="text-[10px] leading-5 text-blue-100/60">
//                       Your estimated score is a planning benchmark and should
//                       not be considered an official result.
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ResultPlaceholder() {
//   return (
//     <div className="text-center">
//       <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-white/20">
//         <Sparkles className="h-6 w-6 text-white/40" />
//       </div>
//       <p className="mt-4 text-sm font-bold text-white/80">No score yet</p>
//       <p className="mx-auto mt-2 max-w-[220px] text-[12px] leading-5 text-blue-100/60">
//         Enter your section scores on the left, then click{" "}
//         <span className="font-semibold text-orange-300">
//           Calculate My Score
//         </span>{" "}
//         to see your estimated result and charts.
//       </p>
//     </div>
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

// function ScoreVisualizationSection({
//   data,
//   config,
//   result,
// }: {
//   data : any;
//   config: ExamConfig;
//   result: CalculatedResult | null;
// }) {
//   return (
//     <section className="px-4 pb-20">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="SCORE BREAKDOWN"
//           title={data?.field?.title || "See Your Score & Band, Visually"}
//           description={data?.field?.description || 'A section-by-section chart of your practice scores and your estimated total-score position.'}
//         />
//         <div className="mt-9 grid gap-5 lg:grid-cols-2">
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <h3 className="text-sm font-extrabold">Section Score Chart</h3>
//             <p className="mt-1 text-[14px] text-slate-500">
//               Each bar shows how your entered score compares to that section's
//               full range.
//             </p>
//             {result ? (
//               <SectionBarChart config={config} sectionScores={result.scores} />
//             ) : (
//               <ChartPlaceholder />
//             )}
//           </div>
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <h3 className="text-sm font-extrabold">
//               Total Score & Band Position
//             </h3>
//             {result ? (
//               <>
//                 <p className="mt-1 text-[14px] text-slate-500">
//                   Your {config.label} total of{" "}
//                   {Number.isInteger(result.totalScore)
//                     ? result.totalScore
//                     : result.totalScore.toFixed(1)}{" "}
//                   {result.percentile !== "Not available" ? (
//                     <>
//                       sits in the{" "}
//                       <span className="font-bold text-orange-500">
//                         {result.percentile} percentile
//                       </span>{" "}
//                       band.
//                     </>
//                   ) : (
//                     <>is an estimated total-score scale position.</>
//                   )}
//                 </p>
//                 <BandGaugeChart
//                   config={config}
//                   totalScore={result.totalScore}
//                 />
//               </>
//             ) : (
//               <>
//                 <p className="mt-1 text-[14px] text-slate-500">
//                   Click Calculate My Score above to see where your total lands.
//                 </p>
//                 <ChartPlaceholder />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ChartPlaceholder() {
//   return (
//     <div className="mt-5 flex h-[220px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
//       <p className="max-w-[220px] text-center text-[12px] leading-5 text-slate-400">
//         Your chart will appear here once you calculate your score.
//       </p>
//     </div>
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
//             <text
//               x={paddingLeft - 8}
//               y={y + 3}
//               textAnchor="end"
//               fontSize={9}
//               fill="#94a3b8"
//             >
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
//           Math.max(
//             0,
//             ((value - section.min) / (section.max - section.min)) * 100,
//           ),
//         );
//         const barHeight = (pct / 100) * chartHeight;
//         const x = paddingLeft + i * (barWidth + gap);
//         const y = paddingTop + chartHeight - barHeight;
//         const bandEquivalent = section.bandFromRaw
//           ? section.bandFromRaw(value)
//           : null;

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
//               {bandEquivalent !== null ? `${value} → ${bandEquivalent}` : value}
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
//         const segX =
//           paddingLeft + ((segStart - min) / (max - min)) * trackWidth;
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
//       <text
//         x={paddingLeft}
//         y={barY - 10}
//         textAnchor="start"
//         fontSize={9}
//         fill="#94a3b8"
//       >
//         {min}
//       </text>
//       <text
//         x={width - paddingRight}
//         y={barY - 10}
//         textAnchor="end"
//         fontSize={9}
//         fill="#94a3b8"
//       >
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

// function WhySection({ data }: { data: any }) {
//   return (
//     <section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
//       <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
//         <div>
//           <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
//             More Than A Number
//           </div>

//           <h2 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">
//             {data?.title || ""}
//           </h2>

//           <div
//             className="mt-5 max-w-3xl text-sm leading-6 text-[#0b1e3f]/80"
//             dangerouslySetInnerHTML={{
//               __html: data?.description || "",
//             }}
//           />
//           <button
//             className="mt-7 rounded-lg px-5 py-3 text-xm font-bold text-white"
//             style={{ background: ORANGE }}
//           >
//             Start Your Preparation
//           </button>
//         </div>
//         <div className="grid grid-cols-2 gap-3">
//           {data?.statistics?.map(({ number, label }, index) => (
//             <div
//               key={`${label}-${index}`}
//               className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5"
//             >
//               <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
//               <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#0b1e3f]/60">
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function DifferenceSection({ data }: { data: any }) {
//   return (
//     <section id="how-it-works" className="bg-white px-4 py-12">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="OUR DIFFERENCE"
//           title={data?.title || ""}
//           description={data?.description || ""}
//         />

//         {data?.Data && (
//           <EditorContent content_data={data.Data} />
//           // <div
//           //   className="mt-9 overflow-x-auto rounded-2xl border border-slate-200 bg-white "
//           //   dangerouslySetInnerHTML={{
//           //     __html: data.Data,
//           //   }}
//           // />
//         )}
//       </div>
//     </section>
//   );
// }

// function BeyondNumberSection({ data }: { data: any }) {
//   const iconMap: Record<string, any> = {
//     TrendingUp,
//     Target,
//     GraduationCap,
//     Trophy,
//     MapPin,
//     Sparkles,
//     Users,
//     Star,
//     Search,
//     Info,
//   };

//   const features = Array.isArray(data?.features) ? data.features : [];

//   return (
//     <section className="bg-white px-4 py-12">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="BEYOND THE NUMBER"
//           title={data?.title || ""}
//           description={data?.description || ""}
//         />

//         <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature: any, index: number) => {
//             const Icon = iconMap[feature?.icon] || Sparkles;

//             return (
//               <div
//                 key={`${feature?.title || "feature"}-${index}`}
//                 className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//               >
//                 <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
//                   <Icon className="h-4 w-4" />
//                 </div>
//                 <h3 className="text-sm font-extrabold">
//                   {feature?.title || ""}
//                 </h3>
//                 <p className="mt-2 text-[14px] leading-5 text-slate-500">
//                   {feature?.text || ""}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BottomCTA({ data }: { data: any }) {
//   return (
//     <section id="contact" className="bg-white px-4 pb-5">
//       <div
//         className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10"
//         style={{
//           background: "linear-gradient(135deg, #ff7627 0%, #ff8b4d 100%)",
//         }}
//       >
//         <h2 className="text-xl font-black text-white sm:text-2xl">
//           {data?.title || ""}
//         </h2>

//         <p className="mx-auto mt-2 max-w-xl whitespace-pre-line text-sm leading-5 text-white/80">
//           {data?.description || ""}
//         </p>

//         <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
//           {data?.primaryButtonText && (
//             <a
//               href={data?.primaryButtonUrl || "#calculator"}
//               className="rounded-lg bg-[#0b1e3f] px-5 py-3 text-sm font-bold text-white"
//             >
//               {data.primaryButtonText}
//             </a>
//           )}

//           {data?.secondaryButtonText && (
//             <a
//               href={data?.secondaryButtonUrl || "#"}
//               className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0b1e3f]"
//             >
//               {data.secondaryButtonText}
//             </a>
//           )}
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
//       {/* <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${dark ? "bg-orange-400/10 text-orange-300" : "bg-orange-50 text-orange-500"}`}>
//         {eyebrow}
//       </span> */}
//       <h2
//         className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}
//       >
//         {title}
//       </h2>
//       {/* <EditorContent content_data={description} /> */}
//       <p
//         className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
//         dangerouslySetInnerHTML={{__html : description}}
//       />
//         {/* {description}
//       </p> */}
//     </div>
//   );
// }








