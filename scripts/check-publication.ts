import { runtimePublicOrigin } from "../src/lib/public-url";
try {
  const origin = runtimePublicOrigin({ ...process.env, NODE_ENV: "production" });
  console.log(`Origem pública validada: ${origin}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : "Configuração pública inválida");
  process.exitCode = 1;
}
