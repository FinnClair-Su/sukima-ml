---
slug: touhou-personality-test-analysis
title: 揭秘“东方Project角色人格测试”背后的算法原理
authors: [xinxian]
tags: [东方Project, 技术, 算法, 逆向工程]
date: 2025-12-16
---

# 揭秘“东方Project角色人格测试”背后的算法原理

今天，“测测你是哪个东方人物”的小测试在Q群刷屏。作为一位光荣的计算机系学生/东方同人社团主催，我不禁好奇：这个测试到底是如何运作的？它是真的通过基础的机器学习算法来匹配角色，还是仅仅通过简单的条件判断？我直觉上的“六维向量”匹配是否确有其事？

为了解开这个谜题，我分析了该网页的源代码。在这篇文章中，我将带大家深入代码底层，看看你的“本命角色”究竟是如何被算出来的。

<!-- truncate -->

## 核心发现：六维并不只是向量

经过对网页源码（主要是 `index-*.js` 文件）的逆向分析，我发现该测试确实基于一个**六维人格模型**。与我们熟知的 MBTI（四维）类似，这个测试引入了额外的两个维度，构建了一个更复杂的分类系统。

### 1. 十二个子维度与六大轴线

代码中定义了 12 个基础维度，它们两两相对，构成了 6 个核心人格轴线。代码片段如下：

```javascript
// 代码中的维度定义映射
const dimensions = [
    {code:"e", name:"外向", opposite:"i", oppositeName:"内向"},
    {code:"n", name:"理想", opposite:"s", oppositeName:"实用"},
    {code:"t", name:"逻辑", opposite:"f", oppositeName:"感性"},
    {code:"p", name:"应变", opposite:"j", oppositeName:"规划"},
    {code:"a", name:"怀疑", opposite:"o", oppositeName:"包容"}, // A vs O
    {code:"h", name:"进取", opposite:"c", oppositeName:"守旧"}  // H vs C
];
```

这六对对抗特质分别是：
1.  **E (外向) vs I (内向)**：经典的外倾/内倾维度。
2.  **N (理想) vs S (实用)**：类似 MBTI 的直觉/实感。
3.  **T (逻辑) vs F (感性)**：思考/情感。
4.  **P (应变) vs J (规划)**：感知/判断。
5.  **A (怀疑) vs O (包容)**：这是一个独特的维度，可能对应大五人格中的宜人性或神经质的变体。
6.  **H (进取) vs C (守旧)**：衡量对新事物的态度，可能对应开放性。

### 2. 积分算法

测试题目包含若干道问题，每道问题都对应上述 12 个子维度中的某一个。当你选择 A/B/C/D 选项时，会分别为该维度增加 1 到 4 分。

```javascript
// 伪代码还原的积分逻辑
let scores = { e:0, i:0, n:0, s:0, ... }; // 初始化全为0

userAnswers.forEach(answer => {
    // 每个问题都有一个固定的维度属性，比如 'e'
    const dimension = answer.dimension; 
    // answer.score 是 1-4 分
    scores[dimension] += answer.score;
});
```

并不是每道题都在 E 和 I 之间拉锯，而是有些题目专门测 E，有些专门测 I。最终，系统会分别统计 E 和 I 的总得分。

### 3. “决斗”与生成人格代码

关键的一步来了。系统并不会直接使用这 12 个具体的分数进行相似度计算（如余弦相似度），而是采用了一种**二值化（Binarization）**的策略，类似于 MBTI 的类型划分。

对于每一对轴线，它会比较两个子维度的总分，得分高者胜出：

```javascript
const resultCode = [
    scores.e > scores.i ? "e" : "i",
    scores.n > scores.s ? "n" : "s",
    scores.t > scores.f ? "t" : "f",
    scores.p > scores.j ? "p" : "j",
    scores.a > scores.o ? "a" : "o",
    scores.h > scores.c ? "h" : "c"
].join("");
```

这就生成了一个由 6 个字母组成的字符串（人格代码），例如 `"entpah"` 或 `"isfjoc"`。

如果是 6 个维度，每个维度 2 种可能，那么总共有 $2^6 = 64$ 种可能的人格组合。

### 4. 角色匹配机制

你可能会以为系统会计算你的分数向量与各个角色向量的欧氏距离，找出“最近”的角色。但实际上，代码的逻辑非常简单粗暴：**精确查表**。

系统直接拿着生成的 6 字母代码去数据库查询：

```javascript
// 伪代码
let characters = await database.query("characters")
    .where("dimension_code", "==", resultCode);
```

*   **即中**：如果数据库里有角色的设定刚好是这个代码（比如灵梦被设定为 `entpah`），那么你就匹配到了灵梦。
*   **碰撞**：如果同一个代码对应了多个角色，系统会从中**随机**抽取一个。
*   **未命中（Fallback）**：这是最有趣的部分。如果数据库里**没有**角色的代码和你完全一致，会发生什么？代码显示，它会**随机返回一个角色**！

```javascript
if (matchedCharacters.length === 0) {
    const allCharacters = await getAllCharacters();
    // 随机抽取一个幸运角色
    finalCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
}
```

这意味着，如果你的人格组合非常独特（或者非常奇葩），导致在预设的东方角色库中找不到对应的人，你得到的其实是一个完全随机的结果。这解释了为什么有时候结果会让人觉得“不太准”。

## 技术总结

从技术角度看，这个 H5 应用使用了以下栈：
*   **前端**：React + Vite 打包。
*   **后端服务**：使用了 Supabase (BaaS) 提供的数据库服务，前端直接通过 API 读取题目和角色数据。
*   **构建平台**：看起来像是使用了名为 "Miaoda" (秒搭) 的低代码/无代码平台生成的。

所谓的“六维向量”其实是 **6 组二元对抗特质**。匹配算法本质上是**分类（Classification）**而非**回归（Regression）**或是**聚类（Clustering）**。它将丰富的人格光谱简化为了 64 个离散的格子。

## 结语

虽然算法逻辑比预想的要简单直白，但这并不妨碍它的趣味性。这种将复杂人格降维打击成几个标签的做法，正是各种网络心理测试流行的秘诀——它简单、易于传播，并且给出了一个看似确定的“身份”。

下次当你测出自己是博丽灵梦或是雾雨魔理沙时，不妨想一想：你是在那 1/64 的格子里与她相遇，还是被随机函数“命运”地指派到了她身边呢？

---
*本文基于对公开页面源码的分析，仅供学习交流。*

Sincerely,

**苏心贤 (he/him)**  
Undergraduate Student / Incoming Ph.D. Student (2026)  
Beijing Jiaotong University
