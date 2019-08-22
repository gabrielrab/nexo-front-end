import React from "react";

import "./Create.css";

import logo from "../assets/logo.svg";

export default function() {
  return (
    <div className="create-container">
      <img src={logo} alt="Nexo" />
      <h1>Criar Anúncio</h1>
      <form>
        <input name="label" placeholder="label" />
        <input name="category" placeholder="category" />
        <input name="city" placeholder="city" />
        <input name="district" placeholder="district" />
        <input name="bedrooms" placeholder="bedrooms" />
        <input name="parkingSpaces" placeholder="parkingSpaces" />
        <input name="size" placeholder="size" />
        <input name="description" placeholder="description" />
        <input name="price" placeholder="price" />
        <input type="file" name="file" multiple />
      </form>
    </div>
  );
}
