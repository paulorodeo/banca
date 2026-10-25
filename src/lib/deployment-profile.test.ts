import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProfile } from "./deployment-profile";
import { PRODUCTION_SITE_ORIGIN, STAGING_SITE_ORIGIN } from "./public-url";

test("staging build carries noindex route rules without conflicting with static asset caching", () => {
  const profile = buildProfile({
    DEPLOYMENT_ENV: "staging",
    PUBLIC_SITE_URL: STAGING_SITE_ORIGIN,
    BP_BUILD_OUTPUT: ".output",
  });
  assert.deepEqual(profile.routeHeaders, {
    "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex",
  });
  assert.equal(profile.runtimeVars.DEPLOYMENT_ENV, "staging");
  assert.equal(profile.publicOrigin, STAGING_SITE_ORIGIN);
  assert.equal(profile.outputDir, ".output");
});

test("production build cannot inherit the staging noindex rules or artifact path", () => {
  const profile = buildProfile({
    DEPLOYMENT_ENV: "production",
    PUBLIC_SITE_URL: PRODUCTION_SITE_ORIGIN,
  });
  assert.deepEqual(profile.routeHeaders, {});
  assert.equal(profile.outputDir, ".output-production");
  assert.equal(profile.runtimeVars.DEPLOYMENT_ENV, "production");
  assert.equal(profile.publicOrigin, PRODUCTION_SITE_ORIGIN);
});

test("profile selection rejects mixed staging/production origins and missing profile", () => {
  assert.throws(() =>
    buildProfile({ DEPLOYMENT_ENV: "production", PUBLIC_SITE_URL: STAGING_SITE_ORIGIN }),
  );
  assert.throws(() =>
    buildProfile({ DEPLOYMENT_ENV: "staging", PUBLIC_SITE_URL: PRODUCTION_SITE_ORIGIN }),
  );
  assert.throws(() => buildProfile({ PUBLIC_SITE_URL: PRODUCTION_SITE_ORIGIN }));
});
