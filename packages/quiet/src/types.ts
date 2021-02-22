export type QuietConfig = {
  theme?: string
  themeConfig?: string
  mdxOptions?: any
}

export type LoaderOptions = {
  locales?: string[]
  defaultLocale?: string
} & Pick<QuietConfig, 'theme' | 'themeConfig'>

export type PageDir = {
  name: string
  children: Page[]
  route: string
  locale: never
  frontMatter: never
}

export type PageMD = {
  name: string
  route: string
  frontMatter?: {
    [key: string]: any
  }
  locale?: string
}

export type Page = PageDir | PageMD
