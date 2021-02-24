import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pages</title>
      </Head>

      <main className={styles.main}>
        <h1>PAGES</h1>
        <Link href="/blog">BLOG</Link>
      </main>
    </div>
  )
}
