import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import config from './config/loader.js'
import http from 'http'

dotenv.config();

var app = express();

//setting up session -> all data avaliable in req.sessionStore.sessions[req.sessionId]
app.use(session({
    secret: 'synclab cat',
    resave: false,
    saveUninitialized: false,
}));

config(app);

var server = http.createServer(app);

server.listen(process.env.PORT, req => {
    console.log(`Servidor na porta: ${process.env.PORT}, host:${process.env.HOST || "localhost"}`);
});