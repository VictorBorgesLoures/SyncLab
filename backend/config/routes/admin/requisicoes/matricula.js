import Logger from "../../../../logger/Logger";

//api/admin/requisicoes/matricula
module.exports = app => {
    // api/admin/requisicoes/matricula/addMatricula
    app.post('addMatricula', async (req, res, next) => {
        user = req.user; //tipo de usuario admin

        id = req.body.matriculaId;

        if(validators.isValidId(id)) {
            reqDb; //exec query on db to get matricula request // tabela Req_Matricula // retorna uma promisse
            reqDb.then( data => {
                if(data) {
                    user.addMatricula(data.isUsuario, data.matricula, data.tipo)
                    .then(r => {
                        if(r.affectedrows == 1) {
                            res.status(200).json({status:200, msg:"Matricula registrada"});
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
        }
    });
}