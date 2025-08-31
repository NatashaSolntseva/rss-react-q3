export type YearlyRow = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [k: string]: number | string | undefined;
};

export type RawCountryEntry = {
  iso_code?: string;
  data: YearlyRow[];
};

export type RawCountryData = Record<string, RawCountryEntry>;

export type YearlyData = RawCountryEntry['data'][number];
export type YearlyField = keyof YearlyData & string;
