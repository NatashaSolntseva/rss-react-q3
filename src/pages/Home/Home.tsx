import { Suspense } from 'react';
import type { RawCountryData } from '@/app/data/co2.types';
import { co2Resource } from '@/app/data';
import CountriesTable from '@/widgets/CountriesTable/CountriesTable';

function Fallback() {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 animate-pulse text-gray-600">
      Loading CO₂ dataset…
    </div>
  );
}

export const Home = () => {
  const data: RawCountryData = co2Resource.read();
  const selectedYear = 2023;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Home Page</h2>
      <p className="mb-4">
        Welcome to the CO₂ Dashboard. Select a year, filter by region, and
        explore emissions data.
      </p>
      <Suspense fallback={<Fallback />}>
        <CountriesTable data={data} selectedYear={selectedYear} />
      </Suspense>
    </div>
  );
};
