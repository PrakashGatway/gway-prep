export type DuolingoSkills = {
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
};

export const DUOLINGO_MIN_SCORE = 10;
export const DUOLINGO_MAX_SCORE = 160;

export function roundDuolingoScore(value: number): number {
  return Math.min(DUOLINGO_MAX_SCORE, Math.max(DUOLINGO_MIN_SCORE, Math.round(value / 5) * 5));
}

// DET reports scores in 5-point increments. The overall is the four
// individual subscores' average rounded to the nearest 5; each integrated
// subscore combines its corresponding two individual skills.
export function calculateDuolingoScore(scores: DuolingoSkills) {
  const { reading, writing, listening, speaking } = scores;
  const average = (reading + writing + listening + speaking) / 4;

  return {
    overall: roundDuolingoScore(average),
    unroundedAverage: average,
    integrated: {
      literacy: roundDuolingoScore((reading + writing) / 2),
      comprehension: roundDuolingoScore((reading + listening) / 2),
      conversation: roundDuolingoScore((listening + speaking) / 2),
      production: roundDuolingoScore((writing + speaking) / 2),
    },
  };
}
