import React, { useState, useEffect } from 'react';
import './style.css';
import withRouter from '../../../components/withRouter';

function Dashboard() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    return (
        <h1>Dashboard??</h1>
    )
}

export default withRouter(Dashboard);