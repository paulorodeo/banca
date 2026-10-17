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
});

test("the three owned stations prioritize HLS and publish their official formats", () => {
  const banca = radioStations.find((station) => station.id === "banca-digital")!;
  const agronejo = radioStations.find((station) => station.id === "radio-agronejo")!;
  const country = radioStations.find((station) => station.id === "fazenda-country")!;

  assert.equal(banca.stream, "https://live.fazenda.rodeo/hls/bancadigital/live.m3u8");
  assert.equal(banca.hls, true);
  assert.equal(banca.mp3Fallback, "https://live.fazenda.rodeo/listen/bancadigital/radio.mp3");
  assert.deepEqual(
    banca.publicLinks?.map((link) => link.format),
    ["HLS", "MP3", "M3U", "PLS"],
  );
  assert.equal(banca.publicLinks?.find((link) => link.format === "MP3")?.url, banca.mp3Fallback);
  assert.equal(banca.publicLinks?.find((link) => link.format === "HLS")?.url, banca.stream);

  assert.equal(agronejo.stream, "https://live.fazenda.rodeo/hls/sertanejo/live.m3u8");
  assert.equal(agronejo.hls, true);
  assert.equal(agronejo.mp3Fallback, "https://live.fazenda.rodeo/listen/sertanejo/radio.mp3");
  assert.deepEqual(
    agronejo.publicLinks?.map((link) => link.format),
    ["HLS", "MP3", "M3U", "PLS"],
  );
  assert.equal(
    agronejo.publicLinks?.find((link) => link.format === "MP3")?.url,
    agronejo.mp3Fallback,
  );
  assert.equal(agronejo.publicLinks?.find((link) => link.format === "HLS")?.url, agronejo.stream);

  assert.equal(country.stream, "https://live.fazenda.rodeo/hls/country/live.m3u8");
  assert.equal(country.hls, true);
  assert.equal(country.mp3Fallback, "https://live.fazenda.rodeo/listen/country/radio.mp3");
  assert.deepEqual(
    country.publicLinks?.map((link) => link.format),
    ["HLS", "MP3", "M3U", "PLS"],
  );
  assert.equal(
    country.publicLinks?.find((link) => link.format === "MP3")?.url,
    country.mp3Fallback,
  );
  assert.equal(country.publicLinks?.find((link) => link.format === "HLS")?.url, country.stream);

  for (const station of [banca, agronejo, country]) {
    assert.equal(
      station.publicLinks?.find((link) => link.format === "M3U")?.url.endsWith(".m3u"),
      true,
    );
    assert.equal(
      station.publicLinks?.find((link) => link.format === "PLS")?.url.endsWith(".pls"),
      true,
    );
  }
});

test("external stations retain their existing stream types and URLs", () => {
  assert.equal(radioStations.find((station) => station.id === "bandnews-fm")?.hls, true);
  assert.equal(
    radioStations.find((station) => station.id === "bandnews-fm")?.stream,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWSFM_SPAAC.m3u8",
  );
  assert.equal(
    radioStations.find((station) => station.id === "cbn-sp")?.stream,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/CBN_SPAAC.aac?dist=radioscombr",
  );
  assert.equal(radioStations.find((station) => station.id === "cbn-sp")?.hls, undefined);
});
