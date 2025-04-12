import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type { Options as ClassicPresetOptions, ThemeConfig as ClassicThemeConfig } from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NetFUNNEL',
  tagline: 'Traffic, Control, Save',
  favicon: 'img/logo_STCLab.png', // ← 로고명도 통일

  url: 'https://luvaction.github.io',
  baseUrl: '/docu-test/',

  organizationName: 'luvaction',
  projectName: 'docu-test',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/luvaction/docu-test/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies ClassicPresetOptions,
    ],
  ],

  themeConfig: {
    image: 'img/netfunnel_card.png', // ← SNS 공유용 이미지
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
          label: 'Guide',
        },
        // 커스텀: 깃허브 링크 제거 or 아래에 노출할 수 있음
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'NetFUNNEL',
          items: [
            {
              label: 'Guide',
              to: '/docs/intro',
            },
            {
              label: 'STCLab 홈페이지',
              href: 'https://www.stclab.com',
            },
          ],
        },
        {
          title: '연락처',
          items: [
            {
              label: '기술지원 문의',
              href: 'mailto:support@stclab.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} STCLab Inc. All rights reserved.`,
    },
    prism: {
      additionalLanguages: ['groovy', 'kotlin'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies ClassicThemeConfig,
};

export default config;
