import type { RawCountryData } from '@/app/data/co2.types';
import { REQUIRED_COLUMNS } from '../constants/columns';

export function getAvailableFields(data: RawCountryData): string[] {
  const fields = new Set<string>();

  for (const entry of Object.values(data)) {
    for (const row of entry.data) {
      for (const [k, v] of Object.entries(row)) {
        if (k === 'year') continue;
        if (REQUIRED_COLUMNS.includes(k as any)) continue;
        if (typeof v === 'number') fields.add(k);
      }
    }
  }

  return Array.from(fields).sort((a, b) => a.localeCompare(b));
}
