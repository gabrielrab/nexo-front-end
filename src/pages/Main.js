import React from "react";
import { Link } from "react-router-dom";

import "./Main.css";

import api from "../services/api";

import logo from "../assets/logo.svg";

export default function Main() {
  return (
    <main>
      <header>
        <img src={logo} alt="Nexo" />
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      </header>
      <div class="container">
        <h1>Busque pelos melhores imóveis da região.</h1>
        <div className="box-search">
          <h1>O que você está procurando?</h1>
          <button class="btn-desabled">Comprar</button>
          <button class="btn-desabled">Alugar</button>
          <br />
          <button class="btn">Buscar</button>
        </div>
        <p>
          Imóveis selecionados com alto padrão de qualidade e com a faixa de
          preço que cabe no seu bolso.
        </p>
      </div>
    </main>
  );
}
