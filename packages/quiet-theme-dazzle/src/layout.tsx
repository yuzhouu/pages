import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Head from 'next/head'
import Meta from './meta'
import MDXTheme from './mdx-theme'
import getTitle from './utils/get-title'
import { ThemeConfig, PageMeta } from './types'
import Posts from './posts'

export default function Layout({
  config,
  matterData,
  children,
}: {
  config: ThemeConfig
  matterData: PageMeta['matterData']
  [key: string]: any
}): JSX.Element {
  const [titleNode, contentNodes] = getTitle(children)
  const type = matterData.type || 'post'
  const title =
    matterData.title ||
    (titleNode
      ? ReactDOMServer.renderToStaticMarkup((titleNode as React.ReactElement).props.children)
      : '')

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        {config.head || null}
      </Head>
      <article className="container prose prose-sm md:prose">
        <h1>{title}</h1>
        {type === 'post' && <Meta />}
        <MDXTheme>{contentNodes!}</MDXTheme>
        {(type === 'posts' || type === 'tag') && <Posts />}

        {config.footer}
      </article>
    </React.Fragment>
  )
}
