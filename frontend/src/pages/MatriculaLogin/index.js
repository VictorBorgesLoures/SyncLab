import { Component } from 'react';
import fetchapi from '../../fetch/fetch-api';
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
                    this.setState({matriculas: resp.data});
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
                <h1>Selecionar Matrícula</h1>
                <div className='matricula-form'>
                    {this.renderMatriculas()}
                    <button type="button" className='btn-submit'>Entrar</button>
                    <button type="button" className='btn-submit'>Requisitar Matrícula</button>
                </div>
            </>
        )
    }

}