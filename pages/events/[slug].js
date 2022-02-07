import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function EventPage({ evt }) {
  const deleteEvent = () => {
    console.log('Delete Event')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description} </p>
        <h3>Venu: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href='/events'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}
// SSG:Static Site Generation
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/{slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  // 构造paths数据结构
  const paths = events.map((evt) => {
    params: {
      slug: evt.slug
    }
  })
  return {
    paths,
    fallback: true,
  }
}

//服务端SSR渲染
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/{slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
