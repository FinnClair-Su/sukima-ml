import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import QRCodeModal from '../components/QRCodeModal';
import GiscusComments from '../components/GiscusComments';
import styles from './contact.module.css';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout
      title={translate({ id: 'contact.title', message: '创意交流' })}
      description={translate({ id: 'contact.description', message: '与隙间月影社团取得联系，分享你的创意' })}>
      <div className={styles.pageContainer}>
        <main className={styles.mainGrid}>

          {/* Left Column: Contact Info (Visual) */}
          <div className={styles.visualColumn}>
            <div className={styles.infoContent}>
              <h1 className={styles.mainTitle}>
                <Translate id="contact.header">Contact & Connect</Translate><br />
                <span className={styles.subTitleCn}><Translate id="contact.header.sub">创意交流与联系</Translate></span>
              </h1>

              <div className={styles.dividerShort}></div>

              <div className={styles.descriptionBlock}>
                <h3><Translate id="contact.channels.title">Official Channels</Translate></h3>
                <ul className={styles.plainList}>
                  <li>
                    <strong><Translate id="contact.channels.qq">QQ Group</Translate></strong>:
                    <button
                      className={styles.linkButton}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Translate id="contact.channels.qq.join">Click to Join / 点击加入</Translate>
                    </button>
                  </li>
                  <li>
                    <strong><Translate id="contact.channels.email">Email</Translate></strong>:
                    <a href="mailto:kanade271828@gmail.com">kanade271828@gmail.com</a>
                  </li>
                  <li>
                    <strong><Translate id="contact.channels.bilibili">Bilibili</Translate></strong>:
                    <a href="https://space.bilibili.com/368984327" target="_blank" rel="noopener noreferrer">
                      space.bilibili.com/368984327
                    </a>
                  </li>
                  <li>
                    <strong><Translate id="contact.channels.pixiv">Pixiv</Translate></strong>: <Translate id="contact.channels.pixiv.coming">Coming Soon</Translate>
                  </li>
                </ul>
              </div>

              <div className={styles.quoteBlock}>
                <p>
                  <Translate id="contact.quote">
                    "We are always looking for new ideas and collaborations.
                    Whether you are an artist, a developer, or just a fan of Touhou Project,
                    we'd love to hear from you."
                  </Translate>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Community Feedback (Interactive) */}
          <div className={styles.infoColumn}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>
                <Translate id="contact.feedback.title">Community Feedback</Translate><br />
                <span className={styles.sectionSubtitleCn}><Translate id="contact.feedback.sub">创意投稿区</Translate></span>
              </h2>

              <p className={styles.descriptionText}>
                <Translate id="contact.feedback.desc">欢迎在下方评论区分享你的创意想法、作品建议或任何有趣的点子！</Translate>
              </p>

              <div className={styles.tipsBlock}>
                <p className={styles.tipText}>
                  <Translate id="contact.feedback.tip">💡 提示：支持 Markdown 格式，可以使用图床链接插入图片</Translate>
                </p>
                <p className={styles.imageHostTip}>
                  <Translate id="contact.feedback.imageHost">📷 推荐图床：</Translate><a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">imgbb.com</a> <Translate id="contact.feedback.imageHost.detail">(免费无需注册)</Translate>
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
        title={translate({ id: 'contact.modal.title', message: '扫码加入QQ群' })}
      />
    </Layout>
  );
}
