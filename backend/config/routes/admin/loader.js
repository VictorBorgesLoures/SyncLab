express = require('express');

module.exports = app => {

    app.use('*', async (req, res, next) => {
        user = req.user;
        if(user.matricula.tipo == 1) {
            req.user = new Admin(user); // implementar construtuor admin que já recebe o usuário (apenas atualizar o tipo)
            next();
        } else {
            res.status(401).json({status:401, msg:"Usuário não autorizado."});
        }
    });

    const requisicoesRouter = express.Router();

    require('./requisicoes/matricula')(requisicoesRouter);

    app.use('/requisicoes', requisicoesRouter)
}