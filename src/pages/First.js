import React from "react";
import { Link } from "react-router-dom";

import "./First.css";

//imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";
import hand from "../assets/hand.svg";
import wc from "../assets/wc.svg";
import street from "../assets/street.svg";

export default function() {
  return (
    <>
      <nav>
        <div className="header-nav">
          <img src={logo} alt="nexo" className="logo" />
          <div>
            <span>(37) 99926-3631</span>
            <span>(37) 99963-2301</span>
            <span>(37) 99937-5320</span>
          </div>
        </div>
        <ul>
          <li>
            <span>O que você está procurando ?</span>
            <br />
            <label>
              <select name="option">
                <option hidden>Selecione</option>
                <option value="alugar">Alugar</option>
                <option value="comprar">Comprar</option>
              </select>
            </label>
          </li>

          <li>
            <span>O qual tipo de imóvel ?</span>
            <br />
            <label>
              <select name="category">
                <option hidden>Selecione</option>
                <option>Casa</option>
                <option>Apartamento</option>
                <option>Lote</option>
              </select>
            </label>
          </li>

          <li>
            <span>Cidade: </span>
            <br />
            <label>
              <input name="city" placeholder="Digite aqui" />
            </label>
          </li>

          <li>
            <span>Bairro: </span>
            <br />
            <label>
              <input name="district" placeholder="Digite aqui" />
            </label>
          </li>

          <li>
            <label>
              <img src={street} alt="Rua" className="icon" />
              <input type="text" name="street" placeholder="Rua" />
            </label>
          </li>

          <li>
            <label>
              <img src={fullsize} alt="Tamanho" className="icon" />
              <select name="size">
                <option hidden>Tamanho</option>
                <option value="200">Maior que 200m²</option>
                <option value="300">Maior que 300m²</option>
                <option value="400">Maior que 400m²</option>
                <option value="500">Maior que 500m²</option>
                <option value="600">Maior que 600m²</option>
                <option value="700">Maior que 700m²</option>
              </select>
            </label>
          </li>

          <li>
            <label>
              <img src={wc} alt="Banheiros" className="icon" />
              <input type="number" name="wc" placeholder="Banheiros" />
            </label>
          </li>

          <li>
            <label>
              <img src={bed} alt="Suites" className="icon" />
              <input type="number" name="suites" placeholder="Suites" />
            </label>
          </li>

          <li>
            <label>
              <img src={bed} alt="Quartos" className="icon" />
              <select name="bedrooms">
                <option>Quartos</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
          </li>

          <li>
            <label>
              <img src={car} alt="Vagas" className="icon" />
              <select name="parkingSpaces">
                <option>Vagas</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
          </li>

          <li>
            <label>
              <img src={hand} alt="Preco" className="icon" />
              <input type="number" name="price" placeholder="Preco" />
            </label>
          </li>
        </ul>
        <div className="list-btns">
          <button className="btn2">+ Filtros</button>
          <button className="btn1">Limpar</button>
        </div>
      </nav>
    </>
  );
}
