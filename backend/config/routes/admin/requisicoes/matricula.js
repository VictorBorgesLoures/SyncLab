import Logger from "../../../../logger/Logger.js";
import Admin from "../../../../src/models/Admin.js";

//api/admin/requisicoes/matricula
export default app => {

    // api/admin/requisicoes/matricula/
    app.get('/matricula', (req, res, next) => {
        //query que retorna todas as requisições de matrícula com status "Em análise"
    });

    
    //Tabela no front end colocar um select com status e um botão de salvar
    // api/admin/requisicoes/matricula/:id
    app.post('/matricula/:id', (req, res, next) => {
        user = req.user; //tipo de usuario admin
        id = req.body.id;
        novoStatus = req.body.status
        //exec query on db to get matricula request // tabela Req_Matricula // retorna uma promisse
        Admin.getReqMatricula(id).then( data => {
            if(data) {
                /*
                    data = {id, idUsuario, tipo, status}
                */
                user.updateReqMatricula(data, novoStatus)
                .then(r => {
                    if(r.affectedrows == 1) {
                        res.status(200).json({status:200, msg:"Matricula atualizada"});
                    } else {
                        res.status(401).json({status:401, msg:"Não foi possível atualizar matrícula"});
                    }
                })
                .catch(e => {
                    Logger.danger(e);
                    res.status(500).json({status:500, msg:"Erro fatal no DB"});
                })
            } else {
                res.status(404).json({status:404, msg:"Not found"});
            }
        })
        .catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Erro fatal no DB"});
        })
    });   
}