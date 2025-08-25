import type { RawCountryData } from '@/app/data/co2.types';
import { getPopulationForYear } from '@/shared/utils/getPopulationForYear';

type Props = {
  data: RawCountryData;
  selectedYear: number;
  searchQuery?: string;
};

export default function CountriesTable({
  data,
  selectedYear,
  searchQuery = '',
}: Props) {
  const rowsAll = Object.entries(data);

  const q = searchQuery.trim().toLowerCase();
  const rows = q
    ? rowsAll.filter(([country]) => country.toLowerCase().includes(q))
    : rowsAll;

  const hasResults = rows.length > 0;

  return (
    <div className="rounded border border-gray-200 bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left w-2/5">Country</th>
              <th className="px-4 py-2 text-left w-1/5">ISO</th>
              <th className="px-4 py-2 text-right w-2/5">
                Population ({selectedYear})
              </th>
            </tr>
          </thead>
          <tbody>
            {!hasResults ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>
                  No countries match “{searchQuery}”
                </td>
              </tr>
            ) : (
              rows.map(([country, entry]) => {
                const { year, population } = getPopulationForYear(
                  entry,
                  selectedYear
                );
                return (
                  <tr key={country} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{country}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {entry.iso_code ?? 'N/A'}
                    </td>
                    <td
                      key={`${country}-${year}-${selectedYear}`}
                      className="px-4 py-2 text-right font-medium flash-updated"
                      title={
                        year !== selectedYear
                          ? `No data for ${selectedYear}, showing ${year}`
                          : undefined
                      }
                    >
                      {typeof population === 'number'
                        ? population.toLocaleString()
                        : 'N/A'}
                      {year !== selectedYear &&
                      typeof population === 'number' ? (
                        <span className="ml-2 text-xs text-gray-500">
                          ({year})
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
