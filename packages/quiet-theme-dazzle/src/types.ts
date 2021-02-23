import { Page } from '@yuzhouu/quiet'

export type ThemeConfig = {
  head?: JSX.Element
  footer: JSX.Element
}

export type PageMeta = {
  filename: string
  route: string
  matterData: { [key: string]: any } & PostMeta
  pageList: Page[]
}

export type PostMeta = {
  title?: string
  author?: string
  date?: string | number
  tag?: string
  description?: string
  series?: string
  type?: 'posts' | 'post' | 'tag'
}
