import { useState } from 'react';
import type { RawCountryData } from '@/app/data/co2.types';
import { co2Resource } from '@/app/data';

import { ColumnPickerModal } from '@/widgets/';
import {
  filterAndSortRows,
  formatMetric,
  getAvailableFields,
  getMetricForYear,
  getYears,
} from '@/shared/utils';
import { CountryRow } from './CountryRow';
import { ControlsBar } from './ControlsBar';
import { TableHeader } from './TableHeader';

type SortState = { by: 'name' | 'population'; dir: 'asc' | 'desc' };

export const CountriesTable = () => {
  const data: RawCountryData = co2Resource.read();

  const years = getYears(data);
  const allOptionalFields = getAvailableFields(data);

  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState>({ by: 'name', dir: 'asc' });
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const rows = filterAndSortRows(data, query, sort, selectedYear);

  const hasResults = rows.length > 0;

  return (
    <>
      <ControlsBar
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        onOpenColumns={() => setPickerOpen(true)}
      />

      <div className="rounded border border-gray-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse">
            <TableHeader selectedColumns={selectedColumns} />
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
                rows.map(([country, entry]) => (
                  <CountryRow
                    key={country}
                    country={country}
                    entry={entry}
                    selectedYear={selectedYear}
                    selectedColumns={selectedColumns}
                    formatMetric={formatMetric}
                    getMetricForYear={getMetricForYear}
                  />
                ))
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
