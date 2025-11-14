# 隙间月影 | Sukima Moonlight

> **名画与东方的邂逅 | Where Classic Art Meets Touhou**

这是一个基于 Docusaurus 构建的艺术展示网站，专注于展示经典名画与东方Project角色的同人创作。网站集成了作品展示、社团动态、评论互动等功能，为艺术创作者提供了一个优雅的展示平台。

## ✨ 核心特性

### 🎨 作品展示系统
- **轮播画廊**：首页精美的作品轮播展示，支持左右切换和键盘导航
- **对比展示**：原作与同人作品并排对比，清晰展现创作理念
- **作品详情页**：独立的作品展示页面，包含详细介绍和购买入口
- **响应式设计**：完美适配桌面端和移动端

### 💬 评论互动系统
- **Giscus 集成**：基于 GitHub Discussions 的评论系统
- **自动主题适配**：评论区自动跟随网站深色/浅色主题
- **多场景支持**：博客文章、作品页面、自定义页面均可启用评论
- **Markdown 支持**：支持 Markdown 格式和表情反应

### 📝 内容管理
- **社团动态博客**：记录创作过程、活动进展
- **知识库文档**：可选的文档系统，用于教程或指南
- **标签分类**：灵活的标签系统，便于内容组织
- **作者系统**：支持多作者协作

### 🎭 独特设计
- **ASCII 动画**：首页创意的七段数码管动画效果
- **优雅排版**：精心设计的视觉层次和间距
- **品牌一致性**：统一的视觉风格和色彩方案

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/FinnClair-Su/sukima-ml.git
   cd sukima-ml
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```
   网站将在 `http://localhost:3000` 自动打开

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 📁 项目结构

```
xyy-diary-template/
├── blog/                          # 社团动态博客
│   ├── 2025-11-11-beginning.md   # 博客文章
│   ├── authors.yml                # 作者信息
│   └── tags.yml                   # 标签定义
├── docs/                          # 知识库文档（可选）
│   └── intro.md
├── src/
│   ├── components/                # React 组件
│   │   ├── GiscusComments/       # 基础评论组件
│   │   ├── CommentsSection/      # 完整评论区组件
│   │   ├── GalleryCarousel/      # 作品轮播组件
│   │   └── QRCodeModal/          # 二维码弹窗组件
│   ├── pages/                     # 页面组件
│   │   ├── index.tsx             # 首页
│   │   ├── gallery.tsx           # 作品集页面
│   │   ├── contact.tsx           # 联系页面
│   │   └── artwork-001.tsx       # 作品详情页示例
│   ├── theme/                     # 主题覆盖
│   │   └── BlogPostItem/         # 博客文章评论集成
│   └── css/
│       └── custom.css            # 自定义样式
├── static/
│   └── img/                      # 静态资源
│       ├── artworks/             # 作品图片
│       └── authors/              # 作者头像
├── docusaurus.config.ts          # Docusaurus 配置
├── sidebars.ts                   # 侧边栏配置
└── package.json                  # 项目依赖
```

## 🎨 自定义指南

### 1. 基础信息配置

编辑 `docusaurus.config.ts`：

```typescript
const config: Config = {
  title: '你的网站标题',
  tagline: '你的标语',
  url: 'https://your-domain.com',
  favicon: 'img/favicon.svg',
  
  // 更新组织和项目名称
  organizationName: 'your-org',
  projectName: 'your-project',
};
```

### 2. 添加新作品

#### 步骤 1：准备图片
将作品图片放入 `static/img/artworks/` 目录

#### 步骤 2：更新首页轮播
编辑 `src/pages/index.tsx`，在 `placeholderArtworks` 数组中添加：

```typescript
{
  id: 'artwork-new',
  title: '作品标题',
  description: '作品描述',
  originalPainting: '原作名称',
  touhouCharacter: '东方角色',
  originalImagePath: '/img/artworks/original.jpg',
  imagePath: '/img/artworks/fanart.jpg',
  imageAlt: '图片描述',
}
```

#### 步骤 3：创建作品详情页
复制 `src/pages/artwork-001.tsx` 并修改内容

#### 步骤 4：更新作品集页面
编辑 `src/pages/gallery.tsx`，在 `artworks` 数组中添加卡片

### 3. 配置评论系统

评论系统使用 Giscus（基于 GitHub Discussions）。

#### 配置步骤：

1. **启用 GitHub Discussions**
   - 进入你的 GitHub 仓库
   - Settings → Features → 勾选 Discussions

