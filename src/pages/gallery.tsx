import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './gallery.module.css';

interface ArtworkCard {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  link: string;
  badge?: string;
}

const artworks: ArtworkCard[] = [
  {
    id: '001',
    title: '《戴珍珠耳环的17岁少女》',
    subtitle: '八云紫同人 · 草稿版',
    imagePath: '/img/artworks/001.jpg',
    link: '/artwork-001',
    badge: '草稿作品',
  },
  // 可以在这里添加更多作品
];

export default function Gallery() {
  return (
    <Layout
      title="作品集"
      description="隙间月影社团的名画同人作品展示"
    >
      <div className={styles.galleryContainer}>
        <div className={styles.header}>
          <h1>作品集</h1>
          <p className={styles.subtitle}>名画同人创作展示</p>
        </div>

        <div className={styles.artworkGrid}>
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              to={artwork.link}
              className={styles.artworkCard}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={artwork.imagePath}
                  alt={artwork.title}
                  className={styles.artworkImage}
                />
                {artwork.badge && (
                  <span className={styles.badge}>{artwork.badge}</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{artwork.title}</h3>
                <p className={styles.cardSubtitle}>{artwork.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {artworks.length === 0 && (
          <div className={styles.emptyState}>
            <p>暂无作品展示，敬请期待...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
