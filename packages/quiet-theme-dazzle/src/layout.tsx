import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Head from 'next/head'
import Meta from './meta'
import MDXTheme from './mdx-theme'
import getTitle from './utils/get-title'
import { ThemeConfig, PageMeta } from './types'
import Posts from './posts'
import { useCurrentPage } from './use-current-page'
import traverse from './utils/traverse'
import { Page } from '@yuzhouu/quiet'
import Link from 'next/link'

function normalizeFilename(name: string): string {
  const match = name.match(/^([^.]+)/)
  return match !== null ? match[1].split('-').join(' ') : ''
}

export default function Layout({
  config,
  children,
}: {
  config: ThemeConfig
  [key: string]: any
}): JSX.Element {
  const curPage = useCurrentPage()!
  const [titleNode, contentNodes] = getTitle(children)
  const type = curPage.matterData.type || 'post'
  const title =
    curPage.matterData.title ||
    (titleNode
      ? ReactDOMServer.renderToStaticMarkup((titleNode as React.ReactElement).props.children)
      : normalizeFilename(curPage.filename))

  let back: string | null = null
  if (curPage.matterData.type === 'post') {
    const parentPages: Page[] = []
    traverse(curPage.pageList, (page) => {
      if (
        curPage.route !== page.route &&
        (curPage.route + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
      ) {
        parentPages.push(page)
      }
    })
    const parentPage = parentPages
      .reverse()
      .find((page) => page.matterData && page.matterData.type === 'posts')
    if (parentPage) {
      back = parentPage.route
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        {config.head || null}
      </Head>

      <article className="container prose prose-sm md:prose">
        {back ? (
          <Link href={back}>
            <a href="" className="post-back">
              上一级
            </a>
          </Link>
        ) : null}
        <h1>{title}</h1>
        {type === 'post' && <Meta />}
        <MDXTheme>{contentNodes!}</MDXTheme>
        {(type === 'posts' || type === 'tag') && <Posts />}

        {config.footer}
      </article>
    </React.Fragment>
  )
}
