import Helpers from "../helpers/helpers.js"

export default {
    isValidId: (data) => {
        return Helpers.userIdType(data);
    },
    isValidPassword: data => {
        return Helpers.isPassword(data);
    },
    isValidName: data => {
        return Helpers.isName(data);
    },
    isValidReqMatricula: data => {
        return Helpers.isMatricula(data.matricula) && Helpers.isMatriculaType(data.tipo);
    },
    registerForm: (data, endereco) => []
}