import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { isAutenticated } from "./services/auth";

import Main from "./pages/Main";
import Busca from "./pages/Busca";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Dashborad from "./pages/Dashborad";
import Product from "./pages/Product";

const PrivatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAutenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/busca" component={Busca} />
      <Route path="/login" component={Login} />
      <PrivatedRoute path="/create" component={Create} />
      <PrivatedRoute path="/dashboard" component={Dashborad} />
      <Route path="/product/:id" component={Product} />
    </BrowserRouter>
  );
}
