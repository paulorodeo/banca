import { createFileRoute } from "@tanstack/react-router";

/** Retired: editorial portal does not accept legal-case submissions. */
export const Route = createFileRoute("/api/public/triagem")({
  server: { handlers: {
    POST: () => Response.json({ ok: false, error: "channel_retired", message: "Este portal não recebe casos jurídicos." }, { status: 410, headers: { "Cache-Control": "no-store" } }),
  } },
});
