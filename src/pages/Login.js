import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";
import api from "../services/api";

import logo from "../assets/logo.png";

export default function({ history }) {
  const [user, setUser] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await api.post("/login", user);

      const { _id } = response.data.user;

      if (response.status === 200) {
        window.localStorage.setItem("TOKEN", _id);
        history.push(`/dashboard`);
      } else if (response.status === 404) {
        toast.error(`O usuário não foi encontrado`);
      } else if (response.status === 401) {
        toast.error(`Senha incorreta`);
      }
    } catch (error) {
      toast.error(
        `Problema reportado: ${error}. Entre em contato com o desenvolvedor`
      );
    }
  };
  const handleChange = event => {
    const auxValues = { ...user };

    auxValues[event.target.name] = event.target.value;
    setUser(auxValues);
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Link to="/">
          <img src={logo} alt="Nexo" className="logo-png" />
        </Link>
        <input
          name="user"
          placeholder="Digite seu usuário"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
