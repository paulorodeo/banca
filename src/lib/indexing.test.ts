import { test } from "node:test";
import assert from "node:assert/strict";
import { environmentResponse, isStaging } from "./indexing";
test("homologation is explicit and workers.dev cannot accidentally be indexed", () => {
  assert(isStaging({ DEPLOYMENT_ENV: "staging" }));
  assert(isStaging({ PUBLIC_SITE_URL: "https://banca.pjdigital-me.workers.dev" }));
  assert(
    !isStaging({ DEPLOYMENT_ENV: "production", PUBLIC_SITE_URL: "https://portal.example.test" }),
  );
});
test("HTML responses including errors are noindex/nofollow and not cached in staging", () => {
  for (const status of [200, 404, 500]) {
    const response = environmentResponse(
      new Response("HTML", {
        status,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public" },
      }),
      { DEPLOYMENT_ENV: "staging" },
    );
    assert.equal(response.status, status);
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  }
  const asset = new Response("image", { headers: { "Content-Type": "image/avif" } });
  assert.equal(environmentResponse(asset, { DEPLOYMENT_ENV: "staging" }), asset);
  const live = new Response("HTML", { headers: { "Content-Type": "text/html" } });
  assert.equal(environmentResponse(live, { DEPLOYMENT_ENV: "production" }), live);
});
