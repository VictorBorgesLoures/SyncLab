import { Component } from "react";
import fetchApi from "../../fetch/fetch-api";
import { Outlet  } from "react-router-dom";
import UserHeader from '../../components/userHeader';
import Painel from '../../components/painel';
import withRouter from "../../components/withRouter";
import { UserContext } from "../../components/userContext";
import './style.css';

class SyncLab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        console.log(this);
        this.getUser();
    }

    getUser() {
        fetchApi('/api/synclab/user', 'post').then(resp => {
            console.log(resp);
            resp.json().then(r => {
                this.setState({ user: r.data }, () => {
                    if (this.state.user && this.state.user.matricula.tipo == 1) {
                        this.props.navigate(this.props.locate.pathname == "/synclab" ? '/synclab/admin' : this.props.locate.pathname);
                    } else {
                        if (this.props.locate.pathname == '/synclab')
                            this.props.navigate('dashboard');
                    }
                })
            });
        })
        .catch(e=>console.log(e))
    }

    render() {
        return (
            <UserContext.Provider value={{user:this.state.user}}>
                <div className="dashboard-container">
                    <div className="div-painel">
                        <Painel {...this.props} user={this.state.user}></Painel>
                    </div>
                    <div className="dashboard-content">
                        <UserHeader {...this.props} user={this.state.user}></UserHeader>
                        <Outlet ></Outlet>
                    </div>
                </div>                
            </UserContext.Provider>
        )
    }
}

export default withRouter(SyncLab);