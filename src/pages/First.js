import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-format";

import "./First.css";

import api from "../services/api";

//imagens
import logo from "../assets/logo.png";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";
import hand from "../assets/hand.svg";
import wc from "../assets/wc.svg";
import street from "../assets/street.svg";
import wp from "../assets/whatsapp.svg";
import fb from "../assets/facebook.svg";
import barCode from "../assets/bar-code.svg";

export default function() {
  const [original, setOriginal] = useState([]); //recebe os valores da API sem nenhum filtro
  const [products, setProducts] = useState([]); //aqui deve receber os valores após o filtro
  const [apply, setApply] = useState(false);
  const [fill, setFill] = useState(false);
  const [filters, setFilters] = useState(false);
  const [option, setOption] = useState("+ Filtros");

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
    let filtered;

    fill === false
      ? (filtered = original.filter(
          el => el[name] === value || el[name] === parseInt(value)
        ))
      : (filtered = products.filter(
          el => el[name] === value || el[name] === parseInt(value)
        ));

    setFill(true);
    await setProducts(filtered);
  }

  async function handleChangeCode(event) {
    const { value, name } = event.target;

    let filtered;
    fill === false
      ? (filtered = original.filter(el => el[name] === parseInt(value)))
      : (filtered = products.filter(el => el[name] === parseInt(value)));

    setFill(true);
    await setProducts(filtered);
    debugger;
  }

  async function handleChangeWord(event) {
    event.preventDefault();
    const { value, name } = event.target;

    let filtered;

    fill === false
      ? (filtered = original.filter(el => {
          const lc = el[name].toLowerCase();
          const filter = value.toLowerCase();
          return lc.includes(filter);
        }))
      : (filtered = products.filter(el => {
          const lc = el[name].toLowerCase();
          const filter = value.toLowerCase();
          return lc.includes(filter);
        }));

    setFill(true);
    await setProducts(filtered);
  }

  async function handleNumero(event) {
    event.preventDefault();
    const { value, name } = event.target;

    let filtered;
    fill === false
      ? (filtered = original.filter(el => el[name] >= parseInt(value)))
      : (filtered = products.filter(el => el[name] >= parseInt(value)));

    setFill(true);
    await setProducts(filtered);
  }

  function handleRefresh() {
    setApply("false");
    window.location.reload();
  }

  function handleMoreFilters() {
    filters === false ? setFilters(true) : setFilters(false);
    filters === false ? setOption("- Filtros") : setOption("+ Filtros");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setApply(true);
  }

  return (
    <>
      <div className="barra"></div>
      <nav>
        <div className="header-nav">
          <Link to="/login">
            <img src={logo} alt="nexo" className="logo" />
          </Link>
          <div>
            <span>
              <a href="https://api.whatsapp.com/send?phone=5537999263631&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
                <img src={wp} alt="whatsapp" className="icon-wp" /> Daniel -
                (37) 99926-3631
              </a>
            </span>
            <span>
              <a href="https://api.whatsapp.com/send?phone=5537999632301&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
                <img src={wp} alt="whatsapp" className="icon-wp" />
                Geraldo - (37) 99963-2301
              </a>
            </span>
            <span>
              <a href="https://api.whatsapp.com/send?phone=5537999375320&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
                <img src={wp} alt="whatsapp" className="icon-wp" />
                Adriano - (37) 99937-5320
              </a>
            </span>
          </div>
        </div>
        <ul>
          <li>
            <span>O que você está procurando ?</span>
            <br />
            <label>
              <select name="option" onChange={handleChange}>
                <option hidden>Selecione</option>
                <option value="alugar">Alugar</option>
                <option value="comprar">Comprar</option>
              </select>
            </label>
          </li>

          <li>
            <span>Tipo de imóvel:</span>
            <br />
            <label>
              <select name="category" onChange={handleChange}>
                <option hidden>Selecione</option>
                <option>Casa</option>
                <option>Apartamento</option>
                <option>Lote</option>
                <option value="terreno rural">Terreno Rural</option>
                <option value="sitio">Sitio</option>
                <option value="chacara">Chacara</option>
                <option value="kitnet">Kitnet</option>
                <option value="fazenda">Fazenda</option>
                <option value="galpao industrial">Galpão Industrial</option>
              </select>
            </label>
          </li>

          <li>
            <span>Cidade: </span>
            <br />
            <label>
              <input
                name="city"
                placeholder="Digite aqui"
                onChange={handleChangeWord}
              />
            </label>
          </li>

          <li>
            <span>Bairro: </span>
            <br />
            <label>
              <input
                name="district"
                placeholder="Digite aqui"
                onChange={handleChangeWord}
              />
            </label>
          </li>

          {filters === true ? (
            <>
              <li>
                <label>
                  <img src={street} alt="Rua" className="icon" />
                  <input
                    type="text"
                    name="street"
                    placeholder="Rua"
                    onChange={handleChangeWord}
                  />
                </label>
              </li>

              <li>
                <label>
                  <img src={fullsize} alt="Tamanho" className="icon" />
                  <select name="size" onChange={handleNumero}>
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
                  <input
                    type="number"
                    name="wc"
                    placeholder="Banheiros"
                    onChange={handleNumero}
                  />
                </label>
              </li>

              <li>
                <label>
                  <img src={bed} alt="Suites" className="icon" />
                  <input
                    type="number"
                    name="suites"
                    placeholder="Suites"
                    onChange={handleNumero}
                  />
                </label>
              </li>

              <li>
                <label>
                  <img src={bed} alt="Quartos" className="icon" />
                  <select name="bedrooms" onChange={handleChange}>
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
                  <select name="parkingSpaces" onChange={handleChange}>
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

                  <input
                    type="number"
                    name="price"
                    placeholder="Preco"
                    onChange={handleNumero}
                  />
                </label>
              </li>

              <li>
                <label>
                  <img src={barCode} alt="Codigo" className="icon-bar" />
                  <input
                    type="number"
                    name="code"
                    placeholder="Codigo"
                    onChange={handleChangeCode}
                  />
                </label>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <div className="list-btns">
          <button className="btn2" onClick={handleMoreFilters}>
            {option}
          </button>
          <button className="btn1" onClick={handleRefresh}>
            Limpar
          </button>
          <button className="btn1" onClick={handleSubmit}>
            Buscar
          </button>
        </div>
      </nav>
      <div className="main">
        {apply === false ? (
          <>
            {original.map(product => (
              <div className="product" key={product._id}>
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="content-img">
                    <img
                      src={product.thumb || product.imagesURL[0].url}
                      alt=""
                      className="img-product"
                    />
                    <label className="tips option">{product.option}</label>
                  </div>
                  <div className="content-infos">
                    <div className="infos">
                      <span>
                        <b className="title">{product.label}</b>
                        <br />
                        {product.category === "Lote" ||
                        product.category === "Sitio" ||
                        product.category === "Fazenda" ||
                        product.category === "Chacara" ||
                        product.category === "Galpão Industrial" ||
                        product.category === "Terreno Rural" ? (
                          <>
                            {product.district} - {product.city}
                          </>
                        ) : (
                          <>
                            {product.street}, B. {product.district} <br />{" "}
                            {product.city}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="skills">
                      <ul>
                        {product.category === "Lote" ||
                        product.category === "Sitio" ||
                        product.category === "Fazenda" ||
                        product.category === "Chacara" ||
                        product.category === "Galpão Industrial" ||
                        product.category === "Terreno Rural" ? (
                          <></>
                        ) : (
                          <>
                            <li>
                              <img
                                src={bed}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.bedrooms}
                            </li>

                            <li>
                              <img
                                src={wc}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.wc}
                            </li>

                            <li>
                              <img
                                src={car}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.parkingSpaces}
                            </li>
                          </>
                        )}
                        <li>
                          <img
                            src={fullsize}
                            alt="bed-value"
                            className="icon-min"
                          />
                          <CurrencyInput
                            value={product.size}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            className="space"
                          />{" "}
                          m²
                        </li>
                      </ul>
                      <div className="content-price">
                        <label className="price">
                          R${" "}
                          <CurrencyInput
                            value={product.price}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                          />
                          ,00
                        </label>
                      </div>
                    </div>
                  </div>
                </Link>
                <span className="share-first">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://nexo-front.herokuapp.com/product/${product._id}`}
                    target="_self"
                  >
                    <img src={fb} alt="whatsapp" className="icon-md" />
                  </a>
                  <a
                    href={`whatsapp://send?text=https://nexo-front.herokuapp.com/product/${product._id}`}
                    data-action="share/whatsapp/share"
                  >
                    <img src={wp} alt="whatsapp" className="icon-md" />
                  </a>
                </span>
              </div>
            ))}
          </>
        ) : products.length > 0 ? (
          <>
            {products.map(product => (
              <div className="product" key={product._id}>
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="content-img">
                    <img
                      src={product.thumb || product.imagesURL[0].url}
                      alt=""
                      className="img-product"
                    />
                    <label className="tips option">{product.option}</label>
                  </div>
                  <div className="content-infos">
                    <div className="infos">
                      <span>
                        <b className="title">{product.label}</b>
                        <br />
                        {product.category === "Lote" ||
                        product.category === "Sitio" ||
                        product.category === "Fazenda" ||
                        product.category === "Chacara" ||
                        product.category === "Galpão Industrial" ||
                        product.category === "Terreno Rural" ? (
                          <>
                            {product.district} - {product.city}
                          </>
                        ) : (
                          <>
                            {product.street}, B. {product.district} <br />{" "}
                            {product.city}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="skills">
                      <ul>
                        {product.category === "Lote" ||
                        product.category === "Sitio" ||
                        product.category === "Fazenda" ||
                        product.category === "Chacara" ||
                        product.category === "Galpão Industrial" ||
                        product.category === "Terreno Rural" ? (
                          <></>
                        ) : (
                          <>
                            <li>
                              <img
                                src={bed}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.bedrooms}
                            </li>

                            <li>
                              <img
                                src={wc}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.wc}
                            </li>

                            <li>
                              <img
                                src={car}
                                alt="bed-value"
                                className="icon-min"
                              />
                              {product.parkingSpaces}
                            </li>
                          </>
                        )}
                        <li>
                          <img
                            src={fullsize}
                            alt="bed-value"
                            className="icon-min"
                          />
                          <CurrencyInput
                            value={product.size}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            className="space"
                          />{" "}
                          m²
                        </li>
                      </ul>
                      <div className="content-price">
                        <label className="price">
                          R${" "}
                          <CurrencyInput
                            value={product.price}
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                          />
                          ,00
                        </label>
                      </div>
                    </div>
                  </div>
                </Link>
                <span className="share-first">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://nexo-front.herokuapp.com/product/${product._id}`}
                    target="_self"
                  >
                    <img src={fb} alt="whatsapp" className="icon-md" />
                  </a>
                  <a
                    href={`whatsapp://send?text=https://nexo-front.herokuapp.com/product/${product._id}`}
                    data-action="share/whatsapp/share"
                  >
                    <img src={wp} alt="whatsapp" className="icon-md" />
                  </a>
                </span>
              </div>
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
    </>
  );
}
