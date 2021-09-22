import { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

import { IMG_PATH } from "../../constants/api";

const BillBoard = ({ getData }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      const movieData = await getData();
      setMovie(movieData);
    };

    getMovie();

    return () => {
      setMovie({})
    }
  }, []);

  return (
    <section className="billboard">
      <div className="billboard__bg">
        <img
          className="billboard__bg--img"
          src={`${IMG_PATH}/${movie.backdrop_path}`}
          alt=""
        />
      </div>
      <div className="billboard__content">
        <div className="billboard__content--image">
          <img
            className="billboard__content--img"
            src={`${IMG_PATH}/${movie.poster_path}`}
            alt=""
          />
        </div>

        <div className="billboard__content--info">
          <h1 className="billboard__content--title">
            {movie.title ||
              movie.original_title ||
              movie.name ||
              movie.original_name}
          </h1>
          <div className="billboard__content--text">
            <span>{movie.overview}</span>
          </div>
          <div className="billboard__content--actions">
            <button className="btn btn--trailer">
              <BsFillPlayFill className="btn--icon" />
              Trailer
            </button>
            <Link
              to={`/browse/${movie.type}/${movie.id}`}
              className="btn btn--info"
            >
              <IoMdInformationCircleOutline className="btn--icon" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillBoard;
