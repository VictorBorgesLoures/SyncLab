import Docente from '../../../src/models/Docente.js'
import express from 'express'

export default app => {

    app.use('*', async (req, res, next) => {
        user = req.user;
        if(user.matricula.tipo == 2) {
            req.session.user = new Docente(user); // implementar construtuor discente que já recebe o usuário (apenas atualizar o tipo)
            next();
        } else {
            res.status(401).json({status:401, msg:"Usuário não autorizado."});
        }
    })
    
    let requisicoesRouter = express.Router();


    let managerRouter = express.Router();

}