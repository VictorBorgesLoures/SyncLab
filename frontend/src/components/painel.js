import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import Logo from '../assets/logo.png'
import { AiTwotoneProject } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

function Painel() {
    return (
        <div className="painel-container">
            <img src={Logo} className="painel-logo" alt="logo-painel"/>
            <div className="painel-button">
                <AiTwotoneProject />
                <p className="painel-text">Projetos</p>
            </div>
            <div className="painel-button">
                <AiOutlineFundProjectionScreen />
                <p className="painel-text">Atividades</p>
            </div>
            <div className="painel-button">
                <AiOutlineSend />
                <p className="painel-text">Requisições</p>
            </div>
        </div>
    )
}


export default Painel;