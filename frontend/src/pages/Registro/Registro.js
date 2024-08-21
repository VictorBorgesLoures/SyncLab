import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header'
import Footer from '../../components/footer'

function Registro() {
    useEffect(() => {
        document.title = 'SyncLab';
    }, []);

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [data, setData] = useState('');
    const [username, setUsername] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaconf, setSenhaconf] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');

    return (
        <>
            <Header showBtn={true} />
            <div className="container create-account-box">

                <form className='form-box'>
                    <div>
                        <h1 className="title">Criar uma conta<br></br>SyncLab</h1>
                        <p className="label">Rua</p>
                        <input
                        placeholder='Digite sua rua'
                        type="text"
                        id="rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        required
                        />

                        <div className="box-cep">
                            <div>
                                <p className="label">Número</p>
                                <input
                                placeholder='Digite seu número'
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                id="text"
                                required
                                />
                            </div>
                            <div className="space"></div>
                            <div>
                                <p className="label">CEP</p>
                                <input
                                placeholder='Digite seu CEP'
                                type="text"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                id="cep"
                                required
                                />
                            </div>
                        </div>
                        <p className="label">Complemento</p>
                        <input
                        placeholder='Digite o complemento'
                        type="text"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        id="complemento"
                        required
                        />

                    </div>
                    <div>
                        <p className="label">Nome</p>
                        <input
                        placeholder='Digite seu Nome'
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id="nome"
                        required
                        />

                        <p className="label">Endereço de E-mail</p>
                        <input
                        placeholder='Digite seu e-mail'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        required
                        />

                        <div className="box-cep">
                            <div>
                                <p className="label">Username</p>
                                <input
                                placeholder='Digite seu username'
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                required
                                />
                            </div>
                            <div className="space"></div>
                            <div>
                                <p className="label">Data de Nascimento</p>
                                <input
                                placeholder='dd/mm/aaaa'
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                id="data"
                                required
                                />
                            </div>
                        </div>

                        <p className="label">Senha</p>
                        <input
                        placeholder='Digite seu e-mail'
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        />

                        <p className="label">Confirmação de Senha</p>
                        <input
                        placeholder='Confirme a senha'
                        type="password"
                        id="senha_conf"
                        value={senhaconf}
                        onChange={(e) => setSenhaconf(e.target.value)}
                        required
                        />

                        <p className="label">CPF</p>
                        <input
                        placeholder='Digite seu CPF'
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        />

                        <p className="label">Matrícula</p>
                        <input
                        placeholder='Digite sua matrícula'
                        type="text"
                        id="matricula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        required
                        />

                        <button className="submit-register">Registrar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Registro;