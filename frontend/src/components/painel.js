import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import Logo from '../assets/logo.png'

function Painel() {
    return (
        <div className="painel-container">
            <img src={Logo} className="header-logo"/>
        </div>
    )
}


export default Painel;