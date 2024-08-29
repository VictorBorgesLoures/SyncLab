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
            matricula: "",
            tipo: 1
        }
    }

    renderMapTipos() {
        let render = []
        Object.keys(matTipos).forEach(t => {
            render.push(
                <option key={'mat-tipo-'+t} value={t}>{matTipos[t]}</option>
            )
        })
        return render;
    }

    handleSubmitMatricula(e) {
        e.preventDefault();
        fetchapi('/api/matricula/registrar', 'post', this.state)
            .then(r => console.log(r));
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
                                onChange={e=> /\d+/.exec(e.target.value) ? this.setState({matricula: e.target.value}) : ''}
                                required
                            />
                            <p className="label">Tipo de Vínculo:</p>
                            <select defaultValue={1} name="select-vinculo" onChange={ e=> this.setState({tipo: parseInt(e.target.value)})}>
                                {this.renderMapTipos()}
                            </select>
                            <button className="submit-requisitar-btn">Solicitar</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}