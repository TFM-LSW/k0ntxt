const ACCESSIBLE_TONES = ["dark", "dark", "dark", "base", "base", "base"] as const;

const normalizeCategory = (category: number): number => {
  if (!Number.isFinite(category)) {
    return 1;
  }

  const normalized = Math.floor(category);
  if (normalized < 1) {
    return 1;
  }

  return ((normalized - 1) % 6) + 1;
};

export const getAccessibleChartColorTokenByCategory = (category: number): string => {
  const normalized = normalizeCategory(category);
  const tone = ACCESSIBLE_TONES[normalized - 1];
  return `chart.categorical.${normalized}.${tone}`;
};

export const getAccessibleChartColorTokenByIndex = (index: number): string =>
  getAccessibleChartColorTokenByCategory(index + 1);
