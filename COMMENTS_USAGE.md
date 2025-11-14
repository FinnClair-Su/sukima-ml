# 评论组件使用指南

本项目提供了灵活的评论系统，基于 Giscus（GitHub Discussions）。

## 组件说明

### 1. GiscusComments（基础组件）
最基础的 Giscus 评论组件，只包含评论功能本身。

```tsx
import GiscusComments from '../components/GiscusComments';

<GiscusComments />
```

### 2. CommentsSection（推荐使用）
带标题、描述和样式的完整评论区组件。

```tsx
import CommentsSection from '../components/CommentsSection';

<CommentsSection 
  title="评论区"
  description="欢迎留言讨论"
  className="custom-class"  // 可选
/>
```

**Props:**
- `title` (可选): 评论区标题，默认为 "评论区"
- `description` (可选): 评论区描述文字
- `className` (可选): 自定义 CSS 类名

## 使用场景

### Blog 文章
评论功能已自动集成到所有博客文章中。如需禁用某篇文章的评论，在文章的 frontmatter 中添加：

```md
---
title: 文章标题
comments: false
---
```

### Artwork 作品页面
已在 `artwork-001.tsx` 中使用，示例：

```tsx
<CommentsSection 
  title="作品评论"
  description="欢迎分享你对这幅作品的看法和建议"
  className={styles.artworkComments}
/>
```

### 自定义页面
在任何页面中都可以使用：

```tsx
import CommentsSection from '../components/CommentsSection';

export default function MyPage() {
  return (
    <Layout>
      <div>
        {/* 页面内容 */}
      </div>
      
      <CommentsSection 
        title="讨论区"
        description="有任何问题欢迎留言"
      />
    </Layout>
  );
}
```

## 样式定制

### 调整宽度
通过 `className` 传入自定义样式：

```css
/* 在你的 module.css 中 */
.widerComments {
  max-width: 1600px;
}

.narrowComments {
  max-width: 800px;
}
```

```tsx
<CommentsSection className={styles.widerComments} />
```

### 响应式布局
CommentsSection 已内置响应式设计：
- 桌面端：宽度自适应，最大宽度由父容器或 className 控制
- 移动端：自动调整内边距和字体大小

## 功能特性

✅ 支持 Markdown 格式
✅ 支持图片上传（拖拽、粘贴、选择文件）
✅ 支持表情反应
✅ 自动适配深色/浅色主题
✅ 基于 GitHub 账号登录
✅ 评论数据存储在 GitHub Discussions

## 注意事项

1. 用户需要 GitHub 账号才能评论
2. 评论数据存储在 `FinnClair-Su/sukima-ml` 仓库的 Discussions 中
3. 评论按页面路径（pathname）自动分组
4. 首次加载可能需要几秒钟初始化
