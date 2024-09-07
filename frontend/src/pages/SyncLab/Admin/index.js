import { Component } from "react";
import { Outlet } from "react-router-dom";
import withRouter from "../../../components/withRouter";

class Admin extends Component {

    componentDidMount() {
        if(this.props.user && this.props.user.matricula.tipo != 1) {
            this.props.navigate('synclab/dashboard');
        } else {
            document.title = 'SyncLab - Admin';
            if(this.props.locate.pathname == 'synclab/admin')
                this.props.navigate('synclab/admin/requisicoes');
        }
    }


    render() {
        
        return (
            <Outlet {...this.props}></Outlet>
        )

    }

}

export default withRouter(Admin);