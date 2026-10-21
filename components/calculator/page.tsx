"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
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
import { GlobalProvider, useGlobal } from "@/hooks/AppStateContext";

const ORANGE = "#ff7a2a";
const NAVY = "#0b1e3f";

const CALCULATOR_RANGE_INPUT_CLASS =
  "absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36D45] [&::-webkit-slider-runnable-track]:h-[14px] [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F36D45] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:bg-[#FF855F] hover:[&::-webkit-slider-thumb]:shadow-[0_3px_10px_rgba(243,109,69,0.4)] [&::-moz-range-track]:h-[14px] [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F36D45] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-110 hover:[&::-moz-range-thumb]:bg-[#FF855F] hover:[&::-moz-range-thumb]:shadow-[0_3px_10px_rgba(243,109,69,0.4)]";

type ExamType = "SAT" | "GRE" | "GMAT" | "TOEFL" | "IELTS" | "PTE";

type SATScores = {
  readingWritingModule1: number;
  readingWritingModule2: number;
  mathModule1: number;
  mathModule2: number;
};

type SATSectionScores = { rw: number; math: number };

type GREScores = {
  verbalS1: number;
  verbalS2: number;
  quantS1: number;
  quantS2: number;
  analyticalWriting: number;
};

type GRESectionScores = { verbal: number; quant: number };

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

type IELTSRawSection = "listening" | "reading";
type IELTSReadingType = "academic" | "general";

// IELTS publishes these average raw-score anchors; exact boundaries vary by test.
// Interpolate between anchors to give a clearly labelled practice estimate.
const IELTS_RAW_ANCHORS: Record<
  "listening" | IELTSReadingType,
  [number, number][]
> = {
  listening: [
    [0, 0],
    [16, 5],
    [23, 6],
    [30, 7],
    [35, 8],
    [40, 9],
  ],
  academic: [
    [0, 0],
    [15, 5],
    [23, 6],
    [30, 7],
    [35, 8],
    [40, 9],
  ],
  general: [
    [0, 0],
    [15, 4],
    [23, 5],
    [30, 6],
    [35, 7],
    [40, 9],
  ],
};

function estimateIELTSBand(
  correct: number,
  section: IELTSRawSection,
  readingType: IELTSReadingType,
): number {
  const anchors =
    IELTS_RAW_ANCHORS[section === "listening" ? "listening" : readingType];
  const safeCorrect = Math.min(40, Math.max(0, correct));
  const upperIndex = anchors.findIndex(([marks]) => marks >= safeCorrect);
  if (upperIndex <= 0) return safeCorrect === 0 ? 0 : 9;
  const [lowerMarks, lowerBand] = anchors[upperIndex - 1];
  const [upperMarks, upperBand] = anchors[upperIndex];
  const interpolated =
    lowerBand +
    ((safeCorrect - lowerMarks) / (upperMarks - lowerMarks)) *
      (upperBand - lowerBand);
  return Math.max(1, Math.min(9, Math.round(interpolated * 2) / 2));
}

type PTEScores = {
  speaking: number;
  writing: number;
  reading: number;
  listening: number;
};

type PTEType = "academic" | "core";

// Pearson's published PTE Core to Canadian Language Benchmark thresholds.
const PTE_CORE_CLB_MINIMUMS: Record<keyof PTEScores, [number, number][]> = {
  listening: [
    [10, 89],
    [9, 82],
    [8, 71],
    [7, 60],
    [6, 50],
    [5, 39],
    [4, 28],
    [3, 18],
  ],
  reading: [
    [10, 88],
    [9, 78],
    [8, 69],
    [7, 60],
    [6, 51],
    [5, 42],
    [4, 33],
    [3, 24],
  ],
  speaking: [
    [10, 89],
    [9, 84],
    [8, 76],
    [7, 68],
    [6, 59],
    [5, 51],
    [4, 42],
    [3, 34],
  ],
  writing: [
    [10, 90],
    [9, 88],
    [8, 79],
    [7, 69],
    [6, 60],
    [5, 51],
    [4, 41],
    [3, 32],
  ],
};

function getPTECoreCLB(skill: keyof PTEScores, score: number): string {
  const level = PTE_CORE_CLB_MINIMUMS[skill].find(
    ([, minimum]) => score >= minimum,
  );
  return level ? `CLB ${level[0]}` : "Below CLB 3";
}

type PerformanceReport = {
  exam: ExamType;
  totalScore: number | null;
  sectionScores: Record<string, number>;
  percentages: Record<string, number>;
  performanceLevel: string;
  strongestArea: string;
  weakestArea: string;
};

// Raw correct counts alone cannot reproduce College Board's adaptive/IRT score.
// This linear conversion is a rounded practice estimate, not an official lookup.
function calculateSATScore(
  scores: SATScores,
  official?: SATSectionScores,
): {
  total: number;
  rw: number;
  math: number;
  rwPercent: number;
  mathPercent: number;
} {
  const rwRaw = scores.readingWritingModule1 + scores.readingWritingModule2;
  const mathRaw = scores.mathModule1 + scores.mathModule2;

  const rwScaled =
    official?.rw ?? Math.round((200 + (rwRaw / 54) * 600) / 10) * 10;
  const mathScaled =
    official?.math ?? Math.round((200 + (mathRaw / 44) * 600) / 10) * 10;

  return {
    total: Math.round(rwScaled + mathScaled),
    rw: Math.round(rwScaled),
    math: Math.round(mathScaled),
    rwPercent: official
      ? Math.round(((rwScaled - 200) / 600) * 100)
      : Math.round((rwRaw / 54) * 100),
    mathPercent: official
      ? Math.round(((mathScaled - 200) / 600) * 100)
      : Math.round((mathRaw / 44) * 100),
  };
}

// ETS equates the section-adaptive test. Raw counts can only give a rough
// practice estimate; reported section scores give an exact Verbal + Quant sum.
function calculateGREScore(
  scores: GREScores,
  official?: GRESectionScores,
): {
  total: number;
  verbal: number;
  quant: number;
  aw: number;
  verbalPercent: number;
  quantPercent: number;
} {
  const verbalRaw = scores.verbalS1 + scores.verbalS2;
  const quantRaw = scores.quantS1 + scores.quantS2;

  const verbalScaled =
    official?.verbal ?? Math.round(130 + (verbalRaw / 27) * 40);
  const quantScaled = official?.quant ?? Math.round(130 + (quantRaw / 27) * 40);

  return {
    total: verbalScaled + quantScaled,
    verbal: verbalScaled,
    quant: quantScaled,
    aw: scores.analyticalWriting,
    verbalPercent: official
      ? Math.round(((verbalScaled - 130) / 40) * 100)
      : Math.round((verbalRaw / 27) * 100),
    quantPercent: official
      ? Math.round(((quantScaled - 130) / 40) * 100)
      : Math.round((quantRaw / 27) * 100),
  };
}

// GMAT Scoring
function calculateGMATScore(quant: number, verbal: number, di: number): number {
  // Practice estimate: the three sections contribute equally, but GMAC's
  // official adaptive scoring also depends on question-level performance.
  const average = (quant + verbal + di) / 3;
  const position = Math.min(1, Math.max(0, (average - 60) / 30));
  return 205 + Math.round(position * 60) * 10;
}

type TOEFLScale = "current" | "legacy";

// Since January 21, 2026, ETS reports 1–6 section bands and rounds their
// average to the nearest half band (ties round up). Older reports use 0–30
// section scores whose sum is the 0–120 total.
function calculateTOEFLScore(scores: TOEFLScores, scale: TOEFLScale): {
  total: number;
  percentages: Record<string, number>;
} {
  const sectionScores = [scores.reading, scores.listening, scores.speaking, scores.writing];
  const sum = sectionScores.reduce((total, score) => total + score, 0);
  const total = scale === "current" ? Math.round((sum / 4) * 2) / 2 : sum;
  const percent = (score: number) =>
    Math.round((scale === "current" ? (score - 1) / 5 : score / 30) * 100);
  const percentages = {
    reading: percent(scores.reading),
    listening: percent(scores.listening),
    speaking: percent(scores.speaking),
    writing: percent(scores.writing),
  };
  return { total, percentages };
}

function getTOEFLCEFR(band: number): string {
  if (band >= 6) return "C2";
  if (band >= 5) return "C1";
  if (band >= 4) return "B2";
  if (band >= 3) return "B1";
  if (band >= 2) return "A2";
  return "A1";
}

