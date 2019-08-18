import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./pages/Main";
import Busca from "./pages/Busca";
import Login from "./pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/busca" component={Busca} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}
