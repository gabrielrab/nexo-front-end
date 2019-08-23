import React from "react";
import { Link } from "react-router-dom";

import "./Create.css";

import logo from "../assets/logo.svg";

export default function() {
  return (
    <div className="create-container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Criar Anúncio</h1>
      <form>
        <input name="label" placeholder="Titulo" />
        <select name="category">
          <option hidden>Categoria</option>
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Lote</option>
        </select>
        <input name="city" placeholder="Cidade" />
        <input name="district" placeholder="Bairro" />
        <input type="number" name="bedrooms" placeholder="Quartos" />
        <input
          type="number"
          name="parkingSpaces"
          placeholder="Espaços na garagem"
        />
        <input type="number" name="size" placeholder="Tamanho" />
        <textarea name="description" placeholder="Descrição" />
        <input type="number" name="price" placeholder="Preço" />
        <input type="file" name="file" multiple />
        <button className="btn">Enviar</button>
      </form>
    </div>
  );
}
