const readingWritingModule1 = [
  200, 200, 200, 200, 200, 200, 210, 220, 240, 250, 260, 270, 300, 330, 350,
  360, 360, 380, 390, 400, 410, 420, 420, 430, 440, 460, 470, 480, 490, 500,
  510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650,
  660,
];
const readingWritingModule2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 400, 410, 430,
  430, 440, 460, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570,
  580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 730,
  760, 780, 800,
];
const mathModule1 = [
  200, 200, 200, 200, 200, 200, 210, 240, 270, 300, 310, 330, 340, 350, 360,
  370, 380, 390, 400, 410, 420, 430, 440, 460, 480, 500, 520, 530, 540, 560,
  580, 590, 600, 620, 630, 650, 670, 690,
];
const mathModule2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 380, 390, 410, 420, 430,
  440, 450, 470, 490, 510, 530, 540, 550, 570, 580, 590, 600, 620, 630, 650,
  680, 700, 720, 730, 750, 770, 780, 790, 800,
];

const readingWritingPercentile: Record<number, number> = {
  200: 1, 210: 1, 220: 1, 230: 1, 240: 1, 250: 1, 260: 1, 270: 1, 280: 1,
  290: 1, 300: 1, 310: 1, 320: 2, 330: 3, 340: 4, 350: 5, 360: 7, 370: 9,
  380: 10, 390: 13, 400: 15, 410: 17, 420: 20, 430: 23, 440: 25, 450: 29,
  460: 32, 470: 36, 480: 40, 490: 44, 500: 47, 510: 52, 520: 57, 530: 61,
  540: 65, 550: 68, 560: 71, 570: 73, 580: 76, 590: 79, 600: 81, 610: 83,
  620: 85, 630: 87, 640: 89, 650: 90, 660: 91, 670: 92, 680: 93, 690: 94,
  700: 95, 710: 96, 720: 97, 730: 97, 740: 98, 750: 98, 760: 99, 770: 99,
  780: 99, 790: 99, 800: 99,
};
const mathPercentile: Record<number, number> = {
  200: 1, 210: 1, 220: 1, 230: 1, 240: 1, 250: 1, 260: 1, 270: 1, 280: 1,
  290: 1, 300: 1, 310: 1, 320: 2, 330: 2, 340: 3, 350: 5, 360: 7, 370: 9,
  380: 11, 390: 13, 400: 16, 410: 19, 420: 22, 430: 24, 440: 28, 450: 31,
  460: 34, 470: 38, 480: 41, 490: 44, 500: 48, 510: 51, 520: 55, 530: 58,
  540: 62, 550: 65, 560: 68, 570: 71, 580: 74, 590: 76, 600: 79, 610: 81,
  620: 84, 630: 86, 640: 88, 650: 90, 660: 92, 670: 93, 680: 95, 690: 96,
  700: 97, 710: 97, 720: 98, 730: 99, 740: 99, 750: 99, 760: 99, 770: 99,
  780: 99, 790: 99, 800: 99,
};
const compositePercentile: Record<number, number> = {
  400: 1, 410: 1, 420: 1, 430: 1, 440: 1, 450: 1, 460: 1, 470: 1, 480: 1,
  490: 1, 500: 1, 510: 1, 520: 1, 530: 1, 540: 1, 550: 1, 560: 1, 570: 1,
  580: 1, 590: 1, 600: 1, 610: 1, 620: 1, 630: 1, 640: 1, 650: 1, 660: 1,
  670: 2, 680: 2, 690: 3, 700: 4, 710: 4, 720: 5, 730: 6, 740: 7, 750: 8,
  760: 9, 770: 10, 780: 11, 790: 13, 800: 14, 810: 16, 820: 17, 830: 18,
  840: 20, 850: 21, 860: 23, 870: 24, 880: 26, 890: 27, 900: 29, 910: 31,
  920: 33, 930: 35, 940: 36, 950: 38, 960: 40, 970: 42, 980: 44, 990: 46,
  1000: 48, 1010: 50, 1020: 52, 1030: 54, 1040: 56, 1050: 58, 1060: 60,
  1070: 61, 1080: 63, 1090: 65, 1100: 67, 1110: 69, 1120: 70, 1130: 71,
  1140: 73, 1150: 74, 1160: 76, 1170: 77, 1180: 78, 1190: 80, 1200: 81,
  1210: 82, 1220: 83, 1230: 84, 1240: 85, 1250: 86, 1260: 87, 1270: 88,
  1280: 89, 1290: 90, 1300: 91, 1310: 92, 1320: 93, 1330: 93, 1340: 94,
  1350: 94, 1360: 95, 1370: 96, 1380: 96, 1390: 97, 1400: 97, 1410: 97,
  1420: 98, 1430: 98, 1440: 98, 1450: 99, 1460: 99, 1470: 99, 1480: 99,
  1490: 99, 1500: 99, 1510: 99, 1520: 99, 1530: 99, 1540: 99, 1550: 99,
  1560: 99, 1570: 99, 1580: 99, 1590: 99, 1600: 99,
};

function lookupPercentile(score: number, table: Record<number, number>): number {
  const floors = Object.keys(table).map(Number).filter((value) => value <= score);
  return table[Math.max(...floors)] ?? 1;
}

export type SATResult = {
  total: number;
  rw: number;
  math: number;
  rwPercent: number;
  mathPercent: number;
  totalPercent: number;
};

export function calculateSATScore(
  scores: {
    readingWritingModule1: number;
    readingWritingModule2: number;
    mathModule1: number;
    mathModule2: number;
  },
  official?: { rw: number; math: number },
): SATResult {
  const rwRaw = Math.min(54, Math.max(0, scores.readingWritingModule1 + scores.readingWritingModule2));
  const mathRaw = Math.min(44, Math.max(0, scores.mathModule1 + scores.mathModule2));
  const rwAdaptiveTable = scores.readingWritingModule1 < 19
    ? readingWritingModule1
    : readingWritingModule2;
  const mathAdaptiveTable = scores.mathModule1 < 16 ? mathModule1 : mathModule2;
  const rw = official?.rw ?? rwAdaptiveTable[rwRaw] ?? 800;
  const math = official?.math ?? mathAdaptiveTable[mathRaw] ?? 800;
  const total = rw + math;

  return {
    total,
    rw,
    math,
    rwPercent: lookupPercentile(rw, readingWritingPercentile),
    mathPercent: lookupPercentile(math, mathPercentile),
    totalPercent: lookupPercentile(total, compositePercentile),
  };
}
