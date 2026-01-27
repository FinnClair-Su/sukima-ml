#!/usr/bin/env python3
"""
Unified Image Optimization Script for Photography Series
1. Scan specified directories.
2. For each High-Res JPG:
   - If size > 25MB, compress it (in-place) to < 24.5MB while keeping resolution.
   - Generate a WebP version scaled to fit within 2912x2184 (4:3 aspect ratio).
   - Remove "useless" files (old _web.jpg, _web.webp variations if they don't match the standard).
"""

import os
import shutil
from PIL import Image, ImageOps
from pathlib import Path

# Standard Configuration
# Standard Configuration
MIN_JPG_SIZE_MB = 20.0
MAX_JPG_SIZE_MB = 24.0
TARGET_JPG_SIZE_MB = 22.0
TARGET_JPG_BYTES = int(TARGET_JPG_SIZE_MB * 1024 * 1024)

WEBP_MAX_WIDTH = 2912
WEBP_MAX_HEIGHT = 2184
WEBP_QUALITY = 85

# Directories to process
TARGET_DIRS = [
    "/Users/yukari/Code/sukima-ml/static/photography/chaoyang2",
    "/Users/yukari/Code/sukima-ml/static/photography/flying-seimei",
    "/Users/yukari/Code/sukima-ml/static/photography/Skitting",
    "/Users/yukari/Code/sukima-ml/static/photography/fu-and-cat"
]

def compress_jpg_in_place(filepath):
    """
    Compress JPG in-place if it exceeds MAX_JPG_SIZE_MB.
    Tries to find the highest quality that fits under TARGET_JPG_SIZE_MB.
    """
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    if size_mb <= MAX_JPG_SIZE_MB:
        print(f"✅ JPG OK ({size_mb:.1f}MB): {Path(filepath).name}")
        return True

    print(f"📉 Compressing JPG ({size_mb:.1f}MB -> TARGET): {Path(filepath).name}...")
    
    img = Image.open(filepath)
    exif_data = img.info.get('exif')
    
    # Binary search for quality
    low, high = 1, 95
    best_quality = 80
    
    # Use a temp file for testing
    temp_path = str(filepath) + ".tmp.jpg"
    
    while low <= high:
        mid = (low + high) // 2
        save_kwargs = {"quality": mid, "optimize": True, "progressive": True}
        if exif_data:
            save_kwargs["exif"] = exif_data
            
        img.save(temp_path, "JPEG", **save_kwargs)
        size = os.path.getsize(temp_path)
        
        if size < TARGET_JPG_BYTES:
            best_quality = mid
            low = mid + 1
        else:
            high = mid - 1
            
    # Save final
    save_kwargs = {"quality": best_quality, "optimize": True, "progressive": True}
    if exif_data:
        save_kwargs["exif"] = exif_data
    img.save(filepath, "JPEG", **save_kwargs)
    img.close()
    
    # Verify
    new_size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"   Saved at Q{best_quality}, Size: {new_size_mb:.1f}MB")
    if os.path.exists(temp_path):
        os.remove(temp_path)
        
    return True

