import React from "react";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import "./Product.css";

//Imagens
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import bed from "../assets/bed.svg";
import fullsize from "../assets/full-size.svg";

export default function() {
  return (
    <div class="content">
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="Nexo" className="logo" />
        </Link>
        <p>Os melhores imóveis para você!</p>
      </nav>
      <AwesomeSlider className="slide">
        <div data-src="https://img.olx.com.br/images/91/915905031701995.jpg" />
        <div data-src="https://img.olx.com.br/images/19/191923007391584.jpg" />
      </AwesomeSlider>
      <section className="content-description">
        <div className="description-header">
          <label>
            <h1>Casa de Alto Padrão</h1>
            <span className="cinza">B. Vitória Carmo do Cajuru</span>
          </label>

          <label className="price">R$ 10000,00</label>
        </div>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div className="skills">
          <ul>
            <li>
              <img src={bed} alt="bed-value" className="icon-min" /> 5
            </li>
            <li>
              <img src={car} alt="bed-value" className="icon-min" /> 2
            </li>
            <li>
              <img src={fullsize} alt="bed-value" className="icon-min" /> 24 m²
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
