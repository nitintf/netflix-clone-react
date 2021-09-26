import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from '../components/Slider/index'

import useWindowWidth from "../hooks/useWindowWidth";

const List = ({ title, getData, poster }) => {
  let executed = false
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const { ref, inView } = useInView();

  const { windowWidth } = useWindowWidth()

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
          <div style={{ marginLeft: `${windowWidth < 500 ? '1.5rem' : '3.43rem'}` }}>
          <SkeletonTheme color="#222" highlightColor="#333">
          <Skeleton
            count={1}
                height={windowWidth < 500 ? 20 : 25}
                width={windowWidth < 500 ? 70 : 100}
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
        <div style={{ marginLeft: `${windowWidth < 500 ? '1.5rem' : '3.43rem'}` }}>
          <SkeletonTheme color="#222" highlightColor="#333" >
            {poster || windowWidth < 500 ?
              <Skeleton
                count={windowWidth < 500 ? 2 : 5}
                height={windowWidth < 500 ? 180 : 300}
                width={windowWidth < 500 ? 150 : 230}
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
