
import os
from PIL import Image

try:
    img_path = "static/img/yukari.png"
    webp_path = "static/img/yukari.webp"
    
    with Image.open(img_path) as img:
        img.save(webp_path, "WEBP", quality=85)
        
    old_size = os.path.getsize(img_path) / 1024
    new_size = os.path.getsize(webp_path) / 1024
    
    print(f"Original PNG: {old_size:.2f} KB")
    print(f"New WEBP: {new_size:.2f} KB")
    
except Exception as e:
    print(f"Error: {e}")
