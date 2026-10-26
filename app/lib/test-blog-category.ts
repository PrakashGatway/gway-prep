const TEST_NAME = /(?:^|[^a-z0-9])(duolingo|toefl|ielts|gmat|gre|pte|sat)(?=$|[^a-z0-9])/i;

export function getTestCategory(source: string | undefined | null): string | null {
  return source?.match(TEST_NAME)?.[1].toUpperCase() || null;
}

export function testCategoryPattern(test: string): RegExp | null {
  const normalized = getTestCategory(test);
  if (normalized !== test.trim().toUpperCase()) return null;
  return new RegExp(`(?:^|[^a-z0-9])${normalized}(?=$|[^a-z0-9])`, "i");
}
