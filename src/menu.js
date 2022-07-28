import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiBook,
  mdiGithub,
  mdiDiscord,
  mdiLinkedin,
  mdiTwitter,
  mdiEarth,
  mdiViewStream,
  mdiAccount,
  mdiAccountGroup,
  mdiWallet,
  mdiCashMultiple,
  mdiStore,
  mdiTools,
  mdiVote,
  mdiLayersTriple,
  mdiAndroidMessages,
  mdiLock,
  mdiAlertCircle,
  mdiMonitorShimmer,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette
} from '@mdi/js'

export default [
  'Eco',
  [
    {
      to: '/dashboard',
      icon: mdiDesktopMac,
      label: 'Nomics'
    },
    {
      icon: mdiViewStream,
      label: 'Verse',
      menu: [
        {
          // to: '/dashboard',
          icon: mdiStore,
          label: 'Market'
        },
        {
          label: 'Organizations',
          icon: mdiLayersTriple,
          menu: [
            {
              // to: '/dashboard',
              icon: mdiTools,
              label: 'Create'
            },
            {
              // to: '/dashboard',
              icon: mdiStore,
              label: 'Explore'
            },
          ]
        }
      ]
    },
  ],
  'User',
  [
    {
      to: '/profile',
      icon: mdiAccount,
      label: 'Profile'
    },
    {
      to: '/wallets',
      icon: mdiWallet,
      label: 'Wallets'
    },
    {
      label: 'Apps',
      icon: mdiLayersTriple,
      menu: [
        {
          to: '/apps/finance',
          label: 'Finance',
        },
      ]
    }
  ],
  'Governance',
  [
    {
      label: 'Delegates',
      icon: mdiLayersTriple,
      menu: [
        {
          label: 'Register',
          icon: mdiVote,
        },
        {
          to: '/dashboard',
          icon: mdiVote,
          label: 'Vote'
        },
      ]
    },
    {
      label: 'Proposal',
      icon: mdiLayersTriple,
      menu: [
        {
          label: 'Create',
          icon: mdiVote,
        },
        {
          label: 'Recent',
          icon: mdiVote,
        }
      ]
    }
  ],
  'About',
  [
    {
      href: 'https://ecosis.network/',
      label: 'Homepage',
      icon: mdiMonitorShimmer,
      target: '_blank'
    },
    {
      href: 'https://docs.ecosis.network/',
      label: 'Documentation',
      icon: mdiBook,
      target: '_blank'
    },
    {
      href: 'https://github.com/AwesomeEcosystem',
      label: 'GitHub',
      icon: mdiGithub,
      target: '_blank'
    },
    {
      href: 'https://www.linkedin.com/company/ecosiss/',
      label: 'LinkedIn',
      icon: mdiLinkedin,
      target: '_blank'
    },
    {
      href: 'https://twitter.com/ecosisnetwork',
      label: 'Twitter',
      icon: mdiTwitter,
      target: '_blank'
    },
    {
      href: 'https://discord.gg/9xejeEcH3N',
      label: 'Discord',
      icon: mdiDiscord,
      target: '_blank'
    },
    {
      href: 'https://t.co/kCfN6RJKr5',
      label: 'Telegram',
      icon: mdiAndroidMessages,
      target: '_blank'
    }
  ]
]
