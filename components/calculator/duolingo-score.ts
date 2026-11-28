export type DuolingoSkills = {
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
};

export const DUOLINGO_MIN_SCORE = 10;
export const DUOLINGO_MAX_SCORE = 160;

export function normalizeDuolingoScore(value: number): number {
  const clamped = Math.min(DUOLINGO_MAX_SCORE, Math.max(DUOLINGO_MIN_SCORE, value));
  return DUOLINGO_MIN_SCORE + Math.round((clamped - DUOLINGO_MIN_SCORE) / 5) * 5;
}

export function roundDuolingoScore(value: number): number {
  return Math.min(DUOLINGO_MAX_SCORE, Math.max(DUOLINGO_MIN_SCORE, Math.ceil(value / 5) * 5));
}

// Match the reference calculator: round each integrated pair average up to
// the 5-point score scale, then average those four scores for the overall.
export function calculateDuolingoScore(scores: DuolingoSkills) {
  const reading = normalizeDuolingoScore(scores.reading);
  const writing = normalizeDuolingoScore(scores.writing);
  const listening = normalizeDuolingoScore(scores.listening);
  const speaking = normalizeDuolingoScore(scores.speaking);
  const integrated = {
    literacy: roundDuolingoScore((reading + writing) / 2),
    comprehension: roundDuolingoScore((reading + listening) / 2),
    conversation: roundDuolingoScore((listening + speaking) / 2),
    production: roundDuolingoScore((writing + speaking) / 2),
  };
  const overallAverage =
    (integrated.literacy +
      integrated.comprehension +
      integrated.conversation +
      integrated.production) /
    4;

  return {
    individual: { reading, writing, listening, speaking },
    overall: roundDuolingoScore(overallAverage),
    unroundedAverage: overallAverage,
    integrated,
  };
}
