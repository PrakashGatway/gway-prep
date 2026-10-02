"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock3,
  Download,
  GraduationCap,
  Info,
  MapPin,
  Minus,
  Plus,
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
import QuestionsSection from "../comment";
import PopupModal from "../popupModel";
import { useRouter } from "next/navigation";

const ORANGE = "#ff7a2a";
const NAVY = "#0b1e3f";

type ExamType = "SAT" | "GRE" | "GMAT" | "TOEFL" | "IELTS" | "PTE";

type SATScores = {
  readingWritingModule1: number;
  readingWritingModule2: number;
  mathModule1: number;
  mathModule2: number;
};

type GREScores = {
  verbalS1: number;
  verbalS2: number;
  quantS1: number;
  quantS2: number;
  verbalHarder: boolean;
  quantHarder: boolean;
  analyticalWriting: number;
};

type TOEFLScores = {
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
};

type IELTSScores = {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
};

type PTEScores = {
  speaking: number;
  reading: number;
  listening: number;
};

type PerformanceReport = {
  exam: ExamType;
  totalScore: number;
  sectionScores: Record<string, number>;
  percentages: Record<string, number>;
  performanceLevel: string;
  strongestArea: string;
  weakestArea: string;
  percentile?: string;
};

// SAT Scoring
function calculateSATScore(scores: SATScores): { total: number; rw: number; math: number; rwPercent: number; mathPercent: number } {
  const rwRaw = scores.readingWritingModule1 + scores.readingWritingModule2;
  const mathRaw = scores.mathModule1 + scores.mathModule2;

  const rwScaled = Math.min(800, Math.max(200, 200 + (rwRaw / 54) * 600));
  const mathScaled = Math.min(800, Math.max(200, 200 + (mathRaw / 44) * 600));

  return {
    total: Math.round(rwScaled + mathScaled),
    rw: Math.round(rwScaled),
    math: Math.round(mathScaled),
    rwPercent: Math.round((rwRaw / 54) * 100),
    mathPercent: Math.round((mathRaw / 44) * 100),
  };
}

// GRE Scoring
function calculateGREScore(scores: GREScores): { total: number; verbal: number; quant: number; aw: number; verbalPercent: number; quantPercent: number } {
  const verbalRaw = scores.verbalS1 + scores.verbalS2;
  const quantRaw = scores.quantS1 + scores.quantS2;

  const verbalSpan = scores.verbalHarder ? 40 : 29;
  const quantSpan = scores.quantHarder ? 40 : 29;

  const verbalScaled = Math.min(170, Math.max(130, Math.round(130 + (verbalRaw / 27) * verbalSpan)));
  const quantScaled = Math.min(170, Math.max(130, Math.round(130 + (quantRaw / 27) * quantSpan)));

  return {
    total: verbalScaled + quantScaled,
    verbal: verbalScaled,
    quant: quantScaled,
    aw: scores.analyticalWriting,
    verbalPercent: Math.round((verbalRaw / 27) * 100),
    quantPercent: Math.round((quantRaw / 27) * 100),
  };
}

// GMAT Scoring
function calculateGMATScore(quant: number, verbal: number, di: number): number {
  const average = (quant + verbal + di) / 3;
  const unroundedTotal = 205 + ((average - 60) / 30) * 600;
  return Math.min(805, Math.max(205, 205 + Math.round((unroundedTotal - 205) / 10) * 10));
}

// TOEFL Scoring
function calculateTOEFLScore(scores: TOEFLScores): { total: number; percentages: Record<string, number> } {
  const total = scores.reading + scores.listening + scores.speaking + scores.writing;
  const percentages = {
    reading: Math.round((scores.reading / 30) * 100),
    listening: Math.round((scores.listening / 30) * 100),
    speaking: Math.round((scores.speaking / 30) * 100),
    writing: Math.round((scores.writing / 30) * 100),
  };
  return { total, percentages };
}

// IELTS Scoring
function calculateIELTSScore(scores: IELTSScores): { total: number; percentages: Record<string, number> } {
  const total = ((scores.listening + scores.reading + scores.writing + scores.speaking) / 4);
  const roundedTotal = Math.round(total * 2) / 2; // Round to nearest 0.5
  const percentages = {
    listening: Math.round((scores.listening / 9) * 100),
    reading: Math.round((scores.reading / 9) * 100),
    writing: Math.round((scores.writing / 9) * 100),
    speaking: Math.round((scores.speaking / 9) * 100),
  };
  return { total: roundedTotal, percentages };
}

// PTE Scoring
function calculatePTEScore(scores: PTEScores): { total: number; percentages: Record<string, number> } {
  const total = Math.round((scores.speaking + scores.reading + scores.listening) / 3);
  const percentages = {
    speaking: Math.round((scores.speaking / 90) * 100),
    reading: Math.round((scores.reading / 90) * 100),
    listening: Math.round((scores.listening / 90) * 100),
  };
  return { total, percentages };
}

function getPerformanceLevel(percent: number): string {
  if (percent >= 85) return "Advanced";
  if (percent >= 70) return "Proficient";
  if (percent >= 55) return "Developing";
  return "Needs Improvement";
}

function getPercentile(score: number, exam: ExamType): string {
  if (exam === "SAT") {
    if (score >= 1500) return "99th";
    if (score >= 1400) return "95th";
    if (score >= 1300) return "90th";
    if (score >= 1200) return "82nd";
    if (score >= 1100) return "70th";
    if (score >= 1000) return "55th";
    return "Below 55th";
  } else if (exam === "GRE") {
    if (score >= 330) return "98th";
    if (score >= 320) return "90th";
    if (score >= 310) return "80th";
    if (score >= 300) return "65th";
    return "Below 65th";
  } else if (exam === "GMAT") {
    if (score >= 750) return "98th";
    if (score >= 700) return "88th";
    if (score >= 650) return "75th";
    if (score >= 600) return "60th";
    return "Below 60th";
  }
  return "N/A";
}

