import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...params }) => {
  const login = useSelector((state) => state.login);
  console.log(login.sanctum_token);

  return (
    <Route
      {...params}
      render={(props) =>
        login.sanctum_token !== "" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
