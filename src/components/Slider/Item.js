import React from 'react';
import cx from 'classnames'
import SliderContext from '../../context/Slider'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'

import { IMG_PATH } from '../../constants/api'

const Item = ({ movie, poster }) => (
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
          <img src={`${IMG_PATH}/${poster ? movie.poster_path : movie.backdrop_path
            }`} alt={movie.title} />
          <ShowDetailsButton />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;


