import { Component } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../../components/userContext";
import withRouter from "../../../components/withRouter";

class Admin extends Component {

    static contextType = UserContext;

    componentDidUpdate() {
        const {user} = this.context;
        if(user && user.matricula.tipo != 1) {
            this.props.navigate('/synclab/dashboard');
        } else {
            document.title = 'SyncLab - Admin';
        }
    }


    render() {
        
        return (
            <Outlet></Outlet>
        )

    }

}

export default withRouter(Admin);