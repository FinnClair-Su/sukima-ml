/**
 * =============================================================================
 * PHANTASM - 幻象阶段 · 中画幅摄影画廊
 * =============================================================================
 * 
 * 【关于作者的器材】
 * Fujifilm GFX100S + GF45mm f/2.8 R WR
 * 4433 中画幅传感器，102MP 像素
 * 
 * 【关于 sukima-ml 社团】
 * sukima-ml = Sukima Moonlight（隙间月影）
 * 这是一个专做世界名画的东方角色同人社团，制品形式为艺术微喷（Giclée）。
 * 我们将经典名画与东方 Project 角色融合，以高品质艺术微喷的形式呈现。
 * 
 * 【关于 Phantasm 的命名与哲学】
 * PH - 既是 Photography 的缩写，也是妖妖梦（Perfect Cherry Blossom）的
 * 最终关卡「幻象阶段」（Phantasm Stage）的致敬。
 * 
 * 我们用几十或几百分之一秒的快门，捕捉到一些幻影，
 * 将其存储为 SD 卡中的数字尘埃。
 * 但这些尘埃却能唤起我们的幻想——
 * 这便是我对 Phantasm 的理解：
 * 现实与幻想的境界（The boundary between reality and illusion）。
 * 
 * 【URL 路由】
 * /phantasm - 主页面（规范 URL）
 * /ph - 重定向至 /phantasm
 * /photograph - 重定向至 /phantasm
 * 
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import styles from './index.module.css';

// Placeholder photo data - replace with your actual GFX100S shots
const photos = [
    {
        id: 'ph-1',
        title: '即将上线',
        subtitle: 'Coming Soon',
        description: '富士GFX100S 中画幅摄影作品即将在此展出',
        camera: 'Fujifilm GFX100S',
        lens: 'GF 45mm f/2.8',
        settings: 'f/5.6 · 1/250s · ISO 100',
        imagePath: '/img/placeholder-photo.jpg',
        date: '2026-01-17',
    },
];

// Photo Counter Component (similar to ASCII Counter)
function PhotoCounter({ total }: { total: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < total) {
            const timer = setTimeout(() => setCount(count + 1), 100);
            return () => clearTimeout(timer);
        }
    }, [count, total]);

    const numberString = count.toString().padStart(4, '0');

    return (
        <div className={styles.counterContainer}>
            <div className={styles.counterValue}>
                {numberString.split('').map((digit, i) => (
                    <span key={i} className={styles.counterDigit}>{digit}</span>
                ))}
            </div>
            <div className={styles.counterLabel}>TOTAL PHOTOGRAPHS</div>
        </div>
    );
}

// Unified Gallery Frame (matching MagicGallery style)
const GalleryFrame = ({ src, label, aspectRatio = "3/4" }: { src: string, label?: string, aspectRatio?: string }) => (
    <div className={clsx(
        "relative w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.01] shadow-2xl bg-[#1a1a1a] p-[2.5%]"
    )}
        style={{ aspectRatio }}
    >
        {/* Label Tag */}
        {label && (
            <div className="absolute -top-[5%] left-1/2 -translate-x-1/2 text-white text-xs font-serif uppercase tracking-widest px-4 py-1 shadow-sm bg-[#b71c1c]/90 z-20">
                {label}
            </div>
        )}

        {/* Matting */}
        <div className="relative w-full h-full bg-[#fdfbf7] p-[10%] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.15)]" />
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-white overflow-hidden">
                <img
                    src={src}
                    alt="Photograph"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Show placeholder on error
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
                <rect fill="#f5f5f5" width="400" height="500"/>
                <text x="200" y="250" text-anchor="middle" fill="#999" font-family="serif" font-size="16">Coming Soon</text>
              </svg>
            `);
                    }}
                />
            </div>
        </div>
    </div>
);

// Navigation items for the bottom modules
const navigationItems = [
    {
        title: 'GALLERY',
        link: '/gallery',
        description: '东方Project × 名画同人作品集',
    },
    {
        title: 'GICLEE',
        link: '/giclee',
        description: '了解艺术微喷的"再现"魔法',
    },
    {
        title: 'ABOUT',
        link: '/about',
        description: '关于隙间月影社团',
    },
    {
        title: 'BLOG',
        link: '/blog',
        description: '社团动态与创作手记',
    },
];

function ModuleBlock({ title, description, link, index }) {
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    return (
        <Link to={link} className={styles.moduleBlock}>
            <div className={styles.moduleNumber}>{formattedIndex}</div>
            <h3 className={styles.moduleTitle}>{title}</h3>
            <div className={styles.moduleDesc}>{description}</div>
            <div className={styles.arrowIcon}>→</div>
        </Link>
    );
}

export default function Phantasm() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const currentPhoto = photos[currentIndex];

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <Layout
            title="Phantasm | 幻象阶段"
            description="GFX100S 中画幅摄影作品集 - Photography Gallery by Sukima Moonlight"
        >
            <main className={styles.mainContainer}>

                {/* 1. Hero Section: Split Screen (matching homepage) */}
                <div className={styles.heroSection}>
                    <div className={styles.heroLeft}>
                        {/* Logo/Title area */}
                        <div className={styles.heroLogoWrapper} style={{ cursor: 'default' }}>
                            <div style={{
                                fontFamily: '"Times New Roman", serif',
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                letterSpacing: '0.2em',
                                fontWeight: 300,
                                color: 'inherit',
                                marginBottom: '1rem'
                            }}>
                                PHANTASM
                            </div>
                            <div className={styles.heroLogoCaption}>
                                幻象阶段 · 中画幅摄影
                            </div>
                        </div>

                        <div className={styles.heroSubtitle}>
                            Where Classic Art Meets Photography<br />
                            Captured with Fujifilm GFX100S · 44×33mm
                        </div>
                    </div>

                    <div className={styles.heroRight}>
                        <div className={styles.asciiContainer}>
                            <div className={styles.asciiDemo}>
                                <div className={styles.asciiText} style={{ fontSize: '1.2rem' }}>
                                    "The boundary between reality and illusion..."
                                </div>
                                <div className={styles.currentCharInfo}>
                                    102MP · 4433 SENSOR · MEDIUM FORMAT
                                </div>
                                <PhotoCounter total={photos.length} />
                                <div className={styles.asciiComplete}>
                                    <div className={styles.messageContent}>
                                        <div className={styles.completeMessage}>
                                            Perfect Cherry Blossom · Extra Stage
                                            <br />
                                            <span style={{ fontSize: '0.8rem', color: '#999' }}>(妖々夢 · 幻象阶段)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Gallery Section: Photo Display */}
                <div className={styles.gallerySection}>
                    <div className="relative w-full h-[80vh] bg-[#fafafa] dark:bg-[#222] overflow-hidden flex items-center justify-center">

                        {/* Background texture */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-multiply"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
                        />

                        {/* Photo Frame - centered */}
                        <div className="relative w-[90vw] md:w-[50vw] max-w-[600px]">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentPhoto.id}
                                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <GalleryFrame
                                        src={currentPhoto.imagePath}
                                        label="PHOTOGRAPHY"
                                        aspectRatio="3/4"
                                    />

                                    {/* Photo Info - Below the frame */}
                                    <div className="mt-6 text-center">
                                        <h3 style={{
                                            fontFamily: '"Times New Roman", "Songti SC", serif',
                                            fontSize: '1.5rem',
                                            fontWeight: 400,
                                            marginBottom: '0.5rem'
                                        }}>
                                            {currentPhoto.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: '"Courier New", monospace',
                                            fontSize: '0.85rem',
                                            color: '#666'
                                        }}>
                                            {currentPhoto.settings}
                                        </p>
                                        <p style={{
                                            fontFamily: '"Songti SC", serif',
                                            fontSize: '0.9rem',
                                            color: '#888',
                                            marginTop: '0.5rem'
                                        }}>
                                            {currentPhoto.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation arrows */}
                            {photos.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 border border-black/10 hover:bg-black/5 transition-colors"
                                        style={{ background: 'rgba(255,255,255,0.9)' }}
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 border border-black/10 hover:bg-black/5 transition-colors"
                                        style={{ background: 'rgba(255,255,255,0.9)' }}
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Navigation Modules: Grid (matching homepage) */}
                <div className={styles.modulesSection}>
                    {navigationItems.map((item, index) => (
                        <ModuleBlock
                            key={item.title}
                            index={index}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </div>

                {/* 4. Footer (matching homepage) */}
                <footer className={styles.homeFooter}>
                    <div className={styles.footerContent}>
                        <p className={styles.footerText}>
                            🌟 隙间月影 Sukima Moonlight - 为东方带来更有文化底蕴的制品
                        </p>
                        <div className={styles.socialLinks}>
                            <Link to="https://fcsu.dev">Leader's Site</Link>
                            <Link to="https://github.com/FinnClair-Su">GitHub</Link>
                            <Link to="/about">About</Link>
                        </div>
                    </div>
                </footer>

            </main>
        </Layout>
    );
}
