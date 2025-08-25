import type { RawCountryEntry } from '@/app/data/co2.types';

export function getLatestYear(entry: RawCountryEntry): number {
  const last = entry.data[entry.data.length - 1];
  return last?.year ?? NaN;
}

export function getMetricForYear<
  T extends keyof NonNullable<RawCountryEntry['data'][number]>,
>(
  entry: RawCountryEntry,
  targetYear: number,
  field: T
): { year: number; value: number | undefined } {
  const exact = entry.data.find((r) => r.year === targetYear);
  if (exact) {
    const v = exact[field];
    return {
      year: exact.year,
      value: typeof v === 'number' ? (v as number) : undefined,
    };
  }

  for (let i = entry.data.length - 1; i >= 0; i--) {
    const row = entry.data[i];
    if (row.year <= targetYear) {
      const v = row[field];
      return {
        year: row.year,
        value: typeof v === 'number' ? (v as number) : undefined,
      };
    }
  }
  return { year: targetYear, value: undefined };
}
