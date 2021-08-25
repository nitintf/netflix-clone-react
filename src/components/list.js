import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { IMG_PATH } from "../constants/api";

const List = ({ title, getData, poster }) => {
  const [executed, setExecuted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    const dataRequest = async () => {
      if (inView && !executed) {
        setExecuted(true);
        const data = await getData();
        setMovies(data);
        setInterval(() => {
          setShow(true);
        }, 1000);
      }
    };

    dataRequest();

    return () => {
      dataRequest()
    };
  }, [inView, getData, executed]);

  return (
    <div ref={ref} className="list">
      {show ? (
        <div className="list__title">{title}</div>
      ) : (
        <SkeletonTheme color="#222" highlightColor="#333">
          <Skeleton
            count={1}
            height={25}
            width={100}
            style={{ marginBottom: "1rem" }}
          />
        </SkeletonTheme>
      )}

      <div className="list__items">

        {show ? (
          movies.map((movie, i) => {
            return i < 10 && movie.backdrop_path && movie.poster_path ? (
              <Link
                key={movie.id}
                to={`/browse/${movie.type}/${movie.id}`}
                className="list__items--image"
              >
                <img
                  className={`list__items--img ${poster ? "list__items--poster" : "list__items--backdrop"
                    }`}
                  src={`${IMG_PATH}/${poster ? movie.poster_path : movie.backdrop_path
                    }`}
                  alt={movie.title}
                />
              </Link>
            ) : null;
          })
        ) : (
          <SkeletonTheme color="#222" highlightColor="#333">
            <Skeleton
              count={4}
              height={150}
              width={300}
              style={{ marginRight: "1rem" }}
            />
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};

export default List;
