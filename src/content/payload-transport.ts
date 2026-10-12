/** Fetch-only transport: no Payload/Next/Node runtime dependencies. Called only on the server. */
export interface CmsConfig { baseUrl: string; path: string; ttl: number; timeout: number; namespace: string }
export interface SharedCache { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<unknown> }
export function cmsConfig(env: Record<string, string | undefined>): CmsConfig | null {
  const raw = env['PAYLOAD_API_URL'];
  if (!raw) return null;
  const url = new URL(raw);
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) throw new Error('PAYLOAD_API_URL must use HTTPS');
  if (url.username || url.password || url.search || url.hash) throw new Error('Invalid PAYLOAD_API_URL');
  const number = (key: string, fallback: number, max: number) => {
    const value = Number(env[key] ?? fallback);
    if (!Number.isInteger(value) || value < 1 || value > max) throw new Error(`Invalid ${key}`);
    return value;
  };
  const path = env['PAYLOAD_PUBLIC_API_PATH'] ?? '/api/articles';
  if (!/^\/api\/[a-z0-9-]+$/.test(path)) throw new Error('Invalid PAYLOAD_PUBLIC_API_PATH');
  const namespace = env['ARTICLES_CACHE_NAMESPACE'] ?? 'v1';
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(namespace)) throw new Error('Invalid ARTICLES_CACHE_NAMESPACE');
  return { baseUrl: url.href.replace(/\/$/, ''), path, ttl: number('ARTICLES_CACHE_TTL', 60, 300), timeout: number('PAYLOAD_TIMEOUT_MS', 5000, 15000), namespace };
}
export class CmsUnavailable extends Error { constructor() { super('Publicações temporariamente indisponíveis. Tente novamente em instantes.'); } }
export async function fetchCms(config: CmsConfig, query: URLSearchParams, cache?: SharedCache, fetcher: typeof fetch = fetch): Promise<unknown> {
  const url = new URL(config.path, config.baseUrl);
  url.search = query.toString();
  // Payload native drafts authority; also enforced by anonymous collection access on the VPS.
  url.searchParams.set('where[_status][equals]', 'published');
  url.searchParams.set('draft', 'false');
  url.searchParams.set('depth', '2');
  const key = new URL(url);
  key.searchParams.set('__banca_cache', config.namespace);
  const request = new Request(key.href, { method: 'GET' });
  try {
    const cached = await cache?.match(request);
    if (cached) {
      const expires = Number(cached.headers.get('x-banca-expires'));
      if (expires > Date.now()) return await cached.json();
    }
  } catch { /* cache failure cannot prevent an origin read */ }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout);
  try {
    const response = await fetcher(url, { signal: controller.signal, headers: { Accept: 'application/json' }, credentials: 'omit', redirect: 'error' });
    if (!response.ok) throw new CmsUnavailable();
    const raw = await response.text();
    if (raw.length > 5_000_000) throw new CmsUnavailable();
    const data: unknown = JSON.parse(raw);
    // Validate in the caller before returning to the browser. Raw public responses alone are cached.
    if (cache) {
      try {
        await cache.put(request, new Response(raw, { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${config.ttl}`, 'X-Banca-Expires': String(Date.now() + config.ttl * 1000) } }));
      } catch { /* Cache API is optional in local development. */ }
    }
    return data;
  } catch { throw new CmsUnavailable(); }
  finally { clearTimeout(timer); }
}
