import Logger from "../../../../logger/Logger";
import Admin from "../../../../src/models/Admin";

//api/admin/requisicoes/matricula
module.exports = app => {

    // api/admin/requisicoes/matricula/
    app.get('/matricula', async (req, res, next) => {

    });

    // api/admin/requisicoes/matricula/addMatricula
    app.post('addMatricula', async (req, res, next) => {
        user = req.user; //tipo de usuario admin

        id = req.body.matriculaId;

//exec query on db to get matricula request // tabela Req_Matricula // retorna uma promisse
        Admin.getMatricula(id).then( data => {
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
    });

     // api/admin/requisicoes/matricula/:id
     app.get('/:id', async (req, res, next) => {

     });

    // api/admin/requisicoes/matricula/:id/editMatricula
    app.post('/:id/editMatricula')

   
}