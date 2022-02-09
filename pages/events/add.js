import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
export default function AddEventPage() {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venu: '',
    address: '',
    date: '',
    time: '',
    description: '',
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
    // 提交数据
    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    // 是否成功提交
    if (!res.ok) {
      toast.error('Something went wrong.')
    } else {
      // 提交成功后跳转到浏览页面
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
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
      <h1>Add Events Page</h1>
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
            <label htmlFor='venu'>Venu</label>
            <input
              id='venu'
              type='text'
              name='venu'
              value={values.venu}
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
        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  )
}
