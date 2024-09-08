import { Component } from "react";
import fetchApi from "../../../../../fetch/fetch-api";
import Tabela from '../../../../../components/tabela';
import withRouter from '../../../../../components/withRouter';

class ReqProjeto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reqProjetos: []
        }

        this.fetchReqProjetos.bind(this);
        this.handleSaveStatus.bind(this);
    }

    componentDidMount() {
        this.fetchReqProjetos();
    }

    fetchReqProjetos() {
        fetchApi('/api/admin/requisicoes/projeto', 'POST')
            .then(r => {
                console.log(r);
                r.json().then(resp => {
                    console.log(resp);
                    if (resp.status == 200) {
                        if (resp.data) {
                            this.setState({reqProjetos: resp.data})
                        }
                    }
                })
            })
            .catch(e => console.log(e));
    }

    buildTHead() {
        return ['Projeto', 'Requerente', 'Status', 'Salvar']
    }

    buildSelect(id, index, currentStatus) {
        return (
            <select value={currentStatus} key={"mat-select-"+id} onChange={e => {
                e.preventDefault();
                console.log(e.target.value);
                let newState = this.state.reqProjetos;
                newState[index].status = e.target.value;
                this.setState({reqProjetos: newState});
            }}>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Aceito">Aceito</option>
                <option value="Rejeitado">Rejeitado</option>
            </select>
        )
    }

    handleSaveStatus(e, id, status) {
        e.preventDefault()
        if(status != "Em Andamento") {
            fetchApi("/api/admin/requisicoes/projeto/"+id, "post", {id, status}).then(r => {
                this.fetchReqProjetos();
            })
            .catch(e => console.log(e));
        }
    }

    buildTBody() {
        return this.state.reqProjetos.map((proj, index) => {
            let tds = [];
            tds.push(<td key={proj.id + "-projeto"}>{proj.nome}</td>);
            tds.push(<td key={proj.id + "-requerente"}>{proj.requerente}</td>);
            tds.push(<td key={proj.id + "-status"}>{this.buildSelect(proj.id, index, proj.status)}</td>);
            tds.push(<td key={proj.id + "-click"} onClick={e => this.handleSaveStatus(e, proj.id, proj.status)}>S</td>);
            return tds;
        })
    }

    render() {

        let thead = this.buildTHead()

        let tbody = this.buildTBody()

        return (
            <>
                <h2>Requisições de Matrículas</h2>
                <Tabela {...this.props} thead={thead} tbody={tbody}></Tabela>
            </>
        )

    }

}

export default withRouter(ReqProjeto);