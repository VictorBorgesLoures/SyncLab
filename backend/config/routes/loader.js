express = require('express');

module.exports = app => {

    //Load login, register, and api outh routes
    app.use('*', require('./user/loader')(express.Router()));
    
    //Load discente routes
    app.use('/discente', require('./discente/loader')(express.Router()));

    //Load docente routes
    app.use('/docente', require('./docente/loader')(express.Router()));

    //Load admin routes
    app.use('/admin' , require("./admin/loader")(express.Router()));

}