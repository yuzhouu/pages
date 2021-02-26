import Head from 'next/head'
import tw from 'twin.macro'
import Header from '../components/header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div tw="container mx-auto">
      <Head>
        <title>Pages</title>
      </Head>

      <main className={styles.main}>
        <Header />
      </main>
    </div>
  )
}
