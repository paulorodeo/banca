/**
 * Eventos analíticos estruturados.
 * Hoje os eventos são apenas empilhados em `window.dataLayer` e registrados em
 * modo de desenvolvimento. A mesma interface poderá enviar para GA4, Plausible
 * ou um endpoint próprio em Cloudflare Workers.
 */
export type AnalyticsEventName =
  | "lead_started"
  | "lead_completed"
  | "whatsapp_clicked"
  | "contact_form_submitted"
  | "local_page_viewed"
  | "dp_page_viewed";

export interface AnalyticsPayload {
  landingPage?: string;
  dpNumber?: string;
  dpName?: string;
  region?: string;
  legalArea?: string;
  urgency?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;
  const event = {
    event: name,
    timestamp: new Date().toISOString(),
    landingPage: payload.landingPage ?? window.location.pathname,
    ...payload,
  };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
  if (import.meta.env.DEV) {
    console.info("[analytics]", event);
  }
}