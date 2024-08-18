express = require('express');

module.exports = app => {

    //Load login, register, and api outh routes // FEITO
    userRouter = express.Router();
    require('./user/loader')(userRouter);

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

    apiRoutes = express.Router();

    //Load discente routes
    discenteRouter = express.Router();
    require('./discente/loader')(discenteRouter);
    apiRoutes.use('/discente', discenteRouter);

    //Load docente routes
    docenteRouter = express.Router();
    require('./docente/loader')(docenteRouter);
    apiRoutes.use('/docente', docenteRouter);

    //Load admin routes
    adminRouter = express.Router();
    require("./admin/loader")(adminRouter);
    apiRoutes.use('/admin' , adminRouter);

    app.use('/api', apiRoutes);

}