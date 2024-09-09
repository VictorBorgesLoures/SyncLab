import Docente from "../../../../src/models/Docente.js";
import Logger from "../../../../logger/Logger.js";

export default app => {

    app.post('/projetos', (req, res, next) => {
        console.log("AQUI");
        let user = req.session.user;
        let docente = new Docente(user);
        docente.getProjetos().then(r => {
            res.status(200).json(r);
        }).catch(e => {
            Logger.danger("api/docente/manager/projetos", e);
        })
    })
}