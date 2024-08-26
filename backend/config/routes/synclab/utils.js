import Logger from "../../../logger/Logger.js";
import validators from '../../../src/validators/User.js';
import User from "../../../src/models/User.js";

export default app => {
    app.post('/getnames', (req, res, next) => {
        let name = req.body.name;
        let matchAll = req.body.matchAll;

        if(matchAll) matchAll = true;
        else matchAll = false;

        Logger.info("GETUSER", name);
        if(validators.isValidName(name)) {
            User.fetchNames(name, matchAll)
                .then( resp => {
                    res.status(200).json({status:200, data: resp})
                })
                .catch(e => {
                    Logger.danger("GETNAMES", e);
                    res.status(500).json({status:500, msg: "Fatal error"});
                })
        } else {
            res.status(401).json({status:401, msg: "Nome inválido"});
        }
    })

}