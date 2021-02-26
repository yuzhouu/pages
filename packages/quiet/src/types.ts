export type QuietConfig = {
  theme?: string
  themeConfig?: string
  mdxOptions?: any
}

export type LoaderOptions = Pick<QuietConfig, 'theme' | 'themeConfig'>

export type PageDir = {
  name: string
  children: Page[]
  route: string
  matterData: never
}

export type PageMD = {
  name: string
  route: string
  matterData?: {
    [key: string]: any
  }
}

export type Page = PageDir | PageMD
