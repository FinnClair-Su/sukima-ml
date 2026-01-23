#!/usr/bin/env python3
"""
Cleanup script to remove unused source images from static/img.
Rules:
1. Scan static/img
2. Exclude 'digital_Resource' directory.
3. For each image file (JPG, PNG, etc.):
   - If a corresponding WebP exists (checking that optimization happened).
   - Check if the filename (e.g., 'IMG_0196.jpg') is referenced in `src/`.
   - If NOT referenced, DELETE it.
"""

import os
import glob
from pathlib import Path

SRC_DIR = "/Users/yukari/Code/sukima-ml/src"
IMG_DIR = "/Users/yukari/Code/sukima-ml/static/img"
EXCLUDE_DIRS = ["digital_Resource", "artworks_backup"]

def search_in_src(filename):
    # Simple grep equivalent
    # We search recursively in src for the string
    # This is expensive but safe.
    # Actually, let's load all source files once? No, too big.
    # Let's iterate.
    
    # Heuristic: Most references are file names.
    # grep -r "filename" src
    
    # Python implementation of grep
    command = f"grep -r '{filename}' {SRC_DIR}"
    ret = os.system(command + " > /dev/null 2>&1")
    return ret == 0

def main():
    print("🧹 Starting cleanup of unused source images...")
    
    root_path = Path(IMG_DIR)
    
    # Get all source images (not WebP)
    # We consider JPG, PNG.
    extensions = {'.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'}
    
    files_to_check = []
    
    for ext in extensions:
        files_to_check.extend(root_path.rglob(f"*{ext}"))
        
    for file_path in files_to_check:
        # 1. Check exclusions
        rel_path = file_path.relative_to(root_path)
        if any(ex in str(rel_path) for ex in EXCLUDE_DIRS):
            continue
            
        print(f"Checking {file_path.name}...")
        
        # 2. Check if WebP version exists
        webp_path = file_path.with_suffix('.webp')
        if not webp_path.exists():
            print(f"  Skipping: No WebP version found.")
            continue
            
        # 3. Check if strict filename is used in src
        if search_in_src(file_path.name):
            print(f"  Keep: Referenced in code.")
            continue
            
        # 4. Check if just the stem is used?
        # e.g. imported as X, used as X.
        # But usually we use full path strings in React imports or src="...jpg"
        # If user uses <img src={require('./...jpg').default} />
        
        # Risk: What if the code references the JPG specifically for a download?
        # "search_in_src" checks for the Extension too because we pass file_path.name
        
        print(f"  🗑 DELETE: Unused source {file_path.name}")
        os.remove(file_path)
        
    print("Done.")

if __name__ == "__main__":
    main()
