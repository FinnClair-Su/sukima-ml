import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
            title={translate({ id: 'giclee.title', message: '艺术微喷工艺介绍' })}
            description={translate({ id: 'giclee.description', message: '不止是周边，这是通往幻想乡的“真迹”' })}>

            <div className={styles.pageContainer}>
                <article className={styles.articleContainer}>

                    <header className={styles.header}>
                        <img
                            src={useBaseUrl("/img/sukima-ml.svg")}
                            alt={translate({ id: 'giclee.logo.alt', message: 'Sukima Moonlight' })}
                            className={styles.logo}
                        />
                        <h1 className={styles.mainTitle}>
                            {translate({ id: 'giclee.header.part1', message: '不止是周边，' })}
                            <br />
                            {translate({ id: 'giclee.header.part2', message: '这是通往幻想乡的' })}
                            <br />
                            {translate({ id: 'giclee.header.part3', message: '“真迹”' })}
                        </h1>
                    </header>

                    {/* Intro */}
                    <div className={styles.section}>
                        <p className={styles.introText}>
                            {translate({
                                id: 'giclee.intro.p1.line1',
                                message: '我们一直在思考：当那些恢弘的世界名画浸入幻想的染缸，又再次回到现实中时，它们应该以什么样的方式降临我们身边？'
                            })}
                            <br />
                            {translate({
                                id: 'giclee.intro.p1.line2',
                                message: '是随处可见、反光刺眼的普通海报？还是表面粗糙，挂一阵子就卷边褪色的塑料布？'
                            })}
                        </p>
                        <div className={styles.highlightQuote}>
                            <strong><Translate id="giclee.intro.no">不。</Translate></strong><br />
                            <Translate id="giclee.intro.vision">幻想乡的少女们，值得被最高规格的礼遇。</Translate>
                        </div>
                        <p className={styles.textBlock}>
                            <Translate
                                id="giclee.intro.p2"
                                values={{
                                    standard: <strong>{translate({ id: 'giclee.intro.standard', message: '收藏级艺术品复刻' })}</strong>
                                }}
                            >
                                {'为了完美复刻画师笔下那个绮丽的世界，我们按照{standard}的标准，制作了我们所有的「艺术微喷 (Giclée)」制品。'}
                            </Translate>
                        </p>
                        <p className={styles.textBlock}>
                            <Translate id="giclee.intro.p3">这不仅是一张画，更是一份可以传世的实体收藏。</Translate>
                        </p>
                    </div>

                    {/* Section 1: Printer */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><Translate id="giclee.sec1.title">🎨 只有 12 色，才能捕捉“隙间”的深邃</Translate></h2>
                        <p className={styles.sectionSubtitle}><Translate id="giclee.sec1.model">【Epson SureColor P9580 · 旗舰级输出】</Translate></p>

                        <p className={styles.textBlock}>
                            <Translate
                                id="giclee.sec1.desc1"
                                values={{
                                    purple: <strong>{translate({ id: 'giclee.sec1.purple', message: '八云紫隙间里那种深邃的紫' })}</strong>,
                                    red: <strong>{translate({ id: 'giclee.sec1.red', message: '博丽神社鸟居那抹正红' })}</strong>
                                }}
                            >
                                {'普通印刷只有 CMYK 4种颜色，印不出{purple}，也还原不了{red}。'}
                            </Translate>
                        </p>
                        <p className={styles.textBlock}>
                            <Translate
                                id="giclee.sec1.desc2"
                                values={{
                                    model: <strong>SureColor P9580</strong>
                                }}
                            >
                                {'所以，我们动用了爱普生的当家怪兽 —— {model}。'}
                            </Translate>
                        </p>

                        <div className={styles.imageWrapper}>
                            <img
                                src={useBaseUrl("/img/epson9580_web.png")}
                                alt="Epson SureColor P9580"
                                className={styles.image}
                                onClick={() => openImage(useBaseUrl("/img/epson9580_web.png"))}
                            />
                            <div className={styles.caption}><Translate id="giclee.sec1.image.caption">Epson SureColor P9580 旗舰级大幅面打印机</Translate></div>
                        </div>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec1.item1.title">12色墨水系统</Translate></div>
                                <p>
                                    <Translate
                                        id="giclee.sec1.item1.desc"
                                        values={{
                                            colors: <strong>{translate({ id: 'giclee.sec1.colors', message: '专属橙、绿、紫' })}</strong>
                                        }}
                                    >
                                        {'它拥有普通打印机没有的{colors}墨水。那些绚烂的光影，只有它能分毫不差地还原。'}
                                    </Translate>
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec1.item2.title">极致的黑</Translate></div>
                                <p><Translate id="giclee.sec1.item2.desc">拥有4种不同浓度的黑色墨水。它印出的黑色不是死黑，而是像夜空一样有层次、有质感的黑。</Translate></p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec1.item3.title">微米级精度</Translate></div>
                                <p><Translate id="giclee.sec1.item3.desc">2400dpi 分辨率 + 3.5pl 极微墨滴。你需要拿着放大镜，才能惊叹于角色的睫毛和发丝竟如此清晰，肉眼完全看不到任何噪点。</Translate></p>
                            </li>
                        </ul>
                    </section>

                    {/* Section 2: Paper */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><Translate id="giclee.sec2.title">📜 触手可及的“名画”触感</Translate></h2>
                        <p className={styles.sectionSubtitle}><Translate id="giclee.sec2.model">【哈内姆勒 Photo Rag® 308g · 顶级画纸】</Translate></p>

                        <p className={styles.textBlock}>
                            {translate({
                                id: 'giclee.sec2.desc1',
                                message: '如果说墨水是灵魂，那纸张就是肉体。我们拒绝了廉价的相纸，选用了 德国哈内姆勒 (Hahnemühle) —— 这个从1584年就开始造纸的传奇品牌。'
                            })}
                        </p>

                        <div className={styles.imageWrapper}>
                            <img
                                src={useBaseUrl("/img/datasheet-PhotoRag308.png")}
                                alt={translate({ id: 'giclee.sec2.image.alt', message: 'Hahnemühle Photo Rag 308g' })}
                                className={styles.image}
                                onClick={() => openImage(useBaseUrl("/img/datasheet-PhotoRag308.png"))}
                            />
                            <div className={styles.caption}><Translate id="giclee.sec2.image.caption">Hahnemühle Photo Rag® 308g 数据表</Translate></div>
                        </div>

                        <p className={styles.textBlock}>
                            <Translate
                                id="giclee.sec2.desc2"
                                values={{
                                    model: <strong>Photo Rag 308g</strong>,
                                    purpleNote: <em>{translate({ id: 'giclee.sec2.purpleNote', message: '（紫妈那幅比较特殊，因为黑色面积太大选用了更贵的硫化钡纯棉纸）' })}</em>
                                }}
                            >
                                {'我们使用的是他们最经典的 {model}{purpleNote}：'}
                            </Translate>
                        </p>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec2.item1.title">100% 纯棉制造</Translate></div>
                                <p><Translate id="giclee.sec2.item1.desc">指尖划过，你能感受到如同古籍、水彩纸那样的温润棉质纹理，绝非普通纸浆可比。</Translate></p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec2.item2.title">厚重 308gsm</Translate></div>
                                <p><Translate id="giclee.sec2.item2.desc">拿在手里沉甸甸的分量感，挺括厚实，不会像普通海报那样软塌塌。</Translate></p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec2.item3.title">高级哑光面</Translate></div>
                                <p>
                                    <Translate
                                        id="giclee.sec2.item3.desc"
                                        values={{
                                            focus: <strong>{translate({ id: 'giclee.sec2.focus', message: '这是重点！' })}</strong>
                                        }}
                                    >
                                        {'{focus} 它完全不反光。无论你宿舍或房间的灯光如何照射，任何角度都能完美欣赏画面，没有刺眼的白斑。'}
                                    </Translate>
                                </p>
                            </li>
                        </ul>

                        <p className={styles.textBlock}>
                            <Translate id="giclee.sec2.detailHint">为了让大家更直观地感受差异，我们拍摄了实际成品的细节图：</Translate>
                        </p>
                        <div className={styles.photoGrid}>
                            <img src={useBaseUrl("/img/BaS-huaxin.PNG")} alt={translate({ id: 'giclee.sec2.detail1.alt', message: 'Detail Shot 1' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/BaS-huaxin.PNG"))} />
                            <img src={useBaseUrl("/img/IMG_0199.jpg")} alt={translate({ id: 'giclee.sec2.detail2.alt', message: 'Detail Shot 2' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/IMG_0199.jpg"))} />
                            <img src={useBaseUrl("/img/IMG_0202.jpg")} alt={translate({ id: 'giclee.sec2.detail3.alt', message: 'Detail Shot 3' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/IMG_0202.jpg"))} />

                        </div>
                    </section>

                    {/* Section 3: Framing */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><Translate id="giclee.sec3.title">🖼️ 最后的加冕：画廊级装裱</Translate></h2>
                        <p className={styles.textBlock}>
                            <Translate id="giclee.sec3.desc">好马配好鞍。为了保护这幅作品，我们在装裱上也近乎强迫症：</Translate>
                        </p>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec3.item1.title">影像级高透亚克力</Translate></div>
                                <p><Translate id="giclee.sec3.item1.desc">比玻璃更透、更轻、更安全。</Translate></p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec3.item2.title">铝合金画框 & 铝皮背板</Translate></div>
                                <p><Translate id="giclee.sec3.item2.desc">防潮防变形，给画作最坚实的支撑。</Translate></p>
                            </li>
                            <li className={styles.featureItem}>
                                <div className={styles.featureTitle}><Translate id="giclee.sec3.item3.title">博物馆级无酸卡纸</Translate></div>
                                <p><Translate id="giclee.sec3.item3.desc">确保画芯不会因为接触酸性物质而发黄。</Translate></p>
                            </li>
                        </ul>

                        <div className={styles.photoGrid}>
                            <img src={useBaseUrl("/img/F253B61EBC19D9DF60101EEC6BAF2242.PNG")} alt={translate({ id: 'giclee.sec3.detail1.alt', message: 'Framing Detail 1' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/F253B61EBC19D9DF60101EEC6BAF2242.PNG"))} />
                            <img src={useBaseUrl("/img/IMG_0195.jpg")} alt={translate({ id: 'giclee.sec3.detail2.alt', message: 'Framing Detail 2' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/IMG_0195.jpg"))} />
                            <img src={useBaseUrl("/img/IMG_0196.jpg")} alt={translate({ id: 'giclee.sec3.detail3.alt', message: 'Framing Detail 3' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/IMG_0196.jpg"))} />
                            <img src={useBaseUrl("/img/IMG_0197.jpg")} alt={translate({ id: 'giclee.sec3.detail4.alt', message: 'Framing Detail 4' })} className={styles.gridImage} onClick={() => openImage(useBaseUrl("/img/IMG_0197.jpg"))} />
                        </div>
                    </section>

                    {/* Section 4: Value */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><Translate id="giclee.sec4.title">⏳ 时间的礼物</Translate></h2>
                        <p className={styles.textBlock}>
                            <Translate id="giclee.sec4.q">为什么要选择艺术微喷？</Translate>
                        </p>
                        <p className={styles.textBlock}>
                            {translate({
                                id: 'giclee.sec4.desc1.part1',
                                message: '普通的印刷品，挂一年就会在阳光下褪色。'
                            })}
                            <br />
                            <Translate
                                id="giclee.sec4.desc1.part2"
                                values={{
                                    paper: <strong>{translate({ id: 'giclee.sec4.paper', message: '无酸纯棉纸张' })}</strong>,
                                    ink: <strong>{translate({ id: 'giclee.sec4.ink', message: '颜料墨水' })}</strong>,
                                    standard: <strong>{translate({ id: 'giclee.sec4.standard', message: '“收藏级”标准' })}</strong>
                                }}
                            >
                                {'但得益于{paper}与{ink}的结合，这幅作品达到了{standard}。'}
                            </Translate>
                        </p>
                        <p className={styles.textBlock}>
                            <Translate id="giclee.sec4.desc2">
                                它可以陪伴你读完高中、大学，甚至当你步入社会、组建家庭，回头看时，墙上的她们依然一如初见。
                            </Translate>
                        </p>
                    </section>

                    {/* Conclusion */}
                    <div className={styles.conclusion}>
                        <p className={styles.conclusionText}>
                            <strong><Translate id="giclee.conclusion">希望我们出售的不是一份画芯，更是一份能跨越时间、值得珍藏的爱意。</Translate></strong>
                        </p>
                    </div>

                </article>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className={styles.lightboxOverlay} onClick={closeImage}>
                        <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage} alt={translate({ id: 'giclee.lightbox.alt', message: 'Full size' })} className={styles.lightboxImage} />
                            <button className={styles.closeButton} onClick={closeImage}>×</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
