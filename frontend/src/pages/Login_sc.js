import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/login.css';
import logo from '../assets/logo.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Enviar email e senha para o servidor
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
    <div>
        <header className="header">
            <img src={logo} alt="Logo" className="header-logo" />
        </header>
    
    <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='logintxt'>Login</h1>
        <div className="form-group">
            <p className="label" htmlFor="email">Email:</p>
            <input
            placeholder='Digite seu email'
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <p className="label" htmlFor="password">Senha:</p>
            <input
                placeholder='Digite sua senha'
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="submit-button">Entrar</button>
            <button className="register-button">Registrar</button>
        </div>
    </form>
        <footer className='footer'>
            <p className="footer-text">© 2024 SyncLab. Todos os direitos reservados.</p>
        </footer>
    </div>
    )
}

export default Login;