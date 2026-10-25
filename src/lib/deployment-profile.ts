import { PRODUCTION_SITE_ORIGIN, STAGING_SITE_ORIGIN } from "./public-url";

export type DeploymentEnv = "staging" | "production";

export interface BuildProfile {
  environment: DeploymentEnv;
  publicOrigin: string;
  outputDir: string;
  routeHeaders: Record<string, string>;
  runtimeVars: { DEPLOYMENT_ENV: DeploymentEnv; PUBLIC_SITE_URL: string };
}

/** Explicit build profiles keep staging and production artifacts independent. */
export function buildProfile(env: Record<string, string | undefined>): BuildProfile {
  const environment = env["DEPLOYMENT_ENV"];
  if (environment !== "staging" && environment !== "production")
    throw new Error("A staging or production build profile must be explicit");

  const expectedOrigin = environment === "staging" ? STAGING_SITE_ORIGIN : PRODUCTION_SITE_ORIGIN;
  if (env["PUBLIC_SITE_URL"] !== expectedOrigin)
    throw new Error(`${environment} build must use ${expectedOrigin}`);

  return {
    environment,
    publicOrigin: expectedOrigin,
    outputDir:
      env["BP_BUILD_OUTPUT"] ?? (environment === "staging" ? ".output" : ".output-production"),
    routeHeaders:
      environment === "staging"
        ? { "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex" }
        : {},
    runtimeVars: { DEPLOYMENT_ENV: environment, PUBLIC_SITE_URL: expectedOrigin },
  };
}
