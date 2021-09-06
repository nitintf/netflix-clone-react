import { Switch } from "react-router";
import { lazy, Suspense } from "react";

import * as ROUTES from "./constants/routes";
import Loader from "./components/loader";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-authlistener";
import MyListProvider from './context/myList'
import PrivateRoute from "./helpers/private-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Homepage = lazy(() => import("./pages/homepage"));
const Login = lazy(() => import("./pages/login"));
const SignIn = lazy(() => import("./pages/sign-in"));
const Profile = lazy(() => import("./pages/profile"));
const Browse = lazy(() => import("./pages/browse"));

function App() {
  const { user } = useAuthListener();

  return (
    <Suspense
      fallback={
        <div className="page__loader">
          <Loader />
        </div>
      }
    >
      <Switch>
        <UserContext.Provider value={{ user }}>
          <MyListProvider>
            <IsUserLoggedIn path={ROUTES.HOMEPAGE} component={Homepage} exact />
            <IsUserLoggedIn path={ROUTES.LOGIN} component={Login} />
            <IsUserLoggedIn path={ROUTES.SIGN_IN} component={SignIn} />
            <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
            <PrivateRoute path={ROUTES.BROWSE} component={Browse} />
          </MyListProvider>
        </UserContext.Provider>
      </Switch>
    </Suspense>
  );
}

export default App;
