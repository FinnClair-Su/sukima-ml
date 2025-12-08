import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import MagicGalleryComponent from '../components/MagicGallery';


import styles from './index.module.css';



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
          </div>

          <div className={styles.heroRight}>
            <div className={styles.asciiContainer}>
              <ASCIIDemo />
            </div>
          </div>
        </div>

        {/* 2. Gallery Section: Full Width */}
        <div className={styles.gallerySection}>
          <div className={styles.galleryContainer}>
            {/* Replaced old carousel with MagicGallery */}
            <MagicGalleryComponent className="h-[80vh]" />
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
