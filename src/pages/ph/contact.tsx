import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import StudioContactPanel from '../../components/StudioContactPanel';
import styles from './contact.module.css';

export default function StudioContactPage() {
  return (
    <Layout
      noFooter
      wrapperClassName="phantasmPage"
      title="联系与预约 | Studio Phantasm"
      description="联系 Studio Phantasm，预约朝阳区东五环浪潮实景片场的摄影场地。"
    >
      <Head>
        <title>联系与预约 — Studio Phantasm</title>
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="联系与预约 | Studio Phantasm" />
        <meta property="og:description" content="微信、QQ 或邮件联系 Studio Phantasm，预约摄影场地。" />
        <link rel="canonical" href="https://ph.sukima-ml.club/contact" />
      </Head>

      <div className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} to="/ph">
            <img src="/img/studio/phantasm-mark.svg" alt="" width="42" height="47" />
            <span>STUDIO PHANTASM</span>
          </Link>
          <Link className={styles.back} to="/ph">← 返回首页</Link>
        </header>

        <main>
          <StudioContactPanel id="contact-page" showPageLink={false} />
        </main>

        <footer className={styles.footer}>
          <span>CHAOYANG / BEIJING</span>
          <Link to="/ph#pricing">价格与预约规则 ↗</Link>
          <Link to="/ph#spaces">查看全部场地 ↗</Link>
        </footer>
      </div>
    </Layout>
  );
}
