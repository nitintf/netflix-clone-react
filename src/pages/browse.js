import { lazy, Suspense, useEffect, useContext } from "react";
import { Route, Switch } from "react-router";

import Header from "../components/browse/header";
import * as ROUTES from "../constants/routes";
import Footer from "../components/footer";
import { getCurrentProfile } from "../services/firebase"
import useUser from "../hooks/use-user"
import { MyListContext } from "../context/myList";
import { TrailerVideoContext } from "../context/Trailer";
import TrailerOverlay from "../components/Trailer/TrailerOverlay";

const Home = lazy(() => import("./home"));
const Movies = lazy(() => import("./movies"));
const TvShows = lazy(() => import("./tvshows"));
const Detail = lazy(() => import("./detail"));
const MyList = lazy(() => import("./myList"));
const Search = lazy(() => import('./search'))

const Browse = () => {
  const { user } = useUser()
  const { setMyList } = useContext(MyListContext)
  const { showTrailer } = useContext(TrailerVideoContext)

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'))
    const getProfile = async () => {
      const response = await getCurrentProfile(user.docId, profile.profileId)
      setMyList(response?.myList)
    }

    getProfile()


  }, [user.docId])

  return (
    <>
      {
        showTrailer && (
          <TrailerOverlay />
        )
      }
      <main className="browse">
        <Header />
        <Suspense
          fallback={
            <div
              style={{
                backgroundColor: "black",
                width: "100vw",
                height: "100vh",
              }}
            ></div>
          }
        >
          <Switch>
            <Route path={ROUTES.BROWSE} component={Home} exact />
            <Route path={ROUTES.MOVIES} component={Movies} exact />
            <Route path={ROUTES.TV_SHOWS} component={TvShows} exact />
            <Route path={ROUTES.DETAIL} component={Detail} />
            <Route path={ROUTES.MY_LIST} component={MyList} />
            <Route path={ROUTES.SEARCH} component={Search} />
          </Switch>
        </Suspense>
      </main>
      <Footer bgColor="#141414" />
    </>
  );
};

export default Browse;
