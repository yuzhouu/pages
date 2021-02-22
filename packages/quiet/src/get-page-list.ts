import path from 'path'
import { promises as fs } from 'fs'
import grayMatter from 'gray-matter'
import { Page } from './types'

function removeExtension(name: string): string {
  const match = name.match(/^([^.]+)/)
  return match !== null ? match[1] : ''
}

export function getLocaleFromFilename(name: string): string | undefined {
  const localeRegex = /\.([a-zA-Z-]+)?\.(mdx?|jsx?|json|tsx?)$/
  const match = name.match(localeRegex)
  if (match) return match[1]
  return undefined
}

export default async function getPageList(currentResourcePath: string): Promise<[Page[], string]> {
  const extension = /\.(mdx?|jsx?|tsx?)$/
  const mdxExtension = /\.mdx?$/
  let activeRoute = ''

  async function getFiles(dir: string, parsentRoute: string): Promise<Page[]> {
    const files = await fs.readdir(dir, { withFileTypes: true })

    // go through the directory
    const items = (
      await Promise.all(
        files.map(async (f) => {
          const filePath = path.resolve(dir, f.name)
          const currentRoute = path.join(
            parsentRoute,
            removeExtension(f.name).replace(/^index$/, '')
          )

          if (filePath === currentResourcePath) {
            activeRoute = currentRoute
          }

          if (f.isDirectory()) {
            const children = await getFiles(filePath, currentRoute)
            if (!children.length) return null

            return {
              name: f.name,
              children,
              route: currentRoute,
            }
          } else if (extension.test(f.name)) {
            // MDX or MD
            if (mdxExtension.test(f.name)) {
              const fileContents = await fs.readFile(filePath, 'utf-8')
              const { data } = grayMatter(fileContents)

              if (Object.keys(data).length) {
                return {
                  name: removeExtension(f.name),
                  route: currentRoute,
                  matterData: data,
                  locale: getLocaleFromFilename(f.name),
                }
              }
            }

            return {
              name: removeExtension(f.name),
              route: currentRoute,
              locale: getLocaleFromFilename(f.name),
            }
          }
        })
      )
    )
      .map((item) => {
        if (!item) return
        return { ...item }
      })
      .filter(Boolean)

    return (items as any) as Page[]
  }

  return [await getFiles(path.join(process.cwd(), 'pages'), '/'), activeRoute]
}
