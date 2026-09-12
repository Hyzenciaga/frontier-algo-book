import type {Config} from '@docusaurus/types';
import type {Options, ThemeConfig} from '@docusaurus/preset-classic';

const config: Config = {
  title: '前沿算法手册',
  tagline: '从训练目标到智能体学习，一步一步建立直觉',
  favicon: 'img/favicon.svg',
  url: 'https://hyzenciaga.github.io',
  baseUrl: '/frontier-algo-book/',
  organizationName: 'Hyzenciaga',
  projectName: 'frontier-algo-book',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'zh-Hans', locales: ['zh-Hans']},
  presets: [['classic', {
    docs: {path: 'content', routeBasePath: 'learn', sidebarPath: './sidebars.ts'},
    blog: false,
    theme: {customCss: './src/css/custom.css'},
  } satisfies Options]],
  themeConfig: {
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: false},
    navbar: {
      title: '前沿算法手册', logo: {alt: '', src: 'img/favicon.svg'},
      items: [
        {to: '/learn/roadmap', label: '学习路线', position: 'left'},
        {to: '/papers', label: '论文目录', position: 'left'},
        {href: 'https://github.com/Hyzenciaga/frontier-algo-book', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {style: 'light', copyright: 'Frontier Algo Book · 从直觉出发，回到原始论文。'},
    prism: {additionalLanguages: ['python', 'bash']},
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 3},
  } satisfies ThemeConfig,
};
export default config;
