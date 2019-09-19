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

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product");
      setOriginal(response.data.product);
    }
    loadProducts();
  }, []);

  async function handleChange(event) {
    event.preventDefault();
    const { value, name } = event.target;

    debugger;

    let filtered;

    apply === false
      ? (filtered = original.filter(
          el => el[name] === value || el[name] === parseInt(value)
        ))
      : (filtered = products.filter(
          el => el[name] === value || el[name] === parseInt(value)
        ));

    setApply(true);
    await setProducts(filtered);
  }

  async function handleChangeWord(event) {
    event.preventDefault();
    const { value, name } = event.target;

    let filtered;

    apply === false
      ? (filtered = original.filter(el => {
          const comp = `${el["district"]}${el["city"]}`.toLocaleLowerCase();

          let filtered = comp.includes(value.toLocaleLowerCase());

          if (filtered === true) {
            return filtered;
          }
        }))
      : (filtered = products.filter(el => {
          const lc = el[name].toLowerCase();
          const filter = value.toLowerCase();
          return lc.includes(filter);
        }));

    setApply(true);
    await setProducts(filtered);
  }

  async function handleNumero(event) {
    event.preventDefault();
    const { value, name } = event.target;

    let filtered;
    apply === false
      ? (filtered = original.filter(el => el[name] >= parseInt(value)))
      : (filtered = products.filter(el => el[name] >= parseInt(value)));

    setApply(true);
    await setProducts(filtered);
  }

  return (
    <div>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Nexo Imobiliária" className="logo" />
          </Link>
          <h2>(37) 3244-3630</h2>
        </div>
        <div className="search">
          <ul>
            <li>
              O que você está procurando ?<br />
              <label>
                <select
                  className="no-border"
                  name="option"
                  onChange={handleChange}
                >
                  <option hidden>Selecione</option>
                  <option value="alugar">Alugar</option>
                  <option value="comprar">Comprar</option>
                </select>
              </label>
            </li>

            <li>
              Cidade:
              <br />
              <label>
                <input
                  type="text"
                  name="city"
                  className="no-border"
                  placeholder="Digite Aqui"
                  onChange={handleChangeWord}
                />
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
                <select className="no-border" onChange={handleChange}>
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
                <select
                  className="no-border"
                  name="size"
                  onChange={handleNumero}
                >
                  <option>Tamanho</option>
                  <option value="200">Maior que 200m²</option>
                  <option value="300">Maior que 300m²</option>
                  <option value="400">Maior que 400m²</option>
                  <option value="500">Maior que 500m²</option>
                  <option value="600">Maior que 600m²</option>
                  <option value="700">Maior que 700m²</option>
                </select>
              </label>
            </li>
          </ul>
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
