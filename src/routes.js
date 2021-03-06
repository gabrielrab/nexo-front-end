import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { isAutenticated } from "./services/auth";

import Login from "./pages/Login";
import Create from "./pages/Create";
import Dashborad from "./pages/Dashborad";
import Product from "./pages/Product";
import Edit from "./pages/Edit";
import First from "./pages/First";

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
      <Route path="/" exact component={First} />
      <Route path="/busca" component={First} />
      <Route path="/login" component={Login} />
      <PrivatedRoute path="/create" component={Create} />
      <PrivatedRoute path="/dashboard" component={Dashborad} />
      <PrivatedRoute path="/edit/:id" component={Edit} />
      <Route path="/product/:id" component={Product} />
    </BrowserRouter>
  );
}
