export async function runVerifiedStagingUpload<T>(steps: {
  verifyArtifact: () => Promise<void>;
  verifySsr: () => Promise<void>;
  preflight: () => Promise<void>;
  digest: () => Promise<string>;
  upload: () => Promise<T>;
}): Promise<T> {
  await steps.verifyArtifact();
  await steps.verifySsr();
  await steps.preflight();
  const validatedDigest = await steps.digest();
  if (!validatedDigest) throw new Error("Artifact digest is empty");
  const uploadDigest = await steps.digest();
  if (uploadDigest !== validatedDigest)
    throw new Error("Artifact integrity changed after validation; upload was blocked");
  return steps.upload();
}
