import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Busca.css";

import api from "../services/api";

//Imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";

export default function Busca() {
  const [original, setOriginal] = useState([]); //recebe os valores da API sem nenhum filtro
  const [products, setProducts] = useState([]); //aqui deve receber os valores após o filtro
  const [apply, setApply] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product");
      setOriginal(response.data.product);
    }
    loadProducts();
  }, []);

  const enviar = event => {
    const auxValues = { ...values };
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  function handleChange(event) {
    const { value, name } = event.target;

    var filtered = original.filter(
      el => el[name] === value || el[name] === parseInt(value)
    );
    setApply(true);
    setProducts(filtered);
    console.log("orginal", original);
    console.log("filtrado", filtered);
    console.log("products", products);
    debugger;
  }

  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Nexo Imobiliária" className="logo" />
          </Link>
        </div>
        <div className="search">
          <ul>
            <li>
              O que você está procurando ?
              <button className="btn1">Alugar</button>
              <button className="btn1">Comprar</button>
            </li>

            <li>
              Em qual local ?<br />
              <label>
                <select className="no-border">
                  <option>Selecione</option>
                </select>
              </label>
            </li>

            <li>
              O qual tipo de imóvel ?<br />
              <label>
                <select
                  className="no-border"
                  name="category"
                  onChange={handleChange}
                >
                  <option hidden>Selecione</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>Lote</option>
                </select>
              </label>
            </li>

            <li>
              <label>
                <img src={bed} alt="Quartos" className="icone" />
                <select
                  className="no-border"
                  name="bedrooms"
                  onChange={handleChange}
                >
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
                <img src={car} alt="Carro" className="icone" />
                <select className="no-border">
                  <option>Vagas</option>
                  <option>2</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </label>
            </li>

            <li>
              <label>
                <img src={fullsize} alt="Tamanho" className="icone" />
                <select className="no-border">
                  <option>Tamanho</option>
                </select>
              </label>
            </li>
          </ul>
        </div>
      </nav>
      {apply === false ? (
        <h1>Original</h1>
      ) : products.length > 0 ? (
        <h1>Filtrado </h1>
      ) : (
        <h1>Filtro Vazio</h1>
      )}
    </div>
  );
}
