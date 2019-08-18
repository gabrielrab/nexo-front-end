import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import logo from "../assets/logo.svg";

export default function() {
  return (
    <div className="login-container">
      <form>
        <Link to="/">
          <img src={logo} alt="Nexo" />
        </Link>
        <input placeholder="Digite seu usuário" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
