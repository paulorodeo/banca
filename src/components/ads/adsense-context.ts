import { createContext, useContext } from "react";
import type { AdRenderMode } from "@/lib/adsense";

export type AdSenseContextValue = {
  mode: AdRenderMode;
  scriptReady: boolean;
};

export const AdSenseContext = createContext<AdSenseContextValue>({
  mode: "hidden",
  scriptReady: false,
});

export function useAdSense() {
  return useContext(AdSenseContext);
}
