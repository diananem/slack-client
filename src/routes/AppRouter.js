import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import decode from "jwt-decode";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import CreateTeam from "./CreateTeam";
import ViewTeam from "./ViewTeam";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    decode(token);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
};

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/view-team/:team_id?/:channel_id?" component={ViewTeam} />
      <PrivateRoute path="/create-team" component={CreateTeam} />
    </Switch>
  </Router>
);

export default AppRouter;
