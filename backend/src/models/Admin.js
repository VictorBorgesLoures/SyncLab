import DBConnection from '../database/Connection';
import User from './User';

export default class Admin extends User {
    constructor(id) {
        return super(id);
    }

    //Add matricula to user
    addMatricula(userId, matricula, tipo) {
        //exec query to add new matricula do user
    }

}

