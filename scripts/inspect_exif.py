#!/usr/bin/env python3
import os
from PIL import Image, ExifTags

def get_exif_data(image_path):
    print(f"\n--- Inspcting {os.path.basename(image_path)} ---")
    try:
        img = Image.open(image_path)
        exif = img.getexif()
        
        if not exif:
            print("No EXIF data found!")
            return

        # Basic tags
        lookup = {
            33434: 'ExposureTime',
            33437: 'FNumber',
            34855: 'ISOSpeedRatings',
            306: 'DateTime',
            274: 'Orientation',
            271: 'Make',
            272: 'Model',
            37386: 'FocalLength',
        }
        
        # Traverse IFDs
        from PIL.ExifTags import TAGS
        
        # Top level
        print("Top Level:")
        for tag_id, val in exif.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag_id in lookup or tag in ['Make', 'Model', 'Orientation', 'DateTime']:
                 print(f"  {tag} ({tag_id}): {val}")

        # SubIFD (ExifOffset)
        # 0x8769 = 34665
        if 34665 in exif:
            print("SubIFD (0x8769):")
            sub_ifd = exif.get_ifd(34665)
            for tag_id, val in sub_ifd.items():
                tag = TAGS.get(tag_id, tag_id)
                # print(f"  {tag} ({tag_id}): {val}")
                if tag in ['ExposureTime', 'FNumber', 'ISOSpeedRatings', 'FocalLength', 'DateTimeOriginal', 'LensModel']:
                    print(f"  {tag}: {val}")
                    
    except Exception as e:
        print(f"Error reading EXIF: {e}")

DIR = "static/photography/flying-seimei"
files = sorted([f for f in os.listdir(DIR) if f.lower().endswith('.jpg')])

for f in files:
    get_exif_data(os.path.join(DIR, f))
