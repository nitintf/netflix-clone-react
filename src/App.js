import { Route, Switch } from "react-router";
import { lazy, Suspense } from "react";

import * as ROUTES from "./constants/routes";
import Loader from "./components/loader";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-authlistener";

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
          <Route path={ROUTES.HOMEPAGE} component={Homepage} exact />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.BROWSE} component={Browse} />
        </UserContext.Provider>
      </Switch>
    </Suspense>
  );
}

export default App;
