import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Mirrors the GitBook space navigation exactly (groups, nesting, labels —
 * including the lowercase "whitepaper" group). GitBook pages that have
 * children become categories with link:{type:'doc'}.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      items: ['introduction/overview', 'introduction/our-thesis'],
    },
    {
      type: 'category',
      label: 'Embedded RWA Liquidity Layer',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Introduction',
          link: {type: 'doc', id: 'embedded-rwa-liquidity-layer/introduction'},
          items: [
            'embedded-rwa-liquidity-layer/introduction/product-architecture',
            'embedded-rwa-liquidity-layer/introduction/rwa-distribution-vaults-yield-and-compliance-infrastructure',
            'embedded-rwa-liquidity-layer/introduction/embedded-rwa-rails',
          ],
        },
        'embedded-rwa-liquidity-layer/incentive-passport',
        {
          type: 'category',
          label: 'WISE Credit Score',
          link: {type: 'doc', id: 'embedded-rwa-liquidity-layer/wise-credit-score'},
          items: [
            'embedded-rwa-liquidity-layer/wise-credit-score/philosophy-of-wise-credit',
            'embedded-rwa-liquidity-layer/wise-credit-score/architecture-of-wise',
            {
              type: 'category',
              label: 'Scenarios of WISE Credit',
              link: {
                type: 'doc',
                id: 'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit',
              },
              items: [
                'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit/ton',
                'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit/sui',
                'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit/goplus',
                'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit/artela',
                'embedded-rwa-liquidity-layer/wise-credit-score/scenarios-of-wise-credit/gamebuild',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Verifiable SBT on Sui',
          link: {type: 'doc', id: 'embedded-rwa-liquidity-layer/verifiable-sbt-on-sui'},
          items: [
            'embedded-rwa-liquidity-layer/verifiable-sbt-on-sui/tbook-sbt-contract-business-application-guide',
          ],
        },
        'embedded-rwa-liquidity-layer/tbook-nexus',
        'embedded-rwa-liquidity-layer/karma',
        'embedded-rwa-liquidity-layer/roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Tokenomics',
      collapsible: false,
      items: ['tokenomics/tokenomics'],
    },
    {
      type: 'category',
      label: 'Projects',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'How to Launch an SBT on Sui?',
          link: {type: 'doc', id: 'projects/how-to-launch-an-sbt-on-sui'},
          items: [
            'projects/how-to-launch-an-sbt-on-sui/before-you-start',
            'projects/how-to-launch-an-sbt-on-sui/new-project',
            'projects/how-to-launch-an-sbt-on-sui/deploy-new-sbt',
            'projects/how-to-launch-an-sbt-on-sui/launch-sbt-claim-link',
            'projects/how-to-launch-an-sbt-on-sui/view-and-track-the-data',
          ],
        },
        {
          type: 'category',
          label: 'How to Launch an SBT on TON?',
          link: {type: 'doc', id: 'projects/how-to-launch-an-sbt-on-ton'},
          items: [
            'projects/how-to-launch-an-sbt-on-ton/before-you-start',
            'projects/how-to-launch-an-sbt-on-ton/new-project',
            'projects/how-to-launch-an-sbt-on-ton/deploy-new-sbt',
            'projects/how-to-launch-an-sbt-on-ton/launch-sbt-claim-link',
            'projects/how-to-launch-an-sbt-on-ton/view-and-track-the-data',
          ],
        },
        {
          type: 'category',
          label: 'FAQ',
          link: {type: 'doc', id: 'projects/faq'},
          items: [
            'projects/faq/how-can-i-edit-my-project-profile',
            'projects/faq/how-to-set-up-your-telegram-channel-and-group-for-the-credential-verification',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      collapsible: false,
      items: [
        'developers/custom-off-chain-api-on-sui',
        'developers/custom-off-chain-api-on-ton',
        'developers/loyalty-sbt-data-api-documentation',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsible: false,
      items: [
        'contributing/overview',
        {
          type: 'category',
          label: 'More',
          link: {type: 'doc', id: 'contributing/more'},
          items: [
            {
              type: 'category',
              label: 'TBook Brand Kit',
              link: {type: 'doc', id: 'contributing/more/tbook-brand-kit'},
              items: ['contributing/more/tbook-brand-kit/tbook-token-usdbook-logo'],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'whitepaper',
      collapsible: false,
      items: ['whitepaper/tbook-the-embedded-rwa-liquidity-layer'],
    },
  ],
};

export default sidebars;
