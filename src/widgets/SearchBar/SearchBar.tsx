type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="w-full max-w-md">
      <label className="sr-only" htmlFor="country-search">
        Search
      </label>
      <input
        id="country-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search country...'}
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
