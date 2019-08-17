import React from "react";
import { Link } from "react-router-dom";

import "./Busca.css";

//Imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import full-size from "../assets/full-size.svg";

export default function Busca() {
  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/login">
            <img src={logo} alt="Nexo Imobiliária" />
          </Link>
        </div>
        <div className="search">
          <ul>
            <li>
              O que você está procurando ?<br />
              <label>
                <button>Alugar</button>
                <button>Comprar</button>
              </label>
            </li>

            <li>
              Em qual local ?<br />
              <label>
                <select>
                  <option>Selecione</option>
                </select>
              </label>
            </li>

            <li>
              O qual tipo de imóvel ?<br />
              <label>
                <select>
                  <option>Selecione</option>
                </select>
              </label>
            </li>

            <li>
              <img src={car} alt="Carro" className="icone" />
            </li>

            <li>
              O que você está procurando ?<br />
              <label>
                <button>Alugar</button>
                <button>Comprar</button>
              </label>
            </li>

            <li>
              O que você está procurando ?<br />
              <label>
                <button>Alugar</button>
                <button>Comprar</button>
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
