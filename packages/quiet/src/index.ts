import { QuietConfig } from './types'
const defaultExtensions = ['js', 'jsx', 'ts', 'tsx']
const markdownExtensions = ['md', 'mdx']
const markdownExtensionTest = /\.mdx?$/

export default (theme: string | QuietConfig, themeConfig?: string) => (nextConfig: any = {}) => {
  const quietConfig: QuietConfig =
    typeof theme === 'string'
      ? {
          theme,
          themeConfig,
        }
      : theme
  const locales = nextConfig.i18n?.locales
  const defaultLocale = nextConfig.i18n?.defaultLocale

  let pageExtensions = nextConfig.pageExtensions || [...defaultExtensions]
  if (locales) {
    console.log('You have i18n enabled for Quiet.')
    if (!defaultLocale) {
      console.error('Default locale is missing.')
    }

    // We have to map locales in the path to their correct pages.
    const originalRewrites = nextConfig.rewrites ? nextConfig.rewrites() : []
    nextConfig.rewrites = async () => {
      return [
        ...originalRewrites,
        ...locales.flatMap((locale: string) => [
          {
            source: `/${locale}`,
            destination: `/index.${locale}`,
            locale: false,
          },
          {
            source: `/${locale}/:path*`,
            destination: `/:path*.${locale}`,
            locale: false,
          },
        ]),
      ]
    }

    // TODO: We have to redirect page with locale ententions,
    // for example /page.en to /en/page.

    // TODO: We don't have a good way to redirect missing locales
    // to the default locale. Which is fine for now.
  }
  pageExtensions = pageExtensions.concat(markdownExtensions)

  return Object.assign({}, nextConfig, {
    pageExtensions,
    webpack(config: any, options: any) {
      config.module.rules.push({
        test: markdownExtensionTest,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: quietConfig.mdxOptions,
          },
          {
            loader: '@yuzhouu/quiet/loader',
            options: {
              theme: quietConfig.theme,
              themeConfig: quietConfig.themeConfig,
              locales,
              defaultLocale,
            },
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
