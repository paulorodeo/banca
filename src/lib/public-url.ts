/** Shared pure URL policy. The fallback is the existing published portal, not the CMS. */
export const DEFAULT_SITE_ORIGIN = 'https://lawsp.lovable.app';
export function publicOrigin(value = DEFAULT_SITE_ORIGIN): string {
  const url = new URL(value);
  const local = ['localhost', '127.0.0.1'].includes(url.hostname);
  if ((url.protocol !== 'https:' && !(local && url.protocol === 'http:')) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('PUBLIC_SITE_URL must be an HTTPS origin');
  return url.origin;
}
export function absoluteUrl(path: string, origin = DEFAULT_SITE_ORIGIN): string {
  const base = publicOrigin(origin);
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Expected public site path');
  const url = new URL(path, base);
  if (url.origin !== base) throw new Error('Invalid public path');
  return url.href;
}
export function articleListPath(search: {page: number; category: string; sort: string; limit: number}): string {
  const query = new URLSearchParams();
  if (search.category) query.set('category', search.category);
  if (search.page > 1) query.set('page', String(search.page));
  if (search.limit !== 12) query.set('limit', String(search.limit));
  // Sorting is a presentation variant, not a separate indexable collection.
  return `/artigos${query.size ? `?${query}` : ''}`;
}
/** Normalize existing shared head output without changing territorial content or paths. */
export function absoluteHead<T>(origin: string | undefined, produce: () => T): T {
  const base = publicOrigin(origin);
  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(walk);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => {
      if ((['url', 'item'].includes(key) || (key === 'href' && (value as {rel?:string}).rel === 'canonical') || (key === 'content' && (value as {property?:string}).property === 'og:url')) && typeof entry === 'string') {
        if (entry.startsWith('/') && !entry.startsWith('//')) return [key, absoluteUrl(entry, base)];
        if (entry.startsWith(`${DEFAULT_SITE_ORIGIN}/`)) return [key, absoluteUrl(entry.slice(DEFAULT_SITE_ORIGIN.length), base)];
      }
      if (key === 'children' && typeof entry === 'string' && (value as {type?:string}).type === 'application/ld+json') return [key, JSON.stringify(walk(JSON.parse(entry)))];
      return [key, walk(entry)];
    }));
  };
  return walk(produce()) as T;
}
