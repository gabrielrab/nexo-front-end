import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Main(){
    return (
        <main>
            <header>
                <img src={logo} alt="Nexo"/>
                <Link to="/login">
                    <h3>Login</h3>
                </Link>
            </header>
            <div class="container">
                <ul>
                    <li>
                        <div className="box-search">
                            <h1>O que você esta procurando ?</h1>
                            <label>
                                <button>Alugar</button>
                                <button>Comprar</button>
                            </label>
                            <h1>Em qual local ?</h1>
                            <select>
                                <option hidden>Selecione</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="box-text">
                            <h1>Busque pelos melhores imóveis da região.</h1>
                            <p>Imóveis selecionados com alto padrão de qualidade e com a faixa de preço que cabe no seu bolso.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    );
}