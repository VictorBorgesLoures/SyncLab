import Logger from "../../../logger/Logger.js";

function apiAuth(req, res, next) {
    if (/^\/api/.exec(req._parsedUrl.pathname)) {
        if (req.session.user) {
            Logger.info("AUTH", "Valid User");
            next();
        } else {
            Logger.info("AUTH", "Invalid User");
            res.status(301).json({ status: 301, redirect: "/login", msg: "Sessão Inválida" });
        }
    } else {
        Logger.info("AUTH", "NOT API CALL");
        next();
    }
}

export default app => {
    Logger.info("ROUTES", "LOADING AUTH");

    app.use(apiAuth);

    app.post('/auth', (req, res, next) => {
        Logger.info("API/AUTH", "AUTH CALL");
        if (req.session.user) {
            Logger.info("API/AUTH", "VALID USER");
            if (req.session.user.matricula) {
                Logger.info("API/AUTH", "Sess]ao válida");
                res.status(200).json({ status: 200, msg: "Sessão Válida" });
            }
            else {
                Logger.info("API/AUTH", "redirect matricula");
                res.status(301).json({ status: 301, redirect: "/matricula", msg: "Sessão válida, porém sem matrícula" });
            }
        } else {
            Logger.info("API/AUTH", "Invalid session, redirect login");
            res.status(301).json({ status: 301, redirect:'/login', msg: "Sessão Inválida" });
        }
    })
}