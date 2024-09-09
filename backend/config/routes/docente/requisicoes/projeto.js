import Logger from '../../../../logger/Logger.js';
import Docente from '../../../../src/models/Docente.js'

export default app => {
    app.post('/projetos', (req, res, next) => {
        let docente = new Docente(req.session.user);
        docente.reqProjeto(req.body).then(r => {
            Logger.info("api/docente/requisicoes/projetos", r);
            if(r) res.status(200).json({status:200, msg: "Requisição de projeto com sucesso!"});
            else res.status(404).json({status:404, msg: "Falha ao criar requisição de projeto."});
        }).catch(e => {
            Logger.danger('api/docente/solicitacoes/projetos', e);
            res.status(500).json({status:500, msg: "FATAL ERROR"})
        })
    })
}