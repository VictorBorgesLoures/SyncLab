import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header'
import Footer from '../../components/footer'

function Login() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Enviar email e senha para o servidor
        
        navigate('/Dashboard');
    };

    return (
        <>
            <Header showBtn={false} />
            <div className="container">
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
                        <Link to="/Registro">
                            <button className="register-button">Registrar</button>
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;