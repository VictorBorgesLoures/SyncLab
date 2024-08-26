import Logger from "../../../../logger/Logger.js";
import Admin from "../../../../src/models/Admin.js";

//api/admin/requisicoes/matricula
export default app => {

    // api/admin/requisicoes/matricula/
    app.get('/matricula', (req, res, next) => {
        let admin = new Admin(req.session.user); //tipo de usuario admin
        admin.getReqMatriculas()
            .then(matriculas => {
                res.status(200).json({status:200, data: matriculas});
            })
            .catch(e => {
                Logger.danger('api/admin/requisicoes/matricula/', e);
                res.status(500).json({status:500, msg:"Erro fatal no DB"});
            })
        //query que retorna todas as requisições de matrícula com status "Em andamento"
    });

    
    //Tabela no front end colocar um select com status e um botão de salvar
    // api/admin/requisicoes/matricula/:id
    app.post('/matricula/:id', (req, res, next) => {
        let admin = new Admin(req.session.user); //tipo de usuario admin
        let matId = req.body.id;
        let matNovoStatus = req.body.status;
        admin.setReqMatriculaStatus(matId, matNovoStatus).then( resp => {
            if(resp && matNovoStatus == "Aceito") {
                admin.getReqMatricula(matId)
                .then(reqMatricula => {
                    if(reqMatricula) {
                        admin.setMatricula(reqMatricula)
                            .then(resp => {
                                if(resp) res.status(200).json({status:200, msg: "Matrícula criada com sucesso!"});
                                else res.status(400).json({status:400, msg: "Não foi possível criar a matrícula"});
                            })
                            .catch(e => {
                                Logger.danger('api/admin/requisicoes/matricula/:id', e);
                                res.status(500).json({status:500, msg:"Erro fatal no DB"});
                            })
                    } else res.status(404).json({status:404, msg: "Requisição Matrícula não encontrada"});
                })
                .catch(e => {
                    Logger.danger('api/admin/requisicoes/matricula/:id', e);
                    res.status(500).json({status:500, msg:"Erro fatal no DB"});
                })
            } else {
                res.status(404).json({status:404, msg:"Não foi possível atualizar status da requisição de matrícula"});
            }
        })
        .catch(e => {
            Logger.danger('api/admin/requisicoes/matricula/:id', e);
            res.status(500).json({status:500, msg:"Erro fatal no DB"});
        })
    });   
}