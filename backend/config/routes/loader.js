import express from 'express'
import userLoader from './user/loader.js'
import discenteLoader from './discente/loader.js'
import docenteLoader from './docente/loader.js'
import adminLoader from './admin/loader.js'

export default app => {

    //Load login, register, and api outh routes // FEITO
    let userRouter = express.Router();
    userLoader(userRouter);

    //oauth api routes
    app.use('*', userRouter);    
        //Check if assessing api, then must be a valid user
        app.use('*', (req, res, next) => {
            if(req._parsedUrl.pathname == '/api') {
                User.fectchUser(req.sessionStore.sessions[req.sessionId].id)
                .then(u => {
                    if(u && req.session.matricula) {
                        u.matricula = req.session.matricula;
                        req.user = u;
                        next();
                    } else {
                        res.status(500).json({status:500, msg:"Sem autorização"})
                    }
                })
                .catch(e => {
                    Logger.danger(e);
                })
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
    apiRoutes.use('/admin' , adminRouter);

    app.use('/api', apiRoutes);

}