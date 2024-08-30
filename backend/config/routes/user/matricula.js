import Logger from "../../../logger/Logger.js"
import User from '../../../src/models/User.js'

export default app => {

    app.post('/api/matriculas', (req, res, next) => {
        let user = new User(req.session.user);
        user.getMatriculas()
            .then(matriculas => {
                res.status(200).json({ status: 200, data: matriculas });
            })
            .catch(e => {
                Logger.danger("/api/matriculas", e);
                res.status(500).json({ status: 500, msg: "Fatal Error" })
            })
    });

    // carrega matrícula na sessão
    app.post('/api/matricula', (req, res, next) => {
        let mat = req.body.matricula
        let user = new User(req.session.user);
        user.hasMatricula(mat)
            .then(matricula => {
                if(matricula) {
                    if (matricula.status == "Ativo") {
                        user.matricula = matricula;
                        req.session.user = user;
                        req.session.save(err => {
                            console.log(req.sessionStore);
                            if (err) res.status(500).json({ status: 500, msg: "Não foi possível salvar a sessão" });
                            else res.status(200).json({ status: 200, msg: "Seleção de matrícula feita com sucesso" });
                        });
                    } else {
                        res.status(301).json({ status: 301, msg: "Não foi possível conectar, status da matrícula: " + matricula.status });
                    }
                } else {
                    res.status(301).json({ status: 301, msg: "Não foi possível conectar, matrícula não encontrada"});
                }
            })
            .catch(e => {
                console.log(e);
                Logger.danger('/api/matricula', e);
                res.status(500).json({ status: 500, msg: "Fatal Error" })
            })
    });

    //Registra requisição de matrícula.
    app.post('/api/matricula/registrar', (req, res, next) => {
        let matriculaForm = req.body;
        let user = new User(req.session.user);
        user.setReqMatricula(matriculaForm)
            .then(r => {
                if (r) {
                    res.status(200).json({ status: 200, msg: "Requisição de matrícula feita com sucesso." });
                } else {
                    res.status(401).json({ status: 401, msg: "Não foi possível criar requisição de matrícula." });
                }
            })
            .catch(e => {
                Logger.danger('/api/matricula/registrar', e);
                res.status(500).json({ status: 500, msg: "Fatal Error" })
            })
    });

    //Pega as requisições de matrículas
    app.post('/api/reqMatriculas', (req, res, next) => {
        let user = new User(req.session.user);
        user.getReqMatriculas()
            .then(matriculas => {
                res.status(200).json({ status: 200, data: matriculas });
            })
            .catch(e => {
                Logger.danger('/api/matricula', e);
                res.status(500).json({ status: 500, msg: "Fatal Error" })
            })
    });
}