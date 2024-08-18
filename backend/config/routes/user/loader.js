const Logger = require('../../../logger/Logger');

module.exports = app => {

    require('./login')(app);
    require('./registro')(app);
    require('./matricula')(app);

}