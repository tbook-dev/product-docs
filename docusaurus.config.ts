import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'TBook: The Embedded RWA Liquidity Layer',
  tagline: 'TBook product documentation',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://tbook-dev.github.io',
  baseUrl: '/product-docs/',

  organizationName: 'tbook-dev',
  projectName: 'product-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // .md files (the GitBook-imported pages) are parsed as CommonMark so the
  // raw HTML in the exports (unclosed <br>, <mark style>, <details>, tables,
  // character entities) passes through unchanged; .mdx would reject it.
  markdown: {
    format: 'detect',
  },

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
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      disableSwitch: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'TBook',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/tbook-dev/product-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} TBook. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
