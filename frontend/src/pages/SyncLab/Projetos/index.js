import Tabela from "../../../components/tabela";
import { Component } from "react";
import withRouter from "../../../components/withRouter";
import { UserContext } from "../../../components/userContext";
import fetchApi from "../../../fetch/fetch-api";

class Projetos extends Component {

    static contextType = UserContext;

    componentDidMount() {
        this.fetchProjetos();
    }

    fetchProjetos() {
        let {user} = this.context;
        if(user && user.matricula == 3) {
            
        }
    }

    render() {
        return (
            <h2>Projetos</h2>
        )
    }
}

export default withRouter(Projetos);