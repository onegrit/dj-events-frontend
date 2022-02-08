import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventsPage({ events }) {
  // console.log(events)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => (
          <EventItem key={evt.attributes.slug} evt={evt.attributes} />
        ))
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
