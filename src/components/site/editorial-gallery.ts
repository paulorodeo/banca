import type { RichNode } from "@/content/payload";
import type { Media } from "@/content/types";

export interface EditorialGalleryImage extends Media {
  description?: string;
  credit?: string;
  source?: string;
}

export function normalizeGalleryImages(images: EditorialGalleryImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    const key = image.id || image.url;
    if (!image.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function adjacentGalleryIndex(index: number, length: number, direction: -1 | 1) {
  if (length < 1) return 0;
  return (index + direction + length) % length;
}

export function collectRichTextImages(nodes: RichNode[]): Media[] {
  return nodes.flatMap((node) => [
    ...(node.type === "image" && node.media ? [node.media] : []),
    ...(node.children ? collectRichTextImages(node.children) : []),
  ]);
}
