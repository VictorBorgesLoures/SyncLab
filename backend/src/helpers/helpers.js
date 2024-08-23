let enumTypes = {
    "id": /\d{1,11}/,
    "password": /\d{1,40}/,
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
    }
}