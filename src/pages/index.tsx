import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import GalleryCarousel, { type ArtworkItem } from '../components/GalleryCarousel';


import styles from './index.module.css';

// 占位数据：作品展示
const placeholderArtworks: ArtworkItem[] = [
  {
    id: 'artwork-1',
    title: '戴珍珠耳环的少女 × 戴珍珠耳环的17岁少女',
    description: '经典名画与东方角色的完美融合',
    originalPainting: '戴珍珠耳环的少女',
    touhouCharacter: '戴珍珠耳环的17岁少女(draft)',
    originalImagePath: '/img/artworks/戴珍珠耳环的少女to戴猫眼石耳环的紫妈.jpg',
    imagePath: '/img/artworks/yukari_v0.5.jpg',
    imageAlt: '戴珍珠耳环的少女 × 戴珍珠耳环的17岁少女',
  },
  {
    id: 'artwork-3',
    title: 'The Bookworm × The Pachouli',
    description: '书虫与知识的魔女',
    originalPainting: 'The Bookworm',
    touhouCharacter: 'The Forbidden Knowledge',
    originalImagePath: '/img/artworks/The Bookworm to The Pachouli-sama.jpg',
    imagePath: '/img/artworks/Variant_B.jpg',
    imageAlt: 'The Bookworm × The Forbidden Knowledge',
    link: '/artwork-002',
    // badge: 'Visual Mockup',
  },
  {
    id: 'artwork-4',
    title: 'Las Meninas × 蓬莱宫娥',
    description: '宫廷画作的幻想乡演绎',
    originalPainting: 'Las Meninas',
    touhouCharacter: '蓬莱宫娥',
    originalImagePath: '/img/artworks/宫娥to辉夜&永远亭：我不是嫦娥.jpg',
    imagePath: '/img/artworks/artwork-003.jpg',
    imageAlt: '蓬莱宫娥',
    link: '/artwork-003',
  },
  {
    id: 'artwork-2',
    title: '神奈川冲浪里 × baka的完美冻结',
    description: '浮世绘与幻想乡的碰撞',
    originalPainting: '神奈川冲浪里',
    touhouCharacter: 'baka的完美冻结',
    originalImagePath: '/img/artworks/神奈川冲浪里to baka的完美冻结.jpg',
    imagePath: '/img/artworks/placeholder-in-progress.svg',
    imageAlt: '神奈川冲浪里 × baka的完美冻结',
  },
];

// 占位数据：导航按钮
interface NavigationItem {
  title: string;
  description: string;
  link: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'GALLERY',
    link: '/gallery',
    description: 'Browse our collection of Touhou Project × Classic Art mashups.',
  },
  {
    title: 'ABOUT',
    link: '/about',
    description: 'Learn about the Sukima Moonlight circle and our philosophy.',
  },
  {
    title: 'BLOG',
    link: '/blog',
    description: 'Read about our creative process, updates, and thoughts.',
  },
  {
    title: 'CONTACT',
    link: '/contact',
    description: 'Get in touch for collaborations, inquiries, or just to say hi.',
  },
];

// ASCII码动态展示组件
function ASCIIDemo() {
  const text = "Endlessly 17 year old~";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cumulativeSum, setCumulativeSum] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentCharASCII, setCurrentCharASCII] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        const charCode = text.charCodeAt(currentIndex);
        setCurrentCharASCII(charCode);
        setCumulativeSum(prev => prev + charCode);
        setCurrentIndex(prev => prev + 1);
      }, 500); // 0.5s per char
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      // Stay for 3s then restart
      const restartTimer = setTimeout(() => {
        handleRestart();
      }, 5000);
      return () => clearTimeout(restartTimer);
    }
  }, [currentIndex, text.length, isComplete]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setCumulativeSum(0);
    setIsComplete(false);
    setCurrentCharASCII(0);
  };

  const numberString = cumulativeSum.toString().padStart(4, '0');

  return (
    <div className={styles.asciiDemo}>
      <div className={styles.asciiText}>
        <span className={styles.quote}>"</span>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={clsx(
              styles.asciiChar,
              index < currentIndex && styles.revealed,
              index === currentIndex - 1 && styles.current
            )}
          >
            {char}
          </span>
        ))}
        <span className={styles.quote}>"</span>
      </div>

      {/* Info Display */}
      <div className={styles.currentCharInfo}>
        {currentIndex === 0 ? (
          "./start.sh"
        ) : currentIndex <= text.length ? (
          `'${text[currentIndex - 1]}' → ASCII ${currentCharASCII}`
        ) : (
          "./done"
        )}
      </div>

      {/* Simple Font Based Counter */}
      <div className={styles.counterContainer}>
        <div className={styles.counterValue}>
          {numberString.split('').map((digit, i) => (
            <span key={i} className={styles.counterDigit}>{digit}</span>
          ))}
        </div>
        <div className={styles.counterLabel}>CUMULATIVE ASCII SUM</div>
      </div>

      <div className={styles.asciiComplete}>
        {/* Actual content */}
        <div className={styles.messageContent}>
          {!isComplete ? (
            <div className={styles.interimMessage}>
              <span className={styles.blinkingCursor}>_</span> Calculating age...
            </div>
          ) : (
            <div className={styles.completeMessage}>
              据考究，紫的真实年龄不小于 <span style={{ textDecoration: 'underline' }}>{cumulativeSum}</span> 岁
              <br />
              <span style={{ fontSize: '0.8rem', color: '#999' }}>(数据来源: ASCII Sum Check)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 模块介绍砖块组件
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

// 主页组件
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Science of Learning and Cognition；The Art of LLM and Tech Tools">

      <main className={styles.mainContainer}>

        {/* 1. Hero Section: Split Screen */}
        <div className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <Link to="/giclee" className={styles.heroLogoWrapper}>
              <img
                src="/img/sukima-ml.svg"
                alt="Gap of the Moon"
                className={styles.heroLogo}
              />
              <div className={styles.heroLogoCaption}>
                我们选择的工艺——艺术微喷
              </div>
            </Link>
            <div className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.asciiContainer}>
              <ASCIIDemo />
            </div>
          </div>
        </div>

        {/* 2. Gallery Section: Full Width */}
        <div className={styles.gallerySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Exhibitions</h2>
            <div className={styles.sectionSubtitle}>Touhou Project × Classic Art</div>
          </div>
          <div className={styles.galleryContainer}>
            <GalleryCarousel artworks={placeholderArtworks} />
          </div>
        </div>

        {/* 3. Navigation Modules: Grid */}
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
