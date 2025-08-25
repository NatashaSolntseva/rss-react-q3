import { co2Resource } from '@/app/data';
import type { RawCountryData } from '@/app/data/co2.types';

export default function DataStatus() {
  const data: RawCountryData = co2Resource.read();
  const countryCount = Object.keys(data).length;

  return (
    <div className="rounded border border-gray-200 bg-white p-4">
      <h2 className="text-xl font-semibold mb-1">Dataset loaded</h2>
      <p className="text-gray-700">
        Countries/regions: <span className="font-medium">{countryCount}</span>
      </p>
    </div>
  );
}
