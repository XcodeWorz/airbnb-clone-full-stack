import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Register from "./../pages/Register";
import Login from "./../pages/Login";
import FancyRoute from "./../components/FancyRoute";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <FancyRoute exact path="/register" component={Register} />
      <FancyRoute exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);
