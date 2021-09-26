import { createContext, useState } from "react";

export const TrailerVideoContext = createContext({
  showTrailer: false,
  error: false,
  trailerVideo: null,
  setTrailerVideo: () => { },
  setError: () => { },
  setShowTrailer: () => { },
})

const TrailerProvider = ({ children }) => {
  const [trailerVideo, setTrailerVideo] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [error, setError] = useState(false)

  return (
    <TrailerVideoContext.Provider value={{ trailerVideo, setTrailerVideo, showTrailer, setShowTrailer, error, setError }}>
      {children}
    </TrailerVideoContext.Provider>
  )
}

export default TrailerProvider