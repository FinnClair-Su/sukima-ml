import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/about',
    component: ComponentCreator('/about', '954'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '308'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/xinxian',
    component: ComponentCreator('/blog/authors/xinxian', '3cc'),
    exact: true
  },
  {
    path: '/blog/beginning',
    component: ComponentCreator('/blog/beginning', '43c'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/东方Project',
    component: ComponentCreator('/blog/tags/东方Project', 'c82'),
    exact: true
  },
  {
    path: '/blog/tags/创立',
    component: ComponentCreator('/blog/tags/创立', 'ce1'),
    exact: true
  },
  {
    path: '/blog/tags/名画同人',
    component: ComponentCreator('/blog/tags/名画同人', 'c45'),
    exact: true
  },
  {
    path: '/blog/tags/社团',
    component: ComponentCreator('/blog/tags/社团', 'ddd'),
    exact: true
  },
  {
    path: '/contact',
    component: ComponentCreator('/contact', 'a03'),
    exact: true
  },
  {
    path: '/friends',
    component: ComponentCreator('/friends', 'fc6'),
    exact: true
  },
  {
    path: '/gallery',
    component: ComponentCreator('/gallery', '85d'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/qq-group',
    component: ComponentCreator('/qq-group', 'a46'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '82f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '9a0'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '441'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '7e4'),
                exact: true,
                sidebar: "knowledgeSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
