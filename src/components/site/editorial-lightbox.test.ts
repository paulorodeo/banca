import { describe, expect, test } from "bun:test";
import {
  adjacentGalleryIndex,
  galleryImageIndex,
  normalizeGalleryImages,
} from "./editorial-gallery";

describe("editorial lightbox gallery", () => {
  const images = [
    { id: "principal", url: "/principal.avif", alt: "Imagem principal" },
    { id: "interna-1", url: "/interna-1.avif", alt: "Primeira imagem interna" },
    { id: "interna-2", url: "/interna-2.avif", alt: "Segunda imagem interna" },
  ] as const;

  test("preserva a ordem editorial e elimina duplicatas", () => {
    expect(normalizeGalleryImages([...images, images[0]!])).toEqual(images);
  });

  test("navega circularmente em uma reportagem com três imagens", () => {
    expect(adjacentGalleryIndex(0, 3, 1)).toBe(1);
    expect(adjacentGalleryIndex(2, 3, 1)).toBe(0);
    expect(adjacentGalleryIndex(0, 3, -1)).toBe(2);
  });

  test("mantém uma galeria de artigo com imagem única estável", () => {
    expect(adjacentGalleryIndex(0, 1, 1)).toBe(0);
    expect(adjacentGalleryIndex(0, 1, -1)).toBe(0);
  });

  test("resolve o mesmo ativo por URL quando o ID da mídia foi normalizado", () => {
    expect(
      galleryImageIndex([...images], {
        id: "payload-id-different",
        url: "/interna-1.avif",
        alt: "Primeira imagem interna",
      }),
    ).toBe(1);
  });
});
