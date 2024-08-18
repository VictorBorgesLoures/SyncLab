const Logger = require('../../../logger/Logger');

module.exports = app => {

    // carrega matrícula na sessão
    app.post('/matricula', (req, res, next) => {
        mat = req.body.matricula
        user = req.user;
        user.carregarMatricula(mat)
        .then(matricula => {
            if(matricula) {
                user.matricula = matricula;
                req.session.matricula = matricula;
                res.status(200).json({status:200, msg:"Seleção de matrícula feita com sucesso"});
            } else {
                res.status(404).json({status:404, msg:"Matrícula não encontrada"});
            }
        })
        .catch(e => {
            Logger.danger(e);
            res.status(500).json({status:500, msg:"Fatal Error"})
        })
    });
    
    require('./login')(app);
    require('./registro')(app);

}