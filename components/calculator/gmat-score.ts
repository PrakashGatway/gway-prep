type ScorePercentileBand = readonly [minimum: number, maximum: number, percentile: number];

const QUANT_PERCENTILES: readonly ScorePercentileBand[] = [
  [90, 90, 100], [89, 89, 97], [88, 88, 96], [87, 87, 94],
  [86, 86, 91], [85, 85, 88], [84, 84, 85], [83, 83, 80],
  [82, 82, 75], [81, 81, 70], [80, 80, 64], [79, 79, 57],
  [78, 78, 50], [77, 77, 43], [76, 76, 37], [75, 75, 32],
  [74, 74, 26], [73, 73, 22], [72, 72, 19], [71, 71, 15],
  [70, 70, 13], [69, 69, 10], [68, 68, 8], [67, 67, 6],
  [66, 66, 5], [65, 65, 4], [64, 64, 3], [62, 63, 2], [60, 61, 1],
];

const VERBAL_PERCENTILES: readonly ScorePercentileBand[] = [
  [90, 90, 100], [88, 89, 99], [87, 87, 98], [86, 86, 96],
  [85, 85, 94], [84, 84, 89], [83, 83, 83], [82, 82, 74],
  [81, 81, 66], [80, 80, 56], [79, 79, 47], [78, 78, 38],
  [77, 77, 30], [76, 76, 23], [75, 75, 18], [74, 74, 14],
  [73, 73, 10], [72, 72, 8], [71, 71, 6], [70, 70, 4],
  [68, 69, 3], [66, 67, 2], [60, 65, 1],
];

const DATA_INSIGHTS_PERCENTILES: readonly ScorePercentileBand[] = [
  [89, 90, 100], [86, 88, 99], [85, 85, 98], [84, 84, 97],
  [83, 83, 95], [82, 82, 93], [81, 81, 89], [80, 80, 83],
  [79, 79, 76], [78, 78, 69], [77, 77, 62], [76, 76, 53],
  [75, 75, 47], [74, 74, 41], [73, 73, 35], [72, 72, 29],
  [71, 71, 25], [70, 70, 21], [69, 69, 17], [68, 68, 14],
  [67, 67, 12], [66, 66, 10], [65, 65, 8], [64, 64, 7],
  [63, 63, 6], [62, 62, 5], [60, 61, 4],
];

const TOTAL_PERCENTILES: readonly ScorePercentileBand[] = [
  [735, 805, 100], [715, 725, 99], [705, 705, 98], [695, 695, 97],
  [685, 685, 96], [675, 675, 95], [665, 665, 92], [655, 655, 91],
  [645, 645, 87], [635, 635, 82], [625, 625, 79], [615, 615, 76],
  [605, 605, 70], [595, 595, 67], [585, 585, 61], [575, 575, 57],
  [565, 565, 51], [555, 555, 48], [545, 545, 42], [535, 535, 39],
  [525, 525, 34], [515, 515, 32], [505, 505, 27], [495, 495, 25],
  [485, 485, 21], [475, 475, 20], [465, 465, 17], [455, 455, 15],
  [445, 445, 13], [435, 435, 12], [425, 425, 10], [415, 415, 9],
  [405, 405, 7], [395, 395, 6], [375, 385, 5], [365, 365, 4],
  [345, 355, 3], [315, 335, 2], [265, 305, 1], [205, 255, 0],
];

function lookupPercentile(score: number, bands: readonly ScorePercentileBand[]): number {
  return bands.find(([minimum, maximum]) => score >= minimum && score <= maximum)?.[2] ?? 0;
}

export function calculateGMATScore(quant: number, verbal: number, dataInsights: number): number {
  const rawScore = ((quant + verbal + dataInsights - 180) * 20) / 3 + 205;
  // Match Magoosh's live calculator: round to the nearest 5, then move a
  // multiple of 10 down by 5 so every reported total ends in 5.
  const nearestFiveMultiple = Math.round(rawScore / 5);
  const reportedScore =
    nearestFiveMultiple * 5 - (nearestFiveMultiple % 2 === 0 ? 5 : 0);
  return Math.min(805, Math.max(205, reportedScore));
}

export function getGMATPercentiles(quant: number, verbal: number, dataInsights: number) {
  const total = calculateGMATScore(quant, verbal, dataInsights);
  return {
    total,
    overall: lookupPercentile(total, TOTAL_PERCENTILES),
    quantitative: lookupPercentile(quant, QUANT_PERCENTILES),
    verbal: lookupPercentile(verbal, VERBAL_PERCENTILES),
    dataInsights: lookupPercentile(dataInsights, DATA_INSIGHTS_PERCENTILES),
  };
}
