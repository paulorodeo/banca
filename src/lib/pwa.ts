export const OFFICIAL_PWA_HOST = "bancapaulista.org";
export const PWA_DISMISS_STORAGE_KEY = "banca-pwa-install-dismissed-at";
export const PWA_DISMISS_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function isOfficialPwaHost(hostname: string) {
  return hostname.toLowerCase().replace(/\.$/, "") === OFFICIAL_PWA_HOST;
}

export function isIosDevice(userAgent: string) {
  return /iPad|iPhone|iPod/.test(userAgent);
}

export function isStandalone(displayModeStandalone: boolean, navigatorStandalone?: boolean) {
  return displayModeStandalone || navigatorStandalone === true;
}

export function shouldShowInstallInvite(input: {
  hostname: string;
  standalone: boolean;
  installPromptAvailable: boolean;
  ios: boolean;
  dismissedAt: number | undefined;
  now: number;
}) {
  if (!isOfficialPwaHost(input.hostname) || input.standalone) return false;
  if (!input.installPromptAvailable && !input.ios) return false;
  return !input.dismissedAt || input.now - input.dismissedAt >= PWA_DISMISS_TTL_MS;
}
