import React, { useState } from 'react';
import Layout from '@theme/Layout';
import QRCodeModal from '../components/QRCodeModal';
import GiscusComments from '../components/GiscusComments';
import styles from './contact.module.css';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout
      title="创意交流"
      description="与隙间月影社团取得联系，分享你的创意">
      <main className={styles.contactContainer}>
        <div className={styles.cardsWrapper}>
          {/* 联系方式卡片 */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>联系方式</h2>
            <ul className={styles.contactList}>
              <li>
                <strong>QQ群</strong>: 
                <button 
                  className={styles.linkButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  点击加入
                </button>
              </li>
              <li>
                <strong>Email</strong>: 
                <a href="mailto:kanade271828@gmail.com">kanade271828@gmail.com</a>
              </li>
              <li>
                <strong>Bilibili</strong>: 
                <a href="https://space.bilibili.com/368984327" target="_blank" rel="noopener noreferrer">
                  space.bilibili.com/368984327
                </a>
              </li>
              <li>
                <strong>Pixiv</strong>: 敬请期待
              </li>
            </ul>
          </div>

          {/* 创意投稿区卡片 */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>创意投稿区</h2>
            <p className={styles.cardDescription}>
              欢迎在下方评论区分享你的创意想法、作品建议或任何有趣的点子！
            </p>
            <p className={styles.tipText}>
              💡 提示：支持 Markdown 格式，可以使用图床链接插入图片
            </p>
            <div className={styles.commentsSection}>
              <GiscusComments />
            </div>
          </div>
        </div>
      </main>

      <QRCodeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/img/groupQRcode.JPG"
        title="扫码加入QQ群"
      />
    </Layout>
  );
}
