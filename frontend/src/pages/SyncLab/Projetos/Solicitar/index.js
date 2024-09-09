import React, { Component } from "react";
import fetchApi from "../../../../fetch/fetch-api";

class SolicitarProjeto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            descricao: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        fetchApi('/api/docente/requisicoes/projetos', 'post', {nome: this.state.nome, descricao: this.state.descricao}).then(r => {
            console.log(r);
            r.json().then(resp => resp.status == 200 ? this.setState({nome: "", descricao: ""}) : "");
            
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <>
                <h2>Soliciar Projeto</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                        <p className="label" htmlFor="nome">Nome:</p>
                        <input
                            placeholder='Digite o nome do Projeto'
                            type="text"
                            id="nome"
                            value={this.state.nome}
                            onChange={(e) => this.setState({ nome: e.target.value })}
                            required
                        />

                        <p className="label" htmlFor="descricao">Descricao:</p>
                        <input
                            placeholder='Digite a descrição do Projeto'
                            type="text"
                            id="descricao"
                            value={this.state.descricao}
                            onChange={(e) => this.setState({ descricao: e.target.value })}
                            required
                        />
                        
                        <button type="submit" className="submit-button">Solicitar</button>
                    </div>
                </form>
            </>
        )

    }

}

export default SolicitarProjeto