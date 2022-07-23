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
  'General',
  [
    {
      to: '/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    },
    {
      to: '/dashboard',
      icon: mdiViewStream,
      label: 'Feed'
    },
    {
      to: '/dashboard',
      icon: mdiEarth,
      label: 'Explore'
    }
  ],
  'User',
  [
    {
      to: '/dashboard',
      icon: mdiAccount,
      label: 'Profile'
    },
    {
      to: '/dashboard',
      icon: mdiWallet,
      label: 'Wallet'
    },
    {
      to: '/dashboard',
      icon: mdiAccountGroup,
      label: 'Organizations'
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
    },
    {
      href: 'https://github.com/AwesomeEcosystem',
      label: 'GitHub',
      icon: mdiGithub,
      target: '_blank'
    }
  ]
]

// 'Examples',
// [
//   {
//     to: '/tables',
//     label: 'Tables',
//     icon: mdiTable
//   },
//   {
//     to: '/forms',
//     label: 'Forms',
//     icon: mdiSquareEditOutline
//   },
//   {
//     to: '/ui',
//     label: 'UI',
//     icon: mdiTelevisionGuide
//   },
//   {
//     to: '/responsive',
//     label: 'Responsive',
//     icon: mdiResponsive
//   },
//   {
//     to: '/',
//     label: 'Styles',
//     icon: mdiPalette
//   },
//   {
//     to: '/profile',
//     label: 'Profile',
//     icon: mdiAccountCircle
//   },
//   {
//     to: '/login',
//     label: 'Login',
//     icon: mdiLock
//   },
//   {
//     to: '/error',
//     label: 'Error',
//     icon: mdiAlertCircle
//   },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One'
  //     },
  //     {
  //       label: 'Item Two'
  //     }
  //   ]
  // }
// ],
