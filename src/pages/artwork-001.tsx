import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './artwork-001.module.css';

// 定义产品数据
const products = [
  {
    id: '14inch',
    size: '[14寸] 30.5 x 35.6 cm',
    price: 65,
    tag: '油咖喱强推 / 满印无裁',
    description: null,
    isRecommended: true
  },
  {
    id: '16inch',
    size: '[16寸] 30.5 x 40.6 cm',
    price: 72,
    tag: null,
    description: null,
    isRecommended: false
  },
  {
    id: '20inch',
    size: '[20寸] 40.0 x 50.0 cm',
    price: 114,
    tag: null,
    description: null,
    isRecommended: false
  },
  {
    id: 'planA',
    size: '[14寸] 30.5 x 35.6 cm + 35x40cm 专业装裱',
    price: 227,
    tag: '小巧紧凑',
    description: '卡纸宽2.5cm，画面利用率高',
    isRecommended: false
  },
  {
    id: 'planB',
    size: '[16寸] 30.5 x 40.6 cm + 35x40cm 专业装裱',
    price: 240,
    tag: '艺术感强',
    description: '卡纸宽5cm，更有艺术品装裱的感觉',
    isRecommended: false
  },
  {
    id: 'planC',
    size: '[20寸] 40.0 x 50.0 cm + 45x51cm 专业装裱',
    price: 360,
    tag: '富哥优选 / 效果最佳',
    description: '卡纸宽5cm，大画幅视觉张力更强',
    isRecommended: false
  },
];

export default function Artwork001() {
  // 默认选中第一个（14寸推荐款）
  const [selectedItem, setSelectedItem] = useState(products[0]);

  return (
    <Layout
      title="《戴珍珠耳环的八云紫》- 正式版"
      description="八云紫同人艺术微喷 - 硫化钡315g"
    >
      <div className={styles.pageContainer}>
        <main className={styles.mainGrid}>

          {/* 左侧：艺术展示区 */}
          <div className={styles.visualColumn}>
            <div className={styles.frameWrapper}>
              <img
                src="/img/artworks/yukari_v0.5.jpg"
                alt="戴珍珠耳环的八云紫"
                className={styles.artworkImage}
              />
            </div>
            <div className={styles.captionText}>
              Fig 1. The Sage of Gensokyo (Exiled), 2025.
            </div>
          </div>

          {/* 右侧：信息交互区 */}
          <div className={styles.infoColumn}>
            <div className={styles.infoContent}>

              <h1 className={styles.mainTitle}>
                Portrait of the Gap Sage<br />
                <span className={styles.subTitleCn}>戴珍珠耳环的八云紫</span>
              </h1>

              <div className={styles.artistMeta}>
                Official Release · Baryta 315g Giclée
                <br />
                正式版 · 硫化钡艺术微喷
              </div>

              {/* 动态价格显示 */}
              <div className={styles.priceTag}>
                ¥ {selectedItem.price}.00 <span className={styles.priceNote}>(Donation)</span>
              </div>

              <div className={styles.dividerShort}></div>

              {/* 动态按钮文案 */}
              <Link
                to="/buy"
                className={styles.purchaseBtn}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                奉纳信仰 (V我{selectedItem.price}) / OFFER FAITH
              </Link>

              <p className={styles.smallNotice}>* 点击按钮扫码，助紫妈重返幻想乡</p>

              <div className={styles.quoteBlock}>
                <p>
                  “初次见面的外界人，您好！我本是幻想乡的大贤者...
                  为了重返幻想乡，夺回属于我的一切，我需要收集‘信仰’。
                  将我的肖像挂在你的墙上，时刻注视，便是在为我重塑神格。”
                </p>
              </div>

              <div className={styles.descriptionBlock}>
                <h3>材质说明 (Material)</h3>
                <p>
                  载体升级为<strong>【硫化钡 315g (Baryta)】</strong>。
                  哑光、厚重，完美呈现高反差的肖像与隙间之黑。
                  <br />
                  <Link to="/giclee" className={styles.learnMoreLink}>点击了解更多工艺细节 →</Link>
                </p>
              </div>

              {/* 交互式价格表 */}
              <div className={styles.specsContainer}>
                <h3 className={styles.specTitle}>选择供奉规格 (Select Offering)</h3>
                <div className={styles.priceList}>
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className={`
                        ${styles.priceItem} 
                        ${item.isRecommended ? styles.recommendedItem : ''}
                        ${selectedItem.id === item.id ? styles.selected : ''}
                      `}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className={styles.itemMainInfo}>
                        <span className={styles.sizeLabel}>{item.size}</span>
                        <span className={styles.priceValue}>¥ {item.price}</span>
                      </div>

                      {/* 如果有标签或者被选中，显示额外信息 */}
                      {(item.tag || item.description) && (
                        <div className={styles.itemTagRow}>
                          {item.tag && <span className={styles.badge}>{item.tag}</span>}
                          {item.description && <span className={styles.itemDescription}>{item.description}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className={styles.costNote}>
                  * 售价仅含极低的美术资源回收成本。
                  <br />* 全尺寸可选“无边框满印”或“加白边”。
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}