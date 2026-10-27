import { test } from "node:test";
import assert from "node:assert/strict";
import { noticias } from "@/content/local/noticias";
import {
  ADSENSE_FORMATS,
  ADSENSE_PUBLISHER_ID,
  ADSENSE_REQUESTS_ENABLED,
  adRenderMode,
  articleWordCount,
  inArticleAdPosition,
  isAdSensePageEligible,
  isArticleAdEligible,
  pushAdSenseSlotOnce,
} from "./adsense";
import { createAdSenseScriptLoader } from "./adsense-runtime";
import { ADVERTISING_PLACEMENTS, resolvePlacementProvider } from "@/config/advertising-placements";

test("inventário usa IDs permanentes e resolve modos sem fallback reativo", () => {
  assert.equal(ADVERTISING_PLACEMENTS["ATLAS-01"].adsenseSlot, "1053881070");
  assert.equal(ADVERTISING_PLACEMENTS["ATLAS-02"].status, "active");
  assert.equal(ADVERTISING_PLACEMENTS["ATLAS-03"].status, "inactive");
  assert.equal(ADVERTISING_PLACEMENTS["ATLAS-04"].provider, "off");
  assert.equal(resolvePlacementProvider("ATLAS-01", "adsense"), "adsense");
  assert.equal(resolvePlacementProvider("ATLAS-01", "hybrid"), "adsense");
  assert.equal(resolvePlacementProvider("ATLAS-01", "direct"), "off");
  assert.equal(resolvePlacementProvider("ATLAS-01", "off"), "off");
  assert.equal(resolvePlacementProvider("ATLAS-03", "adsense"), "off");
});

test("AdSense centraliza publisher, quatro slots e a layout key oficial", () => {
  assert.equal(ADSENSE_PUBLISHER_ID, "ca-pub-5061534320708000");
  assert.equal(ADSENSE_FORMATS.display.slot, "1053881070");
  assert.equal(ADSENSE_FORMATS.inArticle.slot, "8409626914");
  assert.equal(ADSENSE_FORMATS.multiplex.slot, "3157300237");
  assert.equal(ADSENSE_FORMATS.inFeed.slot, "4913447061");
  assert.equal(ADSENSE_FORMATS.inFeed.attributes["data-ad-layout-key"], "-ef+6l-2u-b0+uf");
  assert.equal(ADSENSE_REQUESTS_ENABLED, false);
});

test("publicidade real exige domínio exato, ativação e consentimento", () => {
  const base = {
    pathname: "/noticias",
    buildMode: "production",
    enabled: true,
    consent: "granted" as const,
  };
  assert.equal(adRenderMode({ ...base, hostname: "bancapaulista.org" }), "live");
  for (const hostname of [
    "www.bancapaulista.org",
    "banca.paulista.workers.dev",
    "bancapaulista.org.evil.test",
    "localhost",
    "127.0.0.1",
  ]) {
    assert.equal(adRenderMode({ ...base, hostname }), "hidden");
  }
  assert.equal(
    adRenderMode({ ...base, hostname: "bancapaulista.org", consent: "unavailable" }),
    "hidden",
  );
  assert.equal(adRenderMode({ ...base, hostname: "bancapaulista.org", enabled: false }), "hidden");
});

test("prévia existe só nos modos locais elegíveis e rotas sensíveis ficam excluídas", () => {
  for (const hostname of ["localhost", "127.0.0.1", "banca.paulista.workers.dev"]) {
    assert.equal(
      adRenderMode({
        hostname,
        pathname: "/atlas-brasil",
        buildMode: "staging",
        enabled: false,
        consent: "unavailable",
      }),
      "preview",
    );
  }
  assert.equal(isAdSensePageEligible("/"), true);
  assert.equal(isAdSensePageEligible("/atlas-brasil"), true);
  assert.equal(isAdSensePageEligible("/noticias"), true);
  assert.equal(isAdSensePageEligible("/noticias/regioes/sudeste"), true);
  assert.equal(isAdSensePageEligible("/noticias/estados/sp"), false);
  assert.equal(isAdSensePageEligible("/admin"), false);
  assert.equal(isAdSensePageEligible("/api/public/tempo"), false);
  assert.equal(
    adRenderMode({
      hostname: "localhost",
      pathname: "/noticias/estados/sp",
      buildMode: "staging",
      enabled: true,
      consent: "granted",
    }),
    "hidden",
  );
});

