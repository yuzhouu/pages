import React from 'react'
import Link from 'next/link'
import getTags from './utils/get-tags'
import { PageDir, PageMD } from '@yuzhouu/quiet'
import { useMetaContext } from './meta-context'
import { useRouter } from 'next/router'
import traverse from './utils/traverse'
import sortPage from './utils/sort-page'

export default function Posts() {
  const meta = useMetaContext()!
  const { query } = useRouter()
  const type = meta.matterData.type
  const queryTag = type === 'tag' ? (query.tag as string) : undefined
  let posts: PageMD[] = []

  traverse(meta.pageList, (page) => {
    if ((page as PageDir).children) return
    if (page.name.startsWith('_')) return
    if (page.frontMatter && page.frontMatter.type !== 'post') return
    if (queryTag) {
      const tags = getTags(page)
      if (!tags.includes(queryTag)) {
        return
      }
    }
    posts.push(page)
  })
  posts = posts.sort(sortPage)

  return (
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

        const postTitle = post.frontMatter?.title || post.name
        const postDate = post.frontMatter?.date ? (
          <time className="post-item-date">
            {new Date(post.frontMatter.date).toLocaleDateString()}
          </time>
        ) : null
        const postDescription = post.frontMatter?.frontMatter.description ? (
          <p className="post-item-desc">
            {post.frontMatter.description}

            <Link href={post.route}>
              <a className="post-item-more">-&gt;</a>
            </Link>
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
  )
}
