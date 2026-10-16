import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { AdPlaceholder } from "./ad-placeholder";

describe("AdPlaceholder", () => {
  test("reserva área identificada sem carregar conteúdo ou recursos de anúncios", () => {
    const html = renderToStaticMarkup(<AdPlaceholder />);
    assert.match(html, /Publicidade/);
    assert.match(html, /aspect-\[6\/5\]/);
    assert.doesNotMatch(html, /<script|<iframe|<img|href=/i);
  });
});
