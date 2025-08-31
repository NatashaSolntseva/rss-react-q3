import { memo } from 'react';

type SortBy = 'name' | 'population';
type SortDir = 'asc' | 'desc';

export type SortState = { by: SortBy; dir: SortDir };

type Props = {
  value: SortState;
  onChange: (v: SortState) => void;
};

function SortSelectComponent({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-700">Sort by:</label>
      <select
        className="border rounded px-2 py-1 bg-white"
        value={value.by}
        onChange={(e) =>
          onChange({ ...value, by: e.target.value as SortState['by'] })
        }
      >
        <option value="name">Name</option>
        <option value="population">Population (selected year)</option>
      </select>

      <select
        className="border rounded px-2 py-1 bg-white"
        value={value.dir}
        onChange={(e) =>
          onChange({ ...value, dir: e.target.value as SortState['dir'] })
        }
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}

export const SortSelect = memo(SortSelectComponent);
