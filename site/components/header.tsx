/** @jsx jsx */
import { jsx } from '@emotion/react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'

const logoStyle = css`
  width: 32px;
  height: 32px;
`

const navItemStyle = css`
  ${tw`mx-5 text-lg text-white`}
  cursor: pointer;
`

export default function Header() {
  return (
    <header tw="w-full py-5">
      <nav tw="container mx-auto flex items-center">
        <Link href="/">
          <a css={[logoStyle]}>
            <img src="/pages.svg" alt="" />
          </a>
        </Link>
        <div tw="py-0.5 px-1 bg-black ml-10">
          <Link href="/">
            <a css={navItemStyle}>Home</a>
          </Link>
          <Link href="/blog">
            <a css={navItemStyle}>Blog</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}
