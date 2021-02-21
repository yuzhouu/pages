export type QuietConfig = {
  theme?: string
  themeConfig?: string
  mdxOptions?: any
}

export type LoaderOptions = {
  locales?: string[]
  defaultLocale?: string
} & Pick<QuietConfig, 'theme' | 'themeConfig'>