export default function ScoreCalculatorPage({ pageInfo, slug }: any) {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<ExamType>("SAT");
  const [showReport, setShowReport] = useState(false);

  // SAT State
  const [satScores, setSatScores] = useState<SATScores>({
    readingWritingModule1: 18,
    readingWritingModule2: 17,
    mathModule1: 12,
    mathModule2: 11,
  });

  // GRE State
  const [greScores, setGreScores] = useState<GREScores>({
    verbalS1: 10,
    verbalS2: 12,
    quantS1: 10,
    quantS2: 11,
    verbalHarder: true,
    quantHarder: true,
    analyticalWriting: 4.0,
  });

  // GMAT State
  const [gmatQuant, setGmatQuant] = useState(75);
  const [gmatVerbal, setGmatVerbal] = useState(75);
  const [gmatDI, setGmatDI] = useState(75);

  // TOEFL State
  const [toeflScores, setToeflScores] = useState<TOEFLScores>({
    reading: 22,
    listening: 21,
    speaking: 20,
    writing: 22,
  });

  // IELTS State
  const [ieltsScores, setIeltsScores] = useState<IELTSScores>({
    listening: 7,
    reading: 7,
    writing: 6.5,
    speaking: 7,
  });

  // PTE State
  const [pteScores, setPteScores] = useState<PTEScores>({
    speaking: 70,
    reading: 68,
    listening: 72,
  });

  const [report, setReport] = useState<PerformanceReport | null>(null);

  useEffect(() => {
    if (slug) {
      const slugExam = slug.split("-")[0].toUpperCase() as ExamType;

      setSelectedExam(slugExam);
    }
  }, [slug]);

  const calculateReport = () => {
    let newReport: PerformanceReport;

    if (selectedExam === "SAT") {
      const result = calculateSATScore(satScores);
      const rwPercent = result.rwPercent;
      const mathPercent = result.mathPercent;

      newReport = {
        exam: "SAT",
        totalScore: result.total,
        sectionScores: {
          "Reading & Writing": result.rw,
          "Math": result.math,
        },
        percentages: {
          "Reading & Writing": rwPercent,
          "Math": mathPercent,
        },
        performanceLevel: getPerformanceLevel(Math.round((rwPercent + mathPercent) / 2)),
        strongestArea: rwPercent >= mathPercent ? "Reading & Writing" : "Math",
        weakestArea: rwPercent < mathPercent ? "Reading & Writing" : "Math",
        percentile: getPercentile(result.total, "SAT"),
      };
   } else if (selectedExam === "GRE") {
  const result = calculateGREScore(greScores);

  const verbalPercent = result.verbalPercent;
  const quantPercent = result.quantPercent;

  // Analytical Writing is scored out of 6
  const awPercent = Math.round((result.aw / 6) * 100);

  const percentages = {
    "Verbal Reasoning": verbalPercent,
    "Quantitative Reasoning": quantPercent,
    "Analytical Writing": awPercent,
  };

  const avgPercent =
    Object.values(percentages).reduce((a, b) => a + b, 0) /
    Object.values(percentages).length;

  newReport = {
    exam: "GRE",
    totalScore: result.total,

    sectionScores: {
      "Verbal Reasoning": result.verbal,
      "Quantitative Reasoning": result.quant,
      "Analytical Writing": result.aw,
    },

    percentages,

    performanceLevel: getPerformanceLevel(
      Math.round(avgPercent)
    ),

    strongestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0],

    weakestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] < b[1] ? a : b)
    )[0],

    percentile: getPercentile(result.total, "GRE"),
  };
    } else if (selectedExam === "GMAT") {
      const total = calculateGMATScore(gmatQuant, gmatVerbal, gmatDI);
      const quantPercent = Math.round(((gmatQuant - 60) / 30) * 100);
      const verbalPercent = Math.round(((gmatVerbal - 60) / 30) * 100);
      const diPercent = Math.round(((gmatDI - 60) / 30) * 100);

      newReport = {
        exam: "GMAT",
        totalScore: total,
        sectionScores: {
          "Quantitative": gmatQuant,
          "Verbal": gmatVerbal,
          "Data Insights": gmatDI,
        },
        percentages: {
          "Quantitative": quantPercent,
          "Verbal": verbalPercent,
          "Data Insights": diPercent,
        },
        performanceLevel: getPerformanceLevel(Math.round((quantPercent + verbalPercent + diPercent) / 3)),
        strongestArea: quantPercent >= verbalPercent && quantPercent >= diPercent ? "Quantitative" : verbalPercent >= diPercent ? "Verbal" : "Data Insights",
        weakestArea: quantPercent <= verbalPercent && quantPercent <= diPercent ? "Quantitative" : verbalPercent <= diPercent ? "Verbal" : "Data Insights",
        percentile: getPercentile(total, "GMAT"),
      };
  // =========================================================
// TOEFL
// =========================================================
} else if (selectedExam === "TOEFL") {
  const result = calculateTOEFLScore(toeflScores);

  // calculateTOEFLScore already returns percentages 0-100
  // Convert keys to match sectionScores exactly
  const percentages = {
    Reading: result.percentages.reading,
    Listening: result.percentages.listening,
    Speaking: result.percentages.speaking,
    Writing: result.percentages.writing,
  };

  const avgPercent =
    Object.values(percentages).reduce(
      (sum, value) => sum + value,
      0
    ) / Object.values(percentages).length;

  newReport = {
    exam: "TOEFL",

    totalScore: result.total,

    sectionScores: {
      Reading: toeflScores.reading,
      Listening: toeflScores.listening,
      Speaking: toeflScores.speaking,
      Writing: toeflScores.writing,
    },

    percentages,

    performanceLevel: getPerformanceLevel(
      Math.round(avgPercent)
    ),

    strongestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0],

    weakestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] < b[1] ? a : b)
    )[0],
  };


