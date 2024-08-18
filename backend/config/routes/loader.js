express = require('express')

module.exports = app => {

    app.use('*', require('./user/loader')(express.Router()));
    
    app.use('/admin' , require("./admin/loader")(express.Router()));

}