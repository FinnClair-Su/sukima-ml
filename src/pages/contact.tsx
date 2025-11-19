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
      <div className={styles.pageContainer}>
        <main className={styles.mainGrid}>

          {/* Left Column: Contact Info (Visual) */}
          <div className={styles.visualColumn}>
            <div className={styles.infoContent}>
              <h1 className={styles.mainTitle}>
                Contact & Connect<br />
                <span className={styles.subTitleCn}>创意交流与联系</span>
              </h1>

              <div className={styles.dividerShort}></div>

              <div className={styles.descriptionBlock}>
                <h3>Official Channels</h3>
                <ul className={styles.plainList}>
                  <li>
                    <strong>QQ Group</strong>:
                    <button
                      className={styles.linkButton}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Click to Join / 点击加入
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
                    <strong>Pixiv</strong>: Coming Soon
                  </li>
                </ul>
              </div>

              <div className={styles.quoteBlock}>
                <p>
                  "We are always looking for new ideas and collaborations.
                  Whether you are an artist, a developer, or just a fan of Touhou Project,
                  we'd love to hear from you."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Community Feedback (Interactive) */}
          <div className={styles.infoColumn}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>
                Community Feedback<br />
                <span className={styles.sectionSubtitleCn}>创意投稿区</span>
              </h2>

              <p className={styles.descriptionText}>
                欢迎在下方评论区分享你的创意想法、作品建议或任何有趣的点子！
              </p>

              <div className={styles.tipsBlock}>
                <p className={styles.tipText}>
                  💡 提示：支持 Markdown 格式，可以使用图床链接插入图片
                </p>
                <p className={styles.imageHostTip}>
                  📷 推荐图床：<a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">imgbb.com</a> (免费无需注册)
                </p>
              </div>

              <div className={styles.commentsSection}>
                <GiscusComments />
              </div>
            </div>
          </div>

        </main>
      </div>

      <QRCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/img/groupQRcode.JPG"
        title="扫码加入QQ群"
      />
    </Layout>
  );
}
