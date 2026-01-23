/**
 * 飞翔晴明 (Flying Seimei) 系列
 */

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from '../index.module.css';

// 照片数据
const photos = [
    {
        id: 'dscf0232',
        aperture: 'f/16.0',
        shutter: '1/80s',
        iso: 'ISO 160',
        webImage: '/photography/flying-seimei/DSCF0232.webp',
        hiResImage: '/photography/flying-seimei/DSCF0232.JPG',
        aspectRatio: '4/3',
        date: '2026-01-22',
        title: 'Flying Seimei IV',
        location: '',
    },
    {
        id: 'dscf0227',
        aperture: 'f/16.0',
        shutter: '1/100s',
        iso: 'ISO 160',
        webImage: '/photography/flying-seimei/DSCF0227.webp',
        hiResImage: '/photography/flying-seimei/DSCF0227.JPG',
        aspectRatio: '4/3',
        date: '2026-01-22',
        title: 'Flying Seimei III',
        location: '',
    },
    {
        id: 'dscf0328',
        aperture: 'f/8.0',
        shutter: '1/480s',
        iso: 'ISO 160',
        webImage: '/photography/flying-seimei/DSCF0328.webp',
        hiResImage: '/photography/flying-seimei/DSCF0328.JPG',
        aspectRatio: '4/3',
        date: '2026-01-22',
        title: 'Flying Seimei V',
        location: '',
    },
    {
        id: 'dscf3581',
        aperture: 'f/4.0',
        shutter: '1/480s',
        iso: 'ISO 125',
        webImage: '/photography/flying-seimei/DSCF3581.webp',
        hiResImage: '/photography/flying-seimei/DSCF3581.JPG',
        aspectRatio: '4/3',
        date: '2026-01-20',
        title: 'Flying Seimei VI',
        location: '',
    },
    {
        id: 'dscf0070',
        aperture: 'f/8.0',
        shutter: '1/180s',
        iso: 'ISO 1250',
        webImage: '/photography/flying-seimei/DSCF0070.webp',
        hiResImage: '/photography/flying-seimei/DSCF0070.JPG',
        aspectRatio: '4/3',
        date: '2026-01-21',
        title: 'Flying Seimei II',
        location: '',
    },
    {
        id: 'dscf0059',
        aperture: 'f/8.0',
        shutter: '1/340s',
        iso: 'ISO 1250',
        webImage: '/photography/flying-seimei/DSCF0059.webp',
        hiResImage: '/photography/flying-seimei/DSCF0059.JPG',
        aspectRatio: '3/4',
        date: '2026-01-21',
        title: 'Flying Seimei I',
        location: '',
    },
];

// 照片展示组件
interface PhotoItemProps {
    photo: typeof photos[0];
    onClick: () => void;
    isFirst?: boolean;
}

