
import os
import shutil
from PIL import Image

# Configuration
MAX_DIM = 1920
QUALITY = 80
BACKUP_DIR = "static/img/artworks_backup"

files_to_optimize = [
    "static/img/artworks/Variant_B.jpg",
    "static/img/artworks/宫娥to辉夜&永远亭：我不是嫦娥.jpg",
    "static/img/artworks/yukari_v0.5.jpg",
    "static/img/artworks/artwork-003.jpg",
]

# Ensure backup dir exists
if not os.path.exists(BACKUP_DIR):
    os.makedirs(BACKUP_DIR)

print(f"{'File':<60} {'Original':<10} {'New':<10} {'Status':<10}")
print("-" * 100)

for f in files_to_optimize:
    try:
        path = os.path.join(os.getcwd(), f)
        filename = os.path.basename(path)
        backup_path = os.path.join(BACKUP_DIR, filename)

        if not os.path.exists(path):
            print(f"{f:<60} NOT FOUND")
            continue

        # Backup
        if not os.path.exists(backup_path):
            shutil.copy2(path, backup_path)
        
        original_size = os.path.getsize(path) / (1024 * 1024)

        with Image.open(path) as img:
            # Check if resizing is needed
            width, height = img.size
            if width > MAX_DIM or height > MAX_DIM:
                # Calculate new aspect ratio
                if width > height:
                    new_width = MAX_DIM
                    new_height = int(height * (MAX_DIM / width))
                else:
                    new_height = MAX_DIM
                    new_width = int(width * (MAX_DIM / height))
                
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save
            img.save(path, "JPEG", quality=QUALITY, optimize=True)
        
        new_size = os.path.getsize(path) / (1024 * 1024)
        print(f"{filename:<60} {original_size:<10.2f} {new_size:<10.2f} Done")

    except Exception as e:
        print(f"{f:<60} Error: {e}")

# Optimize yukari.png separately (just re-save with optimization, no resize to keep edge quality)
png_file = "static/img/yukari.png"
if os.path.exists(png_file):
    try:
        backup_path = os.path.join("static/img", "yukari.png.bak")
        if not os.path.exists(backup_path):
            shutil.copy2(png_file, backup_path)
            
        original_size = os.path.getsize(png_file) / (1024 * 1024)
        
        with Image.open(png_file) as img:
            # Png optimization in PIL is limited, but we'll try
            # If we really wanted to optimize, we'd use 'pngquant' via subprocess, but we'll stick to PIL for now
            # 'optimize=True' in save might help a bit
            img.save(png_file, "PNG", optimize=True)
            
        new_size = os.path.getsize(png_file) / (1024 * 1024)
        print(f"{'yukari.png':<60} {original_size:<10.2f} {new_size:<10.2f} Done (PNG Opt)")
    except Exception as e:
        print(f"{png_file:<60} Error: {e}")

