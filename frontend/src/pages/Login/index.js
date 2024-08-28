import React, {useEffect, componentDidMout, Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import fetchAPI from '../../fetch/fetch-api'

class Login extends Component {

    constructor(props) {
        console.log(props); 
        super(props);

        this.state = {
            email: "",
            password: ""
        }
        console.log(props); 

    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log("aqui");
        // Enviar email e senha para o servidor
        fetchAPI("/login", "post", { id: 1, password: 23041507 })
            .then(res => {
                console.log(res);
                res.json().then(r => {
                    if(r.status == 200) {
                        console.log("NAVIGATE!");
                        console.log(this);
                    }
                });
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
                    <form className="login-form" onSubmit={e=> this.handleSubmit(e)}>
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
}

export default Login;