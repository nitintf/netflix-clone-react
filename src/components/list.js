import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from '../components/Slider/index'

import { IMG_PATH } from "../constants/api"

const List = ({ title, getData, poster }) => {
  let executed = false
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const { ref, inView } = useInView();


  useEffect(() => {
    const dataRequest = async () => {
      if (inView && !executed) {
        executed = true;
        const data = await getData();
        setMovies(data.filter(i => i.backdrop_path && i.poster_path));
        setInterval(() => {
          setShow(true);
        }, 1000);
      }
    };

    dataRequest();


  }, [inView]);

  return (
    <div ref={ref} className="list">
      {show ? (
        <div className="list__title">{title}</div>
      ) : (
          <div style={{ marginLeft: '3.43rem' }}>
          <SkeletonTheme color="#222" highlightColor="#333">
          <Skeleton
            count={1}
            height={25}
            width={100}
            style={{ marginBottom: "1rem" }}
          />
            </SkeletonTheme>
          </div>
      )}

      {show && (
        movies?.length > 0 ? (
          <>
            <Slider poster={poster}>
              {movies.map(movie => (
                <Slider.Item movie={movie} key={movie.id} poster={poster}>item</Slider.Item>
              ))}
            </Slider>
          </>
        ) : <p className='show-message'>Sorry, We don't have any data for this!</p>
      )
      }

      {!show && (
        <div style={{ marginLeft: '3.43rem' }}>
          <SkeletonTheme color="#222" highlightColor="#333" >
            {poster ?
              <Skeleton
                count={5}
                height={300}
                width={230}
                style={{ marginRight: "1rem" }}
              /> :
              <Skeleton
                count={4}
                height={150}
                width={300}
                style={{ marginRight: "1rem" }}
              />}

          </SkeletonTheme>
        </div>
      )}
    </div>
  );
};

export default List;
