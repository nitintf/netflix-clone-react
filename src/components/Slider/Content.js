import React from 'react';
import { Link } from 'react-router-dom';

import { IMG_PATH } from '../../constants/api';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CgClose } from 'react-icons/cg'
import TrailerButton from '../Trailer/TrailerButton';

const Content = ({ movie, onClose }) => {
  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{
            backgroundImage: `url(${IMG_PATH}/${movie.backdrop_path})`
          }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.title || movie.name || movie.original_name}</div>
          <div className="content__description">
            {movie.overview}
          </div>
          <div className='content__actions'>
            <TrailerButton id={movie.id} />
            <Link
              to={`/browse/${movie.type}/${movie.id}`}
              className="btn btn--info"
            >
              <IoMdInformationCircleOutline className="btn--icon" />
              More Info
            </Link>
          </div>
        </div>
        <button className="content__close" onClick={onClose}>
          <CgClose />
        </button>
      </div>
    </div>
  )
};

export default Content;
