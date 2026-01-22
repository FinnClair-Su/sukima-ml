#!/usr/bin/env python3
"""
Batch optimize images in static/img/artworks:
1. Resize to max width 1200px
2. Convert to WebP (q=85)
3. Print original vs new size and dimensions for updating data
"""

import os
from PIL import Image
from pathlib import Path

# Config
SOURCE_DIR = "/Users/yukari/Code/sukima-ml/static/img/artworks"
MAX_WIDTH = 1200
QUALITY = 85

def optimize_images():
    source_path = Path(SOURCE_DIR)
    if not source_path.exists():
        print(f"Error: Directory {SOURCE_DIR} not found.")
        return

    print(f"Scanning {SOURCE_DIR}...")
    
    extensions = {'.jpg', '.jpeg', '.png'}
    files = [f for f in source_path.iterdir() if f.suffix.lower() in extensions]
    
    results = []

    for file_path in files:
        with Image.open(file_path) as img:
            # Calculate new size
            w, h = img.size
            if w > MAX_WIDTH:
                new_w = MAX_WIDTH
                new_h = int(h * (MAX_WIDTH / w))
            else:
                new_w = w
                new_h = h
            
            # Resize
            img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            # Save as WebP
            new_filename = file_path.stem + ".webp"
            output_path = source_path / new_filename
            
            img_resized.save(output_path, "WEBP", quality=QUALITY)
            
            # Stats
            original_size = file_path.stat().st_size / 1024
            new_size = output_path.stat().st_size / 1024
            
            results.append({
                "original_name": file_path.name,
                "new_name": new_filename,
                "width": new_w,
                "height": new_h,
                "original_kb": original_size,
                "new_kb": new_size
            })
            
            print(f"Processed {file_path.name} -> {new_filename} ({new_w}x{new_h})")

    print("\n--- Optimization Summary ---")
    print(f"{'Original File':<50} | {'New File':<40} | {'Dims':<10} | {'Size Change'}")
    print("-" * 120)
    for r in results:
        size_change = f"{r['original_kb']:.1f}KB -> {r['new_kb']:.1f}KB"
        print(f"{r['original_name']:<50} | {r['new_name']:<40} | {r['width']}x{r['height']:<5} | {size_change}")

if __name__ == "__main__":
    optimize_images()
