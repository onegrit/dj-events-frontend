import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Search.module.css'

function Search() {
  const [term, setTerm] = useState('')
  const router = useRouter()
  const submitHandler = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }
  return (
    <div className={styles.search}>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder='search events'
        />
      </form>
    </div>
  )
}

export default Search
