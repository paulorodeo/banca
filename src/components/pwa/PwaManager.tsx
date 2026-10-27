import { useEffect, useState } from "react";
import {
  PWA_DISMISS_STORAGE_KEY,
  isIosDevice,
  isStandalone,
  shouldShowInstallInvite,
} from "@/lib/pwa";

type BeforeInstallPromptEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export function PwaManager() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent>();
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    const detectedIos = isIosDevice(window.navigator.userAgent);
    const updateVisibility = (promptAvailable = Boolean(installPrompt)) => {
      const rawDismissedAt = window.localStorage.getItem(PWA_DISMISS_STORAGE_KEY);
      const dismissedAt = rawDismissedAt ? Number(rawDismissedAt) : undefined;
      setIos(detectedIos);
      setVisible(
        shouldShowInstallInvite({
          hostname: window.location.hostname,
          standalone: isStandalone(media.matches, navigator.standalone),
          installPromptAvailable: promptAvailable,
          ios: detectedIos,
          dismissedAt: Number.isFinite(dismissedAt) ? dismissedAt : undefined,
          now: Date.now(),
        }),
      );
    };
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      updateVisibility(true);
    };
    const onInstalled = () => {
      setInstallPrompt(undefined);
      setVisible(false);
    };

    updateVisibility();
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    media.addEventListener("change", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      media.removeEventListener("change", onInstalled);
    };
  }, [installPrompt]);

  const dismiss = () => {
    window.localStorage.setItem(PWA_DISMISS_STORAGE_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(undefined);
    if (choice.outcome === "dismissed") dismiss();
    else setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="pwa-install-card" aria-labelledby="pwa-install-title">
      <p id="pwa-install-title">Instale a Banca Paulista</p>
      <span>
        {ios
          ? "Para instalar a Banca Paulista, abra o menu de compartilhamento do navegador e escolha Adicionar à Tela de Início."
          : "Acesse notícias, informações jurídicas e o Atlas Brasil diretamente da tela inicial."}
      </span>
      <div>
        {!ios && installPrompt ? (
          <button type="button" className="pwa-install-primary" onClick={() => void install()}>
            Instalar aplicativo
          </button>
        ) : null}
        <button type="button" className="pwa-install-dismiss" onClick={dismiss}>
          Agora não
        </button>
      </div>
    </aside>
  );
}
