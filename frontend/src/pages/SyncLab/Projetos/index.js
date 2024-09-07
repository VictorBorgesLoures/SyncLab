import Tabela from "../../../components/tabela";
import { Component } from "react";
import withRouter from "../../../components/withRouter";

class Projetos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabela {...this.props} />
        )
    }
}

export default withRouter(Projetos);