import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type { Options as ClassicPresetOptions, ThemeConfig as ClassicThemeConfig } from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NetFUNNEL',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/logo_STCLab.png',

  // ✅ 1. GitHub Pages 도메인
  url: 'https://luvaction.github.io',

  // ✅ 2. 배포될 repo 이름과 일치
  baseUrl: '/docu-test/',

  // ✅ 3. GitHub 정보
  organizationName: 'luvaction',
  projectName: 'docu-test',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/luvaction/docu-test/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/luvaction/docu-test/tree/main/',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies ClassicPresetOptions,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'NetFUNNEL Developer',
      logo: {
        alt: 'NetFUNNEL Logo',
        src: 'img/logo_STCLab.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/luvaction/docu-test',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{label: 'Tutorial', to: '/docs/intro'}],
        },
        {
          title: 'Community',
          items: [
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus'},
            {label: 'Discord', href: 'https://discordapp.com/invite/docusaurus'},
            {label: 'X', href: 'https://x.com/docusaurus'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'GitHub', href: 'https://github.com/luvaction/docu-test'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} STCLab. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies ClassicThemeConfig,
};

export default config;