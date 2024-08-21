import React, { useState, useEffect } from 'react';
import '../styles/registro.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Registro() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    //Area de navegação

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Login');
    };

    return (
        <div>
            <header className="header">
                <img src={logo} alt="Logo" className="header-logo" />
                <button className="login-button" onClick={handleLoginClick}>Login</button>
            </header>

            <form className='form-box'>
                <div>
                    <h1 className="title">Criar uma conta<br></br>SyncLab</h1>
                    <p className="label">Rua</p>
                    <input
                    placeholder='Digite sua rua'
                    type="text"
                    id="rua"
                    required
                    />

                    <div className="box-cep">
                        <div>
                            <p className="label">Número</p>
                            <input
                            placeholder='Digite seu número'
                            type="text"
                            id="text"
                            required
                            />
                        </div>
                        <div className="space"></div>
                        <div>
                            <p className="label">CEP</p>
                            <input
                            placeholder='Digite seu CEP'
                            type="text"
                            id="cep"
                            required
                            />
                        </div>
                    </div>
                    <p className="label">Complemento</p>
                    <input
                    placeholder='Digite o complemento'
                    type="text"
                    id="complemento"
                    required
                    />

                </div>
                <div className="space-column"></div>
                <div>
                    <p className="label">Nome</p>
                    <input
                    placeholder='Digite seu Nome'
                    type="text"
                    id="nome"
                    required
                    />

                    <p className="label">Endereço de E-mail</p>
                    <input
                    placeholder='Digite seu e-mail'
                    type="text"
                    id="email"
                    required
                    />

                    <div className="box-cep">
                        <div>
                            <p className="label">Username</p>
                            <input
                            placeholder='Digite seu username'
                            type="text"
                            id="username"
                            required
                            />
                        </div>
                        <div className="space"></div>
                        <div>
                            <p className="label">Data de Nascimento</p>
                            <input
                            placeholder='dd/mm/aaaa'
                            type="date"
                            id="data"
                            required
                            />
                        </div>
                    </div>

                    <p className="label">Senha</p>
                    <input
                    placeholder='Digite seu e-mail'
                    type="password"
                    id="senha_conf"
                    required
                    />

                    <p className="label">Confirmação de Senha</p>
                    <input
                    placeholder='Confirme a senha'
                    type="password"
                    id="senha_conf"
                    required
                    />

                    <p className="label">CPF</p>
                    <input
                    placeholder='Digite seu CPF'
                    type="text"
                    id="cpf"
                    required
                    />

                    <p className="label">Matrícula</p>
                    <input
                    placeholder='Digite sua matrícula'
                    type="text"
                    id="matricula"
                    required
                    />

                    <button className="submit-register">Registrar</button>
                </div>
            </form>
            <footer className='footer'>
                <p className="footer-text">© 2024 SyncLab. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}

export default Registro;