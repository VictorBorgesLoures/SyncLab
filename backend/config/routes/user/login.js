import Logger from '../../../logger/Logger';
import User from '../../../src/models/User'

module.exports = app => {

    //login
    app.post('/login', async (req, res, next) => {
        User.fectchUser(req.body.id).then(u => {
            if(u) {
                if(u.comparePassword(req.body.password)) {
                    req.session.id = u.id;
                    res.status(200).json({status:200, msg:"Login realizado com sucesso!"});
                } else {
                    res.status(400).json({status:400, msg:"Usuário ou senha inválido"});
                }
            } else {
                res.status(404).json({status:404, msg:"Usuário ou senha inválido"});
            }

        }).catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Fatal Error"});
        })

    });

    app.get('/logout', async (req, res, next) => {
        req.session.id = null;
        res.status(200).json({
            status:200,
            msg: "Logout feito com sucesso!"
        })
    })
}