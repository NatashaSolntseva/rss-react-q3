import type { RawCountryEntry, YearlyField } from '@/app/data/co2.types';
import { memo } from 'react';
import { useFlashOnChange } from '@/shared/utils/useFlashOnChange';

type Props = {
  country: string;
  entry: RawCountryEntry;
  selectedYear: number;
  selectedColumns: YearlyField[];

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

  const popStr = formatMetric(pop.value);
  const co2Str = formatMetric(co2.value, 2);
  const co2pStr = formatMetric(co2p.value, 3);
  const flashPop = useFlashOnChange(popStr, 3000);
  const flashCo2 = useFlashOnChange(co2Str, 3000);
  const flashCo2p = useFlashOnChange(co2pStr, 3000);

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{country}</td>
      <td className="px-4 py-2 text-gray-600">{entry.iso_code ?? 'N/A'}</td>
      <td className="px-4 py-2 text-right">{pop.year}</td>

      <td
        className={`px-4 py-2 text-right font-medium ${flashPop ? 'flash-updated' : ''}`}
      >
        {formatMetric(pop.value)}
      </td>
      <td className={`px-4 py-2 text-right ${flashCo2 ? 'flash-updated' : ''}`}>
        {formatMetric(co2.value, 2)}
      </td>
      <td
        className={`px-4 py-2 text-right ${flashCo2p ? 'flash-updated' : ''}`}
      >
        {formatMetric(co2p.value, 3)}
      </td>

      {selectedColumns.map((col) => {
        const m = getMetricForYear(entry, selectedYear, col);
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
