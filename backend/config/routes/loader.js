express = require('express')

module.exports = app => {
    
    app.use('/admin' , require("./admin/loader")(express.Router()));

}