function PhotoItem({ photo, onClick, isFirst }: PhotoItemProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [mouseY, setMouseY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const halfHeight = rect.height / 2;

        // 只在鼠标位于图片下半部分时显示提示
        setShowTooltip(y > halfHeight);
        setMouseY(y);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div
            style={{
                cursor: 'pointer',
                gridColumn: isFirst ? '1 / -1' : 'auto', // 第一张占满整行
            }}
            onClick={onClick}
        >
            <div
                style={{ position: 'relative' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={useBaseUrl(photo.webImage)}
                    alt={photo.title}
                    style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: photo.aspectRatio,
                        objectFit: 'cover',
                        display: 'block',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    loading="lazy"
                />
                {/* 右下角小提示 - 只在鼠标位于下半部分时显示 */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                bottom: '12px',
                                right: '12px',
                                background: 'rgba(0,0,0,0.75)',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontFamily: '"Courier New", monospace',
                                pointerEvents: 'none',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            <Translate id="gallery.clickToSee">Click to see</Translate>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// 照片详情弹窗
interface PhotoDetailModalProps {
    photo: typeof photos[0] | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

function PhotoDetailModal({ photo, onClose, onPrev, onNext }: PhotoDetailModalProps) {
    if (!photo) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={onClose}
        >
            {/* 关闭按钮 */}
            <button
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    zIndex: 10001,
                }}
            >
                <X size={24} />
            </button>

            {/* 左右导航 */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                style={{
                    position: 'fixed',
                    left: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '1rem',
                    cursor: 'pointer',
                    zIndex: 10001,
                }}
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                style={{
                    position: 'fixed',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '1rem',
                    cursor: 'pointer',
                    zIndex: 10001,
                }}
            >
                <ChevronRight size={24} />
            </button>

            <div
                style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    flexWrap: 'wrap', // Mobile responsive
                    justifyContent: 'center'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 照片 */}
                <div style={{ flex: '1 1 auto', maxWidth: '70vw', minWidth: '300px' }}>
                    <a href={useBaseUrl(photo.hiResImage)} target="_blank" rel="noopener noreferrer">
                        <img
                            src={useBaseUrl(photo.webImage)}
                            alt={photo.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '80vh',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </a>
                </div>

                {/* EXIF 信息 */}
                <div style={{
                    background: '#fff',
                    padding: '2rem',
                    minWidth: '250px',
                    width: '300px',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    borderRadius: '4px'
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#999',
                        letterSpacing: '0.15em',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        fontFamily: '"Courier New", monospace',
                        borderBottom: '1px solid #eee',
                        paddingBottom: '0.5rem'
                    }}>
                        EXIF DATA
                    </div>

                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.85rem',
                        fontFamily: '"Courier New", monospace',
                    }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px 0', color: '#666' }}>Aperture</td>
                                <td style={{ padding: '8px 0', fontWeight: 600, color: '#b71c1c', textAlign: 'right' }}>{photo.aperture}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px 0', color: '#666' }}>Shutter</td>
                                <td style={{ padding: '8px 0', fontWeight: 600, color: '#b71c1c', textAlign: 'right' }}>{photo.shutter}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px 0', color: '#666' }}>ISO</td>
                                <td style={{ padding: '8px 0', fontWeight: 600, color: '#b71c1c', textAlign: 'right' }}>{photo.iso}</td>
                            </tr>

                            <tr style={{ borderTop: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '12px 0 0 0', color: '#999', fontSize: '0.75rem' }} colSpan={2}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>GFX100S</span>
                                        <span>GF45mm F2.8</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '4px 0', color: '#ccc', fontSize: '0.75rem' }} colSpan={2}>
                                    {photo.date} {photo.location ? `@ ${photo.location}` : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function FlyingSeimei() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

    const handlePrev = () => {
        if (!selectedPhoto) return;
        const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        setSelectedPhoto(photos[prevIndex]);
    };

    const handleNext = () => {
        if (!selectedPhoto) return;
        const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
        const nextIndex = (currentIndex + 1) % photos.length;
        setSelectedPhoto(photos[nextIndex]);
    };

    // 生成 JSON-LD
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "ImageGallery",
        "name": "Flying Seimei - Photography by Fischer Su",
        "description": "Flying Seimei Photography Series",
        "author": {
            "@type": "Person",
            "name": "Fischer Su"
        },
        "image": photos.map(photo => ({
            "@type": "Photograph",
            "name": photo.title,
            "creator": {
                "@type": "Person",
                "name": "Fischer Su"
            },
            "contentLocation": photo.location ? {
                "@type": "Place",
                "name": photo.location
            } : undefined,
            "dateCreated": photo.date,
            "image": `https://sukima-ml.club${photo.hiResImage}`,
            "thumbnailUrl": `https://sukima-ml.club${photo.webImage}`,
            "copyrightNotice": "Copyright © Fischer Su. All rights reserved.",
            "license": "https://sukima-ml.club/copyright",
            "acquireLicensePage": "https://sukima-ml.club/copyright",
            "creditText": "Fischer Su | Studio Phantasm",
            "camera": "Fujifilm GFX100S",
            "lens": "Fujinon GF45mm f/2.8 R WR",
            "iso": photo.iso.replace('ISO ', ''),
            "shutterSpeed": photo.shutter,
            "fStop": photo.aperture
        }))
    };


    return (
        <Layout
            title={translate({ id: 'flyingSeimei.title', message: '飞翔晴明 | Phantasm' })}
            description="Flying Seimei - GFX100S Photography Series"
        >
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>
            <main className={styles.mainContainer}>
                {/* Header */}
                <div style={{
                    padding: '3rem 2rem',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontFamily: '"Times New Roman", serif',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 300,
                        margin: 0,
                        marginBottom: '0.5rem',
                    }}>
                        <Translate id="flyingSeimei.heading">飞翔晴明</Translate>
                    </h1>
                    <p style={{
                        fontFamily: '"Songti SC", serif',
                        fontSize: '1.05rem',
                        color: '#666',
                        maxWidth: '700px',
                        margin: '0 auto 1rem auto',
                        lineHeight: 1.9,
                    }}>
                        <Translate id="flyingSeimei.intro">
                            翱翔于天际的晴明，光影交织的瞬间。
                        </Translate>
                    </p>
                    <style>{`
                        .mobile-hint {
                            display: none;
                        }
                        @media (max-width: 767px) {
                            .mobile-hint {
                                display: block;
                            }
                        }
                    `}</style>
                    {/* 移动端提示 - 只在移动端显示 */}
                    <p className="mobile-hint" style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '0.8rem',
                        color: '#999',
                        marginTop: '0.75rem',
                    }}>
                        <span style={{ display: 'inline-block' }}>💡 </span>
                        <Translate id="chaoyang.mobileHint">此页面更适合在桌面端查看</Translate>
                    </p>
                    <Link
                        to="/phantasm"
                        style={{
                            display: 'inline-block',
                            marginTop: '1.5rem',
                            padding: '0.5rem 1.5rem',
                            border: '1px solid #b71c1c',
                            color: '#b71c1c',
                            fontFamily: '"Courier New", monospace',
                            fontSize: '0.85rem',
                            textDecoration: 'none',
                            letterSpacing: '0.1em',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#b71c1c';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#b71c1c';
                        }}
                    >
                        ← <Translate id="chaoyang.back">BACK TO PHANTASM</Translate>
                    </Link>
                </div>

                {/* Photo Grid - 桌面端：第一张80%宽，其余并排；移动端：全部等宽 */}
                <div style={{
                    padding: '3rem 2rem',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}>
                    <style>{`
                        @media (min-width: 768px) {
                            .photo-grid {
                                display: grid;
                                grid-template-columns: repeat(2, 1fr);
                                gap: 2rem;
                            }
                            .photo-grid > *:first-child {
                                grid-column: 1 / -1;
                                max-width: 100%;
                                margin: 0 0 2rem 0;
                            }
                        }
                        @media (max-width: 767px) {
                            .photo-grid {
                                display: grid;
                                grid-template-columns: 1fr;
                                gap: 2rem;
                            }
                        }
                    `}</style>
                    <div className="photo-grid">
                        {photos.map((photo, index) => (
                            <PhotoItem
                                key={photo.id}
                                photo={photo}
                                onClick={() => setSelectedPhoto(photo)}
                                isFirst={index === 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Photo Detail Modal */}
                <AnimatePresence>
                    {selectedPhoto && (
                        <PhotoDetailModal
                            photo={selectedPhoto}
                            onClose={() => setSelectedPhoto(null)}
                            onPrev={handlePrev}
                            onNext={handleNext}
                        />
                    )}
                </AnimatePresence>
            </main>
        </Layout>
    );
}
