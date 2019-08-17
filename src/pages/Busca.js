import React from "react";
import { Link } from "react-router-dom";

import "./Busca.css";

import logo from "../assets/logo.svg";

export default function Busca() {
  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/login">
            <img src={logo} alt="Nexo Imobiliária" />
          </Link>
        </div>
        <ul>
          <li>
            O que você está procurando ?
            <label>
              <button>Alugar</button>
              <button>Comprar</button>
            </label>
          </li>
        </ul>
      </nav>
    </div>
  );
}
