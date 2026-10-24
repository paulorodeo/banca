import type { TerritoryHeroImage } from "./territory";

export const BANCA_EDITORIAL_IMAGE_SRC = "/images/sp/jornal-banca-paulista.avif";
export const BANCA_EDITORIAL_IMAGE_WIDTHS = [832, 1024, 1536, 1792, 2048] as const;
export const BANCA_EDITORIAL_IMAGE_SRCSET = BANCA_EDITORIAL_IMAGE_WIDTHS.map(
  (width) =>
    `${width === 2048 ? BANCA_EDITORIAL_IMAGE_SRC : `/images/sp/jornal-banca-paulista-${width}.avif`} ${width}w`,
).join(", ");

// object-fit: cover scales to the hero's 21rem mobile height before cropping its sides.
export const BANCA_EDITORIAL_HERO_IMAGE = {
  avifSrc: BANCA_EDITORIAL_IMAGE_SRC,
  fallbackSrc: BANCA_EDITORIAL_IMAGE_SRC,
  srcSet: BANCA_EDITORIAL_IMAGE_SRCSET,
  sizes: "(max-width: 639px) 1024px, (max-width: 1023px) 981px, 100vw",
  alt: "",
  width: 2048,
  height: 768,
  focalPoint: "76% center",
  mobileFocalPoint: "84% center",
  priority: true,
} satisfies TerritoryHeroImage;

// Banner height is 19rem on mobile and its text can increase the 16rem desktop minimum.
export const BANCA_EDITORIAL_BANNER_SIZES =
  "(max-width: 359px) 944px, (max-width: 639px) 811px, 100vw";
