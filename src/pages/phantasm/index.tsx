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

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useExif, formatExifSettings } from '../../hooks/useExif';
import styles from '../index.module.css';

// 词典释义数据
const definitions = [
    {
        term: <Translate id="phantasm.term.phantom">幻象</Translate>,
        subtitle: <Translate id="phantasm.subtitle.physical">物理层面 / Physical Level</Translate>,
        explanation: <Translate id="phantasm.explanation.phantom">数码照片自存储介质中，经由算法排列，在屏幕上伪装成物质世界的全息投影。</Translate>,
    },
    {
        term: <Translate id="phantasm.term.ghost">幽灵</Translate>,
        subtitle: <Translate id="phantasm.subtitle.depictive">描绘层面 / Depictive Level</Translate>,
        explanation: <Translate id="phantasm.explanation.ghost">照片是逝去的时刻被快门剥离，在静态边框中徘徊不去的“此曾在”。</Translate>,
    },
    {
        term: <Translate id="phantasm.term.mental">心像</Translate>,
        subtitle: <Translate id="phantasm.subtitle.mental">心理层面 / Mental Level</Translate>,
        explanation: <Translate id="phantasm.explanation.mental">超越物理层面的单薄，它在意识深处搭建起一座比现实更坚固的记忆宫殿。</Translate>,
    },
];



