import express from 'express'
import userLoader from './user/loader.js'
import discenteLoader from './discente/loader.js'
import docenteLoader from './docente/loader.js'
import adminLoader from './admin/loader.js'
import Logger from '../../logger/Logger.js'

export default app => {

    //Load login, register, and api outh routes // FEITO
    userLoader(app);

    //oauth api routes
    app.use('*', (req, res, next) => {
        //Check if assessing api, then must be a valid user
        if (req._parsedUrl.pathname == '/api') {
            Logger.info("ROUTER", "API CALL");
            req.session.reload(err => {
                if (!err) {
                    User.fectchUser(req.session.user)
                        .then(u => {
                            if (u && req.session.matricula) {
                                u.matricula = req.session.matricula;
                                req.user = u;
                                next();
                            } else {
                                res.status(500).json({ status: 500, msg: "Sem autorização" })
                            }
                        })
                        .catch(e => {
                            Logger.danger(e);
                        })
                } else {
                    res.status(500).json({ status: 500, msg: "Sem autorização" })
                }
            })
        } else {
            Logger.info("ROUTER", "NOT API CALL");
            next();
        }
    });

    let apiRoutes = express.Router();

    //Load discente routes
    let discenteRouter = express.Router();
    discenteLoader(discenteRouter);
    apiRoutes.use('/discente', discenteRouter);

    //Load docente routes
    let docenteRouter = express.Router();
    docenteLoader(docenteRouter);
    apiRoutes.use('/docente', docenteRouter);

    //Load admin routes
    let adminRouter = express.Router();
    adminLoader(adminRouter);
    apiRoutes.use('/admin', adminRouter);

    app.use('/api', apiRoutes);

}