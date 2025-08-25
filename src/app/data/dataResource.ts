import type { RawCountryData } from './co2.types';

let cache: RawCountryData | null = null;
let inflight: Promise<RawCountryData> | null = null;

function parseInWorker(raw: string): Promise<RawCountryData> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./parser.worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = (
      e: MessageEvent<{ ok: boolean; data?: RawCountryData; error?: string }>
    ) => {
      worker.terminate();
      if (e.data.ok && e.data.data) resolve(e.data.data);
      else reject(new Error(e.data.error || 'Worker parse error'));
    };
    worker.postMessage(raw);
  });
}

async function load(url: string) {
  console.log('[resource] start fetch', url);
  const resp = await fetch(url, { cache: 'force-cache' });
  console.log(
    '[resource] response',
    resp.status,
    resp.headers.get('content-length')
  );
  const text = await resp.text();
  console.log('[resource] text length', text.length);
  const data = await parseInWorker(text);
  console.log('[resource] parsed in worker');
  return data;
}

export function createDataResource(url: string) {
  return {
    read(): RawCountryData {
      if (cache) return cache;
      if (!inflight) {
        inflight = load(url).then((data) => {
          cache = data;
          return data;
        });
      }

      throw inflight;
    },
  };
}
