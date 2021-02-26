/** @jsx jsx */
import { jsx } from '@emotion/react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'

const logoStyle = css`
  width: 32px;
  height: 32px;
`

const navItemStyle = css`
  ${tw`mx-5 text-lg text-gray-700`}
  cursor: pointer;
`

export default function Header() {
  return (
    <header tw="w-full py-5">
      <nav tw="container mx-auto flex items-center">
        <Link href="/">
          <a css={[logoStyle, navItemStyle]}>
            <img src="/pages.svg" alt="" />
          </a>
        </Link>
        <Link href="/blog">
          <a css={navItemStyle}>Blog</a>
        </Link>
      </nav>
    </header>
  )
}
