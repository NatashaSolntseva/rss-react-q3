import type { RawCountryEntry } from '@/app/data/co2.types';

export function getLatestYear(entry: RawCountryEntry): number {
  const last = entry.data[entry.data.length - 1];
  return last?.year ?? NaN;
}

export function getPopulationForYear(
  entry: RawCountryEntry,
  targetYear: number
): { year: number; population?: number } {
  const exact = entry.data.find((r) => r.year === targetYear);
  if (exact)
    return {
      year: exact.year,
      population:
        typeof exact.population === 'number' ? exact.population : undefined,
    };

  for (let i = entry.data.length - 1; i >= 0; i--) {
    const row = entry.data[i];
    if (row.year <= targetYear) {
      return {
        year: row.year,
        population:
          typeof row.population === 'number' ? row.population : undefined,
      };
    }
  }

  return { year: targetYear, population: undefined };
}
