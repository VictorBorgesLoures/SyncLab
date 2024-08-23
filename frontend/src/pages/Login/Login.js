import React, {useEffect, componentDidMout, Component} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import fetchAPI from '../../fetch/fetch-api'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMout() {
        console.log("component mount");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("aqui");
        // Enviar email e senha para o servidor
        fetchAPI("/login", { id: 1, password: 23041507 })
            .then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e)
            })
        
        // navigate('/Dashboard');
    };

    render() {
        return (
        <>
                <Header showBtn={false} />
                <div className="container">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h1 className='logintxt'>Login</h1>
                        <div className="form-group">
                            <p className="label" htmlFor="email">Email:</p>
                            <input
                            placeholder='Digite seu email'
                                type="int"
                                id="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <p className="label" htmlFor="password">Senha:</p>
                            <input
                                placeholder='Digite sua senha'
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                required
                            />
                            <button type="submit" onSubmit={this.handleSubmit} className="submit-button">Entrar</button>
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
}

export default Login;