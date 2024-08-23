import DBConnection from '../database/Connection.js';
import Endereco from './Endereco.js';
import userValidators from '../validators/User.js';
import Logger from '../../logger/Logger.js';

export default class User {

    //Retrieve user's data from database by id (can be the id, username, e-mail or cookie)
    constructor(data) {
        for(let item in data) {
            this[item] = data[item];
        }
        this.matriculas = null;
        //...
    }

    //Fetch user data by id
    static fetchUsuario(id) {
        return new Promise((resolve, reject) => {
            let idType = userValidators.isValidId(id);
            Logger.info('fetchUsuario', "idType: " + idType);
            if (idType != null) {
                let query = "select * from usuario where "
                query += idType + "=?;";

                DBConnection.createPool(query, [id]).then(data => {
                    if (data.length > 0)
                        resolve(new User(data[0]));
                    else
                        resolve(null);
                })
                    .catch(e => {
                        Logger.danger('fetchUsuario', e);
                        reject(e);
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
                    Logger.info('fetchEndereco', resp);
                    if (resp.length > 0)
                        resolve(new Endereco(resp[0]));
                    else
                        resolve(null)
                })
                .catch(e => {
                    Logger.danger('fetchEndereco', e);
                });
        })
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
                        if (createEndResp && createEndResp.affectedRows == 1) {
                            Logger.info("Register", "Created endereco")
                            endId = createEndResp.insertId;
                        } else {
                            resolve({status:500, msg: "FODEU"});
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
                                if (createUserResponse.affectedRows > 0) {
                                    Logger.success('Register:', createUserResponse);
                                    resolve(true);
                                } else {
                                    Logger.warning("Register", "Usuário não foi inserido");
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
        if(userValidators.isValidPassword(password))
            return this.senha == password;
        else return false;
    }

    //Return all user's "matriculas" as array
    getMatriculas() {
        return new Promise((resolve, reject) => {
            if (this.matriculas != null)
                resolve(this.matriculas);
            let query = "select * from matricula where id=?";
            DBConnection.createPool(query, [this.id])
                .then(data => {
                    Logger.info('getMatriculas', data);
                    resolve(data);
                }).catch(e => {
                    Logger.danger('getMatriculas', e);
                    reject({ status: 500, msg: ['Error on query'] });
                })
        })
    }

    reqMatricula(form) {
        return new Promise(resolve, reject => {
            if (validators.isValidReqMatricula(form)) {
                //exec query on db 
                //essa query deve derificar se já existe uma req com o mesmo número de matrícula e com status de "Em análise"   
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    //Return user's address list as array
    getEndereco() {
        return this.endereco;
    }

    //Return all user's reservations as array
    getReservas() {
        //exec sql query
    }

    //Try to set reserva on lab - every reservation will be for 2 hours
    setReserva(idLab, data) {
        // valid date - use datetimeoffset sql format, minutes and seconds will always be 00
        // exec query
        // return true or false as the query valid/invalid response
    }

    //Retrive user's Requisitions
    getRequisicoes() {
    }

    //Try to create a request
    setRequisicoes() {

    }

}