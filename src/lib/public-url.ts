/** Pure URL policy. Relative head values are resolved by the runtime root context. */
export const STAGING_SITE_ORIGIN = "https://banca.pjdigital-me.workers.dev";
export const PRODUCTION_SITE_ORIGIN = "https://bancapaulista.org";

export function publicOrigin(value?: string): string {
  if (!value) throw new Error("PUBLIC_SITE_URL is required for publication");
  const url = new URL(value);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new Error("PUBLIC_SITE_URL must be an HTTPS origin");
  return url.origin;
}
export function runtimePublicOrigin(env: Record<string, string | undefined>): string {
  const development = env["NODE_ENV"] === "development";
  const origin = publicOrigin(
    env["PUBLIC_SITE_URL"] || (development ? "http://localhost:8080" : undefined),
  );
  const host = new URL(origin).hostname;
  if (
    !development &&
    (["localhost", "127.0.0.1", "[::1]"].includes(host) ||
      host.endsWith(".localhost") ||
      host.endsWith(".invalid"))
  )
    throw new Error("PUBLIC_SITE_URL must be a public production origin");
  if (env["DEPLOYMENT_ENV"] === "staging" && origin !== STAGING_SITE_ORIGIN)
    throw new Error("Staging must use the configured workers.dev origin");
  if (env["DEPLOYMENT_ENV"] === "production" && origin !== PRODUCTION_SITE_ORIGIN)
    throw new Error("Production must use the canonical Banca Paulista origin");
  return origin;
}
export function absoluteUrl(path: string, origin?: string): string {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    [...path].some((char) => char.charCodeAt(0) <= 32)
  )
    throw new Error("Expected public site path");
  const base = origin ? publicOrigin(origin) : "https://relative.invalid";
  const url = new URL(path, base);
  if (url.origin !== base) throw new Error("Invalid public path");
  url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return origin ? url.href : `${url.pathname}${url.search}${url.hash}`;
}
export function articleListPath(search: {
  page: number;
  category: string;
  sort: string;
  limit: number;
}): string {
  const query = new URLSearchParams();
  if (search.category) query.set("category", search.category);
  if (search.page > 1) query.set("page", String(search.page));
  if (search.limit !== 12) query.set("limit", String(search.limit));
  // Sorting is a presentation variant, not a separate indexable collection.
  return `/artigos${query.size ? `?${query}` : ""}`;
}
/** Resolve canonical, social media and JSON-LD URLs without changing external media. */
export function absoluteHead<T>(origin: string | undefined, produce: () => T): T {
  const base = publicOrigin(origin);
  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(walk);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => {
        const parent = value as { rel?: string; property?: string; name?: string };
        const urlField =
          ["url", "item", "image", "logo"].includes(key) ||
          (key === "href" && parent.rel === "canonical") ||
          (key === "content" &&
            ["og:url", "og:image", "twitter:image"].includes(parent.property ?? parent.name ?? ""));
        if (
          urlField &&
          typeof entry === "string" &&
          entry.startsWith("/") &&
          !entry.startsWith("//")
        )
          return [key, absoluteUrl(entry, base)];
        if (
          key === "children" &&
          typeof entry === "string" &&
          (value as { type?: string }).type === "application/ld+json"
        )
          return [key, JSON.stringify(walk(JSON.parse(entry)))];
        return [key, walk(entry)];
      }),
    );
  };
  return walk(produce()) as T;
}
