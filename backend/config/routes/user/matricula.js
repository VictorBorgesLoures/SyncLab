import Logger from "../../../logger/Logger.js"

export default app => {

    app.post('/api/matriculas', (req, res, next) => {
        let user = new User(req.session.user);
        user.getMatriculas()
            .then(matriculas => {
                res.status(200).json({status:200, data: matriculas});
            })
            .catch(e => {
                Logger.danger("/api/matriculas", e);
                res.status(500).json({status:500, msg:"Fatal Error"})
            })
    });

     // carrega matrícula na sessão
     app.post('/api/matricula', (req, res, next) => {
        let mat = req.body.matricula
        let user = new User(req.session.user);
        user.getMatriculas()
        .then(matriculas => {
            let found = false;
            matriculas.forEach(matricula => {
                if(matricula.id == mat) {
                    found = true;
                    user.matricula = matricula;
                    if(user.matricula.status == "Ativa") {
                        req.session.user = user;
                        req.session.save(err => {
                            console.log(req.sessionStore);
                            if(err) res.status(500).json({status:500, msg:"Não foi possível salvar a sessão"});
                            else res.status(200).json({status:200, msg:"Seleção de matrícula feita com sucesso"});
                        }); 
                    } else {
                        res.status(301).json({status:301, msg:"Não foi possível conectar, status da matrícula: "+user.matricula.status});
                    }
                    return;
                }
            });
            if(!found)
                res.status(404).json({status:404, msg:"Matrícula não encontrada"});              
        })
        .catch(e => {
            Logger.danger('/api/matricula', e);
            res.status(500).json({status:500, msg:"Fatal Error"})
        })
    });

    app.post('/api/matricula/registrar', (req, res, next) => {
        let matriculaForm = req.body;
        user.setReqMatricula(matriculaForm)
        .then(data => {
            if(data.affectedrows == 1) {
                res.status(200).json({status:200, msg:"Requisição de matrícula feita com sucesso."});
            } else {
                res.status(401).json({status:401, msg:"Não foi possível criar requisição de matrícula."});
            }
        })
        .catch(e => {
            Logger.danger('/api/matricula/registrar', e);
            res.status(500).json({status:500, msg:"Fatal Error"})
        })
    });
}