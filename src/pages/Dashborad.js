import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

import logo from "../assets/logo.svg";

export default function() {
  return (
    <div className="container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Dashboard</h1>
      <Link to="/create">
        <button className="btn">Adicionar Anúncio</button>
      </Link>
      <div className="box-container">
        <div className="box">
          <span>#0001</span>
          <h3>Casa Alto Padrão</h3>
          <p>B. Vitória - Carmo do Cajuru</p>
          <br />
          <label>Adicionado em: 24/08/2019</label>
          <div>
            <Link to="/">
              <button className="btn-das">Editar</button>
            </Link>
            <Link to="/">
              <button className="btn-das">Remover</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
