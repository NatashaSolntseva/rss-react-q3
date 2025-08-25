type Props = {
  years: number[];
  value: number;
  onChange: (y: number) => void;
};

export const YearSelect = ({ years, value, onChange }: Props) => {
  return (
    <label className="text-sm text-gray-700 flex items-center gap-2">
      <span>Year:</span>
      <select
        className="border rounded px-2 py-1 bg-white"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </label>
  );
};
