import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Line } from "rc-progress";

import "./Create.css";
import api from "../services/api";
import useForm from "../hooks/useForms";

import logo from "../assets/logo.svg";

export default function() {
  const [
    { values, file },
    handleChange,
    handleSubmit,
    handleChangeImages
  ] = useForm();
  const [loading, setLoading] = useState(0);

  const onSubmit = async e => {
    e.preventDefault();
  };

  async function enviarProduto() {
    const formData = new FormData();
    let i;
    for (i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    formData.append("label", values["label"]);
    formData.append("option", values["option"]);
    formData.append("category", values["category"]);
    formData.append("city", values["city"]);
    formData.append("district", values["district"]);
    formData.append("bedrooms", values["bedrooms"]);
    formData.append("wc", values["wc"]);
    formData.append("parkingSpaces", values["parkingSpaces"]);
    formData.append("size", values["size"]);
    formData.append("description", values["description"]);
    formData.append("price", values["price"]);

    try {
      const response = await api
        .post("/product", formData, {
          onUploadProgress: ProgressEvent => {
            setLoading((ProgressEvent.loaded / ProgressEvent.total) * 100);
          }
        })
        .then(res => {
          toast.success("Anúncio Criado!");
        })
        .catch(err => {
          toast.error(
            "Erro! Tente novamente mais tarde, ou contate o desenvolvedor"
          );
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Criar Anúncio</h1>
      <form onSubmit={handleSubmit(enviarProduto)}>
        <div class="form-group">
          <ToastContainer />
        </div>
        <label>Titulo:</label>
        <input
          name="label"
          placeholder="Digite aqui"
          onChange={handleChange}
          required
        />
        <label>Tipo :</label>
        <select name="option" onChange={handleChange}>
          <option hidden>Selecione aqui</option>
          <option value="alugar">Alugar</option>
          <option value="comprar">Comprar</option>
        </select>
        <label>Categoria :</label>
        <select name="category" onChange={handleChange}>
          <option hidden>Selecione aqui</option>
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Lote</option>
        </select>
        <label>Cidade :</label>
        <input name="city" placeholder="Digite aqui" onChange={handleChange} />
        <label>Bairro :</label>
        <input
          name="district"
          placeholder="Dgite aqui"
          onChange={handleChange}
        />
        <label>Quantidade de quartos :</label>
        <input
          type="number"
          name="bedrooms"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Quantidade de banheiros :</label>
        <input
          type="number"
          name="wc"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Espaços na garagem :</label>
        <input
          type="number"
          name="parkingSpaces"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Tamanho :</label>
        <input
          type="number"
          name="size"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Descrição :</label>
        <textarea
          name="description"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <label>Preço :</label>
        <input
          type="number"
          name="price"
          placeholder="Digite aqui"
          onChange={handleChange}
        />
        <input
          type="file"
          name="file[]"
          multiple
          onChange={handleChangeImages}
        />
        <Line percent={loading} strokeWidth="4" strokeColor="#fcf512" />
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
