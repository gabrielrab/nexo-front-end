import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import "./Product.css";

//Imagens
import logo from "../assets/logo.png";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";
import hand from "../assets/hand.svg";
import wc from "../assets/wc.svg";
import street from "../assets/street.svg";
import wp from "../assets/whatsapp.svg";

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
          <img src={logo} alt="Nexo" className="logo-png" />
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
            <h1 className="product-code">
              <label>Código do anuncio: #{product.code}</label>
            </h1>
            <h1>{product.label}</h1>
            <span className="cinza">
              {product.category === "Lote" ? <></> : <>{product.street}, </>} B.{" "}
              {product.district} - {product.city}
            </span>
          </label>

          <label className="price">R$ {product.price},00</label>
        </div>

        <p>{product.description}</p>
        <div className="skills">
          <ul>
            {product.category === "Lote" ? (
              <></>
            ) : (
              <>
                <li>
                  <img src={bed} alt="bed-value" className="icon-min" />{" "}
                  {product.bedrooms}
                </li>
                <li>
                  <img src={wc} alt="bed-value" className="icon-min" />{" "}
                  {product.wc}
                </li>
                <li>
                  <img src={car} alt="bed-value" className="icon-min" />{" "}
                  {product.parkingSpaces}
                </li>
              </>
            )}
            <li>
              <img src={fullsize} alt="bed-value" className="icon-min" />{" "}
              {product.size} m²
            </li>
          </ul>
        </div>
        <article>
          <h1>Para mais informações entre em contato:</h1>
          <a href="https://api.whatsapp.com/send?phone=5537999263631&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
            <img src={wp} alt="whatsapp" className="icon-wp" /> Daniel {""}-
            (37) 99926-3631
          </a>
          <a href="https://api.whatsapp.com/send?phone=5537999632301&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
            <img src={wp} alt="whatsapp" className="icon-wp" />
            Geraldo - (37) 99963-2301
          </a>
          <a href="https://api.whatsapp.com/send?phone=5537999375320&text=Ol%C3%A1%2C%20olhei%20alguns%20im%C3%B3veis%20no%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es">
            <img src={wp} alt="whatsapp" className="icon-wp" />
            Adriano - (37) 99937-5320
          </a>
        </article>
      </section>
      <footer>
        <img src={logo} alt="Nexo" className="logo-png" />
        <br />
        Desenvoldo por Gabriel Rabelo
      </footer>
    </div>
  );
}
