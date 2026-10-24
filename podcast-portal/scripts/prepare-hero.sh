#!/usr/bin/env bash
set -euo pipefail

# Build physical AVIF variants from the APPROVED photograph; never edit source.
INPUT="${1:-/mnt/c/Users/casan/OneDrive/Documentos/Banca/bg_banca.jpg}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT="$ROOT/public/assets"
command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe is required" >&2; exit 1; }
test -s "$INPUT" || { echo "Missing source image: $INPUT" >&2; exit 1; }
DIM="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$INPUT")"
test "$DIM" = "1920x912" || { echo "Unexpected dimensions: $DIM (expected 1920x912)" >&2; exit 1; }
mkdir -p "$OUT"
for row in "960 47" "1280 40" "1600 39"; do
  read -r WIDTH CRF <<< "$row"
  ffmpeg -hide_banner -loglevel error -y -i "$INPUT" \
    -vf "scale=${WIDTH}:-2:flags=lanczos" -frames:v 1 \
    -c:v libaom-av1 -still-picture 1 -crf "$CRF" -cpu-used 6 \
    "$OUT/bg-banca-${WIDTH}.avif"
  test -s "$OUT/bg-banca-${WIDTH}.avif"
  echo "Created $(basename "$OUT/bg-banca-${WIDTH}.avif") — $(wc -c < "$OUT/bg-banca-${WIDTH}.avif") bytes"
done
echo "All variants are ready in $OUT. Original image unchanged."
