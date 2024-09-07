import React, { useState, useEffect, Component } from 'react';
import './style.css';
import withRouter from '../../../components/withRouter';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.user && this.props.user.matricula.tipo == 1) {
            this.props.navigate('synclab/admin');
        } else {
            document.title = 'SyncLab - Dashboard';
        }

    }


    render() {
        return (
            <h1>Dashboard</h1>
        )
    }
}

export default withRouter(Dashboard);