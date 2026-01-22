
import os
from PIL import Image

files = [
    "static/img/yukari.png",
    "static/img/artworks/Variant_B.jpg",
    "static/img/artworks/宫娥to辉夜&永远亭：我不是嫦娥.jpg",
    "static/img/artworks/yukari_v0.5.jpg",
    "static/img/artworks/artwork-003.jpg",
    "static/img/artworks/The Bookworm to The Pachouli-sama.jpg"
]

print(f"{'File':<60} {'Size (MB)':<10} {'Dimensions':<15}")
print("-" * 85)

for f in files:
    try:
        path = os.path.join(os.getcwd(), f)
        size_mb = os.path.getsize(path) / (1024 * 1024)
        with Image.open(path) as img:
            dims = f"{img.width}x{img.height}"
            print(f"{f:<60} {size_mb:<10.2f} {dims:<15}")
    except Exception as e:
        print(f"{f:<60} Error: {e}")
