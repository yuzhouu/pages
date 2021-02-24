import React from 'react'
import Link from 'next/link'
import { useCurrentPageContext } from './current-page-context'
import { Page } from '@yuzhouu/quiet'
import traverse from './utils/traverse'

export default function Meta() {
  const curPage = useCurrentPageContext()!
  const currentRoute = curPage.route
  const tags = curPage.matterData.tag ? curPage.matterData.tag.split(',').map((s) => s.trim()) : []

  let back: string | null = null
  if (curPage.matterData.type === 'post') {
    const parentPages: Page[] = []
    traverse(curPage.pageList, (page) => {
      if (
        currentRoute !== page.route &&
        (currentRoute + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
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
    <div className="meta-line">
      <div className="meta">
        {curPage.matterData.author}
        {curPage.matterData.author && curPage.matterData.date ? ', ' : null}
        {curPage.matterData.date && (
          <time>{new Date(curPage.matterData.date).toLocaleDateString()}</time>
        )}
      </div>
      <div>
        {tags.map((t) => {
          return (
            <Link key={t} href="/tags/[tag]" as={`/tags/${t}`}>
              <a className="tag">{t}</a>
            </Link>
          )
        })}
      </div>
      {back ? (
        <Link href={back}>
          <a className="meta-back">Back</a>
        </Link>
      ) : null}
    </div>
  )
}
