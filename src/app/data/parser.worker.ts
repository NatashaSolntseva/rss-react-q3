import type { RawCountryData } from './co2.types';

self.onmessage = (e: MessageEvent<string>) => {
  try {
    const parsed = JSON.parse(e.data) as RawCountryData;
    (self as unknown as Worker).postMessage({ ok: true, data: parsed });
  } catch (err) {
    (self as unknown as Worker).postMessage({ ok: false, error: String(err) });
  }
};
