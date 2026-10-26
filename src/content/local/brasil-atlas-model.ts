import type { AtlasEditorialItem, AtlasLayer } from "../atlas.functions";
import { UFS_BY_REGION } from "./brasil-ufs";

export function filterAtlasStories(
  stories: readonly AtlasEditorialItem[],
  selection: { uf?: string | null; region?: string | null; layer?: AtlasLayer },
) {
  const regionStates = selection.region
    ? (UFS_BY_REGION[selection.region as keyof typeof UFS_BY_REGION] ?? [])
    : undefined;
  return stories.filter((item) => {
    if (selection.layer && !item.editorias.includes(selection.layer)) return false;
    if (selection.uf && !item.ufs.includes(selection.uf)) return false;
    if (regionStates && !item.ufs.some((uf) => regionStates.includes(uf))) return false;
    return true;
  });
}
