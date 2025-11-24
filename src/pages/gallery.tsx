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
    title: '戴珍珠耳环的17岁少女',
    subtitle: 'YUKARI YAKUMO',
    imagePath: '/img/artworks/yukari_v0.5.jpg',
    link: '/artwork-001',
    // badge: 'DRAFT', // Removed as it is now official
  },
  {
    id: '002',
    title: 'The Bookworm × Pachouli',
    subtitle: 'Visual Mockup',
    imagePath: '/img/artworks/new.jpg',
    link: '/artwork-002',
    badge: 'MOCKUP',
  },
  // 可以在这里添加更多作品
];

export default function Gallery() {
  return (
    <Layout
      title="作品集"
      description="隙间月影社团的名画同人作品展示"
    >
      <main className={styles.galleryContainer}>
        <header className={styles.header}>
          <h1>Gallery</h1>
          <p className={styles.subtitle}>Masterpiece Reimagined in Gensokyo</p>
        </header>

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

        <div className={styles.galleryFooter}>
          <p className={styles.footerTextCn}>更多作品正在跨越幻想与现实的界线</p>
          <p className={styles.footerTextEn}>More masterpieces are crossing the boundary between fantasy and reality.</p>
        </div>
      </main>
    </Layout>
  );
}
