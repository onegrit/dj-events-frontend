import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage({ events }) {
  console.log('HomePage: ', events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => (
          <EventItem key={evt.attributes.slug} evt={evt.attributes} />
        ))
      )}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?[populate]=*&sort[0]=date:asc`)
  const ret = await res.json()
  const events = ret.data

  // console.log(events)
  return {
    props: { events },
    revalidate: 1,
  }
}
