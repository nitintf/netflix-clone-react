import { Redirect, Route } from "react-router";

const IsUserLoggedIn = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        (!localStorage.getItem("authUser") || !localStorage.getItem("userProfile")) ? (
          <Component {...innerProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/browse",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default IsUserLoggedIn