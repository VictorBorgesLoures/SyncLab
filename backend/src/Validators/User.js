import Helpers from "../helpers/helpers.js"

export default {
    isValidId: (data) => {
        return Helpers.userIdType(data);
    },
    isValidPassword: data => {
        return Helpers.isPassword(data);
    },
    registerForm: (data, endereco) => []
}