import Docente from '../../../src/models/Docente.js'
import express from 'express'
import managerProjetos from './manager/projetos.js'
import requisicoesProjetos from './requisicoes/projeto.js'

export default app => {

    app.use('*', async (req, res, next) => {
        let user = req.session.user;
        if(user.matricula.tipo == 2) {
            req.session.user = new Docente(user); // implementar construtuor docente que já recebe o usuário (apenas atualizar o tipo)
            next();
        } else {
            res.status(401).json({status:401, msg:"Usuário não autorizado."});
        }
    })
    
    let requisicoesRouter = express.Router();
    requisicoesProjetos(requisicoesRouter);
    app.use('/requisicoes', requisicoesRouter);

    let managerRouter = express.Router();
    managerProjetos(managerRouter);
    app.use('/manager', managerRouter);

}