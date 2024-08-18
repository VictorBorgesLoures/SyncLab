module.exports = app => {

    //Check if assessing api, then must be a valid user
    app.use('*', async (req, res, next) => {
        if(req._parsedUrl.pathname == '/api') {

        }
    })
    
    require('./login')(app);
    require('./registro')(app);

}