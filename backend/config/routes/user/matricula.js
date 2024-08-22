import Logger from "../../../logger/Logger.js"

export default app => {
     // carrega matrícula na sessão
     app.post('/api/matricula', (req, res, next) => {
        mat = req.body.matricula
        user = req.user;
        user.carregarMatricula(mat)
        .then(matricula => {
            if(matricula) {
                user.matricula = matricula;
                if(user.matricula.status == "Ativa") {
                    req.session.matricula = matricula;
                    res.status(200).json({status:200, msg:"Seleção de matrícula feita com sucesso"});
                } else {
                    res.status(301).json({status:301, msg:"Não foi possível conectar, status da matrícula: "+user.matricula.status});
                }
            } else {
                res.status(404).json({status:404, msg:"Matrícula não encontrada"});
            }
        })
        .catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Fatal Error"})
        })
    });

    app.post('/api/matricula/registrar', (req, res, next) => {
        matriculaForm = req.body;
        user.reqMatricula(matriculaForm)
        .then(data => {
            if(data.affectedrows == 1) {
                res.status(200).json({status:200, msg:"Requisição de matrícula feita com sucesso."});
            } else {
                res.status(401).json({status:401, msg:"Não foi possível criar requisição de matrícula."});
            }
        })
        .catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Fatal Error"})
        })
    });
}