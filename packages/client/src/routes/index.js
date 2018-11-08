import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import FancyRoute from "./../components/FancyRoute";
import AuthRoute from "./../components/AuthRoute";

import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Home from "./../pages/Home";
import ForgotPassword from "./../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import CreateAirbnb from "../pages/CreateAirbnb";
import ActionScreen from "./../pages/ActionScreen";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute exact path="/" component={Home} />
      <FancyRoute exact path="/register" component={Register} />
      <FancyRoute exact path="/login" component={Login} />
      <FancyRoute exact path="/forgot-password" component={ForgotPassword} />
      <FancyRoute
        exact
        path="/change-password/:key"
        component={ChangePassword}
      />
      <FancyRoute path="/m/" component={ActionScreen} />
      <AuthRoute needsAuth path="/create-airbnb" component={CreateAirbnb} />
    </Switch>
  </BrowserRouter>
);
