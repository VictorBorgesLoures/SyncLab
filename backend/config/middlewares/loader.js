import bodyParser from "body-parser"
import Logger from "../../logger/Logger.js";
import cors from 'cors'

export default app => {
    app.use(cors({credentials: true, origin:true}));
    app.use("*", (req, res, next) => {
        req.session.reload(err => {
            Logger.info("SESSION_ID", req.sessionID);
            next();
        })
    });
    app.use(bodyParser.json());
}