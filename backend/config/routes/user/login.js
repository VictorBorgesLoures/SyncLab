import Logger from '../../../logger/Logger.js';
import User from '../../../src/models/User.js'

export default app => {

    //login
    app.post('/login', async (req, res, next) => {
        User.fetchUsuario(req.body.id).then(u => {
            if(u) {
                if(u.comparePassword(req.body.password)) {
                    req.sessionStore.sessions[req.sessionId].id = u.id;
                    req.sessionStore.sessions[req.sessionId].matricula = null;
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
        eq.sessionStore.sessions[req.sessionId].id = null;
        req.sessionStore.sessions[req.sessionId].matricula = null;
        res.status(200).json({
            status:200,
            msg: "Logout feito com sucesso!"
        })
    })
}