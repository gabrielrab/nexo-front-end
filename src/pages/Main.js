import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Main.css";
import logo from "../assets/logo.svg";

export default function Main({ history }) {
  const [preFilrer, setPreFilter] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    history.push("/busca");
  };

  const handleChange = value => {
    //code here
  };
  const Label = props => (
    <label className="btn-desabled" onClick={props.onClick}>
      {props.text}
    </label>
  );
  return (
    <main>
      <header>
        <img src={logo} alt="Nexo" />
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      </header>
      <div className="container">
        <h1>Busque pelos melhores imóveis da região.</h1>
        <form className="box-search" onSubmit={handleSubmit}>
          <h1>O que você está procurando?</h1>
          <Label onClick={handleChange("text")} text="Comprar" />
          <button className="btn-desabled">Alugar</button>
          <br />
          <button className="btn">Buscar</button>
        </form>
        <p>
          Imóveis selecionados com alto padrão de qualidade e com a faixa de
          preço que cabe no seu bolso.
        </p>
      </div>
    </main>
  );
}
