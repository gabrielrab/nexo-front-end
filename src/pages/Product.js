import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import "./Product.css";

//Imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";
import api from "../services/api";

export default function Product({ match }) {
  const { id } = match.params;
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const { data } = await api.get(`/product/${id}`);
      setProduct(data.product);
    }
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product && product._id) {
      const response = product.imagesURL;
      setImages(response);
    }
  }, [product]);

  const url = [];
  if (images.length !== 0) {
    for (let i = 0; i < images.length; i++) {
      url.push(images[i].url);
    }
  }

  return (
    <div className="content">
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="Nexo" className="logo" />
        </Link>
        <p>Os melhores imóveis para você!</p>
      </nav>
      {images.length > 0 ? (
        <AwesomeSlider className="slide">
          {url.map((image, index) => (
            <div data-src={image} key={index} />
          ))}
        </AwesomeSlider>
      ) : (
        <p>Aguarde</p>
      )}
      <section className="content-description">
        <div className="description-header">
          <label>
            <h1>
              {product.label} - <i>{product.option}</i>
            </h1>
            <span className="cinza">
              B. {product.district} - {product.city}
            </span>
          </label>

          <label className="price">R$ {product.price},00</label>
        </div>

        <p>{product.description}</p>
        <div className="skills">
          <ul>
            <li>
              <img src={bed} alt="bed-value" className="icon-min" />{" "}
              {product.bedrooms}
            </li>
            <li>
              <img src={car} alt="bed-value" className="icon-min" />{" "}
              {product.parkingSpaces}
            </li>
            <li>
              <img src={fullsize} alt="bed-value" className="icon-min" />{" "}
              {product.size} m²
            </li>
          </ul>
        </div>
        <article>
          <h1>Para mais informações entre em contato:</h1>
          <p>(37)3244-3630</p>
        </article>
      </section>
      <footer>
        <img src={logo} alt="Nexo" />
        <br />
        Desenvoldo por Gabriel Rabelo
      </footer>
    </div>
  );
}
