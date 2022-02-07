import Head from 'next/head'
import styles from '../styles/Layout.module.css'
export default function Layout({ title, description, keywords, children }) {
  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <title>{title}</title>
      </Head>
      <div className={styles.container}>{children}</div>
    </>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
}
