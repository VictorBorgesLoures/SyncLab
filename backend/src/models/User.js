import DBConnection from '../database/Connection';
import Endereco from './Endereco';
import validators from '../Validators/User';

export default class User {

    //Retrieve user's data from database by id (can be the id, username, e-mail or cookie)
    constructor(id) {
        this.id = id;
        if (validators.isValidId(id) ) {
            //get user form db by id;
                // return null if dosent exists
            //load user data to this elements;
        } else
            return null;
    }

    //Create a new User on Database with the params
    static Register(nome, idade, endereco) {
        // validade atributes
        // exec query
        // get modified id form executed query
        id;
        // return new User using the id from query
        return new User(id);
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
         //exec sql query
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