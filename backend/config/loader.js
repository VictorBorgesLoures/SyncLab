module.exports = app => {

    require('./middlewares/loader')(app)
    require('./routes/loader')(app);

}