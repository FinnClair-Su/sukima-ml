/**
 * useExif Hook - 从图片 URL 异步提取 EXIF 元数据
 * 
 * 专为 Fujifilm GFX100S + GF45mm f/2.8 设计
 * 使用 Range Request 仅下载头部数据，避免加载完整大图
 */

import { useState, useEffect } from 'react';
import ExifReader from 'exifreader';

export interface ExifData {
    // 相机信息
    camera?: string;           // 机身型号 (e.g., "GFX100S")
    make?: string;             // 制造商 (e.g., "FUJIFILM")
    lens?: string;             // 镜头型号 (e.g., "GF45mmF2.8 R WR")

    // 设备序列号（用于版权鉴证）
    bodySerial?: string;       // 机身序列号
    lensSerial?: string;       // 镜头序列号

    // 拍摄参数
    focalLength?: string;      // 焦距
    aperture?: string;         // 光圈
    shutterSpeed?: string;     // 快门速度
    iso?: string;              // ISO
    exposureCompensation?: string; // 曝光补偿

    // 时间与位置
    dateTime?: string;         // 拍摄时间
    gps?: {
        latitude?: number;
        longitude?: number;
    };

    // 版权信息
    artist?: string;           // 创作者
    copyright?: string;        // 版权声明

    // 富士特有
    filmSimulation?: string;   // 胶片模拟模式

    // 图像信息
    width?: number;
    height?: number;
}

export interface UseExifOptions {
    /** 下载的字节数，默认 128KB 足以覆盖大多数 EXIF */
    rangeBytes?: number;
    /** 是否启用，可用于条件加载 */
    enabled?: boolean;
}

export function useExif(
    imageUrl: string | undefined,
    options: UseExifOptions = {}
) {
    const { rangeBytes = 131072, enabled = true } = options;

    const [exif, setExif] = useState<ExifData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!imageUrl || !enabled) {
            setExif(null);
            return;
        }

        let cancelled = false;

        async function fetchExif() {
            setLoading(true);
            setError(null);

            try {
                // 使用 Range Request 仅下载头部
                const response = await fetch(imageUrl, {
                    headers: {
                        'Range': `bytes=0-${rangeBytes - 1}`
                    }
                });

                if (!response.ok && response.status !== 206) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }

                const buffer = await response.arrayBuffer();
                const tags = ExifReader.load(buffer, { expanded: true }) as any;

                if (cancelled) return;

                // 解析标准 EXIF 字段
                const exifData: ExifData = {};

                // 相机信息
                exifData.make = tags.exif?.Make?.description;
                exifData.camera = tags.exif?.Model?.description;
                exifData.lens = tags.exif?.LensModel?.description;

                // 设备序列号（可能在 MakerNotes 中）
                exifData.bodySerial = tags.exif?.BodySerialNumber?.description
                    || tags.exif?.SerialNumber?.description;
                exifData.lensSerial = tags.exif?.LensSerialNumber?.description;

                // 拍摄参数
                exifData.focalLength = tags.exif?.FocalLength?.description;
                exifData.aperture = tags.exif?.FNumber?.description
                    || tags.exif?.ApertureValue?.description;
                exifData.shutterSpeed = tags.exif?.ExposureTime?.description
                    || tags.exif?.ShutterSpeedValue?.description;
                exifData.iso = tags.exif?.ISOSpeedRatings?.description
                    || tags.exif?.PhotographicSensitivity?.description;
                exifData.exposureCompensation = tags.exif?.ExposureBiasValue?.description;

                // 时间
                exifData.dateTime = tags.exif?.DateTimeOriginal?.description
                    || tags.exif?.DateTime?.description;

                // GPS
                if (tags.gps?.Latitude && tags.gps?.Longitude) {
                    exifData.gps = {
                        latitude: tags.gps.Latitude,
                        longitude: tags.gps.Longitude
                    };
                }

                // 版权
                exifData.artist = tags.exif?.Artist?.description;
                exifData.copyright = tags.exif?.Copyright?.description;

                // 图像尺寸
                exifData.width = tags.file?.['Image Width']?.value
                    || tags.exif?.PixelXDimension?.value;
                exifData.height = tags.file?.['Image Height']?.value
                    || tags.exif?.PixelYDimension?.value;

                // 富士胶片模拟（通常在 MakerNotes 或 XMP 中）
                // exifreader 可能需要特殊处理
                if (tags.xmp?.FilmMode) {
                    exifData.filmSimulation = tags.xmp.FilmMode.description;
                }

                setExif(exifData);
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    console.error('EXIF extraction failed:', err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchExif();

        return () => {
            cancelled = true;
        };
    }, [imageUrl, rangeBytes, enabled]);

    return { exif, loading, error };
}

/**
 * 格式化 EXIF 数据为展示友好的字符串
 */
export function formatExifSettings(exif: ExifData): string {
    const parts: string[] = [];

    if (exif.aperture) {
        // 确保格式为 f/X.X
        const aperture = exif.aperture.startsWith('f/')
            ? exif.aperture
            : `f/${exif.aperture}`;
        parts.push(aperture);
    }

    if (exif.shutterSpeed) {
        parts.push(exif.shutterSpeed);
    }

    if (exif.iso) {
        parts.push(`ISO ${exif.iso}`);
    }

    return parts.join(' · ');
}
