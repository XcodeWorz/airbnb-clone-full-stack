import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./../pages/Register";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
