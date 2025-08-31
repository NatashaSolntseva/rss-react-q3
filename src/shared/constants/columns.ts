import type { YearlyField } from '@/app/data/co2.types';

export const REQUIRED_COLUMNS: YearlyField[] = [
  'population',
  'co2',
  'co2_per_capita',
];
export type RequiredColumn = (typeof REQUIRED_COLUMNS)[number];
