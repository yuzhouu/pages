import Head from 'next/head'
import '../styles/globals.css'
import '@yuzhouu/quiet-theme-dazzle/dist/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
