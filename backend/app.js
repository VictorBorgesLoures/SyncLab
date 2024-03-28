require('dotenv').config();

var app = require('express')();

require('./config/loader')(app);

var server = require('http').createServer(app);

server.listen(process.env.PORT, req => {
    console.log(`Servidor na porta: ${process.env.PORT}, host:${process.env.HOST}`)
});