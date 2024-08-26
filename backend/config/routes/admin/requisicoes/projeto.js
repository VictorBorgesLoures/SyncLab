import Logger from "../../../../logger/Logger.js";
import Admin from "../../../../src/models/Admin.js";

//api/admin/requisicoes
export default app => {

    // api/admin/requisicoes/projeto/
    app.get('/projeto', (req, res, next) => {
        let admin = new Admin(req.session.user); //tipo de usuario admin
        admin.getReqProjetos()
            .then(matriculas => {
                res.status(200).json({ status: 200, data: matriculas });
            })
            .catch(e => {
                Logger.danger('api/admin/requisicoes/projeto/', e);
                res.status(500).json({ status: 500, msg: "Erro fatal no DB" });
            })
    });


    //Tabela no front end colocar um select com status e um botão de salvar
    // api/admin/requisicoes/projeto/:id
    app.post('/projeto/:id', (req, res, next) => {
        let admin = new Admin(req.session.user); //tipo de usuario admin
        let projId = req.body.id;
        let projNovoStatus = req.body.status;
        admin.setReqProjetoStatus(projId, projNovoStatus).then(resp => {
            if (resp && projNovoStatus == "Aceito") {
                admin.getReqProjeto(projId)
                    .then(reqProjeto => {
                        if (reqProjeto) {
                            admin.setProjeto(reqProjeto)
                                .then(resp => {
                                    if (resp) res.status(200).json({ status: 200, msg: "Projeto criada com sucesso!" });
                                    else res.status(400).json({ status: 400, msg: "Não foi possível criar a projeto" });
                                })
                                .catch(e => {
                                    Logger.danger('api/admin/requisicoes/Projeto/:id', e);
                                    res.status(500).json({ status: 500, msg: "Erro fatal no DB" });
                                })
                        } else res.status(404).json({ status: 404, msg: "Requisição Projeto não encontrada" });
                    })
                    .catch(e => {
                        Logger.danger('api/admin/requisicoes/Projeto/:id', e);
                        res.status(500).json({ status: 500, msg: "Erro fatal no DB" });
                    })
            } else {
                res.status(404).json({ status: 404, msg: "Não foi possível atualizar status da requisição de projeto" });
            }
        })
            .catch(e => {
                Logger.danger('api/admin/requisicoes/matricula/:id', e);
                res.status(500).json({ status: 500, msg: "Erro fatal no DB" });
            })
    });
}