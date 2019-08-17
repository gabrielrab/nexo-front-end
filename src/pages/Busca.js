import React from "react";
import { Link } from "react-router-dom";

import "./Busca.css";

//Imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";

let text = "aqui";

export default function Busca() {
  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/login">
            <img src={logo} alt="Nexo Imobiliária" className="logo" />
          </Link>
        </div>
        <div className="search">
          <ul>
            <li>
              O que você está procurando ? {`teste ${text}`}
              <br />
              <label className="buttons">
                <button className="btn1">Alugar</button>
                <button className="btn1">Comprar</button>
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
              <label>
                <img src={bed} alt="Quartos" className="icone" />
                <select className="no-border">
                  <option>Selecione</option>
                </select>
              </label>
            </li>

            <li>
              <label>
                <img src={car} alt="Carro" className="icone" />
                <select className="no-border">
                  <option>Selecione</option>
                </select>
              </label>
            </li>

            <li>
              <label>
                <img src={fullsize} alt="Tamanho" className="icone" />
                <select className="no-border">
                  <option>Seleciona</option>
                </select>
              </label>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main">
        <div className="product">
          <img src="" alt="" />
          <div>
            <div className="infos">
              <span>
                <b>Casa Alto Padrão</b>
                <br />
                B. Viória - Carmo do Cajuru
              </span>
              <b>1000,00</b>
            </div>
            <div className="skills">
              <ul>
                <li>
                  <img src={bed} alt="bed-value" className="icon-min" /> 5
                </li>
                <li>
                  <img src={car} alt="bed-value" className="icon-min" /> 2
                </li>
                <li>
                  <img src={fullsize} alt="bed-value" className="icon-min" /> 24
                  m²
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
