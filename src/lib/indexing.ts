import { PRODUCTION_SITE_ORIGIN } from "./public-url";

/** workers.dev is always a review environment, even if the explicit flag is omitted. */
export function isStaging(env: Record<string, string | undefined>): boolean {
  if (env["DEPLOYMENT_ENV"] === "staging") return true;
  try {
    return new URL(env["PUBLIC_SITE_URL"] ?? "").hostname.endsWith(".workers.dev");
  } catch {
    return false;
  }
}
export function environmentResponse(
  response: Response,
  env: Record<string, string | undefined>,
): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Frame-Options", "SAMEORIGIN");

  const staging = isStaging(env);
  const isHtml = headers.get("Content-Type")?.includes("text/html") ?? false;
  if (staging) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
    // HTML and route endpoints are not cached; fingerprinted static assets
    // retain Nitro's immutable cache policy without conflicting _headers.
    if (isHtml) headers.set("Cache-Control", "no-store");
  } else if (
    env["DEPLOYMENT_ENV"] === "production" &&
    env["PUBLIC_SITE_URL"] === PRODUCTION_SITE_ORIGIN
  ) {
    // Short initial max-age; do not opt every subdomain into HSTS.
    headers.set("Strict-Transport-Security", "max-age=604800");
  }

  if (staging && isHtml && /^[a-f0-9]{40}$/.test(env["BUILD_COMMIT"] ?? ""))
    headers.set("X-Banca-Commit", env["BUILD_COMMIT"]!);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
