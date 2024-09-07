import { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.css';
import { Link } from 'react-router-dom';
import fetchApi from '../../fetch/fetch-api';
import withRouter from '../../components/withRouter';

let matTipos = {
    1: 'Admin',
    2: 'Docente',
    3: 'Dicente'
}

class MatriculaLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matricula: null,
            matriculas: []
        }

    }

    componentDidMount() {
        fetchApi('/api/matriculas', 'post')
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

    handleLogin(e) {
        e.preventDefault();
        console.log( this.state.matricula);
        fetchApi('/api/matricula', 'post', {matricula: this.state.matricula})
            .then(resp => {
                resp.json().then(r => {
                    console.log(r);
                    if(r.status == 200) this.props.navigate('/synclab');
                })
            }).catch(e => console.log(e));
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
                        <button type="button" className='matricula-entrar-btn' onClick={(e) => this.handleLogin(e)}>Entrar</button>
                        <button type="button"  className='matricula-solicitar-btn'>
                            <Link to="./requisitar" className='matricula-solicitar-btn'>Solicitar Matrícula</Link>
                        </button>
                        
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default withRouter(MatriculaLogin);