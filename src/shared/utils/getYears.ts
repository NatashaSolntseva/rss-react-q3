import type { RawCountryData } from '@/app/data/co2.types';

export function getYears(data: RawCountryData): number[] {
  const set = new Set<number>();
  for (const entry of Object.values(data)) {
    for (const row of entry.data) {
      set.add(row.year);
    }
  }
  return Array.from(set).sort((a, b) => b - a);
}
