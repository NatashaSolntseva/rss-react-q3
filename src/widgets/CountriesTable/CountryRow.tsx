import type { RawCountryEntry } from '@/app/data/co2.types';
import { memo } from 'react';
import { useFlashOnChange } from '../../shared/utils/useFlashOnChange';

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

function CountryRowComponent({
  country,
  entry,
  selectedYear,
  selectedColumns,
  formatMetric,
  getMetricForYear,
}: Props) {
  const pop = getMetricForYear(entry, selectedYear, 'population');
  const co2 = getMetricForYear(entry, selectedYear, 'co2');
  const co2p = getMetricForYear(entry, selectedYear, 'co2_per_capita');

  const flash = useFlashOnChange(selectedYear);

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{country}</td>
      <td className="px-4 py-2 text-gray-600">{entry.iso_code ?? 'N/A'}</td>
      <td className="px-4 py-2 text-right">{pop.year}</td>

      <td
        className={`px-4 py-2 text-right font-medium ${flash ? 'flash-updated' : ''}`}
      >
        {formatMetric(pop.value)}
      </td>
      <td className={`px-4 py-2 text-right ${flash ? 'flash-updated' : ''}`}>
        {formatMetric(co2.value, 2)}
      </td>
      <td className={`px-4 py-2 text-right ${flash ? 'flash-updated' : ''}`}>
        {formatMetric(co2p.value, 3)}
      </td>

      {selectedColumns.map((col) => {
        const m = getMetricForYear(entry, selectedYear, col as any);
        return (
          <td
            key={`${country}-${col}-${selectedYear}`}
            className={`px-4 py-2 text-right ${flash ? 'flash-updated' : ''}`}
          >
            {formatMetric(m.value)}
          </td>
        );
      })}
    </tr>
  );
}

export const CountryRow = memo(CountryRowComponent);
