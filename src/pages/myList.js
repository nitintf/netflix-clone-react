import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { SkeletonTheme } from "react-loading-skeleton"

import { getCurrentProfile } from "../services/firebase"
import useUser from "../hooks/use-user"
import { IMG_PATH } from "../constants/api"
import useWindowWidth from "../hooks/useWindowWidth"

const MyList = () => {
  const [data, setData] = useState(null);
  const { user } = useUser()

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'))
    const getProfile = async () => {
      const response = await getCurrentProfile(user.docId, profile.profileId)
      setData(response?.myList)
    }

    getProfile()
  }, [user.docId])

  const { windowWidth } = useWindowWidth()

  return (
    <section className='mylist'>
      <h1 className='mylist__heading'>My List</h1>
      <div className='mylist__content'>
        <div className='list__items'>
          {data ? (data?.length > 0 ? (data.map((item) => {
            return item.poster_path && (
              <Link
                key={item.id}
                to={`/browse/${item.type}/${item.id}`}
                className="list__items--image"
              >
                <img
                  className="list__items--img  list__items--poster"
                  src={`${IMG_PATH}/${item.poster_path
                    }`}
                  alt={item.title}
                />
              </Link>
            )
          }
          )) : <p className='show-message'>Add Some Movies and Tv Shows to see them here</p>) : <SkeletonTheme color="#222" highlightColor="#333">
            <Skeleton
                count={windowWidth < 500 ? 2 : 5}
                height={windowWidth < 500 ? 150 : 300}
                width={windowWidth < 500 ? 120 : 230}
                style={{ marginRight: "1rem", marginTop: '1rem' }}
              />
          </SkeletonTheme>}

        </div>
      </div>
    </section>
  )
}

export default MyList
