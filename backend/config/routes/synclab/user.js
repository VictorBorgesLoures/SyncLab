import Logger from "../../../logger/Logger.js";
import validators from '../../../src/validators/User.js';
import User from "../../../src/models/User.js";

export default app => {
    app.post('/user', (req, res, next) => {
        let user = new User(req.session.user);
        let uMinfied = user.minified();
        res.status(200).json({status:200, data: uMinfied});
    })

}