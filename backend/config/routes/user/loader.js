const Logger = require('../../../logger/Logger');

module.exports = app => {

    //Check if assessing api, then must be a valid user
    app.use('*', async (req, res, next) => {
        if(req._parsedUrl.pathname == '/api') {
            User.fectchUser(req.sessionStore.sessions[req.sessionId].id)
            .then(u => {
                if(u) {
                    req.user = u;
                    next();
                } else {
                    res.status(500).json({status:500, msg:"Sem autorização"})
                }
            })
            .catch(e => {
                Logger.danger(e);
            })
        }
    })
    
    require('./login')(app);
    require('./registro')(app);

}