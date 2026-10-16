import { test } from "node:test";
import assert from "node:assert/strict";
import { radioStations } from "./stations";

test("radio has one default station and seven unique, usable stream records", () => {
  assert.equal(radioStations.length, 7);
  assert.equal(radioStations[0]?.id, "banca-digital");
  assert.equal(new Set(radioStations.map((station) => station.id)).size, 7);
  for (const station of radioStations) {
    assert.equal(new URL(station.stream).protocol, "https:");
    assert.ok(station.name.length > 0);
    assert.ok(station.subtitle.length > 0);
  }
  assert.equal(radioStations.find((station) => station.id === "radio-agronejo")?.fallback,
    "https://live.fazenda.rodeo/listen/sertanejo/radio.mp3");
});