def generate_standard_webp(jpg_path):
    """
    Generate standard WebP from the JPG source.
    Resizes to fit within 2912x2184.
    """
    webp_path = Path(jpg_path).with_suffix('.webp')
    
    with Image.open(jpg_path) as img:
        # Fix orientation
        img = ImageOps.exif_transpose(img)
        
        # Calculate new dimensions maintaining aspect ratio
        original_w, original_h = img.size
        
        # We want to fit within WEBP_MAX_WIDTH x WEBP_MAX_HEIGHT
        # This is essentially fitting into a box
        
        # Check aspect ratio
        ratio = min(WEBP_MAX_WIDTH / original_w, WEBP_MAX_HEIGHT / original_h)
        
        # If image is already smaller than target, don't upscale? 
        # Actually standard says "Keep 2912x2184", usually implying max dimension.
        # But if original is smaller, we keep it. 
        # However, these constitute "Photography", so they are likely huge.
        
        if ratio < 1:
            new_w = int(original_w * ratio)
            new_h = int(original_h * ratio)
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            print(f"   Resizing for WebP: {original_w}x{original_h} -> {new_w}x{new_h}")
        else:
            print(f"   Original smaller than target ({original_w}x{original_h}), keeping size.")
            
        # Strip metadata for WebP to save space, but maybe keep basic EXIF? 
        # Usually web display doesn't need full EXIF inside the file if we rely on data/JSON.
        # But user likes EXIF. Let's keep it if possible, but WebP exif support in PIL can be tricky.
        # Simple save usually drops it unless specified. 
        # Let's drop strictly solely primarily to ensure small size, as EXIF is displayed via code lookup in this project mostly?
        # WAIT: User said "EXIF data MUST be extracted from the actual image file". 
        # So we MUST KEEP EXIF in the WebP if the component reads from WebP?
        # Actually key: The "High-Res Downloads" are JPG. The WebP is for display.
        # If the code reads metadata from the *WebP* or the *JPG*?
        # Looking at code: `useExif` hook exists. 
        # The code in `chaoyang2.tsx` (and `flyingSSky.tsx`) has HARDCODED data in `photos` array?
        # NO: `useExif` hook was seen in `index.tsx` imports but `chaoyang2.tsx` defines `const photos = [ ... aperture: 'f/5.6' ...]`.
        # So it seems valid metadata is manually put in code or read?
        # Actually `IMAGE_STANDARDS.md` says: "Source of Truth: EXIF data MUST be extracted from the actual image file... Do not manually hardcode".
        # This implies dynamic reading.
        # BUT `chaoyang2.tsx` HAS hardcoded data! 
        # "Image Standards" is the *goal*. The current code might be transitional. 
        # Safest bet: Keep EXIF in WebP if possible, or definitely keep it in JPG.
        # PIL's `.save(..., exif=img.info.get('exif'))` works for WebP in newer versions.
        
        save_kwargs = {"quality": WEBP_QUALITY}
        if 'exif' in img.info:
            save_kwargs['exif'] = img.info['exif']
            
        img.save(webp_path, "WEBP", **save_kwargs)
        print(f"   Generated WebP: {webp_path.name}")

def cleanup_directory(directory):
    """
    Remove files that are not the master JPG or the standard WebP.
    E.g. *_web.jpg, *_web.webp, etc.
    """
    path = Path(directory)
    print(f"🧹 Cleaning {directory}...")
    for file in path.iterdir():
        if file.name.lower() == ".ds_store":
            continue
            
        # Is it a master JPG? (No _, ends in .jpg)
        if file.suffix.lower() == '.jpg' and '_' not in file.stem:
            continue
            
        # Is it a standard WebP? (No _, ends in .webp, corresponding JPG exists)
        if file.suffix.lower() == '.webp' and '_' not in file.stem:
            # check if corresponding jpg exists
            if file.with_suffix('.jpg').exists() or file.with_suffix('.JPG').exists():
                continue
                
        # If we are here, it's likely a derivative file we want to remove
        # e.g. DSCFxxxx_web.webp, DSCFxxxx_web.jpg
        # OR it's a file that doesn't have a master JPG (orphan).
        
        print(f"   🗑 Removing: {file.name}")
        os.remove(file)

def main():
    print("🚀 Starting Optimization for Photography Series...")
    
    # 1. Compress & Generate
    for d in TARGET_DIRS:
        if not os.path.exists(d):
            print(f"Directory not found: {d}")
            continue
            
        for file in Path(d).rglob("*.JPG"): # Case sensitive check usually on Mac works either way but let's match exact
            # Ignore already compressed or derivative files that we might clean up later
            if "_" in file.stem: 
                continue
                
            print(f"\nProcessing {file.name}...")
            compress_jpg_in_place(file)
            generate_standard_webp(file)
            
        # 2. Cleanup
        cleanup_directory(d)

if __name__ == "__main__":
    main()
