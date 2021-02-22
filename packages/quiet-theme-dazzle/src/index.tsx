import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from './layout'
import traverse from './utils/traverse'
import getTitle from './utils/get-title'
import getTags from './utils/get-tags'
import sortPage from './utils/sort-page'
import { ThemeConfig, PageMeta } from './types'
import { Page, PageDir } from '@yuzhouu/quiet'

export default (meta: PageMeta, _config: Omit<ThemeConfig, 'readMore' | 'footer'>) => {
  const config: ThemeConfig = Object.assign(
    {
      readMore: 'Read More →',
      footer: (
        <small style={{ display: 'block', marginTop: '8rem' }}>CC BY-NC 4.0 2020 © Yu Zhou.</small>
      ),
    },
    _config
  )

  // gather info for tag/posts pages
  let posts: Page[] | null = null
  let navPages: Array<Page & { active?: boolean }> = []
  const matterType = meta.matterData.type
  const route = meta.route

  if (matterType) {
    traverse(meta.pageList, page => {

    })
  }

  // This only renders once per page
  if (type === 'posts' || type === 'tag' || type === 'page') {
    posts = []
    // get all posts
    traverse(meta.pageList, (page) => {
      if ((page as PageDir).children) return
      if (page.name.startsWith('_')) return

      if (page.frontMatter && ['page', 'posts'].includes(page.frontMatter.type)) {
        if (page.route === route) {
          navPages.push({ ...page, active: true })
        } else {
          navPages.push(page)
        }
      }

      if (type === 'posts' && !page.route.startsWith(route === '/' ? route : route + '/')) return
      if (
        type !== 'page' &&
        (!page.frontMatter || !page.frontMatter.type || page.frontMatter.type === 'post')
      ) {
        posts!.push(page)
      }
    })
    posts = posts.sort(sortPage as any)
    navPages = navPages.sort(sortPage as any)
  }

  // back button
  let back: string | undefined
  if (matterType !== 'post') {
  } else {
    const parentPages: Page[] = []
    traverse(meta.pageList, (page) => {
      if (
        route !== page.route &&
        (route + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
      ) {
        parentPages.push(page)
      }
    })
    const parentPage = parentPages
      .reverse()
      .find((page) => page.frontMatter && page.frontMatter.type === 'posts')
    if (parentPage) {
      back = parentPage.route
    }
  }

  return (props: React.PropsWithChildren<{ tagName?: string; [key: string]: any }>) => {
    const router = useRouter()
    const { query } = router

    const type = meta.matterData.type || 'post'
    const queryTag = type === 'tag' ? (query.tag as string) : undefined

    const [titleNode] = getTitle(props.children)
    const title =
      meta.matterData.title ||
      (typeof queryTag === 'undefined'
        ? null
        : titleNode
        ? ReactDOMServer.renderToStaticMarkup((titleNode as any).props.children)
        : null) ||
      ''

    const postList = posts ? (
      <ul>
        {posts.map((post) => {
          if (queryTag) {
            const tags = getTags(post)
            if (!tags.includes(queryTag)) {
              return null
            }
          } else if (type === 'tag') {
            return null
          }

          const postTitle = (post.frontMatter ? post.frontMatter.title : null) || post.name
          const postDate = post.frontMatter ? (
            <time className="post-item-date">{new Date(post.frontMatter.date).toDateString()}</time>
          ) : null
          const postDescription =
            post.frontMatter && post.frontMatter.description ? (
              <p className="post-item-desc">
                {post.frontMatter.description}
                {config.readMore ? (
                  <Link href={post.route}>
                    <a className="post-item-more">{config.readMore}</a>
                  </Link>
                ) : null}
              </p>
            ) : null

          return (
            <div key={post.route} className="post-item">
              <h3>
                <Link href={post.route}>
                  <a className="post-item-title">{postTitle}</a>
                </Link>
              </h3>
              {postDescription}
              {postDate}
            </div>
          )
        })}
      </ul>
    ) : null

    return (
      <Layout
        config={config}
        postList={postList}
        navPages={navPages}
        back={back}
        title={title}
        matterData={{ ...meta.matterData }}
        {...props}
      />
    )
  }
}