// 词典式释义组件 - 修复同步问题
function PhantasmDictionary() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % definitions.length);
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const currentDef = definitions[currentIndex];

    return (
        <div className={styles.heroLogoWrapper} style={{ cursor: 'default' }}>
            {/* 标题 */}
            <div style={{
                fontFamily: '"Times New Roman", serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '0.15em',
                fontWeight: 300,
                marginBottom: '1.5rem',
            }}>
                phantasm
            </div>

            {/* 音标 */}
            <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '1rem',
            }}>
                /ˈfæn.tæz.əm/
            </div>

            {/* 释义列表 - 点击可切换 */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {definitions.map((def, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            // 重置定时器
                            if (intervalRef.current) clearInterval(intervalRef.current);
                            intervalRef.current = setInterval(() => {
                                setCurrentIndex((prev) => (prev + 1) % definitions.length);
                            }, 5000);
                        }}
                        style={{
                            fontFamily: '"Songti SC", serif',
                            fontSize: '1rem',
                            color: index === currentIndex ? '#b71c1c' : '#666',
                            fontWeight: index === currentIndex ? 600 : 400,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            borderBottom: index === currentIndex ? '2px solid #b71c1c' : '2px solid transparent',
                            paddingBottom: '4px',
                        }}
                    >
                        {`${index + 1}. `}{def.term}
                    </span>
                ))}
            </div>

            {/* 当前释义的详细解释 - 使用同步的 currentDef */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        textAlign: 'center',
                        maxWidth: '500px',
                    }}
                >
                    <div style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '0.85rem',
                        color: '#b71c1c',
                        marginBottom: '0.75rem',
                        letterSpacing: '0.05em',
                    }}>
                        {currentDef.subtitle}
                    </div>
                    <div
                        className={styles.heroSubtitle}
                        style={{
                            fontFamily: '"Songti SC", serif',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            textAlign: 'center',
                        }}
                    >
                        {currentDef.explanation}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 进度指示器 */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1.5rem',
                justifyContent: 'center',
            }}>
                {definitions.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: index === currentIndex ? '#b71c1c' : '#ddd',
                            transition: 'background 0.3s ease',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


// Why Medium Format Modal 组件
function WhyMediumFormatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.7)',
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                    background: '#fff',
                    maxWidth: '600px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    padding: '2.5rem',
                    position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#999',
                    }}
                >
                    ×
                </button>

                <h2 style={{
                    fontFamily: '"Times New Roman", serif',
                    fontSize: '1.8rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid #b71c1c',
                    paddingBottom: '0.5rem',
                }}>
                    Why Medium Format?
                </h2>

                {/* 画幅比较 SVG - 所有画幅左下角对齐 */}
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <svg viewBox="0 0 450 300" style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
                        {/* 基准点：左下角 (50, 250) */}

                        {/* M43: 17.3×13mm - 比例约为 8.65:6.5 -> 使用 87:65 */}
                        <rect x="50" y="185" width="87" height="65" fill="none" stroke="#ccc" strokeWidth="1.5" />
                        <text x="93" y="265" textAnchor="middle" fontSize="10" fill="#999">
                            M43 17×13mm
                        </text>

                        {/* APS-C: 23.6×15.6mm - 比例约为 11.8:7.8 -> 使用 118:78 */}
                        <rect x="50" y="172" width="118" height="78" fill="none" stroke="#888" strokeWidth="2" />
                        <text x="109" y="265" textAnchor="middle" fontSize="11" fill="#777">
                            APS-C 24×16mm
                        </text>

                        {/* 全画幅: 36×24mm - 比例 3:2 -> 使用 180:120 */}
                        <rect x="50" y="130" width="180" height="120" fill="none" stroke="#444" strokeWidth="2" />
                        <text x="140" y="265" textAnchor="middle" fontSize="12" fill="#555">
                            <Translate id="modal.fullFrame">全画幅 36×24mm</Translate>
                        </text>

                        {/* 中画幅 GFX100S: 44×33mm - 比例 4:3 -> 使用 220:165 */}
                        <rect x="50" y="85" width="220" height="165" fill="none" stroke="#b71c1c" strokeWidth="3" />
                        <text x="160" y="75" textAnchor="middle" fontSize="14" fill="#b71c1c" fontWeight="600">
                            <Translate id="modal.mediumFormat">中画幅 44×33mm</Translate>
                        </text>

                        {/* 面积标注 */}
                        <g>
                            <line x1="300" y1="250" x2="300" y2="85" stroke="#b71c1c" strokeWidth="1" strokeDasharray="3,3" />
                            <text x="320" y="165" fontSize="16" fill="#b71c1c" fontWeight="600">
                                1.7×
                            </text>
                            <text x="320" y="182" fontSize="10" fill="#666">
                                <Translate id="modal.vsFullFrame">vs 全画幅</Translate>
                            </text>
                        </g>
                    </svg>
                </div>

                <div style={{
                    fontFamily: '"Songti SC", serif',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#333',
                }}>
                    <h3 style={{ fontWeight: 500, marginBottom: '0.5rem', color: '#b71c1c' }}>
                        <Translate id="modal.aspectRatio.title">4:3 画幅比例</Translate>
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        <Translate id="modal.aspectRatio.text">
                            相比全画幅的 3:2，中画幅 4:3 的画幅比例可以框选更多的天空或大地。
                        </Translate>
                    </p>

                    <h3 style={{ fontWeight: 500, marginBottom: '0.5rem', color: '#b71c1c' }}>
                        <Translate id="modal.focalLength.title">等效 36mm 焦段</Translate>
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        <Translate id="modal.focalLength.text">
                            GF45mm f/2.8 在中画幅上等效约 36mm 全画幅焦距，提供了近似人眼的温和视角。
                            既不夸张也不局促，是记录真实世界的理想选择。
                        </Translate>
                    </p>

                    <h3 style={{ fontWeight: 500, marginBottom: '0.5rem', color: '#b71c1c' }}>Ultimate Truth</h3>
                    <p>
                        <Translate id="modal.ultimateTruth.text">
                            1.02 亿像素与中画幅传感器的优秀动态范围、色彩深度一起，
                            记录下终极的真实——不仅是画面中可见的细节，更是现实与记忆之间的情感联结。
                            但照片总归是假的吧，现实与幻想的界线何在，这是个问题。
                        </Translate>
                    </p>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: '2rem',
                        width: '100%',
                        padding: '0.75rem',
                        background: '#b71c1c',
                        color: '#fff',
                        border: 'none',
                        fontFamily: '"Courier New", monospace',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                    }}
                >
                    GOT IT
                </button>
            </motion.div>
        </div>
    );
}

