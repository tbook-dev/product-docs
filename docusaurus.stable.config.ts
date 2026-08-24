import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

/**
 * Standalone Docusaurus instance for the Stablecoin Settlement & Save
 * developer docs, served at https://docs.tbook.com/stable/ — a sibling of
 * the /tbook/ product space, mirroring how the RWA Platform has its own
 * site at rwa-docs.tbook.com. Built from the same npm install via
 * `npm run build:stable`; the deploy workflow nests this build under
 * stable/ in the Pages artifact.
 */
const config: Config = {
  title: 'TBook Settlement & Save',
  tagline:
    'Move and hold stablecoin value for your users — one REST API plus signed webhooks',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://docs.tbook.com',
  baseUrl: '/stable/',

  organizationName: 'tbook-dev',
  projectName: 'product-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

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
          path: 'docs-stable',
          sidebarPath: './sidebars.stable.ts',
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
          label: 'Settlement & Save',
        },
        {
          href: 'https://docs.tbook.com/tbook/',
          label: 'TBook Docs',
          position: 'right',
        },
        {
          href: 'https://rwa-docs.tbook.com/',
          label: 'RWA Platform',
          position: 'right',
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
