import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";
import api from "../services/api";

import logo from "../assets/logo.svg";

export default function() {
  const [user, setUser] = useState({});

  const handleSubmit = async event => {
    //code here
    event.preventDefault();
    try {
      const response = await api.post("/login", user);
      if (response.status === 200) {
        alert("Okkkk");
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
          <img src={logo} alt="Nexo" />
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
