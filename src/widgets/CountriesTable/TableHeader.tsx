type Props = {
  selectedColumns: string[];
};

export const TableHeader = ({ selectedColumns }: Props) => {
  return (
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
  );
};
