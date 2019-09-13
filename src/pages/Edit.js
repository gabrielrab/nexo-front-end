import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Create.css";
import api from "../services/api";

import logo from "../assets/logo.svg";

export default function({ match }) {
  const { id } = match.params;
  const [product, setProduct] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState("Atualizar");

  useEffect(() => {
    async function loadProduct() {
      const { data } = await api.get(`/product/${id}`);
      debugger;
      setProduct(data.product);
    }
    loadProduct();
  }, [id]);

  const onSubmited = async e => {
    e.preventDefault();

    try {
      const response = await api.put(`/product/${id}`, values, {
        onUploadProgress: ProgressEvent => {
          setLoading("Carregando");
        }
      });
      setLoading("Atualizar");
      debugger;
      response.status === 200
        ? toast.success("Anúncio Editado!")
        : toast.error("Algo deu errado!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const auxValues = { ...values };

    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  return (
    <div className="create-container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Editar Anúncio</h1>
      <form onSubmit={onSubmited}>
        <div className="form-group">
          <ToastContainer />
        </div>
        <input
          name="label"
          placeholder="Titulo"
          defaultValue={product.label}
          onChange={handleChange}
          required
        />
        <select name="option" onChange={handleChange}>
          <option hidden>Tipo</option>
          <option value="alugar" selected={product.option === "alugar"}>
            Alugar
          </option>
          <option value="comprar" selected={product.option === "comprar"}>
            Comprar
          </option>
        </select>
        <select name="category" onChange={handleChange}>
          <option hidden>Categoria</option>
          <option selected={product.category === "Casa"}>Casa</option>
          <option selected={product.category === "Apartamento"}>
            Apartamento
          </option>
          <option selected={product.category === "Lote"}>Lote</option>
        </select>
        <input
          name="city"
          placeholder="Cidade"
          onChange={handleChange}
          defaultValue={product.city}
        />
        <input
          name="district"
          placeholder="Bairro"
          onChange={handleChange}
          defaultValue={product.district}
        />
        <input
          type="number"
          name="bedrooms"
          defaultValue={product.bedrooms}
          placeholder="Quartos"
          onChange={handleChange}
        />
        <input
          type="number"
          name="parkingSpaces"
          defaultValue={product.parkingSpaces}
          placeholder="Espaços na garagem"
          onChange={handleChange}
        />
        <input
          type="number"
          name="size"
          defaultValue={product.size}
          placeholder="Tamanho"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Digite a descrição"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          defaultValue={product.price}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          {loading}
        </button>
        <Link to="/dashboard">Voltar</Link>
      </form>
    </div>
  );
}
