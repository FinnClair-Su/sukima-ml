#!/usr/bin/env bash
set -euo pipefail

# Studio Phantasm image pipeline.
# Every delivery size is rendered independently from the camera original.

SOURCE_ROOT="${1:-/Users/fish2lab/Pictures/Aug 29/Output}"
FEATURE_ROOT="${2:-/Users/fish2lab/Pictures/Aug 23/Output}"
OUTPUT_ROOT="${3:-static/img/studio/generated}"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick is required: brew install imagemagick" >&2
  exit 1
fi

render_webp() {
  local source="$1"
  local destination="$2"
  local width="$3"
  local quality="$4"

  mkdir -p "$(dirname "$destination")"
  if [[ -f "$destination" && "$destination" -nt "$source" ]]; then
    return
  fi

  magick "$source" \
    -auto-orient \
    -colorspace sRGB \
    -resize "${width}x${width}>" \
    -strip \
    -quality "$quality" \
    -define webp:method=6 \
    -define webp:thread-level=1 \
    "$destination"
}

render_pair() {
  local source="$1"
  local output_base="$2"
  render_webp "$source" "${output_base}-1280.webp" 1280 78
  render_webp "$source" "${output_base}-1600.webp" 1600 82
}

render_directory() {
  local source_directory="$1"
  local slug="$2"

  while IFS= read -r -d '' source; do
    local filename stem
    filename="$(basename "$source")"
    stem="${filename%.*}"
    stem="$(printf '%s' "$stem" | tr '[:upper:]' '[:lower:]' | sed -e 's/^_//' -e 's/ /-/g')"
    render_pair "$source" "$OUTPUT_ROOT/spaces/$slug/$stem"
  done < <(find "$source_directory" -maxdepth 1 -type f -iname '*.jpg' -print0 | sort -z)
}

render_pair "$SOURCE_ROOT/_FSH0253 1.jpg" "$OUTPUT_ROOT/hero"
render_pair "$FEATURE_ROOT/_FSH0150 1.jpg" "$OUTPUT_ROOT/behind-the-scenes"
render_webp "$FEATURE_ROOT/_FSH0150 1.jpg" "$OUTPUT_ROOT/behind-the-scenes-5440.webp" 5440 84

render_directory "$SOURCE_ROOT/70平，两层高大白棚" "white-stage"
render_directory "$SOURCE_ROOT/欧式 180平" "european"
render_directory "$SOURCE_ROOT/日式 180平" "japanese"
render_directory "$SOURCE_ROOT/复古中式 150平" "chinese-vintage"
render_directory "$SOURCE_ROOT/复古美式 150平" "american-vintage"

echo "Studio image pipeline complete: $OUTPUT_ROOT"
