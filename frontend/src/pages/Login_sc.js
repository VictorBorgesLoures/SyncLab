import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/login.css';
import logo from '../assets/logo.png';
import Footer from '../components/rodape';

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
            <button className="register-button">Registrar</button>
        </header>
    
    <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='logintxt'>Login</h1>
        <div className="form-group">
            <label htmlFor="email">Email:</label> <br></br>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Senha:</label> <br></br>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="submit-button">Entrar</button>
    </form>

        <Footer />
    </div>
    )
}

export default Login;