// IELTS Scoring
function calculateIELTSScore(scores: IELTSScores): {
  total: number;
  percentages: Record<string, number>;
} {
  const total =
    (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;
  const roundedTotal = Math.round(total * 2) / 2; // IELTS rounds .25 and .75 up.
  const percentages = {
    listening: Math.round((scores.listening / 9) * 100),
    reading: Math.round((scores.reading / 9) * 100),
    writing: Math.round((scores.writing / 9) * 100),
    speaking: Math.round((scores.speaking / 9) * 100),
  };
  return { total: roundedTotal, percentages };
}

// PTE Scoring
function calculatePTEScore(scores: PTEScores): {
  estimatedOverall: number;
  percentages: Record<string, number>;
} {
  // Practice estimate only: Pearson calculates the official overall score from test items.
  const estimatedOverall = Math.round(
    (scores.speaking + scores.writing + scores.reading + scores.listening) / 4,
  );
  const percentages = {
    speaking: Math.round(((scores.speaking - 10) / 80) * 100),
    writing: Math.round(((scores.writing - 10) / 80) * 100),
    reading: Math.round(((scores.reading - 10) / 80) * 100),
    listening: Math.round(((scores.listening - 10) / 80) * 100),
  };
  return { estimatedOverall, percentages };
}

function getPerformanceLevel(percent: number): string {
  if (percent >= 85) return "Advanced";
  if (percent >= 70) return "Proficient";
  if (percent >= 55) return "Developing";
  return "Needs Improvement";
}

export default function ScoreCalculatorPage({ pageInfo, slug }: any) {
  const router = useRouter();
  const { userInfo, user } = useGlobal();
  const [selectedExam, setSelectedExam] = useState<ExamType>(() => {
    const exam = String(slug || "")
      .split("-")[0]
      .toUpperCase();
    return ["SAT", "GRE", "GMAT", "TOEFL", "IELTS", "PTE"].includes(exam)
      ? (exam as ExamType)
      : "SAT";
  });
  const [showReport, setShowReport] = useState(false);

  // SAT State
  const [satScores, setSatScores] = useState<SATScores>({
    readingWritingModule1: 18,
    readingWritingModule2: 17,
    mathModule1: 12,
    mathModule2: 11,
  });
  const [satInputMode, setSatInputMode] = useState<"questions" | "sections">(
    "questions",
  );
  const [satSectionScores, setSatSectionScores] = useState<SATSectionScores>({
    rw: 600,
    math: 600,
  });
  const getSATResult = () =>
    calculateSATScore(
      satScores,
      satInputMode === "sections" ? satSectionScores : undefined,
    );

  // GRE State
  const [greScores, setGreScores] = useState<GREScores>({
    verbalS1: 10,
    verbalS2: 12,
    quantS1: 10,
    quantS2: 11,
    analyticalWriting: 4.0,
  });
  const [greInputMode, setGreInputMode] = useState<"questions" | "sections">(
    "questions",
  );
  const [greSectionScores, setGreSectionScores] = useState<GRESectionScores>({
    verbal: 150,
    quant: 150,
  });
  const getGREResult = () =>
    calculateGREScore(
      greScores,
      greInputMode === "sections" ? greSectionScores : undefined,
    );
  // GMAT State
  const [gmatQuant, setGmatQuant] = useState(75);
  const [gmatVerbal, setGmatVerbal] = useState(75);
  const [gmatDI, setGmatDI] = useState(75);

  // TOEFL State
  const [toeflScale, setToeflScale] = useState<TOEFLScale>("current");
  const [toeflBands, setToeflBands] = useState<TOEFLScores>({
    reading: 4.5,
    listening: 4.5,
    speaking: 4,
    writing: 4,
  });
  const [toeflScores, setToeflScores] = useState<TOEFLScores>({
    reading: 22,
    listening: 21,
    speaking: 20,
    writing: 22,
  });
  const activeTOEFLScores = toeflScale === "current" ? toeflBands : toeflScores;
  const getTOEFLResult = () => calculateTOEFLScore(activeTOEFLScores, toeflScale);

  // IELTS State
  const [ieltsScores, setIeltsScores] = useState<IELTSScores>({
    listening: 7,
    reading: 7,
    writing: 6.5,
    speaking: 7,
  });
  const [ieltsRawScores, setIeltsRawScores] = useState({
    listening: 30,
    reading: 30,
  });
  const [ieltsInputMode, setIeltsInputMode] = useState<
    Record<IELTSRawSection, "correct" | "band">
  >({ listening: "correct", reading: "correct" });
  const [ieltsReadingType, setIeltsReadingType] =
    useState<IELTSReadingType>("academic");
  const effectiveIeltsScores: IELTSScores = {
    ...ieltsScores,
    listening:
      ieltsInputMode.listening === "correct"
        ? estimateIELTSBand(
            ieltsRawScores.listening,
            "listening",
            ieltsReadingType,
          )
        : ieltsScores.listening,
    reading:
      ieltsInputMode.reading === "correct"
        ? estimateIELTSBand(ieltsRawScores.reading, "reading", ieltsReadingType)
        : ieltsScores.reading,
  };

  // PTE State
  const [pteScores, setPteScores] = useState<PTEScores>({
    speaking: 70,
    writing: 70,
    reading: 68,
    listening: 72,
  });
  const [pteType, setPteType] = useState<PTEType>("academic");
  const [pteOfficialOverall, setPteOfficialOverall] = useState<number | null>(
    null,
  );

  const [report, setReport] = useState<PerformanceReport | null>(null);

  useEffect(() => {
    setShowReport(false);
  }, [
    selectedExam,
    satScores,
    satInputMode,
    satSectionScores,
    greScores,
    greInputMode,
    greSectionScores,
    gmatQuant,
    gmatVerbal,
    gmatDI,
    toeflScores,
    toeflBands,
    toeflScale,
    ieltsScores,
    ieltsRawScores,
    ieltsInputMode,
    ieltsReadingType,
    pteScores,
    pteType,
    pteOfficialOverall,
  ]);

  useEffect(() => {
    if (slug) {
      const slugExam = slug.split("-")[0].toUpperCase() as ExamType;
      setSelectedExam(slugExam);
    }
  }, [slug]);

  const calculateReport = () => {
    let newReport: PerformanceReport;

    if (selectedExam === "SAT") {
      const result = getSATResult();
      const rwPercent = result.rwPercent;
      const mathPercent = result.mathPercent;

      newReport = {
        exam: "SAT",
        totalScore: result.total,
        sectionScores: {
          "Reading & Writing": result.rw,
          Math: result.math,
        },
        percentages: {
          "Reading & Writing": rwPercent,
          Math: mathPercent,
        },
        performanceLevel: getPerformanceLevel(
          Math.round((rwPercent + mathPercent) / 2),
        ),
        strongestArea: rwPercent >= mathPercent ? "Reading & Writing" : "Math",
        weakestArea: rwPercent < mathPercent ? "Reading & Writing" : "Math",
      };
    } else if (selectedExam === "GRE") {
      const result = getGREResult();
      const verbalPercent = result.verbalPercent;
      const quantPercent = result.quantPercent;
      const awPercent = Math.round((result.aw / 6) * 100);

      const percentages = {
        "Verbal Reasoning": verbalPercent,
        "Quantitative Reasoning": quantPercent,
        "Analytical Writing": awPercent,
      };

      const avgPercent = (verbalPercent + quantPercent) / 2;

      newReport = {
        exam: "GRE",
        totalScore: result.total,
        sectionScores: {
          "Verbal Reasoning": result.verbal,
          "Quantitative Reasoning": result.quant,
          "Analytical Writing": result.aw,
        },
        percentages,
        performanceLevel: getPerformanceLevel(Math.round(avgPercent)),
        strongestArea:
          verbalPercent >= quantPercent
            ? "Verbal Reasoning"
            : "Quantitative Reasoning",
        weakestArea:
          verbalPercent < quantPercent
            ? "Verbal Reasoning"
            : "Quantitative Reasoning",
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
          Quantitative: gmatQuant,
          Verbal: gmatVerbal,
          "Data Insights": gmatDI,
        },
        percentages: {
          Quantitative: quantPercent,
          Verbal: verbalPercent,
          "Data Insights": diPercent,
        },
        performanceLevel: getPerformanceLevel(
          Math.round((quantPercent + verbalPercent + diPercent) / 3),
        ),
        strongestArea:
          quantPercent >= verbalPercent && quantPercent >= diPercent
            ? "Quantitative"
            : verbalPercent >= diPercent
              ? "Verbal"
              : "Data Insights",
        weakestArea:
          quantPercent <= verbalPercent && quantPercent <= diPercent
            ? "Quantitative"
            : verbalPercent <= diPercent
              ? "Verbal"
              : "Data Insights",
      };
    } else if (selectedExam === "TOEFL") {
      const result = getTOEFLResult();
      const percentages = {
        Reading: result.percentages.reading,
        Listening: result.percentages.listening,
        Speaking: result.percentages.speaking,
        Writing: result.percentages.writing,
      };
      const avgPercent =
        Object.values(percentages).reduce((sum, value) => sum + value, 0) /
        Object.values(percentages).length;

      newReport = {
        exam: "TOEFL",
        totalScore: result.total,
        sectionScores: {
          Reading: activeTOEFLScores.reading,
          Listening: activeTOEFLScores.listening,
          Speaking: activeTOEFLScores.speaking,
          Writing: activeTOEFLScores.writing,
        },
        percentages,
        performanceLevel: getPerformanceLevel(Math.round(avgPercent)),
        strongestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] > b[1] ? a : b,
        )[0],
        weakestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] < b[1] ? a : b,
        )[0],
      };
    } else if (selectedExam === "IELTS") {
      const result = calculateIELTSScore(effectiveIeltsScores);
      const percentages = {
        Listening: result.percentages.listening,
        Reading: result.percentages.reading,
        Writing: result.percentages.writing,
        Speaking: result.percentages.speaking,
      };
      const avgPercent =
        Object.values(percentages).reduce((sum, value) => sum + value, 0) /
        Object.values(percentages).length;

      newReport = {
        exam: "IELTS",
        totalScore: result.total,
        sectionScores: {
          Listening: effectiveIeltsScores.listening,
          Reading: effectiveIeltsScores.reading,
          Writing: effectiveIeltsScores.writing,
          Speaking: effectiveIeltsScores.speaking,
        },
        percentages,
        performanceLevel: getPerformanceLevel(Math.round(avgPercent)),
        strongestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] > b[1] ? a : b,
        )[0],
        weakestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] < b[1] ? a : b,
        )[0],
      };
    } else {
      const result = calculatePTEScore(pteScores);
      const percentages = {
        Speaking: result.percentages.speaking,
        Writing: result.percentages.writing,
        Reading: result.percentages.reading,
        Listening: result.percentages.listening,
      };
      const avgPercent =
        Object.values(percentages).reduce((sum, value) => sum + value, 0) /
        Object.values(percentages).length;

      newReport = {
        exam: "PTE",
        totalScore:
          pteOfficialOverall !== null &&
          pteOfficialOverall >= 10 &&
          pteOfficialOverall <= 90
            ? pteOfficialOverall
            : result.estimatedOverall,
        sectionScores: {
          Speaking: pteScores.speaking,
          Writing: pteScores.writing,
          Reading: pteScores.reading,
          Listening: pteScores.listening,
        },
        percentages,
        performanceLevel: getPerformanceLevel(Math.round(avgPercent)),
        strongestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] > b[1] ? a : b,
        )[0],
        weakestArea: Object.entries(percentages).reduce((a, b) =>
          a[1] < b[1] ? a : b,
        )[0],
      };
    }

    setReport(newReport);
    setShowReport(true);
    setTimeout(() => {
      document
        .getElementById("performance-report")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSATModuleChange = (
    field: keyof SATScores,
    value: number,
    max: number,
  ) => {
    setSatScores((prev) => ({
      ...prev,
      [field]: Math.min(max, Math.max(0, value)),
    }));
  };

  const handleGREChange = (
    field: keyof GREScores,
    value: number | boolean,
    max?: number,
  ) => {
    setGreScores((prev) => ({
      ...prev,
      [field]: max ? Math.min(max, Math.max(0, value as number)) : value,
    }));
  };

  // NEW: Calculates total score dynamically based on current state (prevents "0" on first load)
  const getCurrentTotalScore = () => {
    switch (selectedExam) {
      case "SAT":
        return getSATResult().total;
      case "GRE":
        return getGREResult().total;
      case "GMAT":
        return calculateGMATScore(gmatQuant, gmatVerbal, gmatDI);
      case "TOEFL":
        return getTOEFLResult().total;
      case "IELTS":
        return calculateIELTSScore(effectiveIeltsScores).total;
      case "PTE":
        return pteOfficialOverall !== null &&
          pteOfficialOverall >= 10 &&
          pteOfficialOverall <= 90
          ? pteOfficialOverall
          : calculatePTEScore(pteScores).estimatedOverall;
      default:
        return 0;
    }
  };

  const getCurrentPercentages = (): Record<string, number> => {
    switch (selectedExam) {
      case "SAT": {
        const result = getSATResult();
        return {
          "Reading & Writing": result.rwPercent,
          Math: result.mathPercent,
        };
      }
      case "GRE": {
        const result = getGREResult();
        return {
          "Verbal Reasoning": result.verbalPercent,
          "Quantitative Reasoning": result.quantPercent,
        };
      }
      case "GMAT":
        return {
          Quantitative: Math.round(((gmatQuant - 60) / 30) * 100),
          Verbal: Math.round(((gmatVerbal - 60) / 30) * 100),
          "Data Insights": Math.round(((gmatDI - 60) / 30) * 100),
        };
      case "TOEFL": {
        const result = getTOEFLResult();
        return {
          Reading: result.percentages.reading,
          Listening: result.percentages.listening,
          Speaking: result.percentages.speaking,
          Writing: result.percentages.writing,
        };
      }
      case "IELTS": {
        const result = calculateIELTSScore(effectiveIeltsScores);
        return {
          Listening: result.percentages.listening,
          Reading: result.percentages.reading,
          Writing: result.percentages.writing,
          Speaking: result.percentages.speaking,
        };
      }
      case "PTE": {
        const result = calculatePTEScore(pteScores);
        return {
          Speaking: result.percentages.speaking,
          Writing: result.percentages.writing,
          Reading: result.percentages.reading,
          Listening: result.percentages.listening,
        };
      }
    }
    return {};
  };

  // NEW: Properly resets all values to their exact defaults and hides the report
  const handleReset = () => {
    if (selectedExam === "SAT") {
      setSatInputMode("questions");
      setSatSectionScores({ rw: 600, math: 600 });
      setSatScores({
        readingWritingModule1: 18,
        readingWritingModule2: 17,
        mathModule1: 12,
        mathModule2: 11,
      });
    } else if (selectedExam === "GRE") {
      setGreInputMode("questions");
      setGreSectionScores({ verbal: 150, quant: 150 });
      setGreScores({
        verbalS1: 10,
        verbalS2: 12,
        quantS1: 10,
        quantS2: 11,
        analyticalWriting: 4.0,
      });
    } else if (selectedExam === "GMAT") {
      setGmatQuant(75);
      setGmatVerbal(75);
      setGmatDI(75);
    } else if (selectedExam === "TOEFL") {
      setToeflScale("current");
      setToeflBands({ reading: 4.5, listening: 4.5, speaking: 4, writing: 4 });
      setToeflScores({ reading: 22, listening: 21, speaking: 20, writing: 22 });
    } else if (selectedExam === "IELTS") {
      setIeltsScores({ listening: 7, reading: 7, writing: 6.5, speaking: 7 });
      setIeltsRawScores({ listening: 30, reading: 30 });
      setIeltsInputMode({ listening: "correct", reading: "correct" });
      setIeltsReadingType("academic");
    } else if (selectedExam === "PTE") {
      setPteScores({ speaking: 70, writing: 70, reading: 68, listening: 72 });
      setPteType("academic");
      setPteOfficialOverall(null);
    }
    setShowReport(false);
  };

  // Helper to get section config for results display
  const getResultsSections = () => {
    switch (selectedExam) {
      case "SAT":
        return [
          {
            label: "Reading and Writing",
            value: getSATResult().rw,
          },
          { label: "Math", value: getSATResult().math },
        ];
      case "GRE":
        return [
          {
            label: "Verbal Reasoning",
            value: getGREResult().verbal,
          },
          {
            label: "Quantitative Reasoning",
            value: getGREResult().quant,
          },
        ];
      case "GMAT":
        return [
          { label: "Quantitative", value: gmatQuant },
          { label: "Verbal", value: gmatVerbal },
          { label: "Data Insights", value: gmatDI },
        ];
      case "TOEFL":
        return [
          { label: "Reading", value: activeTOEFLScores.reading },
          { label: "Listening", value: activeTOEFLScores.listening },
          { label: "Speaking", value: activeTOEFLScores.speaking },
          { label: "Writing", value: activeTOEFLScores.writing },
        ];
      case "IELTS":
        return [
          { label: "Listening", value: effectiveIeltsScores.listening },
          { label: "Reading", value: effectiveIeltsScores.reading },
          { label: "Writing", value: effectiveIeltsScores.writing },
          { label: "Speaking", value: effectiveIeltsScores.speaking },
        ];
      case "PTE":
        return [
          { label: "Speaking", value: pteScores.speaking },
          { label: "Writing", value: pteScores.writing },
          { label: "Reading", value: pteScores.reading },
          { label: "Listening", value: pteScores.listening },
        ];
      default:
        return [];
    }
  };

  const getMaxScore = () => {
    switch (selectedExam) {
      case "SAT":
        return "1600";
      case "GRE":
        return "340";
      case "GMAT":
        return "805";
      case "TOEFL":
        return toeflScale === "current" ? "6" : "120";
      case "IELTS":
        return "9";
      case "PTE":
        return "90";
      default:
        return "0";
    }
  };

  return (
    <main className="min-h-screen bg-[#FCF3ED]">
      <Hero data={pageInfo?.sections?.hero?.fields} />

      {/* Calculator Section */}
      <section className="px-0 py-10">
        <div className="mx-auto max-w-7xl grid grid-cols-[1.3fr_0.7fr] gap-7">
          {/* OUTER WHITE CALCULATOR BOX */}
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4">
            {/* CALCULATOR CONTENT */}
            <div className="px-7 py-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#0b1e3f]">
                    Enter Your {selectedExam} Practice Scores
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Add your latest practice results below. We'll turn them into
                    a clear performance report.
                  </p>
                </div>
                <span className="rounded-lg bg-orange-50 px-3 py-2 text-[11px] font-bold text-[#F36D45]">
                  {selectedExam}
                </span>
              </div>

              {/* SAT */}
              {selectedExam === "SAT" && (
                <div className="space-y-1">
                  <div
                    className="mb-5 flex flex-wrap gap-2"
                    role="group"
                    aria-label="SAT score input type"
                  >
                    <div className="inline-flex w-full flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1.5 sm:w-auto sm:flex-row">
                      {(["questions", "sections"] as const).map((mode) => {
                        const isActive = satInputMode === mode;

                        return (
                          <button
                            key={mode}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setSatInputMode(mode)}
                            className={`group flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3.5 py-2.5 text-left transition-all duration-200 sm:flex-none ${
                              isActive
                                ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-slate-200/70"
                                : "text-slate-500 hover:bg-white/70 hover:text-[#0b1e3f]"
                            }`}
                          >
                            <span className="block text-sm font-bold">
                              {mode === "questions"
                                ? "Correct Answers"
                                : "Section Scores"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {satInputMode === "questions" ? (
                    <>
                      <p className="mb-4 text-sm text-slate-600">
                        Enter correct answers out of 27 Reading and Writing or
                        22 Math questions per module. Two questions in each
                        module are unscored; raw counts cannot reproduce the
                        adaptive official score.{" "}
                        <a
                          href="https://satsuite.collegeboard.org/scores/what-scores-mean/how-scores-calculated"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#F36D45] underline"
                        >
                          How College Board scores the SAT
                        </a>
                      </p>
                      {/* Reading & Writing */}
                      <div>
                        <div>
                          {[
                            {
                              field: "readingWritingModule1" as keyof SATScores,
                              label: "Reading and Writing Module 1",
                              max: 27,
                              value: satScores.readingWritingModule1,
                            },
                            {
                              field: "readingWritingModule2" as keyof SATScores,
                              label: "Reading and Writing Module 2",
                              max: 27,
                              value: satScores.readingWritingModule2,
                            },
                          ].map((item) => (
                            <div
                              key={item.field}
                              className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2  sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4"
                            >
                              <span className="text-[16px] font-semibold text-[#252525]">
                                {item.label}
                              </span>
                              <div className="relative flex h-6 items-center">
                                <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                  <div
                                    className="h-full rounded-full transition-all duration-200"
                                    style={{
                                      width: `${(item.value / item.max) * 100}%`,
                                      background:
                                        "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                    }}
                                  />
                                </div>
                                <input
                                  type="range"
                                  aria-label={`${item.label} correct answers`}
                                  min={0}
                                  max={item.max}
                                  value={item.value}
                                  onChange={(e) =>
                                    handleSATModuleChange(
                                      item.field,
                                      Number(e.target.value),
                                      item.max,
                                    )
                                  }
                                  className={CALCULATOR_RANGE_INPUT_CLASS}
                                />
                              </div>
                              <div className="text-right whitespace-nowrap">
                                <span className="text-lg font-bold text-[#252525]">
                                  {item.value}
                                </span>
                                <span className="text-base text-[#555555]">
                                  {" "}
                                  / {item.max}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Math */}
                      <div>
                        <div>
                          {[
                            {
                              field: "mathModule1" as keyof SATScores,
                              label: "Math Module 1",
                              max: 22,
                              value: satScores.mathModule1,
                            },
                            {
                              field: "mathModule2" as keyof SATScores,
                              label: "Math Module 2",
                              max: 22,
                              value: satScores.mathModule2,
                            },
                          ].map((item) => (
                            <div
                              key={item.field}
                              className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2 sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4"
                            >
                              <span className="text-[16px] font-semibold text-[#252525]">
                                {item.label}
                              </span>
                              <div className="relative flex h-6 items-center">
                                <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                  <div
                                    className="h-full rounded-full transition-all duration-200"
                                    style={{
                                      width: `${(item.value / item.max) * 100}%`,
                                      background:
                                        "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                    }}
                                  />
                                </div>
                                <input
                                  type="range"
                                  aria-label={`${item.label} correct answers`}
                                  min={0}
                                  max={item.max}
                                  value={item.value}
                                  onChange={(e) =>
                                    handleSATModuleChange(
                                      item.field,
                                      Number(e.target.value),
                                      item.max,
                                    )
                                  }
                                  className={CALCULATOR_RANGE_INPUT_CLASS}
                                />
                              </div>
                              <div className="text-right whitespace-nowrap">
                                <span className="text-lg font-bold text-[#252525]">
                                  {item.value}
                                </span>
                                <span className="text-base text-[#555555]">
                                  {" "}
                                  / {item.max}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-5">
                      <p className="text-sm text-slate-600">
                        Enter the 200–800 section scores from your College Board
                        score report. Their sum is your SAT total.
                      </p>
                      {(
                        [
                          { key: "rw", label: "Reading and Writing" },
                          { key: "math", label: "Math" },
                        ] as const
                      ).map((section) => (
                        <div key={section.key}>
                          <div className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2 sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4">
                            <span className="text-[16px] font-semibold text-[#252525]">
                              {section.label}
                            </span>
                            <div className="relative flex h-6 items-center">
                              <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                <div
                                  className="h-full rounded-full transition-all duration-200"
                                  style={{
                                    width: `${((satSectionScores[section.key] - 200) / 600) * 100}%`,
                                    background:
                                      "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                  }}
                                />
                              </div>
                              <input
                                type="range"
                                aria-label={`${section.label} official section score`}
                                min={200}
                                max={800}
                                step={10}
                                value={satSectionScores[section.key]}
                                onChange={(event) =>
                                  setSatSectionScores((previous) => ({
                                    ...previous,
                                    [section.key]: Number(event.target.value),
                                  }))
                                }
                                className={CALCULATOR_RANGE_INPUT_CLASS}
                              />
                            </div>
                            <div className="text-right whitespace-nowrap">
                              <span className="text-[15px] font-bold text-[#252525]">
                                {satSectionScores[section.key]}
                              </span>
                              <span className="text-[11px] text-[#555555]">
                                {" "}
                                / 800
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white">
                    <p className="text-sm text-slate-600">
                      {satInputMode === "sections"
                        ? "Insights based on the section scores you entered."
                        : "Insights based on estimated practice scores."}
                    </p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}

              {/* GRE */}
              {selectedExam === "GRE" && (
                <div className="space-y-1">
                  <div
                    className="mb-5 inline-flex w-full flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1.5 sm:w-auto sm:flex-row"
                    role="group"
                    aria-label="GRE score input type"
                  >
                    {(["questions", "sections"] as const).map((mode) => {
                      const isActive = greInputMode === mode;

                      return (
                        <button
                          key={mode}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setGreInputMode(mode)}
                          className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 sm:flex-none ${
                            isActive
                              ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-slate-200/70"
                              : "text-slate-500 hover:bg-white/70 hover:text-[#0b1e3f]"
                          }`}
                        >
                          {/* Label */}
                          <span className="block text-sm font-bold">
                            {mode === "questions"
                              ? "Correct Answers"
                              : "Section Scores"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {greInputMode === "questions" ? (
                    <>
                      <p className="mb-4 text-sm text-slate-600">
                        Enter correct answers for each section. ETS uses
                        section-level adaptation and equating, so these counts
                        cannot reproduce an official score.{" "}
                        <a
                          href="https://grediagnostic.ets.org/GREDWeb/gred/gre_home.jsp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#F36D45] underline"
                        >
                          How ETS scores the GRE
                        </a>
                      </p>
                      {/* Verbal Reasoning */}
                      <div>

                        <div>
                          {[
                            {
                              label: "Verbal Reasoning Section 1",
                              max: 12,
                              value: greScores.verbalS1,
                              onChange: (v: number) =>
                                handleGREChange("verbalS1", v, 12),
                            },
                            {
                              label: "Verbal Reasoning Section 2",
                              max: 15,
                              value: greScores.verbalS2,
                              onChange: (v: number) =>
                                handleGREChange("verbalS2", v, 15),
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2 border-t border-[#EEEEEE] sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4"
                            >
                              <span className="text-[15px] font-medium text-[#252525]">
                                {item.label}
                              </span>
                              <div className="relative flex h-6 items-center">
                                <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                  <div
                                    className="h-full rounded-full transition-all duration-200"
                                    style={{
                                      width: `${(item.value / item.max) * 100}%`,
                                      background:
                                        "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                    }}
                                  />
                                </div>
                                <input
                                  type="range"
                                  aria-label={`${item.label} correct answers`}
                                  min={0}
                                  max={item.max}
                                  value={item.value}
                                  onChange={(e) =>
                                    item.onChange(Number(e.target.value))
                                  }
                                  className={CALCULATOR_RANGE_INPUT_CLASS}
                                />
                              </div>
                              <div className="text-right whitespace-nowrap">
                                <span className="text-[15px] font-bold text-[#252525]">
                                  {item.value}
                                </span>
                                <span className="text-[11px] text-[#555555]">
                                  {" "}
                                  / {item.max}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quantitative Reasoning */}
                      <div>

                        <div>
                          {[
                            {
                              label: "Quantitative Reasoning Section 1",
                              max: 12,
                              value: greScores.quantS1,
                              onChange: (v: number) =>
                                handleGREChange("quantS1", v, 12),
                            },
                            {
                              label: "Quantitative Reasoning Section 2",
                              max: 15,
                              value: greScores.quantS2,
                              onChange: (v: number) =>
                                handleGREChange("quantS2", v, 15),
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2 border-t border-[#EEEEEE] sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4"
                            >
                              <span className="text-[15px] font-medium text-[#252525]">
                                {item.label}
                              </span>
                              <div className="relative flex h-6 items-center">
                                <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                  <div
                                    className="h-full rounded-full transition-all duration-200"
                                    style={{
                                      width: `${(item.value / item.max) * 100}%`,
                                      background:
                                        "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                    }}
                                  />
                                </div>
                                <input
                                  type="range"
                                  aria-label={`${item.label} correct answers`}
                                  min={0}
                                  max={item.max}
                                  value={item.value}
                                  onChange={(e) =>
                                    item.onChange(Number(e.target.value))
                                  }
                                  className={CALCULATOR_RANGE_INPUT_CLASS}
                                />
                              </div>
                              <div className="text-right whitespace-nowrap">
                                <span className="text-[15px] font-bold text-[#252525]">
                                  {item.value}
                                </span>
                                <span className="text-[11px] text-[#555555]">
                                  {" "}
                                  / {item.max}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-5">
                      <p className="text-sm text-slate-600">
                        Enter the 130–170 Verbal and Quantitative scores from
                        your ETS score report. Their sum is the 260–340 combined
                        score.
                      </p>
                      {(
                        [
                          { key: "verbal", label: "Verbal Reasoning" },
                          { key: "quant", label: "Quantitative Reasoning" },
                        ] as const
                      ).map((section) => (
                        <div key={section.key}>
                          <h3 className="mb-2 text-[21px] font-bold text-[#252525]">
                            {section.label}
                          </h3>
                          <div className="grid min-h-[72px] grid-cols-[minmax(125px,45%)_minmax(0,1fr)_55px] items-center gap-2 border-t border-[#EEEEEE] sm:grid-cols-[205px_minmax(0,1fr)_65px] sm:gap-4">
                            <span className="text-[15px] font-medium text-[#252525]">
                              Section Score
                            </span>
                            <div className="relative flex h-6 items-center">
                              <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                <div
                                  className="h-full rounded-full transition-all duration-200"
                                  style={{
                                    width: `${((greSectionScores[section.key] - 130) / 40) * 100}%`,
                                    background:
                                      "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                  }}
                                />
                              </div>
                              <input
                                type="range"
                                aria-label={`${section.label} official section score`}
                                min={130}
                                max={170}
                                step={1}
                                value={greSectionScores[section.key]}
                                onChange={(event) =>
                                  setGreSectionScores((previous) => ({
                                    ...previous,
                                    [section.key]: Number(event.target.value),
                                  }))
                                }
                                className={CALCULATOR_RANGE_INPUT_CLASS}
                              />
                            </div>
                            <div className="text-right whitespace-nowrap">
                              <span className="text-[15px] font-bold text-[#252525]">
                                {greSectionScores[section.key]}
                              </span>
                              <span className="text-[11px] text-[#555555]">
                                {" "}
                                / 170
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Analytical Writing */}
                  <div>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-[#252525]">
                        Analytical Writing
                      </h3>
                      <p className="mt-1 text-[14px] text-[#777777]">
                        Scored separately; not included in the 260–340 combined
                        score.
                      </p>
                    </div>
                    <div className="grid min-h-[72px] grid-cols-[115px_minmax(0,1fr)_65px] items-center gap-4 border-t border-[#EEEEEE]">
                      <span className="text-[15px] font-medium text-[#252525]">
                        Writing Score
                      </span>
                      <div className="relative flex h-6 items-center">
                        <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                          <div
                            className="h-full rounded-full transition-all duration-200"
                            style={{
                              width: `${(greScores.analyticalWriting / 6) * 100}%`,
                              background:
                                "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          aria-label="Analytical Writing score"
                          min={0}
                          max={6}
                          step={0.5}
                          value={greScores.analyticalWriting}
                          onChange={(e) =>
                            handleGREChange(
                              "analyticalWriting",
                              Number(e.target.value),
                            )
                          }
                          className={CALCULATOR_RANGE_INPUT_CLASS}
                        />
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-[15px] font-bold text-[#252525]">
                          {greScores.analyticalWriting}
                        </span>
                        <span className="text-[11px] text-[#555555]"> / 6</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white">
                    <p className="text-sm text-slate-600">
                      {greInputMode === "sections"
                        ? "Insights based on the section scores you entered."
                        : "Insights based on estimated practice scores."}
                    </p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}

              {/* GMAT */}
              {selectedExam === "GMAT" && (
                <div className="space-y-1">
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
                  ].map((section, idx) => (
                    <div key={idx}>
                      <div className="mb-2"></div>
                      <div className="grid min-h-[72px] grid-cols-[205px_minmax(0,1fr)_65px] items-center gap-4 border-t border-[#EEEEEE]">
                        <h3 className="text-base font-bold text-[#252525]">
                          {section.label}
                        </h3>
                        <div className="relative flex h-6 items-center">
                          <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                            <div
                              className="h-full rounded-full transition-all duration-200"
                              style={{
                                width: `${((section.value - 60) / 30) * 100}%`,
                                background:
                                  "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                              }}
                            />
                          </div>
                          <input
                            type="range"
                            aria-label={`${section.label} section score`}
                            min={60}
                            max={90}
                            value={section.value}
                            onChange={(e) =>
                              section.setter(
                                Math.min(
                                  90,
                                  Math.max(60, Number(e.target.value)),
                                ),
                              )
                            }
                            className={CALCULATOR_RANGE_INPUT_CLASS}
                          />
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <span className="text-[15px] font-bold text-[#252525]">
                            {section.value}
                          </span>
                          <span className="text-[11px] text-[#555555]">
                            {" "}
                            / {section.max}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-white">
                    <p className="text-sm text-slate-600">
                      Estimated from the three section scores.
                    </p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}

              {/* TOEFL */}
              {selectedExam === "TOEFL" && (
                <div className="space-y-1">
                  <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="TOEFL score scale">
                    {(["current", "legacy"] as const).map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        aria-pressed={toeflScale === scale}
                        onClick={() => setToeflScale(scale)}
                        className={`rounded-lg border px-3 py-2 text-sm font-semibold ${toeflScale === scale ? "border-[#F36D45] bg-orange-50 text-[#F36D45]" : "border-slate-200 text-slate-600"}`}
                      >
                        {scale === "current" ? "Current 1–6 bands" : "Older 0–30 scores"}
                      </button>
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-slate-600">
                    {toeflScale === "current"
                      ? "For tests taken on or after January 21, 2026. Enter the four section bands from your ETS report; the overall band is their average rounded to the nearest 0.5."
                      : "For tests taken before January 21, 2026. Enter your four 0–30 section scores; their sum is the 0–120 total."}{" "}
                    <a href="https://www.ets.org/toefl/institutions/ibt/score-scale-update.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#F36D45] underline">ETS scoring guide</a>
                  </p>
                  {(["reading", "listening", "speaking", "writing"] as (keyof TOEFLScores)[]).map(
                    (section) => {
                      const value = activeTOEFLScores[section];
                      const min = toeflScale === "current" ? 1 : 0;
                      const max = toeflScale === "current" ? 6 : 30;
                      return (
                        <div key={section}>
                          <div className="mb-2 flex gap-3">
                            <h3 className="text-lg font-bold text-[#252525] capitalize">
                              {section}
                            </h3>
                            <p className="mt-1 text-[14px] text-[#777777]">
                              {toeflScale === "current" ? `CEFR ${getTOEFLCEFR(value)} · current score report` : "Older TOEFL score report"}
                            </p>
                          </div>
                          <div className="grid min-h-[60px] grid-cols-[115px_minmax(0,1fr)_65px] items-center gap-4 border-t border-[#EEEEEE]">
                            <span className="text-[15px] font-medium text-[#252525]">
                              {toeflScale === "current" ? "Section Band" : "Section Score"}
                            </span>
                            <div className="relative flex h-6 items-center">
                              <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                                <div
                                  className="h-full rounded-full transition-all duration-200"
                                  style={{
                                    width: `${((value - min) / (max - min)) * 100}%`,
                                    background:
                                      "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                                  }}
                                />
                              </div>
                              <input
                                type="range"
                                aria-label={`${section} ${toeflScale === "current" ? "section band" : "section score"}`}
                                min={min}
                                max={max}
                                step={toeflScale === "current" ? 0.5 : 1}
                                value={value}
                                onChange={(e) => {
                                  const setter = toeflScale === "current" ? setToeflBands : setToeflScores;
                                  setter((prev) => ({ ...prev, [section]: Number(e.target.value) }));
                                }}
                                className={CALCULATOR_RANGE_INPUT_CLASS}
                              />
                            </div>
                            <div className="text-right whitespace-nowrap">
                              <span className="text-[15px] font-bold text-[#252525]">
                                {value}
                              </span>
                              <span className="text-[11px] text-[#555555]">
                                {" "}
                                / {max}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white">
                    <p className="text-sm text-slate-600">Insights based on the section scores you entered.</p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}

              {/* IELTS */}
              {selectedExam === "IELTS" && (
                <div className="space-y-1">
                  <div className="flex flex-col gap-3 rounded-xl sm:flex-row sm:items-center sm:justify-between">
                    {/* Accuracy note */}
                    <div className="flex items-center gap-2.5">
                      <div>
                        <p className="text-base font-bold text-[#0b1e3f]">
                          Estimated band score
                        </p>
                      </div>
                    </div>

                    {/* Reading type toggle */}
                    <div
                      role="group"
                      aria-label="IELTS reading test type"
                      className="grid w-full grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 sm:w-auto sm:min-w-[280px]"
                    >
                      <button
                        type="button"
                        aria-pressed={ieltsReadingType === "academic"}
                        onClick={() => setIeltsReadingType("academic")}
                        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 ${
                          ieltsReadingType === "academic"
                            ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-black/5"
                            : "text-slate-500 hover:bg-white/60 hover:text-[#0b1e3f]"
                        }`}
                      >
                        <span>Academic</span>
                      </button>

                      <button
                        type="button"
                        aria-pressed={ieltsReadingType === "general"}
                        onClick={() => setIeltsReadingType("general")}
                        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 ${
                          ieltsReadingType === "general"
                            ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-black/5"
                            : "text-slate-500 hover:bg-white/60 hover:text-[#0b1e3f]"
                        }`}
                      >
                        <span>General Training</span>
                      </button>
                    </div>
                  </div>
                  {(
                    [
                      "listening",
                      "reading",
                      "writing",
                      "speaking",
                    ] as (keyof IELTSScores)[]
                  ).map((section) => {
                    const value = effectiveIeltsScores[section];
                    const isRawSection =
                      section === "listening" || section === "reading";
                    const isCorrectAnswers =
                      isRawSection && ieltsInputMode[section] === "correct";
                    const sliderValue = isCorrectAnswers
                      ? ieltsRawScores[section as IELTSRawSection]
                      : ieltsScores[section];
                    return (
                      <div
                        key={section}
                        className="grid min-h-[72px] grid-cols-[115px_minmax(0,1fr)_65px] items-center gap-4 border-b border-[#EEEEEE]"
                      >
                        <div>
                          <h3 className="text-[21px] font-bold capitalize text-[#252525]">
                            {section}
                          </h3>
                          {/* {isRawSection && (
                              <button
                                type="button"
                                onClick={() => setIeltsInputMode((previous) => ({
                                  ...previous,
                                  [section]: previous[section] === "correct" ? "band" : "correct",
                                }))}
                                className="text-[11px] font-semibold text-[#F36D45] underline-offset-2 hover:underline"
                                aria-label={`Switch ${section} input to ${isCorrectAnswers ? "band" : "correct answers"}`}
                              >
                                {isCorrectAnswers ? "Correct answers · change" : "Band · change"}
                              </button>
                            )} */}
                        </div>
                        <div className="relative flex h-6 items-center">
                          <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                            <div
                              className="h-full rounded-full transition-all duration-200"
                              style={{
                                width: `${(sliderValue / (isCorrectAnswers ? 40 : 9)) * 100}%`,
                                background:
                                  "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
                              }}
                            />
                          </div>
                          <label
                            className="sr-only"
                            htmlFor={`ielts-${section}`}
                          >
                            {section}{" "}
                            {isCorrectAnswers
                              ? "correct answers out of 40"
                              : "band score out of 9"}
                          </label>
                          <input
                            id={`ielts-${section}`}
                            type="range"
                            min={0}
                            max={isCorrectAnswers ? 40 : 9}
                            step={isCorrectAnswers ? 1 : 0.5}
                            value={sliderValue}
                            onChange={(event) => {
                              const nextValue = Number(event.target.value);
                              if (isCorrectAnswers)
                                setIeltsRawScores((previous) => ({
                                  ...previous,
                                  [section]: nextValue,
                                }));
                              else
                                setIeltsScores((previous) => ({
                                  ...previous,
                                  [section]: nextValue,
                                }));
                            }}
                            className={CALCULATOR_RANGE_INPUT_CLASS}
                          />
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <span className="text-lg font-bold text-[#252525]">
                            {value}
                          </span>
                          <span className="text-base text-slate-600">
                            {" "}
                            / {!isCorrectAnswers ? 40 : 9}
                          </span>
                          {isCorrectAnswers && (
                            <span className="block text-[11px] text-[#F36D45]">
                              {" "}
                              Question {sliderValue} /40
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-white max-w-7xl mx-auto">
                    <p className="text-sm text-slate-600">
                      Your results are used only to create an estimated
                      preparation analysis.
                    </p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}

              {/* PTE */}
              {selectedExam === "PTE" && (
                <div className="space-y-1">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#0b1e3f]">
                      PTE test
                    </span>

                    <div
                      role="group"
                      aria-label="PTE test type"
                      className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1"
                    >
                      <button
                        type="button"
                        aria-pressed={pteType === "academic"}
                        onClick={() => setPteType("academic")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
                          pteType === "academic"
                            ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-black/5"
                            : "text-slate-500 hover:text-[#0b1e3f]"
                        }`}
                      >
                        Academic / UKVI
                      </button>

                      <button
                        type="button"
                        aria-pressed={pteType === "core"}
                        onClick={() => setPteType("core")}
                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
                          pteType === "core"
                            ? "bg-white text-[#F36D45] shadow-sm ring-1 ring-black/5"
                            : "text-slate-500 hover:text-[#0b1e3f]"
                        }`}
                      >
                        Core
                      </button>
                    </div>
                  </div>
                  {[
                    { key: "speaking", label: "Speaking" },
                    { key: "writing", label: "Writing" },
                    { key: "reading", label: "Reading" },
                    { key: "listening", label: "Listening" },
                  ].map((section) => {
                    const skill = section.key as keyof PTEScores;
                    const value = pteScores[skill];
                    return (
                      <div key={skill}>
                        <div className="grid min-h-[72px] grid-cols-[115px_minmax(0,1fr)_65px] items-center gap-4 border-t border-[#EEEEEE]">
                          <h3 className="text-lg font-bold text-[#252525]">
                            {section.label}
                          </h3>
                          <div className="relative flex h-6 items-center">
                            <div className="h-[14px] w-full overflow-hidden rounded-full bg-[#E7E7E7]">
                              <div
                                className="h-full rounded-full transition-all duration-200"
                                style={{
                                  width: `${((value - 10) / 80) * 100}%`,
                                  background:
                                    "linear-gradient(90deg, #F36D45 0%, #FFD79F 100%)",
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
                                  [section.key]: Math.min(
                                    90,
                                    Math.max(10, Number(e.target.value)),
                                  ),
                                }))
                              }
                              className={CALCULATOR_RANGE_INPUT_CLASS}
                            />
                          </div>
                          <div className="text-right whitespace-nowrap">
                            <span className="text-[15px] font-bold text-[#252525]">
                              {value}
                            </span>
                            <span className="text-[11px] text-[#555555]">
                              {" "}
                              / 90
                            </span>
                            {pteType === "core" && (
                              <span className="block text-[11px] font-semibold text-[#F36D45]">
                                {getPTECoreCLB(skill, value)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-wrap items-center gap-2 border-t border-[#EEEEEE] pt-3 text-sm text-slate-600">
                    <label htmlFor="pte-overall">
                      Official overall score, if known
                    </label>
                    <input
                      id="pte-overall"
                      type="number"
                      min={10}
                      max={90}
                      step={1}
                      value={pteOfficialOverall ?? ""}
                      onChange={(event) =>
                        setPteOfficialOverall(
                          event.target.value === ""
                            ? null
                            : Number(event.target.value),
                        )
                      }
                      onBlur={() =>
                        setPteOfficialOverall((previous) =>
                          previous === null
                            ? null
                            : Math.min(90, Math.max(10, previous)),
                        )
                      }
                      placeholder="10–90"
                      className="w-20 rounded-md border border-slate-200 px-2 py-1 text-[#0b1e3f]"
                    />
                    <span className="text-xs text-slate-500">
                      Leave blank to show a practice estimate from the four
                      skills.
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-white max-w-7xl mx-auto">
                    <p className="text-sm text-slate-600">
                      Your results are used only to create an estimated
                      preparation analysis.
                    </p>
                    <button
                      type="button"
                      onClick={calculateReport}
                      className="rounded-xl bg-[#F36D45] px-6 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(243,109,69,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
                    >
                      Performance Insights →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - RESULTS CARDS */}
          <div className="flex w-full flex-col gap-4">
            {/* TOTAL SCORE CARD */}
            <div className="relative isolate overflow-hidden rounded-2xl bg-[#294584] p-4 sm:p-5">
              {/* Background decoration */}
              <div className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-[120%] rounded-[50%] bg-[#183267]" />

              <div className="relative z-10 flex min-h-[170px] w-full items-center justify-between gap-2 sm:min-h-[185px]">
                {/* Score */}
                <div className="min-w-0 flex-1">
                  <div className="relative inline-block  flex rounded-xl bg-white w-full px-4 py-3 sm:px-5">
                    <div>
                      <p className="text-sm font-bold text-[#294584] sm:text-base">
                        {selectedExam === "SAT"
                          ? satInputMode === "sections"
                            ? "SAT total score"
                            : "Estimated SAT total"
                          : selectedExam === "GRE"
                            ? greInputMode === "sections"
                              ? "GRE combined score"
                              : "Estimated GRE combined"
                            : selectedExam === "GMAT"
                              ? "Estimated total score"
                              : selectedExam === "TOEFL"
                                ? toeflScale === "current" ? "Overall TOEFL band" : "TOEFL total score"
                              : selectedExam === "PTE"
                                ? pteOfficialOverall !== null &&
                                  pteOfficialOverall >= 10 &&
                                  pteOfficialOverall <= 90
                                  ? "Official overall score"
                                  : "Estimated overall score"
                                : "Total Score"}
                      </p>

                      <div className="mt-1 flex  items-baseline gap-1 whitespace-nowrap">
                        <span className="text-5xl font-extrabold leading-none tracking-tight text-[#294584] sm:text-6xl">
                          {getCurrentTotalScore()}
                        </span>
                        <span className="text-sm font-semibold text-slate-500 sm:text-base">
                          / {getMaxScore()}
                        </span>
                      </div>
                      {selectedExam === "PTE" && (
                        <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                          {pteOfficialOverall === null
                            ? "Practice estimate: average of four skill scores. Pearson calculates the official result from question-level performance."
                            : "Entered from your Pearson score report."}
                        </p>
                      )}
                      {selectedExam === "GMAT" && (
                        <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                          Practice estimate from the three equally weighted
                          section scores. Your official GMAT total may differ.
                        </p>
                      )}
                      {selectedExam === "TOEFL" && (
                        <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                          {toeflScale === "current"
                            ? `CEFR ${getTOEFLCEFR(getTOEFLResult().total)}. Average of four section bands, rounded to the nearest 0.5. ETS reports a separate comparable 0–120 score; it cannot be calculated exactly from bands alone.`
                            : "Sum of the four 0–30 section scores from an older TOEFL score report."}
                        </p>
                      )}
                      {selectedExam === "SAT" && (
                        <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                          {satInputMode === "sections"
                            ? "Exact sum of the two section scores you entered from your score report."
                            : "Rough practice estimate. College Board's adaptive scoring cannot be reproduced from correct-answer counts alone."}
                        </p>
                      )}
                      {selectedExam === "GRE" && (
                        <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                          {greInputMode === "sections"
                            ? "Exact sum of the Verbal and Quantitative scores you entered. Analytical Writing is reported separately."
                            : "Rough practice estimate. ETS adapts and equates sections, so correct-answer counts cannot reproduce an official score. Analytical Writing is separate."}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      title="Reset"
                      onClick={handleReset}
                      className="absolute top-0 right-1 rounded-full p-2 text-3xl font-extrabold text-black transition hover:text-[#294584] "
                    >
                      ↻
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded-full bg-[#FF7043] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-95 sm:text-sm"
                    >
                      Practice Free Mock Test →
                    </button>
                  </div>
                </div>

                {/* Illustration */}
                <div className="pointer-events-none flex shrink-0 items-end self-stretch">
                  <img
                    src="/image/stick-mg.webp"
                    alt="Score illustration"
                    className="h-[155px] w-auto max-w-[125px] self-end object-contain sm:h-[180px] sm:max-w-[150px]"
                  />
                </div>
              </div>
            </div>

            {/* OVERALL PERFORMANCE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold tracking-tight text-[#0b1e3f] sm:text-lg">
                    {selectedExam === "PTE"
                      ? "Communicative skills"
                      : selectedExam === "GMAT" ||
                          (selectedExam === "SAT" &&
                            satInputMode === "sections") ||
                          (selectedExam === "GRE" &&
                            greInputMode === "sections") ||
                          (selectedExam === "TOEFL" && toeflScale === "current")
                        ? "Section score range"
                        : "Overall Performance"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    {selectedExam === "PTE"
                      ? "Four separate skill scores on Pearson’s 10–90 scale."
                      : selectedExam === "GMAT"
                        ? "Position within the 60–90 score range, not a percentile or percent correct."
                        : selectedExam === "SAT" && satInputMode === "sections"
                          ? "Position within the 200–800 section score range, not a percentile."
                          : selectedExam === "GRE" &&
                              greInputMode === "sections"
                            ? "Position within the 130–170 Verbal and Quantitative score range, not a percentile."
                            : selectedExam === "TOEFL" && toeflScale === "current"
                              ? "Position within the 1–6 section band range, not a percentile."
                            : "Based on your practice scores."}
                  </p>
                </div>
              </div>

              {selectedExam === "PTE" ? (
                <div className="mt-5 space-y-4">
                  {(
                    [
                      "listening",
                      "reading",
                      "speaking",
                      "writing",
                    ] as (keyof PTEScores)[]
                  ).map((skill) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold capitalize text-[#0b1e3f]">
                          {skill}
                        </span>
                        <span className="text-slate-600">
                          {pteScores[skill]}/90
                          {pteType === "core"
                            ? ` · ${getPTECoreCLB(skill, pteScores[skill])}`
                            : ""}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#F36D45]"
                          style={{
                            width: `${((pteScores[skill] - 10) / 80) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs leading-5 text-slate-500">
                    {pteType === "core"
                      ? "CLB levels use Pearson’s PTE Core skill score table."
                      : "Academic UKVI uses the same test and score scale as Academic."}
                  </p>
                </div>
              ) : (
                (() => {
                  const livePercentages = getCurrentPercentages();
                  const percentages = Object.values(livePercentages);
                  const average = percentages.length
                    ? Math.round(
                        percentages.reduce((sum, value) => sum + value, 0) /
                          percentages.length,
                      )
                    : 0;

                  const score = Math.max(0, Math.min(100, average));
                  const angle = 180 - score * 1.8;
                  const radians = (angle * Math.PI) / 180;

                  const centerX = 200;
                  const centerY = 180;
                  const needleLength = 95;

                  const needleX = centerX + needleLength * Math.cos(radians);
                  const needleY = centerY - needleLength * Math.sin(radians);

                  return (
                    <>
                      {/* Compact gauge */}
                      <div className="mx-auto mt-3 w-full max-w-[330px]">
                        <svg
                          viewBox="0 0 400 215"
                          className="block h-auto w-full"
                          role="img"
                          aria-label={
                            selectedExam === "GMAT" ||
                            (selectedExam === "SAT" &&
                              satInputMode === "sections") ||
                            (selectedExam === "GRE" &&
                              greInputMode === "sections") ||
                            (selectedExam === "TOEFL" && toeflScale === "current")
                              ? `Section score range position: ${score}%`
                              : `Overall performance: ${score}%`
                          }
                        >
                          {/* Gauge segments */}
                          <path
                            d="M 45 180 A 155 155 0 0 1 87 70"
                            fill="none"
                            stroke="#FFDFA9"
                            strokeWidth="34"
                          />
                          <path
                            d="M 87 70 A 155 155 0 0 1 155 33"
                            fill="none"
                            stroke="#FFB18E"
                            strokeWidth="34"
                          />
                          <path
                            d="M 155 33 A 155 155 0 0 1 245 33"
                            fill="none"
                            stroke="#FF927D"
                            strokeWidth="34"
                          />
                          <path
                            d="M 245 33 A 155 155 0 0 1 313 70"
                            fill="none"
                            stroke="#FF704A"
                            strokeWidth="34"
                          />
                          <path
                            d="M 313 70 A 155 155 0 0 1 355 180"
                            fill="none"
                            stroke="#FF5D3D"
                            strokeWidth="34"
                          />

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
                          <circle
                            cx={centerX}
                            cy={centerY}
                            r="8"
                            fill="#0b1e3f"
                          />
                          <circle
                            cx={centerX}
                            cy={centerY}
                            r="3"
                            fill="white"
                          />
                        </svg>

                        {/* Score label */}
                        <div className="-mt-[108px] flex min-h-[85px] flex-col items-center justify-start">
                          <span className="text-4xl opacity-50 font-black leading-none tracking-tight text-[#0b1e3f] sm:text-[42px]">
                            {score}%
                          </span>
                          {/* <span className="mt-1.5 text-xs font-extrabold text-[#F36D45] sm:text-sm">
                            {selectedExam === "GMAT" ||
                            (selectedExam === "SAT" &&
                              satInputMode === "sections") ||
                            (selectedExam === "GRE" &&
                              greInputMode === "sections")
                              ? "Range position"
                              : getPerformanceLevel(score)}
                          </span> */}
                        </div>
                      </div>

                      {/* Performance scale */}
                      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] font-semibold text-slate-400 sm:text-xs">
                        <span>
                          {selectedExam === "GMAT"
                            ? "60"
                            : selectedExam === "TOEFL" && toeflScale === "current"
                              ? "1"
                            : selectedExam === "SAT" &&
                                satInputMode === "sections"
                              ? "200"
                              : selectedExam === "GRE" &&
                                  greInputMode === "sections"
                                ? "130"
                                : "Needs Improvement"}
                        </span>
                        <span>
                          {selectedExam === "GMAT"
                            ? "75"
                            : selectedExam === "TOEFL" && toeflScale === "current"
                              ? "3.5"
                            : selectedExam === "SAT" &&
                                satInputMode === "sections"
                              ? "500"
                              : selectedExam === "GRE" &&
                                  greInputMode === "sections"
                                ? "150"
                                : "Developing"}
                        </span>
                        <span>
                          {selectedExam === "GMAT"
                            ? "90"
                            : selectedExam === "TOEFL" && toeflScale === "current"
                              ? "6"
                            : selectedExam === "SAT" &&
                                satInputMode === "sections"
                              ? "800"
                              : selectedExam === "GRE" &&
                                  greInputMode === "sections"
                                ? "170"
                                : "Strong"}
                        </span>
                      </div>
                    </>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Report Section */}
      {showReport && report && (
        <section id="performance-report" className="px-4 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F36D45]">
                  PERFORMANCE INSIGHTS
                </p>
                <h2 className="mt-1 text-3xl font-extrabold">
                  Here's Where You Stand
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Review your overall performance, section strengths and the
                  areas that may need more focused preparation.
                </p>
              </div>
              <span className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45] sm:block">
                {report.exam === "PTE"
                  ? `PTE ${pteType === "core" ? "Core" : "Academic / UKVI"}`
                  : report.exam}
              </span>
            </div>

            {/* Priority Area */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">
                    YOUR PRIORITY AREA
                  </span>
                </div>
                <h3 className="text-2xl font-bold">
                  Focus on {report.weakestArea}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {report.exam === "PTE" ? (
                    <>
                      Your {report.weakestArea} score is the lowest of the four
                      communicative skills entered. Focus on the question types
                      that assess this skill and practise with timed tasks.
                    </>
                  ) : (
                    <>
                      Your current {report.weakestArea} performance shows an
                      opportunity to improve concept clarity, calculation
                      accuracy and timed problem-solving. Review weaker concepts
                      first and strengthen them through targeted question
                      practice.
                    </>
                  )}
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-bold">Recommended focus</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      "Concept Revision",
                      "Targeted Questions",
                      "Timed Problem Solving",
                      "Mistake Review",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                          <TrendingUp className="h-3 w-3 text-[#F36D45]" />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <GraduationCap className="h-6 w-6 text-[#F36D45]" />
                </div>
                <h3 className="text-lg font-bold">
                  Turn Your Weak Area Into a Strength
                </h3>
                <p className="mt-3 text-sm leading-5 text-slate-600">
                  Strengthen your {report.weakestArea} preparation with
                  structured lessons, targeted practice, mock tests and expert
                  guidance through Ooshas Prep online coaching.
                </p>
                <button className="mt-5 w-full rounded-xl bg-[#F36D45] px-4 py-3 text-sm font-bold text-white transition hover:brightness-95">
                  Explore {report.exam} Course →
                </button>
              </div>
            </div>

            {/* Strongest Area & Next Steps */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">
                    YOUR STRONGEST AREA
                  </span>
                </div>
                <h3 className="text-xl font-bold">{report.strongestArea}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {report.strongestArea} is currently your strongest area at{" "}
                  {report.exam === "PTE" ||
                  report.exam === "GMAT" ||
                  report.exam === "SAT" ||
                  report.exam === "GRE" ||
                  report.exam === "TOEFL"
                    ? `${report.sectionScores[report.strongestArea]}/${report.exam === "SAT" ? 800 : report.exam === "GRE" ? 170 : report.exam === "TOEFL" ? toeflScale === "current" ? 6 : 30 : 90}`
                    : `${report.percentages[report.strongestArea]}% performance`}
                  . Keep practising this section regularly while giving
                  additional preparation time to {report.weakestArea}.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36D45]">
                    RECOMMENDED NEXT STEP
                  </span>
                </div>
                <h3 className="text-xl font-bold">
                  Build Your {report.weakestArea}
                </h3>
                <ol className="mt-4 space-y-3">
                  {[
                    `Identify weaker topics within ${report.weakestArea}`,
                    "Complete targeted practice sets",
                    "Introduce regular timed sectional practice",
                    "Review mistakes before attempting the next test",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#F36D45]">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500">
              {(report.exam === "SAT" && satInputMode === "sections") ||
              (report.exam === "GRE" && greInputMode === "sections")
                ? "The combined score is the exact sum of the section scores you entered. The performance insights are for practice planning, not an official score report."
                : report.exam === "TOEFL"
                  ? "The total follows ETS's scoring rule for the selected TOEFL scale using the scores you entered. The performance insights are for practice planning, not an official score report."
                : `This ${report.exam} score calculator provides an estimated practice-performance analysis for preparation and planning purposes only. It should not be considered an official ${report.exam} result.`}
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
      {/* <WhySection data={pageInfo?.sections?.whySection?.fields} /> */}
      <DifferenceSection data={pageInfo?.sections?.differenceSection?.fields} />
      <BeyondNumberSection data={pageInfo?.sections?.beyondNumber?.fields} />
      <QuestionsSection
        page="calculator"
        heading="Student Questions & Comments"
        slug={slug}
      />
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
    <section
      className="relative xl:h-120 px-4 overflow-hidden bg-[#fcf3ed] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("/image/calculator-hero.webp")` }}
    >
      <div className="flex h-full max-w-7xl mx-auto items-center justify-start">
        <div className="relative pb-12 pt-12 sm:px-0 sm:pb-14 sm:pt-10">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-4xl">
            {rest.length > 0 ? (
              <>
                {firstPart.trim()}{" "}
                <span style={{ color: "#f36d45" }}>{rest.join("&")}</span>
              </>
            ) : (
              title
            )}
          </h1>
          <div
            className="mt-5 max-w-3xl text-sm leading-6 sm:text-lg sm:leading-7"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
          <div className="mt-7 flex flex-col justify-start gap-3 sm:flex-row">
            {data?.primaryButtonText && (
              <a
                href={data?.primaryButtonUrl || "#calculator"}
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 sm:w-auto"
                style={{ background: "#F36D45" }}
              >
                {data.primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
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
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-orange-600">
            More Than A Number
          </div>
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">
            {data?.title || ""}
          </h2>
          <div
            className="mt-5 max-w-3xl text-sm leading-6 text-[#0b1e3f]/80"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
          <button
            className="mt-7 px-5 py-3 text-xm font-bold text-white"
            onClick={() => router.push(data.buttonUrl)}
            style={{ background: "#F36D45" }}
          >
            {data?.buttonText || "Start Your Preparation"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data?.statistics?.map(({ number, label }: any, index: number) => (
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
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setisPopupOpen} />
    </section>
  );
}

function DifferenceSection({ data }: { data: any }) {
  return (
    <section id="how-it-works" className="bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="OUR DIFFERENCE"
          title={data?.title || ""}
          description={data?.description || ""}
        />
        {data?.Data && <EditorContent content_data={data.Data} />}
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
      <div className="mx-auto max-w-7xl">
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
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F36D45]">
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
  const [isPopupOpen, setisPopupOpen] = useState(false);
  return (
    <div>
      <section id="contact" className="bg-white px-4 pb-5">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10"
          style={{ background: "#F36D45" }}
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
                onClick={() => setisPopupOpen(true)}
                className="cursor-pointer bg-[#0b1e3f] px-5 py-3 text-sm font-bold text-white"
              >
                {data.primaryButtonText}
              </a>
            )}
            {data?.secondaryButtonText && (
              <a
                href={data?.secondaryButtonUrl || "#"}
                className="bg-white px-5 py-3 text-sm font-bold text-[#0b1e3f]"
              >
                {data.secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      </section>
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setisPopupOpen} />
    </div>
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
    <div className="mx-auto text-center">
      <h2
        className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
