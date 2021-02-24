import React from 'react'
import Link from 'next/link'
import getTags from './utils/get-tags'
import { PageDir, PageMD } from '@yuzhouu/quiet'
import { useCurrentPageContext } from './current-page-context'
import { useRouter } from 'next/router'
import traverse from './utils/traverse'
import sortPage from './utils/sort-page'

export default function Posts() {
  const curPage = useCurrentPageContext()!
  const { query } = useRouter()
  const type = curPage.matterData.type
  const queryTag = type === 'tag' ? (query.tag as string) : undefined
  let posts: PageMD[] = []

  traverse(curPage.pageList, (page) => {
    if ((page as PageDir).children) return
    if (page.name.startsWith('_')) return
    if (!page.matterData || page.matterData.type !== 'post') return
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
        const postTitle = post.matterData?.title || post.name
        const postDate = post.matterData?.date ? (
          <time className="post-item-date">
            {new Date(post.matterData.date).toLocaleDateString()}
          </time>
        ) : null
        const postDescription = post.matterData?.description ? (
          <p className="post-item-desc">
            {post.matterData.description}

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
