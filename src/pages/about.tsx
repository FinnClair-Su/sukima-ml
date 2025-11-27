import React from 'react';
import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function About() {
    return (
        <Layout
            title="About Us"
            description="About Sukima Moonlight"
        >
            <div className={styles.pageContainer}>
                <main className={styles.mainGrid}>
                    {/* Left Column: Visual/Profile */}
                    <div className={styles.visualColumn}>
                        <div className={styles.frameWrapper}>
                            <img
                                src="/img/authors/xinxian.jpg"
                                alt="Su Xinxian"
                                className={styles.profileImage}
                            />
                        </div>
                        <div className={styles.captionText}>
                            Fig 1. The Creator, 2025.
                        </div>
                        <div className={styles.gicleeLinkWrapper}>
                            <a href="/giclee" className={styles.gicleeLink}>
                                我们选择的工艺——Giclée
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className={styles.infoColumn}>
                        <div className={styles.infoContent}>

                            <h1 className={styles.mainTitle}>
                                About the Organizer｜关于主催<br />
                                <span className={styles.subTitleCn}>苏心贤</span>
                            </h1>

                            <div className={styles.artistMeta}>
                                Founder & Chief Developer · Sukima Moonlight
                            </div>

                            <div className={styles.dividerShort}></div>

                            <div className={styles.descriptionBlock}>
                                <h3>Profile</h3>
                                <p>
                                    <strong>Organizer's Personal Site</strong>: <a href="https://fcsu.dev" target="_blank" rel="noopener noreferrer">fcsu.dev</a>
                                </p>
                                <p>
                                    BJTU Incoming PhD Student, Computer Science ➡️ Cybersecurity.
                                    I study software supply chain vulnerabilities and constitutional AI in multicultural contexts.
                                    I care deeply about learning science and cognitive security.
                                </p>
                            </div>

                            <div className={styles.descriptionBlock}>
                                <h3>Recently</h3>
                                <ul className={styles.plainList}>
                                    <li>软件供应链漏洞检测 Agent</li>
                                    <li>东方Project制品筹备</li>
                                    <li>身心调优与亲密关系思考</li>
                                    <li>读书</li>
                                </ul>
                            </div>

                            <div className={styles.quoteBlock}>
                                <p>
                                    "sukima-ml stands for Sukima Moonlight, but Machine Learning? I can do that too 😉"
                                </p>
                                <p>
                                    希望为东方带来更有文化底蕴的制品。
                                    上学好累，下辈子想做人见人爱的富家天才美少女。
                                </p>
                            </div>

                            <p className={styles.smallNotice}>
                                * Currently, this circle is just me working solo, but I'm excited about what we'll create together!
                            </p>

                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
