import React, { useState } from 'react';
import Layout from '@theme/Layout';
import QRCodeModal from '../components/QRCodeModal';
import styles from './artwork-001.module.css';

export default function Artwork001() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout
      title="《戴珍珠耳环的17岁少女》- 八云紫同人"
      description="原创艺术作品 - 《戴珍珠耳环的17岁少女》草稿版"
    >
      <div className={styles.container}>
        <div className={styles.productWrapper}>
          {/* 左侧图片区域 */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img 
                src="/img/artworks/001.jpg" 
                alt="戴珍珠耳环的17岁少女"
                className={styles.productImage}
              />
            </div>
          </div>

          {/* 右侧信息区域 */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>《戴珍珠耳环的17岁少女》</h1>
            
            <div className={styles.subtitle}>
              八云紫同人 · 草稿版
            </div>

            <div className={styles.priceSection}>
              <span className={styles.priceLabel}>价格：</span>
              <span className={styles.price}>30.5×40.6cm，约62元</span>
            </div>

            <div className={styles.statusBadge}>
              <span className={styles.badge}>草稿作品</span>
            </div>

            <div className={styles.description}>
              <h3>作品介绍</h3>
              <p>
                《戴珍珠耳环的少女》是荷兰黄金时代画家约翰内斯·维米尔于1665年创作的油画杰作。
                这幅画以其神秘的魅力和精湛的光影处理而闻名于世，被誉为"北方的蒙娜丽莎"。
                画中少女回眸的瞬间、珍珠耳环的光泽、以及那充满灵性的眼神，
                展现了维米尔对光线和色彩的卓越掌控。本作品是对这一经典名作的致敬与再创作，
                部分画面完全没做修改，但是将头巾改为了金发与荷叶帽，深黄色的衣服改为了八云紫的贤者长裙与卦袍。后续还会对瞳色与服饰细节进行修改，敬请期待。
              </p>
            </div>

            <button 
              className={styles.buyButton}
              onClick={() => setShowModal(true)}
            >
              立即购买
            </button>

            <div className={styles.notice}>
              <p>* 此为草稿版本，最终作品可能会有所调整</p>
              <p>* 点击购买按钮联系卖家咨询详情</p>
            </div>
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      <QRCodeModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        imageSrc="/img/groupQRcode.JPG"
        title="扫码加入QQ群咨询购买"
      />
    </Layout>
  );
}
