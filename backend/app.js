require('dotenv').config();

var app = require('express')();

var session = require('express-session')


//setting up session -> all data avaliable in req.sessionStore.sessions[req.sessionId]
app.use(session({
    secret: 'synclab cat',
    resave: false,
    saveUninitialized: false,
}))

require('./config/loader')(app);

var server = require('http').createServer(app);

server.listen(process.env.PORT, req => {
    console.log(`Servidor na porta: ${process.env.PORT}, host:${process.env.HOST}`)
});