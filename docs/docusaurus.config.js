// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  plugins: ['docusaurus-tailwindcss', '@docusaurus/theme-live-codeblock',
    '@docusaurus/plugin-ideal-image', [
      'docusaurus2-dotenv',
      {
        path: './.env',
        safe: true
      }]],
  title: 'React-Terra',
  titleDelimiter: '•',
  tagline: 'Composable hooks & components for building Terra Dapps',
  url: 'https://react-terra.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jkhaui',
  projectName: 'react-terra',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/jkhaui/react-terra/edit/master/docs'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom'
      },
      //announcementBar: {
      //  id: 'warning',
      //  backgroundColor: '#FDA161',
      //  textColor: '#2B2B2B', // Defaults to `#000`.
      //  isCloseable: false, // Defaults to `true`.
      //  content: '⚠️<strong>Warning: This library is in an'
      //    + ' early-stage release. It is not production'
      //    + ' ready</strong>⚠️'
      //},
      colorMode: {
        defaultMode: 'dark'
      },
      navbar: {
        //title: 'React-Terra',
        logo: {
          alt: 'React-Terra Logo',
          src: 'img/react-terra-192.png'
        },
        hideOnScroll: true,
        items: [
          {
            type: 'doc',
            docId: 'intro',
            label: 'API Docs',
            position: 'left'
          }, {
            label: 'What Is Terra',
            to: '/whatIsTerra'
          },
          {
            position: 'right',
            href: 'https://finder.terra.money/columbus-5/address/terra1le9sln7jx79c3hrs7c3pkwgwjrdr8yup22n20m',
            label: `Sponsor us @${['terra1le9sln7jx79c3hrs7c3pkwgwjrdr8yup22n20m'.slice(
              0,
              6
            ), 'terra1le9sln7jx79c3hrs7c3pkwgwjrdr8yup22n20m'.slice(
              -1 * 6,
              'terra1le9sln7jx79c3hrs7c3pkwgwjrdr8yup22n20m'.length
            )].join('...')}`
          },
          {
            href: 'https://github.com/jkhaui/react-terra',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        copyright: `MIT ${new Date().getFullYear()}`,
        style: 'dark'
      },
      prism: {
        defaultLanguage: 'js',
        plugins: ['line-numbers', 'show-language'],
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula')
      }
    })
})
