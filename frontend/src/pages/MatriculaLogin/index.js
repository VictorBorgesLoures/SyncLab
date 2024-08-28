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

export default class MatriculaLoign extends Component {

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
                if(resp.status === 200) {
                    resp.json(r => this.setState({matriculas: r.data}));                    
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    handleSelectMatricula(e, mat) {
        e.preventDefault();
        if(mat.status == 'Ativo')
            this.setState({matricula:mat.matricula});
    }

    setDivClassMatricula(mat) {
        let className = 'matricula-input';
        if(mat.matricula === this.matricula)
            className+= ' active';
        if(mat.status == 'Desativado')
            className += ' disabled';
        return className;
    }

    renderMatTipo(tipo) {
        return matTipos[tipo];
    }

    renderMatriculas() {
        return this.state.matriculas.map(mat => {
            return (
                <div className={this.setDivClassMatricula(mat)} key={mat.matricula}  id={mat.matricula} onClick={e => this.handleSelectMatricula(e, mat)}>
                    <p>{mat.matricula}</p>
                    <p>{this.renderMatTipo(mat.tipo)}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <>
                <Header />
                <div className="matricula-center-items">
                    <div className='matricula-container'>
                        <h1>Matrícula</h1>
                        {this.renderMatriculas()}
                        <div className="matricula-box">
                            <button type="button" className='matricula-atual-btn'>Matricula Atual</button>
                            <div className='matricula-list'>
                                <button type="button" className='matricula-outra-btn'>Outra Matricula</button>
                                <button type="button" className='matricula-outra-btn'>Outra Matricula</button>
                                <button type="button" className='matricula-outra-btn'>Outra Matricula</button>
                            </div>
                        </div>
                        <button type="button" className='matricula-entrar-btn'>Entrar</button>
                        <button type="button" className='matricula-solicitar-btn'>Solicitar Matrícula</button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}