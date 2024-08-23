import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import config from './config/loader.js'
import http from 'http'

dotenv.config();

var app = express();

app.set("trust proxy", 1);

//setting up session -> all data avaliable in req.sessionStore.sessions[req.sessionId]
app.use(session({
    secret: 'synclab cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

config(app);

var server = http.createServer(app);

server.listen(process.env.PORT, req => {
    console.log(`Servidor na porta: ${process.env.PORT}, host:${process.env.HOST || "localhost"}`);
});