import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";
import api from "../services/api";

import logo from "../assets/logo.svg";

async function removeProduct(id) {
  window.confirm("Deseja realmente excluir?") === true
    ? await api.delete(`/product/${id}`)
    : alert("O anúncio não será apagado.");

  window.location.reload();
}

export default function({ match, history }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/product");
      setProducts(response.data.product);
    }
    loadProducts();
  }, []);

  return (
    <div className="container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Dashboard</h1>
      <Link to="/create">
        <button className="btn">Adicionar Anúncio</button>
      </Link>
      {products.length > 0 ? (
        <div className="box-container">
          {products.map(product => (
            <div className="box" key={product._id}>
              <span>#0001</span>
              <h3>{product.title}</h3>
              <p>
                B. {product.district} - {product.city}
              </p>
              <br />
              <label>Adicionado em: 24/08/2019</label>
              <div>
                <Link to="/">
                  <button className="btn-das">Editar</button>
                </Link>
                <button
                  className="btn-das"
                  onClick={e => removeProduct(product._id)}
                  value={product._id}
                >
                  Remover
                </button>
              </div>
            </div>
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
