import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Register from "./../pages/Register";
import Login from "./../pages/Login";
import ForgotPassword from "./../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import FancyRoute from "./../components/FancyRoute";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <FancyRoute exact path="/register" component={Register} />
      <FancyRoute exact path="/login" component={Login} />
      <FancyRoute exact path="/forgot-password" component={ForgotPassword} />
      <FancyRoute
        exact
        path="/change-password/:key"
        component={ChangePassword}
      />
    </Switch>
  </BrowserRouter>
);
