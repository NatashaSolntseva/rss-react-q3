import { SearchBar, SortSelect, YearSelect } from '@/widgets/';
import { memo } from 'react';

type SortState = { by: 'name' | 'population'; dir: 'asc' | 'desc' };

type Props = {
  years: number[];
  selectedYear: number;
  onYearChange: (y: number) => void;

  query: string;
  onQueryChange: (v: string) => void;

  sort: SortState;
  onSortChange: (s: SortState) => void;

  onOpenColumns: () => void;
};

function ControlsBarComponent({
  years,
  selectedYear,
  onYearChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  onOpenColumns,
}: Props) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <YearSelect
          years={years}
          value={selectedYear}
          onChange={onYearChange}
        />
        <SearchBar
          value={query}
          onChange={onQueryChange}
          placeholder="Search country…"
        />
        <SortSelect value={sort} onChange={onSortChange} />
        <button
          onClick={onOpenColumns}
          className="ml-auto px-3 py-2 text-sm border rounded hover:bg-gray-50 cursor-pointer"
        >
          Choose columns
        </button>
      </div>
    </div>
  );
}

export const ControlsBar = memo(ControlsBarComponent);
