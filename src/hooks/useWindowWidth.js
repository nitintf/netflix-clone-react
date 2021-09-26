import { useState, useEffect } from 'react'

const useWindowWidth = () => {

  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', (e) => {
      setWindowWidth(e.target.innerWidth)
    })

    return () => {

      window.removeEventListener('resize', (e) => {
        setWindowWidth(e.target.innerWidth)
      })
    }
  }, [])


  return { windowWidth }
}

export default useWindowWidth
