import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import ReactMarkdown from "react-markdown";
import CurrencyInput from "react-currency-format";
import MetaTags from "react-meta-tags";

import "./Product.css";

//Imagens
import logo from "../assets/logo.png";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";
import wc from "../assets/wc.svg";
import wp from "../assets/whatsapp.svg";
import fb from "../assets/facebook.svg";

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
    <>
      <MetaTags>
        <title>Nexo Imobiliaria | {product.label}</title>
        <meta
          property="og:title"
          content={`Nexo Imobiliaria - ${product.label}`}
        ></meta>
        <meta property="og:description" content={product.label}></meta>
        <meta property="og:image" content={product.thumb}></meta>
      </MetaTags>
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
                {product.category === "Lote" ||
                product.category === "Sitio" ||
                product.category === "Fazenda" ||
                product.category === "Chacara" ? (
                  <>
                    {product.district} - {product.city}
                  </>
                ) : (
                  <>
                    {product.street}, B. {product.district} <br />{" "}
                    {product.city}
                  </>
                )}{" "}
              </span>
            </label>

            <label className="price">
              R$
              <CurrencyInput
                value={product.price}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                className="space"
              />
              ,00
            </label>
          </div>
          <ReactMarkdown
            source={product.description}
            escapeHtml={false}
            className="markdown"
          />
          <div className="skills">
            <ul>
              {product.category === "Lote" ||
              product.category === "Sitio" ||
              product.category === "Fazenda" ||
              product.category === "Chacara" ? (
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
                <CurrencyInput
                  value={product.size}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  className="space"
                />
                m²
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
          <div className="share">
            Compartilhe:{" "}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://nexoimobiliaria.com.br/product/${product._id}`}
            >
              <img src={fb} alt="whatsapp" className="icon-md" />
            </a>
            <a
              href={`whatsapp://send?text=https://nexoimobiliaria.com.br/product/${product._id}`}
              data-action="share/whatsapp/share"
            >
              <img src={wp} alt="whatsapp" className="icon-md" />
            </a>
          </div>
        </section>
        <footer>
          <img src={logo} alt="Nexo" className="logo-png" />
          <br />
        </footer>
      </div>
    </>
  );
}
