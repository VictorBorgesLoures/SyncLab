import DBConnection from '../database/Connection.js';
import Endereco from './Endereco.js';
import userValidators from '../validators/User.js';
import Logger from '../../logger/Logger.js';

export default class User {

    //Retrieve user's data from database by id (can be the id, username, e-mail or cookie)
    constructor(data) {
        this.matricula = null;
        for (let item in data) {
            this[item] = data[item];
        }
    }

    //Fetch user data by id
    static fetchUsuario(id) {
        return new Promise((resolve, reject) => {
            let idType = userValidators.isValidId(id);
            Logger.info('fetchUsuario', "idType: " + idType);
            if (idType != null) {
                let query = "select * from usuario where "
                query += idType + "=?;";

                DBConnection.createPool(query, [id])
                    .then(resp => {
                        if (resp.error) {
                            resolve(null);
                        } else if (resp.data.length > 0)
                            resolve(new User(resp.data[0]));
                        else
                            resolve(null);
                    })
                    .catch(e => {
                        Logger.danger('fetchUsuario', e);
                        resolve(null);
                    })
            } else {
                resolve(null);
            }

        })
    }

    static fetchEndereco(cep) {
        return new Promise((resolve, reject) => {
            let query = "select id from endereco where cep=?;";
            DBConnection.createPool(query, [cep])
                .then(resp => {
                    if (resp.error) {
                        resolve(null);
                    } else if (resp.data.length > 0)
                        resolve(new Endereco(data[0]));
                    else
                        resolve(null);
                })
                .catch(e => {
                    Logger.danger('fetchEndereco', e);
                    resolve(null);
                });
        })
    }

    static fetchNames(name, matchAll = false) {
        return new Promise((resolve, reject) => {
            let query = "select nome from Usuario where nome like (";
            if (matchAll) query += "'%";
            else query += "'";
            query += name;
            if (matchAll) query += "%'";
            else query += "'";
            query += ") limit 10;";
            DBConnection.createPool(query)
                .then(resp => {
                    if (resp.error) {
                        resolve([]);
                    } else
                        resolve(resp.data);
                })
                .catch(e => {
                    Logger.warning("fetchNames", e);
                    resolve([]);
                })
        });
    }

    //Create a new User on Database with the params
    static Registrar(data, endereco) {
        return new Promise((resolve, reject) => {
            this.fetchEndereco(endereco.cep)
                .then(async endDB => {
                    let endId;
                    if (endDB == null) {
                        Logger.info("Register", endereco);
                        let query = "insert into endereco (rua, cep) value(?,?)";
                        let keys = [endereco.rua, endereco.cep];
                        // get modified id form executed qury
                        let createEndResp = await DBConnection.createPool(query, keys);
                        if (createEndResp.error == null && createEndResp.data.affectedRows == 1) {
                            Logger.info("Register", "Created endereco")
                            endId = createEndResp.data.insertId;
                        } else {
                            resolve(false);
                        }
                    } else
                        endId = endDB.id;

                    let fields = userValidators.registerForm(data, endereco);
                    if (fields.length == 0) {
                        // exec query
                        let query = "insert into usuario(nome, username, senha, dataNasc, email, cpf, numero, complemento, idEndereco) value(?,?,?,?,?,?,?,?,?);";
                        let keys = [data.nome, data.username, data.senha, data.dataNasc, data.email, data.cpf, data.numero, data.complemento, endId];
                        DBConnection.createPool(query, keys)
                            .then(createUserResponse => {
                                if (createUserResponse.error == null && createUserResponse.data.affectedRows > 0) {
                                    resolve(true);
                                } else {
                                    resolve(false);
                                }
                            })
                            .catch(e => {
                                Logger.danger('Register', e);
                                resolve(false);
                            })

                    } else {
                        Logger.warning("Register", fields);
                        resolve(false);
                    }

                })
                .catch(e => {
                    Logger.warning("Register", e);
                    resolve(false);
                })
        });
    }

    //Compare user password if password param
    comparePassword(password) {
        if (userValidators.isValidPassword(password))
            return this.senha == password;
        else return false;
    }

    //Return all user's "matriculas" as array
    getMatriculas() {
        return new Promise((resolve, reject) => {
            let query = "select * from matricula where id=?;";
            DBConnection.createPool(query, [this.id])
                .then(resp => {
                    if(resp.error) {
                        resolve([]);
                    } else
                        resolve(resp.data);
                }).catch(e => {
                    Logger.danger('getMatriculas', e);
                    resolve([]);
                })
        })
    }

    getReqMatriculas() {
        return new Promise((resolve, reject) => {
            let query = "select * from req_matricula where id=?;";
            DBConnection.createPool(query, [this.id])
                .then(resp => {
                    if(resp.error) {
                        resolve([]);
                    } else
                        resolve(resp.data);
                }).catch(e => {
                    Logger.danger('getReqMatriculas', e);
                    resolve([]);
                })
        })
    }

    setReqMatricula(form) {
        return new Promise(resolve, reject => {
            if (userValidators.isValidReqMatricula(form)) {
                //essa query deve ter um trigger: verificar se já existe uma req com o mesmo número de matrícula e com status de "Em análise" ou "Ativo" (não inserir caso encontre)
                let query = "insert into req_matricula (idUsuario, matricula, tipo) values(?,?,?);"; 
                let keys = [this.id, form.matricula, form.tipo]
                DBConnection.createPool(query, keys)
                    .then(resp => {
                        if(resp.error == null && resp.data.affectedRows > 0) resolve(true);
                        else resolve(false);                        
                    })
                    .catch(e => {
                        Logger.danger("reqMatricula", e);
                        resolve(false);
                    })
            } else {
                resolve(false);
            }
        });
    }

    //Return user's address list as array
    getEndereco() {
        return this.endereco;
    }

}