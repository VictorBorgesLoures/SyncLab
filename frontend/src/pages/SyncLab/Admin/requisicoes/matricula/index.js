import { Component } from "react";
import fetchApi from "../../../../../fetch/fetch-api";
import Tabela from '../../../../../components/tabela';
import withRouter from '../../../../../components/withRouter';
import { AiFillSave } from "react-icons/ai";
import userTipos from '../../../../../components/userTipos';

class ReqMatricula extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reqMatriculas: []
        }

        this.fetchReqMatriculas.bind(this);
        this.handleSaveStatus.bind(this);
    }

    componentDidMount() {
        this.fetchReqMatriculas();
    }

    fetchReqMatriculas() {
        fetchApi('/api/admin/requisicoes/matricula', 'POST')
            .then(r => {
                console.log(r);
                r.json().then(resp => {
                    console.log(resp);
                    if (resp.status == 200) {
                        if (resp.data) {
                            this.setState({reqMatriculas: resp.data})
                        }
                    }
                })
            })
            .catch(e => console.log(e));
    }

    buildTHead() {
        return ['Matricula', 'Tipo', 'Usuário', 'Status', 'Salvar']
    }

    buildSelect(id, index, currentStatus) {
        return (
            <select value={currentStatus} key={"mat-select-"+id} onChange={e => {
                e.preventDefault();
                console.log(e.target.value);
                let newState = this.state.reqMatriculas;
                newState[index].status = e.target.value;
                this.setState({reqMatriculas: newState});
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
            fetchApi("/api/admin/requisicoes/matricula/"+id, "post", {id, status}).then(r => {
                this.fetchReqMatriculas();
            })
            .catch(e => console.log(e));
        }
    }

    buildTBody() {
        return this.state.reqMatriculas.map((mat, index) => {
            let tds = [];
            tds.push(<td key={mat.id + "-matricula"}>{mat.matricula}</td>);
            tds.push(<td key={mat.id + "-tipo"}>{userTipos[mat.tipo]}</td>);
            tds.push(<td key={mat.id + "-nome"}>{mat.nome}</td>);
            tds.push(<td key={mat.id + "-status"}>{this.buildSelect(mat.id, index, mat.status)}</td>);
            tds.push(<td key={mat.id + "-click"} onClick={e => this.handleSaveStatus(e, mat.id, mat.status)}><AiFillSave /></td>);
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

export default withRouter(ReqMatricula);