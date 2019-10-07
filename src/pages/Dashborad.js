import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import pt from "date-fns/locale/pt";

import "./Dashboard.css";
import api from "../services/api";

import logo from "../assets/logo.png";

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

  console.log(products);

  return (
    <div className="container">
      <Link to="/">
        <img src={logo} alt="Nexo" className="logo-png" />
      </Link>
      <h1>Dashboard</h1>
      <Link to="/create">
        <button className="btn">Adicionar Anúncio</button>
      </Link>
      {products.length > 0 ? (
        <div className="box-container">
          {products.map(product => (
            <div className="box" key={product._id}>
              <span>#{product.code}</span>
              <h3>{product.label}</h3>
              <p>
                B. {product.district} - {product.city}
              </p>
              <br />
              <p>Preco: R${product.price},00</p>
              <br />
              <Link to={`/product/${product._id}`}>
                <p>Visualizar</p>
              </Link>
              <label>
                Criado há:{" "}
                {formatDistance(new Date(product.createdAt), new Date(), {
                  locale: pt
                })}
              </label>
              <div>
                <Link to={`/edit/${product._id}`}>
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
