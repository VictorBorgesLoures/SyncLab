let enumTypes = {
    "id": /\d{1,11}/
};

export default {
    userIdType: (data) => {
        for (let type in enumTypes) {
            if (enumTypes[type].exec(data)) {
                return type;
            }
        }
        return null;
    }
}