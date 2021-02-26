/** @jsx jsx */
import { jsx } from '@emotion/react'
import Head from 'next/head'
import '@yuzhouu/quiet-theme-dazzle/dist/style.css'
import { GlobalStyles } from 'twin.macro'
import Header from '../components/header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
