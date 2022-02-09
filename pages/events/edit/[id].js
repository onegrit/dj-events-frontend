import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
// import moment from 'moment'
import { formatDateForInput } from '@/utils/formatDate'
import 'react-toastify/dist/ReactToastify.css'

export default function EditEventPage({ evt }) {
  const attr = evt.attributes
  const [values, setValues] = useState({
    name: attr.name,
    performers: attr.performers,
    venue: attr.venue,
    address: attr.address,
    // date: evt.date,
    date: formatDateForInput(attr.date), //使用自定义库代替moment
    time: attr.time,
    description: attr.description,
  })

  //TODO: 窗体数据验证

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    //验证数据, Validation, Error Checking
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields.')
    }

    //构造strapi数据
    const data = { data: { ...values } }
    // 提交数据
    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    // 是否成功提交
    if (!res.ok) {
      toast.error('Something went wrong.')
    } else {
      // 提交成功后跳转到浏览页面
      const ret = await res.json()
      // console.log(ret.data.attributes.slug)
      router.push(`/events/${ret.data.attributes.slug}`)
    }
  }

  const handleInputChange = (e) => {
    // console.log('AddEventPage:handleInputChange')
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Add new Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              id='name'
              type='text'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              id='performers'
              type='text'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venu</label>
            <input
              id='venue'
              type='text'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              id='address'
              type='text'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              id='date'
              type='date'
              name='date'
              // value={moment(values.date).format('yyyy-MM-DD')}
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              id='time'
              type='text'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Discription</label>
          <input
            id='description'
            type='textarea'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' value='Update Event' className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}`, { method: 'GET' })
  //TODO:判断是否成功返回数据
  const ret = await res.json()
  // console.log('EditEvent: ', ret.data)

  const evt = ret.data
  return {
    props: { evt },
  }
}
