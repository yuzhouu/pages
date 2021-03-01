import React from 'react'
import Link from 'next/link'
import { useCurrentPage } from './use-current-page'

export default function Meta() {
  const curPage = useCurrentPage()!
  const tags = curPage.matterData.tag ? curPage.matterData.tag.split(',').map((s) => s.trim()) : []

  return (
    <div className="meta-line">
      <div className="meta">
        {curPage.matterData.description && (
          <blockquote>{curPage.matterData.description}</blockquote>
        )}

        <div>
          {tags.map((t) => {
            return (
              <Link key={t} href="/tags/[tag]" as={`/tags/${t}`}>
                <a className="tag">{t}</a>
              </Link>
            )
          })}
        </div>

        {curPage.matterData.date && (
          <time>{new Date(curPage.matterData.date).toLocaleDateString()}</time>
        )}
      </div>
    </div>
  )
}