test("In-article respeita conteúdo mínimo e não atravessa tabelas ou blocos estruturados", () => {
  const longArticle = noticias.find((article) => isArticleAdEligible(article));
  assert(longArticle, "Expected a published article eligible for a placement test");
  const position = inArticleAdPosition(longArticle);
  assert(position);
  const block = longArticle.blocos[position.blockIndex];
  assert(block && (block.tipo === "paragrafo" || block.tipo === "markdown"));
  if (block?.tipo === "markdown") {
    assert(Number.isInteger(position.markdownPartIndex));
    assert(position.markdownPartIndex! >= 0);
    const part = block.texto.split("\n\n")[position.markdownPartIndex!];
    assert(part && !/^#{1,6}\s|^\s*>|^\s*(?:[-*+]\s|\d+[.)]\s)/m.test(part));
  } else {
    assert.equal(position.markdownPartIndex, undefined);
  }

  const shortArticle = noticias.find((article) => articleWordCount(article) < 650);
  assert(shortArticle);
  assert.equal(isArticleAdEligible(shortArticle), false);
  assert.equal(inArticleAdPosition(shortArticle), undefined);

  const sensitiveCategory = noticias.find((article) => article.categoria === "Segurança Pública");
  assert(sensitiveCategory);
  assert.equal(isArticleAdEligible(sensitiveCategory), false);

  const sensitiveArticle = {
    ...longArticle,
    titulo: `${longArticle.titulo} com CPF e dados pessoais`,
  };
  assert.equal(isArticleAdEligible(sensitiveArticle), false);
  assert.equal(inArticleAdPosition(sensitiveArticle), undefined);
});

test("slot é inicializado no máximo uma vez por elemento, inclusive em Strict Mode", () => {
  const element = {};
  let pushes = 0;
  const queue = { push: () => (pushes += 1) };
  assert.equal(pushAdSenseSlotOnce(element, queue), true);
  assert.equal(pushAdSenseSlotOnce(element, queue), false);
  assert.equal(pushes, 1);
});

test("carregador do publisher é único e envia os atributos oficiais", async () => {
  const loader = createAdSenseScriptLoader();
  const listeners = new Map<string, () => void>();
  const script = {
    id: "",
    src: "",
    async: false,
    crossOrigin: null as string | null,
    dataset: {} as Record<string, string>,
    addEventListener: (type: string, listener: () => void) => listeners.set(type, listener),
  } as unknown as HTMLScriptElement;
  let appendCount = 0;
  let inserted: Element | null = null;
  const documentMock = {
    getElementById: () => inserted,
    createElement: () => script,
    head: {
      append: (element: Element) => {
        appendCount += 1;
        inserted = element;
      },
    },
  } as unknown as Document;

  const first = loader(
    documentMock,
    "google-adsense-test",
    ADSENSE_PUBLISHER_ID,
    "https://ads.test/script",
  );
  const second = loader(
    documentMock,
    "google-adsense-test",
    ADSENSE_PUBLISHER_ID,
    "https://ads.test/script",
  );
  assert.equal(first, second);
  assert.equal(appendCount, 1);
  assert.equal(script.id, "google-adsense-test");
  assert.equal(script.async, true);
  assert.equal(script.crossOrigin, "anonymous");
  assert.equal(script.dataset["publisher"], ADSENSE_PUBLISHER_ID);
  listeners.get("load")?.();
  await first;
  assert.equal(script.dataset["loaded"], "true");
});
