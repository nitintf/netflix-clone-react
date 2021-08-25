import BillBoard from "../components/browse/billBoard";
import List from "../components/list";

import {
  getTrendingMovies,
  getTopRatedTv,
  getUpComingMovies,
  getTvAiringToday,
  getTopRatedMovies,
  getUpComingTv,
} from "../services/api";

const Home = () => {
  return (
    <>
      <BillBoard getData={() => getTrendingMovies(true)} />
      <div className="browse__home">
        <List title="Trending Now" getData={getTrendingMovies} poster={false} />
        <List title="Trending TV Shows" getData={getTopRatedTv} poster={true} />
        <List title="Up Coming Movies" getData={getUpComingMovies} />
        <List title="TV Airing Today" getData={getTvAiringToday} />
        <List title="UpComing TV Episodes" getData={getUpComingTv} />
        <List
          title="Top Rated Movies"
          getData={getTopRatedMovies}
          poster={true}
        />
      </div>
    </>
  );
};

export default Home;
