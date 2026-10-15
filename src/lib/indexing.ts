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
  if (!isStaging(env) || !response.headers.get("Content-Type")?.includes("text/html"))
    return response;
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Cache-Control", "no-store");
  if (/^[a-f0-9]{40}$/.test(env["BUILD_COMMIT"] ?? ""))
    headers.set("X-Banca-Commit", env["BUILD_COMMIT"]!);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
