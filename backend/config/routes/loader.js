import express from 'express'
import userLoader from './user/loader.js'
import discenteLoader from './discente/loader.js'
import docenteLoader from './docente/loader.js'
import adminLoader from './admin/loader.js'

export default app => {

    //Load login, register, and api outh routes // FEITO
    userLoader(app);

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