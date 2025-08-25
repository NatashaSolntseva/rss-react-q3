export const REQUIRED_COLUMNS = [
  'population',
  'co2',
  'co2_per_capita',
] as const;
export type RequiredColumn = (typeof REQUIRED_COLUMNS)[number];
