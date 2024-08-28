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
            matricula: 123321,
            matriculas: [ {
                matricula: 123321,
                tipo: 1,
                status: "Ativo"
            }, {
                matricula: 33332,
                tipo: 2,
                status: "Ativo"
            }, {
                matricula: 12313,
                tipo: 3,
                status: "Desativado"
            }]
        }

    }

    componentDidMount() {
        fetchapi('/api/matriculas', 'post')
            .then(resp => {
                if (resp.status == 200) {
                    console.log(resp);
                    resp.json().then(r => {
                        console.log(r.data);
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
        return this.state.matriculas.map(mat => {
            return (
                <button type="button" className={this.setDivClassMatricula(mat)} key={mat.matricula} id={mat.matricula} onClick={e => this.handleSelectMatricula(e, mat)}>
                    {mat.matricula} - {this.renderMatTipo(mat.tipo)}
                </button>
            );
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="matricula-center-items">
                    <div className='matricula-container'>
                        <h1>Matrícula</h1>
                        <div className="matricula-box">
                            {this.renderMatriculas()}
                        </div>
                        <button type="button" className='matricula-entrar-btn'>Entrar</button>
                        <button type="button" className='matricula-solicitar-btn'>Solicitar Matrícula</button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}