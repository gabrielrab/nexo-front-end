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
        <input
          name="label"
          placeholder="Titulo"
          onChange={handleChange}
          required
        />
        <select name="option" onChange={handleChange}>
          <option hidden>Tipo</option>
          <option value="alugar">Alugar</option>
          <option value="comprar">Comprar</option>
        </select>
        <select name="category" onChange={handleChange}>
          <option hidden>Categoria</option>
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Lote</option>
        </select>
        <input name="city" placeholder="Cidade" onChange={handleChange} />
        <input name="district" placeholder="Bairro" onChange={handleChange} />
        <input
          type="number"
          name="bedrooms"
          placeholder="Quartos"
          onChange={handleChange}
        />
        <input
          type="number"
          name="parkingSpaces"
          placeholder="Espaços na garagem"
          onChange={handleChange}
        />
        <input
          type="number"
          name="size"
          placeholder="Tamanho"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
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
