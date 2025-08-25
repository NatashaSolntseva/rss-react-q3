import { Suspense } from 'react';
import DataStatus from '@/features/DataStatus/DataStatus';

function Fallback() {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 animate-pulse text-gray-600">
      Loading CO₂ dataset…
    </div>
  );
}

export const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Home Page</h2>
      <p className="mb-4">
        Welcome to the CO₂ Dashboard. Select a year, filter by region, and
        explore emissions data.
      </p>
      <Suspense fallback={<Fallback />}>
        <DataStatus />
      </Suspense>
    </div>
  );
};
