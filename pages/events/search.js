import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'

export default function SearchPage({ events }) {
  console.log(events)
  const router = useRouter()
  return (
    <Layout title='Search Results '>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 ? (
        <h3>No results to show</h3>
      ) : (
        events.map((evt) => (
          <EventItem key={evt.attributes.slug} evt={evt.attributes} />
        ))
      )}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    populate: '*',
    filters: {
      $or: [
        { name: { $containsi: term } },
        { performers: { $containsi: term } },
        { description: { $containsi: term } },
        { venue: { $containsi: term } },
      ],
    },
  })
  const res = await fetch(`${API_URL}/api/events?${query}`)
  const ret = await res.json()
  const events = ret.data
  console.log(events)
  // console.log(events)
  return {
    props: { events },
  }
}