2. **获取 Giscus 配置**
   - 访问 [giscus.app](https://giscus.app)
   - 输入你的仓库信息
   - 选择 Discussion 分类（建议使用 Announcements）
   - 复制生成的配置

3. **更新配置**
   编辑 `src/components/GiscusComments/index.tsx`：
   ```typescript
   script.setAttribute('data-repo', 'your-username/your-repo');
   script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
   script.setAttribute('data-category', 'Announcements');
   script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
   ```

#### 使用评论组件：

**在博客文章中**（自动启用）：
```markdown
---
title: 文章标题
comments: false  # 添加此行可禁用评论
---
```

**在自定义页面中**：
```tsx
import CommentsSection from '../components/CommentsSection';

<CommentsSection 
  title="评论区"
  description="欢迎留言"
/>
```

更多评论功能：
- 支持 Markdown 格式（可通过图床链接插入图片）
- 自动适配深色/浅色主题
- 基于 GitHub 账号登录

### 4. 更新作者信息

编辑 `blog/authors.yml`：

```yaml
your-username:
  name: 你的名字
  title: 你的头衔
  url: https://your-website.com
  image_url: /img/authors/your-avatar.jpg
  email: your-email@example.com
```

### 5. 自定义样式

编辑 `src/css/custom.css` 修改颜色方案：

```css
:root {
  --ifm-color-primary: #your-color;
  --ifm-color-primary-dark: #your-dark-color;
  /* ... 更多颜色变量 */
}
```

## 📝 内容创作

### 撰写博客文章

在 `blog/` 目录创建新文件：

```markdown
---
slug: your-post-slug
title: 文章标题
authors: [your-username]
tags: [标签1, 标签2]
date: 2025-11-15
---

文章摘要，显示在列表页。

<!-- truncate -->

完整文章内容...
```

### 添加文档页面

在 `docs/` 目录创建 Markdown 文件：

```markdown
---
sidebar_position: 1
---

# 文档标题

文档内容...
```

## 🚢 部署

### Cloudflare Pages（推荐）

项目已配置 `wrangler.toml`，支持 Cloudflare Pages 部署：

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 构建命令：`npm run build`
3. 构建输出目录：`build`
4. 环境变量：Node.js 18+

### GitHub Pages

```bash
# 更新 docusaurus.config.ts 中的配置
organizationName: 'your-github-username'
projectName: 'your-repo-name'

# 部署
npm run deploy
```

### Vercel / Netlify

1. 导入 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`build`
4. Node.js 版本：18.x

## 🛠️ 可用命令

```bash
npm start              # 启动开发服务器
npm run build          # 构建生产版本
npm run serve          # 预览构建结果
npm run deploy         # 部署到 GitHub Pages
npm run clear          # 清除缓存
npm run typecheck      # TypeScript 类型检查
```

## 🎯 技术栈

- **框架**：[Docusaurus 3.8.1](https://docusaurus.io/)
- **UI 库**：[React 19.0](https://react.dev/)
- **语言**：TypeScript 5.6
- **评论系统**：[Giscus](https://giscus.app/)
- **部署**：Cloudflare Pages / GitHub Pages

## 📦 核心依赖

```json
{
  "@docusaurus/core": "3.8.1",
  "@docusaurus/preset-classic": "3.8.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "~5.6.2"
}
```

## 🎨 设计理念

### ASCII 动画的双重含义
首页的七段数码管动画不仅是视觉效果，更蕴含深意：
1. **知识累积**：单个字符（ASCII 码）逐步累加，象征知识的积累过程
2. **技术致敬**：七段数码管风格向早期计算机时代致敬
3. **永恒17岁**：最终显示的数字暗示东方Project中八云紫的经典梗

### 作品展示哲学
- **对比呈现**：原作与同人并列，展现创作的传承与创新
- **细节优先**：高质量图片展示，尊重艺术作品的每一个细节
- **互动体验**：轮播、悬停效果等交互设计提升用户体验

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Docusaurus](https://docusaurus.io/) - 强大的静态站点生成器
- [Giscus](https://giscus.app/) - 优雅的评论系统
- [React](https://react.dev/) - 现代化的 UI 框架
- [Prism](https://prismjs.com/) - 代码语法高亮
- 东方Project社区 - 灵感来源

## 🔗 相关链接

- **官方网站**：[sukima-ml.club](https://sukima-ml.club)
- **GitHub**：[FinnClair-Su/sukima-ml](https://github.com/FinnClair-Su/sukima-ml)
- **创作者主页**：[fcsu.dev](https://fcsu.dev)
- **Bilibili**：[@苏心贤](https://space.bilibili.com/368984327)

## 📮 联系方式

- **Email**：kanade271828@gmail.com
- **QQ群**：见网站联系页面
- **GitHub Issues**：[提交问题](https://github.com/FinnClair-Su/sukima-ml/issues)

---

*用 ❤️ 和 Docusaurus 构建 | Built with ❤️ and Docusaurus*

**隙间月影 Sukima Moonlight** - 为东方带来更有文化底蕴的制品
