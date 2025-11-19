import React from 'react';
import Layout from '@theme/Layout';
import styles from './buy.module.css';

export default function BuyPage() {
    return (
        <Layout
            title="购买指引 / Purchase Guide"
            description="Purchase instructions and payment methods"
        >
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>奉纳信仰 / OFFER FAITH</h1>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. 扫码支付 / Payment</h2>
                        <div className={styles.paymentMethods}>
                            <div className={styles.qrCard}>
                                <img
                                    src="/img/alipay_receiveMoney.png"
                                    alt="Alipay"
                                    className={styles.qrImage}
                                />
                                <div className={styles.qrLabel}>支付宝 (Alipay)</div>
                            </div>
                            <div className={styles.qrCard}>
                                <img
                                    src="/img/wechat_receiveMoney.png"
                                    alt="WeChat Pay"
                                    className={styles.qrImage}
                                />
                                <div className={styles.qrLabel}>微信支付 (WeChat)</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. 联系方式 / Contact</h2>
                        <div className={styles.contactInfo}>
                            <p>推荐发邮件给我，请优先使用 iCloud 邮箱，Gmail 作为备选（因为很多人用 QQ 邮箱无法给 Gmail 写信）。</p>
                            <p>发送邮件或加群后，请添加群主好友私信。我会以邮件回复或私聊回复确认订单。</p>

                            <div className={styles.emailList}>
                                <span className={`${styles.emailItem} ${styles.primary}`}>
                                    To: kanade271828@icloud.com (推荐/Recommended)
                                </span>
                                <span className={`${styles.emailItem} ${styles.secondary}`}>
                                    Cc: kanade271828@gmail.com (备选/Backup)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. 邮件填写模板 / Email Template</h2>
                        <div className={styles.templateBox}>
                            <span className={styles.copyHint}>请复制下方内容 / Copy below</span>
                            <p><strong>邮件标题：</strong>【某某制品购买】你的QQ号+尺寸</p>
                            <p><strong>邮件正文：</strong></p>
                            <p>购买规格</p>
                            <p>尺寸：（例如：14寸）</p>
                            <p>样式：（需要留白 / 无边框满印）</p>
                            <p>数量：</p>
                            <p>收货信息：</p>
                            <p>姓名&联系电话&收货地址</p>

                            <div className={styles.importantNote}>
                                * 请务必在邮件附件中上传“付款记录截图”，截图需要能看清“商户单号”或“交易单号”（Order ID），以便主催核对入账。
                                <br />
                                * 如若选择添加好友私信购买，也请给出上述信息。
                            </div>
                        </div>
                    </div>

                    <div className={styles.signature}>
                        Sincerely,<br />
                        苏心贤 (主催)
                    </div>

                </div>
            </div>
        </Layout>
    );
}
