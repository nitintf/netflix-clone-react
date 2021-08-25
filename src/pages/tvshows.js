import BillBoard from "../components/browse/billBoard";
import {
  getTopRatedTv,
  getTrendingTv,
  getTvAiringToday,
  getUpComingTv,
} from "../services/api";
import List from "../components/list";

const TvShows = () => {
  return (
    <>
      <BillBoard getData={() => getTopRatedTv(true)} />
      <div className="browse__home">
        <List title="Trending" getData={getTrendingTv} />
        <List title="Airing Today" getData={getTvAiringToday} />
        <List title="Top Rated" getData={getTopRatedTv} poster={true} />
        <List title="UpComing" getData={getUpComingTv} />
      </div>
    </>
  );
};

export default TvShows;
