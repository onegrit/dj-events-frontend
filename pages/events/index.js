import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventsPage({ events }) {
  console.log(events)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt />)
      ) : (
        <h3>No events to show</h3>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events)
  return {
    props: { events },
    revalidate: 1,
  }
}
