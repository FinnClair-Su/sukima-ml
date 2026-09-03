import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import StudioContactPanel from './StudioContactPanel';
import StudioPricing from './StudioPricing';
import { formatPrice, getStudioSpace, studioPricing, studioSpaces } from '../data/studioSpaces';
import StudioPicture from './StudioPicture';
import styles from './StudioSpacePage.module.css';

const { equipment, offer } = studioPricing;

export default function StudioSpacePage({ slug }: { slug: string }) {
  const space = getStudioSpace(slug);

  if (!space) {
    throw new Error(`Unknown Studio Phantasm space: ${slug}`);
  }

  const leadIndex = space.images.indexOf(space.cover);
  const galleryImages = space.images
    .map((base, index) => ({ base, index }))
    .filter(({ base }) => base !== space.cover);
  const position = studioSpaces.findIndex((item) => item.slug === space.slug);
  const nextSpace = studioSpaces[(position + 1) % studioSpaces.length];

  return (
    <Layout
      noFooter
      wrapperClassName="phantasmPage"
      title={`${space.name} | Studio Phantasm`}
      description={`${space.name}，${space.area}，开业价 ${formatPrice(space)}，${offer.minimumHours} 小时起租。Studio Phantasm 场地实景与预约规则。`}
    >
      <Head>
        <title>{space.name} — Studio Phantasm</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} to="/ph">
            <img src="/img/studio/phantasm-mark.svg" alt="" width="42" height="47" />
            <span>STUDIO PHANTASM</span>
          </Link>
          <nav className={styles.headerLinks} aria-label="场地页导航">
            <a href="#pricing">价格</a>
            <Link to="/ph/contact">联系预约</Link>
            <Link className={styles.back} to="/ph#spaces">← 全部场地</Link>
          </nav>
        </header>

        <main>
          <section className={styles.intro}>
            <p>{space.index} / SPACE</p>
            <h1>{space.name}</h1>
            <div className={styles.meta}>
              <span>{space.englishName}</span>
              <span>{space.area}</span>
              <span>{String(space.images.length).padStart(2, '0')} IMAGES</span>
              <strong>{formatPrice(space)} · 开业价 · {offer.minimumHours}H 起租</strong>
            </div>
          </section>

          <figure className={styles.lead}>
            <StudioPicture base={space.cover} alt={`${space.name}场地封面`} eager />
            <figcaption>{space.index}.{String(leadIndex + 1).padStart(2, '0')} / LEAD VIEW</figcaption>
          </figure>

          <StudioPricing id="pricing" highlightSlug={space.slug} />

          <div className={styles.gallery}>
            {galleryImages.map(({ base, index }) => (
              <figure key={base}>
                <StudioPicture base={base} alt={`${space.name}场地实景 ${index + 1}`} />
                <figcaption>{space.index}.{String(index + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>

          <section className={styles.equipment} aria-label="全场地共用器材">
            <p>{equipment.label} / 全场地共用</p>
            <p>
              <strong>{equipment.name}</strong>
              <br />
              {equipment.spec} / {equipment.specZh}。{equipment.lines.join('')}
            </p>
            <p className={styles.equipmentPrice}>{equipment.price} {equipment.unit}</p>
          </section>

          <StudioContactPanel id={`${space.slug}-contact`} />
        </main>

        <footer className={styles.footer}>
          <Link to="/ph#spaces">全部场地</Link>
          <Link to={`/ph/${nextSpace.slug}`}>下一个：{nextSpace.name} →</Link>
        </footer>
      </div>
    </Layout>
  );
}
