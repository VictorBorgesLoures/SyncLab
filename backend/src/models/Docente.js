import Logger from '../../logger/Logger.js';
import DBConnection from '../database/Connection.js';
import User from './User.js';

export default class Docente extends User {
    constructor(data) {
        return super(data);
    }

    reqProjeto(data) {
        return new Promise((resolve, reject) => {
            let query = "insert into req_projeto (matricula, nome, descricao) values(?,?,?);";
            let keys = [this.matricula.matricula, data.nome, data.descricao];
            DBConnection.createPool(query, keys).then(r => {
                if(r.error) {
                    resolve(false)
                } else {
                    if(r.data.affectedRows == 1) resolve(true)
                    else resolve(false)
                }
            }).catch(e => {
                Logger.danger("reqProjeto", e)
                resolve(false)
            })
        })
    }

    getProjetos() {
        return new Promise((resolve, reject) => {
            console.log("?");
            let query = "select p.dataCriacao, p.nome, p.id, p.descricao, p.status from projeto p, matricula m where p.tutor = m.matricula and idUsuario=?;"
            DBConnection.createPool(query,[this.id]).then(resp => {
                if(resp.error) {
                    resolve([])
                } else if(resp.data.length > 0) {
                    resolve(resp.data)
                } else {
                    resolve([])
                }
            })
            .catch(e => {
                Logger.danger("getprojetos", e)
                resolve([])
            })
        })
    }

}

