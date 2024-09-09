import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../components/withRouter';
import './style.css';
import Header from '../../components/header'
import Footer from '../../components/footer'
import fetchAPI from '../../fetch/fetch-api'
import Validators from '../../components/helpers';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        if (Validators.isValidId(this.state.email) && Validators.isValidPassword(this.state.password))
            fetchAPI("/login", "post", { id: this.state.email, password: this.state.password })
                .then(res => {
                    console.log(res);
                    res.json().then(r => {
                        console.log(r);
                        if (r.status == 200) {
                            this.props.navigate('/matricula');
                        }
                    });
                }).catch(e => {
                    console.log(e)
                })
    };

    render() {
        return (
            <>
                <Header showBtn={false} />
                <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
                    <h1 className='logintxt'>Login</h1>
                    <div className="form-group">
                        <p className="label" htmlFor="email">Email:</p>
                        <input
                            placeholder='Digite seu email'
                            type="int"
                            id="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
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
                            onChange={(e) => this.setState({ password: e.target.value })}
                            required
                        />
                        <button type="submit" className="submit-button">Entrar</button>
                        <Link to="/Registro">
                            <button className="register-button">Registrar</button>
                        </Link>
                    </div>
                </form>
                <Footer />
            </>
        )
    }
}

export default withRouter(Login);