import Discente from '../../../src/models/Discente.js'
import express from 'express'

export default app => {

    app.use('*', async (req, res, next) => {
        user = req.user;
        if(user.matricula.tipo == 2) {
            req.user = new Discente(user); // implementar construtuor discente que já recebe o usuário (apenas atualizar o tipo)
            next();
        } else {
            res.status(401).json({status:401, msg:"Usuário não autorizado."});
        }
    })
    
    let projetoRouter = express.Router();


}