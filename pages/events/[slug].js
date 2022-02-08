import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function EventPage({ evt }) {
  // console.log('EventPage:', evt)
  const attr = evt.attributes
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
          {new Date(attr.date).toLocaleDateString('en-US')} at {attr.time}
        </span>
        <h1>{evt.name}</h1>
        {attr.image.data && (
          <div className={styles.image}>
            <Image
              src={attr.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{attr.performers}</p>
        <h3>Description</h3>
        <p>{attr.description} </p>
        <h3>Venu: {attr.venue}</h3>
        <p>{attr.address}</p>
        <Link href='/events'>
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}
// SSG:Static Site Generation
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&filters[slug][$eq]=${slug}`
  )
  const ret = await res.json()
  const events = ret.data
  console.log('getStaticProps: ', events)
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?[populate]=*&sort[0]=date:asc`)
  const ret = await res.json()
  const events = ret.data
  // 构造paths数据结构
  const paths = events.map((evt) => {
    return {
      params: {
        slug: evt.attributes.slug,
      },
    }
  })
  console.log('getStaticPaths: ', paths)
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
