let enumTypes = {
    "id": /\d{1,11}/,
    "password": /\d{1,40}/,
    "name": /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+){0,254}$/,
    "matricula": /^\d{9,15}$/,
    "matriculaType": /[1-3]/
};

export default {
    userIdType: (data) => {
        for (let type in enumTypes) {
            if (enumTypes[type].exec(data)) {
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
            return enumTypes["name"].exec(data);
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
    }
}