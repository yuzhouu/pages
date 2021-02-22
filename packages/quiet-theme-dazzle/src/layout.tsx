import React from 'react'
import Head from 'next/head'
import Meta from './meta'
import Nav from './nav'
import MDXTheme from './mdx-theme'
import getTitle from './utils/get-title'
import { ThemeConfig, PageMeta } from './types'
import { Page } from '@yuzhouu/quiet'

export default function Layout({
  config,
  matterData,
  navPages,
  postList,
  back,
  title,
  children,
}: {
  config: ThemeConfig
  matterData: PageMeta['matterData']
  navPages: Array<Page & { active?: boolean }>
  postList: JSX.Element | null
  back: string | undefined
  title: string | null
  [key: string]: any
}): JSX.Element {
  const [titleNode, contentNodes] = getTitle(children)
  const type = matterData.type || 'post'

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        {config.head || null}
      </Head>
      <article className="container prose prose-sm md:prose">
        {titleNode}
        {type === 'post' ? <Meta {...matterData} back={back} /> : <Nav navPages={navPages} />}
        <MDXTheme>{contentNodes!}</MDXTheme>
        {postList}

        {config.footer}
      </article>
    </React.Fragment>
  )
}
