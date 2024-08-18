import DBConnection from '../database/Connection';
import Endereco from './Endereco';
import validators from '../Validators/User';
import Logger from '../../logger/Logger';

export default class User {

    //Retrieve user's data from database by id (can be the id, username, e-mail or cookie)
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        //...
    }

    //Fetch user data by id
    static fetchUsuario(id) {
        if(validators.isValidId(id)) {
            user; // query on db get user data
            user.then(data => {
                return new User(data);
            })
            .catch(e => {
                Logger.danger(e);
            })
        } else return null;
    }

    //Create a new User on Database with the params
    static Register(nome, idade, endereco) {
        // validade atributes
        // exec query
        // get modified id form executed query
        id;
        // return new User using the id from query
        return this.fetchUsuario(id);
    }

    /*
    Set a new cookie on the current user, if not possible return null
    OBS: the user cookie will be associated with "matricula"
    */
    Login() {
        // generate new cookie
        // change user's cookie on db
        // return cookie to set on the user's browser
            // if impossible to set cookie return null
    }

    Logout() {
        // remove user's cookie on db
    }

    //The cookie param is got from user's cookie device (browser)
    validCookie(cookie) {
        // check if user's cookie is the same
    }

    //Return all user's "matriculas" as array
    getMatriculas() {
        matriculas; //exec sql query
        matriculas.then(mat => {
            return mat;
        })
        .catch(e => {
            Logger.danger(e);
        })
    }

    reqMatricula(form) {
        return new Promise (resolve, reject => {
            if(validators.isValidReqMatricula(form)) {
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