import React from 'react';
import Link from '@docusaurus/Link';

import { studioPricing } from '../data/studioSpaces';
import styles from './StudioContactPanel.module.css';

type Props = {
  id?: string;
  showPageLink?: boolean;
};

const { contact } = studioPricing;

export default function StudioContactPanel({ id, showPageLink = true }: Props) {
  const titleId = `${id ?? 'studio'}-contact-title`;

  return (
    <section className={styles.contact} id={id} aria-labelledby={titleId}>
      <header className={styles.heading}>
        <p>CONTACT / BOOKING</p>
        <div className={styles.location}>
          <span>LOCATION</span>
          <strong id={titleId}>
            {contact.locationLines[0]}
            <br />
            {contact.locationLines[1]}
          </strong>
        </div>
      </header>

      <div className={styles.channels}>
        <a
          className={styles.email}
          href={`mailto:${contact.email}?subject=${encodeURIComponent('Studio Phantasm 场地预约')}`}
        >
          <span>EMAIL / 直接发送预约信息</span>
          <strong>{contact.email}</strong>
          <b aria-hidden="true">↗</b>
        </a>

        <article className={styles.qrCard}>
          <div className={styles.qrMeta}>
            <span>WECHAT</span>
            <strong>微信扫码添加</strong>
          </div>
          <a href="/img/studio/contact/wechat.png" aria-label="打开完整微信二维码图片">
            <img
              src="/img/studio/contact/wechat.png"
              alt="苏心贤 Silas Su 的微信二维码"
              width="888"
              height="1191"
              loading="lazy"
              decoding="async"
            />
          </a>
        </article>

        <article className={styles.qrCard}>
          <div className={styles.qrMeta}>
            <span>QQ</span>
            <strong>{contact.qq}</strong>
          </div>
          <a href="/img/studio/contact/qq.png" aria-label="打开完整 QQ 二维码图片">
            <img
              src="/img/studio/contact/qq.png"
              alt={`苏心贤 Silas Su 的 QQ 二维码，QQ 号 ${contact.qq}`}
              width="1026"
              height="1530"
              loading="lazy"
              decoding="async"
            />
          </a>
        </article>
      </div>

      <footer className={styles.note}>
        <div className={styles.fields}>
          <span>预约时请附</span>
          <ol>
            {contact.bookingFields.map((field, index) => (
              <li key={field}>
                <i>{String(index + 1).padStart(2, '0')}</i>
                {field}
              </li>
            ))}
          </ol>
        </div>
        <p>
          {contact.bookingNote}
          {showPageLink && (
            <>
              {' '}
              <Link to="/ph/contact">打开独立联系页 ↗</Link>
            </>
          )}
        </p>
      </footer>
    </section>
  );
}
