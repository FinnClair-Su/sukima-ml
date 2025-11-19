import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '隙间月影 | Sukima Moonlight',
  tagline: '名画与东方的邂逅 | Where Classic Art Meets Touhou',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    // v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sukima-ml.club',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Cloudflare Pages deployment config
  organizationName: 'sukima-ml',
  projectName: 'sukima-ml-website',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  /* i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  }, */

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/FinnClair-Su/sukima-ml/tree/main/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, locale: 'zh-Hans', frontMatter, options: { wordsPerMinute: 200 } }),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          blogTitle: '社团动态',
          blogDescription: '隙间月影社团的最新活动和创作进展',
          blogSidebarTitle: '所有文章',
          blogSidebarCount: 'ALL',
          editUrl: 'https://github.com/FinnClair-Su/sukima-ml/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Removed learning and life blog plugins - not needed for art showcase site
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    metadata: [
      { name: 'keywords', content: '隙间月影, 东方Project, 名画同人, Touhou, 同人创作' },
      { name: 'description', content: '隙间月影 - 名画与东方的邂逅，展示经典名画与东方Project角色的同人创作' },
    ],
    navbar: {
      title: '隙间月影 | Sukima Moonlight',
      logo: {
        alt: 'Sukima Moonlight Logo',
        src: 'img/new.jpg',
        width: 32,
        height: 32,
      },
      items: [
        {
          to: '/gallery',
          label: '作品集',
          position: 'left',
          className: 'navbar-sukima-item',
        },
        {
          to: '/about',
          label: '关于我们',
          position: 'left',
          className: 'navbar-sukima-item',
        },
        {
          to: '/blog',
          label: '社团动态',
          position: 'left',
          className: 'navbar-sukima-item',
        },
        {
          to: '/contact',
          label: '联系方式',
          position: 'right',
        },
        // Docs section commented out - can be enabled later if needed
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: '文档',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '导航',
          items: [
            {
              label: '作品集',
              to: '/gallery',
            },
            {
              label: '关于我们',
              to: '/about',
            },
            {
              label: '社团动态',
              to: '/blog',
            },
            {
              label: '联系方式',
              to: '/contact',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: 'Bilibili',
              href: 'https://space.bilibili.com/368984327',
            },
            {
              label: 'Pixiv',
              href: 'https://www.pixiv.net/users/placeholder',
            },
            {
              label: 'QQ群',
              to: '/qq-group',
            },
          ],
        },
        {
          title: '社团资源',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/FinnClair-Su',
            },
            {
              label: '创作者主页',
              href: 'https://fcsu.dev',
            },
            {
              label: 'Email',
              href: 'mailto:kanade271828@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 隙间月影 Sukima Moonlight. Built with ❤️ and Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'diff', 'json', 'python', 'yaml'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // algolia: {
    //   // 如果需要搜索功能，可以配置Algolia
    //   apiKey: 'your-api-key',
    //   indexName: 'your-index-name',
    //   appId: 'your-app-id',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
