import BillBoard from "../components/browse/billBoard";
import {
  getTopRatedMovies,
  getUpComingMovies,
  getNowPlaying,
  getTrendingMovies,
} from "../services/api";
import List from "../components/list";

const Movies = () => {
  return (
    <>
      <BillBoard getData={() => getTopRatedMovies(true)} />

      <div className="browse__home">
        <List title="Now Playing" getData={getNowPlaying} />
        <List title="Top Rated " getData={getTopRatedMovies} poster={true} />
        <List title="Up Coming " getData={getUpComingMovies} />
        <List title="Trending Now" getData={getTrendingMovies} poster={false} />
      </div>
    </>
  );
};

export default Movies;
