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
  const [original, setOriginal] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product");
      setProducts(response.data.product);
      setOriginal(response.data.product);
    }
    loadProducts();
  }, []);

  const handleChange = event => {
    console.log("Click");
    const { value, name } = event.target;
    //const key = event.target.name;
    debugger;
    let filtered = products.filter(function(product) {
      return product.badrooms === 3;
    });
    console.log(filtered);
  };

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
      {products.length > 0 ? (
        <div className="main">
          {products.map(product => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="product" key={product._id}>
                <div className="content-img">
                  <img
                    src={product.imagesURL[0].url}
                    alt=""
                    className="img-product"
                  />
                </div>
                <div className="content-infos">
                  <div className="infos">
                    <span>
                      <b>{product.label}</b>
                      <br />
                      B. {product.district} - {product.city}
                    </span>
                    <label className="price">R$ {product.price},00</label>
                  </div>
                  <div className="skills">
                    <ul>
                      <li>
                        <img src={bed} alt="bed-value" className="icon-min" />
                        {product.bedrooms}
                      </li>
                      <li>
                        <img src={car} alt="bed-value" className="icon-min" />
                        {product.parkingSpaces}
                      </li>
                      <li>
                        <img
                          src={fullsize}
                          alt="bed-value"
                          className="icon-min"
                        />
                        {product.size} m²
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          Aguarde.
          <br />
          Ou tente redefinir a busca.
        </div>
      )}
    </div>
  );
}
