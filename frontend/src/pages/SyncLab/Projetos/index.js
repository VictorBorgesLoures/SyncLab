import Tabela from "../../../components/tabela";
import { Component } from "react";
import withRouter from "../../../components/withRouter";
import { UserContext } from "../../../components/userContext";
import fetchApi from "../../../fetch/fetch-api";
import { Outlet } from "react-router-dom";
import SolicitarProj from './Solicitar'

class Projetos extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            projetos: [],
            fetchCount: 0
        }
    }

    componentDidMount() {
        this.fetchProjetos();
    }

    componentDidUpdate(a, b) {
        if(++this.state.fetchCount == 1)
            this.fetchProjetos();
    }

    fetchProjetos() {
        let {user} = this.context;
        if(user == null) return;
        let url = '/api'
        if(user && user.matricula.tipo == 3)url+= '/discente'
        else url += '/docente'
        url+= '/manager/projetos'
        console.log(url);
        fetchApi(url, 'post')
            .then(resp => {
                resp.json().then(d => {
                    console.log(d);
                    this.setState({projetos: d});
                })
            }).catch(e => console.log(e));
    }

    buildThead() {
        return ['Nome', 'Descrição', 'Data Criação', 'Status']
    }
    buildTbody() {
        return this.state.projetos.map((d, index) => {
            let tds = [];
            tds.push(<td key={d.id + "-nome"}>{d.nome}</td>);
            tds.push(<td key={d.id + "-descricao"}>{d.descricao}</td>);
            tds.push(<td key={d.id + "-dataCriacao"}>{d.dataCriacao}</td>);
            tds.push(<td key={d.id + "-status"}>{d.status}</td>);
            return tds;
        })
    }

    render() {

        let thead = this.buildThead();
        let tbody = this.buildTbody();
        let {user} = this.context;

        return (
            <>
                <h2>Projetos</h2>
                <Tabela {...this.props} thead={thead} tbody={tbody}></Tabela>
                {user && user.matricula.tipo == 2 ?  <SolicitarProj {...this.props} user={user}></SolicitarProj> : <></>}
               
            </>
        )
    }
}

export default withRouter(Projetos);