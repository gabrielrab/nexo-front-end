import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import "./Busca.css";

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

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product");
      const { product } = response.data;

      let filtered = product.filter(el => el["option"] === "alugar");
      setOriginal(filtered);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Nexo Imobiliária" className="logo" />
          </Link>
        </div>
        <div className="desc">
          <h1>Alugar</h1>
          <p>
            Este são os imóveis disponíveis para alugar. Utilize nossa página de{" "}
            <Link to="/busca">busca</Link> para aceesar mais informações sobre
            os imóveis.
          </p>
        </div>
      </nav>
      <div className="main">
        {apply === false ? (
          <>
            {original.map(product => (
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
          </>
        ) : products.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="empty">
            Aguarde,
            <br />
            <p>
              ou tente <a href="/busca">redefinir busca</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
