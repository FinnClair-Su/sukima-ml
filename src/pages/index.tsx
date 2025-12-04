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
    id: 'artwork-2',
    title: '神奈川冲浪里 × baka的完美冻结',
    description: '浮世绘与幻想乡的碰撞',
    originalPainting: '神奈川冲浪里',
    touhouCharacter: 'baka的完美冻结',
    originalImagePath: '/img/artworks/神奈川冲浪里to baka的完美冻结.jpg',
    imagePath: '/img/artworks/placeholder-in-progress.svg',
    imageAlt: '神奈川冲浪里 × baka的完美冻结',
  },
  {
    id: 'artwork-4',
    title: '宫娥 × 辉夜&永远亭：我不是嫦娥',
    description: '宫廷画作的幻想乡演绎',
    originalPainting: '宫娥',
    touhouCharacter: '辉夜&永远亭：我不是嫦娥',
    originalImagePath: '/img/artworks/宫娥to辉夜&永远亭：我不是嫦娥.jpg',
    imagePath: '/img/artworks/placeholder-in-progress.svg',
    imageAlt: '宫娥 × 辉夜&永远亭：我不是嫦娥',
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
  const [segmentStates, setSegmentStates] = useState([true, true, true, true]); // 控制每个数字段的显示状态

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        const charCode = text.charCodeAt(currentIndex);
        setCurrentCharASCII(charCode);
        setCumulativeSum(prev => prev + charCode);
        setCurrentIndex(prev => prev + 1);
      }, 500); // 每秒2个字符
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);

      // 在2025停留3秒后开始逐段熄灭动画
      setTimeout(() => {
        let segmentIndex = 0;
        const disappearInterval = setInterval(() => {
          setSegmentStates(prev => {
            const newStates = [...prev];
            newStates[segmentIndex] = false;
            return newStates;
          });
          segmentIndex++;

          if (segmentIndex >= 4) {
            clearInterval(disappearInterval);
            // 所有段都熄灭后，重新开始循环
            setTimeout(() => {
              handleRestart();
            }, 500);
          }
        }, 400);
      }, 3000);
    }
  }, [currentIndex, text.length, isComplete]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setCumulativeSum(0);
    setIsComplete(false);
    setCurrentCharASCII(0);
    setSegmentStates([true, true, true, true]);
  };

  // 将数字转换为4位字符串
  const formatNumber = (num) => {
    return num.toString().padStart(4, '0');
  };

  // 七段数码管组件
  const DigitalDisplay = ({ digit, isVisible }) => {
    const segments = {
      '0': [1, 1, 1, 1, 1, 1, 0],
      '1': [0, 1, 1, 0, 0, 0, 0],
      '2': [1, 1, 0, 1, 1, 0, 1],
      '3': [1, 1, 1, 1, 0, 0, 1],
      '4': [0, 1, 1, 0, 0, 1, 1],
      '5': [1, 0, 1, 1, 0, 1, 1],
      '6': [1, 0, 1, 1, 1, 1, 1],
      '7': [1, 1, 1, 0, 0, 0, 0],
      '8': [1, 1, 1, 1, 1, 1, 1],
      '9': [1, 1, 1, 1, 0, 1, 1]
    };

    const digitSegments = segments[digit] || [0, 0, 0, 0, 0, 0, 0];

    return (
      <div className={styles.digitalDigit}>
        <div className={`${styles.segment} ${styles.segmentA} ${digitSegments[0] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentB} ${digitSegments[1] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentC} ${digitSegments[2] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentD} ${digitSegments[3] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentE} ${digitSegments[4] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentF} ${digitSegments[5] && isVisible ? styles.segmentOn : ''}`}></div>
        <div className={`${styles.segment} ${styles.segmentG} ${digitSegments[6] && isVisible ? styles.segmentOn : ''}`}></div>
      </div>
    );
  };

  const numberString = formatNumber(cumulativeSum);

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

      {/* 当前字符ASCII显示 */}
      <div className={styles.currentCharInfo}>
        {currentIndex === 0 ? (
          "./start.sh"
        ) : currentIndex <= text.length ? (
          `'${text[currentIndex - 1]}' → ASCII ${currentCharASCII}`
        ) : (
          "./start.sh"
        )}
      </div>

      {/* 数码管显示 */}
      <div className={styles.digitalContainer}>
        <div className={styles.digitalDisplay}>
          <DigitalDisplay digit={numberString[0]} isVisible={segmentStates[0]} />
          <DigitalDisplay digit={numberString[1]} isVisible={segmentStates[1]} />
          <DigitalDisplay digit={numberString[2]} isVisible={segmentStates[2]} />
          <DigitalDisplay digit={numberString[3]} isVisible={segmentStates[3]} />
        </div>
      </div>

      <div className={styles.asciiComplete}>
        {/* Actual content */}
        <div className={styles.messageContent}>
          {!isComplete ? (
            <div className={styles.interimMessage}>
              Constructing understanding...
            </div>
          ) : (
            <div className={styles.completeMessage}>
              据考究，紫的真实年龄不小于◾️◾️◾️◾️数据删除
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
