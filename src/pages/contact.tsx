import React, { useState } from 'react';
import Layout from '@theme/Layout';
import QRCodeModal from '../components/QRCodeModal';
import styles from './contact.module.css';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout
      title="联系方式"
      description="与隙间月影社团取得联系">
      <main className={styles.contactContainer}>
        <div className={styles.contactContent}>
          <h1>联系方式</h1>
          
          <section className={styles.section}>
            <h2>社交媒体</h2>
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
          </section>

          <section className={styles.section}>
            <h2>合作咨询</h2>
            <p>如果您对我们的创作感兴趣，或希望与我们合作，欢迎通过以上方式联系我们。</p>
          </section>
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
