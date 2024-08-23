import bodyParser from "body-parser"
import Logger from "../../logger/Logger.js";
import cors from 'cors'

export default app => {
    app.use(cors({credentials: true, origin:true}));
    app.use("*", (req, res, next) => {
        Logger.info("CORS");
        console.log(req.headers);
        req.session.reload(err => {
            Logger.info("Session", req.session);
            next();
        })
    });
    app.use(bodyParser.json());
}