import { createFileRoute } from "@tanstack/react-router";
import { triagemSchema } from "@/lib/triagem";

/**
 * Endpoint de triagem — compatível com Cloudflare Workers.
 *
 * Fase atual: valida o contrato de dados e responde com um protocolo local.
 * Fase seguinte: encaminhar para fila/e-mail transacional e persistir no
 * PostgreSQL do Payload CMS (`CMS_API_URL`) através de credencial de serviço.
 */
export const Route = createFileRoute("/api/public/triagem")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }

        const parsed = triagemSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "invalid_payload", issues: parsed.error.issues },
            { status: 422 },
          );
        }

        const protocolo = `TRG-${Date.now().toString(36).toUpperCase()}`;

        // TODO(integração): enviar para e-mail transacional / painel privado de leads.
        console.info("[triagem]", {
          protocolo,
          natureza: parsed.data.natureza,
          urgencia: parsed.data.urgencia,
          landingPage: parsed.data.landingPage,
          dpNumber: parsed.data.dpNumber,
        });

        return Response.json({ ok: true, protocolo }, { status: 202 });
      },
    },
  },
});