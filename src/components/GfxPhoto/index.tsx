/**
 * GfxPhoto 组件 - 专为 Fujifilm GFX100S 摄影作品设计的展示组件
 * 
 * 功能：
 * - 展示优化后的图片（网页版本）
 * - 异步提取并展示原图的 EXIF 数据
 * - 显示相机、镜头、拍摄参数
 * - 可选显示设备序列号（用于版权鉴证）
 */

import React from 'react';
import clsx from 'clsx';
import { useExif, formatExifSettings, type ExifData } from '../../hooks/useExif';
import styles from './styles.module.css';

export interface GfxPhotoProps {
    /** 原图路径（保留 EXIF 的完整图片） */
    originalSrc: string;
    /** 网页优化版路径（用于显示） */
    webSrc?: string;
    /** 图片描述 */
    alt: string;
    /** 作品标题 */
    title?: string;
    /** 作品描述 */
    description?: string;
    /** 是否显示设备序列号 */
    showSerial?: boolean;
    /** 是否显示 EXIF 信息 */
    showExif?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 点击查看原图的回调 */
    onViewOriginal?: () => void;
}

export default function GfxPhoto({
    originalSrc,
    webSrc,
    alt,
    title,
    description,
    showSerial = false,
    showExif = true,
    className,
    onViewOriginal,
}: GfxPhotoProps) {
    const { exif, loading: exifLoading } = useExif(originalSrc, { enabled: showExif });

    // 使用网页优化版显示，如果没有则使用原图
    const displaySrc = webSrc || originalSrc;

    return (
        <div className={clsx(styles.gfxPhotoWrapper, className)}>
            {/* 图片容器 */}
            <div className={styles.imageContainer}>
                <img
                    src={displaySrc}
                    alt={alt}
                    className={styles.photo}
                    loading="lazy"
                />

                {/* 查看原图按钮 */}
                {onViewOriginal && (
                    <button
                        className={styles.viewOriginalBtn}
                        onClick={onViewOriginal}
                        title="查看 100% 原图"
                    >
                        🔍 100MP
                    </button>
                )}
            </div>

            {/* 信息区域 */}
            <div className={styles.infoSection}>
                {/* 标题和描述 */}
                {title && <h3 className={styles.title}>{title}</h3>}
                {description && <p className={styles.description}>{description}</p>}

                {/* EXIF 信息 */}
                {showExif && (
                    <div className={styles.exifContainer}>
                        {exifLoading ? (
                            <span className={styles.exifLoading}>读取 EXIF...</span>
                        ) : exif ? (
                            <>
                                {/* 设备信息 */}
                                <div className={styles.deviceInfo}>
                                    {exif.camera && (
                                        <span className={styles.camera}>
                                            📷 {exif.make} {exif.camera}
                                        </span>
                                    )}
                                    {exif.lens && (
                                        <span className={styles.lens}>
                                            🔍 {exif.lens}
                                        </span>
                                    )}
                                </div>

                                {/* 拍摄参数 */}
                                <div className={styles.shootingInfo}>
                                    <span className={styles.settings}>
                                        {formatExifSettings(exif)}
                                    </span>
                                    {exif.focalLength && (
                                        <span className={styles.focalLength}>
                                            @ {exif.focalLength}
                                        </span>
                                    )}
                                </div>

                                {/* 时间 */}
                                {exif.dateTime && (
                                    <div className={styles.dateTime}>
                                        📅 {exif.dateTime}
                                    </div>
                                )}

                                {/* 设备序列号（可选，用于版权鉴证） */}
                                {showSerial && exif.bodySerial && (
                                    <div className={styles.serialInfo}>
                                        <span className={styles.serialLabel}>Device ID:</span>
                                        <span className={styles.serialValue}>
                                            {exif.bodySerial}
                                            {exif.lensSerial && ` / ${exif.lensSerial}`}
                                        </span>
                                    </div>
                                )}

                                {/* 版权信息 */}
                                {exif.copyright && (
                                    <div className={styles.copyright}>
                                        © {exif.artist || exif.copyright}
                                    </div>
                                )}
                            </>
                        ) : (
                            <span className={styles.noExif}>无 EXIF 数据</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * 紧凑版 EXIF 展示条
 */
export function ExifBar({ exif }: { exif: ExifData | null }) {
    if (!exif) return null;

    return (
        <div className={styles.exifBar}>
            <span>{exif.camera}</span>
            <span className={styles.separator}>·</span>
            <span>{exif.lens}</span>
            <span className={styles.separator}>·</span>
            <span>{formatExifSettings(exif)}</span>
        </div>
    );
}
