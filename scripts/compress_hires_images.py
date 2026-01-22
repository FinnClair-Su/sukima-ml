#!/usr/bin/env python3
"""
压缩高分辨率 JPG 图片到指定大小以下
保持原始分辨率，通过调整 JPEG 质量来控制文件大小
"""

import os
import shutil
from PIL import Image

# 目标最大大小 (字节)
MAX_SIZE_MB = 24
MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

# 需要压缩的图片列表
IMAGES_TO_COMPRESS = [
    "/Users/yukari/Code/sukima-ml/static/photography/2026/01/DSCF0111.JPG",
    "/Users/yukari/Code/sukima-ml/static/photography/2026/01/DSCF0139.JPG",
    "/Users/yukari/Code/sukima-ml/static/photography/2026/01/DSCF0144.JPG",
]

def get_file_size_mb(filepath):
    """获取文件大小 (MB)"""
    return os.path.getsize(filepath) / (1024 * 1024)

def compress_image_to_target_size(input_path, output_path, target_size_bytes):
    """
    通过二分查找找到合适的 JPEG 质量，使文件大小接近但不超过目标大小
    """
    img = Image.open(input_path)
    
    # 保留 EXIF 数据
    exif_data = img.info.get('exif', None)
    
    # 二分查找最佳质量
    low, high = 1, 95
    best_quality = low
    
    while low <= high:
        mid = (low + high) // 2
        
        # 保存到临时文件测试大小
        temp_path = output_path + ".temp"
        save_kwargs = {"quality": mid, "optimize": True, "progressive": True}
        if exif_data:
            save_kwargs["exif"] = exif_data
        
        img.save(temp_path, "JPEG", **save_kwargs)
        size = os.path.getsize(temp_path)
        
        if size <= target_size_bytes:
            best_quality = mid
            low = mid + 1
        else:
            high = mid - 1
        
        os.remove(temp_path)
    
    # 使用最佳质量保存
    save_kwargs = {"quality": best_quality, "optimize": True, "progressive": True}
    if exif_data:
        save_kwargs["exif"] = exif_data
    
    img.save(output_path, "JPEG", **save_kwargs)
    img.close()
    
    return best_quality, os.path.getsize(output_path)

def main():
    print(f"🎯 目标: 压缩图片到 {MAX_SIZE_MB}MB 以下\n")
    
    for img_path in IMAGES_TO_COMPRESS:
        if not os.path.exists(img_path):
            print(f"❌ 文件不存在: {img_path}")
            continue
        
        original_size = get_file_size_mb(img_path)
        print(f"📷 处理: {os.path.basename(img_path)}")
        print(f"   原始大小: {original_size:.1f}MB")
        
        if original_size <= MAX_SIZE_MB:
            print(f"   ✅ 已经小于 {MAX_SIZE_MB}MB，跳过\n")
            continue
        
        # 备份原始文件
        backup_path = img_path.replace(".JPG", "_original.JPG")
        if not os.path.exists(backup_path):
            print(f"   💾 备份原始文件到: {os.path.basename(backup_path)}")
            shutil.copy2(img_path, backup_path)
        else:
            print(f"   💾 备份已存在，跳过备份")
        
        # 压缩图片
        quality, new_size = compress_image_to_target_size(img_path, img_path, MAX_SIZE_BYTES)
        new_size_mb = new_size / (1024 * 1024)
        
        print(f"   🔧 使用质量: {quality}")
        print(f"   ✅ 压缩后大小: {new_size_mb:.1f}MB")
        print(f"   📉 压缩比: {(1 - new_size_mb/original_size) * 100:.0f}%\n")
    
    print("🎉 完成！图片已压缩，原始文件保存为 *_original.JPG")

if __name__ == "__main__":
    main()
