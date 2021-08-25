import { useEffect, useState } from "react";

import { IMG_PATH } from "../../constants/api";

const Episode = ({ data, id }) => {
  return (
    <div className='episode'>
      <div className='episode__number'>{data.episode_number}</div>
      <div className='episode__content'>
        <div className='episode__img'>
          <img className='episode__img--src' src={`${IMG_PATH}/${data.still_path}`} alt={data.name} />
        </div>
        <div className='episode__info'>
          <h2 className='episode__info--title'>{data.name}</h2>
          <div className='episode__info--small'>
            <span className='episode__info--rating'>Rating {data.vote_average}</span>
            <span className='episode__info--date'>{new Date(data.air_date).toLocaleDateString("en-US", {
              day: 'numeric',
              month: 'short',
              year: "numeric",
            })}</span>
          </div>
          <div className='episode__info--about'>
            <p>{data.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Episode
