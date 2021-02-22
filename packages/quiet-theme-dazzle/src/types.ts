import { Page } from '@yuzhouu/quiet'

export type ThemeConfig = {
  head?: JSX.Element
  readMore: string
  footer: JSX.Element
}

export type PageMeta = {
  filename: string
  route: string
  matterData: { [key: string]: any } & PostMeta
  pageList: Page[]
}

export type PostMeta = {
  author?: string
  date?: string | number
  tag?: string
  description?: string
  status?: 'public' | 'draft'
}