// =========================================================
// IELTS
// =========================================================
} else if (selectedExam === "IELTS") {
  const result = calculateIELTSScore(ieltsScores);

  /*
   * IMPORTANT:
   * Your IELTS input values are already BAND scores:
   *
   * Listening -> /9
   * Reading   -> /9
   * Writing   -> /9
   * Speaking  -> /9
   *
   * So calculateIELTSScore already converts them
   * into 0-100 percentages.
   */

  const percentages = {
    Listening: result.percentages.listening,
    Reading: result.percentages.reading,
    Writing: result.percentages.writing,
    Speaking: result.percentages.speaking,
  };

  const avgPercent =
    Object.values(percentages).reduce(
      (sum, value) => sum + value,
      0
    ) / Object.values(percentages).length;

  newReport = {
    exam: "IELTS",

    totalScore: result.total,

    sectionScores: {
      Listening: ieltsScores.listening,
      Reading: ieltsScores.reading,
      Writing: ieltsScores.writing,
      Speaking: ieltsScores.speaking,
    },

    percentages,

    performanceLevel: getPerformanceLevel(
      Math.round(avgPercent)
    ),

    strongestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0],

    weakestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] < b[1] ? a : b)
    )[0],
  };


// =========================================================
// PTE
// =========================================================
} else {
  const result = calculatePTEScore(pteScores);

  // Convert lowercase calculator keys
  // into the exact keys used by sectionScores
  const percentages = {
    "Speaking & Writing": result.percentages.speaking,
    Reading: result.percentages.reading,
    Listening: result.percentages.listening,
  };

  const avgPercent =
    Object.values(percentages).reduce(
      (sum, value) => sum + value,
      0
    ) / Object.values(percentages).length;

  newReport = {
    exam: "PTE",

    totalScore: result.total,

    sectionScores: {
      "Speaking & Writing": pteScores.speaking,
      Reading: pteScores.reading,
      Listening: pteScores.listening,
    },

    percentages,

    performanceLevel: getPerformanceLevel(
      Math.round(avgPercent)
    ),

    strongestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0],

    weakestArea: Object.entries(percentages).reduce(
      (a, b) => (a[1] < b[1] ? a : b)
    )[0],
  };
}

    setReport(newReport);
    setShowReport(true);
    setTimeout(() => {
      document.getElementById("performance-report")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSATModuleChange = (
    field: keyof SATScores,
    value: number,
    max: number
  ) => {
    setSatScores(prev => ({
      ...prev,
      [field]: Math.min(max, Math.max(0, value))
    }));
  };

  const handleGREChange = (
    field: keyof GREScores,
    value: number | boolean,
    max?: number
  ) => {
    setGreScores(prev => ({
      ...prev,
      [field]: max ? Math.min(max, Math.max(0, value as number)) : value
    }));
  };

  return (
    <main className="min-h-screen bg-[#FCF3ED]">
      <Hero data={pageInfo?.sections?.hero?.fields} />

    

      {/* Calculator Section */}
     {/* =========================================================
    CALCULATOR SECTION
    UI ONLY — NO LOGIC CHANGED
========================================================= */}
<section className="px-4 pb-10">
  <div className="mx-auto max-w-6xl">

    {/* OUTER WHITE CALCULATOR BOX */}
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <div className="flex items-center justify-between border-b border-slate-200 px-7 py-6">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
            SELECT YOUR EXAM
          </p>

          <h2 className="mt-1 text-[15px] font-extrabold text-[#0b1e3f]">
            Practice Score Calculator
          </h2>
        </div>

        {/* EXAM TABS */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">

          {(
            ["SAT", "GRE", "GMAT", "TOEFL", "IELTS", "PTE"] as ExamType[]
          ).map((exam) => (
            <button
              key={exam}
              type="button"
              onClick={() => {
                setSelectedExam(exam);
                setShowReport(false);
              }}
              className={`rounded-lg px-4 py-2 text-[12px] font-bold transition-all duration-200 ${
                selectedExam === exam
                  ? "bg-white text-[#F36D45] shadow-[0_2px_8px_rgba(15,23,42,0.10)]"
                  : "text-slate-600 hover:text-[#F36D45]"
              }`}
            >
              {exam}
            </button>
          ))}

        </div>
      </div>

      {/* =====================================================
          CALCULATOR CONTENT
      ===================================================== */}
      <div className="px-7 py-7">

        {/* PAGE TITLE */}
        <div className="mb-6 flex items-start justify-between">

          <div>
            <h2 className="text-[22px] font-extrabold tracking-tight text-[#0b1e3f]">
              Enter Your {selectedExam} Practice Scores
            </h2>

            <p className="mt-1 text-[13px] text-slate-400">
              Add your latest practice results below. We'll turn them into a
              clear performance report.
            </p>
          </div>

          <span className="rounded-lg bg-orange-50 px-3 py-2 text-[11px] font-bold text-[#F36D45]">
            {selectedExam}
          </span>

        </div>

        {/* =====================================================
            SAT
        ===================================================== */}
        {selectedExam === "SAT" && (
          <div className="space-y-3.5">

            {/* READING & WRITING */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              {/* LIGHT GRAY HEADER */}
              <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <BookOpen className="h-5 w-5 text-[#F36D45]" />
                  </div>

                  <div>
                    <h3 className="text-[14px] font-extrabold text-[#0b1e3f]">
                      Reading & Writing
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      SAT Practice Section
                    </p>
                  </div>

                </div>

                <span className="text-[10px] font-bold text-[#F36D45]">
                  2 Inputs
                </span>

              </div>

              {/* MODULES */}
              <div>

                {[
                  {
                    field: "readingWritingModule1" as keyof SATScores,
                    label: "Module 1",
                    max: 27,
                    value: satScores.readingWritingModule1,
                  },
                  {
                    field: "readingWritingModule2" as keyof SATScores,
                    label: "Module 2",
                    max: 27,
                    value: satScores.readingWritingModule2,
                  },
                ].map((item) => (

                  <div
                    key={item.field}
                    className="flex min-h-[66px] items-center border-t border-slate-100 px-4"
                  >

                    <span className="w-[150px] text-[12px] font-medium text-[#0b1e3f]">
                      {item.label}
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      {/* MINUS */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSATModuleChange(
                            item.field,
                            item.value - 1,
                            item.max
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      {/* SLIDER */}
                      <div className="relative flex-1">

                        <div className="h-[5px] overflow-hidden rounded-full bg-slate-200">

                          <div
                            className="h-full rounded-full bg-[#F36D45] transition-all duration-200"
                            style={{
                              width: `${(item.value / item.max) * 100}%`,
                            }}
                          />

                        </div>

                        <input
                          type="range"
                          min={0}
                          max={item.max}
                          value={item.value}
                          onChange={(e) =>
                            handleSATModuleChange(
                              item.field,
                              Number(e.target.value),
                              item.max
                            )
                          }
                          className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
                        />

                        {/* KNOB */}
                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white shadow-sm"
                          style={{
                            left: `calc(${(item.value / item.max) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      {/* PLUS */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSATModuleChange(
                            item.field,
                            item.value + 1,
                            item.max
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    {/* SCORE */}
                    <div className="w-[90px] text-right">

                      <span className="text-[14px] font-extrabold text-[#0b1e3f]">
                        {item.value}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        {" "}/ {item.max}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* MATH */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <Target className="h-5 w-5 text-[#7C4DFF]" />
                  </div>

                  <div>
                    <h3 className="text-[14px] font-extrabold text-[#0b1e3f]">
                      Math
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      SAT Practice Section
                    </p>
                  </div>

                </div>

                <span className="text-[10px] font-bold text-[#F36D45]">
                  2 Inputs
                </span>

              </div>

              <div>

                {[
                  {
                    field: "mathModule1" as keyof SATScores,
                    label: "Module 1",
                    max: 22,
                    value: satScores.mathModule1,
                  },
                  {
                    field: "mathModule2" as keyof SATScores,
                    label: "Module 2",
                    max: 22,
                    value: satScores.mathModule2,
                  },
                ].map((item) => (

                  <div
                    key={item.field}
                    className="flex min-h-[66px] items-center border-t border-slate-100 px-4"
                  >

                    <span className="w-[150px] text-[12px] font-medium text-[#0b1e3f]">
                      {item.label}
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleSATModuleChange(
                            item.field,
                            item.value - 1,
                            item.max
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45] transition-all duration-200"
                            style={{
                              width: `${(item.value / item.max) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={item.max}
                          value={item.value}
                          onChange={(e) =>
                            handleSATModuleChange(
                              item.field,
                              Number(e.target.value),
                              item.max
                            )
                          }
                          className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white shadow-sm"
                          style={{
                            left: `calc(${(item.value / item.max) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleSATModuleChange(
                            item.field,
                            item.value + 1,
                            item.max
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold text-[#0b1e3f]">
                        {item.value}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ {item.max}
                      </span>
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            GRE
        ===================================================== */}
        {selectedExam === "GRE" && (
          <div className="space-y-3.5">

            {[
              {
                title: "Verbal Reasoning",
                subtitle: "GRE Practice Section",
                icon: BookOpen,
                s1: greScores.verbalS1,
                s2: greScores.verbalS2,
                s1Key: "verbalS1" as keyof GREScores,
                s2Key: "verbalS2" as keyof GREScores,
                harderKey: "verbalHarder" as keyof GREScores,
                harder: greScores.verbalHarder,
              },
              {
                title: "Quantitative Reasoning",
                subtitle: "GRE Practice Section",
                icon: Target,
                s1: greScores.quantS1,
                s2: greScores.quantS2,
                s1Key: "quantS1" as keyof GREScores,
                s2Key: "quantS2" as keyof GREScores,
                harderKey: "quantHarder" as keyof GREScores,
                harder: greScores.quantHarder,
              },
            ].map((section) => {

              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >

                  {/* HEADER */}
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                        <Icon className="h-5 w-5 text-[#F36D45]" />
                      </div>

                      <div>
                        <h3 className="text-[14px] font-extrabold text-[#0b1e3f]">
                          {section.title}
                        </h3>

                        <p className="text-[10px] text-slate-400">
                          {section.subtitle}
                        </p>
                      </div>

                    </div>

                    <span className="text-[10px] font-bold text-[#F36D45]">
                      2 Inputs
                    </span>

                  </div>

                  {/* SECTION 1 */}
                  <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                    <span className="w-[150px] text-[12px] font-medium text-[#0b1e3f]">
                      Section 1
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleGREChange(
                            section.s1Key,
                            section.s1 - 1,
                            12
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45]"
                            style={{
                              width: `${(section.s1 / 12) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={12}
                          value={section.s1}
                          onChange={(e) =>
                            handleGREChange(
                              section.s1Key,
                              Number(e.target.value),
                              12
                            )
                          }
                          className="absolute inset-0 h-5 w-full opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                          style={{
                            left: `calc(${(section.s1 / 12) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleGREChange(
                            section.s1Key,
                            section.s1 + 1,
                            12
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold">
                        {section.s1}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ 12
                      </span>
                    </div>

                  </div>

                  {/* SECTION 2 */}
                  <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                    <span className="w-[150px] text-[12px] font-medium text-[#0b1e3f]">
                      Section 2
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleGREChange(
                            section.s2Key,
                            section.s2 - 1,
                            15
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45]"
                            style={{
                              width: `${(section.s2 / 15) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={15}
                          value={section.s2}
                          onChange={(e) =>
                            handleGREChange(
                              section.s2Key,
                              Number(e.target.value),
                              15
                            )
                          }
                          className="absolute inset-0 h-5 w-full opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                          style={{
                            left: `calc(${(section.s2 / 15) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleGREChange(
                            section.s2Key,
                            section.s2 + 1,
                            15
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold">
                        {section.s2}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ 15
                      </span>
                    </div>

                  </div>

                  {/* KEEP YOUR EXISTING DIFFICULTY LOGIC */}
                  <div className="border-t border-slate-100 bg-white px-4 py-3">

                    <div className="flex items-center justify-between">

                      <span className="text-[11px] font-medium text-slate-500">
                        Section 2 difficulty
                      </span>

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleGREChange(
                              section.harderKey,
                              true
                            )
                          }
                          className={`rounded-lg border px-3 py-1.5 text-[10px] font-bold ${
                            section.harder
                              ? "border-orange-300 bg-orange-50 text-[#F36D45]"
                              : "border-slate-200 text-slate-500"
                          }`}
                        >
                          Harder
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleGREChange(
                              section.harderKey,
                              false
                            )
                          }
                          className={`rounded-lg border px-3 py-1.5 text-[10px] font-bold ${
                            !section.harder
                              ? "border-orange-300 bg-orange-50 text-[#F36D45]"
                              : "border-slate-200 text-slate-500"
                          }`}
                        >
                          Easier
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

            {/* ANALYTICAL WRITING */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <TrendingUp className="h-5 w-5 text-[#F36D45]" />
                  </div>

                  <div>
                    <h3 className="text-[14px] font-extrabold text-[#0b1e3f]">
                      Analytical Writing
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      GRE Practice Section
                    </p>
                  </div>

                </div>

                <span className="text-[10px] font-bold text-[#F36D45]">
                  1 Input
                </span>

              </div>

              <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                <span className="w-[150px] text-[12px] font-medium">
                  Practice Band
                </span>

                <div className="flex flex-1 items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      handleGREChange(
                        "analyticalWriting",
                        greScores.analyticalWriting - 0.5
                      )
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="relative flex-1">

                    <div className="h-[5px] rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#F36D45]"
                        style={{
                          width: `${(greScores.analyticalWriting / 6) * 100}%`,
                        }}
                      />
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={6}
                      step={0.5}
                      value={greScores.analyticalWriting}
                      onChange={(e) =>
                        handleGREChange(
                          "analyticalWriting",
                          Number(e.target.value)
                        )
                      }
                      className="absolute inset-0 h-5 w-full opacity-0"
                    />

                    <div
                      className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                      style={{
                        left: `calc(${(greScores.analyticalWriting / 6) * 100}% - 9px)`,
                      }}
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleGREChange(
                        "analyticalWriting",
                        greScores.analyticalWriting + 0.5
                      )
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                </div>

                <div className="w-[90px] text-right">
                  <span className="text-[14px] font-extrabold">
                    {greScores.analyticalWriting}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {" "}/ 6
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            GMAT
        ===================================================== */}
        {selectedExam === "GMAT" && (
          <div className="space-y-3.5">

            {[
              {
                label: "Quantitative Reasoning",
                value: gmatQuant,
                setter: setGmatQuant,
                max: 90,
              },
              {
                label: "Verbal Reasoning",
                value: gmatVerbal,
                setter: setGmatVerbal,
                max: 90,
              },
              {
                label: "Data Insights",
                value: gmatDI,
                setter: setGmatDI,
                max: 90,
              },
            ].map((section) => (

              <div
                key={section.label}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >

                <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                      <Target className="h-5 w-5 text-[#F36D45]" />
                    </div>

                    <div>
                      <h3 className="text-[14px] font-extrabold">
                        {section.label}
                      </h3>

                      <p className="text-[10px] text-slate-400">
                        GMAT Practice Section
                      </p>
                    </div>

                  </div>

                  <span className="text-[10px] font-bold text-[#F36D45]">
                    1 Input
                  </span>

                </div>

                <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                  <span className="w-[150px] text-[12px] font-medium">
                    Correct Answers
                  </span>

                  <div className="flex flex-1 items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        section.setter(
                          Math.max(60, section.value - 1)
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="relative flex-1">

                      <div className="h-[5px] rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-[#F36D45]"
                          style={{
                            width: `${((section.value - 60) / 30) * 100}%`,
                          }}
                        />

                      </div>

                      <input
                        type="range"
                        min={60}
                        max={90}
                        value={section.value}
                        onChange={(e) =>
                          section.setter(Number(e.target.value))
                        }
                        className="absolute inset-0 h-5 w-full opacity-0"
                      />

                      <div
                        className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                        style={{
                          left: `calc(${((section.value - 60) / 30) * 100}% - 9px)`,
                        }}
                      />

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        section.setter(
                          Math.min(90, section.value + 1)
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                  </div>

                  <div className="w-[90px] text-right">
                    <span className="text-[14px] font-extrabold">
                      {section.value}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {" "}/ 90
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* =====================================================
            TOEFL
        ===================================================== */}
        {selectedExam === "TOEFL" && (
          <div className="space-y-3.5">

            {[
              "reading",
              "listening",
              "speaking",
              "writing",
            ].map((section) => {

              const value =
                toeflScores[section as keyof TOEFLScores];

              return (
                <div
                  key={section}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >

                  <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                        <BookOpen className="h-5 w-5 text-[#F36D45]" />
                      </div>

                      <div>
                        <h3 className="text-[14px] font-extrabold capitalize">
                          {section}
                        </h3>

                        <p className="text-[10px] text-slate-400">
                          TOEFL Practice Section
                        </p>
                      </div>

                    </div>

                    <span className="text-[10px] font-bold text-[#F36D45]">
                      1 Input
                    </span>

                  </div>

                  <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                    <span className="w-[150px] text-[12px] font-medium">
                      Practice Score
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setToeflScores((prev) => ({
                            ...prev,
                            [section]: Math.max(0, value - 1),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45]"
                            style={{
                              width: `${(value / 30) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={value}
                          onChange={(e) =>
                            setToeflScores((prev) => ({
                              ...prev,
                              [section]: Number(e.target.value),
                            }))
                          }
                          className="absolute inset-0 h-5 w-full opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                          style={{
                            left: `calc(${(value / 30) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setToeflScores((prev) => ({
                            ...prev,
                            [section]: Math.min(30, value + 1),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold">
                        {value}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ 30
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* =====================================================
            IELTS
        ===================================================== */}
        {selectedExam === "IELTS" && (
          <div className="space-y-3.5">

            {[
              "listening",
              "reading",
              "writing",
              "speaking",
            ].map((section) => {

              const value =
                ieltsScores[section as keyof IELTSScores];

              return (
                <div
                  key={section}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >

                  <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                        <BookOpen className="h-5 w-5 text-[#F36D45]" />
                      </div>

                      <div>
                        <h3 className="text-[14px] font-extrabold capitalize">
                          {section}
                        </h3>

                        <p className="text-[10px] text-slate-400">
                          IELTS Practice Section
                        </p>
                      </div>

                    </div>

                    <span className="text-[10px] font-bold text-[#F36D45]">
                      1 Input
                    </span>

                  </div>

                  <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                    <span className="w-[150px] text-[12px] font-medium">
                      {section === "writing" || section === "speaking"
                        ? "Practice Band"
                        : "Correct Answers"}
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setIeltsScores((prev) => ({
                            ...prev,
                            [section]: Math.max(0, value - 0.5),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45]"
                            style={{
                              width: `${(value / 9) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={9}
                          step={0.5}
                          value={value}
                          onChange={(e) =>
                            setIeltsScores((prev) => ({
                              ...prev,
                              [section]: Number(e.target.value),
                            }))
                          }
                          className="absolute inset-0 h-5 w-full opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                          style={{
                            left: `calc(${(value / 9) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setIeltsScores((prev) => ({
                            ...prev,
                            [section]: Math.min(9, value + 0.5),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold">
                        {value}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ 9
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* =====================================================
            PTE
        ===================================================== */}
        {selectedExam === "PTE" && (
          <div className="space-y-3.5">

            {[
              {
                key: "speaking",
                label: "Speaking & Writing",
              },
              {
                key: "reading",
                label: "Reading",
              },
              {
                key: "listening",
                label: "Listening",
              },
            ].map((section) => {

              const value =
                pteScores[section.key as keyof PTEScores];

              return (
                <div
                  key={section.key}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >

                  <div className="flex items-center justify-between bg-slate-50 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                        <Target className="h-5 w-5 text-[#F36D45]" />
                      </div>

                      <div>
                        <h3 className="text-[14px] font-extrabold">
                          {section.label}
                        </h3>

                        <p className="text-[10px] text-slate-400">
                          PTE Practice Section
                        </p>
                      </div>

                    </div>

                    <span className="text-[10px] font-bold text-[#F36D45]">
                      1 Input
                    </span>

                  </div>

                  <div className="flex min-h-[66px] items-center border-t border-slate-100 px-4">

                    <span className="w-[150px] text-[12px] font-medium">
                      Practice Score
                    </span>

                    <div className="flex flex-1 items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setPteScores((prev) => ({
                            ...prev,
                            [section.key]: Math.max(10, value - 1),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <div className="relative flex-1">

                        <div className="h-[5px] rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#F36D45]"
                            style={{
                              width: `${((value - 10) / 80) * 100}%`,
                            }}
                          />
                        </div>

                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={value}
                          onChange={(e) =>
                            setPteScores((prev) => ({
                              ...prev,
                              [section.key]: Number(e.target.value),
                            }))
                          }
                          className="absolute inset-0 h-5 w-full opacity-0"
                        />

                        <div
                          className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[4px] border-[#F36D45] bg-white"
                          style={{
                            left: `calc(${((value - 10) / 80) * 100}% - 9px)`,
                          }}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setPteScores((prev) => ({
                            ...prev,
                            [section.key]: Math.min(90, value + 1),
                          }))
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-[#F36D45] hover:text-[#F36D45]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    <div className="w-[90px] text-right">
                      <span className="text-[14px] font-extrabold">
                        {value}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {" "}/ 90
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* =====================================================
            BOTTOM ACTION AREA
        ===================================================== */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">

          <p className="text-[11px] text-slate-400">
            Your results are used only to create an estimated preparation
            analysis.
          </p>

          <button
            type="button"
            onClick={calculateReport}
            className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
          >
            View My Performance Report →
          </button>

        </div>

      </div>
    </div>
  </div>
</section>

      {/* Performance Report Section - Shows BELOW calculator */}
      {showReport && report && (
        <section id="performance-report" className="px-4 pb-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F36D45]">YOUR PERFORMANCE REPORT</p>
                <h2 className="mt-1 text-3xl font-extrabold">Here's Where You Stand</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">Review your overall performance, section strengths and the areas that may need more focused preparation.</p>
              </div>
              <span className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45] sm:block">{report.exam}</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.5fr_1.5fr]">
              {/* Overall Performance Gauge - EXACT MATCH TO REFERENCE */}
              {/* Overall Performance */}
              <div className="rounded-[22px] border border-slate-200 bg-white px-8 py-7 shadow-sm">

                {/* Header */}
                <div>
                  <h3 className="text-[18px] font-extrabold tracking-tight text-[#0b1e3f]">
                    Overall Performance
                  </h3>

                  <p className="mt-1.5 text-[14px] text-slate-400">
                    Based on the practice scores you entered.
                  </p>
                </div>


                {/* Gauge */}
                <div className="relative mt-5 flex justify-center">

                  <div className="relative h-[225px] w-[400px] max-w-full">

                    <svg
                      viewBox="0 0 400 225"
                      className="h-full w-full overflow-visible"
                    >

                      {/* ================= BACKGROUND / SEGMENTS ================= */}

                      {/* Needs Improvement */}
                      <path
                        d="M 45 190 A 155 155 0 0 1 87 80"
                        fill="none"
                        stroke="#FFDFA9"
                        strokeWidth="44"
                        strokeLinecap="butt"
                      />

                      {/* Developing - Light */}
                      <path
                        d="M 87 80 A 155 155 0 0 1 155 43"
                        fill="none"
                        stroke="#FFB18E"
                        strokeWidth="44"
                        strokeLinecap="butt"
                      />

                      {/* Developing - Main */}
                      <path
                        d="M 155 43 A 155 155 0 0 1 245 43"
                        fill="none"
                        stroke="#FF927D"
                        strokeWidth="44"
                        strokeLinecap="butt"
                      />

                      {/* Strong - Light */}
                      <path
                        d="M 245 43 A 155 155 0 0 1 313 80"
                        fill="none"
                        stroke="#FF704A"
                        strokeWidth="44"
                        strokeLinecap="butt"
                      />

                      {/* Strong */}
                      <path
                        d="M 313 80 A 155 155 0 0 1 355 190"
                        fill="none"
                        stroke="#FF5D3D"
                        strokeWidth="44"
                        strokeLinecap="butt"
                      />


                      {/* ================= NEEDLE ================= */}

                      {(() => {
                        const percentage = Math.round(
                          Object.values(report.percentages).reduce(
                            (a, b) => a + b,
                            0,
                          ) / Object.values(report.percentages).length,
                        );

                        /*
                         * Convert 0–100 percentage
                         * into 180° gauge angle.
                         *
                         * 0   = left
                         * 50  = center
                         * 100 = right
                         */
                        const angle = 180 - percentage * 1.8;

                        const centerX = 200;
                        const centerY = 190;
                        const needleLength = 105;

                        const radians = (angle * Math.PI) / 180;

                        const needleX =
                          centerX + needleLength * Math.cos(radians);

                        const needleY =
                          centerY - needleLength * Math.sin(radians);

                        return (
                          <>
                            {/* Needle */}
                            <line
                              x1={centerX}
                              y1={centerY}
                              x2={needleX}
                              y2={needleY}
                              stroke="#0b1e3f"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />

                            {/* Needle center */}
                            <circle
                              cx={centerX}
                              cy={centerY}
                              r="10"
                              fill="#0b1e3f"
                            />

                            {/* Small center highlight */}
                            <circle
                              cx={centerX}
                              cy={centerY}
                              r="4"
                              fill="white"
                            />
                          </>
                        );
                      })()}

                    </svg>


                    {/* ================= CENTER VALUE ================= */}

                    <div className="absolute left-1/2 top-[82px] flex -translate-x-1/2 flex-col items-center">

                      <span className="text-[52px] font-black leading-none tracking-[-2px] text-[#0b1e3f]">
                        {Math.round(
                          Object.values(report.percentages).reduce(
                            (a, b) => a + b,
                            0,
                          ) / Object.values(report.percentages).length,
                        )}
                        %
                      </span>

                      <span className="mt-2 text-[14px] font-extrabold text-[#F36D45]">
                        {report.performanceLevel}
                      </span>

                    </div>

                  </div>
                </div>


                {/* ================= LABELS ================= */}

                <div className="-mt-1 flex items-center justify-between text-[11px] font-medium text-slate-400">

                  <span>
                    Needs Improvement
                  </span>

                  <span className="translate-x-1">
                    Developing
                  </span>

                  <span>
                    Strong
                  </span>

                </div>

              </div>

              {/* Estimated Score */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">ESTIMATED SCORE</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-[#0b1e3f]">{report.totalScore}</span>
                  <span className="ml-1 text-lg font-medium text-slate-400">
                    {report.exam === "SAT" ? "/1600" : report.exam === "GRE" ? "/340" : report.exam === "GMAT" ? "/805" : report.exam === "TOEFL" ? "/120" : report.exam === "IELTS" ? "/9" : "/90"}
                  </span>
                  {report.percentile && (
                    <span className="ml-4 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">{report.percentile} Percentile</span>
                  )}
                </div>

                <div className="space-y-4">
                  {Object.entries(report.sectionScores).map(([section, score]) => (
                    <div key={section}>
                      <div className="mb-2 flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {section.includes("Reading") || section.includes("Verbal") ? <BookOpen className="h-4 w-4 text-slate-400" /> : <Target className="h-4 w-4 text-slate-400" />}
                          <span className="font-medium">{section}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">{report.percentages[section]}%</span>
                          <p className="text-xs text-slate-400">{getPerformanceLevel(report.percentages[section])}</p>
                        </div>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-orange-300 to-orange-500 transition-all" style={{ width: `${report.percentages[section]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Priority Area */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">YOUR PRIORITY AREA</span>
                </div>
                <h3 className="text-2xl font-bold">Focus on {report.weakestArea}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Your current {report.weakestArea} performance shows an opportunity to improve concept clarity, calculation accuracy and timed problem-solving. Review weaker concepts first and strengthen them through targeted question practice.</p>
                <div className="mt-6">
                  <h4 className="text-sm font-bold">Recommended focus</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {["Concept Revision", "Targeted Questions", "Timed Problem Solving", "Mistake Review"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100"><TrendingUp className="h-3 w-3 text-[#F36D45]" /></div>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm"><GraduationCap className="h-6 w-6 text-[#F36D45]" /></div>
                <h3 className="text-lg font-bold">Turn Your Weak Area Into a Strength</h3>
                <p className="mt-3 text-sm leading-5 text-slate-600">Strengthen your {report.weakestArea} preparation with structured lessons, targeted practice, mock tests and expert guidance through Ooshas Prep online coaching.</p>
                <button className="mt-5 w-full rounded-xl bg-[#F36D45] px-4 py-3 text-sm font-bold text-white transition hover:brightness-95">Explore {report.exam} Course →</button>
              </div>
            </div>

            {/* Strongest Area & Next Steps */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">YOUR STRONGEST AREA</span>
                </div>
                <h3 className="text-xl font-bold">{report.strongestArea}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{report.strongestArea} is currently your strongest area at {report.percentages[report.strongestArea]}% performance. Keep practising this section regularly while giving additional preparation time to {report.weakestArea}.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">RECOMMENDED NEXT STEP</span>
                </div>
                <h3 className="text-xl font-bold">Build Your {report.weakestArea}</h3>
                <ol className="mt-4 space-y-3">
                  {[`Identify weaker topics within ${report.weakestArea}`, "Complete targeted practice sets", "Introduce regular timed sectional practice", "Review mistakes before attempting the next test"].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#F36D45]">{i + 1}</span>
                      <span className="text-sm text-slate-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500">
              This {report.exam} score calculator provides an estimated practice-performance analysis for preparation and planning purposes only. It should not be considered an official {report.exam} result.
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Download className="h-4 w-4 text-[#F36D45]" />
                Download Report PDF
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-[#F36D45] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-95">
                Explore {report.exam} Course
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Original Sections */}
      <WhySection data={pageInfo?.sections?.whySection?.fields} />
      <DifferenceSection data={pageInfo?.sections?.differenceSection?.fields} />
      <BeyondNumberSection data={pageInfo?.sections?.beyondNumber?.fields} />
      <QuestionsSection page="Calculator" heading="Student Questions & Comments" />
      <Consultants data={pageInfo?.sections?.faq} />
      <BottomCTA data={pageInfo?.sections?.bottomCTA?.fields} />
    </main>
  );
}

// Keep all your original helper components unchanged
function Hero({ data }: { data: any }) {
  const title = data?.title || "";
  const [firstPart, ...rest] = title.split("||");

  return (
    <section className="relative overflow-hidden bg-[#fcf3ed]">
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-16 lg:pb-20 lg:pt-20">
        <h1 className="mx-auto max-w-7xl text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-5xl">
          {rest.length > 0 ? (
            <>
              {firstPart.trim()} &{" "}
              <span style={{ color: "#f36d45" }}>
                {rest.join("&")}
              </span>
            </>
          ) : (
            title
          )}
        </h1>
        <div className="mx-auto mt-5 max-w-3xl text-sm leading-6 sm:text-base sm:leading-7" dangerouslySetInnerHTML={{ __html: data?.description || "" }} />
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {data?.primaryButtonText && (
            <a href={data?.primaryButtonUrl || "#calculator"} className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 sm:w-auto" style={{ background: "#F36D45" }}>
              {data.primaryButtonText}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function WhySection({ data }: { data: any }) {
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const router = useRouter();
  return (
    <section className="bg-[#fcf3ed] px-4 py-16 text-[#0b1e3f]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">More Than A Number</div>
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">{data?.title || ""}</h2>
          <div className="mt-5 max-w-3xl text-sm leading-6 text-[#0b1e3f]/80" dangerouslySetInnerHTML={{ __html: data?.description || "" }} />
          <button className="mt-7 px-5 py-3 text-xm font-bold text-white" onClick={() => router.push(data.buttonUrl)} style={{ background: "#F36D45" }}>{data?.buttonText || "Start Your Preparation"}</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data?.statistics?.map(({ number, label }: any, index: number) => (
            <div key={`${label}-${index}`} className="rounded-xl border border-[#0b1e3f]/10 bg-[#0b1e3f]/5 p-5">
              <p className="text-xl font-black text-[#0b1e3f]">{number}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#0b1e3f]/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setisPopupOpen} />
    </section>
  );
}

function DifferenceSection({ data }: { data: any }) {
  return (
    <section id="how-it-works" className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="OUR DIFFERENCE" title={data?.title || ""} description={data?.description || ""} />
        {data?.Data && <EditorContent content_data={data.Data} />}
      </div>
    </section>
  );
}

function BeyondNumberSection({ data }: { data: any }) {
  const iconMap: Record<string, any> = { TrendingUp, Target, GraduationCap, Trophy, MapPin, Sparkles, Users, Star, Search, Info };
  const features = Array.isArray(data?.features) ? data.features : [];

  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="BEYOND THE NUMBER" title={data?.title || ""} description={data?.description || ""} />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: any, index: number) => {
            const Icon = iconMap[feature?.icon] || Sparkles;
            return (
              <div key={`${feature?.title || "feature"}-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F36D45]"><Icon className="h-4 w-4" /></div>
                <h3 className="text-sm font-extrabold">{feature?.title || ""}</h3>
                <p className="mt-2 text-[14px] leading-5 text-slate-500">{feature?.text || ""}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BottomCTA({ data }: { data: any }) {
  const [isPopupOpen, setisPopupOpen] = useState(false);
  return (
    <div>
      <section id="contact" className="bg-white px-4 pb-5">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10" style={{ background: "#F36D45" }}>
          <h2 className="text-xl font-black text-white sm:text-2xl">{data?.title || ""}</h2>
          <p className="mx-auto mt-2 max-w-xl whitespace-pre-line text-sm leading-5 text-white/80">{data?.description || ""}</p>
          <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
            {data?.primaryButtonText && (
              <a onClick={() => setisPopupOpen(true)} className="cursor-pointer bg-[#0b1e3f] px-5 py-3 text-sm font-bold text-white">{data.primaryButtonText}</a>
            )}
            {data?.secondaryButtonText && (
              <a href={data?.secondaryButtonUrl || "#"} className="bg-white px-5 py-3 text-sm font-bold text-[#0b1e3f]">{data.secondaryButtonText}</a>
            )}
          </div>
        </div>
      </section>
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setisPopupOpen} />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <div className="mx-auto text-center">
      <h2 className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}>{title}</h2>
      <p className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}