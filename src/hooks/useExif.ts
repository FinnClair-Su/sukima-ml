/**
 * useExif Hook - 从预构建的 JSON 读取 EXIF 元数据
 * 
 * 专为 Fujifilm GFX100S + GF45mm f/2.8 设计
 * EXIF 数据在本地上传时通过 scripts/extract_exif.py 提取并保存为 JSON
 * 客户端仅读取预构建的 JSON，不进行任何图片请求
 */

import { useState, useEffect } from 'react';

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

    // 时间
    dateTime?: string;         // 拍摄时间

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
    /** 是否启用，可用于条件加载 */
    enabled?: boolean;
}

/**
 * 全局 EXIF 缓存 - 存储预构建的 EXIF 数据
 */
let prebuiltExifCache: Record<string, ExifData> | null = null;
let cacheLoadPromise: Promise<void> | null = null;

async function loadPrebuiltCache(): Promise<void> {
    if (prebuiltExifCache !== null) return;
    if (cacheLoadPromise) {
        await cacheLoadPromise;
        return;
    }

    cacheLoadPromise = (async () => {
        try {
            const response = await fetch('/photography/exif.json');
            if (response.ok) {
                prebuiltExifCache = await response.json();
            } else {
                prebuiltExifCache = {};
            }
        } catch {
            prebuiltExifCache = {};
        }
    })();

    await cacheLoadPromise;
}

/**
 * 从预构建 JSON 读取 EXIF 数据的 Hook
 * 
 * @param imageUrl 图片 URL（必须在 /photography/ 目录下）
 * @param options 配置选项
 */
export function useExif(
    imageUrl: string | undefined,
    options: UseExifOptions = {}
) {
    const { enabled = true } = options;

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
                await loadPrebuiltCache();

                // 从 URL 提取相对路径作为 key (e.g., "/photography/xxx/yyy.JPG" -> "/xxx/yyy.JPG")
                const urlPath = new URL(imageUrl, window.location.origin).pathname;
                const photographyMatch = urlPath.match(/\/photography(\/.*)/);
                const cacheKey = photographyMatch ? photographyMatch[1] : null;

                if (cacheKey && prebuiltExifCache && prebuiltExifCache[cacheKey]) {
                    if (!cancelled) {
                        setExif(prebuiltExifCache[cacheKey]);
                    }
                } else {
                    // 没有找到预构建数据，设置为空
                    if (!cancelled) {
                        setExif(null);
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    console.error('EXIF cache load failed:', err);
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
    }, [imageUrl, enabled]);

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
