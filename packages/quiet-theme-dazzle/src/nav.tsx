import React from 'react'
import Link from 'next/link'
import { Page } from '@yuzhouu/quiet'

export default function Nav({ navPages }: { navPages: Array<Page & { active?: boolean }> }) {
  return (
    <div className="nav-line">
      {navPages.map((page) => {
        if (page.active) {
          return (
            <span key={page.route} className="nav-link">
              {(page as any).frontMatter.title || page.name}
            </span>
          )
        }
        return (
          <Link key={page.route} href={page.route}>
            <a className="nav-link">{(page as any).frontMatter.title || page.name}</a>
          </Link>
        )
      })}
    </div>
  )
}
