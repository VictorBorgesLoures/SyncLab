import Tabela from "../../../components/tabela";
import { Component } from "react";
import withRouter from "../../../components/withRouter";
import fetchApi from "../../../fetch/fetch-api";

class Projetos extends Component {

    componentDidMount() {
        console.log(this)
    }

    fetchProjetos() {
       
    }

    render() {
        return (
            <h2>Projetos</h2>
        )
    }
}

export default withRouter(Projetos);