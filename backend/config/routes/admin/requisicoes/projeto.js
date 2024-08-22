import Logger from "../../../../logger/Logger.js";
import Admin from "../../../../src/models/Admin.js";

//api/admin/requisicoes
export default app => {

    // api/admin/requisicoes/projeto/
    app.get('/projeto', (req, res, next) => {
        //query que retorna todas as requisições de projeto com status "Em análise"
    });

    
    //Tabela no front end colocar um select com status e um botão de salvar
    // api/admin/requisicoes/projeto/:id
    app.post('/projeto/:id', (req, res, next) => {
        user = req.user; //tipo de usuario admin
        id = req.body.id;
        novoStatus = req.body.status
        //exec query on db to get projeto request // tabela Req_Projeto // retorna uma promisse
        Admin.getReqProjeto(id).then( data => {
            if(data) {
                /*
                    data = {id, matricula, nome, descricao, status}
                */
                user.updateReqProjeto(data, novoStatus)
                .then(r => {
                    if(r.affectedrows == 1) {
                        res.status(200).json({status:200, msg:"Projeto atualizado"});
                    } else {
                        res.status(401).json({status:401, msg:"Não foi possível atualizar o projeto"});
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