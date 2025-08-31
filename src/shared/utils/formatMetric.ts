export function formatMetric(val: number | undefined, digits?: number): string {
  if (typeof val !== 'number' || Number.isNaN(val)) return 'N/A';
  if (typeof digits === 'number') return val.toFixed(digits);
  return val.toLocaleString();
}
