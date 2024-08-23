import Logger from '../../../logger/Logger.js';
import User from '../../../src/models/User.js'

export default app => {

    //login
    app.post('/login', (req, res, next) => {
        Logger.info("Login", req.body);
        if(req.body) {
            User.fetchUsuario(req.body.id).then(u => {
                if(u) {
                    Logger.info("Login", "Usuário encontrado");
                    if(u.comparePassword(req.body.password)) {
                        Logger.info("Login", "Senha igual");
                        req.session.user = u;
                        req.session.save(err => {
                            console.log(req.sessionStore);
                            res.cookie(req.sessionID);
                            if(err) res.status(500).json({status:500, msg:"Não foi possível salvar a sessão"});
                            else res.status(200).json({status:200, msg:"Login realizado com sucesso!"});
                        });                        
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
        } else {
            res.status(404).json({status:401, msg:"Dados inválidos"});
        }

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