import Head from 'next/head'
import Header from '../components/header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Pages</title>
      </Head>

      <main className={styles.main}>
        <Header />
      </main>
    </div>
  )
}
