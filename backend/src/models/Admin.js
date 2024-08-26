import Logger from '../../logger/Logger.js';
import DBConnection from '../database/Connection.js';
import User from './User.js';

export default class Admin extends User {
    constructor(data) {
        return super(data);
    }

    //retorna a requisição de matricula a partir do status
    getReqMatriculas() {
        return new Promise((resolve, reject) => {
            let query = "select * from req_matricula where status='Em andamento';";
            DBConnection.createPool(query)
                .then(resp => {
                    if(resp.error == null) resolve(resp.data);
                    else resolve([]);
                })
                .catch(e => {
                    Logger.danger('ADMIN:getReqMatriculas', e);
                    resolve([]);
                })
        });
    }

    setReqMatriculaStatus(id, newStatus) {
        return new Promise((resolve, reject) => {
            let query = "update req_matricula set status=? where id=?;";
            DBConnection.createPool(query, [newStatus, id])
                .then(resp => {
                    if(resp.error == null && resp.data.affectedRows > 0) resolve(true);
                    else resolve(false);
                })
                .catch(e => {
                    Logger.danger('ADMIN:setReqMatriculaStatus', e);
                    resolve(false);
                })
        });
    }

    setMatricula(matricula) {
        return new Promise((resolve, reject) => {
            let query = "insert into matricula (matricula, tipo, idUsuario) values(?,?,?);";
            DBConnection.createPool(query, [matricula.matricula, matricula.tipo, matricula.idUsuario])
                .then(resp => {
                    if(resp.error == null && resp.data.affectedRows > 0) resolve(true);
                    else resolve(false);
                })
                .catch(e => {
                    Logger.danger('ADMIN:setMatricula', e);
                    resolve(false);
                })
        });
    }

    getReqMatricula(id) {
        return new Promise((resolve, reject) => {
            let query = "select * from req_matricula where id=?;";
            DBConnection.createPool(query, [id])
                .then(resp => {
                    if(resp.error == null) resolve(resp.data[0]);
                    else resolve(null);
                })
                .catch(e => {
                    Logger.danger('getReqMatricula:', e);
                    resolve(null);
                })
        })
    }

    //retorna a requisição de projeto a partir do status
    getReqProjetos() {
        return new Promise((resolve, reject) => {
            let query = "select * from req_projeto where status='Em andamento';";
            DBConnection.createPool(query)
                .then(resp => {
                    if(resp.error == null) resolve(resp.data);
                    else resolve([]);
                })
                .catch(e => {
                    Logger.danger('ADMIN:getReqProjetos', e);
                    resolve([]);
                })
        });
    }

    setReqProjetoStatus(id, newStatus) {
        return new Promise((resolve, reject) => {
            let query = "update req_projeto set status=? where id=?;";
            DBConnection.createPool(query, [newStatus, id])
                .then(resp => {
                    if(resp.error == null && resp.data.affectedRows > 0) resolve(true);
                    else resolve(false);
                })
                .catch(e => {
                    Logger.danger('ADMIN:setReqProjetoStatus', e);
                    resolve(false);
                })
        });
    }

    setProjeto(projeto) {
        return new Promise((resolve, reject) => {
            let query = "insert into projeto (nome, descricao, tutor) values(?,?,?);";
            DBConnection.createPool(query, [projeto.nome, projeto.descricao, projeto.matricula])
                .then(resp => {
                    if(resp.error == null && resp.data.affectedRows > 0) resolve(true);
                    else resolve(false);
                })
                .catch(e => {
                    Logger.danger('ADMIN:setProjeto', e);
                    resolve(false);
                })
        });
    }

    getReqProjeto(id) {
        return new Promise((resolve, reject) => {
            let query = "select * from req_projeto where id=?;";
            DBConnection.createPool(query, [id])
                .then(resp => {
                    if(resp.error == null) resolve(resp.data[0]);
                    else resolve(null);
                })
                .catch(e => {
                    Logger.danger('getReqProjeto:', e);
                    resolve(null);
                })
        })
    }

}

