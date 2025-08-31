import type { RawCountryData, RawCountryEntry } from '@/app/data/co2.types';
import { getMetricForYear } from '.';

type SortState = { by: 'name' | 'population'; dir: 'asc' | 'desc' };

export function filterAndSortRows(
  data: RawCountryData,
  query: string,
  sort: SortState,
  selectedYear: number
): [string, RawCountryEntry][] {
  const q = query.trim().toLowerCase();
  let rows = Object.entries(data);
  if (q) {
    rows = rows.filter(([country]) => country.toLowerCase().includes(q));
  }

  const sign = sort.dir === 'asc' ? 1 : -1;

  rows.sort(([nameA, entryA], [nameB, entryB]) => {
    if (sort.by === 'name') {
      return nameA.localeCompare(nameB) * sign;
    }

    const a = getMetricForYear(entryA, selectedYear, 'population').value;
    const b = getMetricForYear(entryB, selectedYear, 'population').value;

    if (typeof a === 'number' && typeof b === 'number') return (a - b) * sign;
    if (typeof a === 'number') return -1;
    if (typeof b === 'number') return 1;

    return nameA.localeCompare(nameB) * sign;
  });

  return rows;
}
