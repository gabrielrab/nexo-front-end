import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Create.css";
import api from "../services/api";
//import useForm from "../hooks/useForms";

import logo from "../assets/logo.svg";

export default function({ match }) {
  const { id } = match.params;
  const [product, setProduct] = useState([]);
  const [values, setValues] = useState({});
  //const [{ values }, handleChange, handleSubmit] = useForm();

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
    console.log(values);
  };

  const handleChange = event => {
    const auxValues = { ...values };

    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };
  // async function enviarProduto() {
  //   const formData = new FormData();
  //   formData.append("label", values["label"]);
  //   formData.append("option", values["option"]);
  //   formData.append("category", values["category"]);
  //   formData.append("city", values["city"]);
  //   formData.append("district", values["district"]);
  //   formData.append("bedrooms", values["bedrooms"]);
  //   formData.append("parkingSpaces", values["parkingSpaces"]);
  //   formData.append("size", values["size"]);
  //   formData.append("description", values["description"]);
  //   formData.append("price", values["price"]);

  //   try {
  //     //#Parei na parte que tenho que enviar para o banco de dados as alteracoes ...
  //     //Problema identificado = formData esta assumindo valores errados...
  //     debugger;
  //     const response = await api
  //       .put(`/product/${id}`, formData)
  //       .then(res => {
  //         toast.success("Anúncio Editado!");
  //       })
  //       .catch(err => {
  //         toast.error(
  //           "Erro! Tente novamente mais tarde, ou contate o desenvolvedor"
  //         );
  //       });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        <select name="option" onchange={handleChange}>
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
          Atualiza
        </button>
      </form>
    </div>
  );
}
