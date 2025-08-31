import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  allFields: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export const ColumnPickerModal = ({
  isOpen,
  onClose,
  allFields,
  selected,
  onChange,
}: Props) => {
  const [selectedDraft, setSelectedDraft] = useState<string[]>(selected);

  useEffect(() => {
    if (isOpen) setSelectedDraft(selected);
  }, [isOpen, selected]);

  if (!isOpen) return null;

  const toggle = (k: string) => {
    setSelectedDraft((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  };

  const handleClear = () => setSelectedDraft([]);
  const handleDone = () => {
    onChange(selectedDraft);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                      w-full md:w-[640px] rounded-t-2xl md:rounded-2xl bg-white shadow-lg"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select additional columns</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allFields.map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 border rounded px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={selectedDraft.includes(key)}
                  onChange={() => toggle(key)}
                />
                <span className="text-sm">{key}</span>
              </label>
            ))}
          </div>
          {allFields.length === 0 && (
            <p className="text-sm text-gray-500">
              No additional numeric fields detected.
            </p>
          )}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-2 text-sm border rounded hover:bg-gray-50 cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={handleDone}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
