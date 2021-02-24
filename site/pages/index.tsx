import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Pages</title>
      </Head>

      <main className={styles.main}>
        <h1 className="m-4 font-bold font-serif text-2xl">PAGES</h1>

        <nav className="border-double border-t-2 border-b-2">
          <Link href="/blog">BLOG</Link>
        </nav>
      </main>
    </div>
  )
}
