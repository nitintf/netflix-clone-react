import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails, getTvDetails, getSimilarMovies, getSimilarTv, getCollection } from "../services/api";

import DetailBanner from "../components/detail/detailBanner";
import DetailAbout from "../components/detail/detailAbout";
import Season from "../components/detail/season";
import List from '../components/list'

const Detail = () => {
  const [data, setData] = useState();
  const { type, id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (type === "movie") {
        const movieDetails = await getMovieDetails(id);
        setData(movieDetails);
      }
      if (type === "tv") {
        const tvDetails = await getTvDetails(id);
        setData(tvDetails);
      }
    };

    getData();

    return () => {
      setData(null)
    }
  }, [id, type]);

  return (
    <>
      <section className="info">
        {data && (
          <>
            <DetailBanner data={data} type={type} />
            <DetailAbout data={data} type={type} />
            {type === 'tv' &&
              <>
                <Season id={id} SeasNum={data.number_of_seasons} />
                <List title="Recommended" getData={() => getSimilarTv(id)} poster={true} />
              </>
            }
            {type === 'movie' &&
              <>
              {data.belongs_to_collection ?
                  <List title="Collection" getData={() => getCollection(data.belongs_to_collection.id)} poster={true} />
                  : <List title="More Like This" getData={() => getSimilarMovies(id)} poster={true} />
                }
              </>
            }
          </>
        )}
      </section>
    </>
  );
};

export default Detail;
