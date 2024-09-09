import Logger from '../../../logger/Logger.js';
import User from '../../../src/models/User.js';
import helpers from '../../../src/helpers/helpers.js';

export default app => {

    //registro
    app.post('/registro', (req, res, next) => {
        Logger.info("Registro", req.body);
        if(helpers.isValidRegisterForm(req.body)) 
            User.Registrar(req.body).then(resp => {
                if(resp) {
                    res.status(200).json({status:200, msg:"Registro realizado com sucesso!"});
                } else {
                    res.status(400).json({status:400, msg:"Dados inválidos", erros});
                }
            }).catch(e => {
                Logger.danger(e);
                res.status(500).json({status:500, msg:"Fatal Error"});
            })
    });
}