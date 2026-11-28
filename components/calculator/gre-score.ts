export type GREPercentiles = {
  verbal: number;
  quantitative: number;
  analyticalWriting: number | null;
};

const VERBAL_PERCENTILES: readonly number[] = [
  0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 17, 19, 21, 24,
  26, 29, 31, 34, 37, 39, 42, 45, 47, 50, 53, 57, 60, 63, 67, 71, 76, 81,
  86, 91,
];

const QUANTITATIVE_PERCENTILES: readonly (number | null)[] = [
  null, null, null, 1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 17, 19, 21,
  24, 26, 29, 31, 34, 37, 39, 42, 45, 47, 50, 53, 57, 60, 63, 67, 71, 76,
  81, 86, 91,
];

const WRITING_PERCENTILES: Readonly<Record<number, number>> = {
  1.5: 1,
  2: 3,
  2.5: 8,
  3: 17,
  3.5: 43,
  4: 63,
  4.5: 85,
  5: 93,
  5.5: 98,
  6: 99,
};

function getPercentile(score: number, table: readonly (number | null)[]): number | null {
  const clampedScore = Math.max(130, Math.min(170, Math.round(score)));
  return table[clampedScore - 130] ?? null;
}

export function getGREPercentiles(
  verbal: number,
  quantitative: number,
  analyticalWriting: number,
): GREPercentiles {
  return {
    verbal: getPercentile(verbal, VERBAL_PERCENTILES) ?? 0,
    quantitative: getPercentile(quantitative, QUANTITATIVE_PERCENTILES) ?? 0,
    analyticalWriting: WRITING_PERCENTILES[analyticalWriting] ?? null,
  };
}
