import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './giclee.module.css';

export default function GicleePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openImage = (src: string) => {
        setSelectedImage(src);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    return (
        <Layout
            title="艺术微喷工艺介绍"
            description="不止是周边，这是通往幻想乡的“真迹”">

            <div className={styles.pageContainer}>
                <article className={styles.articleContainer}>

                    {/* Header */}
                    <header className={styles.header}>
                        <img src="/img/sukima-ml.svg" alt="Sukima Moonlight" className={styles.logo} />
                        <h1 className={styles.mainTitle}>不止是周边，<br />这是通往幻想乡的<br />“真迹”</h1>
                    </header>

                    {/* Intro */}
                    <div className={styles.section}>
                        <p className={styles.introText}>
                            我们一直在思考：当那些恢弘的世界名画浸入幻想的染缸，又再次回到现实中时，它们应该以什么样的方式降临我们身边？<br />
                            是随处可见、反光刺眼的普通海报？还是表面粗糙，挂一阵子就卷边褪色的塑料布？
                        </p>
                        <div className={styles.highlightQuote}>
                            <strong>不。</strong><br />
                            幻想乡的少女们，值得被最高规格的礼遇。
                        </div>
                        <p className={styles.textBlock}>
                            为了完美复刻画师笔下那个绮丽的世界，我们按照<strong>收藏级艺术品复刻</strong>的标准，制作了我们所有的「艺术微喷 (Giclée)」制品。
                        </p>
                        <p className={styles.textBlock}>
                            这不仅是一张画，更是一份可以传世的实体收藏。
                        </p>
                    </div>

                    {/* Section 1: Printer */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>🎨 只有 12 色，才能捕捉“隙间”的深邃</h2>
                        <p className={styles.sectionSubtitle}>【Epson SureColor P9580 · 旗舰级输出】</p>

                        <p className={styles.textBlock}>
                            普通印刷只有 CMYK 4种颜色，印不出<strong>八云紫隙间里那种深邃的紫</strong>，也还原不了<strong>博丽神社鸟居那抹正红</strong>。
                        </p>
                        <p className={styles.textBlock}>
                            所以，我们动用了爱普生的当家怪兽 —— <strong>SureColor P9580</strong>。
                        </p>

                        <div className={styles.imageWrapper}>
                            <img
                                src="/img/epson9580_web.png"
                                alt="Epson SureColor P9580"
                                className={styles.image}
                                onClick={() => openImage("/img/epson9580_web.png")}
                            />
                            <div className={styles.caption}>Epson SureColor P9580 旗舰级大幅面打印机</div>
                        </div>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>12色墨水系统</div>
                                <p>它拥有普通打印机没有的<strong>专属橙、绿、紫</strong>墨水。那些绚烂的光影，只有它能分毫不差地还原。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>极致的黑</div>
                                <p>拥有4种不同浓度的黑色墨水。它印出的黑色不是死黑，而是像夜空一样有层次、有质感的黑。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>微米级精度</div>
                                <p>2400dpi 分辨率 + 3.5pl 极微墨滴。你需要拿着放大镜，才能惊叹于角色的睫毛和发丝竟如此清晰，肉眼完全看不到任何噪点。</p>
                            </li>
                        </ul>
                    </section>

                    {/* Section 2: Paper */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>📜 触手可及的“名画”触感</h2>
                        <p className={styles.sectionSubtitle}>【哈内姆勒 Photo Rag® 308g · 顶级画纸】</p>

                        <p className={styles.textBlock}>
                            如果说墨水是灵魂，那纸张就是肉体。我们拒绝了廉价的相纸，选用了<strong>德国哈内姆勒 (Hahnemühle)</strong> —— 这个从1584年就开始造纸的传奇品牌。
                        </p>

                        <div className={styles.imageWrapper}>
                            <img
                                src="/img/datasheet-PhotoRag308.png"
                                alt="Hahnemühle Photo Rag 308g"
                                className={styles.image}
                                onClick={() => openImage("/img/datasheet-PhotoRag308.png")}
                            />
                            <div className={styles.caption}>Hahnemühle Photo Rag® 308g 数据表</div>
                        </div>

                        <p className={styles.textBlock}>我们使用的是他们最经典的 <strong>Photo Rag 308g</strong>（紫妈那幅比较特殊，因为黑色面积太大选用了更贵的硫化钡纯棉纸）：</p>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>100% 纯棉制造</div>
                                <p>指尖划过，你能感受到如同古籍、水彩纸那样的温润棉质纹理，绝非普通纸浆可比。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>厚重 308gsm</div>
                                <p>拿在手里沉甸甸的分量感，挺括厚实，不会像普通海报那样软塌塌。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>高级哑光面</div>
                                <p><strong>这是重点！</strong> 它完全不反光。无论你宿舍或房间的灯光如何照射，任何角度都能完美欣赏画面，没有刺眼的白斑。</p>
                            </li>
                        </ul>

                        <p className={styles.textBlock}>为了让大家更直观地感受差异，我们拍摄了实际成品的细节图：</p>
                        <div className={styles.photoGrid}>
                            <img src="/img/BaS-huaxin.PNG" alt="Detail Shot 1" className={styles.gridImage} onClick={() => openImage("/img/BaS-huaxin.PNG")} />
                            <img src="/img/IMG_9650.jpg" alt="Detail Shot 2" className={styles.gridImage} onClick={() => openImage("/img/IMG_9650.jpg")} />
                            <img src="/img/IMG_9653.jpg" alt="Detail Shot 3" className={styles.gridImage} onClick={() => openImage("/img/IMG_9653.jpg")} />
                        </div>
                    </section>

                    {/* Section 3: Framing */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>🖼️ 最后的加冕：画廊级装裱</h2>
                        <p className={styles.textBlock}>
                            好马配好鞍。为了保护这幅作品，我们在装裱上也近乎强迫症：
                        </p>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>影像级高透亚克力</div>
                                <p>比玻璃更透、更轻、更安全。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>铝合金画框 & 铝皮背板</div>
                                <p>防潮防变形，给画作最坚实的支撑。</p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}>博物馆级无酸卡纸</div>
                                <p>确保画芯不会因为接触酸性物质而发黄。</p>
                            </li>
                        </ul>

                        <div className={styles.photoGrid}>
                            <img src="/img/F253B61EBC19D9DF60101EEC6BAF2242.PNG" alt="Framing Detail 1" className={styles.gridImage} onClick={() => openImage("/img/F253B61EBC19D9DF60101EEC6BAF2242.PNG")} />
                            <img src="/img/IMG_9171.jpg" alt="Framing Detail 2" className={styles.gridImage} onClick={() => openImage("/img/IMG_9171.jpg")} />
                            <img src="/img/IMG_9172.jpg" alt="Framing Detail 3" className={styles.gridImage} onClick={() => openImage("/img/IMG_9172.jpg")} />
                            <img src="/img/IMG_9173.jpg" alt="Framing Detail 4" className={styles.gridImage} onClick={() => openImage("/img/IMG_9173.jpg")} />
                        </div>
                    </section>

                    {/* Section 4: Value */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>⏳ 时间的礼物</h2>
                        <p className={styles.textBlock}>
                            为什么要选择艺术微喷？
                        </p>
                        <p className={styles.textBlock}>
                            普通的印刷品，挂一年就会在阳光下褪色。<br />
                            但得益于<strong>无酸纯棉纸张</strong>与<strong>颜料墨水</strong>的结合，这幅作品达到了<strong>“收藏级”标准</strong>。
                        </p>
                        <p className={styles.textBlock}>
                            它可以陪伴你读完高中、大学，甚至当你步入社会、组建家庭，回头看时，墙上的她们依然一如初见。
                        </p>
                    </section>

                    {/* Conclusion */}
                    <div className={styles.conclusion}>
                        <p className={styles.conclusionText}>
                            <strong>希望我们出售的不是一份画芯，更是一份能跨越时间、值得珍藏的爱意。</strong>
                        </p>
                    </div>

                </article>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className={styles.lightboxOverlay} onClick={closeImage}>
                        <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage} alt="Full size" className={styles.lightboxImage} />
                            <button className={styles.closeButton} onClick={closeImage}>×</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
