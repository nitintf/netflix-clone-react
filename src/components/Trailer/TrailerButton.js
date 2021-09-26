import React, { useContext } from 'react'
import { BsFillPlayFill } from "react-icons/bs";
import movieTrailer from 'movie-trailer'

import { TrailerVideoContext } from '../../context/Trailer'
import { MessageContext } from '../../context/Message';

const TrailerButton = ({ id }) => {

  const { setError, setShowTrailer, setTrailerVideo } = useContext(TrailerVideoContext)
  const { setMessage, setMessageType, setShowMessage } = useContext(MessageContext)

  const handleTrailerVideo = async () => {
    await movieTrailer(null, {
      id: true,
      tmdbId: id,
    }, (error, respose) => {
      console.log(`respose`, respose)

      if (respose === null) {
        setShowTrailer(false)
        setError(true)
        setMessage('Sorry, there is no Trailer for this')
        setMessageType('ALERT')
        setShowMessage(true)
      } else {
        setTrailerVideo(respose)
        setShowTrailer(true)
      }

    })
  }

  return (
    <button className="btn btn--trailer" onClick={handleTrailerVideo}>
      <BsFillPlayFill className="btn--icon" />
      Trailer
    </button>
  )
}

export default TrailerButton
