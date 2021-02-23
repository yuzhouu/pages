import path from 'path'
import { getOptions } from 'loader-utils'
import grayMatter from 'gray-matter'
import slash from 'slash'

import filterRouteLocale from './filter-route-locale'
import { LoaderOptions } from './types'
import getPageList, { getLocaleFromFilename } from './get-page-list'

export default async function (this: any, source: string) {
  const callback = this.async()

  this.cacheable()

  const options: LoaderOptions = getOptions(this)
  const { theme, themeConfig, locales, defaultLocale } = options

  // Add the entire directory `pages` as the dependency
  // so we can generate the correct page map
  this.addContextDependency(path.resolve('pages'))

  // Generate the page map
  let [pageList, route] = await getPageList(this.resourcePath)

  // Extract frontMatter information if it exists
  const { data: matterData, content } = grayMatter(source)

  // Remove frontMatter from the source
  source = content

  if (!theme) {
    console.error('No theme found!')
    return callback!(null, source)
  }

  let themePath = theme
  let themeConfigPath = themeConfig || null

  // Relative path instead of a package name
  if (theme.startsWith('.') || theme.startsWith('/')) {
    themePath = path.resolve(theme)
  }
  if (themeConfigPath) {
    themeConfigPath = slash(path.resolve(themeConfigPath))
  }

  const filename = this.resourcePath.slice(this.resourcePath.lastIndexOf('/') + 1)

  if (locales) {
    const locale = getLocaleFromFilename(filename)
    if (locale) {
      pageList = filterRouteLocale(pageList, locale!, defaultLocale)
    }
  }

  const prefix = `\nimport { withSSG } from '@yuzhouu/quiet/ssg'
import withTheme from '${themePath}'
${themeConfigPath ? `import themeConfig from '${themeConfigPath}'` : ''}`

  const suffix = `export default function QuietPage (props) {
      return withSSG(
        withTheme(
          {
            filename: "${slash(filename)}",
            route: "${slash(route)}",
            matterData: ${JSON.stringify(matterData)},
            pageList: ${JSON.stringify(pageList)}
          },
          ${themeConfigPath ? 'themeConfig' : 'null'}
        )
      )(props)
    }`

  // Add imports and exports to the source
  source = prefix + '\n\n' + source + '\n\n' + suffix

  return callback!(null, source)
}
