#!/usr/bin/env python3
"""
Batch optimize all assets in static/img and static/photography:
1. Recursive scan
2. Skip 'artworks' (already done)
3. Resize logic:
   - 'photography' or 'hero' images: Max width 1920px
   - Others: Max width 1200px
4. Convert to WebP (q=80)
5. Print mapping for code updates
"""

import os
from PIL import Image, ImageOps
from pathlib import Path

# Config
ROOT_DIRS = [
    "/Users/yukari/Code/sukima-ml/static/img",
    "/Users/yukari/Code/sukima-ml/static/photography"
]
EXCLUDE_DIRS = {"artworks"}
EXTENSIONS = {'.jpg', '.jpeg', '.png'}
QUALITY = 80

def optimize_assets():
    results = []
    
    for root_dir in ROOT_DIRS:
        root_path = Path(root_dir)
        if not root_path.exists():
            print(f"Warning: {root_dir} not found.")
            continue

        print(f"Scanning {root_dir}...")
        
        for file_path in root_path.rglob("*"):
            if file_path.suffix.lower() not in EXTENSIONS:
                continue
            
            # Check exclusions
            # If any part of the relative path is in EXCLUDE_DIRS
            rel_path = file_path.relative_to(root_path)
            if any(part in EXCLUDE_DIRS for part in rel_path.parts):
                continue
                
            # Determine Max Width
            # Photography or typically large images -> 1920
            # Else -> 1200
            if "photography" in str(file_path):
                max_width = 2912
            elif "hero" in file_path.name.lower() or "banner" in file_path.name.lower():
                max_width = 1920
            else:
                max_width = 1200
                
            try:
                with Image.open(file_path) as img:
                    # Fix orientation
                    img = ImageOps.exif_transpose(img)
                    
                    # Calculate new size
                    w, h = img.size
                    if w > max_width:
                        new_w = max_width
                        new_h = int(h * (max_width / w))
                    else:
                        new_w = w
                        new_h = h
                    
                    # Convert coloring
                    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                         # Keep alpha for PNGs that might have transparency
                         pass
                    else:
                         img = img.convert("RGB")

                    # Resize
                    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    
                    # Save as WebP
                    new_filename = file_path.with_suffix('.webp')
                    
                    # Skip if webp already exists and is newer? 
                    # For now, overwrite/create to ensure optimization
                    
                    img_resized.save(new_filename, "WEBP", quality=QUALITY)
                    
                    # Stats
                    original_size = file_path.stat().st_size / 1024
                    new_size = new_filename.stat().st_size / 1024
                    
                    results.append({
                        "original_path": str(file_path),
                        "new_path": str(new_filename),
                        "width": new_w,
                        "height": new_h,
                        "original_kb": original_size,
                        "new_kb": new_size
                    })
                    
                    print(f"Optimized: {file_path.name} -> {new_filename.name} ({new_w}x{new_h})")
            except Exception as e:
                print(f"Failed to process {file_path}: {e}")

    print("\n--- Optimization Summary ---")
    print(f"{'File':<40} | {'Dims':<10} | {'Size Change'}")
    print("-" * 90)
    for r in results:
        name = Path(r['original_path']).name
        size_change = f"{r['original_kb']:.1f}KB -> {r['new_kb']:.1f}KB"
        print(f"{name:<40} | {r['width']}x{r['height']:<5} | {size_change}")

if __name__ == "__main__":
    optimize_assets()
