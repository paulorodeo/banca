import { test } from "node:test";
import assert from "node:assert/strict";
import { environmentResponse, isStaging } from "./indexing";
import { PRODUCTION_SITE_ORIGIN, STAGING_SITE_ORIGIN, runtimePublicOrigin } from "./public-url";
test("homologation is explicit and workers.dev cannot accidentally be indexed", () => {
  assert(isStaging({ DEPLOYMENT_ENV: "staging" }));
  assert(isStaging({ PUBLIC_SITE_URL: "https://banca.paulista.workers.dev" }));
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
    assert.equal(
      response.headers.get("X-Robots-Tag"),
      "noindex, nofollow, noarchive, noimageindex",
    );
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
    assert.equal(response.headers.get("X-Frame-Options"), "SAMEORIGIN");
  }
  const asset = new Response("image", { headers: { "Content-Type": "image/avif" } });
  const stagedAsset = environmentResponse(asset, { DEPLOYMENT_ENV: "staging" });
  assert.equal(
    stagedAsset.headers.get("X-Robots-Tag"),
    "noindex, nofollow, noarchive, noimageindex",
  );
  assert.equal(stagedAsset.headers.get("Cache-Control"), null);
});

test("staging retains noindex while production does not inherit it and receives gradual HSTS", () => {
  const stagingEnv = { DEPLOYMENT_ENV: "staging", PUBLIC_SITE_URL: STAGING_SITE_ORIGIN };
  const productionEnv = { DEPLOYMENT_ENV: "production", PUBLIC_SITE_URL: PRODUCTION_SITE_ORIGIN };
  const response = (env: Record<string, string | undefined>, headers: HeadersInit = {}) =>
    environmentResponse(
      new Response("HTML", {
        headers: { "Content-Type": "text/html", ...Object.fromEntries(new Headers(headers)) },
      }),
      env,
    );

  const staging = response(stagingEnv);
  assert.equal(staging.headers.get("X-Robots-Tag"), "noindex, nofollow, noarchive, noimageindex");
  assert.equal(staging.headers.get("Cache-Control"), "no-store");
  assert.equal(runtimePublicOrigin(stagingEnv), STAGING_SITE_ORIGIN);

  const production = response(productionEnv);
  assert.equal(production.headers.get("X-Robots-Tag"), null);
  assert.equal(production.headers.get("Strict-Transport-Security"), "max-age=604800");
  assert.equal(runtimePublicOrigin(productionEnv), PRODUCTION_SITE_ORIGIN);

  const individualNoindex = response(productionEnv, { "X-Robots-Tag": "noindex" });
  assert.equal(individualNoindex.headers.get("X-Robots-Tag"), "noindex");
  assert.throws(() =>
    runtimePublicOrigin({ DEPLOYMENT_ENV: "production", PUBLIC_SITE_URL: STAGING_SITE_ORIGIN }),
  );
  assert.throws(() =>
    runtimePublicOrigin({ DEPLOYMENT_ENV: "staging", PUBLIC_SITE_URL: PRODUCTION_SITE_ORIGIN }),
  );
});
