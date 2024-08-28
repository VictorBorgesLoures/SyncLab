import React, { useState, useEffect } from 'react';
import './style.css';
import Painel from '../../components/painel';
import UserHeader from '../../components/userHeader';
import withRouter from '../../components/withRouter';

function Dashboard() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    return (
        <>
            <div className="dashboard-container">
                <div className="div-painel">
                    <Painel></Painel>
                </div>
                <div className="dashboard-content">
                    <UserHeader></UserHeader>
                    Conteudo
                </div>
            </div>
        </>
    )
}

export default withRouter(Dashboard);