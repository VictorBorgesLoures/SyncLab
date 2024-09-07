import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { AiTwotoneProject } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

function Painel(props) {

    function isInRequisicoes() {
        let regex = /^\/synclab\/admin\/requisicoes/
        return regex.exec(props.locate.pathname);
    }

    function isInProjetos() {
        let regex = /\/synclab\/admin\/requisicoes\/projetos/
        return regex.exec(props.locate.pathname);
    }

    function isInMatriculas() {
        let regex = /\/synclab\/admin\/requisicoes\/matriculas/
        return regex.exec(props.locate.pathname);
    }

    function renderUserMenu() {
        if (props.user) {
            let menu = [];
            if (props.user.matricula.tipo == 1) {
                menu.push(<div className={isInRequisicoes() ? "painel-button active" : "painel-button"} key="reqSideBar">
                    <AiOutlineSend className={isInRequisicoes() ? "icon-button active" : "icon-button"} />
                    <div className="panel-inside">
                        <Link className='painel-text' to='admin/requisicoes' relative='true'>Requisições</Link>
                        <ul className={isInRequisicoes() ? "inside-panel active" : "inside-panel"}>
                            <li className={isInMatriculas() ? "inside-panel-li active" : "inside-panel-li"}> 
                                <Link className='painel-text' to='admin/requisicoes/matriculas' relative='true'>
                                    Matriculas
                                </Link>
                            </li>
                            <li className={isInProjetos() ? "inside-panel-li active" : "inside-panel-li"}> 
                                <Link className='painel-text' to='admin/requisicoes/projetos' relative='true'>
                                    Projetos
                                </Link>
                            </li>
                        </ul>
                    </div>
                  
                </div>);
            }
            if (props.user.matricula.tipo == 2 || props.user.matricula.tipo == 3) {
                menu.push(<div className="painel-button" key="projSideBar">
                    <AiTwotoneProject />
                    <p className="painel-text">Projetos</p>
                </div>);
            }
            if (props.user.matricula.tipo == 3) {
                menu.push(
                    <div className="painel-button" key="atvSideBar">
                        <AiOutlineFundProjectionScreen />
                        <p className="painel-text">Atividades</p>
                    </div>
                );
            }

            return menu;
        }
    }

    return (
        <div className="painel-container">
            <Link to="/synclab">
                <img src={Logo} className="painel-logo" alt="logo-painel" />
            </Link>
            {renderUserMenu()}
        </div>
    )
}


export default Painel;