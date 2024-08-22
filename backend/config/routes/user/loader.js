import Logger from '../../../logger/Logger.js';
import login from './login.js'
import registro from './registro.js'
import matricula from './matricula.js'

export default app => {

    login(app);
    registro(app);
    matricula(app);

}