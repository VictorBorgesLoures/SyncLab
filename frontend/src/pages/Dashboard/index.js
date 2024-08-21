import React, { useState, useEffect } from 'react';
import './style.css';
import Painel from '../../components/painel';

function Dashboard() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    return (
        <>
            <Painel></Painel>
        </>
    )
}

export default Dashboard;