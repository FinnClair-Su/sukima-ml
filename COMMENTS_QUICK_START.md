# 评论功能快速开始

## 🎯 已自动启用的地方

### ✅ Blog 文章
所有博客文章自动包含评论功能，无需额外配置。

**禁用某篇文章的评论：**
```markdown
---
title: 我的文章
comments: false
---
```

### ✅ Artwork 作品页
`artwork-001.tsx` 已集成评论功能。

## 📝 在新页面添加评论

### 方法 1：使用 CommentsSection（推荐）

```tsx
import CommentsSection from '../components/CommentsSection';

export default function MyPage() {
  return (
    <Layout>
      {/* 你的页面内容 */}
      
      <CommentsSection 
        title="评论区"
        description="欢迎留言"
      />
    </Layout>
  );
}
```

### 方法 2：使用基础 GiscusComments

```tsx
import GiscusComments from '../components/GiscusComments';

export default function MyPage() {
  return (
    <Layout>
      {/* 你的页面内容 */}
      
      <div className="my-comments">
        <GiscusComments />
      </div>
    </Layout>
  );
}
```

## 🎨 调整评论区宽度

```tsx
// 在你的 .module.css 中
.wideComments {
  max-width: 1600px;
}

// 在组件中使用
<CommentsSection 
  className={styles.wideComments}
  title="讨论区"
/>
```

## 💡 用户功能

- ✍️ Markdown 格式支持
- 🖼️ 拖拽/粘贴上传图片
- 😊 表情反应
- 🌓 自动适配主题
- 🔐 GitHub 账号登录

就这么简单！