// Navigation items
const navigationItems = [
    {
        title: 'Sukima-ML',
        link: '/sukima-ml',
        description: <Translate id="module.gallery.desc">东方Project × 名画同人作品集</Translate>
    },
    {
        title: 'GICLEE',
        link: '/giclee',
        description: <Translate id="module.giclee.desc">了解艺术微喷的"再现"魔法</Translate>
    },
    {
        title: 'ABOUT',
        link: '/about',
        description: <Translate id="module.about.desc">关于隙间月影社团</Translate>
    },
    {
        title: 'BLOG',
        link: '/blog',
        description: <Translate id="module.blog.desc">社团动态与创作手记</Translate>
    },
];

function ModuleBlock({ title, description, link, index }: {
    title: string;
    description: React.ReactNode;
    link: string;
    index: number;
}) {
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

// Series Data
const seriesList = [
    {
        id: 'chaoyang2',
        link: '/phantasm/chaoyang2',
        coverImage: '/photography/chaoyang2/DSCF0139.webp',
        titleId: 'gallery.series.chaoyang2.title',
        defaultTitle: '朝阳²',
        descId: 'gallery.series.chaoyang2.desc',
        defaultDesc: '从北京朝阳到辽宁朝阳市 · 3 张照片',
    },
    {
        id: 'flyingSeimei',
        link: '/phantasm/flying-seimei',
        coverImage: '/photography/flying-seimei/DSCF0232.webp',
        titleId: 'gallery.series.flyingSeimei.title',
        defaultTitle: '飞翔晴明',
        descId: 'gallery.series.flyingSeimei.desc',
        defaultDesc: '玻璃不仅是介质，更是光线新的原点',
    }
];

export default function Phantasm() {
    const [showModal, setShowModal] = useState(false);
    const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);

    const handlePrevSeries = () => {
        setCurrentSeriesIndex((prev) => (prev - 1 + seriesList.length) % seriesList.length);
    };

    const handleNextSeries = () => {
        setCurrentSeriesIndex((prev) => (prev + 1) % seriesList.length);
    };

    const currentSeries = seriesList[currentSeriesIndex];

    return (
        <Layout
            title={translate({ id: 'phantasm.title', message: 'Phantasm | 幻象阶段' })}
            description="GFX100S 中画幅摄影作品集 - Photography Gallery by Sukima Moonlight"
        >
            <Head>
                <meta name="keywords" content="photography, GFX100S, medium format, fine art photography, phantasm" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ImageGallery",
                        "name": "Phantasm Photography Gallery",
                        "description": "Medium format photography collection exploring the boundary between reality and illusion.",
                        "author": {
                            "@type": "Person",
                            "name": "Fischer Su"
                        },
                        "camera": "Fujifilm GFX100S"
                    })}
                </script>
            </Head>
            <main className={styles.mainContainer}>

                {/* 1. Hero Section: 词典 + 设备介绍 */}
                <div className={styles.heroSection}>
                    <div className={styles.heroLeft}>
                        <PhantasmDictionary />
                    </div>

                    <div className={styles.heroRight}>
                        <div className={styles.asciiContainer}>
                            <div className={styles.asciiDemo}>
                                <div style={{
                                    fontFamily: '"Courier New", monospace',
                                    fontSize: '0.75rem',
                                    color: '#999',
                                    letterSpacing: '0.2em',
                                    marginBottom: '1rem',
                                }}>
                                    MY GEAR
                                </div>

                                <div style={{
                                    fontFamily: '"Times New Roman", serif',
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                    fontWeight: 400,
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                }}>
                                    <span>GFX100S</span>
                                    <span style={{ color: '#b71c1c', fontWeight: 300 }}>|</span>
                                    <span>GF45mm f/2.8</span>
                                </div>

                                <div className={styles.currentCharInfo}>
                                    102MP · 44×33mm · MEDIUM FORMAT
                                </div>

                                <div className={styles.counterContainer}>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #b71c1c',
                                            color: '#b71c1c',
                                            padding: '0.75rem 1.5rem',
                                            fontFamily: '"Courier New", monospace',
                                            fontSize: '0.85rem',
                                            letterSpacing: '0.1em',
                                            cursor: 'pointer',
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
                                        Why Medium Format?
                                    </button>
                                </div>

                                <div className={styles.asciiComplete}>
                                    <div className={styles.messageContent}>
                                        <div style={{
                                            fontFamily: '"Songti SC", serif',
                                            fontSize: '0.9rem',
                                            color: '#666',
                                            fontStyle: 'italic',
                                        }}>
                                            "The boundary between reality and illusion..."
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Gallery Section - 系列展示卡片 */}
                <div className={styles.gallerySection} style={{ padding: '4rem 2rem' }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}>
                        <h2 style={{
                            fontFamily: '"Times New Roman", serif',
                            fontSize: '2rem',
                            fontWeight: 300,
                            marginBottom: '3rem',
                            letterSpacing: '0.1em',
                        }}>
                            FEATURED SERIES
                        </h2>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            position: 'relative'
                        }}>
                            {/* Left Button */}
                            <button
                                onClick={handlePrevSeries}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #e0e0e0',
                                    color: '#666',
                                    width: '40px',
                                    height: '200px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    zIndex: 10
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#f5f5f5';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#666';
                                }}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Series Card */}
                            <div style={{ flex: 1, maxWidth: '800px', overflow: 'hidden' }}>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={currentSeries.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            to={currentSeries.link}
                                            style={{
                                                display: 'block',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                                border: '1px solid #e0e0e0',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <div style={{
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}>
                                                <img
                                                    src={useBaseUrl(currentSeries.coverImage)}
                                                    alt={currentSeries.defaultTitle}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        aspectRatio: '4/3',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                        transition: 'transform 0.6s ease',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.05)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }}
                                                />
                                                {/* 覆盖层 */}
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    padding: '2rem',
                                                }}>
                                                    <div style={{ color: '#fff' }}>
                                                        <h3 style={{
                                                            fontFamily: '"Times New Roman", serif',
                                                            fontSize: '2.5rem',
                                                            fontWeight: 300,
                                                            margin: 0,
                                                            marginBottom: '0.5rem',
                                                        }}>
                                                            <Translate id={currentSeries.titleId}>{currentSeries.defaultTitle}</Translate>
                                                        </h3>
                                                        <p style={{
                                                            fontFamily: '"Songti SC", serif',
                                                            fontSize: '1rem',
                                                            margin: 0,
                                                            opacity: 0.9,
                                                        }}>
                                                            <Translate id={currentSeries.descId}>{currentSeries.defaultDesc}</Translate>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{
                                                padding: '1.5rem',
                                                background: '#fafafa',
                                                borderTop: '1px solid #e0e0e0',
                                            }}>
                                                <div style={{
                                                    fontFamily: '"Courier New", monospace',
                                                    fontSize: '0.85rem',
                                                    color: '#b71c1c',
                                                    letterSpacing: '0.15em',
                                                }}>
                                                    <Translate id="gallery.clickToView">CLICK TO VIEW SERIES →</Translate>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right Button */}
                            <button
                                onClick={handleNextSeries}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #e0e0e0',
                                    color: '#666',
                                    width: '40px',
                                    height: '200px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    zIndex: 10
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#f5f5f5';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#666';
                                }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Navigation Modules */}
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

                {/* 4. Footer */}
                <footer className={styles.homeFooter}>
                    <div className={styles.footerContent}>
                        <p className={styles.footerText}>
                            🌟 <Translate id="footer.text">隙间月影 Sukima Moonlight - 为东方带来更有文化底蕴的制品</Translate>
                        </p>
                        <div className={styles.socialLinks}>
                            <Link to="https://fcsu.dev">Leader's Site</Link>
                            <Link to="https://github.com/FinnClair-Su">GitHub</Link>
                            <Link to="/about">About</Link>
                        </div>
                    </div>
                </footer>

                {/* Why Medium Format Modal */}
                <WhyMediumFormatModal isOpen={showModal} onClose={() => setShowModal(false)} />

            </main>
        </Layout>
    );
}

