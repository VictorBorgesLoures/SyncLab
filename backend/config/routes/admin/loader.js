import express from 'express'
import reqMatricula from './requisicoes/matricula.js'
import reqProjeto from './requisicoes/projeto.js'
import manMatricula from './manager/matricula.js'
import manProjeto from './manager/projeto.js'
import manRequisicao from './manager/requisicao.js'

export default app => {

    // Para todas as rotas a partir daqui o usuário e verificado se possui tipo admin, caso seja, o object req.user vira admin
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
    reqMatricula(requisicoesRouter);
    reqProjeto(requisicoesRouter);
    
    app.use('/requisicoes', requisicoesRouter);

    const managerRouter = express.Router();
    manMatricula(managerRouter);
    manProjeto(managerRouter);
    manRequisicao(managerRouter);

    app.use('/manager', managerRouter);

}