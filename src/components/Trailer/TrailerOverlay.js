import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import YouTube from 'react-youtube';

import { TrailerVideoContext } from '../../context/Trailer'
import useWindowWidth from '../../hooks/useWindowWidth'

const TrailerOverlay = () => {

  const { setShowTrailer, trailerVideo, error } = useContext(TrailerVideoContext)
  const { windowWidth } = useWindowWidth()

  const playerSize = {
    width: windowWidth < 500 ? '350' : '600',
    height: windowWidth < 500 ? '400' : '1000',
  }

  const opts = {
    height: playerSize.height,
    width: playerSize.width,
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    },
  };


  const closeTrailer = () => {
    setShowTrailer(false)
  }

  const onReady = (e) => {
    e.target.playVideo()
  }


  return (
    <section className='trailer'>
      <div className='trailer__close' onClick={closeTrailer}>
        <CgClose />
      </div>
      <div className='trailer__video'>
        <YouTube videoId={trailerVideo} opts={opts} onReady={onReady} />
      </div>
    </section>
  )
}

export default TrailerOverlay
