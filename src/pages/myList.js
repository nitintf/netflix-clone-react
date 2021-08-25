import { useEffect, useState } from "react"

import { getCurrentProfile } from "../services/firebase"
import useUser from "../hooks/use-user"

const MyList = () => {
  const [data, setData] = useState(null);

  const { user } = useUser()

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'))
    const getProfile = async () => {
      const response = await getCurrentProfile(user.docId, profile.profileId)
      setData(response)
    }

    getProfile()
  }, [user.docId])

  return (
    <section className='mylist'>
      <h1 className='mylist__heading'>My List</h1>
      <div className='mylist__content'>
        {data && <h1>{data.profileName}</h1>}
      </div>
    </section>
  )
}

export default MyList
