import Logger from "../../../logger/Logger.js";

function auth(req, res, next) {
    if (/^\/api\/auth/.exec(req._parsedUrl.pathname)) {
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

    app.use(auth);

    app.post('/api/auth', (req, res, next) => {
        Logger.info("API/AUTH", "AUTH CALL");
        if (req.session.user) {
            Logger.info("API/AUTH", "VALID USER");
            if (req.session.user.matricula) {
                Logger.info("API/AUTH", "redirect dashbard");
                res.status(301).json({ status: 301, redirect: "/dashboard", msg: "Sessão Válida" });
            }
            else {
                Logger.info("API/AUTH", "redirect matricula");
                res.status(301).json({ status: 301, redirect: "/matricula", msg: "Sessão válida, porém sem matrícula" });
            }
        } else {
            Logger.info("API/AUTH", "Invalid session, redirect logout");
            res.status(301).json({ status: 301, redirect:'/logout', msg: "Sessão Inválida" });
        }
    })
}