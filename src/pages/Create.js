import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Create.css";
import api from "../services/api";
import useForm from "../hooks/useForms";

import logo from "../assets/logo.svg";

export default function() {
  const [{ values, loading }, handleChange, handleSubmit] = useForm();
  const [file, setFile] = useState({});

  const handleChangeImages = async event => {
    //setFile(event.target.files);
    setFile(event.target.files);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    debugger;
    let i;
    for (i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    debugger;
    //formData.append("file", file[1]);

    try {
      const res = await api.post("/storage", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-container">
      <Link to="/">
        <img src={logo} alt="Nexo" />
      </Link>
      <h1>Criar Anúncio</h1>
      <form onSubmit={onSubmit}>
        <input name="label" placeholder="Titulo" onChange={handleChange} />
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
        <button className="btn" type="submit">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
