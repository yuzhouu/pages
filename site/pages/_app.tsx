import Head from 'next/head'
import '@yuzhouu/quiet-theme-dazzle/dist/style.css'
import { GlobalStyles } from 'twin.macro'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
