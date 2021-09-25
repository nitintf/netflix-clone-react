import React, { useState, useEffect } from 'react';
import cx from 'classnames'
import SliderContext from '../../context/Slider'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'

import { IMG_PATH } from '../../constants/api'

const Item = ({ movie, poster }) => {

  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    console.log(`window.innerWidth`, window.innerWidth)

    window.addEventListener('resize', (e) => {
      setWindowWidth(e.target.innerWidth)
    })

    return () => {

      window.removeEventListener('resize', (e) => {
        setWindowWidth(e.target.innerWidth)
      })
    }
  }, [])

  return (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      return (
        <div onClick={() => onSelectSlide(movie)}
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <img src={`${IMG_PATH}/${poster || windowWidth < 400 ? movie.poster_path : movie.backdrop_path
            }`} alt={movie.title} />
          <ShowDetailsButton />
          {isActive && <Mark />}
        </div>
      );
    }}
    </SliderContext.Consumer>
  )
};

export default Item;


