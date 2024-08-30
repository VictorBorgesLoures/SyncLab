import { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchapi from '../../fetch/fetch-api';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.css';
import fetchApi from '../../fetch/fetch-api';

let matTipos = {
    1: 'Admin',
    2: 'Docente',
    3: 'Dicente'
}

export default class RequisitarMatricula extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matricula: "",
            tipo: 1,
            reqMatriculas: []
        }
    }

    componentDidMount() {
        this.fetchReqMatriculas();
    }

    fetchReqMatriculas() {
        fetchApi('/api/reqMatriculas', 'post')
            .then(r => {
                r.json().then(m => {
                    console.log(m);
                    this.setState({ reqMatriculas: m.data })
                });
            })
            .catch(e => console.log(e));
    }

    renderMapTipos() {
        let render = []
        Object.keys(matTipos).forEach(t => {
            render.push(
                <option key={'mat-tipo-' + t} value={t}>{matTipos[t]}</option>
            )
        })
        return render;
    }

    renderMatTipo(tipo) {
        return matTipos[tipo];
    }

    renderOpenRequisitions() {
        return this.state.reqMatriculas.map(mat => {
            return (<button type="button" className='matricula-btn disabled' key={mat.matricula} id={mat.matricula} disabled>
                {mat.matricula} - {this.renderMatTipo(mat.tipo)}
            </button>
            )
        })
    }

    handleSubmitMatricula(e) {
        e.preventDefault();
        fetchapi('/api/matricula/registrar', 'post', {matricula: this.state.matricula, tipo: this.state.tipo})
            .then(r => r.json().then(re => {
                this.setState({...this.state, matricula: "", tipo:1});
                this.fetchReqMatriculas();
            }));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="matricula-center-items">
                    <div className='matricula-container'>
                        <h1>Solicitação de Matrícula</h1>
                        <form onSubmit={e => this.handleSubmitMatricula(e)}>
                            <p className="label">Número de Matricula:</p>
                            <input
                                placeholder='Digite sua matrícula'
                                type="number"
                                id="matricula"
                                value={this.state.matricula}
                                onChange={e => /\d+/.exec(e.target.value) ? this.setState({ matricula: e.target.value }) : ''}
                                required
                            />
                            <p className="label">Tipo de Vínculo:</p>
                            <select  name="select-vinculo" value={this.state.tipo} onChange={e => this.setState({ tipo: parseInt(e.target.value) })}>
                                {this.renderMapTipos()}
                            </select>
                            <button className="submit-requisitar-btn">Solicitar</button>
                            <Link to="/matricula"><button className="submit-requisitar-btn">Voltar</button></Link>
                        </form>
                    </div>
                    <div className='matricula-container'>
                        <h2>Requisições em aberto</h2>
                        <div className='matricula-box'>
                            {this.renderOpenRequisitions()}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}