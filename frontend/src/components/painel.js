import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { AiTwotoneProject } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

function Painel(props) {

    function renderUserMenu() {
        if(props.user) {
            let menu = [];
            if(props.user.matricula.tipo == 1) {
                menu.push(<div className={props.locate.pathname == "/synclab/admin/requisicoes" ? "painel-button active" : "painel-button"} key="reqSideBar">
                    <AiOutlineSend className={props.locate.pathname == "/synclab/admin/requisicoes" ? "icon-button active" : "icon-button"}/>
                    <Link to='admin/requisicoes' relative='true'>
                        <p className='painel-text' >Requisições</p>
                    </Link>
                </div>);
            }
            if(props.user.matricula.tipo == 2 || props.user.matricula.tipo == 3) {
                menu.push(<div className="painel-button" key="projSideBar">
                    <AiTwotoneProject />
                    <p className="painel-text">Projetos</p>
                </div>);
            } 
            if(props.user.matricula.tipo == 3) {
                menu.push(
                    <div className="painel-button" key="atvSideBar">
                        <AiOutlineFundProjectionScreen />
                        <p className="painel-text">Atividades</p>
                    </div>
                );
            }

            return menu;
        } else {
            return <>Dashboard</>
        }
    }

    return (
        <div className="painel-container">
            <img src={Logo} className="painel-logo" alt="logo-painel"/>
            {renderUserMenu()}            
        </div>
    )
}


export default Painel;