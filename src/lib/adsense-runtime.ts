type ScriptElement = Pick<
  HTMLScriptElement,
  "id" | "src" | "async" | "crossOrigin" | "dataset" | "addEventListener"
>;
type ScriptDocument = {
  getElementById(id: string): Element | null;
  createElement(tag: "script"): HTMLScriptElement;
  head: Pick<HTMLHeadElement, "append">;
};

export function createAdSenseScriptLoader() {
  let scriptPromise: Promise<void> | undefined;
  return function loadAdSenseScript(
    documentRef: ScriptDocument,
    scriptId: string,
    publisherId: string,
    scriptUrl: string,
  ): Promise<void> {
    if (scriptPromise) return scriptPromise;
    const existing = documentRef.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing?.dataset["loaded"] === "true") return Promise.resolve();

    const pending = new Promise<void>((resolve, reject) => {
      const script = (existing ?? documentRef.createElement("script")) as ScriptElement;
      script.async = true;
      script.src = scriptUrl;
      script.crossOrigin = "anonymous";
      script.addEventListener(
        "load",
        () => {
          script.dataset["loaded"] = "true";
          resolve();
        },
        { once: true },
      );
      script.addEventListener("error", () => reject(new Error("AdSense loader unavailable")), {
        once: true,
      });
      if (!existing) {
        script.id = scriptId;
        script.dataset["publisher"] = publisherId;
        documentRef.head.append(script as HTMLScriptElement);
      }
    });
    scriptPromise = pending;
    void pending.catch(() => {
      if (scriptPromise === pending) scriptPromise = undefined;
    });
    return pending;
  };
}
