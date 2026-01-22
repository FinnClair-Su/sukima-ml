/**
 * photoData.ts - 摄影作品数据结构定义
 * 
 * 用于管理 Phantasm 画廊中的 GFX100S 摄影作品
 */

export interface PhotoItem {
    /** 唯一标识符 */
    id: string;

    /** 作品标题 */
    title: string;

    /** 作品描述 */
    description?: string;

    /** 原图路径（保留完整 EXIF，用于元数据提取） */
    originalPath: string;

    /** 网页优化版路径（用于快速加载显示） */
    webPath?: string;

    /** 缩略图路径 */
    thumbnailPath?: string;

    /** 拍摄日期 (YYYY-MM-DD) */
    date: string;

    /** 分类标签 */
    tags: string[];

    /** 圣地巡礼相关信息 */
    location?: {
        /** 地点名称 */
        name: string;
        /** 东方 Project 关联（如果有） */
        touhouRelation?: string;
        /** GPS 坐标 */
        coordinates?: [number, number];
    };

    /** 是否公开显示 */
    published: boolean;

    /** 是否为精选作品 */
    featured?: boolean;
}

/**
 * 摄影作品集定义
 */
export interface PhotoCollection {
    /** 集合 ID */
    id: string;

    /** 集合标题 */
    title: string;

    /** 集合描述 */
    description: string;

    /** 封面图片 */
    coverPath: string;

    /** 包含的照片 ID 列表 */
    photoIds: string[];
}

/**
 * 摄影作品数据
 * 
 * 注意：originalPath 必须指向保留 EXIF 的原始文件
 * 建议目录结构：/static/photography/YYYY/MM/photo-id/
 */
export const photos: PhotoItem[] = [
    // 示例数据 - 实际使用时替换
    {
        id: 'placeholder-001',
        title: '即将上线',
        description: '富士GFX100S 中画幅摄影作品即将在此展出',
        originalPath: '/photography/placeholder.jpg',
        date: '2026-01-22',
        tags: ['placeholder'],
        published: false,
    },
];

/**
 * 摄影作品集合
 */
export const collections: PhotoCollection[] = [
    {
        id: 'gensokyo-pilgrimage',
        title: '幻想乡巡礼',
        description: '东方 Project 圣地巡礼摄影',
        coverPath: '/photography/collections/gensokyo-pilgrimage/cover.jpg',
        photoIds: [],
    },
    {
        id: 'fumo',
        title: 'Fumo Photography',
        description: '1亿像素下的 Fumo — 杀鸡用牛刀的极致反差',
        coverPath: '/photography/collections/fumo/cover.jpg',
        photoIds: [],
    },
];

/**
 * 获取已发布的照片列表
 */
export function getPublishedPhotos(): PhotoItem[] {
    return photos.filter(p => p.published);
}

/**
 * 获取精选照片
 */
export function getFeaturedPhotos(): PhotoItem[] {
    return photos.filter(p => p.published && p.featured);
}

/**
 * 根据标签筛选照片
 */
export function getPhotosByTag(tag: string): PhotoItem[] {
    return photos.filter(p => p.published && p.tags.includes(tag));
}

/**
 * 根据 ID 获取照片
 */
export function getPhotoById(id: string): PhotoItem | undefined {
    return photos.find(p => p.id === id);
}

/**
 * 获取所有唯一标签
 */
export function getAllTags(): string[] {
    const tagSet = new Set<string>();
    photos.filter(p => p.published).forEach(p => {
        p.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
}
