import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  ADSENSE_PUBLISHER_ID,
  ADSENSE_REQUESTS_ENABLED,
  ADSENSE_SCRIPT_ID,
  ADSENSE_SCRIPT_URL,
  adRenderMode,
  type AdSenseConsent,
} from "@/lib/adsense";
import { createAdSenseScriptLoader } from "@/lib/adsense-runtime";
import { AdSenseContext } from "./adsense-context";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

const loadAdSenseScript = createAdSenseScriptLoader();

export function AdSenseProvider({
  children,
  enabled = ADSENSE_REQUESTS_ENABLED,
  consent = "unavailable",
}: {
  children: ReactNode;
  enabled?: boolean;
  /** Connect only to an approved CMP. The project currently has no operational consent manager. */
  consent?: AdSenseConsent;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [hostname, setHostname] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const mode = adRenderMode({
    hostname,
    pathname,
    buildMode: import.meta.env.MODE,
    enabled,
    consent,
  });

  useEffect(() => setHostname(window.location.hostname), []);

  useEffect(() => {
    let active = true;
    if (mode !== "live") {
      setScriptReady(false);
      return () => {
        active = false;
      };
    }
    void loadAdSenseScript(
      document,
      ADSENSE_SCRIPT_ID,
      ADSENSE_PUBLISHER_ID,
      ADSENSE_SCRIPT_URL,
    ).then(
      () => {
        if (active) setScriptReady(true);
      },
      () => {
        if (active) setScriptReady(false);
      },
    );
    return () => {
      active = false;
    };
  }, [mode]);

  const value = useMemo(() => ({ mode, scriptReady }), [mode, scriptReady]);
  return <AdSenseContext.Provider value={value}>{children}</AdSenseContext.Provider>;
}
