let enumTypes = {
    "id": /^\d{1,11}$/,
    "email": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "rua": /^[\p{L}\p{N}\s]*$/,
    "numero": /^\d{1,11}$/,
    "cep": /^\d{5}-?\d{3}$/,
    "complemento": /^[\w\s.,/()[\]-]{1,255}$/,
    "data": /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    "username": /^[A-Za-z]{1,100}(?:_[A-Za-z]{1,100}){0,99}$/,
    "password": /^\d{1,40}$/,
    "nome": /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+){0,254}$/,
    "matricula": /^\d{9,15}$/,
    "cpf": /^\d{11}$/,
    "matriculaType": /^[1-3]$/
};

export default {
    userIdType: (data) => {
        for (let type in enumTypes) {
            if ((type == "id" || type == "email") && enumTypes[type].exec(data)) {
                return type;
            }
        }
        return null;
    }, 
    isPassword: (data) => {
        if(data)
            return enumTypes["password"].exec(data);
        return false;
    },
    isName: (data) => {
        if(data)
            return enumTypes["nome"].exec(data);
        return false;
    }, 
    isMatricula: data => {
        if(data)
            return enumTypes["matricula"].exec(data);
        return false;
    },
    isMatriculaType: data => {
        if(data)
            return enumTypes["matriculaType"].exec(data);
        return false;
    },
    isValidRegisterForm: (data) => {
        let e = []
        for(let d in data) {
            if(!enumTypes[d].exec(data[d]))
                e.push(messageErros[d])
        }
        return e;
    }
}