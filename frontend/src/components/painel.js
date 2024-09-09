import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { AiTwotoneProject } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

class Painel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReqOpen: false
        }
    }

    componentDidMount() {
        if (this.isInAdminMatriculas() || this.isInAdminProjetos()) {
            this.setState({ isReqOpen: true })
        }
    }

    isInAdminProjetos() {
        let regex = /\/synclab\/admin\/requisicoes\/projetos/
        return regex.exec(this.props.locate.pathname);
    }

    isInProjetos() {
        let regex = /\/synclab\/projetos/
        return regex.exec(this.props.locate.pathname);
    }

    isInAtividades() {
        let regex = /\/synclab\/atividades/
        return regex.exec(this.props.locate.pathname);
    }

    isInAdminMatriculas() {
        let regex = /\/synclab\/admin\/requisicoes\/matriculas/
        return regex.exec(this.props.locate.pathname);
    }

    toogleRequisicoes(e) {
        e.preventDefault();
        this.setState({ isReqOpen: !this.state.isReqOpen })
    }

    renderUserMenu() {
        if (this.props.user) {
            let menu = [];
            if (this.props.user.matricula.tipo == 1) {
                menu.push(<div className={this.state.isReqOpen ? "painel-button active" : "painel-button"} key="reqSideBar">
                    <AiOutlineSend className={this.state.isReqOpen ? "icon-button active" : "icon-button"} />
                    <div className="panel-inside">
                        <p className='painel-text' to='admin/requisicoes' relative='true' onClick={e => this.toogleRequisicoes(e)}>Requisições</p>
                        <ul className={this.state.isReqOpen ? "inside-panel active" : "inside-panel"}>
                            <li className={this.isInAdminMatriculas() ? "inside-panel-li active" : "inside-panel-li"}>
                                <Link className='painel-text' to='admin/requisicoes/matriculas' relative='true'>
                                    Matriculas
                                </Link>
                            </li>
                            <li className={this.isInAdminProjetos() ? "inside-panel-li active" : "inside-panel-li"}>
                                <Link className='painel-text' to='admin/requisicoes/projetos' relative='true'>
                                    Projetos
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>);
            }
            if (this.props.user.matricula.tipo == 2 || this.props.user.matricula.tipo == 3) {
                menu.push(<div className={this.isInProjetos() ? "painel-button active" : "painel-button"} key="projSideBar">
                    <AiTwotoneProject />
                    <Link to='projetos' className='painel-text'>Projetos</Link>
                </div>);
            }
            if (this.props.user.matricula.tipo == 3) {
                menu.push(
                    <div className={this.isInAtividades() ? "painel-button active" : "painel-button"} key="atvSideBar">
                        <AiOutlineFundProjectionScreen />
                        <Link to='atividades' className='painel-text'>Atividades</Link>
                    </div>
                );
            }

            return menu;
        }
    }

    render() {
        return (
            <div className="painel-container">
                <Link to="/synclab">
                    <img src={Logo} className="painel-logo" alt="logo-painel" />
                </Link>
                {this.renderUserMenu()}
            </div>
        )
    }
}


export default Painel;