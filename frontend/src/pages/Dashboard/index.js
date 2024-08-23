import React, { useState, useEffect } from 'react';
import './style.css';
import Painel from '../../components/painel';

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
                    Conteudo
                </div>
            </div>
        </>
    )
}

export default Dashboard;