import Logger from '../../../logger/Logger';
import User from '../../../src/models/User';

module.exports = app => {

    //registro
    app.post('/registro', async (req, res, next) => {
        User.Registrar(req.body).then(erros => {
            if(erros.length == 0) {
                res.status(200).json({status:200, msg:"Login realizado com sucesso!"});
            } else {
                res.status(400).json({status:400, msg:"Dados inválidos", erros});
            }
        }).catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Fatal Error"});
        })

    });
}