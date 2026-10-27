import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import {
  PWA_DISMISS_TTL_MS,
  isIosDevice,
  isOfficialPwaHost,
  isStandalone,
  shouldShowInstallInvite,
} from "./pwa";

test("convite de instalação é exclusivo do domínio oficial", () => {
  assert.equal(isOfficialPwaHost("bancapaulista.org"), true);
  assert.equal(isOfficialPwaHost("www.bancapaulista.org"), false);
  assert.equal(isOfficialPwaHost("banca.paulista.workers.dev"), false);
  assert.equal(
    shouldShowInstallInvite({
      hostname: "bancapaulista.org",
      standalone: false,
      installPromptAvailable: true,
      ios: false,
      dismissedAt: undefined,
      now: 10,
    }),
    true,
  );
});

test("modo standalone e dispensa recente ocultam o convite", () => {
  const base = {
    hostname: "bancapaulista.org",
    installPromptAvailable: true,
    ios: false,
    now: PWA_DISMISS_TTL_MS + 100,
  };
  assert.equal(
    shouldShowInstallInvite({ ...base, standalone: true, dismissedAt: undefined }),
    false,
  );
  assert.equal(shouldShowInstallInvite({ ...base, standalone: false, dismissedAt: 200 }), false);
  assert.equal(shouldShowInstallInvite({ ...base, standalone: false, dismissedAt: 0 }), true);
});

test("detecção cobre instalação standalone e orientação iOS", () => {
  assert.equal(isIosDevice("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)"), true);
  assert.equal(isIosDevice("Mozilla/5.0 (Linux; Android 15)"), false);
  assert.equal(isStandalone(true, false), true);
  assert.equal(isStandalone(false, true), true);
});

test("manifesto registra identidade, ícones e atalhos existentes", async () => {
  const manifest = JSON.parse(await readFile("public/site.webmanifest", "utf8")) as {
    id: string;
    start_url: string;
    scope: string;
    display: string;
    icons: Array<{ src: string; purpose: string }>;
    shortcuts: Array<{ url: string }>;
  };
  assert.equal(manifest.id, "/");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.display, "standalone");
  assert(manifest.icons.some((icon) => icon.src === "/icon-512.png"));
  assert(manifest.icons.some((icon) => icon.purpose === "maskable"));
  assert.deepEqual(
    manifest.shortcuts.map((shortcut) => shortcut.url),
    ["/noticias", "/atlas-brasil", "/regioes"],
  );
});

test("service worker limita cache e mantém conteúdo editorial network-first", async () => {
  const worker = await readFile("public/sw.js", "utf8");
  for (const excluded of [
    "/admin",
    "/api/",
    "/contato",
    "/ads.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/rss",
  ]) {
    assert(worker.includes(`"${excluded}"`));
  }
  assert.match(worker, /request\.mode === "navigate"/);
  assert.match(worker, /const OFFLINE_URL = "\/offline"/);
  assert.match(worker, /fetch\(request\)\.catch\(\(\) => caches\.match\(OFFLINE_URL\)\)/);
  assert.doesNotMatch(worker, /googlesyndication|adsbygoogle/);
});
