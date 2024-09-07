import { Component } from "react";
import fetchApi from "../../fetch/fetch-api";
import { Outlet } from "react-router-dom";
import UserHeader from '../../components/userHeader';
import Painel from '../../components/painel';
import './styles.css';
import withRouter from '../../components/withRouter';

class SyncLab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        fetchApi('/api/synclab/user', 'post').then(resp => {
            console.log(resp);
            resp.json().then(r => {
                console.log(r);
                this.setState({user: r.data})
            });
        })
        .catch(e=>console.log(e))
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="div-painel">
                    <Painel {...this.props} user={this.state.user}></Painel>
                </div>
                <div className="dashboard-content">
                    <UserHeader {...this.props} user={this.state.user}></UserHeader>
                    <Outlet {...this.props} user={this.state.user}></Outlet>
                </div>
            </div>
        )
    }
}

export default withRouter(SyncLab);