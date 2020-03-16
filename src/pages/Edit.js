import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Create.css";
import api from "../services/api";

import logo from "../assets/logo.png";

export default function({ match }) {
  const { id } = match.params;
  const [product, setProduct] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState("Atualizar");

  useEffect(() => {
    async function loadProduct() {
      const { data } = await api.get(`/product/${id}`);
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
        <img src={logo} alt="Nexo" className="logo-png" />
      </Link>
      <h1>Editar Anúncio</h1>
      <form onSubmit={onSubmited}>
        <div className="form-group">
          <ToastContainer />
        </div>
        <label>Titulo:</label>
        <input
          name="label"
          placeholder="Titulo"
          defaultValue={product.label}
          onChange={handleChange}
          required
        />
        <label>Tipo:</label>
        <select name="option" onChange={handleChange}>
          <option hidden>Selecione</option>
          <option value="alugar" selected={product.option === "alugar"}>
            Alugar
          </option>
          <option value="comprar" selected={product.option === "comprar"}>
            Comprar
          </option>
        </select>
        <label>Categoria:</label>
        <select name="category" onChange={handleChange}>
          <option hidden>Categoria</option>
          <option selected={product.category === "Casa"}>Casa</option>
          <option selected={product.category === "Apartamento"}>
            Apartamento
          </option>
          <option selected={product.category === "Lote"}>Lote</option>
          <option selected={product.category === "Terreno Rural"}>
            Terreno Rural
          </option>
          <option selected={product.category === "Sitio"}>>Sitio</option>
          <option selected={product.category === "Chacara"}>>Chacara</option>
          <option selected={product.category === "Kitnet"}>>Kitnet</option>
          <option selected={product.category === "Fazenda"}>>Fazenda</option>
          <option selected={product.category === "Galpão Industrial"}>
            >Galpão Industrial
          </option>
          <option selected={product.category === "Sala Comercial"}>
            >Sala Comercial
          </option>
          <option selected={product.category === "Loja Comercial"}>
            >Loja Comercial
          </option>
        </select>
        <label>Cidade :</label>
        <input
          name="city"
          placeholder="Cidade"
          onChange={handleChange}
          defaultValue={product.city}
        />
        <label>Bairro :</label>
        <input
          name="district"
          placeholder="Bairro"
          onChange={handleChange}
          defaultValue={product.district}
        />
        <label>Rua :</label>
        <input
          type="text"
          name="street"
          placeholder="Digite aqui"
          defaultValue={product.street}
          onChange={handleChange}
        />
        <label>Quantidade de quartos :</label>
        <input
          type="number"
          name="bedrooms"
          defaultValue={product.bedrooms}
          placeholder="Quartos"
          onChange={handleChange}
        />
        <label>Quantidade de banheiros :</label>
        <input
          type="number"
          name="wc"
          placeholder="Digite aqui"
          defaultValue={product.wc}
          onChange={handleChange}
        />
        <label>Quantidade de suites :</label>
        <input
          type="number"
          name="suites"
          placeholder="Digite aqui"
          onChange={handleChange}
          defaultValue={product.suites}
        />
        <label>Espaços na garagem :</label>
        <input
          type="number"
          name="parkingSpaces"
          defaultValue={product.parkingSpaces}
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Tamanho :</label>
        <input
          type="number"
          name="size"
          defaultValue={product.size}
          placeholder="Tamanho"
          onChange={handleChange}
        />
        <label>Descrição :</label>
        <textarea
          name="description"
          placeholder="Digite a descrição"
          onChange={handleChange}
        />
        <label>Preço :</label>
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
