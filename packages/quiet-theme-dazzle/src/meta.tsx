import React from 'react'
import Link from 'next/link'
import { useMetaContext } from './meta-context'
import { Page } from '@yuzhouu/quiet'
import traverse from './utils/traverse'

export default function Meta() {
  const meta = useMetaContext()!
  const currentRoute = meta.route
  const tags = meta.matterData.tag ? meta.matterData.tag.split(',').map((s) => s.trim()) : []

  let back: string | null = null
  if (meta.matterData.type === 'post') {
    const parentPages: Page[] = []
    traverse(meta.pageList, (page) => {
      if (
        currentRoute !== page.route &&
        (currentRoute + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
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

  return (
    <div className="meta-line">
      <div className="meta">
        {meta.matterData.author}
        {meta.matterData.author && meta.matterData.date ? ', ' : null}
        {meta.matterData.date && <time>{new Date(meta.matterData.date)}</time>}
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
