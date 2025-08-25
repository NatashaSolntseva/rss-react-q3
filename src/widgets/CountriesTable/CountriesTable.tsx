import { useState } from 'react';
import type { RawCountryData } from '@/app/data/co2.types';
import { co2Resource } from '@/app/data';

import {
  ColumnPickerModal,
  SearchBar,
  SortSelect,
  YearSelect,
} from '@/widgets/';
import {
  formatMetric,
  getAvailableFields,
  getMetricForYear,
} from '@/shared/utils';

type SortState = { by: 'name' | 'population'; dir: 'asc' | 'desc' };

export const CountriesTable = () => {
  const data: RawCountryData = co2Resource.read();

  const set = new Set<number>();
  for (const entry of Object.values(data))
    for (const row of entry.data) set.add(row.year);
  const years = Array.from(set).sort((a, b) => b - a);

  const allOptionalFields = getAvailableFields(data);

  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState>({ by: 'name', dir: 'asc' });
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const q = query.trim().toLowerCase();
  let rows = Object.entries(data);
  if (q) rows = rows.filter(([country]) => country.toLowerCase().includes(q));

  const sign = sort.dir === 'asc' ? 1 : -1;
  rows.sort(([nameA, entryA], [nameB, entryB]) => {
    if (sort.by === 'name') return nameA.localeCompare(nameB) * sign;
    const a = getMetricForYear(entryA, selectedYear, 'population').value;
    const b = getMetricForYear(entryB, selectedYear, 'population').value;
    if (typeof a === 'number' && typeof b === 'number') return (a - b) * sign;
    if (typeof a === 'number') return -1;
    if (typeof b === 'number') return 1;
    return nameA.localeCompare(nameB) * sign;
  });

  const hasResults = rows.length > 0;

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <YearSelect
            years={years}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search country…"
          />
          <SortSelect value={sort} onChange={setSort} />

          <button
            onClick={() => setPickerOpen(true)}
            className="ml-auto px-3 py-2 text-sm border rounded hover:bg-gray-50 cursor-pointer"
          >
            Choose columns
          </button>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left w-1/5">Country</th>
                <th className="px-4 py-2 text-left w-1/8">ISO</th>
                <th className="px-4 py-2 text-right w-1/12">Year</th>
                <th className="px-4 py-2 text-right w-1/6">Population</th>
                <th className="px-4 py-2 text-right w-1/6">CO₂</th>
                <th className="px-4 py-2 text-right w-1/6">CO₂ per capita</th>
                {selectedColumns.map((col) => (
                  <th key={`h-${col}`} className="px-4 py-2 text-right">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!hasResults ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={6 + selectedColumns.length}
                  >
                    No countries match “{query}”
                  </td>
                </tr>
              ) : (
                rows.map(([country, entry]) => {
                  const pop = getMetricForYear(
                    entry,
                    selectedYear,
                    'population'
                  );
                  const co2 = getMetricForYear(entry, selectedYear, 'co2');
                  const co2pc = getMetricForYear(
                    entry,
                    selectedYear,
                    'co2_per_capita'
                  );

                  return (
                    <tr key={country} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{country}</td>
                      <td className="px-4 py-2 text-gray-600">
                        {entry.iso_code ?? 'N/A'}
                      </td>
                      <td className="px-4 py-2 text-right">{pop.year}</td>

                      <td className="px-4 py-2 text-right font-medium flash-updated">
                        {formatMetric(pop.value)}
                      </td>
                      <td className="px-4 py-2 text-right flash-updated">
                        {formatMetric(co2.value, 2)}
                      </td>
                      <td className="px-4 py-2 text-right flash-updated">
                        {formatMetric(co2pc.value, 3)}
                      </td>

                      {selectedColumns.map((col) => {
                        const m = getMetricForYear(
                          entry,
                          selectedYear,
                          col as any
                        );
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ColumnPickerModal
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        allFields={allOptionalFields}
        selected={selectedColumns}
        onChange={setSelectedColumns}
      />
    </>
  );
};
