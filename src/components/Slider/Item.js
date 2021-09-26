import React from 'react';
import cx from 'classnames'
import SliderContext from '../../context/Slider'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'

import { IMG_PATH } from '../../constants/api'
import useWindowWidth from '../../hooks/useWindowWidth';

const Item = ({ movie, poster }) => {

  const { windowWidth } = useWindowWidth()

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


