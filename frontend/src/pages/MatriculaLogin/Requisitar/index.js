import { Component } from 'react';
import fetchapi from '../../fetch/fetch-api';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.css';

let matTipos = {
    1: 'Admin',
    2: 'Docente',
    3: 'Dicente'
}

export default class MatriculaLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matricula: null,
            matriculas: []
        }

    }

    componentDidMount() {
        fetchapi('/api/matriculas', 'post')
            .then(resp => {
                if (resp.status == 200) {
                    resp.json().then(r => {
                        this.setState({ matriculas: r.data })
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    handleSelectMatricula(e, mat) {
        e.preventDefault();
        if (mat.status == 'Ativo')
            this.setState({ matricula: mat.matricula });
    }

    setDivClassMatricula(mat) {
        let className = 'matricula-btn';
        if (mat.matricula === this.state.matricula)
            className += ' active';
        if (mat.status == 'Desativado')
            className += ' disabled';
        return className;
    }

    renderMatTipo(tipo) {
        return matTipos[tipo];
    }

    renderMatriculas() {
        if (this.state.matriculas.length > 0)
            return this.state.matriculas.map(mat => {
                return (
                    <button type="button" className={this.setDivClassMatricula(mat)} key={mat.matricula} id={mat.matricula} onClick={e => this.handleSelectMatricula(e, mat)}>
                        {mat.matricula} - {this.renderMatTipo(mat.tipo)}
                    </button>
                );
            });
        else
            return (
                <button type="button" className="matricula-btn disabled">
                    Não há matrícula
                </button>
            )
    }

    render() {
        return (
            <div>
                <Header />
                <div className="matricula-center-items">
                    <div className='matricula-container'>
                        <h1>Requisitar Matrícula</h1>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}