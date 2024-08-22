import DBConnection from '../database/Connection.js';
import User from './User.js';

export default class Admin extends User {
    constructor(id) {
        return super(id);
    }

    //retorna a requisição de matricula a partir do id
    getReqMatricula(id) {
        
    }

    //retorna a requisição de projeto a partir do id
    getReqProjeto(id) {

    }

    updateReqMatricula(matricula, status) {
        if(status == "Aceito") {
            //Atualiza status da requisição para "aceito", cria a matricula do usuário da matricula para "Ativo"
        } else {
            //Atualiza status da requisição para rejeitado
        }
    }

    updateReqProjeto(projeto, status) {
        if(status == "Aceito") {
            //Atualiza status da requisição para "aceito", cria o projeto com status "Ativo"
        } else {
            //Atualiza status da requisição para rejeitado
        }
    }

}

