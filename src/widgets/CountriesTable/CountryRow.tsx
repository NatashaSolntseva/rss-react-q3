import type { RawCountryEntry } from '@/app/data/co2.types';

type Props = {
  country: string;
  entry: RawCountryEntry;
  selectedYear: number;
  selectedColumns: string[];

  formatMetric: (val: number | undefined, digits?: number) => string;
  getMetricForYear: (
    entry: RawCountryEntry,
    year: number,
    field: keyof RawCountryEntry['data'][number] & string
  ) => { year: number; value: number | undefined };
};

export const CountryRow = ({
  country,
  entry,
  selectedYear,
  selectedColumns,
  formatMetric,
  getMetricForYear,
}: Props) => {
  const pop = getMetricForYear(entry, selectedYear, 'population');
  const co2 = getMetricForYear(entry, selectedYear, 'co2');
  const co2p = getMetricForYear(entry, selectedYear, 'co2_per_capita');

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{country}</td>
      <td className="px-4 py-2 text-gray-600">{entry.iso_code ?? 'N/A'}</td>
      <td className="px-4 py-2 text-right">{pop.year}</td>

      <td className="px-4 py-2 text-right font-medium flash-updated">
        {formatMetric(pop.value)}
      </td>
      <td className="px-4 py-2 text-right flash-updated">
        {formatMetric(co2.value, 2)}
      </td>
      <td className="px-4 py-2 text-right flash-updated">
        {formatMetric(co2p.value, 3)}
      </td>

      {selectedColumns.map((col) => {
        const m = getMetricForYear(entry, selectedYear, col as any);
        return (
          <td
            key={`${country}-${col}-${m.year}`}
            className="px-4 py-2 text-right flash-updated"
          >
            {formatMetric(m.value)}
          </td>
        );
      })}
    </tr>
  );
};
