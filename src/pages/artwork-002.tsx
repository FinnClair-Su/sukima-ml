import React from 'react';
import Layout from '@theme/Layout';
import styles from './artwork-002.module.css';

export default function Artwork002() {
    return (
        <Layout
            title="《The Bookworm》- Visual Mockup"
            description="帕秋莉&小恶魔同人 - Visual Mockup"
        >
            <div className={styles.pageContainer}>
                <main className={styles.mainGrid}>

                    {/* 左侧：艺术展示区 */}
                    <div className={styles.visualColumn}>
                        <div className={styles.frameWrapper}>
                            <img
                                src="/img/artworks/new.jpg"
                                alt="The Bookworm × The Pachouli-sama"
                                className={styles.artworkImage}
                            />
                        </div>
                        <div className={styles.captionText}>
                            Fig 2. The Bookworm × The Pachouli-sama (Visual Mockup), 2025.
                        </div>
                    </div>

                    {/* 右侧：信息交互区 */}
                    <div className={styles.infoColumn}>
                        <div className={styles.infoContent}>

                            <h1 className={styles.mainTitle}>
                                The Bookworm × The Pachouli-sama<br />
                                <span className={styles.subTitleCn}>书虫与知识的魔女</span>
                            </h1>

                            <div className={styles.artistMeta}>
                                Visual Mockup · Nano Banana Pro
                                <br />
                                概念演示 · 正在手绘中
                            </div>

                            <div className={styles.dividerShort}></div>

                            <div className={styles.quoteBlock}>
                                <p>
                                    下一幅会是《The Bookworm》的帕秋莉&小恶魔同人，这个是我用Nano Banana Pro跑的Visual Mockup，和我们社团合作的画师正在手绘中。帕秋莉厨也欢迎来玩
                                </p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
