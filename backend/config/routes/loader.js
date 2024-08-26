import express from 'express'
import userLoader from './user/loader.js'
import discenteLoader from './discente/loader.js'
import docenteLoader from './docente/loader.js'
import adminLoader from './admin/loader.js'
import synclabLoader from './synclab/loader.js'

export default app => {

    //Load login, register, and api outh routes // FEITO
    userLoader(app);

    let apiRoutes = express.Router();

    //Load discente routes
    let discenteRouter = express.Router();
    discenteLoader(discenteRouter);
    apiRoutes.use('auth/discente', discenteRouter);

    //Load docente routes
    let docenteRouter = express.Router();
    docenteLoader(docenteRouter);
    apiRoutes.use('auth/docente', docenteRouter);

    //Load admin routes
    let adminRouter = express.Router();
    adminLoader(adminRouter);
    apiRoutes.use('auth/admin', adminRouter);

    //load synclab routes
    let synclabRouter = express.Router();
    synclabLoader(synclabRouter);
    apiRoutes.use('/synclab', synclabRouter);
    
    app.use('/api', apiRoutes);

}