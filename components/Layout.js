import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'
export default function Layout({ title, description, keywords, children }) {
  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <title>{title}</title>
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
}
