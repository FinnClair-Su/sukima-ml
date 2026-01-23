#!/usr/bin/env python3
"""
extract_exif.py - 构建时预提取 EXIF 数据

用途：避免运行时为每张图片发起 Range Request，
通过预提取 EXIF 到 JSON 文件加速页面加载。

运行：python scripts/extract_exif.py

输出：static/photography/exif.json
"""

import os
import json
from pathlib import Path
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

# 配置
PHOTOGRAPHY_DIR = Path("/Users/yukari/Code/sukima-ml/static/photography")
OUTPUT_FILE = PHOTOGRAPHY_DIR / "exif.json"

# 是否在输出中包含 GPS 数据（隐私考量）
INCLUDE_GPS = False

def get_exif_data(image_path: Path) -> dict:
    """从图片提取 EXIF 数据"""
    try:
        with Image.open(image_path) as img:
            exif_raw = img._getexif()
            if not exif_raw:
                return {}
            
            exif_data = {}
            
            for tag_id, value in exif_raw.items():
                tag = TAGS.get(tag_id, tag_id)
                
                # 跳过二进制数据
                if isinstance(value, bytes):
                    continue
                
                # GPS 数据处理
                if tag == "GPSInfo" and not INCLUDE_GPS:
                    # 跳过 GPS 以保护隐私
                    continue
                
                # 关键 EXIF 字段
                if tag in [
                    "Make", "Model", "LensModel", 
                    "FocalLength", "FNumber", "ExposureTime", 
                    "ISOSpeedRatings", "ExposureBiasValue",
                    "DateTimeOriginal", "DateTime",
                    "Artist", "Copyright",
                    "ImageWidth", "ImageLength",
                    "BodySerialNumber", "LensSerialNumber"
                ]:
                    # 格式化特定字段
                    if tag == "FNumber" and hasattr(value, 'numerator'):
                        exif_data["aperture"] = f"f/{float(value):.1f}"
                    elif tag == "ExposureTime" and hasattr(value, 'numerator'):
                        if value < 1:
                            exif_data["shutterSpeed"] = f"1/{int(1/float(value))}"
                        else:
                            exif_data["shutterSpeed"] = f"{float(value)}s"
                    elif tag == "FocalLength" and hasattr(value, 'numerator'):
                        exif_data["focalLength"] = f"{int(float(value))}mm"
                    elif tag == "ExposureBiasValue" and hasattr(value, 'numerator'):
                        bias = float(value)
                        if bias > 0:
                            exif_data["exposureCompensation"] = f"+{bias:.1f} EV"
                        elif bias < 0:
                            exif_data["exposureCompensation"] = f"{bias:.1f} EV"
                        else:
                            exif_data["exposureCompensation"] = "0 EV"
                    elif tag == "ISOSpeedRatings":
                        exif_data["iso"] = str(value)
                    elif tag == "Model":
                        exif_data["camera"] = str(value)
                    elif tag == "Make":
                        exif_data["make"] = str(value)
                    elif tag == "LensModel":
                        exif_data["lens"] = str(value).rstrip('\x00 ')
                    elif tag in ["DateTimeOriginal", "DateTime"]:
                        exif_data["dateTime"] = str(value)
                    elif tag == "Artist":
                        exif_data["artist"] = str(value).rstrip('\x00 ')
                    elif tag == "Copyright":
                        exif_data["copyright"] = str(value).rstrip('\x00 ')
                    elif tag == "ImageWidth":
                        exif_data["width"] = int(value)
                    elif tag == "ImageLength":
                        exif_data["height"] = int(value)
                    elif tag == "BodySerialNumber":
                        exif_data["bodySerial"] = str(value).rstrip('\x00 ')
                    elif tag == "LensSerialNumber":
                        exif_data["lensSerial"] = str(value).rstrip('\x00 ')
            
            return exif_data
    except Exception as e:
        print(f"  警告: 无法读取 {image_path.name}: {e}")
        return {}

def main():
    print("=" * 60)
    print("EXIF 数据预提取工具")
    print("=" * 60)
    
    if not PHOTOGRAPHY_DIR.exists():
        print(f"错误: 目录不存在 {PHOTOGRAPHY_DIR}")
        return
    
    exif_db = {}
    image_extensions = {'.jpg', '.jpeg', '.JPG', '.JPEG'}
    
    # 扫描所有图片
    for img_path in PHOTOGRAPHY_DIR.rglob("*"):
        if img_path.suffix not in image_extensions:
            continue
        
        # 获取相对路径作为 key
        rel_path = img_path.relative_to(PHOTOGRAPHY_DIR)
        key = "/" + str(rel_path).replace("\\", "/")
        
        print(f"处理: {rel_path}")
        exif_data = get_exif_data(img_path)
        
        if exif_data:
            exif_db[key] = exif_data
            print(f"  ✓ 提取到 {len(exif_data)} 个字段")
        else:
            print(f"  - 无 EXIF 数据")
    
    # 写入 JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(exif_db, f, ensure_ascii=False, indent=2)
    
    print("=" * 60)
    print(f"完成! 共处理 {len(exif_db)} 张图片")
    print(f"输出: {OUTPUT_FILE}")
    print(f"GPS 数据: {'包含' if INCLUDE_GPS else '已排除 (隐私保护)'}")
    print("=" * 60)

if __name__ == "__main__":
    main()
