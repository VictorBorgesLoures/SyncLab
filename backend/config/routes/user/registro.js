import Logger from '../../../logger/Logger.js';
import User from '../../../src/models/User.js';

export default app => {

    //registro
    app.post('/registro', (req, res, next) => {
        User.Registrar(req.body.user, req.body.endereco).then(resp => {
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