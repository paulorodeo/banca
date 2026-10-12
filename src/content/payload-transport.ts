/** Fetch-only transport: no Payload/Next/Node runtime dependencies. Called only on the server. */
export interface CmsConfig { baseUrl: string; path: string; ttl: number; timeout: number; namespace: string; revisionPath?: string }
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
  const revisionPath = env['PAYLOAD_REVISION_PATH'];
  if (revisionPath && !/^\/api\/[a-z0-9/-]+$/.test(revisionPath)) throw new Error('Invalid PAYLOAD_REVISION_PATH');
  return { ...(revisionPath ? { revisionPath } : {}), baseUrl: url.href.replace(/\/$/, ''), path, ttl: number('ARTICLES_CACHE_TTL', 60, 300), timeout: number('PAYLOAD_TIMEOUT_MS', 5000, 15000), namespace };
}
export class CmsUnavailable extends Error { constructor() { super('Publicações temporariamente indisponíveis. Tente novamente em instantes.'); } }
export async function fetchCms(config: CmsConfig, query: URLSearchParams, cache?: SharedCache, fetcher: typeof fetch = fetch, publishedOnly = true, validate: (input: unknown) => unknown = value => value): Promise<unknown> {
  const url = new URL(config.path, config.baseUrl);
  url.search = query.toString();
  // Payload native drafts authority; also enforced by anonymous collection access on the VPS.
  if (publishedOnly) {
    url.searchParams.set('where[_status][equals]', 'published');
    url.searchParams.set('draft', 'false');
  }
  url.searchParams.set('depth', '2');
  const readRevision = async (): Promise<string> => {
    if (!config.revisionPath) return '';
    const result = await fetcher(new URL(config.revisionPath, config.baseUrl), { headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' }, credentials: 'omit', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(config.timeout) });
    if (!result.ok) throw new CmsUnavailable();
    const data = JSON.parse(await boundedText(result, 4096)) as { revision?: unknown };
    if (typeof data.revision !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(data.revision)) throw new CmsUnavailable();
    return data.revision;
  };
  const revision = await readRevision();
  const key = new URL(url);
  if (revision) key.searchParams.set('__banca_revision', revision);
  key.searchParams.set('__banca_cache', config.namespace);
  const request = new Request(key.href, { method: 'GET' });
  try {
    const cached = await cache?.match(request);
    if (cached) {
      const expires = Number(cached.headers.get('x-banca-expires'));
      if (expires > Date.now()) {
        const data = await boundedText(cached, 5_000_000);
        validate(JSON.parse(data));
        if (await readRevision() === revision) return JSON.parse(data);
        throw new CmsUnavailable();
      }
    }
  } catch { /* cache failure cannot prevent an origin read */ }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout);
  try {
    const response = await fetcher(url, { signal: controller.signal, headers: { Accept: 'application/json' }, credentials: 'omit', redirect: 'error' });
    if (!response.ok) throw new CmsUnavailable();
    const raw = await boundedText(response, 5_000_000);
    const data: unknown = JSON.parse(raw);
    validate(data);
    // A revision changed during the read: never return or cache the old response.
    if (await readRevision() !== revision) throw new CmsUnavailable();
    if (cache) {
      try {
        await cache.put(request, new Response(raw, { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${config.ttl}`, 'X-Banca-Expires': String(Date.now() + config.ttl * 1000) } }));
      } catch { /* Cache API is optional in local development. */ }
    }
    if (await readRevision() !== revision) throw new CmsUnavailable();
    return data;
  } catch { throw new CmsUnavailable(); }
  finally { clearTimeout(timer); }
}

/** Stream bounded bytes; do not allocate an entire untrusted body before checking its size. */
export async function boundedText(response: Response, maxBytes: number): Promise<string> {
  const declared = Number(response.headers.get('content-length'));
  if (declared > maxBytes) { await response.body?.cancel(); throw new CmsUnavailable(); }
  const reader = response.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let bytes = 0;
  const chunks: string[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) { await reader.cancel(); throw new CmsUnavailable(); }
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
    return chunks.join('');
  } finally { reader.releaseLock(); }
}
