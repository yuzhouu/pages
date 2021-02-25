/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import Link from 'next/link'

const logo = css`
  width: 32px;
  height: 32px;
`

export default function Header() {
  return (
    <header className="w-full">
      <nav className="container mx-auto flex items-center">
        <Link href="/blog">
          <a className="mx-5" css={logo}>
            <img src="/pages.svg" alt="" />
          </a>
        </Link>
        <Link href="/blog">
          <a className="mx-5">Blog</a>
        </Link>
      </nav>
    </header>
  )
}
